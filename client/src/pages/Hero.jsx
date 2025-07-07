import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import Container from "../components/Container";
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
import DeveloperAnimation from "../components/DeveloperAnimation";

const Hero = () => (
  <Container>
    <BackgroundAnimation />
    <ContentWrapper>
      <LeftSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <WelcomeText>
          Hi There! <Wave>👋</Wave> I'm
        </WelcomeText>
        <GradientName>Vinay Prabhakar</GradientName>{" "}
        <TypewriterContainer>
          <Typewriter
            options={{
              strings: ["Web Developer", "Machine Learning Engineer"],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 80,
            }}
          />
        </TypewriterContainer>
        <Description>
          Welcome to my portfolio. Explore my work, discover my professional
          background and projects, and feel free to reach out.
        </Description>
        <CTAButton
          as={Link}
          to="/contact"
          whilehover={{ scale: 1.05 }}
          whiletap={{ scale: 0.95 }}
        >
          Get in Touch
        </CTAButton>
      </LeftSection>

      <RightSection
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <DeveloperAnimation />
      </RightSection>
    </ContentWrapper>
  </Container>
);

export default Hero;
