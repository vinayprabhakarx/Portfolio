import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCalendar, FaArrowRight, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [blogPosts] = useState([]);
  const [tags] = useState(["all"]);

  return (
    <BlogContainer>
      <Header>
        <GradientTitle>Blog Posts</GradientTitle>
        <Subtitle>Sharing insights and experiences</Subtitle>
      </Header>

      <TagsContainer>
        {tags.map((tag) => (
          <TagButton
            key={tag}
            active={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </TagsContainer>

      <PostsGrid>
        {blogPosts.length === 0 ? (
          <NoPosts>No posts found</NoPosts>
        ) : (
          blogPosts.map((post, index) => (
            <PostCard
              key={post.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PostImage
                style={{
                  backgroundImage: `url(${
                    post.featuredImage ||
                    "https://source.unsplash.com/random/800x600/?technology"
                  })`,
                }}
              />
              <PostContent>
                <PostMeta>
                  <MetaItem>
                    <FaCalendar />
                    {post.createdAt?.toDate().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </MetaItem>
                  <MetaItem>
                    <FaClock />
                    {post.readTime || "5 min read"}
                  </MetaItem>
                </PostMeta>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <TagsWrapper>
                  {post.tags.map((tag, i) => (
                    <PostTag key={i}>{tag}</PostTag>
                  ))}
                </TagsWrapper>
                <ReadMore as={Link} to={`/blog/${post.id}`}>
                  Read More <FaArrowRight />
                </ReadMore>
              </PostContent>
            </PostCard>
          ))
        )}
      </PostsGrid>
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

const NoPosts = styled.div`
  text-align: center;
  padding: 2rem;
  grid-column: 1 / -1;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const GradientTitle = styled.h1`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const TagButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PostCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1rem;
  }
`;

const PostTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PostTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 15px;
  font-size: 0.85rem;
`;

const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s ease;

  &:hover {
    gap: 0.75rem;
  }
`;

export default Blog;
