import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            01 / Stack
          </h2>
          <p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Skills & Technologies
          </p>
        </div>

        <div className="space-y-8">
          {skills.map((cat) => (
            <div key={cat.category} className="space-y-3">
              <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800 transition-colors hover:border-zinc-400 dark:hover:border-zinc-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
