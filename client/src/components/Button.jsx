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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 600;
  border: none;
  border-radius: 25px;
  background: ${({ $active = true, theme }) =>
    $active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ $active = true, theme }) =>
    $active ? "white" : theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;


  &:hover {
    background: ${({ theme }) => theme.gradients.primaryHover};
    color: ${({ theme, $active = true }) => 
        !$active ? theme.colors.secondary : "white"};
    /* transform handled by framer-motion */
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
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
