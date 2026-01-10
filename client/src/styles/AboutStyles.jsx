import styled from "styled-components";

// Section for profile image and intro
export const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// Container for biographical text
export const BioSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["4xl"]};
  text-align: center;
`;

// Styling for biographical text paragraph
export const BioText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
  user-select: none;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`;

// Container for tab-specific content
export const TabContent = styled.section`
  margin-top: ${({ theme }) => theme.spacing["3xl"]};

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// Styling for company name in experience
export const Company = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes["xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

// Container for skill tags
export const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// Styling for an individual skill tag
export const SkillTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 15px;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
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

// Main container for skills sections
export const SkillsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 100%;
  margin: 0 auto;
`;

// Styling for skill details (e.g., frameworks)
export const SkillDetails = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes["xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-style: italic;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

// Styling for skill name
export const SkillName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

// Styling for skill category title (e.g., "Programming Languages")
export const SkillCategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.lineHeights.tight};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`;
