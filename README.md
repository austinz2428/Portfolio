# 🚀 Developer Portfolio (React + GitHub Repos + Resume PDF)

A modern, fast, and fully responsive developer portfolio web application built with **React**, **Vite**, and **Tailwind CSS**. It dynamically showcases your live public GitHub repositories and includes an interactive embedded PDF resume viewer with download capabilities.

---

## ✨ Features

- **⚡ GitHub Repository Integration**:
  - Automatically fetches public repositories directly from GitHub's REST API.
  - Live search filter by repository name, description, or topic tags.
  - Language filter tags (e.g. JavaScript, TypeScript, Python, HTML, etc.).
  - Multi-criteria sorting (Most Stars, Recently Updated, Most Forks, Alphabetical).
  - Live GitHub username switcher right in the UI to instantly test any profile.
  - Caching in `sessionStorage` to prevent rate-limiting.
  - Graceful fallback with featured showcase projects if offline or rate-limited.
- **📄 Resume PDF Viewer & Credentials**:
  - Embedded responsive PDF reader (`/resume.pdf`) with zoom and navigation controls.
  - Direct "Download PDF" button and "Open in New Tab" link.
  - Fullscreen preview modal for high-resolution document viewing.
  - Dual-view toggle: Switch between the interactive PDF reader and an ATS-friendly structured HTML experience view (ideal for mobile devices).
- **🎨 Modern Dark / Light Mode**:
  - One-click theme toggle with automatic system preference detection and local storage persistence.
- **🛠️ Tech Stack & Skills**:
  - Interactive skill cards categorized by Frontend, Backend & Cloud, and Tools & DevOps.
- **📬 Contact & Connect**:
  - One-click copy email button with visual confirmation.
  - Interactive contact form with direct `mailto:` handler.
  - Social media badges for GitHub, LinkedIn, and email.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## ⚙️ How to Personalize Your Portfolio

All personal data, skills, links, and configuration live in a single centralized file:  
📁 `src/data/portfolioData.js`

### 1. Set Your GitHub Username
In `src/data/portfolioData.js`, update:
```javascript
personal: {
  name: "Your Name",
  title: "Full-Stack Software Engineer",
  githubUsername: "your-github-username", // <-- Replace with your GitHub handle!
  email: "your.email@example.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/your-github-username",
}
```

### 2. Replace the Resume PDF
Drop your own resume PDF file into the `public/` directory and name it `resume.pdf`:
```
Portfolio/
  └── public/
        └── resume.pdf   <-- Replace this file with your personal resume PDF
```
The portfolio will immediately render your resume inside the embedded viewer and serve it for the download button.

### 3. Customize Experience & Skills
Edit `experience`, `education`, `certifications`, and `skills` inside `src/data/portfolioData.js` to match your background.

---

## 🚢 Deployment

You can deploy this portfolio to any static hosting provider in seconds:

- **Vercel**: Import the GitHub repo and click Deploy (framework preset: Vite).
- **Netlify**: Connect repository or drag-and-drop the `dist/` folder.
- **GitHub Pages**: Run `npm run build` and publish the `dist` directory.
