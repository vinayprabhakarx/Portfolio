import Lottie from "lottie-react";

import devAnimation from "../assets/developer.json";

const DeveloperAnimation = () => (
  <Lottie
    animationData={devAnimation}
    loop
    style={{
      width: "100%",
      maxWidth: "400px",
      height: "auto",
    }}
  />
);

export default DeveloperAnimation;
