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
    background: ${({ theme }) => theme.colors.border};
    opacity: 0.5;

    @media (max-width: 768px) {
      left: 15px;
    }
  }
`;

// Styled individual timeline entry with animation
const TimelineItem = styled(motion.article)`
  position: relative;
  margin-left: 40px;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: all 0.3s ease;
  will-change: transform;
  isolation: isolate;

  @media (max-width: 768px) {
    margin-left: 45px;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  &::before {
    content: "";
    position: absolute;
    left: -46px;
    top: calc(50% - 7px);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
    border: 3px solid ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    z-index: 1;

    @media (max-width: 768px) {
      left: -37px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: -32px;
    top: 50%;
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
    opacity: 0.5;
    transform: translateY(-50%);
    z-index: 0;

    @media (max-width: 768px) {
      left: -24px;
      width: 24px;
    }
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
