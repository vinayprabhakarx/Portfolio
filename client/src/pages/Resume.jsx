import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import { Document, Page, pdfjs } from "react-pdf";
import GradientTitle from "../components/GradientTitle";
import Container from "../components/Container";
import resumePdf from "../assets/resume.pdf";

// Set up PDF.js worker using local bundled worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// --- Styled Components ---
const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const DownloadBtn = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  border-radius: 25px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 250px;
  
  &:hover {
    background: ${({ theme }) => theme.gradients.primaryHover};
    transform: translateY(-2px);
  }
`;

const ResumeWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .react-pdf__Document {
    display: flex;
    justify-content: center;
    animation: fadeIn 0.5s ease-out;
  }
  
  .react-pdf__Page {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .react-pdf__Page__canvas {
    border-radius: 8px;
    max-width: 100%;
    height: auto !important;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  /* Responsive sizing - use 90% of viewport width up to max */
  width: 90vw;
  max-width: 893px;
  aspect-ratio: 1 / 1.414; /* A4 aspect ratio */
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 500;
  animation: pulse 1.5s ease-in-out infinite;
`;

// --- Component ---
const Resume = () => {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate scale based on screen width
  const getScale = () => {
    if (width > 1200) return 1.5;
    if (width > 786) return 1.2;
    if (width > 500) return 0.8;
    return 0.6;
  };

  return (
    <Container>
      <GradientTitle>Resume</GradientTitle>
      <ResumeContainer>
        {/* Download Button - Top */}
        <DownloadBtn
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload size={16} />
          Download CV
        </DownloadBtn>

        {/* PDF Viewer */}
        <ResumeWrapper>
          <Document
            file={resumePdf}
            loading={<LoadingContainer><LoadingText>Loading Resume...</LoadingText></LoadingContainer>}
          >
            <Page
              pageNumber={1}
              scale={getScale()}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </ResumeWrapper>
      </ResumeContainer>
    </Container>
  );
};

export default Resume;
