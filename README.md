# Vinay Prabhakar – Developer Portfolio

A sleek, modern, and fully responsive developer portfolio built with **React 19**, showcasing personal projects, professional experience, and technical skills. It features elegant animations, dark/light theme support, and a fully functional contact form integrated via **Mailgun API**.

🔗 **Live Site**: [https://vinayprabhakar.tech](https://vinayprabhakar.tech)

---

## ✨ Features

- ⚛️ Built with **React 19** and **React Router v6**
- 💅 Styled using **Styled-Components** with smooth animations powered by **Framer Motion**
- 🌓 Toggleable **Dark and Light themes** using Context API
- 📱 Fully **responsive layout** for mobile, tablet, and desktop
- 🧠 Sections include **Projects**, **Skills**, **Education**, **Experience**, and **Blog**
- 📬 Contact form with real email delivery using **Mailgun API**

---

## 🛠 Tech Stack

### Frontend

- **React 19** with Functional Components and Hooks
- **React Router v6** for client-side navigation
- **Styled-Components** for scoped styling
- **Framer Motion** for animations
- **Vite** for fast bundling and dev environment

### Backend (for Contact Form)

- **Node.js + Express.js** server
- **Mailgun API** integration for form handling

---

## 📁 Project Structure

```bash
Portfolio/
├── api/                       # Express backend for Mailgun email integration
│   ├── server.mjs             # Entry point for Express backend
│   ├── package.json           # Backend dependencies
│   └── .env.example           # Sample environment file
│
├── client/                    # Frontend React application
│   ├── public/                # Static public assets (index.html, favicon, etc.)
│   ├── src/
│   │   ├── assets/            # Static images, icons, Lottie animations
│   │   ├── components/        # Reusable components (Navbar, Footer, etc.)
│   │   ├── contexts/          # Theme context (dark/light mode)
│   │   ├── data/              # Static/dynamic project or skills data
│   │   ├── pages/             # Page-level components (Home, About, Blog, etc.)
│   │   ├── styles/            # Theme configurations and global styles
│   │   ├── AppLayout.jsx      # Application shell with layout
│   │   ├── main.jsx           # Entry point
│   │   └── router.jsx         # Client-side route definitions
│   ├── .env                   # VITE environment variables
│   ├── vite.config.js         # Vite configuration
│   ├── eslint.config.js       # ESLint rules
│   ├── package.json           # Frontend dependencies
│   └──pnpm-lock.yaml         # Package lock file (pnpm)
│
├── .gitignore
├── LICENSE
└── README.md                  # You're reading it now
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VinayPrabhakarX/portfolio.git
cd portfolio
```

---

### 2. Configure the Backend

```bash
cd api
cp .env.example .env
# Add your MAILGUN_DOMAIN and MAILGUN_API_KEY to the .env file
pnpm install
node server.mjs
```

---

### 3. Run the Frontend

```bash
cd ../client
pnpm install
pnpm run dev
```

> You can customize deployment as per your hosting preferences (e.g., Vercel, Netlify, Render, etc.).

---

## 📬 Contact

For queries or collaborations:

**Email**: [work.vinayprabhakar@gmail.com](mailto:work.vinayprabhakar@gmail.com)

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE)
