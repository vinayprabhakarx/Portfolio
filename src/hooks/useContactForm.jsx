import { useState, useCallback, useRef, useEffect } from "react";
import { CONFIG } from "../config/contactConfig";

// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateForm = (formData) => {
  const errors = {};

  if (!formData.userName?.trim()) {
    errors.userName = "Name is required";
  } else if (formData.userName.trim().length < 2) {
    errors.userName = "Name must be at least 2 characters";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.subject?.trim()) {
    errors.subject = "Subject is required";
  } else if (formData.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!formData.message?.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

// HTTP client with timeout and retry logic
const httpClient = {
  async post(url, data, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      CONFIG.REQUEST_TIMEOUT
    );

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      // Handle successful response
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          return await response.json();
        } else {
          // If not JSON, return empty object
          return {};
        }
      }

      // Handle error response
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
      }

      // Handle specific HTTP errors
      switch (response.status) {
        case 400:
          throw new Error("Bad request. Please check your form data.");
        case 401:
          throw new Error("Unauthorized. Please try again.");
        case 403:
          throw new Error(
            "Access denied. Please check your API configuration."
          );
        case 404:
          throw new Error(
            "API endpoint not found. Please check your API URL and try again."
          );
        case 429:
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        case 502:
        case 503:
        case 504:
          throw new Error(
            "Server is currently unavailable. Please try again later."
          );
        default:
          throw new Error(errorMessage);
      }
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle specific errors
      if (error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }

      // Handle fetch errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      }

      // Handle CORS errors
      if (
        error.message.includes("CORS") ||
        error.message.includes("Access-Control-Allow-Origin")
      ) {
        throw new Error(
          "CORS error: Please check your API server configuration."
        );
      }

      // Handle other errors
      if (error.message.includes("Failed to fetch")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      }

      // Re-throw the original error if none of the above conditions match
      throw error;
    }
  },

  async postWithRetry(url, data, maxRetries = CONFIG.RETRY_ATTEMPTS) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        return await this.post(url, data);
      } catch (error) {
        lastError = error;

        // Don't retry on validation errors (4xx)
        if (error.message.includes("400") || error.message.includes("429")) {
          throw error;
        }

        // Don't retry on CORS errors
        if (
          error.message.includes("CORS") ||
          error.message.includes("Access-Control-Allow-Origin")
        ) {
          throw new Error(
            "CORS error: Please check your API server configuration."
          );
        }

        // If this was the last attempt, throw the error
        if (attempt > maxRetries) {
          break;
        }

        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  },
};

export const useContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Status state
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    message: "",
  });

  // Validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Refs
  const timeoutRef = useRef(null);

  // Cleanup previous timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Form field configuration
  const formFields = [
    {
      name: "userName",
      type: "text",
      label: "Name",
      autoComplete: "name",
      maxLength: 100,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      autoComplete: "email",
      maxLength: 150,
    },
    {
      name: "subject",
      type: "text",
      label: "Subject",
      autoComplete: "off",
      maxLength: 200,
    },
  ];

  // Handle input changes with validation
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear validation error when user starts typing
      if (validationErrors[name]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return Object.keys(newErrors).length === 0 ? {} : newErrors;
        });
      }
    },
    [validationErrors]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      userName: "",
      email: "",
      subject: "",
      message: "",
    });
    setValidationErrors({});
  }, []);

  // Update status with auto-dismiss
  const updateStatus = useCallback(
    (updates) => {
      setStatus((prev) => ({ ...prev, ...updates }));

      // If there's any message (success or error), set timeout to dismiss
      if (updates.message) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setStatus({
            submitting: false,
            submitted: false,
            error: false,
            message: "",
          });
        }, CONFIG.MESSAGE_DISMISS_TIME);
      }
    },
    [CONFIG.MESSAGE_DISMISS_TIME]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear previous messages
      updateStatus({
        submitted: false,
        error: null,
        message: "",
      });

      // Validate form
      const errors = validateForm(formData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        updateStatus({
          error: true,
          message: "Please fix the validation errors below.",
        });
        return;
      }

      // Check API URL
      if (!CONFIG.API_URL) {
        updateStatus({
          error: true,
          message: "Configuration error: API endpoint not configured.",
        });
        return;
      }

      updateStatus({
        submitting: true,
      });

      try {
        console.log("📤 Sending message...");

        const response = await httpClient.postWithRetry(CONFIG.API_URL, {
          userName: formData.userName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        });

        console.log("✅ Message sent successfully:", response);

        updateStatus({
          submitting: false,
          submitted: true,
          message:
            response.message ||
            "Message sent successfully! I'll get back to you soon.",
        });

        // Reset form after successful submission
        setTimeout(resetForm, 2000);
      } catch (error) {
        console.error("❌ Submission error:", error);

        updateStatus({
          submitting: false,
          error: true,
          message:
            error.message || "Failed to send message. Please try again later.",
        });
      }
    },
    [formData, updateStatus, resetForm]
  );

  return {
    formData,
    status,
    validationErrors,
    formFields,
    handleChange,
    handleSubmit,
  };
};
