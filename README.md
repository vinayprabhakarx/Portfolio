# VinayPrabhakarX – Developer Portfolio

A sleek, modern, and fully responsive developer portfolio built with **React 19**, showcasing personal projects, professional experience, and technical skills. Features elegant animations, dark/light theme support, and a fully functional contact form with dual email delivery support.

**Live Site**: [https://vinayprabhakar.dev](https://vinayprabhakar.dev)

## Features

- Built with **React 19** and **React Router v7**
- Styled using **Styled-Components** with smooth animations powered by **Framer Motion**
- Toggleable **Dark and Light themes** with smooth transitions
- Fully **responsive layout** optimized for mobile, tablet, desktop
- Dynamic project cards with image support and fallback icons
- Serverless contact form with **Mailgun API** and **SMTP fallback**
- Deployed on **Vercel** with serverless functions
- Lottie animations for enhanced visual experience
- Smart code splitting and lazy loading for optimal performance

## Tech Stack

### Frontend

- **React 19** with Functional Components and Hooks
- **React Router v7** for client-side navigation
- **Styled-Components** for component-scoped styling
- **Framer Motion** for fluid animations and transitions
- **Lottie Web** for vector animations
- **React Icons (Feather Icons)** for UI elements
- **React Toastify** for notifications
- **Vite** for blazing fast build and HMR

### Backend (Serverless API)

- **Node.js + Express.js** serverless functions
- **Mailgun API** (primary) with automatic **SMTP fallback**
- **Nodemailer** for SMTP email delivery
- **Express Validator** for input sanitization
- Deployed as **Vercel Serverless Functions**

## Project Structure

```bash
vinayprabhakarx/
├── api/                          # Serverless API for email delivery
│   ├── send-email.js             # Main serverless function (Mailgun + SMTP)
│   ├── vercel.json               # Vercel API routing configuration
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables (gitignored)
│   └── .env.example              # Sample environment template
│
├── client/                       # Frontend React application
│   ├── src/
│   │   ├── assets/               # Images, icons, Lottie animations
│   │   │   └── projects/         # Project screenshots
│   │   ├── components/           # Reusable UI components
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── DeveloperAnimation.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── config/               # Configuration files
│   │   │   └── contactConfig.jsx # API and form settings
│   │   ├── contexts/             # React Context providers
│   │   │   └── ThemeContext.jsx  # Dark/Light theme state
│   │   ├── data/                 # Static content data
│   │   │   ├── AboutData.jsx
│   │   │   └── ProjectData.jsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── useContactForm.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── NotFound.jsx
│   │   ├── styles/               # Styled-components themes
│   │   │   ├── Theme.jsx
│   │   │   ├── GlobalStyles.jsx
│   │   │   └── ...
│   │   ├── utils/                # Utility functions
│   │   ├── AppLayout.jsx         # App shell with layout
│   │   ├── main.jsx              # App entry point
│   │   └── router.jsx            # Route definitions
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── package.json              # Frontend dependencies
│   ├── .env                      # Local environment variables
│   ├── .env.production           # Production environment template
│   └── .env.local.example        # Development environment template
│
├── vercel.json                   # Root Vercel configuration (monorepo)
├── .vercelignore                 # Files to ignore during deployment
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **pnpm**
- **Mailgun account** (for email delivery)
- **Vercel account** (optional, for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/vinayprabhakarx/Portfolio.git
cd vinayprabhakarx
```

### 2. Setup Backend API

```bash
cd api
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your credentials:
# - MAILGUN_API_KEY (from mailgun.com)
# - MAILGUN_DOMAIN
# - SMTP credentials (fallback)
# - RECIPIENT_EMAIL

# Test locally
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install

# Environment is pre-configured
# For custom API URL, edit .env file

# Start development server
npm run dev
```

### 4. Access Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:5000 (if running separately)

## Deployment

### Deploy to Vercel via GitHub (Recommended)

This project is configured as a Vercel monorepo with serverless functions.

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your repository: `vinayprabhakarx/Portfolio`
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click **"Deploy"**

#### Step 3: Configure Environment Variables

After initial deployment, add environment variables in Vercel dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables for all environments (Production, Preview, Development):

| Variable          | Value                | Example                              |
| ----------------- | -------------------- | ------------------------------------ |
| `MAILGUN_API_KEY` | Your Mailgun API key | `key-xxxxx...`                       |
| `MAILGUN_DOMAIN`  | Your verified domain | `yourdomain.com`                     |
| `MAILGUN_FROM`    | Sender email         | `Your Name <noreply@yourdomain.com>` |
| `SMTP_HOST`       | SMTP server          | `smtp.mailgun.org`                   |
| `SMTP_PORT`       | SMTP port            | `587`                                |
| `SMTP_USER`       | SMTP username        | `postmaster@yourdomain.com`          |
| `SMTP_PASS`       | SMTP password        | `your-smtp-password`                 |
| `RECIPIENT_EMAIL` | Where forms are sent | `your.email@example.com`             |
| `SENDER_WEBSITE`  | Your website URL     | `https://yourwebsite.com`            |

3. Click **"Save"**
4. Go to **Deployments** and click **"Redeploy"** to apply environment variables

#### Step 4: Automatic Deployments

Once connected, Vercel will automatically:

- Deploy to **production** on every push to `main` branch
- Create **preview deployments** for pull requests
- Build and deploy in ~2-3 minutes

### Other Deployment Options

- **Frontend**: Netlify, GitHub Pages, Render
- **Backend**: Railway, Render, Heroku (requires modifications for non-serverless)

## Key Features Explained

### Dual Email Delivery System

The contact form supports both Mailgun API and SMTP with automatic fallback:

1. **Primary**: Mailgun API (fast, scalable)
2. **Fallback**: SMTP (reliable, works everywhere)

If Mailgun API is unavailable or fails, the system automatically switches to SMTP without any user-facing errors.

### Theme System

- Uses React Context API for global state
- Persists theme preference in localStorage
- Smooth CSS transitions between themes (0.3s)
- Supports system preference detection

### Responsive Design

- **Mobile**: Single column layout, touch-optimized
- **Tablet**: 2-column grid for projects
- **Desktop**: 3-column grid, expanded navigation
- **4K**: Max-width constraints (2000px/2400px)

### Performance Optimizations

- Code splitting by routes and libraries
- Image lazy loading with aspect ratio preservation
- React.lazy() for dynamic imports
- Vite's optimized build with Rollup

## Contact & Support

**Portfolio**: [vinayprabhakar.dev](https://vinayprabhakar.dev)  
**Email**: [work.vinayprabhakar@gmail.com](mailto:work.vinayprabhakar@gmail.com)  
**GitHub**: [@vinayprabhakarx](https://github.com/vinayprabhakarx)

## License

This project is licensed under the [MIT License](./LICENSE) - feel free to use it for your own portfolio!

## Acknowledgments

- **React Team** for React 19
- **Vercel** for seamless deployment
- **Mailgun** for email API
- **Lottie** for beautiful animations
- All open-source contributors
