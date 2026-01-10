import { memo, forwardRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// ─── Styled Components ───

const CardContainer = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 15px ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.primaryGlow};

    &::before {
      opacity: 1;
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const CardImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 1400px) {
    gap: ${({ theme }) => theme.spacing["2xl"]};
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  }
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

const HighlightsList = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const HighlightItem = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
  }
`;

const WorkPeriod = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
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

Card.Image = memo(CardImage);
Card.Image.displayName = "Card.Image";

Card.ImagePlaceholder = memo(CardImagePlaceholder);
Card.ImagePlaceholder.displayName = "Card.ImagePlaceholder";

export default Card;
