import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import Button from "../components/Button";
import Card from "../components/Card";
import GradientTitle from "../components/GradientTitle";
import Pagination from "../components/Pagination";
import Container from "../components/Container";
import {
  ProjectLinks,
  ProjectLink,
  ProjectCardWrapper,
} from "../styles/ProjectStyles";
import { projects, categories } from "../data/ProjectData";

// Animated Project Card
const ProjectCard = memo(({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    style={{ height: "100%" }}
  >
    <ProjectCardWrapper>
      <Card
        key={project.id || index}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {project.image ? (
          <Card.Image src={project.image} alt={project.title} />
        ) : (
          <Card.ImagePlaceholder>
            <FaCode />
          </Card.ImagePlaceholder>
        )}
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
              <FaGithub /> Code
            </ProjectLink>
          )}
          {project.demo && (
            <ProjectLink
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt /> Demo
            </ProjectLink>
          )}
        </ProjectLinks>
      </Card>
    </ProjectCardWrapper>
  </motion.div>
));

ProjectCard.displayName = "ProjectCard";

// Animated Category Tab Button
const CategoryTab = memo(({ category, isActive, onClick, index }) => {
  const formatted = category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Button
        $active={isActive}
        onClick={onClick}
        aria-pressed={isActive}
        role="tab"
      >
        {formatted}
      </Button>
    </motion.div>
  );
});

CategoryTab.displayName = "CategoryTab";

// Main Projects Component
const Projects = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProjects, setCurrentProjects] = useState([]);

  // Filtered list based on category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Update currentProjects on category or page change
  useEffect(() => {
    const start = (currentPage - 1) * 4;
    const end = start + 4;
    setCurrentProjects(filteredProjects.slice(start, end));
  }, [filteredProjects, currentPage]);

  // Category button handlers
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const categoryHandlers = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat] = () => handleCategoryChange(cat);
    });
    return map;
  }, [handleCategoryChange]);

  return (
    <Container>
      <GradientTitle>Featured Projects</GradientTitle>

      {/* Category Tabs with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button.TabContainer role="tablist" aria-label="Project categories">
          {categories.map((category, index) => (
            <CategoryTab
              key={category}
              category={category}
              isActive={selectedCategory === category}
              onClick={categoryHandlers[category]}
              index={index}
            />
          ))}
        </Button.TabContainer>
      </motion.div>

      {/* Project Cards */}
      <Card.Grid role="main" aria-label="Projects grid">
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={project.id || `project-${index}`}
            project={project}
            index={index}
          />
        ))}
      </Card.Grid>

      {/* Pagination */}
      {filteredProjects.length > 4 && (
        <Pagination
          data={filteredProjects}
          itemsPerPage={4}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          maxVisiblePages={6}
        />
      )}
    </Container>
  );
});

Projects.displayName = "Projects";

export default Projects;
