import React from 'react';

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
