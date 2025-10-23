import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Keyframe animation for gradient
export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Header section styling
export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

// Wrapper for contact info and form, uses grid layout
export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2.5rem;
  align-items: start;

  @media (min-width: 1400px) {
    gap: 3rem;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

// Styling for the contact info card
export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
  }
`;

// Background gradient for info card (for visual effects)
export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

// Title within the info card
export const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

// Text content within the info card
export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

// Container for the contact form
export const FormSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
  }
`;

// Styling for the contact form element
export const ContactForm = styled.form`
  padding: 2rem;
`;

// Wrapper for form input groups
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Styling for form labels
export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

// Styling for text input fields
export const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.shadows.light};
    background: ${({ theme }) => theme.colors.inputBackground};
  }

  /* Autofill styles for WebKit browsers */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text} !important;
    -webkit-box-shadow: 0 0 0px 1000px
      ${({ theme }) => theme.colors.inputBackground} inset !important;
  }

  &:-moz-autofill {
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Styling for textarea input fields
export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.shadows.light};
    background: ${({ theme }) => theme.colors.inputBackground};
  }
`;

// Styling for the form submission button
export const SubmitButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  outline: none;
  display: inline-block;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.gradients.primaryHover};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

// Reusable styles for status messages
const messageStyles = `
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  color: white;
`;

// Styling for a success message
export const SuccessMessage = styled(motion.div)`
  ${messageStyles}
  background: ${({ theme }) => theme.colors.success};
`;

// Styling for an error message
export const ErrorMessage = styled(motion.div)`
  ${messageStyles}
  background: ${({ theme }) => theme.colors.warning};
`;
