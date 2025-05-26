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
const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "$active", // Prevents `$active` prop from being passed to the DOM
})`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  font-size: 1rem;
  user-select: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.shadows.primaryGlow : "none"};

  &:hover {
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
  }
`;

// Attach TabContainer as a static property to TabButton for easy access
TabButton.TabContainer = TabContainer;
export default TabButton;
