import styled from "styled-components";
const BlogDev = () => {
  return (
    <BlogContainer>
      {/* Temporary Under Development Message */}
      <UnderDevelopment>This page is under development.</UnderDevelopment>
    </BlogContainer>
  );
};
const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const UnderDevelopment = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default BlogDev;
