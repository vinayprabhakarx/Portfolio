import React from "react";
import styled from "styled-components";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

export default Home;
