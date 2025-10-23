import styled from "styled-components";

// Container for a group of tab buttons
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

// Styled button component for tabs
const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  border: 0.1px solid ${({ theme }) => theme.colors.border};
  border-radius: 25px;
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  user-select: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
  }

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
