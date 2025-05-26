import { memo, forwardRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

/* ─── Styled Components ─── */

/**
 * Animated card container leveraging framer-motion for smooth transitions and hover effects.
 * Uses theme values for consistent styling including background, border, shadows, and spacing.
 */
const CardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
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
      opacity: 1; // Enable pseudo-element visibility on hover if used for effects
    }
  }
`;

/**
 * Responsive grid layout for multiple cards.
 * Automatically adjusts columns based on available width, with a minimum card width of 300px.
 */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

/**
 * Title styling for cards, using theme typography and color standards.
 */
const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

/**
 * Description paragraph with comfortable spacing and line height for readability.
 */
const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem 0;
  line-height: 1.6;
`;

/**
 * Container for a list of highlights or bullet points.
 */
const HighlightsList = styled.div`
  margin: 1rem 0;
`;

/**
 * Individual highlight item styled with secondary text color and italic font style.
 * Flex layout is used to accommodate optional icons alongside text.
 */
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

/**
 * Container for tags, supporting wrapping and spacing between tags.
 */
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

/**
 * Tag element styled with a transparent gradient background and primary color text.
 * Rounded pill shape for visual appeal and consistent sizing.
 */
const Tag = styled.span`
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
`;

/**
 * Text styling for work period or duration with secondary text color and medium font weight.
 */
const WorkPeriod = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

/**
 * Decorative background gradient positioned absolutely behind card content.
 */
const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  z-index: -1;
`;

/* ─── Main Card Component ─── */

/**
 * Card component encapsulating the card container with animation support.
 * Memoized for rendering performance and supports forwarding refs to the root element.
 */
const Card = memo(
  forwardRef(({ children, ...props }, ref) => (
    <CardContainer ref={ref} {...props}>
      {children}
    </CardContainer>
  ))
);

Card.displayName = "Card";

/* ─── Attaching Subcomponents for Modular API ─── */

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
