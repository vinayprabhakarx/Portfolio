import React, { Suspense } from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaKaggle,
  FaXTwitter,
} from "react-icons/fa6";
import {
  BackgroundAnimation,
  ContentWrapper,
  LeftSection,
  WelcomeText,
  GradientName,
  TypewriterContainer,
  Description,
  RightSection,
  Wave,
  ButtonRow,
  SocialRow,
  SocialIconLink,
  GlowOrb,
  ScrollIndicator,
  ScrollDot,
} from "../styles/HeroStyles";

const DeveloperAnimation = React.lazy(() =>
  import("../components/DeveloperAnimation")
);

import Button from "../components/Button";

const socialLinks = [
  { href: "https://github.com/VinayPrabhakarX", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/VinayPrabhakarX/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://www.kaggle.com/vinayprabhakarx", icon: FaKaggle, label: "Kaggle" },
  { href: "https://x.com/VinayPrabhakarX", icon: FaXTwitter, label: "X / Twitter" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const Hero = () => (
  <ContentWrapper role="banner">
    <BackgroundAnimation />
    <GlowOrb />

    <LeftSection
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <WelcomeText>
          Hi There! <Wave>👋</Wave> I'm
        </WelcomeText>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GradientName>Vinay Prabhakar</GradientName>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TypewriterContainer>
          A{" "}
          <Typewriter
            options={{
              strings: [
                "Full-Stack Developer",
                "Problem Solver",
                "ML Enthusiast",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 45,
              delay: 75,
            }}
          />
        </TypewriterContainer>
      </motion.div>

      <motion.div variants={itemVariants}>
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
      </motion.div>

      <motion.div variants={itemVariants}>
        <ButtonRow>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button as={motion.button}>Get in Touch</Button>
          </Link>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <Button as={motion.button} $active={false}>View Projects</Button>
          </Link>
        </ButtonRow>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SocialRow>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <SocialIconLink
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              as={motion.a}
              whileHover={{ y: -4, scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
            >
              <Icon size={20} />
            </SocialIconLink>
          ))}
        </SocialRow>
      </motion.div>
    </LeftSection>

    <RightSection
      initial={{ opacity: 0, scale: 0.9, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
    >
      <Suspense fallback={null}>
        <DeveloperAnimation />
      </Suspense>
    </RightSection>

    <ScrollIndicator
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
    >
      <ScrollDot />
    </ScrollIndicator>
  </ContentWrapper>
);

export default Hero;
