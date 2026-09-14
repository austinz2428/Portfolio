import React from 'react';
import { portfolioData } from './data/portfolioData';
import apolloImg from './assets/apollo11.jpg';

export default function App() {
  const { personal, projects } = portfolioData;

  return (
    <>
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
