import { useState, useEffect } from "react"; // React hooks
import { motion } from "framer-motion"; // Animation library
import { FaPaperPlane } from "react-icons/fa6"; // Icon for send button
import SocialLinks from "../components/SocialLinks"; // Social media links component
import Container from "../components/Container";
import GradientTitle from "../components/GradientTitle";
import {
  Header,
  ContentWrapper,
  ContactInfo,
  InfoCard,
  InfoTitle,
  InfoText,
  GradientBackground,
  FormSection,
  ContactForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton,
  SuccessMessage,
  ErrorMessage,
} from "../styles/ContactStyles"; // Styled components

const Contact = () => {
  // Form input state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Submission status and feedback state
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    message: "",
  });

  // Config for form fields (excluding message textarea)
  const formFields = [
    { name: "userName", type: "text", label: "Name", autoComplete: "name" },
    { name: "email", type: "email", label: "Email", autoComplete: "email" },
    { name: "subject", type: "text", label: "Subject", autoComplete: "off" },
  ];

  // Update form input on user change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ userName: "", email: "", subject: "", message: "" });
  };

  // Update submission status state
  const updateStatus = (updates) => {
    setStatus((prev) => ({ ...prev, ...updates }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateStatus({
      submitting: true,
      submitted: false,
      error: null,
      message: "",
    });

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to send message");

      updateStatus({
        submitting: false,
        submitted: true,
        error: null,
        message: "Message sent successfully!",
      });
      setTimeout(resetForm, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      updateStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: error.message || "Failed to send message",
      });
    }
  };

  // Auto-dismiss success or error messages after 3 seconds
  useEffect(() => {
    if (status.submitted || status.error) {
      const timer = setTimeout(() => {
        updateStatus({ submitted: false, error: null, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status.submitted, status.error]);

  return (
    <Container>
      <Header>
        <GradientTitle>Get In Touch</GradientTitle>
      </Header>

      <ContentWrapper>
        <ContactInfo>
          <InfoCard
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InfoTitle>Contact Information</InfoTitle>
            <InfoText>
              Feel free to reach out for collaborations, questions, or just to
              say hello! I'll try my best to get back to you!
            </InfoText>
            <SocialLinks />
            <GradientBackground />
          </InfoCard>
        </ContactInfo>

        <FormSection>
          <ContactForm
            onSubmit={handleSubmit}
            as={motion.form}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {formFields.map(({ name, type, label, autoComplete }) => (
              <FormGroup key={name}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <FormInput
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  disabled={status.submitting}
                  autoComplete={autoComplete}
                />
              </FormGroup>
            ))}

            <FormGroup>
              <FormLabel htmlFor="message">Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                disabled={status.submitting}
                autoComplete="off"
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={status.submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status.submitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </SubmitButton>

            {/* Display success or error messages */}
            {status.submitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {status.message}
              </SuccessMessage>
            )}

            {status.error && (
              <ErrorMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {status.message}
              </ErrorMessage>
            )}
          </ContactForm>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default Contact;
