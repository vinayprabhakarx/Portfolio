import { createGlobalStyle } from "styled-components";
import { typography } from "./Typography";

const GlobalStyle = createGlobalStyle`
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

  /* React Toastify Custom Styles */
  .Toastify__toast {
    font-family: ${typography.fontFamily};
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .Toastify__toast--success {
    background: ${({ theme }) => theme.gradients.primary};
  }

  .Toastify__toast--error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  .Toastify__toast-body {
    color: white;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .Toastify__progress-bar--success {
    background: rgba(255, 255, 255, 0.7);
  }

  .Toastify__progress-bar--error {
    background: rgba(255, 255, 255, 0.7);
  }

  .Toastify__close-button {
    color: white;
    opacity: 0.8;
  }

  .Toastify__close-button:hover {
    opacity: 1;
  }
`;

export default GlobalStyle;
