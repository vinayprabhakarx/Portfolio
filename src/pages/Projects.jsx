import { useState, useMemo, useCallback, memo } from "react";
import TabButton from "../components/TabButton";
import Card from "../components/Card";
import GradientTitle from "../components/GradientTitle";
import Pagination from "../components/Pagination";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects, categories } from "../data/ProjectData";
import Container from "../components/Container";
import { ProjectLinks, ProjectLink } from "../styles/ProjectStyles";

// ProjectCard: renders individual project with animation and links
const ProjectCard = memo(({ project, index }) => (
  <Card
    key={project.id || index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card.Title>{project.title}</Card.Title>
    <Card.Description>{project.description}</Card.Description>
    {project.highlights?.length > 0 && (
      <Card.HighlightsList>
        {project.highlights.map((highlight, hIndex) => (
          <Card.HighlightItem key={`highlight-${index}-${hIndex}`}>
            • {highlight}
          </Card.HighlightItem>
        ))}
      </Card.HighlightsList>
    )}
    <Card.TagContainer>
      {project.tags.map((tag, tagIndex) => (
        <Card.Tag key={`tag-${index}-${tagIndex}`}>{tag}</Card.Tag>
      ))}
    </Card.TagContainer>
    <ProjectLinks>
      {project.github && (
        <ProjectLink
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
        >
          <FaGithub aria-hidden="true" /> Code
        </ProjectLink>
      )}
      {project.demo && (
        <ProjectLink
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} live demo`}
        >
          <FaExternalLinkAlt aria-hidden="true" /> Demo
        </ProjectLink>
      )}
    </ProjectLinks>
  </Card>
));

ProjectCard.displayName = "ProjectCard";

// CategoryTab: tab button with formatted category name and accessibility attributes
const CategoryTab = memo(({ category, isActive, onClick }) => {
  const formattedCategory = useMemo(
    () =>
      category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    [category]
  );

  return (
    <TabButton
      $active={isActive}
      onClick={onClick}
      aria-pressed={isActive}
      role="tab"
    >
      {formattedCategory}
    </TabButton>
  );
});

CategoryTab.displayName = "CategoryTab";

// Main Projects component
const Projects = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProjects, setCurrentProjects] = useState([]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  // Pagination handlers
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleDataChange = useCallback((paginatedData) => {
    setCurrentProjects(paginatedData);
  }, []);

  // Handle category change and reset page to 1
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  // Pre-generate handlers for each category button
  const categoryHandlers = useMemo(() => {
    const handlers = {};
    categories.forEach((category) => {
      handlers[category] = () => handleCategoryChange(category);
    });
    return handlers;
  }, [handleCategoryChange]);

  if (!projects.length) {
    return (
      <Container>
        <GradientTitle>Featured Projects</GradientTitle>
        <p>No projects available at the moment.</p>
      </Container>
    );
  }

  return (
    <Container>
      <GradientTitle>Featured Projects</GradientTitle>

      <TabButton.TabContainer role="tablist" aria-label="Project categories">
        {categories.map((category) => (
          <CategoryTab
            key={category}
            category={category}
            isActive={selectedCategory === category}
            onClick={categoryHandlers[category]}
          />
        ))}
      </TabButton.TabContainer>

      <Card.Grid role="main" aria-label="Projects grid">
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={project.id || `project-${index}`}
            project={project}
            index={index}
          />
        ))}
      </Card.Grid>

      {filteredProjects.length > 0 && (
        <Pagination
          data={filteredProjects}
          itemsPerPage={3}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onDataChange={handleDataChange}
          maxVisiblePages={6}
        />
      )}
    </Container>
  );
});

Projects.displayName = "Projects";

export default Projects;
