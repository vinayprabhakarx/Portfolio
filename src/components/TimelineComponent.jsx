import styled from "styled-components";
import { motion } from "framer-motion";

// TimelineComponent displays a vertical timeline of events.
const TimelineComponent = ({ items }) => (
  <Timeline>
    {items.map((item, index) => (
      <TimelineItem
        key={index}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <TimelineHeader>
          <h3>{item.title}</h3> {/* Item title (e.g., job title, degree) */}
          <Duration>{item.duration}</Duration> {/* Duration of the item */}
        </TimelineHeader>
        {item.extra} {/* Additional content for the item */}
      </TimelineItem>
    ))}
  </Timeline>
);

// Main container for the timeline, with a vertical line in the middle.
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
    background: ${({ theme }) => theme.gradients.primary};

    @media (max-width: 768px) {
      left: 15px;
    }
  }
`;

// Styling for the duration text within each timeline item.
const Duration = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  font-size: 0.95rem;
`;

// Styling for an individual timeline item, animated with Framer Motion.
const TimelineItem = styled(motion.div)`
  position: relative;
  margin-left: 30px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 45px;
    backdrop-filter: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: -36px;
    top: calc(50% - 6px);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.primary};
    box-shadow: ${({ theme }) => theme.gradients.primary};
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      left: -36px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: -24px;
    top: 50%;
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    transform: translateY(-50%);
    z-index: 0;

    @media (max-width: 768px) {
      left: -24px;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};

    &::before {
      transform: scale(1.3);
    }
  }
`;

// Styling for the header part of each timeline item (title and duration).
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

export default TimelineComponent;
