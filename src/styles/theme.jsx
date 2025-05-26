// ---------- Light Theme ----------
const lightTheme = {
  isDark: false,
  colors: {
    primary: "rgb(194, 91, 54)", // Muted Terracotta/Burnt Orange
    primaryDark: "rgb(158, 73, 43)", // Darker Terracotta
    secondary: "rgb(141, 159, 136)", // Soft Olive Green/Sage
    background: "rgb(253, 248, 243)", // Creamy Off-White
    surface: "rgb(255, 255, 255)", // Pure White
    text: "rgb(74, 61, 54)", // Deep Warm Brown
    textSecondary: "rgb(122, 106, 97)", // Muted Mid-Brown
    inputBackground: "rgb(242, 235, 229)", // Lighter Creamy Tone
    border: "rgb(224, 216, 208)", // Soft Warm Grey Border
    error: "rgb(220, 53, 69)", // Standard Red
    success: "rgb(40, 167, 69)", // Standard Green
    warning: "rgb(255, 165, 0)", // Standard Orange
    navbar: {
      default: "rgba(253, 248, 243, 0.95)",
      scrolled: "rgb(253, 248, 243)",
    },
    hero: {
      text: "rgb(74, 61, 54)",
      overlay: "rgba(255, 255, 255, 0.9)",
      overlayGradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 248, 243, 0.85) 100%)",
    },
  },
  gradients: {
    primary: "linear-gradient(120deg, #C25B36 0%, #D87A5B 100%)", // Terracotta gradient
    primaryTransparent: "linear-gradient(120deg, #C25B3620, #D87A5B20)",
    primaryHover: "linear-gradient(120deg, #A84E2F 0%, #C25B36 100%)",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.07)",
    small: "0 1px 2px rgba(0, 0, 0, 0.04)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.09)",
    large: "0 10px 20px rgba(0, 0, 0, 0.11)",
    primaryGlow: "0 0 12px rgba(194, 91, 54, 0.5)", // Glow for the new primary
    scrolled: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
};

// ---------- Dark Theme ----------
const darkTheme = {
  isDark: true,
  colors: {
    primary: "rgb(194, 91, 54)", // Muted Terracotta (consistent)
    primaryDark: "rgb(158, 73, 43)", // Darker Terracotta (consistent)
    secondary: "rgb(141, 159, 136)", // Soft Olive Green (consistent)
    background: "rgb(58, 47, 45)", // Rich Deep Brown/Charcoal
    surface: "rgb(74, 63, 59)", // Slightly Lighter Brown/Grey (subtle lift)
    text: "rgb(247, 242, 237)", // Creamy Light Grey
    textSecondary: "rgb(199, 191, 186)", // Muted Light Brown-Grey
    inputBackground: "rgb(92, 79, 75)", // Darker Brown for input
    border: "rgb(115, 103, 98)", // Medium Brown Border
    error: "rgb(220, 53, 69)", // Standard Red
    success: "rgb(40, 167, 69)", // Standard Green
    warning: "rgb(255, 165, 0)", // Standard Orange
    navbar: {
      default: "rgba(58, 47, 45, 0.95)",
      scrolled: "rgb(58, 47, 45)",
    },
    hero: {
      text: "rgb(247, 242, 237)",
      overlay: "rgba(0, 0, 0, 0.65)",
      overlayGradient:
        "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(58, 47, 45, 0.55) 100%)",
    },
  },
  gradients: {
    primary: "linear-gradient(120deg, #C25B36 0%, #D87A5B 100%)",
    primaryTransparent: "linear-gradient(120deg, #C25B3620, #D87A5B20)",
    primaryHover: "linear-gradient(120deg, #A84E2F 0%, #C25B36 100%)",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.2)",
    small: "0 1px 2px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.4)",
    large: "0 10px 20px rgba(0, 0, 0, 0.5)",
    primaryGlow: "0 0 12px rgba(194, 91, 54, 0.5)",
  },
};

// ---------- Shared Base Theme (unchanged, re-included for completeness) ----------
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
    codeFontFamily:
      "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "2.5rem",
      "4xl": "3rem",
      "5xl": "4rem",
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

// ---------- Theme Combiner ----------
export const getTheme = (isDarkMode) => ({
  ...baseTheme,
  ...(isDarkMode ? darkTheme : lightTheme),
});

export default getTheme;
