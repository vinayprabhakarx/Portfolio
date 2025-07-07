import{j as o,d as r,m as i}from"./index-B7h3guZZ.js";import{h as t}from"./index-D0vvASyF.js";import{G as n}from"./GradientTitle-5xwDPkiz.js";import{C as d}from"./Container-rwQxjChg.js";const m=r(i.section)`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  padding: ${({theme:e})=>e.spacing.md};
  background: ${({theme:e})=>e.colors.surface};
  border-radius: 20px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  box-shadow: 0 4px 15px ${({theme:e})=>e.shadows.small};
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px); // Lifts the card slightly on hover
    box-shadow: ${({theme:e})=>e.shadows.primaryGlow}; // Adds a glow effect on hover

    &::before {
      opacity: 1; // Makes a pseudo-element visible on hover (if present)
    }
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: ${({theme:e})=>e.spacing.md};
  }
`,l=r.div`
  flex: 1;
  max-width: 100rem;
  margin: 0 auto;
  width: 100%;
`,p=r.iframe`
  width: 100%;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 10px;
  background: ${({theme:e})=>e.gradients.primaryTransparent};
  @media (min-width: ${({theme:e})=>e.breakpoints.md}) {
    aspect-ratio: 1.414 / 1;
    height: auto;
    min-height: 600px;
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    height: 60vh;
    min-height: 400px;
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    height: 47.7vh;
    min-height: 350px;
    border-radius: 8px;
  }
`,h=r(i.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spacing.xs};
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background: ${({theme:e})=>e.gradients.primary};
  border: none;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  align-self: center;
  width: fit-content;
  transition: all 0.3s ease;
  &:hover {
    background: ${({theme:e})=>e.gradients.primaryHover};
    box-shadow: ${({theme:e})=>e.shadows.primaryGlow};
    transform: translateY(-1px);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
`,f=()=>{const e="1itkVXP-E3p9_VLePpiS9f8u6vXa42Vyo",a=`https://drive.google.com/file/d/${e}/preview`,s=`https://drive.google.com/uc?export=download&id=${e}`;return o.jsxs(d,{children:[o.jsx(n,{children:"Resume"}),o.jsxs(m,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[o.jsx(l,{children:o.jsx(p,{src:a,title:"My Professional Resume",loading:"lazy"})}),o.jsxs(h,{href:s,target:"_blank",rel:"noopener noreferrer","aria-label":"Download My Resume PDF",whileHover:{scale:1.05},whileTap:{scale:.95},children:[o.jsx(t,{size:12}),"Download Resume"]})]})]})};export{f as default};
