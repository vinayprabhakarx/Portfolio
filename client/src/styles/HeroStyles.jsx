import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Wrapper for the main content within Hero section
export const ContentWrapper = styled.section`
  max-width: 2000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 2rem 3rem 4rem 3rem;
  min-height: calc(100vh - 120px);

  @media (min-width: 2560px) {
    max-width: 2400px;
  }

  @media (max-width: 1400px) {
    max-width: 1200px;
    gap: 3rem;
  }

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    padding: 2rem 0;
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
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.background};
    opacity: 0.1;
    animation: ${gradientAnimation} 15s ease infinite;
  }
`;

// Left section of the Hero content, animated with Framer Motion
export const LeftSection = styled(motion.div)`
  flex: 1;
  z-index: 1;
`;

// "Welcome" text styling
export const WelcomeText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  user-select: none;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  }
`;

// Animated gradient name styling
export const GradientName = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes["6xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  user-select: none;

  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["5xl"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["4xl"]};
  }
`;

// Container for typewriter effect text
export const TypewriterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  user-select: none;

  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    justify-content: center;
  }
`;

// Description paragraph styling
export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  max-width: 650px;
  user-select: none;

  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    max-width: 600px;
  }

  @media (max-width: 968px) {
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
  }
`;

// Call-to-action button, animated with Framer Motion
export const CTAButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing["2xl"]};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  border: none;
  border-radius: 25px;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  display: inline-block;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.gradients.primaryHover};
    color: ${({ theme }) => theme.colors.secondary};
  }

  svg {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }
`;

// Right section of the Hero content, animated with Framer Motion
export const RightSection = styled(motion.div)`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  max-width: 600px;

  @media (max-width: 968px) {
    max-width: 400px;
    justify-content: center;
  }
`;

// Waving hand emoji styling
export const Wave = styled.span`
  display: inline-block;
  animation: ${waveAnimation} 2.5s infinite;
  transform-origin: 70% 70%;
`;
