# PRO SAN — Modern Personal Developer Portfolio

A production-ready, high-performance personal portfolio website built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Firebase Firestore**. Designed specifically for a **Senior Software Engineer**, **Full-Stack Developer**, and **AI & Automation Architect**.

---

## ✨ Features

- **Dark / Light Mode Switcher**: Seamless theme switcher with system preference detection and anti-FOUC (Flash of Unstyled Content) initial script.
- **Dynamic View Counts & Popularity Metric**: Live real-time Firestore synchronization that tracks and displays interactive view counts and "Trending" / "Popular" badges on projects and blog articles.
- **Scroll Progress Bar**: Subtle gradient progress bar indicator active during long-form reading on project details and blog articles.
- **Skeleton Loading States**: Polished loading skeletons for cards to optimize perceived speed.
- **Web Share Integration**: Native Web Share API with clipboard fallback for single-click sharing of projects and articles.
- **Projects Showcase & Filtering**: Multi-category filtering (Web Development, AI, Automation, Desktop Software, Mobile), live search, tech stack selector, and detail pages.
- **Interactive Skills Matrix**: Grouped by category (Frontend, Backend, AI & LLMs, Cloud & DevOps, Database, Tools) with proficiency percentages and search.
- **Work Experience & Career Timeline**: Structured timeline featuring roles, companies, dates, key technical contributions, and tech stacks.
- **Academic Education & Research**: Academic Computer Science foundation, coursework, and continuous learning breakdown.
- **Verified Certifications**: Accredited credentials with verification links, certificate IDs, and organization tags.
- **Interactive Services Section**: 6 core engineering offerings (Web Development, Full-Stack, AI Integration, Automation Software, API Integration, Desktop Application Development).
- **Interactive Resume / CV**: ATS-compliant in-browser CV preview, print-ready CSS stylesheet, and direct `/public/resume.pdf` download.
- **Live GitHub API & YouTube Integrations**: Real-time stats and video galleries with built-in resilient demo fallbacks.
- **Contact System**: Validated contact form with cooldown spam protection, templates, and direct links to Telegram, LinkedIn, GitHub, and Email.
- **Fully Responsive & Accessible**: Mobile-first architecture with custom mobile bottom navigation bar and WCAG AA contrast compliance.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Variables
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Persistence & Telemetry**: Firebase Firestore (View counts & metrics)
- **Deployment**: Compatible with Vercel, Netlify, Firebase Hosting, and Cloud Run

---

## 📁 Folder Structure

```
├── public/
│   ├── favicon.svg          # Crisp vector favicon
│   ├── resume.pdf           # Downloadable ATS resume
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # XML sitemap for SEO
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI (Button, Badge, Modal, ViewCountBadge, ScrollProgress)
│   │   ├── layout/          # Navbar, Footer, MobileBottomNav, PageContainer
│   │   ├── home/            # Hero, TechMarquee, ServicesSection, StatsCounter
│   │   ├── projects/        # ProjectCard, ProjectFilter, ProjectCardSkeleton
│   │   ├── certificates/    # CertificateCard
│   │   └── contact/         # ContactForm, ContactInfo
│   ├── config/
│   │   └── siteConfig.ts    # Centralized profile, links, quotes, and navigation items
│   ├── data/
│   │   ├── projects.ts      # Projects data & case studies
│   │   ├── skills.ts        # Skills grouped by technical category
│   │   ├── experience.ts    # Work history and employment timeline
│   │   ├── education.ts     # Academic degrees and university coursework
│   │   ├── certificates.ts  # Verified accreditations and credentials
│   │   ├── services.ts      # 6 core engineering service offerings
│   │   └── articles.ts      # Technical deep-dives and blog articles
│   ├── hooks/
│   │   ├── useItemViews.ts  # Firestore view counter hook
│   │   └── useContactForm.ts# Contact form validation hook
│   ├── services/
│   │   ├── firestoreService.ts # Firestore view increments
│   │   ├── githubApi.ts     # GitHub REST API client with fallback
│   │   └── youtubeApi.ts    # YouTube Data API client with fallback
│   ├── types/
│   │   └── index.ts         # Global TypeScript interfaces
│   ├── App.tsx              # React router configuration
│   └── main.tsx             # Entry point
├── index.html               # Entry HTML with meta tags & anti-FOUC script
├── metadata.json            # AI Studio metadata
└── package.json             # NPM dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/pro-san-portfolio.git
cd pro-san-portfolio

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start local development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: GitHub API sync (leave empty to use verified showcase fallback)
VITE_GITHUB_USERNAME="YOUR_GITHUB_USERNAME"

# Optional: YouTube API sync (leave empty to use verified tutorial fallback)
VITE_YOUTUBE_CHANNEL_ID="YOUR_YOUTUBE_CHANNEL_ID"
VITE_YOUTUBE_API_KEY=""

# Optional: External form processor (Formspree or custom API)
VITE_CONTACT_API_URL=""
VITE_FORMSPREE_ENDPOINT=""
```

---

## 🚢 Deployment Guide

### Vercel Deployment
1. Connect your GitHub repository to Vercel.
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### Netlify Deployment
1. Create a `_redirects` file in `/public`:
   ```
   /*    /index.html   200
   ```
2. Link your Git repository on Netlify.
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Click **Deploy Site**.

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select existing project or create new
# Set public directory to 'dist'
# Configure as single-page app (SPA): Yes
npm run build
firebase deploy --only hosting
```

---

## ✏️ Customization Guide

All data and content are decoupled from UI components and stored in `src/data/`:

| File | Content to Customize |
| :--- | :--- |
| `src/config/siteConfig.ts` | Name, title, quote, email, phone, location, social links |
| `src/data/projects.ts` | Project titles, descriptions, live demo URLs, GitHub links |
| `src/data/skills.ts` | Technical skills, proficiency levels, categories |
| `src/data/experience.ts` | Work experience, companies, responsibilities |
| `src/data/education.ts` | Degrees, institutions, coursework |
| `src/data/certificates.ts` | Licenses, credentials, verification URLs |
| `src/data/services.ts` | Services offered, descriptions, deliverables |
| `src/data/articles.ts` | Blog articles, tags, markdown contents |
| `public/resume.pdf` | Replace with your ATS-friendly PDF resume |

---

## 📄 License

Licensed under the [Apache-2.0 License](LICENSE).
