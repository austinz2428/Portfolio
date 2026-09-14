import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import apolloImg from './assets/apollo11.jpg';

export default function App() {
  const { personal, projects } = portfolioData;

  // Default to false (light mode) unless user explicitly selected dark previously
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
    }
    return false; // Light mode by default!
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <>
      {/* Top Right Theme Toggle for Sun & Moon */}
      <div className="fixed top-5 right-5 sm:top-7 sm:right-7 z-50">
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all cursor-pointer shadow-xs"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-700" />
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
