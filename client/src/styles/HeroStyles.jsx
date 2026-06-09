import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  gradientAnimation,
  waveAnimation,
} from "./animations";

// Scroll bounce keyframe
const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.4; }
`;

// Orb float keyframe
const orbFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.97); }
`;

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
  min-height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;

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
    padding: 2rem 1.5rem 4rem;
  }
`;

// Wrapper for the entire Hero section
export const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  padding-top: 80px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
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

// Subtle gradient orb behind the left text
export const GlowOrb = styled.div`
  position: absolute;
  top: 10%;
  left: -5%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primary}18 0%,
    ${({ theme }) => theme.colors.secondary}08 50%,
    transparent 70%
  );
  filter: blur(40px);
  animation: ${orbFloat} 12s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 968px) {
    width: 300px;
    height: 300px;
    top: 5%;
    left: -10%;
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
  min-height: 2.8em;
  user-select: none;

  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
    min-height: 2.6em;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    justify-content: center;
    min-height: 2.4em;
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

// Row for CTA buttons side by side
export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

// Social icons row
export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

export const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.25s ease;
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.gradients.primaryTransparent};
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
  z-index: 1;

  @media (max-width: 968px) {
    max-width: 400px;
    justify-content: center;
  }
`;

// Scroll indicator container at the bottom-center
export const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;

  @media (max-width: 968px) {
    display: none;
  }
`;

// Animated scroll dot
export const ScrollDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${scrollBounce} 1.6s ease-in-out infinite;
  opacity: 0.7;
`;

// Waving hand emoji styling
export const Wave = styled.span`
  display: inline-block;
  animation: ${waveAnimation} 2.5s infinite;
  transform-origin: 70% 70%;
`;
