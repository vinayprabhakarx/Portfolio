import React from "react";
import { useLocation } from "react-router-dom";

// Create a map of route paths to their corresponding components
const routeComponents = {
  "/about": () => import("../pages/About.jsx"),
  "/projects": () => import("../pages/Projects.jsx"),
  "/contact": () => import("../pages/Contact.jsx"),
  "/blog": () => import("../pages/Blog.jsx"),
  "/resume": () => import("../pages/Resume.jsx"),
};

export const useRoutePrefetch = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Pre-fetch adjacent routes when current route changes
    const currentPath = location.pathname;
    const prefetchPaths = {
      "/": ["/about", "/projects"],
      "/about": ["/projects", "/contact"],
      "/projects": ["/about", "/contact"],
      "/contact": ["/about", "/projects"],
      "/blog": ["/about", "/projects"],
      "/resume": ["/about", "/projects"],
    };

    const pathsToPrefetch = prefetchPaths[currentPath] || [];
    pathsToPrefetch.forEach((path) => {
      // Pre-fetch the route component using the map
      const component = routeComponents[path];
      if (component) {
        component();
      }
    });
  }, [location.pathname]);
};
