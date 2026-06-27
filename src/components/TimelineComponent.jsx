import styled from "styled-components";
import { motion } from "framer-motion";

/**
 * Renders a vertical timeline layout (used for Experience/Education).
 * Maps through an array of items and orchestrates staggered entrance animations.
 * 
 * @param {Array} items - Array of timeline objects containing title, duration, and extra content.
 */
const TimelineComponent = ({ items }) => (
  <Timeline>
    {items.map((item, index) => (
      <TimelineItem
        key={index}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <TimelineHeader>
          <h3>{item.title}</h3>
          <Duration>{item.duration}</Duration>
        </TimelineHeader>
        {item.extra}
      </TimelineItem>
    ))}
  </Timeline>
);

// The outer container for the timeline.
// Uses a pseudo-element (`::before`) to draw the continuous vertical tracking line.
const Timeline = styled.div`
  position: relative;
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: 1rem;
    top: 0;
    height: 100%;
    width: 0.125rem;
    background: ${({ theme }) => theme.colors.border};
    opacity: 0.5;
  }
`;

// Individual animated entry on the timeline.
// Uses pseudo-elements to draw the connecting node (circle) and horizontal connector line.
const TimelineItem = styled(motion.article)`
  position: relative;
  margin-left: 3.5rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: all 0.3s ease;
  will-change: transform;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    left: -2.9375rem; /* Exactly aligns center of dot with vertical line at -2.4375rem */
    top: calc(50% - 0.5rem);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
    border: 0.1875rem solid ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    left: -2.4375rem;
    top: 50%;
    width: 2.4375rem;
    height: 0.125rem;
    background: ${({ theme }) => theme.colors.border};
    opacity: 0.5;
    transform: translateY(-50%);
    z-index: 0;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-4px) !important;
    border-color: ${({ theme }) => theme.colors.primary};

    &::before {
      background: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 15px ${({ theme }) => theme.colors.primary}80;
    }
    
    &::after {
      background: ${({ theme }) => theme.colors.primary};
      opacity: 0.8;
    }
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin: 0;
    line-height: ${({ theme }) => theme.lineHeights.tight};
    flex: 1 1 15rem;
    min-width: 0;
  }
`;

const Duration = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  flex-shrink: 0;
  white-space: nowrap;
`;

export default TimelineComponent;
