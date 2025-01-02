import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      submitting: true,
      submitted: false,
      error: null,
      message: "",
    });

    // API Call
    try {
      const response = await fetch("http://localhost:5000/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus({
        submitting: false,
        submitted: true,
        error: null,
        message: "Message sent successfully!",
      });

      // Reset form
      setFormData({
        userName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: error.message || "Failed to send message",
      });
    }
  };

  return (
    <ContactContainer>
      <Header>
        <GradientTitle>Get In Touch</GradientTitle>
      </Header>

      <ContentWrapper>
        <ContactInfo>
          <InfoCard
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InfoTitle>Contact Information</InfoTitle>
            <InfoText>
              Feel free to reach out for collaborations, questions, or just to
              say hello! I'll try my best to get back to you!
            </InfoText>

            <SocialLinks>
              <SocialLink
                href="https://www.linkedin.com/in/vinayprabhakarx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink
                href="https://github.com/vinayprabhakarx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </SocialLink>
              <SocialLink
                href="https://x.com/VinayPrabhakarX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </SocialLink>
            </SocialLinks>

            <GradientBackground />
          </InfoCard>
        </ContactInfo>

        <FormSection>
          <ContactForm
            onSubmit={handleSubmit}
            as={motion.form}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                disabled={status.submitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status.submitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={status.submitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                disabled={status.submitting}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={status.submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status.submitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </SubmitButton>

            {status.submitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {status.message}
              </SuccessMessage>
            )}

            {status.error && (
              <ErrorMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {status.message}
              </ErrorMessage>
            )}
          </ContactForm>
        </FormSection>
      </ContentWrapper>
    </ContactContainer>
  );
};

const ErrorMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: #ff5252;
  color: white;
  border-radius: 10px;
  text-align: center;
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const GradientTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
  margin-bottom: 1rem;
  user-select: none;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  position: relative;
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};

    &::before {
      opacity: 1;
    }
  }
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    120deg,
    rgba(106, 17, 203, 0.05) 0%,
    rgba(37, 117, 252, 0.05) 100%
  );
  z-index: -1;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #60a5fa;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #2575fc;
    transform: translateY(-3px);
  }
`;

const FormSection = styled.div`
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.background : theme.colors.cardBackground};
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
  }
  &::before {
    opacity: 1;
  }
`;

const ContactForm = styled.form`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.surface : theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text};
    -webkit-box-shadow: 0 0 0px 1000px
      ${({ theme }) =>
        theme.isDark ? theme.colors.surface : theme.colors.background}
      inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1);
    background: ${({ theme }) =>
      theme.isDark ? theme.colors.surface : theme.colors.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.surface : theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1);
    background: ${({ theme }) =>
      theme.isDark ? theme.colors.surface : theme.colors.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

const SuccessMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: #4caf50;
  color: white;
  border-radius: 10px;
  text-align: center;
`;

export default Contact;
