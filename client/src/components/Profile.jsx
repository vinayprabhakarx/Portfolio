import styled from "styled-components";

// Image component for profile photo.
const Profile = ({ src, alt = "Profile Image" }) => (
  <ProfileSection>
    <PhotoContainer>
      <ProfileImage src={src} alt={alt} />
    </PhotoContainer>
  </ProfileSection>
);

// Container for the profile image and intro section.
const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

// Container for the profile photo, with a decorative border/background.
const PhotoContainer = styled.figure`
  flex-shrink: 0;
  width: 280px;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.large};
  background: ${({ theme }) => theme.gradients.primary};
  padding: 4px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 4px;
    background: ${({ theme }) => theme.gradients.primary};
    mask: linear-gradient(${({ theme }) => theme.colors.white} 0 0) content-box, linear-gradient(${({ theme }) => theme.colors.white} 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(${({ theme }) => theme.colors.white} 0 0) content-box,
      linear-gradient(${({ theme }) => theme.colors.white} 0 0);
    -webkit-mask-composite: xor;
    will-change: transform;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

// Styling for the actual profile image.
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

export default Profile;
