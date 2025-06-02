import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  ThemeProvider as CustomThemeProvider, // Provides theme state via context (dark/light mode)
  useTheme, // Hook to consume theme state
} from "../contexts/ThemeContext.jsx";
import GlobalStyle from "./GlobalStyles.jsx"; // Injects global styles
import Theme from "./Theme.jsx"; // Returns theme object based on mode

const ThemeProviderWrapper = ({ children }) => {
  const { isDarkMode } = useTheme(); // Access current theme mode from context
  const themeObject = Theme(isDarkMode); // Resolve theme object (light or dark)

  return (
    <StyledThemeProvider theme={themeObject}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

const ThemeProvider = ({ children }) => (
  <CustomThemeProvider>
    <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
  </CustomThemeProvider>
);

export default ThemeProvider;
