import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import { Document, Page, pdfjs } from "react-pdf";
import GradientTitle from "../components/GradientTitle";
import Container from "../components/Container";
import Button from "../components/Button";
import resumePdf from "../assets/resume.pdf";

// Set up PDF.js worker using local bundled worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// --- Styled Components ---
const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
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
    box-shadow: ${({ theme }) => theme.shadows.large};
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
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  
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
        <Button
          as={motion.a}
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload size={16} />
          Download CV
        </Button>

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
