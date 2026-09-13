import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-400 dark:text-zinc-500">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>{personal.name}</span>
          <span className="mx-2">&bull;</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4">
          <span>React + Vite + Tailwind</span>
          <button
            onClick={scrollToTop}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            [top &uarr;]
          </button>
        </div>
      </div>
    </footer>
  );
}
