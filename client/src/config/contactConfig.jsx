// Environment configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
const isTest = import.meta.env.TEST;

// Create final configuration
export const CONFIG = {
  // API Configuration
  API_URL: isDevelopment
    ? import.meta.env.VITE_CONTACT_API_URL_DEV
    : isTest
    ? import.meta.env.VITE_CONTACT_API_URL_TEST
    : import.meta.env.VITE_CONTACT_API_URL,

  // Request settings
  REQUEST_TIMEOUT: isDevelopment
    ? import.meta.env.VITE_REQUEST_TIMEOUT_DEV
    : isTest
    ? import.meta.env.VITE_REQUEST_TIMEOUT_TEST
    : import.meta.env.VITE_REQUEST_TIMEOUT,
  RETRY_ATTEMPTS: isDevelopment
    ? import.meta.env.VITE_RETRY_ATTEMPTS_DEV
    : isTest
    ? import.meta.env.VITE_RETRY_ATTEMPTS_TEST
    : import.meta.env.VITE_RETRY_ATTEMPTS,

  // UI settings
  MESSAGE_DISMISS_TIME: isDevelopment
    ? import.meta.env.VITE_MESSAGE_DISMISS_TIME_DEV
    : isTest
    ? import.meta.env.VITE_MESSAGE_DISMISS_TIME_TEST
    : import.meta.env.VITE_MESSAGE_DISMISS_TIME,

  // Environment information
  ENVIRONMENT: {
    isDevelopment,
    isProduction,
    isTest,
    mode: import.meta.env.MODE,
  },
};

// Development environment logs
if (isDevelopment) {
  // Log configuration details
  console.log("🔧 Contact Form Configuration:");
  console.log("Environment:", CONFIG.ENVIRONMENT.mode);
  console.log("Timeout:", CONFIG.REQUEST_TIMEOUT);
  console.log("Retries:", CONFIG.RETRY_ATTEMPTS);
  console.log("Message Timeout:", CONFIG.MESSAGE_DISMISS_TIME);
  console.log("Client Origin:", window.location.origin);

  // Log API URL only in development
  console.log("API URL:", CONFIG.API_URL);

  // Check for missing environment variables
  if (!import.meta.env.VITE_CONTACT_API_URL) {
    console.warn(
      "⚠️ Warning: VITE_CONTACT_API_URL not found in environment variables."
    );
    console.log("Using fallback API URL:", CONFIG.API_URL);
  }
}
