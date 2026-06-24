import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.js";

// Main ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    // Only use light mode if explicitly saved by the user
    if (savedTheme === "light") return false;

    // Default to dark mode for all other cases
    return true;
  });

  // Save to localStorage and update document attribute on theme change
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);



  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
