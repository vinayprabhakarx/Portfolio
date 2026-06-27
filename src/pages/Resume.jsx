import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Download as FaDownload } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import GradientTitle from "../components/GradientTitle";
import Container from "../components/Container";
import Button from "../components/Button";

const resumePdf = import.meta.env.VITE_RESUME_URL;

// Use CDN for worker to completely avoid any bundling or Nginx mime-type issues
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// --- Styled Components ---
const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const ResumeWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.5s ease;
  
  /* Hide scrollbar visually but allow scrolling if needed */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
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



// --- Component ---
const Resume = () => {
  const [width, setWidth] = useState(1200);
  const [pageLoaded, setPageLoaded] = useState(false);

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

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      // Fetch the file as a Blob to force download for cross-origin URLs
      const response = await fetch(resumePdf);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = "vinay_resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to simply opening the URL if CORS blocks the fetch
      window.open(resumePdf, '_blank');
    }
  };

  return (
    <Container>
      <GradientTitle>Resume</GradientTitle>
      <ResumeContainer>
        {/* Button Group */}
        <ButtonGroup>
          <Button
            as={motion.button}
            onClick={handleDownload}
          >
            <FaDownload size={16} />
            Download
          </Button>
        </ButtonGroup>

        {/* PDF Viewer */}
        <ResumeWrapper $loaded={pageLoaded}>
          <Document
            file={resumePdf}
            loading={null}
          >
            <Page
              pageNumber={1}
              scale={getScale()}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={() => setPageLoaded(true)}
            />
          </Document>
        </ResumeWrapper>
      </ResumeContainer>
    </Container>
  );
};

export default Resume;
