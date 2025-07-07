import Typewriter from "typewriter-effect"; // Typewriter animation library
import { Link } from "react-router-dom"; // Internal navigation link
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
  SkillsCloud,
  SkillBadge,
  Wave,
} from "../styles/HeroStyles"; // Styled components for Hero section

const skills = [
  "Python",
  "JavaScript",
  "ReactJS",
  "NodeJS",
  "Scikit-learn",
  "Streamlit",
  "TensorFlow",
];

// Hero component: main intro section with animated text and skills cloud
const Hero = () => (
  <Container>
    <BackgroundAnimation /> {/* Background animation */}
    <ContentWrapper>
      <LeftSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <WelcomeText>
          Hi There! <Wave>👋</Wave> I'm {/* Greeting with wave emoji */}
        </WelcomeText>
        <GradientName>Vinay Prabhakar</GradientName>{" "}
        {/* Animated gradient name */}
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
          background and projects, and feel free to reach out .
        </Description>
        <CTAButton
          as={Link} // React Router link styled as button
          to="/contact" // Navigates to contact page
          whilehover={{ scale: 1.05 }} // Hover scale animation
          whiletap={{ scale: 0.95 }} // Tap scale animation
        >
          Get in Touch
        </CTAButton>
      </LeftSection>

      <RightSection>
        <SkillsCloud>
          {skills.map((skill, index) => (
            <SkillBadge
              key={skill}
              style={{
                "--delay": `${index * 0.1}s`, // Stagger animation delay
                "--rotation": `${Math.random() * 360}deg`, // Random rotation
              }}
            >
              {skill}
            </SkillBadge>
          ))}
        </SkillsCloud>
      </RightSection>
    </ContentWrapper>
  </Container>
);

export default Hero;
