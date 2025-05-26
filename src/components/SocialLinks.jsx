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
const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;

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
    <SocialLinksContainer>
      {socialLinks.map(({ href, icon: Icon }, index) => (
        <SocialIcon
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon />
        </SocialIcon>
      ))}
    </SocialLinksContainer>
  );
};

export default SocialLinks;
