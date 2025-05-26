import styled from "styled-components";
import { motion } from "framer-motion";

// Section for profile image and intro
export const ProfileSection = styled.div`
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

// Container for biographical text
export const BioSection = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

// Styling for biographical text paragraph
export const BioText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
  user-select: none;
`;

// Container for tab-specific content
export const TabContent = styled.div`
  margin-top: 3rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// Styling for company name in experience
export const Company = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

// Container for skill tags
export const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

// Styling for an individual skill tag
export const SkillTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

// Container for a list of courses
export const CourseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

// Styling for an individual course item
export const CourseItem = styled.div`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  font-size: 0.9rem;
`;

// Main container for skills sections
export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 800px;
  margin: 0 auto;
`;

// Styling for an individual collapsible skill category
export const SkillSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};

    &::before {
      box-shadow: ${({ theme }) => theme.shadows.primaryHover};
      transform: scale(1.1);
    }
  }
`;

// Clickable header for skill category
export const SkillCategoryHeader = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.surface};
  transition: background-color ${({ theme }) => theme.transitions.slow};
`;

// Title text for skill category header
export const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Arrow icon for expanding/collapsing categories
export const ArrowIcon = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? "90deg" : "0deg")});
  color: ${({ theme }) => theme.colors.secondary};
`;

// Motion-enabled container for list of skills
export const SkillList = styled(motion.div)`
  padding: ${({ $isExpanded }) => ($isExpanded ? "auto" : "0")};
  height: ${({ $isExpanded }) => ($isExpanded ? "auto" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

// Motion-enabled styling for an individual skill item
export const SkillItem = styled(motion.div)`
  display: flex;
  padding: 0.75rem;
  gap: 2rem;
  margin-bottom: 0;
`;

// Styling for skill bullet point
export const SkillBullet = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 2rem;
`;

// Container for skill name and details
export const SkillInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

// Styling for skill details (e.g., frameworks)
export const SkillDetails = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 2rem;
  font-style: italic;
`;

// Styling for skill name
export const SkillName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;
