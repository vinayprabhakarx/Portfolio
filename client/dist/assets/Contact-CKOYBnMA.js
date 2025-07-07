import{j as r,d as n,b as d,m as h,a as $,A as k}from"./index-B7h3guZZ.js";import{F as T,a as C,b as P,c as I,d as F,e as A,f as M,g as R}from"./index-D0vvASyF.js";import{C as N}from"./Container-rwQxjChg.js";import{G as z}from"./GradientTitle-5xwDPkiz.js";const O=n.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`,_=n.a`
  color: ${({theme:e})=>e.colors.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({theme:e})=>e.colors.secondary};
    transform: translateY(-3px);
  }
`,G=()=>{const e=[{href:"https://www.linkedin.com/in/VinayPrabhakarX/",icon:T},{href:"https://github.com/VinayPrabhakarX",icon:C},{href:"https://www.kaggle.com/vinayprabhakarx",icon:P},{href:"https://x.com/VinayPrabhakarX",icon:I},{href:"https://instagram.com/VinayPrabhakarX",icon:F},{href:"https://www.pinterest.com/vinayprabhakarx/",icon:A},{href:"https://vinayprabhakar.tumblr.com/",icon:M}];return r.jsx(O,{children:e.map(({href:t,icon:a},l)=>r.jsx(_,{href:t,target:"_blank",rel:"noopener noreferrer",children:r.jsx(a,{})},l))})},L=!1,q=!0,B=void 0,p={API_URL:"/api/email",REQUEST_TIMEOUT:"20000",RETRY_ATTEMPTS:"2",MESSAGE_DISMISS_TIME:"3000",ENVIRONMENT:{isDevelopment:L,isProduction:q,isTest:B,mode:"production"}},U=e=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e),V=e=>{var a,l,i,o;const t={};return(a=e.userName)!=null&&a.trim()?e.userName.trim().length<2&&(t.userName="Name must be at least 2 characters"):t.userName="Name is required",(l=e.email)!=null&&l.trim()?U(e.email)||(t.email="Please enter a valid email address"):t.email="Email is required",(i=e.subject)!=null&&i.trim()?e.subject.trim().length<3&&(t.subject="Subject must be at least 3 characters"):t.subject="Subject is required",(o=e.message)!=null&&o.trim()?e.message.trim().length<10&&(t.message="Message must be at least 10 characters"):t.message="Message is required",t},X={async post(e,t,a={}){const l=new AbortController,i=setTimeout(()=>l.abort(),p.REQUEST_TIMEOUT);try{const o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",...a.headers},body:JSON.stringify(t),signal:l.signal,...a});if(clearTimeout(i),o.ok){const c=o.headers.get("content-type");return c!=null&&c.includes("application/json")?await o.json():{}}let s=`HTTP ${o.status}: ${o.statusText}`;try{s=(await o.json()).message||s}catch{}switch(o.status){case 400:throw new Error("Bad request. Please check your form data.");case 401:throw new Error("Unauthorized. Please try again.");case 403:throw new Error("Access denied. Please check your API configuration.");case 404:throw new Error("API endpoint not found. Please check your API URL and try again.");case 429:throw new Error("Too many requests. Please wait a moment and try again.");case 502:case 503:case 504:throw new Error("Server is currently unavailable. Please try again later.");default:throw new Error(s)}}catch(o){throw clearTimeout(i),o.name==="AbortError"?new Error("Request timed out. Please try again."):o instanceof TypeError&&o.message.includes("fetch")?new Error("Network error. Please check your connection and try again."):o.message.includes("CORS")||o.message.includes("Access-Control-Allow-Origin")?new Error("CORS error: Please check your API server configuration."):o.message.includes("Failed to fetch")?new Error("Network error. Please check your connection and try again."):o}},async postWithRetry(e,t,a=p.RETRY_ATTEMPTS){let l;for(let i=1;i<=a+1;i++)try{return await this.post(e,t)}catch(o){if(l=o,o.message.includes("400")||o.message.includes("429"))throw o;if(o.message.includes("CORS")||o.message.includes("Access-Control-Allow-Origin"))throw new Error("CORS error: Please check your API server configuration.");if(i>a)break;const s=Math.min(1e3*Math.pow(2,i-1),5e3);await new Promise(c=>setTimeout(c,s))}throw l}},H=()=>{const[e,t]=d.useState({userName:"",email:"",subject:"",message:""}),[a,l]=d.useState({submitting:!1,submitted:!1,error:null,message:""}),[i,o]=d.useState({}),s=d.useRef(null);d.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);const c=[{name:"userName",type:"text",label:"Name",autoComplete:"name",maxLength:100},{name:"email",type:"email",label:"Email",autoComplete:"email",maxLength:150},{name:"subject",type:"text",label:"Subject",autoComplete:"off",maxLength:200}],y=d.useCallback(b=>{const{name:u,value:g}=b.target;t(x=>({...x,[u]:g})),i[u]&&o(x=>{const w={...x};return delete w[u],Object.keys(w).length===0?{}:w})},[i]),f=d.useCallback(()=>{t({userName:"",email:"",subject:"",message:""}),o({})},[]),m=d.useCallback(b=>{l(u=>({...u,...b})),b.message&&(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{l({submitting:!1,submitted:!1,error:!1,message:""})},p.MESSAGE_DISMISS_TIME))},[p.MESSAGE_DISMISS_TIME]),E=d.useCallback(async b=>{b.preventDefault(),m({submitted:!1,error:null,message:""});const u=V(e);if(Object.keys(u).length>0){o(u),m({error:!0,message:"Please fix the validation errors below."});return}m({submitting:!0});try{console.log("📤 Sending message...");const g=await X.postWithRetry(p.API_URL,{userName:e.userName.trim(),email:e.email.trim(),subject:e.subject.trim(),message:e.message.trim()});console.log("✅ Message sent successfully:",g),m({submitting:!1,submitted:!0,message:g.message||"Message sent successfully! I'll get back to you soon."}),setTimeout(f,2e3)}catch(g){console.error("❌ Submission error:",g),m({submitting:!1,error:!0,message:g.message||"Failed to send message. Please try again later."})}},[e,m,f]);return{formData:e,status:a,validationErrors:i,formFields:c,handleChange:y,handleSubmit:E}};$`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;const W=n.div`
  text-align: center;
  margin-bottom: 4rem;
`,Y=n.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,D=n.div`
  background: ${({theme:e})=>e.colors.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px ${({theme:e})=>e.shadows.small};
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid ${({theme:e})=>e.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({theme:e})=>e.shadows.primaryGlow};
  }
`,Z=n.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`,K=n.h3`
  font-size: 1.5rem;
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: 1rem;
`,Q=n.p`
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`,J=n.div`
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: 0 4px 15px ${({theme:e})=>e.shadows.small};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({theme:e})=>e.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({theme:e})=>e.shadows.primaryGlow};
  }
