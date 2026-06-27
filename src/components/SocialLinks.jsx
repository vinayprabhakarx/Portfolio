import styled from "styled-components";
import { iconMap } from "../utils/iconMap";

const SocialLinksContainer = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SocialLinks = () => {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/VinayPrabhakarX/", icon: iconMap.FaLinkedin },
    { href: "https://github.com/VinayPrabhakarX", icon: iconMap.FaGithub },
    { href: "https://www.kaggle.com/vinayprabhakarx", icon: iconMap.FaKaggle },
    { href: "https://x.com/VinayPrabhakarX", icon: iconMap.FaXTwitter },
  ];

  return (
    <SocialLinksContainer aria-label="Social media links">
      {socialLinks.map(({ href, icon: IconComponent }, index) => {
        return (
          <SocialIcon
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent size="1em" />
          </SocialIcon>
        );
      })}
    </SocialLinksContainer>
  );
};

export default SocialLinks;
