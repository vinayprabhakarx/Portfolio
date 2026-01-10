import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loading from "./components/Loading.jsx";
import { useRoutePrefetch } from "./utils/routePrefetcher";
import AnimatedBackground from "./components/AnimatedBackground.jsx";

// Styled wrapper for entire app layout
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Styled main content wrapper
const MainContent = styled.main`
  padding-top: 70px;
  padding-bottom: 60px; /* Space for Fixed Footer */
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AppLayout = () => {
  const location = useLocation();
  useRoutePrefetch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <AnimatedBackground />
      <AppWrapper>
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
      </AppWrapper>
    </Suspense>
  );
};

export default AppLayout;
