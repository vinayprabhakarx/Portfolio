import{b as r,j as a,d,m as j}from"./index-B7h3guZZ.js";import{T as S,C as x,b as G,o as Y}from"./TabButton-CiYBPJZk.js";import{G as H}from"./GradientTitle-5xwDPkiz.js";import{C as L}from"./Container-rwQxjChg.js";const T=r.memo(({data:t=[],itemsPerPage:e=5,currentPage:u=1,onPageChange:c,onDataChange:g,maxVisiblePages:h=7})=>{const f=t.length,i=Math.ceil(f/e)||1,$=r.useRef({page:0,totalItems:0,itemsPerPage:0}),o=r.useMemo(()=>Math.min(Math.max(u,1),i),[u,i]),n=r.useMemo(()=>{const s=(o-1)*e;return t.slice(s,s+e)},[t,o,e]),m=r.useMemo(()=>({currentPage:o,totalPages:i,itemsPerPage:e,totalItems:f}),[o,i,e,f]);r.useEffect(()=>{if(!g)return;const s=$.current;(s.page!==o||s.totalItems!==f||s.itemsPerPage!==e)&&(g(n,m),$.current={page:o,totalItems:f,itemsPerPage:e})},[g,n,m,o,f,e]);const z=r.useMemo(()=>{if(i<=h)return Array.from({length:i},(p,y)=>y+1);const s=Math.floor(h/2),l=[],b=p=>({type:"ellipsis",targetPage:p});if(o<=s+1){for(let p=1;p<=h-2;p++)l.push(p);l.push(b(Math.min(i-1,h))),l.push(i)}else if(o>=i-s){l.push(1);const p=i-(h-3);l.push(b(Math.max(2,p-1)));for(let y=p;y<=i;y++)l.push(y)}else{l.push(1),l.push(b(Math.max(2,o-s)));const p=o-(s-1),y=o+(s-1);for(let v=p;v<=y;v++)l.push(v);l.push(b(Math.min(i-1,o+s))),l.push(i)}return l},[o,i,h]),A=r.useCallback(s=>{if(!c)return;const l=typeof s=="object"&&s.type==="ellipsis"?Math.min(Math.max(s.targetPage,1),i):s;typeof l=="number"&&l!==o&&c(l)},[c,o,i]),F=r.useCallback(()=>{o>1&&c&&c(o-1)},[o,c]),B=r.useCallback(()=>{o<i&&c&&c(o+1)},[o,i,c]),E=o<=1,I=o>=i;return i<=1?a.jsx(a.Fragment,{}):a.jsxs(D,{children:[a.jsx(C,{onClick:F,disabled:E,"aria-label":"Previous Page",type:"button",children:"← "}),z.map((s,l)=>{const b=typeof s=="object",p=b?s.targetPage:s,y=!b&&s===o;return a.jsxs(O,{$active:y,$isEllipsis:b,onClick:()=>A(s),"aria-label":b?`Go to page ${p}`:`Page ${s}`,"aria-current":y?"page":void 0,type:"button",children:[b?"...":s," "]},b?`ellipsis-${l}`:s)}),a.jsx(C,{onClick:B,disabled:I,"aria-label":"Next Page",type:"button",children:"→ "})]})});T.displayName="Pagination";const D=d.div`
  display: flex; // Arranges items in a row
  justify-content: center; // Centers items horizontally
  gap: ${({theme:t})=>t.spacing.md}; // Spacing between buttons
  margin-top: ${({theme:t})=>t.spacing["3xl"]}; // Top margin for spacing from content
  flex-wrap: wrap; // Allows buttons to wrap to the next line on smaller screens
`,O=d.button`
  padding: ${({theme:t})=>t.spacing.sm} ${({theme:t})=>t.spacing.md}; // Padding for button size
  border: none; // No border
  background: ${({$active:t,theme:e})=>t?e.colors.primary:"transparent"}; // Background changes based on active state
  color: ${({$active:t,theme:e})=>t?"white":e.colors.primary}; // Text color changes based on active state
  border-radius: ${({theme:t})=>t.borderRadius.md}; // Rounded corners
  cursor: pointer; // Pointer cursor on hover
  font-size: 1rem; // Font size
  font-weight: 900; // Bold font weight
  transition: ${({theme:t})=>t.transitions.default}; // Smooth transitions
  user-select: none; // Prevents text selection
  outline: none; // Removes default outline
  align-items: center; // Centers content vertically
  justify-content: center; // Centers content horizontally

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.primary}; // Hover background
    color: ${({$active:t,theme:e})=>t?"white":e.colors.secondary}; // Hover text color
    transform: translateY(-2px); // Slight lift on hover
  }

  &:active:not(:disabled) {
    color: ${({theme:t})=>t.colors.secondary}; // Text color when active
    transform: translateY(-2px); // Slight lift on active
  }

  &:disabled {
    opacity: 0.5; // Reduced opacity when disabled
    cursor: not-allowed; // Not-allowed cursor when disabled
  }

  &:focus-visible {
    outline: 2px solid ${({theme:t})=>t.colors.primary}; // Outline for keyboard navigation
    outline-offset: 2px; // Offset for the outline
  }
`,C=d.button`
  background: transparent; // Transparent background
  border: none; // No border
  color: ${({theme:t,disabled:e})=>e?t.colors.disabled||"#ccc":t.colors.primary}; // Color based on disabled state
  cursor: ${({disabled:t})=>t?"not-allowed":"pointer"}; // Cursor based on disabled state
  font-size: 1.2rem; // Font size
  font-weight: 600; // Font weight
  padding: ${({theme:t})=>t.spacing.sm} ${({theme:t})=>t.spacing.md}; // Padding
  transition: all 0.3s ease; // Smooth transitions
  opacity: ${({disabled:t})=>t?.5:1}; // Opacity based on disabled state
  outline: none; // Removes default outline

  &:hover:not(:disabled) {
    color: ${({$active:t,theme:e})=>t?"white":e.colors.secondary}; // Hover text color
    transform: translateY(-2px); // Slight lift on hover
  }

  &:active:not(:disabled) {
    transform: translateY(0); // Reset transform on active
  }

  &:focus-visible {
    outline: 2px solid ${({theme:t})=>t.colors.primary}; // Outline for keyboard navigation
    outline-offset: 2px; // Offset for the outline
  }

  @media (max-width: ${({theme:t})=>{var e;return((e=t==null?void 0:t.breakpoints)==null?void 0:e.sm)||"640px"}}) {
    font-size: 1.25rem; // Adjust font size on small screens
  }
`;d.div`
  display: flex;
  justify-content: center;
  gap: ${({theme:t})=>t.spacing.md};
  margin-bottom: ${({theme:t})=>t.spacing["3xl"]};
  flex-wrap: wrap;
`;const w=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({theme:t})=>t.spacing["2xl"]};
  margin-top: ${({theme:t})=>t.spacing["2xl"]};
