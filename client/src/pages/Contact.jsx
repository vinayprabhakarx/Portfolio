import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLinks from "../components/SocialLinks";
import Container from "../components/Container";
import Button from "../components/Button";
import GradientTitle from "../components/GradientTitle";
import { useContactForm } from "../hooks/useContactForm";
import { useTheme } from "styled-components";
import {
  Header,
  ContentWrapper,
  InfoCard,
  InfoTitle,
  InfoText,
  GradientBackground,
  FormSection,
  ContactForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
} from "../styles/ContactStyles";

const Contact = () => {
  const theme = useTheme();
  const {
    formData,
    status,
    validationErrors,
    formFields,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header>
        <GradientTitle>Get In Touch</GradientTitle>
      </Header>

      <ContentWrapper>
        {/* Animate InfoCard like in Code 1 */}
        <InfoCard
          as={motion.div}
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            willChange: "transform",
            isolation: "isolate",
          }}
        >
          <InfoTitle>Contact Information</InfoTitle>
          <InfoText>
            Feel free to reach out for collaborations, questions, or just to say
            hello! I'll try my best to get back to you!
          </InfoText>
          <SocialLinks />
          <GradientBackground />
        </InfoCard>

        {/* Animate FormSection like in Code 1 */}
        <FormSection
          as={motion.div}
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            willChange: "transform",
            isolation: "isolate",
          }}
        >
          <ContactForm onSubmit={handleSubmit}>
            {formFields.map(
              ({ name, type, label, autoComplete, maxLength }) => (
                <FormGroup key={name}>
                  <FormLabel htmlFor={name}>
                    {label} <span style={{ color: theme.colors.error }}>*</span>
                  </FormLabel>
                  <FormInput
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={status.submitting}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    style={{
                      borderColor: validationErrors[name]
                        ? theme.colors.error
                        : undefined,
                    }}
                    aria-invalid={!!validationErrors[name]}
                    aria-describedby={
                      validationErrors[name] ? `${name}-error` : undefined
                    }
                  />
                  {validationErrors[name] && (
                    <div
                      id={`${name}-error`}
                      style={{
                        color: theme.colors.error,
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {validationErrors[name]}
                    </div>
                  )}
                </FormGroup>
              )
            )}

            <FormGroup>
              <FormLabel htmlFor="message">
                Message <span style={{ color: theme.colors.error }}>*</span>
              </FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows="6"
                disabled={status.submitting}
                autoComplete="off"
                maxLength={2000}
                style={{
                  borderColor: validationErrors.message ? theme.colors.error : undefined,
                }}
                aria-invalid={!!validationErrors.message}
                aria-describedby={
                  validationErrors.message ? "message-error" : undefined
                }
              />
              {validationErrors.message && (
                <div
                  id="message-error"
                  style={{
                    color: theme.colors.error,
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {validationErrors.message}
                </div>
              )}
              <div
                style={{
                  fontSize: "0.75rem",
                  color: theme.colors.textSecondary,
                  marginTop: "0.25rem",
                }}
              >
                {formData.message.length}/2000 characters
              </div>
            </FormGroup>

            <Button
              type="submit"
              disabled={status.submitting}
              style={{
                width: "100%",
                opacity: status.submitting ? 0.7 : 1,
                cursor: status.submitting ? "not-allowed" : "pointer",
              }}
            >
              {status.submitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FaPaperPlane style={{ marginLeft: "8px" }} />
                </>
              )}
            </Button>
          </ContactForm>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default Contact;
