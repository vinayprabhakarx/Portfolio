/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
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
  SkillCategoryTitle,
  SkillTag,
  SkillTags,
} from "../styles/AboutStyles";

const About = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("experience");
  const tabContentRef = useRef(null);

  // Handle tab click with scroll
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Scroll to tab content after a short delay to allow content to render
    setTimeout(() => {
      if (tabContentRef.current) {
        const navbarHeight = 80; // Account for fixed navbar + some padding
        const elementPosition = tabContentRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

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
              <section key={category}>
                <SkillCategoryTitle>{category}</SkillCategoryTitle>
                <SkillTags>
                  {skillList.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <SkillTag
                        key={index}
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {Icon && <Icon size={26} />}
                        {skill.name}
                      </SkillTag>
                    );
                  })}
                </SkillTags>
              </section>
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
            <Button
              $active={activeTab === id}
              onClick={() => handleTabClick(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon /> {label}
            </Button>
          </motion.div>
        ))}
      </Button.TabContainer>

      <TabContent ref={tabContentRef}>{renderTabContent()}</TabContent>
    </Container>
  );
};

export default About;
