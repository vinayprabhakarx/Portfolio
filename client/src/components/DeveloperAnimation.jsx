import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import devAnimation from "../assets/developer.json";

const DeveloperAnimation = () => {
  const animationContainer = useRef(null);
  const lottieInstance = useRef(null);

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
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
      }}
    />
  );
};

export default DeveloperAnimation;
