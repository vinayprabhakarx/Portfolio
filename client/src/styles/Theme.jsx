import { typography } from "./Typography";

// ---------- Light Theme ----------
const lightTheme = {
  isDark: false,
  typography: typography,
  colors: {
    primary: "rgb(231, 76, 60)",
    primaryDark: "rgb(192, 57, 43)",
    secondary: "rgb(241, 196, 15)",
    background: "rgb(255, 250, 248)",
    surface: "rgb(255, 255, 255)",
    text: "rgb(84, 75, 82)",
    textSecondary: "rgb(133, 119, 128)",
    inputBackground: "rgb(253, 237, 236)",
    border: "rgb(220, 204, 214)",
    error: "rgb(220, 53, 69)",
    success: "rgb(40, 167, 69)",
    warning: "rgb(255, 165, 0)",
    navbar: {
      default: "rgba(255, 250, 248, 0.95)",
      scrolled: "rgb(255, 250, 248)",
    },
    hero: {
      text: "rgb(84, 75, 82)",
      overlay: "rgba(255, 255, 255, 0.9)",
      overlayGradient:
        "linear-gradient(135deg, rgba(231, 76, 60, 0.08) 0%, rgba(241, 196, 15, 0.05) 100%)",
    },
  },
  gradients: {
    primary: "linear-gradient(120deg, #E74C3C 0%, #F39C12 100%)",
    primaryTransparent: "linear-gradient(120deg, #E74C3C20, #F39C1220)",
    primaryHover: "linear-gradient(120deg, #C0392B 0%, #E74C3C 100%)",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.07)",
    small: "0 1px 2px rgba(0, 0, 0, 0.04)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.09)",
    large: "0 10px 20px rgba(0, 0, 0, 0.11)",
    primaryGlow: "0 0 12px rgba(231, 76, 60, 0.5)",
    scrolled: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
};

// ---------- Dark Theme ----------
const darkTheme = {
  isDark: true,
  typography: typography,
  colors: {
    primary: "rgb(255, 107, 107)",
    primaryDark: "rgb(231, 76, 60)",
    secondary: "rgb(255, 234, 167)",
    background: "rgb(47, 39, 39)",
    surface: "rgb(68, 56, 56)",
    text: "rgb(255, 242, 240)",
    textSecondary: "rgb(205, 180, 175)",
    inputBackground: "rgb(86, 70, 70)",
    border: "rgb(119, 98, 98)",
    error: "rgb(220, 53, 69)",
    success: "rgb(40, 167, 69)",
    warning: "rgb(255, 165, 0)",
    navbar: {
      default: "rgba(47, 39, 39, 0.95)",
      scrolled: "rgb(47, 39, 39)",
    },
    hero: {
      text: "rgb(255, 242, 240)",
      overlay: "rgba(0, 0, 0, 0.6)",
      overlayGradient:
        "linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 234, 167, 0.1) 100%)",
    },
  },
  gradients: {
    primary: "linear-gradient(120deg, #FF6B6B 0%, #FFE66D 100%)",
    primaryTransparent: "linear-gradient(120deg, #FF6B6B20, #FFE66D20)",
    primaryHover: "linear-gradient(120deg, #E74C3C 0%, #FF6B6B 100%)",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.2)",
    small: "0 1px 2px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.4)",
    large: "0 10px 20px rgba(0, 0, 0, 0.5)",
    primaryGlow: "0 0 12px rgba(255, 107, 107, 0.5)",
  },
};

// ---------- Shared Base Theme ----------
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
  typography: typography,
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
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
export const Theme = (isDarkMode) => ({
  ...baseTheme,
  ...(isDarkMode ? darkTheme : lightTheme),
});

export default Theme;
