import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import GradientTitle from "../components/GradientTitle";
import Container from "../components/Container";

// --- Styled Components ---
const ResumeSection = styled(motion.section)`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px); // Lifts the card slightly on hover
    box-shadow: ${({ theme }) =>
      theme.shadows.primaryGlow}; // Adds a glow effect on hover

    &::before {
      opacity: 1; // Makes a pseudo-element visible on hover (if present)
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ViewerContainer = styled.div`
  flex: 1;
  max-width: 100rem;
  margin: 0 auto;
  width: 100%;
`;

const ResumeViewer = styled.iframe`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    aspect-ratio: 1.414 / 1;
    height: auto;
    min-height: 600px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 60vh;
    min-height: 400px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 47.7vh;
    min-height: 350px;
    border-radius: 8px;
  }
`;

const DownloadBtn = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  align-self: center;
  width: fit-content;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.gradients.primaryHover};
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
    transform: translateY(-1px);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
`;

// --- Component ---
const Resume = () => {
  const GOOGLE_DRIVE_RESUME_ID = "1lC3uGeCbvYE70zs9M9qsBmc-06wglHxP";

  // Construct URLs clearly.
  const embedUrl = `https://drive.google.com/file/d/${GOOGLE_DRIVE_RESUME_ID}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_RESUME_ID}`;

  return (
    <Container>
      <GradientTitle>Resume</GradientTitle>
      <ResumeSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ViewerContainer>
          <ResumeViewer
            src={embedUrl}
            title="My Professional Resume"
            loading="lazy"
          />
        </ViewerContainer>
        <DownloadBtn
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download My Resume PDF"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload size={12} />
          Download Resume
        </DownloadBtn>
      </ResumeSection>
    </Container>
  );
};

export default Resume;
