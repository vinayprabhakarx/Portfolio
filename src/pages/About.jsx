import { useState } from "react"; // State management hook
import { motion } from "framer-motion"; // Animation library
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa"; // Icons for tabs
import profilePhoto from "../assets/photo.png"; // Profile image asset
import Container from "../components/Container";
import Card from "../components/Card"; // Card component for styling
import TabButton from "../components/TabButton"; // Tab button component
import GradientTitle from "../components/GradientTitle"; // Gradient title component
import Profile from "../components/Profile"; // Profile image component
import TimelineComponent from "../components/TimelineComponent"; // Timeline component for experience/education
import { experience, education, skills, bioText } from "../data/AboutData"; // Data for about sections
import {
  ProfileSection,
  BioSection,
  BioText,
  TabContent,
  Company,
  CourseList,
  CourseItem,
  SkillsContainer,
  SkillSection,
  SkillCategoryHeader,
  CategoryTitle,
  ArrowIcon,
  SkillList,
  SkillItem,
  SkillBullet,
  SkillInfo,
  SkillName,
} from "../styles/AboutStyles"; // Styled components for About page

const About = () => {
  const [activeTab, setActiveTab] = useState("experience"); // State for active tab
  const [expandedSection, setExpandedSection] = useState(null); // State for expanded skill section

  // Toggles the expansion of a skill section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Configuration for tabs
  const tabs = [
    { id: "experience", icon: FaBriefcase, label: "Experience" },
    { id: "education", icon: FaGraduationCap, label: "Education" },
    { id: "skills", icon: FaCode, label: "Skills" },
  ];

  // Renders timeline items for experience or education
  const renderTimelineItems = (items, type) =>
    items.map((item) => ({
      title: type === "education" ? item.degree : item.title,
      duration: item.period,
      extra: (
        <>
          <Company>
            {type === "education" ? item.institution : item.company}
          </Company>
          <Card.HighlightItem>{item.description}</Card.HighlightItem>
          {type === "experience" && (
            <Card.TagContainer>
              {item.skills.map((skill, i) => (
                <Card.Tag key={i}>{skill}</Card.Tag>
              ))}
            </Card.TagContainer>
          )}
          {type === "education" && item.courses.length > 0 && (
            <CourseList>
              {item.courses.map((course, i) => (
                <CourseItem key={i}>{course}</CourseItem>
              ))}
            </CourseList>
          )}
        </>
      ),
    }));

  // Renders content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "experience":
        return (
          <TimelineComponent
            items={renderTimelineItems(experience, "experience")}
          />
        );
      case "education":
        return (
          <TimelineComponent
            items={renderTimelineItems(education, "education")}
          />
        );
      case "skills":
        return (
          <SkillsContainer>
            {Object.entries(skills).map(([category, skillList]) => (
              <SkillSection key={category}>
                <SkillCategoryHeader onClick={() => toggleSection(category)}>
                  <CategoryTitle>
                    <ArrowIcon $isExpanded={expandedSection === category}>
                      ▶
                    </ArrowIcon>
                    {category}
                  </CategoryTitle>
                </SkillCategoryHeader>
                <SkillList $isExpanded={expandedSection === category}>
                  {skillList.map((skill, index) => (
                    <SkillItem
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <SkillBullet>•</SkillBullet>
                      <SkillInfo>
                        <SkillName>{skill.name}</SkillName>
                        {skill.details && (
                          <Card.HighlightItem>
                            {skill.details}
                          </Card.HighlightItem>
                        )}
                      </SkillInfo>
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillSection>
            ))}
          </SkillsContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <GradientTitle>About Me</GradientTitle>

      <ProfileSection>
        <Profile src={profilePhoto} alt="Vinay Prabhakar" />
        <BioSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BioText>{bioText}</BioText>
          </motion.div>
        </BioSection>
      </ProfileSection>

      <TabButton.TabContainer>
        {tabs.map(({ id, icon: Icon, label }) => (
          <TabButton
            key={id}
            $active={activeTab === id}
            onClick={() => setActiveTab(id)}
          >
            <Icon /> {label}
          </TabButton>
        ))}
      </TabButton.TabContainer>

      <TabContent>{renderTabContent()}</TabContent>
    </Container>
  );
};

export default About;
