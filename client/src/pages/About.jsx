import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";
import profilePhoto from "../assets/photo.png";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import GradientTitle from "../components/GradientTitle";
import Profile from "../components/Profile";
import TimelineComponent from "../components/TimelineComponent";
import { experience, education, skills, bioText } from "../data/AboutData";
import { useTheme } from "styled-components";
import {
  ProfileSection,
  BioSection,
  BioText,
  TabContent,
  Company,
  CourseList,
  CourseItem,
  SkillsContainer,
  SkillName,
} from "../styles/AboutStyles"; // Styled components

const About = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("experience");

  const tabs = [
    { id: "experience", icon: FaBriefcase, label: "Experience" },
    { id: "education", icon: FaGraduationCap, label: "Education" },
    { id: "skills", icon: FaCode, label: "Skills" },
  ];

  const renderTimelineItems = (items, type) =>
    items.map((item) => ({
      title: type === "education" ? item.degree : item.title,
      duration: item.period,
      extra: (
        <>
          <Company>
            {type === "experience" ? item.company : item.institution}
          </Company>
          <Card.HighlightItem>{item.description}</Card.HighlightItem>
          {type === "education" && item.courses && item.courses.length > 0 && (
            <CourseList>
              {item.courses.map((course, idx) => (
                <CourseItem key={idx}>{course}</CourseItem>
              ))}
            </CourseList>
          )}
        </>
      ),
    }));

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
          <SkillsContainer
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 style={{ marginBottom: "1rem" }}>{category}</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {skillList.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <Card
                        key={index}
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{
                          padding: "0.75rem",
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                        }}
                      >
                        {Icon && (
                          <Icon size={28} color={theme.colors.primary} />
                        )}
                        <div>
                          <SkillName style={{ fontWeight: 600 }}>
                            {skill.name}
                          </SkillName>
                          {skill.details}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
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
          <BioText>{bioText}</BioText>
        </BioSection>
      </ProfileSection>

      {/* Animate each tab button */}
      <Button.TabContainer>
        {tabs.map(({ id, icon: Icon, label }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Button $active={activeTab === id} onClick={() => setActiveTab(id)}>
              <Icon /> {label}
            </Button>
          </motion.div>
        ))}
      </Button.TabContainer>

      <TabContent>{renderTabContent()}</TabContent>
    </Container>
  );
};

export default About;