`,ee=n.form`
  padding: 2rem;
`,v=n.div`
  margin-bottom: 1.5rem;
`,j=n.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({theme:e})=>e.colors.text};
  font-weight: 500;
`,re=n.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({theme:e})=>e.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${({theme:e})=>e.colors.inputBackground};
  color: ${({theme:e})=>e.colors.text};
  caret-color: ${({theme:e})=>e.colors.text};

  &::placeholder {
    color: ${({theme:e})=>e.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.secondary};
    box-shadow: ${({theme:e})=>e.shadows.light};
    background: ${({theme:e})=>e.colors.inputBackground};
  }

  /* Autofill styles for WebKit browsers */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({theme:e})=>e.colors.text} !important;
    -webkit-box-shadow: 0 0 0px 1000px
      ${({theme:e})=>e.colors.inputBackground} inset !important;
  }

  &:-moz-autofill {
    background-color: ${({theme:e})=>e.colors.inputBackground};
    color: ${({theme:e})=>e.colors.text};
  }
`,te=n.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({theme:e})=>e.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  background: ${({theme:e})=>e.colors.inputBackground};
  color: ${({theme:e})=>e.colors.text};
  caret-color: ${({theme:e})=>e.colors.text};

  &::placeholder {
    color: ${({theme:e})=>e.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.secondary};
    box-shadow: ${({theme:e})=>e.shadows.light};
    background: ${({theme:e})=>e.colors.inputBackground};
  }
`,oe=n(h.button)`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  background: ${({theme:e})=>e.gradients.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  outline: none;
  display: inline-block;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.gradients.primaryHover};
    box-shadow: ${({theme:e})=>e.shadows.primaryGlow};
    color: ${({theme:e})=>e.colors.secondary};
  }
`,S=`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  color: white;
`,se=n(h.div)`
  ${S}
  background: ${({theme:e})=>e.colors.success};
`,ae=n(h.div)`
  ${S}
  background: ${({theme:e})=>e.colors.warning};
`,de=()=>{const{formData:e,status:t,validationErrors:a,formFields:l,handleChange:i,handleSubmit:o}=H();return r.jsxs(N,{children:[r.jsx(W,{children:r.jsx(z,{children:"Get In Touch"})}),r.jsxs(Y,{children:[r.jsxs(D,{as:h.div,initial:{y:30},animate:{y:0},transition:{duration:.5,delay:.1},style:{willChange:"transform",isolation:"isolate"},children:[r.jsx(K,{children:"Contact Information"}),r.jsx(Q,{children:"Feel free to reach out for collaborations, questions, or just to say hello! I'll try my best to get back to you!"}),r.jsx(G,{}),r.jsx(Z,{})]}),r.jsx(J,{as:h.div,initial:{y:30},animate:{y:0},transition:{duration:.5,delay:.2},style:{willChange:"transform",isolation:"isolate"},children:r.jsxs(ee,{onSubmit:o,children:[l.map(({name:s,type:c,label:y,autoComplete:f,maxLength:m})=>r.jsxs(v,{children:[r.jsxs(j,{htmlFor:s,children:[y," ",r.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),r.jsx(re,{type:c,id:s,name:s,value:e[s],onChange:i,required:!0,disabled:t.submitting,autoComplete:f,maxLength:m,style:{borderColor:a[s]?"#ef4444":void 0},"aria-invalid":!!a[s],"aria-describedby":a[s]?`${s}-error`:void 0}),a[s]&&r.jsx("div",{id:`${s}-error`,style:{color:"#ef4444",fontSize:"0.875rem",marginTop:"0.25rem"},children:a[s]})]},s)),r.jsxs(v,{children:[r.jsxs(j,{htmlFor:"message",children:["Message ",r.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),r.jsx(te,{id:"message",name:"message",value:e.message,onChange:i,required:!0,rows:"6",disabled:t.submitting,autoComplete:"off",maxLength:2e3,style:{borderColor:a.message?"#ef4444":void 0},"aria-invalid":!!a.message,"aria-describedby":a.message?"message-error":void 0}),a.message&&r.jsx("div",{id:"message-error",style:{color:"#ef4444",fontSize:"0.875rem",marginTop:"0.25rem"},children:a.message}),r.jsxs("div",{style:{fontSize:"0.75rem",color:"#6b7280",marginTop:"0.25rem"},children:[e.message.length,"/2000 characters"]})]}),r.jsx(oe,{type:"submit",disabled:t.submitting,whileHover:t.submitting?{}:{scale:1.02},whileTap:t.submitting?{}:{scale:.98},style:{opacity:t.submitting?.7:1,cursor:t.submitting?"not-allowed":"pointer"},children:t.submitting?"Sending...":r.jsxs(r.Fragment,{children:["Send Message ",r.jsx(R,{style:{marginLeft:"8px"}})]})}),r.jsx(k,{children:t.submitted&&r.jsxs(se,{as:h.div,initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},role:"alert","aria-live":"polite",children:["✅ ",t.message]})}),r.jsx(k,{children:t.error&&r.jsxs(ae,{as:h.div,initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},role:"alert","aria-live":"assertive",children:["❌ ",t.message]})})]})})]})]})};export{de as default};
