import { useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import lottie from "lottie-web/build/player/lottie_light";

const DeveloperAnimation = () => {
  const animationContainer = useRef(null);
  const lottieInstance = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    let cancelled = false;
    const animationDataUrl = new URL("../assets/developer.json", import.meta.url);

    const loadAnimation = async () => {
      const response = await fetch(animationDataUrl);
      if (cancelled || !response.ok) return;
      const animationData = await response.json();

      if (animationContainer.current && !cancelled) {
        lottieInstance.current = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData,
        });
      }
    };

    loadAnimation();

    return () => {
      cancelled = true;
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
