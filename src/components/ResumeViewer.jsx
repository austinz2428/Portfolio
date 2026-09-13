import React, { useState } from 'react';
import {
  Download,
  ExternalLink,
  FileText,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeViewer() {
  const { resume, experience, education, certifications, personal } = portfolioData;
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'text'

  return (
    <section id="resume" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
              03 / Resume
            </h2>
            <p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Curriculum Vitae & Background
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={resume.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <span>Open in tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={resume.pdfUrl}
              download={resume.filename}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-xs font-mono">
          <button
            onClick={() => setViewMode('pdf')}
            className={`pb-1 transition-colors ${
              viewMode === 'pdf'
                ? 'text-zinc-900 dark:text-zinc-100 font-medium border-b-2 border-zinc-900 dark:border-zinc-100 -mb-[9px]'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            PDF Viewer
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <button
            onClick={() => setViewMode('text')}
            className={`pb-1 transition-colors ${
              viewMode === 'text'
                ? 'text-zinc-900 dark:text-zinc-100 font-medium border-b-2 border-zinc-900 dark:border-zinc-100 -mb-[9px]'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            Structured Overview
          </button>
        </div>

        {/* Content */}
        {viewMode === 'pdf' ? (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm">
            <div className="w-full h-[650px] md:h-[800px] relative">
              <iframe
                src={`${resume.pdfUrl}#toolbar=0&navpanes=0`}
                title="Resume PDF Viewer"
                className="w-full h-full border-0"
              />

              {/* Mobile Fallback */}
              <div className="sm:hidden absolute bottom-2 left-2 right-2 p-3 bg-zinc-900/90 text-zinc-100 rounded-lg text-xs flex items-center justify-between">
                <span>Reading on a phone?</span>
                <a
                  href={resume.pdfUrl}
                  download={resume.filename}
                  className="underline font-medium"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Clean minimalist text overview */
          <div className="space-y-12 py-2">
            {/* Experience */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Experience
              </h3>
              <div className="space-y-8">
                {experience.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.role} &mdash; <span className="text-zinc-500">{item.company}</span>
                      </h4>
                      <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                    <ul className="space-y-1 pl-3 text-xs text-zinc-500 dark:text-zinc-400 list-disc list-outside">
                      {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Education
              </h3>
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {edu.degree} &mdash; <span className="text-zinc-500">{edu.school}</span>
                    </h4>
                    <span className="text-xs font-mono text-zinc-400">{edu.period}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{edu.description}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
