import styled from "styled-components";

// Container for project category buttons, with flexible layout.
export const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  flex-wrap: wrap;
`;

// Grid layout for displaying project cards.
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing["2xl"]};
  margin-top: ${({ theme }) => theme.spacing["2xl"]};
  grid-auto-rows: 1fr;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: ${({ theme }) => theme.spacing["3xl"]};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// Wrapper for individual project card with consistent height
export const ProjectCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
`;

// Container for project links (e.g., GitHub, live demo).
export const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

// Styling for an individual project link.
export const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

// Memoized version of ProjectsGrid for performance.
export const MemoizedProjectsGrid = styled(ProjectsGrid).withConfig({
  shouldForwardProp: (prop) => !["customProp"].includes(prop),
})``;

// Memoized version of ProjectLink with active and disabled states.
export const MemoizedProjectLink = styled(ProjectLink).withConfig({
  shouldForwardProp: (prop) => !["isActive", "disabled"].includes(prop),
})`
  ${({ isActive, theme }) =>
    isActive &&
    `
    color: ${theme.colors.secondary};
    font-weight: 600;
  `}

  ${({ disabled, theme }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  `}
`;

// Section wrapper for projects, ensuring minimum height.
export const ProjectsSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing["4xl"]} 0;
`;

// Styling for an individual project card, with hover effects.
export const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.smooth};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.large};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Responsive grid variant for projects.
export const ResponsiveGrid = styled(ProjectsGrid)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

// Compact grid variant for projects.
export const CompactGrid = styled(ProjectsGrid)`
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

// Animated project card with a fade-in-up effect.
export const AnimatedProjectCard = styled(ProjectCard)`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:nth-child(even) {
    animation-delay: 0.1s;
  }

  &:nth-child(odd) {
    animation-delay: 0.2s;
  }
`;

// Loading card with a shimmer effect.
export const LoadingCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.border}40,
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// Styling for empty state or no projects found message.
export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["4xl"]};
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;
