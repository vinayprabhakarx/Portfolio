import React from 'react';

/**
 * Reusable SVG icon wrapper for rendering brand icons.
 * 
 * @param {Object} icon - The icon object containing viewBox, title, and path/innerHtml.
 * @param {string} size - CSS size for width and height (default: "1em").
 * @param {string} color - CSS fill color (default: "currentColor").
 * @param {string} className - Optional CSS class names.
 */
const BrandIcon = ({ icon, size = "1em", color = "currentColor", className = "" }) => {
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox={icon.viewBox || "0 0 24 24"}
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{icon.title}</title>
      {icon.path && <path d={icon.path} />}
      {icon.innerHtml && <g dangerouslySetInnerHTML={{ __html: icon.innerHtml }} />}
    </svg>
  );
};

export default BrandIcon;
