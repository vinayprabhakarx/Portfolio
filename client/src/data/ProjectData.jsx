import blogAppImage from "../assets/projects/blog-app.webp";
import portfolio from "../assets/projects/portfolio.webp";
import plantDiseaseImage from "../assets/projects/plant.webp";

export const projects = [
  {
    title: "Blog App",
    image: blogAppImage,
    description:
      "Full-stack blogging platform with authentication, blog publishing, comments, likes, notifications, and admin/user role management.",
    tags: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Redux Toolkit",
      "Tailwind CSS",
      "Vite",
    ],
    github: "https://github.com/vinayprabhakarx/blog-app",
    demo: "https://blog.vinayprabhakar.dev",
    category: "web",
    highlights: [
      "JWT-based authentication with email verification and password reset",
      "Blog CRUD with admin-defined categories",
      "Comments with nested replies, likes, and real-time notifications",
      "Profile management with social links and image uploads via Cloudinary",
      "Markdown editor with LaTeX support and responsive UI with light/dark mode",
    ],
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    description:
      "Modern portfolio website built with React and styled-components featuring interactive animations.",
    tags: ["React.js", "Express.js", "Node.js", "Cloudflare"],
    github: "https://github.com/VinayPrabhakarX/Portfolio",
    demo: "https://vinayprabhakar.dev",
    category: "web",
    highlights: [
      "Showcases my work, skills, and background",
      "Includes a contact form so visitors can easily get in touch with me",
      "Works smoothly on mobile, tablet, and desktop devices",
    ],
  },
  {
    title: "Online Examination System",
    image: "",
    description:
      "Web-based platform for managing and conducting online exams with role-based access and secure exam flow.",
    tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/VinayPrabhakarX/online-examination-system",
    demo: "https://vinayprabhakar.tech/oes",
    category: "web",
    highlights: [
      "Role-based login for admin, teacher, and student",
      "Secure exam setup and automated evaluation",
      "Still under development — more features coming soon",
    ],
  },
  {
    title: "Plant Disease Recognition System",
    image: plantDiseaseImage,
    description:
      "Agricultural system that identifies potential plant diseases based on uploaded images using deep learning algorithms.",
    tags: ["Python", "Deep Learning", "TensorFlow", "Keras"],
    github: "https://github.com/vinayprabhakar-in/plant_disease_model",
    demo: "https://vinayprabhakar-plant.streamlit.app/",
    category: "machine-learning",
    highlights: [
      "Accurate disease identification based on visual patterns",
      "User-friendly interface for image upload",
      "Model trained on approximately 87,000 RGB images of healthy and diseased plant leaves",
    ],
  },
  {
    title: "Course Selling App",
    image: "",
    description:
      "Scalable Node.js backend with MongoDB for an online course platform featuring JWT authentication, course management and secure payment tracking.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/VinayPrabhakarX/course-selling-app",
    demo: "https://github.com/VinayPrabhakarX/course-selling-app?tab=readme-ov-file#-installation",
    category: "web",
    highlights: [
      "JWT authentication for admins and users",
      "Course management with Cloudinary image uploads",
      "Secure course purchase system",
    ],
  },
];

export const categories = ["all", "web", "machine-learning"];
