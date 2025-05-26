import styled, { keyframes } from "styled-components"; // Import keyframes
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

// Define a simple pulse animation
const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const MainContent = styled.main`
  padding-top: 50px;
  min-height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LoadingText = styled.div`
  flex-grow: 1; /* Allows it to take available space */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  animation: ${pulse} 1.5s infinite ease-in-out;
  text-align: center;
`;

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <MainContent>
        <Suspense fallback={<LoadingText>Loading content...</LoadingText>}>
          <Outlet />
        </Suspense>
      </MainContent>
      <Footer />
    </>
  );
};

export default AppLayout;
