import styled from "styled-components";
import { Link } from "react-router-dom";

// Blog page component showing an under construction message with a link back home.
const Blog = () => {
  return (
    <Wrapper>
      <Title>This page is under construction.</Title>
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          padding: "0.5rem 1rem",
        }}
      >
        Go Back Home
      </Link>
    </Wrapper>
  );
};

// Container to center content both vertically and horizontally.
const Wrapper = styled.div`
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

// Styled heading that uses theme values for typography and color.
const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export default Blog;
