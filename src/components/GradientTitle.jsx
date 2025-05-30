import styled, { keyframes } from "styled-components";

// Defines a keyframe animation for a gradient effect.
const gradientAnimation = keyframes`
  0% { background-position: 0 50%; }   // Start position of the gradient
  50% { background-position: 100% 50%; } // Middle position of the gradient
  100% { background-position: 0 50%; } // End position, looping back to start
`;

// Styled component for a title with an animated gradient text effect.
const GradientTitle = styled.h2`
  font-size: 2.5rem; // Large font size for a prominent title
  font-weight: 700; // Bold font weight
  text-align: center; // Center-align the text
  margin-bottom: 3rem; // Space below the title
  background: ${({ theme }) =>
    theme.gradients.primary}; // Apply primary gradient from theme
  -webkit-background-clip: text; // Clip background to the text shape (for Webkit browsers)
  -webkit-text-fill-color: transparent; // Make text transparent to show clipped background
  background-size: 200% 200%; // Ensures the gradient is larger than the text for animation
  animation: ${gradientAnimation} 4s ease infinite; // Apply the gradient animation
`;

export default GradientTitle;
