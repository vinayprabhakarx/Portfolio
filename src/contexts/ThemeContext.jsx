import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  const [useV2Design, setUseV2Design] = useState(() => {
    const savedDesign = localStorage.getItem("designVersion");
    return savedDesign ? savedDesign === "v2" : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("designVersion", useV2Design ? "v2" : "v1");
  }, [useV2Design]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleVersion = () => {
    setUseV2Design((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    useV2Design,
    toggleVersion,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
