import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Mail, FileText, Rocket, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal, resume } = portfolioData;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
      {/* Apollo 11 Rocket Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* The NASA Apollo 11 Launch Photograph */}
        <img
          src="/apollo11.jpg"
          alt="Apollo 11 Saturn V Launch"
          className="absolute right-0 top-0 h-full w-full sm:w-[65%] lg:w-[55%] object-cover object-[center_20%] sm:object-[center_35%] opacity-35 dark:opacity-45 md:opacity-75 md:dark:opacity-65 transition-opacity duration-700"
        />

        {/* Ambient color gradient overlays for perfect text contrast and seamless blending */}
        {/* Left-to-right fade: solid dark on the left for text, revealing rocket on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/95 to-transparent/10 dark:from-[#09090b] dark:via-[#09090b]/90 dark:to-transparent/20 sm:via-[#fafafa]/80 sm:dark:via-[#09090b]/80" />

        {/* Bottom fade into the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fafafa] dark:from-[#09090b] via-[#fafafa]/60 dark:via-[#09090b]/70 to-transparent" />

        {/* Top fade under navbar */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fafafa] dark:from-[#09090b] via-[#fafafa]/40 dark:via-[#09090b]/40 to-transparent" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Aerospace / Mission metadata tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">APOLLO 11</span>
            <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
            <span>SATURN V (AS-506)</span>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">PAD 39A</span>
          </div>

          {/* Clean headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              {personal.name}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-mono">
              {personal.title}
            </p>
          </div>

          {/* Concise bio */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
            {personal.bio}
          </p>

          {/* Location & Status */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{personal.status}</span>
            <span>&bull;</span>
            <span>Oakland University &bull; Michigan</span>
          </div>

          {/* Direct minimalist action links */}
          <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-medium hover:underline underline-offset-4"
            >
              <span>Explore Repositories</span>
              <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href="#resume"
              className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-medium hover:underline underline-offset-4"
            >
              <span>View Resume PDF</span>
              <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{personal.email}</span>
            </a>

            <a
              href={`https://github.com/${personal.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
