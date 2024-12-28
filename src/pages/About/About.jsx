import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";
import profilePhoto from "../../assets/images/profile/photo.png";

const About = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const experience = [
    {
      title: "Fresher",
      company: "Open for Opportunities",
      period: "Present",
      description:
        "Currently seeking opportunities to apply my skills in Machine Learning, Web Development, and Programming. Passionate about building innovative solutions and eager to contribute to meaningful projects.",
      skills: ["Machine Learning", "Web Development", "DSA"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Applications",
      institution: "Indian Institute of Business Management, Patna",
      period: "2022 - Current",
      description:
        "Currently pursuing BCA under Aryabhatta Knowledge University",
      courses: [],
    },
    {
      degree: "Intermediate (12th)",
      institution: "S.K. College, Lohanda, Jamui",
      period: "2018 - 2020",
      description:
        "Completed Intermediate education under Bihar School Examination Board",
      courses: [],
    },
    {
      degree: "Matriculation (10th)",
      institution: "Janta High School, Satyana, Jamui",
      period: "2018",
      description:
        "Completed Matriculation under Bihar School Examination Board",
      courses: [],
    },
  ];

  const skills = {
    "Programming Languages": [
      { name: "Python", details: "Primary language" },
      { name: "C/C++", details: "Basics" },
      { name: "JavaScript", details: "Web development" },
    ],

    "Machine Learning": [
      {
        name: "Python",
        level: 85,
        details: "Programming language for ML",
      },
      { name: "NumPy", level: 42, details: "Data handling" },
      {
        name: "Scikit-learn",
        level: 30,
        details: "ML models, preprocessing",
      },
      {
        name: "Matplotlib",
        level: 10,
        details: "Data visualization",
      },
      { name: "TensorFlow", level: 10, details: "Model building and training" },
    ],
    "Web Development": [
      { name: "React.js" },
      { name: "HTML/CSS" },
      { name: "Node.js" },
    ],
    Database: [
      { name: "SQL", details: "MySQL, SQLite" },
      { name: "MongoDB", details: "NoSQL database" },
    ],
    "Tools I use ": [
      { name: "Linux", details: "Pop-OS as my daily driver" },
      { name: "Git", details: "Version control" },
      { name: "GitHub", details: "Remote Repos" },
      { name: "VS Code", details: "Code editor" },
      { name: "Postman", details: "API testing" },
      { name: "Jupyter Notebook", details: "Machine Learning extension" },
    ],
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <AboutContainer>
      <GradientTitle>About Me</GradientTitle>

      <ProfileSection>
        <PhotoContainer>
          <ProfileImage src={profilePhoto} alt="Vinay Prabhakar" />
        </PhotoContainer>

        <BioSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BioText>
              I'm a passionate Machine Learning Engineer and Data Scientist with
              a strong foundation in computer science and a deep interest in
              artificial intelligence. My journey in tech has been driven by the
              desire to create intelligent systems that solve real-world
              problems.
            </BioText>
          </motion.div>
        </BioSection>
      </ProfileSection>

      <TabContainer>
        <TabButton
          active={activeTab === "experience"}
          onClick={() => setActiveTab("experience")}
        >
          <FaBriefcase /> Experience
        </TabButton>
        <TabButton
          active={activeTab === "education"}
          onClick={() => setActiveTab("education")}
        >
          <FaGraduationCap /> Education
        </TabButton>
        <TabButton
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
        >
          <FaCode /> Skills
        </TabButton>
      </TabContainer>

      <TabContent>
        {activeTab === "experience" && (
          <Timeline>
            {experience.map((exp, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TimelineHeader>
                  <h3>{exp.title}</h3>
                  <Period>{exp.period}</Period>
                </TimelineHeader>
                <Company>{exp.company}</Company>
                <Description>{exp.description}</Description>
                <SkillTags>
                  {exp.skills.map((skill, i) => (
                    <SkillTag key={i}>{skill}</SkillTag>
                  ))}
                </SkillTags>
              </TimelineItem>
            ))}
          </Timeline>
        )}

        {activeTab === "education" && (
          <Timeline>
            {education.map((edu, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TimelineHeader>
                  <h3>{edu.degree}</h3>
                  <Period>{edu.period}</Period>
                </TimelineHeader>
                <Company>{edu.institution}</Company>
                <Description>{edu.description}</Description>
                <CourseList>
                  {edu.courses.map((course, i) => (
                    <CourseItem key={i}>{course}</CourseItem>
                  ))}
                </CourseList>
              </TimelineItem>
            ))}
          </Timeline>
        )}

        {activeTab === "skills" && (
          <SkillsContainer>
            {Object.entries(skills).map(([category, skillList]) => (
              <SkillSection key={category}>
                <SkillCategoryHeader onClick={() => toggleSection(category)}>
                  <CategoryTitle>
                    <ArrowIcon isExpanded={expandedSection === category}>
                      ▶
                    </ArrowIcon>
                    {category}
                  </CategoryTitle>
                </SkillCategoryHeader>
                <SkillList isExpanded={expandedSection === category}>
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
                          <SkillDetails>{skill.details}</SkillDetails>
                        )}
                      </SkillInfo>
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillSection>
            ))}
          </SkillsContainer>
        )}
      </TabContent>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
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

const PhotoContainer = styled.div`
  flex-shrink: 0;
  width: 280px;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
  padding: 4px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 4px;
    background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const GradientTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BioSection = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const BioText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)"
      : "transparent"};
  color: ${(props) =>
    props.active ? "white" : ({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid ${(props) => (props.active ? "transparent" : "#6a11cb")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.2);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const TabContent = styled.div`
  margin-top: 3rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, #6a11cb 0%, #2575fc 100%);

    @media (max-width: 768px) {
      left: 15px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-left: 30px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-left: 45px;
    backdrop-filter: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: -30px;
    top: 50%;
    width: 30px;
    height: 2px;
    background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);

    @media (max-width: 768px) {
      left: -30px;
      width: 30px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: -36px;
    top: calc(50% - 6px);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
    box-shadow: 0 0 0 4px rgba(106, 17, 203, 0.2);

    @media (max-width: 768px) {
      left: -36px;
    }
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
  }
`;

const Period = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Company = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CourseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const CourseItem = styled.div`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  font-size: 0.9rem;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SkillSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SkillCategoryHeader = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  background: rgba(106, 17, 203, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(106, 17, 203, 0.2);
  }
`;

const CategoryTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(${({ isExpanded }) => (isExpanded ? "90deg" : "0deg")});
  color: #60a5fa;
`;

const SkillList = styled(motion.div)`
  padding: ${({ isExpanded }) => (isExpanded ? "1rem" : "0")};
  height: ${({ isExpanded }) => (isExpanded ? "auto" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SkillBullet = styled.span`
  color: #60a5fa;
  font-size: 1.5rem;
`;

const SkillInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SkillDetails = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  font-style: italic;
`;

const SkillName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export default About;