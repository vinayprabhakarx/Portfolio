import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Reusable CSS for padding
const sharedPadding = ({ theme }) => `
  padding: ${theme.spacing["3xl"]} ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
`;

// Helper to create keyframe animations
const createAnimation = (keyframesDef) => keyframes`${keyframesDef}`;

// Animation for floating elements
export const floatAnimation = createAnimation`
  0% { transform: translateY(0px) rotate(0deg); background-position: 0 50%; }
  50% { transform: translateY(-20px) rotate(5deg); background-position: 100% 50%; }
  100% { transform: translateY(0px) rotate(0deg); background-position: 0 50%; }
`;

// Animation for gradient backgrounds
export const gradientAnimation = createAnimation`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

// Animation for a waving hand gesture
export const waveAnimation = createAnimation`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(24deg); }
  20% { transform: rotate(-18deg); }
  30% { transform: rotate(24deg); }
  40% { transform: rotate(-14deg); }
  50% { transform: rotate(20deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

// Background animation for the Hero section
export const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; /* Ensures it stays behind content */

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.background};
    opacity: 0.1; /* Semi-transparent */
    animation: ${gradientAnimation} 15s ease infinite; /* Apply gradient animation */
  }
`;

// Wrapper for the main content within Hero section
export const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex; /* Uses flexbox for layout */
  align-items: center; /* Vertically centers items */
  justify-content: space-between; /* Distributes space between items */
  gap: 2rem; /* Spacing between flex items */

  @media (max-width: 968px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    text-align: center; /* Center text when stacked */
  }
`;

// Left section of the Hero content, animated with Framer Motion
export const LeftSection = styled(motion.div)`
  flex: 1; /* Allows it to take up available space */
  z-index: 1; /* Ensures it's above the background animation */
`;

// "Welcome" text styling
export const WelcomeText = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  user-select: none; /* Prevents text selection */
`;

// Animated gradient name styling
export const GradientName = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  background: ${({ theme }) =>
    theme.gradients.primary}; /* Gradient background */
  -webkit-background-clip: text; /* Clips background to text shape */
  -webkit-text-fill-color: transparent; /* Makes text transparent to show background */
  background-size: 200% 200%; /* Larger background for animation */
  animation: ${gradientAnimation} 4s ease infinite; /* Apply gradient animation */
  margin-bottom: 1rem;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 2.5rem; /* Smaller font size on mobile */
  }
`;

// Container for typewriter effect text
export const TypewriterContainer = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller font size on mobile */
  }
`;

// Description paragraph styling
export const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6; /* Improves readability */
  max-width: 600px; /* Limits width for readability */
  user-select: none;

  @media (max-width: 968px) {
    margin: 0 auto 2rem; /* Center text block on smaller screens */
  }
`;

// Call-to-action button, animated with Framer Motion
export const CTAButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) =>
      theme.gradients.primaryHover}; /* Hover gradient */
    box-shadow: ${({ theme }) =>
      theme.shadows.primaryGlow}; /* Glow effect on hover */
    color: ${({ theme }) => theme.colors.secondary}; /* Text color on hover */
  }

  svg {
    font-size: 1rem;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Right section of the Hero content, animated with Framer Motion
export const RightSection = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// Waving hand emoji styling
export const Wave = styled.span`
  display: inline-block;
  animation: ${waveAnimation} 2.5s infinite; /* Apply wave animation */
  transform-origin: 70% 70%; /* Set transform origin for wave effect */
`;
