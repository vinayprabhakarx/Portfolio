import { createGlobalStyle } from "styled-components";
import { typography } from "./Typography";

const GlobalStyle = createGlobalStyle`
  /* Universal box-sizing, remove default margin/padding, disable tap highlight */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "liga" 0;
    font-variation-settings: "wght" ${typography.fontWeights.regular};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${typography.lineHeights.base};
    font-size: ${typography.fontSizes.base};
    letter-spacing: -0.01em;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  .main-content {
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px 1rem 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: ${({ theme }) => theme.typography.codeFontFamily};
  }
`;

export default GlobalStyle;
