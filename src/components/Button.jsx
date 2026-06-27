import styled from "styled-components";
import { motion } from "framer-motion";

// Container for a group of tab buttons
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

// Styled button component for tabs
const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ $size }) => ($size === "large" ? "0.9rem 1.8rem" : "0.75rem 1.5rem")};
  font-size: ${({ $size }) => ($size === "large" ? "1.05rem" : "0.95rem")};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 600;
  border-radius: ${({ $size }) => ($size === "large" ? "24px" : "22px")};
  background: ${({ $active = true, theme }) =>
    $active ? theme.gradients.primary : theme.colors.surface};
  color: ${({ $active = true, theme }) =>
    $active ? "white" : theme.colors.textSecondary};
  border: 1px solid ${({ $active = true, theme }) => 
    $active ? "transparent" : theme.colors.border};
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
    border-color: ${({ $active = true, theme }) => 
      $active ? "transparent" : theme.colors.primary};
    transform: translateY(-2px);
  }

  /* Micro-animation overlay for active state */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0));
    opacity: ${({ $active = true }) => ($active ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${({ $size }) => ($size === "large" ? "0.8rem 1.6rem" : "0.65rem 1.3rem")};
    font-size: ${({ $size }) => ($size === "large" ? "1rem" : "0.875rem")};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({ children, ...props }) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.TabContainer = TabContainer;
export default Button;
