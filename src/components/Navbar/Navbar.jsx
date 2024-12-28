import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <NavContainer scrolled={scrolled}>
        <NavContent>
          <LogoLink to="/">
            <LogoContainer>
              <StyledLogo src={logo} alt="Logo" $isDark={isDarkMode} />
              <Logo>
                <LogoName style={{ marginRight: "0.5rem" }}>Vinay</LogoName>
                <LogoSurname>Prabhakar</LogoSurname>
              </Logo>
            </LogoContainer>
          </LogoLink>

          <DesktopNav>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle onClick={toggleTheme}>
              {isDarkMode ? "🌙" : "☀️"}
            </ThemeToggle>
          </DesktopNav>

          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <>
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <MobileNav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.path}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </MobileNavLink>
              ))}
              <MobileThemeToggle onClick={toggleTheme}>
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </MobileThemeToggle>
            </MobileNav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme, scrolled }) =>
    scrolled ? theme.colors.background : "transparent"};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
  transition: all 0.3s ease;
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};
  height: 64px;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledLogo = styled.img`
  height: 40px;
  width: auto;
  transition: all 0.1s ease;
  filter: ${({ $isDark }) => ($isDark ? "brightness(0) invert(1)" : "none")};

  @media (max-width: 992px) {
    height: 35px;
  }
`;

const Logo = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
`;

const LogoName = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const LogoSurname = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const DesktopNav = styled.div`
  display: none;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(360deg);
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const MobileNav = styled(motion.div)`
  position: fixed;
  top: 64px;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  overflow-y: auto;
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  font-size: 1.2rem;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  padding: 0.5rem 0;
`;

const MobileThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  padding: 1rem 0;
  cursor: pointer;
  text-align: left;
`;

export default Navbar;
