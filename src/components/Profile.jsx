import styled from "styled-components";

/**
 * Profile component responsible for rendering the author's headshot.
 * Includes semantic structure and responsive flex wrapping.
 * 
 * @param {string} src - The URL or imported path to the image.
 * @param {string} alt - Accessibility alt text (defaults to "Profile Image").
 */
const Profile = ({ src, alt = "Profile Image" }) => (
  <ProfileSection>
    <PhotoContainer>
      <ProfileImage src={src} alt={alt} width="250" height="250" />
    </PhotoContainer>
  </ProfileSection>
);

// Layout wrapper for the profile section, enabling side-by-side flex layout
// on desktop and column layout on mobile.
const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// Decorative container for the headshot, enforcing strict aspect ratios
// and rounded borders with shadow elevation.
const PhotoContainer = styled.figure`
  flex-shrink: 0;
  width: 15rem;
  height: 15rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 12.5rem;
    height: 12.5rem;
  }
`;

// The img element itself, styled for object-fit cover and hardware acceleration
// to ensure smooth rendering and transitions.
const ProfileImage = styled.img.attrs({ loading: "lazy", decoding: "async" })`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

export default Profile;
