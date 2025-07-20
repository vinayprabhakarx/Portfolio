import styled from "styled-components";

// Container for a group of tab buttons
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

// Styled button component for tabs
const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 0.1px solid ${({ theme }) => theme.colors.border};
  border-radius: 25px;
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  user-select: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.gradients.primaryHover};
    color: ${({ theme }) => theme.colors.secondary};
    &::before {
      opacity: 1;
    }
  }
`;

Button.TabContainer = TabContainer;
export default Button;
