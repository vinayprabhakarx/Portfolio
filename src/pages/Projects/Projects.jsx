import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaExternalLinkAlt, FaMedkit } from "react-icons/fa";
import { motion } from "framer-motion";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    // {
    //   title: "AI Disease Detection System",
    //   description:
    //     "An intelligent healthcare system that predicts potential diseases based on patient symptoms using machine learning algorithms. Features include symptom analysis, disease prediction, and confidence scoring.",
    //   tags: [
    //     "Machine Learning",
    //     "Python",
    //     "Healthcare",
    //     "scikit-learn",
    //     "Flask",
    //   ],
    //   github: "https://github.com/VinayPrabhakarX/disease-detection",
    //   demo: "#",
    //   category: "machine-learning",
    //   highlights: [
    //     "Accurate disease prediction based on symptom patterns",
    //     "User-friendly interface for symptom input",
    //     "Integration with medical databases",
    //     "Real-time analysis and results",
    //   ],
    // },
    {
      title: "Course Selling App",
      description:
        "Scalable Node.js backend with MongoDB for an online course platform featuring JWT authentication, course management and secure payment tracking.",
      tags: ["Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/VinayPrabhakarX/course-selling-app",
      demo: "https://github.com/VinayPrabhakarX/course-selling-app?tab=readme-ov-file#-installation",
      category: "backend",
      highlights: [
        "JWT authentication for admins and users",
        "Course management with Cloudinary image uploads",
        "Secure course purchase system",
      ],
    },
    {
      title: "Portfolio Website",
      description:
        "Modern portfolio website built with React and styled-components featuring interactive animations.",
      tags: ["React.js", "Express.js", "Node.js", "Cloudflare"],
      github: "https://github.com/VinayPrabhakarX/Portfolio",
      demo: "https://vinayprabhakar.tech",
      category: "web",
      highlights: [
        "Showcases my work, skills, and background.",
        "Includes a contact form so visitors can easily get in touch with me.",
        "Works smoothly on mobile, tablet, and desktop devices.",
      ],
    },
  ];

  const categories = ["all", "web", "backend", "machine-learning"];

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "all" ? true : project.category === selectedCategory
  );

  return (
    <ProjectsContainer>
      <GradientTitle>Featured Projects</GradientTitle>

      <CategoryContainer>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </FilterButton>
        ))}
      </CategoryContainer>

      <ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectContent>
              <ProjectHeader>
                {project.category === "machine-learning" && (
                  <FaMedkit className="project-icon" />
                )}
                <ProjectCategory>
                  {project.category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </ProjectCategory>
                <ProjectTitle>{project.title}</ProjectTitle>
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>

              {project.highlights && (
                <HighlightsList>
                  {project.highlights.map((highlight, hIndex) => (
                    <HighlightItem key={hIndex}>• {highlight}</HighlightItem>
                  ))}
                </HighlightsList>
              )}

              <TagContainer>
                {project.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))}
              </TagContainer>

              <ProjectLinks>
                {project.github && (
                  <ProjectLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> Code
                  </ProjectLink>
                )}
                {project.demo && (
                  <ProjectLink
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Demo
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ProjectsContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const GradientTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${({ active, theme }) =>
    active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.primary)};
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  border: 2px solid
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.2);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};

    &::before {
      opacity: 1;
    }
  }
`;

const ProjectContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .project-icon {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const ProjectCategory = styled.span`
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 1rem 0;
  line-height: 1.6;
`;

const HighlightsList = styled.div`
  margin: 1rem 0;
`;

const HighlightItem = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin: 0.5rem 0;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.4;

  &:before {
    content: "";
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export default Projects;
