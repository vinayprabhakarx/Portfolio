import { memo, useMemo } from "react"; // Import memo for performance optimization and useMemo for memoizing values
import styled from "styled-components"; // Import styled from styled-components for CSS-in-JS

// Container for the entire footer section.
const FooterContainer = styled.footer`
  width: 100%; // Full width
  padding: 0.5rem; // Padding around content
  background: ${({ theme }) =>
    theme.colors.background}; // Background color from theme
  border-top: 1px solid ${({ theme }) => theme.colors.border}; // Top border for separation
  text-align: center; // Center-aligns text
  margin-top: auto; // Pushes footer to the bottom in a flex container
`;

// Styling for a tagline within the footer.
const Tagline = styled.div`
  color: ${({ theme }) =>
    theme.colors.textSecondary}; // Secondary text color from theme
  margin-bottom: 0.25rem; // Small bottom margin

  strong {
    color: ${({ theme }) =>
      theme.colors.textPrimary}; // Primary text color for strong tags
  }
`;

// Styling for copyright text.
const CopyrightText = styled.p`
  color: ${({ theme }) =>
    theme.colors.textSecondary}; // Secondary text color from theme
  margin: 0; // Remove default paragraph margin

  strong {
    color: ${({ theme }) =>
      theme.colors.textPrimary}; // Primary text color for strong tags
  }
`;

// Footer component, memoized to prevent unnecessary re-renders.
const Footer = memo(() => {
  // Memoize the current year to prevent recalculating it on every render.
  // This ensures the year only updates once per year.
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <FooterContainer>
      <Tagline>
        Made with <strong>React</strong> and ❤️
      </Tagline>
      <CopyrightText>
        &copy;{currentYear} <strong>VinayPrabhakarX</strong>. All rights
        reserved.
      </CopyrightText>
    </FooterContainer>
  );
});

Footer.displayName = "Footer"; // Assign a display name for easier debugging in React DevTools

export default Footer;
