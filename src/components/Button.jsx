import styled from "styled-components";
import { motion } from "framer-motion";

// Container component for arranging tab-style buttons in a horizontal, wrapping row.
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

// Base styled motion button utilized for interactions and navigations.
// Adapts its visual appearance based on the `$active` state.
const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ $size, theme }) => ($size === "large" ? `calc(${theme.spacing.md} + 1px) calc(${theme.spacing.xl} + 1px)` : `calc(${theme.spacing.sm} + 1px) calc(${theme.spacing.lg} + 1px)`)};
  font-size: ${({ $size, theme }) => ($size === "large" ? theme.typography.fontSizes.lg : theme.typography.fontSizes.base)};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $active = true, theme }) =>
    $active ? theme.gradients.primary : theme.colors.surface};
  color: ${({ $active = true, theme }) =>
    $active ? "white" : theme.colors.textSecondary};
  border: none;
  box-shadow: ${({ $active = true, theme }) => 
    $active ? "none" : `inset 0 0 0 1px ${theme.colors.border}`};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;

  /* Subtle glass effect for inactive buttons */
  ${({ $active }) => !$active && `
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  `}

  &:hover {
    background: ${({ $active = true, theme }) =>
      $active ? theme.gradients.primaryHover : theme.colors.surface};
    color: ${({ $active = true, theme }) =>
      $active ? "white" : theme.colors.primary};
    box-shadow: ${({ $active = true, theme }) => 
      $active ? "none" : `inset 0 0 0 1px ${theme.colors.primary}`};
    transform: translateY(-4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ $size, theme }) => ($size === "large" ? `calc(${theme.spacing.sm} + 1px) calc(${theme.spacing.lg} + 1px)` : `calc(${theme.spacing.sm} + 1px) calc(${theme.spacing.md} + 1px)`)};
    font-size: ${({ $size, theme }) => ($size === "large" ? theme.typography.fontSizes.base : theme.typography.fontSizes.sm)};
  }
  
  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

// Primary Button component integrating Framer Motion capabilities.
// Wraps the StyledButton and passes through children and interaction props.
const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

Button.TabContainer = TabContainer;
export default Button;
