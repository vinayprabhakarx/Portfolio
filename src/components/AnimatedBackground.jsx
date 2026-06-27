import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../hooks/useTheme";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

/**
 * Renders an animated, interactive canvas background with floating/blinking stars.
 * The animation only runs when dark mode is active to preserve performance in light mode.
 *
 * @param {number} starCount - Number of stars to render.
 * @param {number} minSize - Minimum radius of a star.
 * @param {number} maxSize - Maximum radius of a star.
 * @param {number} blinkSpeed - Base speed for star opacity oscillation.
 */
const AnimatedBackground = ({
  starCount = 100,
  minSize = 0.5,
  maxSize = 1.5,
  blinkSpeed = 0.02,
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const starsRef = useRef([]);
  const { isDarkMode } = useTheme();

  // Generates star properties uniformly distributed across the given dimensions
  const createStars = useCallback(
    (width, height) =>
      Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (maxSize - minSize) + minSize,
        alpha: Math.random(),
        delta: (Math.random() - 0.5) * blinkSpeed * 2,
      })),
    [starCount, minSize, maxSize, blinkSpeed]
  );

  // Initialize default stars immediately on the first render to prevent layout flash
  const initialStars = useMemo(() => {
    if (typeof window === "undefined") return [];
    return createStars(window.innerWidth, window.innerHeight);
  }, [createStars]);

  // Persist the initial stars into the mutable ref across re-renders
  useEffect(() => {
    if (starsRef.current.length === 0 && initialStars.length > 0) {
      starsRef.current = initialStars;
    }
  }, [initialStars]);

  // Adjust canvas dimensions and scale contexts according to the device pixel ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth: width, innerHeight: height } = window;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
    ctx.scale(dpr, dpr);

    // Recreate stars for new dimensions
    starsRef.current = createStars(width, height);
  }, [createStars]);

  // Main animation loop that updates star opacity (alpha) and renders them
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { innerWidth: width, innerHeight: height } = window;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";

    const stars = starsRef.current;
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta = -star.delta;
        star.alpha = Math.max(0, Math.min(1, star.alpha));
      }
      if (star.alpha > 0.01) {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isDarkMode) {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode, animate, handleResize]);

  if (!isDarkMode) return null;

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default AnimatedBackground;
