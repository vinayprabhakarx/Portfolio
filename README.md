A sleek, modern, and responsive portfolio website built with **React 19** to showcase personal projects, experience, and skills. It features smooth animations, a contact form powered by Mailgun, and deploys via a robust DevOps pipeline for continuous uptime and performance.

🔗 **Live Demo**: [https://vinayprabhakar.tech](https://vinayprabhakar.tech)

## ✨ Features

- ⚛️ Built with **React 19**, using functional components and hooks
- 🎨 Styled using **Styled-Components** and **Framer Motion** for animated UI
- 🌓 Light/Dark theme support
- 📱 Fully **responsive** across devices
- 🗂️ **Projects, Skills, Education, and Experience** sections dynamically rendered
- 📬 Integrated **Mailgun API** to send emails from the contact form
- ⚙️ Deployed with **PM2 + Nginx** for production-grade stability

## 🛠 Tech Stack

### Frontend

- React 19
- React Router v6
- Framer Motion
- Styled-Components
- Vite

### Backend (Contact Form)

- Express.js server (Node.js)
- Mailgun API

### DevOps / Infrastructure

- Ubuntu VPS (DigitalOcean)
- Nginx (Reverse Proxy)
- PM2 (Process Manager)
- Cloudflare (DNS & SSL)
- GitHub (Version Control & CI/CD)

## 📁 Project Structure

```bash
Portfolio/
├── backend/                 # Express server for Mailgun integration
│   ├── server.mjs
│   ├── package.json
│   └── .env.example         # Rename to .env and provide your Mailgun credentials
│
├── src/                     # Frontend React App
│   ├── components/          # Reusable components (Navbar, Footer, etc.)
│   ├── pages/               # Page components (Home, About, Contact, Blog)
│   ├── assets/              # Static assets (images, icons)
│   ├── contexts/            # Context API for theme management
│   ├── data/                # Defines static or semi-static content
│   ├── styles/              # Theme definitions and global styles
│   ├── AppLayout.jsx        # Layout wrapper with routing
│   ├── main.jsx             # Entry point
│   └── router.jsx           # Client-side routing setup
│
├── public/                  # Static HTML and public files
├── .gitignore
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## 🚀 Deployment

The app is deployed on a **DigitalOcean VPS** running **Ubuntu**, reverse proxied by **Nginx**, and managed using **PM2** for process management.

1. **Clone the repo**

   ```bash
   git clone https://github.com/VinayPrabhakarX/portfolio.git
   ```

2. **Set up the backend**

   - Navigate to the `backend/` folder
   - Rename `.env.example` to `.env` and configure Mailgun credentials

3. **Start the backend**

   ```bash
   pnpm install
   pm2 start server.mjs --name portfolio-backend
   ```

4. **Build the frontend**

   ```bash
   pnpm install
   pnpm run build
   ```

5. **Serve frontend with Nginx**

## 📬 Contact

📧 Email: [work.vinayprabhakar@gmail.com](mailto:work.vinayprabhakar@gmail.com)
