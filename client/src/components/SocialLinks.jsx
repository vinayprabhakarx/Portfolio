import styled from "styled-components";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaTumblr,
  FaKaggle,
} from "react-icons/fa6";
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

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const SocialLinks = () => {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/VinayPrabhakarX/", icon: FaLinkedin },
    { href: "https://github.com/VinayPrabhakarX", icon: FaGithub },
    { href: "https://www.kaggle.com/vinayprabhakarx", icon: FaKaggle },
    { href: "https://x.com/VinayPrabhakarX", icon: FaXTwitter },
    { href: "https://instagram.com/VinayPrabhakarX", icon: FaInstagram },
    { href: "https://www.pinterest.com/vinayprabhakarx/", icon: FaPinterest },
    { href: "https://vinayprabhakar.tumblr.com/", icon: FaTumblr },
  ];

  return (
    <SocialLinksContainer aria-label="Social media links">
      {socialLinks.map(({ href, icon }, index) => {
        const IconComponent = icon;
        return (
          <SocialIcon
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent />
          </SocialIcon>
        );
      })}
    </SocialLinksContainer>
  );
};

export default SocialLinks;
