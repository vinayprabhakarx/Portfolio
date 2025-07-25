import styled, { keyframes } from "styled-components";

// Defines a keyframe animation for a gradient effect.
const gradientAnimation = keyframes`
  0% { background-position: 0 50%; }   
  50% { background-position: 100% 50%; } 
  100% { background-position: 0 50%; } 
`;

// Styled component for a title with an animated gradient text effect.
const GradientTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
`;

export default GradientTitle;
