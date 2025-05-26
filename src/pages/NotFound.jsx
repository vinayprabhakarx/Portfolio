import { Link } from "react-router-dom"; // Internal navigation link
import styled from "styled-components"; // Styled-components for CSS-in-JS

// 404 NotFound page component
const NotFound = () => {
  return (
    <Wrapper>
      <Title>404 | Not Found</Title>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <Link
        style={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          padding: "0.5rem 1rem",
        }}
        to="/" // Navigate back to home page
      >
        Go Back Home
      </Link>
    </Wrapper>
  );
};

// Wrapper centers content vertically and horizontally
const Wrapper = styled.div`
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing["2xl"]};
  box-sizing: border-box;
`;

// Title styling uses theme fonts and primary color
const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Message styled for readability and secondary text color
const Message = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

export default NotFound;
