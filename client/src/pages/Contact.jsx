import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa6";
import SocialLinks from "../components/SocialLinks";
import Container from "../components/Container";
import GradientTitle from "../components/GradientTitle";
import { useContactForm } from "../hooks/useContactForm";
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
  SubmitButton,
  SuccessMessage,
  ErrorMessage,
} from "../styles/ContactStyles";

const Contact = () => {
  const {
    formData,
    status,
    validationErrors,
    formFields,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <Container>
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
                    {label} <span style={{ color: "#ef4444" }}>*</span>
                  </FormLabel>
                  <FormInput
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    disabled={status.submitting}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    style={{
                      borderColor: validationErrors[name]
                        ? "#ef4444"
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
                        color: "#ef4444",
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
                Message <span style={{ color: "#ef4444" }}>*</span>
              </FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                disabled={status.submitting}
                autoComplete="off"
                maxLength={2000}
                style={{
                  borderColor: validationErrors.message ? "#ef4444" : undefined,
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
                    color: "#ef4444",
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
                  color: "#6b7280",
                  marginTop: "0.25rem",
                }}
              >
                {formData.message.length}/2000 characters
              </div>
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={status.submitting}
              whileHover={status.submitting ? {} : { scale: 1.02 }}
              whileTap={status.submitting ? {} : { scale: 0.98 }}
              style={{
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
            </SubmitButton>

            {/* Animated Feedback Messages */}
            <AnimatePresence>
              {status.submitted && (
                <SuccessMessage
                  as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="polite"
                >
                  Form submitted successfully!
                </SuccessMessage>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {status.error && (
                <ErrorMessage
                  as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="assertive"
                >
                  ❌ {status.message}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </ContactForm>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default Contact;
