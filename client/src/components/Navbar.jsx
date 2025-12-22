import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
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
      if (window.innerWidth >= 775 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Home", internal: true },
      { path: "/about", label: "About", internal: true },
      { path: "/projects", label: "Projects", internal: true },
      // { path: "/resume", label: "Resume", internal: true },
      {
        path: "https://blog.vinayprabhakar.dev",
        label: "Blog",
        internal: false,
      },
      { path: "/contact", label: "Contact", internal: true },
    ],
    []
  );

  const toggleMobileMenu = useCallback(() => {
    // Only toggle if we're in mobile view
    if (window.innerWidth < 775) {
      setIsOpen((prev) => !prev);
    }
  }, []);
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
            {navItems.map((item) =>
              item.internal ? (
                <NavLink
                  key={item.path}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  {item.label}
                </NavLink>
              ) : (
                <ExternalNavLink
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </ExternalNavLink>
              )
            )}
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <FiSun size={20} color="#f5bf41ff" />
              ) : (
                <FiMoon size={20} />
              )}
            </ThemeToggle>
          </DesktopNav>

          <MobileControls>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <FiSun size={20} color="#f5bf41ff" />
              ) : (
                <FiMoon size={20} />
              )}
            </ThemeToggle>
            <MobileMenuButton
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MobileMenuButton>
          </MobileControls>
        </NavContent>
      </NavContainer>

      <AnimatePresence mode="wait">
        {isOpen && window.innerWidth < 775 && (
          <>
            <MobileMenuOverlay {...overlayVariants} onClick={closeMobileMenu} />
            <MobileNav {...mobileNavVariants}>
              {navItems.map((item) =>
                item.internal ? (
                  <MobileNavLink
                    key={item.path}
                    to={item.path}
                    $isActive={location.pathname === item.path}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </MobileNavLink>
                ) : (
                  <MobileExternalNavLink
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </MobileExternalNavLink>
                )
              )}
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
  max-width: 1600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media (max-width: 1400px) {
    max-width: 1200px;
  }

  @media (max-width: 775px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledLogo = styled.img`
  height: 40px;
  width: auto;
  transition: filter 0.1s ease;
  filter: ${({ $isDark }) => ($isDark ? "brightness(0) invert(1)" : "none")};
  @media (max-width: 992px) {
    height: 38px;
  }
`;

const Logo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const LogoName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin-right: ${({ theme }) => theme.spacing.md};

  @media (max-width: 992px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`;

const DesktopNav = styled.div`
  display: none;
  gap: ${({ theme }) => theme.spacing["2xl"]};
  align-items: center;
  @media (min-width: 775px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  position: relative;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  transition: ${({ theme }) => theme.transitions.default};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    width: 100%;
  }
`;

// New styled component for external links
const ExternalNavLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  transition: ${({ theme }) => theme.transitions.default};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 774px) {
    display: flex;
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
  padding: ${({ theme }) => theme.spacing.xs};
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
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
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
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// New styled component for mobile external links
const MobileExternalNavLink = styled.a`
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }

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
  gap: ${({ theme }) => theme.spacing.sm};
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
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Navbar;
