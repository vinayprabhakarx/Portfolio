import { useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import lottie from "lottie-web/build/player/lottie_light";
import devAnimation from "../assets/developer.json";

const DeveloperAnimation = () => {
  const animationContainer = useRef(null);
  const lottieInstance = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (animationContainer.current) {
      lottieInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: devAnimation,
      });
    }

    // Clean up on component unmount
    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div
      ref={animationContainer}
      role="img"
      aria-label="Developer working animation"
      style={{
        width: "100%",
        maxWidth: "450px",
        height: "auto",
        filter: theme.isDark ? "none" : "brightness(0.7) contrast(1.2)",
      }}
    />
  );
};

export default DeveloperAnimation;
