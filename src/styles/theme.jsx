const lightTheme = {
  isDark: false,
  colors: {
    primary: "#6a11cb",
    primaryDark: "#5a0fb0",
    secondary: "#2575fc",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#1e293b",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    error: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
    hero: {
      text: "#1e293b",
      overlay: "rgba(255, 255, 255, 0.9)",
      overlayGradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
    },
  },
  gradients: {
    primary: "linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)",
    primaryTransparent: "linear-gradient(120deg, #6a11cb20, #2575fc20)",
    primaryHover: "linear-gradient(120deg, #5a0fb0 0%, #2167e0 100%)",
  },
  shadows: {
    small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    large: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    primaryGlow: "0 4px 15px rgba(106, 17, 203, 0.4)",
  },
};

const darkTheme = {
  isDark: true,
  colors: {
    primary: "#6a11cb",
    primaryDark: "#5a0fb0",
    secondary: "#2575fc",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#94a3b8",
    border: "#334155",
    error: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
    hero: {
      text: "#f8fafc",
      overlay: "rgba(0, 0, 0, 0.7)",
      overlayGradient:
        "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
    },
  },
  gradients: {
    primary: "linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)",
    primaryTransparent: "linear-gradient(120deg, #6a11cb20, #2575fc20)",
    primaryHover: "linear-gradient(120deg, #5a0fb0 0%, #2167e0 100%)",
  },
  shadows: {
    small: "0 1px 2px 0 rgba(0, 0, 0, 0.25)",
    medium: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
    large: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
    primaryGlow: "0 4px 15px rgba(106, 17, 203, 0.4)",
  },
};

const baseTheme = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
};

export const getTheme = (isDarkMode) => {
  const selectedTheme = isDarkMode ? darkTheme : lightTheme;
  return {
    ...baseTheme,
    ...selectedTheme,
    transitions: {
      default: "0.2s ease-in-out",
      fast: "0.1s ease-in-out",
      slow: "0.3s ease-in-out",
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  };
};

export default getTheme;
