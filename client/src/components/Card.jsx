import { memo, forwardRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// ─── Styled Components ───

const CardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};

    &::before {
      opacity: 1;
    }
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem 0;
  line-height: 1.6;
`;

const HighlightsList = styled.div`
  margin: 1rem 0;
`;

const HighlightItem = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0.5rem 0;
  line-height: 1.4;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const WorkPeriod = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: -1;
`;

// ─── Main Card Component ───

const Card = memo(
  forwardRef(({ children, ...props }, ref) => (
    <CardContainer ref={ref} {...props}>
      {children}
    </CardContainer>
  ))
);

Card.displayName = "Card";

// ─── Subcomponents ───

Card.Grid = memo(CardGrid);
Card.Grid.displayName = "Card.Grid";

Card.Title = memo(CardTitle);
Card.Title.displayName = "Card.Title";

Card.Description = memo(CardDescription);
Card.Description.displayName = "Card.Description";

Card.HighlightsList = memo(HighlightsList);
Card.HighlightsList.displayName = "Card.HighlightsList";

Card.HighlightItem = memo(HighlightItem);
Card.HighlightItem.displayName = "Card.HighlightItem";

Card.TagContainer = memo(TagContainer);
Card.TagContainer.displayName = "Card.TagContainer";

Card.Tag = memo(Tag);
Card.Tag.displayName = "Card.Tag";

Card.WorkPeriod = memo(WorkPeriod);
Card.WorkPeriod.displayName = "Card.WorkPeriod";

Card.GradientBackground = memo(GradientBackground);
Card.GradientBackground.displayName = "Card.GradientBackground";

export default Card;
