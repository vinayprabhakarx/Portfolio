import styled from "styled-components";

// Section for profile image and intro
export const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  max-width: 1100px;
  margin: 0 auto ${({ theme }) => theme.spacing["3xl"]};

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Container for biographical text
export const BioSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  transform: translateY(-1.5rem);

  @media (max-width: 1024px) {
    transform: none;
  }
`;

// Styling for biographical text paragraph
export const BioText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  text-align: center;

  @media (max-width: 1024px) {
    text-align: center;
  }
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`;

// Container for tab-specific content
export const TabContent = styled.section`
  margin-top: ${({ theme }) => theme.spacing["3xl"]};
`;

// Styling for company name in experience
export const Company = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Skills Section (Bento Grid)
export const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SkillCategoryCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SkillCategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Container for skill tags
export const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Styling for an individual skill tag
export const SkillTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 16px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  white-space: nowrap;
  transition: all 0.2s ease;

  svg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

// Container for a list of courses
export const CourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  list-style: none;
  padding: 0;
`;

// Styling for an individual course item
export const CourseItem = styled.li`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;


