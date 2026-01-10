import React, { Suspense } from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import {
  BackgroundAnimation,
  ContentWrapper,
  LeftSection,
  WelcomeText,
  GradientName,
  TypewriterContainer,
  Description,
  CTAButton,
  RightSection,
  Wave,
} from "../styles/HeroStyles";

const DeveloperAnimation = React.lazy(() =>
  import("../components/DeveloperAnimation")
);

const Hero = () => (
  <ContentWrapper role="banner">
    <BackgroundAnimation />
    <LeftSection
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <WelcomeText>
        Hi There! <Wave>👋</Wave> I'm
      </WelcomeText>

      <GradientName>Vinay Prabhakar</GradientName>

      <TypewriterContainer>
        A{" "}
        <Typewriter
          options={{
            strings: ["Web Developer", "Problem Solver"],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            delay: 80,
          }}
        />
      </TypewriterContainer>

      <Description>
        Welcome to my portfolio. Explore my work, discover my professional
        background and projects, read my{" "}
        <a
          href="https://blog.vinayprabhakar.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          blog
        </a>{" "}
        and feel free to reach out.
      </Description>

      <Link to="/contact" style={{ textDecoration: "none" }}>
        <CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Get in Touch
        </CTAButton>
      </Link>
    </LeftSection>

    <RightSection
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <DeveloperAnimation />
    </RightSection>
  </ContentWrapper>
);

export default Hero;
