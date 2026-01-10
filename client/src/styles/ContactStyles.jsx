import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Keyframe animation for gradient
export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Header section styling
export const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["4xl"]};
`;

// Wrapper for contact info and form, uses grid layout
export const ContentWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 1400px) {
    gap: ${({ theme }) => theme.spacing["3xl"]};
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// Styling for the contact info card
export const InfoCard = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 20px;
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.default};

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
  font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  }
`;

// Text content within the info card
export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

// Container for the contact form
export const FormSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
  }
`;

// Styling for the contact form element
export const ContactForm = styled.form`
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Wrapper for form input groups
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Styling for form labels
export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }
`;

// Styling for text input fields
export const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  transition: ${({ theme }) => theme.transitions.default};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.sm};
  }

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
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  resize: vertical;
  min-height: 120px;
  transition: ${({ theme }) => theme.transitions.default};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.sm};
  }

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
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  border: none;
  border-radius: 25px;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  width: 100%;
  outline: none;
  display: inline-block;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.gradients.primaryHover};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

// Reusable styles for status messages
const messageStyles = `
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 10px;
  text-align: center;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }
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
