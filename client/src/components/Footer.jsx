import { memo, useMemo } from "react";
import styled from "styled-components";

// Container for the entire footer section.
const FooterContainer = styled.footer`
  width: 100%;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  margin-top: auto;
`;

// Styling for a tagline within the footer.
const Tagline = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// Styling for copyright text.
const CopyrightText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// Footer component, memoized to prevent unnecessary re-renders.
const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <FooterContainer>
      <CopyrightText>
        &copy;{currentYear} <strong>VinayPrabhakarX</strong>. All rights
        reserved.
      </CopyrightText>
    </FooterContainer>
  );
});

Footer.displayName = "Footer";

export default Footer;
