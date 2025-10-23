import styled from "styled-components";
import { motion } from "framer-motion";

// TimelineComponent displays a vertical timeline of events.
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

// Timeline wrapper with vertical line
const Timeline = styled.div`
  position: relative;
  max-width: 1000px;
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

// Styled individual timeline entry with animation
const TimelineItem = styled(motion.div)`
  position: relative;
  margin-left: 30px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: ${({ theme }) => theme.transitions.default};
  will-change: transform;
  isolation: isolate;

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

// Header for each timeline item
const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin: 0;
    line-height: ${({ theme }) => theme.lineHeights.tight};
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    }
  }
`;

// Duration styling
const Duration = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`;

export default TimelineComponent;
