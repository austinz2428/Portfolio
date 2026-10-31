import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import { fetchSyncedProjects } from './services/githubSync';
import apolloImg from './assets/apollo11.jpg';

export default function App() {
  const { personal } = portfolioData;
  const [projects, setProjects] = useState(portfolioData.projects);

  // Synchronize repositories from GitHub API on load
  useEffect(() => {
    fetchSyncedProjects(personal.githubUsername, portfolioData.projects)
      .then((synced) => {
        if (synced && synced.length > 0) {
          setProjects(synced);
        }
      })
      .catch((err) => {
        console.warn('GitHub sync failed, using default projects list:', err);
      });
  }, [personal.githubUsername]);

  // Default mode is light mode (the current way it is) on first entry
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
    }
    return false; // Default light
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <>
      {/* Top Right Sun/Moon Theme Toggle */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)] bg-[var(--bg)]/80 backdrop-blur-sm transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-center shadow-xs"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-zinc-200" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-600" />
          )}
        </button>
      </div>

      {/* Apollo 11 Saturn V Etched Backdrop */}
      <div className="hero-backdrop" aria-hidden="true">
        <img
          src={apolloImg}
          alt="Apollo 11 Saturn V Launch"
          className="hero-backdrop-image"
          loading="eager"
          decoding="async"
        />
        <div className="hero-backdrop-texture" />
        <div className="hero-backdrop-blur" />
        <div className="hero-backdrop-gradient" />
      </div>

      {/* Main Single Page Container */}
      <div className="site-container">
        {/* Header */}
        <header className="header">
          <h1>{personal.name}</h1>
          <div className="bio">
            <p>{personal.statement1}</p>
            <p className="bio-statement">{personal.statement2}</p>
          </div>
          <nav className="links" aria-label="Social and contact links">
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="divider" aria-hidden="true">/</span>
            <a
              href={`mailto:${personal.email}`}
            >
              Email
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          {/* Projects Section */}
          <section className="section">
            <h2>Projects</h2>
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.id} className="project-item">
                  <div className="project-header">
                    <a
                      href={project.url}
                      className="project-title"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{project.name}</span>
                      <span className="arrow" aria-hidden="true">↗</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="project-demo-badge"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View live demo"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <p className="project-tech">{project.tech}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
