import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  margin-top: auto;
`;

const CopyrightText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <CopyrightText>
        &copy; Copyright {currentYear} VinayPrabhakarX. All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
