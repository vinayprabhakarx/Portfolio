import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
// import { AuthProvider } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
import { getTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";

// Styled components
const MainContent = styled.main`
  padding-top: 80px; /* Height of navbar (64px) + extra space */
  min-height: calc(
    100vh - 80px
  ); /* Ensure content takes up full viewport height minus navbar */
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// Layout wrapper component
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <MainContent>{children}</MainContent>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </AppLayout>
      </Router>
    </StyledThemeProvider>
  );
}

export default App;
