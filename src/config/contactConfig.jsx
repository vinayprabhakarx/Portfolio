// Environment configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Create final configuration
export const CONFIG = {
  // API Configuration
  API_URL: import.meta.env.VITE_CONTACT_API_URL,

  // Request settings
  REQUEST_TIMEOUT: import.meta.env.VITE_REQUEST_TIMEOUT,
  RETRY_ATTEMPTS: import.meta.env.VITE_RETRY_ATTEMPTS,

  // UI settings
  MESSAGE_DISMISS_TIME: import.meta.env.VITE_MESSAGE_DISMISS_TIME,

  // Environment information
  ENVIRONMENT: {
    isDevelopment,
    isProduction,
    mode: import.meta.env.MODE,
  },
};

// Development environment logs
if (isDevelopment) {
  // Check for missing environment variables
  if (!import.meta.env.VITE_CONTACT_API_URL) {
    console.warn(
      "⚠️ Warning: VITE_CONTACT_API_URL not found in environment variables. Using fallback API URL."
    );
  }
}
