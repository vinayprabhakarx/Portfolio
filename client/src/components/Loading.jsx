import styled, { keyframes, css } from "styled-components";

// Animation keyframes
const rotate = keyframes`to { transform: rotate(360deg); }`;
const rotateReverse = keyframes`to { transform: rotate(-360deg); }`;

// Shared ring styles
const ringStyle = css`
  position: absolute;
  border-style: solid;
  border-radius: 50%;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

// Fullscreen container
const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  z-index: 1000;
  padding: 2rem;
  text-align: center;
`;

// Main spinner container
const MainSpinner = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

// Spinner rings
const OuterRing = styled.div`
  ${ringStyle};
  inset: 0;
  border-width: 3px;
  border-color: transparent;
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-right-color: ${({ theme }) => theme.colors.secondary};
  animation-name: ${rotate};
  animation-duration: 2s;
`;

const MiddleRing = styled.div`
  ${ringStyle};
  inset: 10px;
  border-width: 2px;
  border-color: transparent;
  border-top-color: ${({ theme }) => theme.colors.secondary};
  border-right-color: ${({ theme }) => theme.colors.primaryDark};
  animation-name: ${rotateReverse};
  animation-duration: 1.5s;
`;

const InnerRing = styled.div`
  ${ringStyle};
  inset: 20px;
  border-width: 2px;
  border-color: transparent;
  border-bottom-color: ${({ theme }) => theme.colors.primaryDark};
  animation-name: ${rotate};
  animation-duration: 3s;
`;

// Inner wrapper
const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 400px;
  width: 100%;
`;

const Message = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text || "#444"};
`;

const Loading = () => (
  <LoadingContainer
    role="status"
    aria-live="polite"
    aria-label="Loading content"
  >
    <ContentContainer>
      <MainSpinner>
        <OuterRing />
        <MiddleRing />
        <InnerRing />
      </MainSpinner>
    </ContentContainer>
  </LoadingContainer>
);

export default Loading;
