import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open state
  const [scrolled, setScrolled] = useState(false); // Track scroll for style change

  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  // Update 'scrolled' based on scroll position
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  // Add scroll listener with throttling using requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu if resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Home" },
      { path: "/about", label: "About" },
      { path: "/projects", label: "Projects" },
      { path: "/resume", label: "Resume" },
      { path: "/contact", label: "Contact" },
    ],
    []
  );

  const toggleMobileMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMobileMenu = useCallback(() => setIsOpen(false), []);

  // Animation variants for overlay opacity
  const overlayVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    []
  );

  // Animation variants for sliding mobile nav
  const mobileNavVariants = useMemo(
    () => ({
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: { type: "tween", duration: 0.3 },
    }),
    []
  );

  return (
    <>
      <NavContainer $scrolled={scrolled}>
        <NavContent>
          <LogoLink to="/">
            <LogoContainer>
              <StyledLogo src={logo} alt="Logo" $isDark={isDarkMode} />
              <Logo>
                <LogoName>Vinay Prabhakar</LogoName>
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
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? "🌙" : "☀️"}
            </ThemeToggle>
          </DesktopNav>

          <MobileMenuButton
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <MobileMenuOverlay {...overlayVariants} onClick={closeMobileMenu} />
            <MobileNav {...mobileNavVariants}>
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.path}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </MobileNavLink>
              ))}
              <MobileThemeToggle
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                <ToggleTrack $dark={isDarkMode}>
                  <ToggleKnob
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    {isDarkMode ? "🌙" : "☀️"}
                  </ToggleKnob>
                </ToggleTrack>
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
  height: 64px;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(10px)" : "blur(4px)"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 2px 10px rgba(0, 0, 0, 0.7)" : "none"};
  transition: background 0.3s ease, box-shadow 0.3s ease,
    backdrop-filter 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
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
  gap: 0.5rem;
`;

const StyledLogo = styled.img`
  height: 35px;
  width: auto;
  transition: filter 0.1s ease;
  filter: ${({ $isDark }) => ($isDark ? "brightness(0) invert(1)" : "none")};

  @media (max-width: 992px) {
    height: 35px;
  }
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

const LogoName = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin-right: 1rem;
`;

const DesktopNav = styled.div`
  display: none;
  gap: 2rem;
  align-items: center;

  @media (min-width: 775px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
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
  padding: 0.4rem;

  @media (min-width: 775px) {
    display: none;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
`;

const MobileNav = styled(motion.div)`
  position: fixed;
  top: 50px;
  right: 0;
  bottom: flex;
  width: 50%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 999;
  overflow-y: auto;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  @media (min-width: 480px) {
    width: 40%;
  }
`;

const MobileNavLink = styled(Link)`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileThemeToggle = styled.button`
  margin-top: auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 0.6rem;
`;

const ToggleTrack = styled.div`
  width: 80px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, $dark }) =>
    $dark ? theme.colors.primaryDark : theme.colors.border};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $dark }) => ($dark ? "flex-end" : "flex-start")};
  transition: background ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const ToggleKnob = styled(motion.div)`
  width: 50px;
  height: 32.5px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Navbar;
