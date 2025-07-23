import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loading from "./components/Loading.jsx";
import { useRoutePrefetch } from "./utils/routePrefetcher";
import AnimatedBackground from "./components/AnimatedBackground.jsx";

// Styled main content wrapper
const MainContent = styled.main`
  padding-top: 50px;
  min-height: calc(100vh - 80px);
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
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </Suspense>
  );
};

export default AppLayout;