`,W=d.div`
  display: flex;
  gap: ${({theme:t})=>t.spacing.md};
  margin-top: ${({theme:t})=>t.spacing.xl};
`,k=d.a`
  display: flex;
  align-items: center;
  gap: ${({theme:t})=>t.spacing.sm};
  color: ${({theme:t})=>t.colors.primary};
  text-decoration: none;
  font-size: ${({theme:t})=>t.typography.fontSizes.sm};
  transition: ${({theme:t})=>t.transitions.default};

  &:hover {
    color: ${({theme:t})=>t.colors.secondary};
    transform: translateY(-2px);
  }
`;d(w).withConfig({shouldForwardProp:t=>!["customProp"].includes(t)})``;d(k).withConfig({shouldForwardProp:t=>!["isActive","disabled"].includes(t)})`
  ${({isActive:t,theme:e})=>t&&`
    color: ${e.colors.secondary};
    font-weight: 600;
  `}

  ${({disabled:t,theme:e})=>t&&`
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  `}
`;d.section`
  position: relative;
  min-height: 100vh;
  padding: ${({theme:t})=>t.spacing["4xl"]} 0;
`;const X=d.div`
  background: ${({theme:t})=>t.colors.cardBackground};
  border-radius: ${({theme:t})=>t.borderRadius.lg};
  padding: ${({theme:t})=>t.spacing.xl};
  border: 1px solid ${({theme:t})=>t.colors.border};
  transition: ${({theme:t})=>t.transitions.smooth};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({theme:t})=>t.shadows.large};
    border-color: ${({theme:t})=>t.colors.primary};
  }
`;d(w)`
  @media (max-width: ${({theme:t})=>t.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({theme:t})=>t.spacing.xl};
  }

  @media (max-width: ${({theme:t})=>t.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({theme:t})=>t.spacing.lg};
  }
`;d(w)`
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({theme:t})=>t.spacing.lg};
`;d(X)`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:nth-child(even) {
    animation-delay: 0.1s;
  }

  &:nth-child(odd) {
    animation-delay: 0.2s;
  }
