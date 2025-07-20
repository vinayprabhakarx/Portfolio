import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "../contexts/ThemeContext.jsx";
import GlobalStyle from "./GlobalStyles.jsx";
import Theme from "./Theme.jsx";

const ThemeProviderWrapper = ({ children }) => {
  const { isDarkMode } = useTheme();
  const themeObject = Theme(isDarkMode);

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
