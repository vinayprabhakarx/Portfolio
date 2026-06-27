import styled from "styled-components";

// Global layout primitive for standardizing page widths and horizontal padding.
// Ensures fluid scaling up to a massive 120rem max-width constraint.
const Container = styled.div`
  width: 100%;
  max-width: min(100%, 120rem);
  margin: 0 auto;
  padding: clamp(2rem, 5vh, 4rem) clamp(1.5rem, 5vw, 4rem);
`;

export default Container;