`;d.div`
  background: ${({theme:t})=>t.colors.cardBackground};
  border-radius: ${({theme:t})=>t.borderRadius.lg};
  padding: ${({theme:t})=>t.spacing.xl};
  border: 1px solid ${({theme:t})=>t.colors.border};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${({theme:t})=>t.colors.border}40,
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;d.div`
  text-align: center;
  padding: ${({theme:t})=>t.spacing["4xl"]};
  color: ${({theme:t})=>t.colors.textSecondary};

  h3 {
    color: ${({theme:t})=>t.colors.text};
    margin-bottom: ${({theme:t})=>t.spacing.md};
  }

  p {
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;const P=[{title:"Plant Disease Recognition System",description:"Agricultural system that identifies potential plant diseases based on uploaded images using deep learning algorithms. Key features include image analysis, disease detection, and recommended actions.",tags:["Python","Deep Learning","TensorFlow","Keras"],github:"https://github.com/vinayprabhakar-in/plant_disease_model",demo:"https://vinayprabhakar-plant.streamlit.app/",category:"machine-learning",highlights:["Accurate disease identification based on visual patterns","User-friendly interface for image upload","Model trained on approximately 87,000 RGB images of healthy and diseased plant leaves.","Real-time analysis and results"]},{title:"Course Selling App",description:"Scalable Node.js backend with MongoDB for an online course platform featuring JWT authentication, course management and secure payment tracking.",tags:["Node.js","Express.js","MongoDB","JWT"],github:"https://github.com/VinayPrabhakarX/course-selling-app",demo:"https://github.com/VinayPrabhakarX/course-selling-app?tab=readme-ov-file#-installation",category:"backend",highlights:["JWT authentication for admins and users","Course management with Cloudinary image uploads","Secure course purchase system"]},{title:"Portfolio Website",description:"Modern portfolio website built with React and styled-components featuring interactive animations.",tags:["React.js","Express.js","Node.js","Cloudflare"],github:"https://github.com/VinayPrabhakarX/Portfolio",demo:"https://vinayprabhakar.tech",category:"web",highlights:["Showcases my work, skills, and background.","Includes a contact form so visitors can easily get in touch with me.","Works smoothly on mobile, tablet, and desktop devices."]}],M=["all","web","backend","machine-learning"],R=r.memo(({project:t,index:e})=>{var u;return a.jsx(j.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:e*.1},children:a.jsxs(x,{children:[a.jsx(x.Title,{children:t.title}),a.jsx(x.Description,{children:t.description}),((u=t.highlights)==null?void 0:u.length)>0&&a.jsx(x.HighlightsList,{children:t.highlights.map((c,g)=>a.jsxs(x.HighlightItem,{children:["• ",c]},`highlight-${e}-${g}`))}),a.jsx(x.TagContainer,{children:t.tags.map((c,g)=>a.jsx(x.Tag,{children:c},`tag-${e}-${g}`))}),a.jsxs(W,{children:[t.github&&a.jsxs(k,{href:t.github,target:"_blank",rel:"noopener noreferrer","aria-label":`View ${t.title} source code on GitHub`,children:[a.jsx(G,{})," Code"]}),t.demo&&a.jsxs(k,{href:t.demo,target:"_blank",rel:"noopener noreferrer","aria-label":`View ${t.title} live demo`,children:[a.jsx(Y,{})," Demo"]})]})]},t.id||e)})});R.displayName="ProjectCard";const N=r.memo(({category:t,isActive:e,onClick:u,index:c})=>{const g=t.split("-").map(h=>h[0].toUpperCase()+h.slice(1)).join(" ");return a.jsx(j.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:c*.1},children:a.jsx(S,{$active:e,onClick:u,"aria-pressed":e,role:"tab",children:g})})});N.displayName="CategoryTab";const _=r.memo(()=>{const[t,e]=r.useState("all"),[u,c]=r.useState(1),[g,h]=r.useState([]),f=r.useMemo(()=>t==="all"?P:P.filter(n=>n.category===t),[t]);r.useEffect(()=>{const n=(u-1)*3,m=n+3;h(f.slice(n,m))},[f,u]);const i=r.useCallback(n=>{e(n),c(1)},[]),$=r.useCallback(n=>{c(n)},[]),o=r.useMemo(()=>{const n={};return M.forEach(m=>{n[m]=()=>i(m)}),n},[i]);return a.jsxs(L,{children:[a.jsx(H,{children:"Featured Projects"}),a.jsx(j.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:a.jsx(S.TabContainer,{role:"tablist","aria-label":"Project categories",children:M.map((n,m)=>a.jsx(N,{category:n,isActive:t===n,onClick:o[n],index:m},n))})}),a.jsx(x.Grid,{role:"main","aria-label":"Projects grid",children:g.map((n,m)=>a.jsx(R,{project:n,index:m},n.id||`project-${m}`))}),f.length>3&&a.jsx(T,{data:f,itemsPerPage:3,currentPage:u,onPageChange:$,maxVisiblePages:6})]})});_.displayName="Projects";export{_ as default};
