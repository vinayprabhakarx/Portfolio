import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const Hero = () => {
  const skills = [
    "Python",
    "JavaScript",
    "React.js",
    "Git & GitHub",
    "Machine Learning",
    "Web Development",
    "DSA",
  ];

  return (
    <HeroContainer>
      <BackgroundAnimation />
      <ContentWrapper>
        <LeftSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <WelcomeText>
            Hi There! <Wave>👋</Wave> I'm
          </WelcomeText>
          <GradientName>Vinay Prabhakar</GradientName>
          <TypewriterContainer>
            <Typewriter
              options={{
                strings: [
                  "Machine Learning",
                  "Web Development",
                  "Problem Solving",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 80,
              }}
            />
          </TypewriterContainer>
          <Description>
            Welcome to my portfolio. Here, You can explore my projects, learn
            more about my work, and read my blog to gain insights into my
            approach and expertise.
          </Description>
          <SocialLinks>
            <SocialIcon
              href="https://github.com/VinayPrabhakarX"
              target="_blank"
            >
              <FaGithub />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com/in/VinayPrabhakarX"
              target="_blank"
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://x.com/VinayPrabhakarX" target="_blank">
              <FaXTwitter />
            </SocialIcon>
          </SocialLinks>
          <CTAButton
            as={Link}
            to="/contact"
            whilehover={{ scale: 1.05 }}
            whiletap={{ scale: 0.95 }}
          >
            Let's Connect
          </CTAButton>
        </LeftSection>

        <RightSection>
          <SkillsCloud>
            {skills.map((skill, index) => (
              <SkillBadge
                key={skill}
                style={{
                  "--delay": `${index * 0.1}s`,
                  "--rotation": `${Math.random() * 360}deg`,
                }}
              >
                {skill}
              </SkillBadge>
            ))}
          </SkillsCloud>
        </RightSection>
      </ContentWrapper>
    </HeroContainer>
  );
};

const floatAnimation = keyframes`
  0% { 
    transform: translateY(0px) rotate(0deg);
    background-position: 0 50%;
  }
  50% { 
    transform: translateY(-20px) rotate(5deg);
    background-position: 100% 50%;
  }
  100% { 
    transform: translateY(0px) rotate(0deg);
    background-position: 0 50%;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

const BackgroundAnimation = styled.div`
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0.1;
    animation: ${gradientAnimation} 15s ease infinite;
  }
`;

const HeroContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LeftSection = styled(motion.div)`
  flex: 1;
  z-index: 1;
`;

const WelcomeText = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  user-select: none;
`;

const GradientName = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
  margin-bottom: 1rem;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TypewriterContainer = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  user-select: none;

  @media (max-width: 968px) {
    margin: 0 auto 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const CTAButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.gradients.primaryHover};
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SkillsCloud = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SkillBadge = styled.span`
  padding: 0.6rem 2.5rem;
  background: ${({ active, theme }) =>
    active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.primary)};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  border-radius: 35px;
  font-size: 1rem;
  white-space: nowrap;
  border: none;
  position: relative;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  transform-origin: center;
  transition: all 0.2s ease;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
    border-color: transparent;
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
    cursor: pointer;
  }
`;

const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(24deg); }
  20% { transform: rotate(-18deg); }
  30% { transform: rotate(24deg); }
  40% { transform: rotate(-14deg); }
  50% { transform: rotate(20deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

const Wave = styled.span`
  display: inline-block;
  animation: ${waveAnimation} 2.5s infinite;
  transform-origin: 70% 70%;
`;

export default Hero;
