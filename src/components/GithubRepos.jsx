import React, { useState, useEffect } from 'react';
import {
  Github,
  Star,
  GitFork,
  ArrowUpRight,
  Search,
  RefreshCw,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { fetchGithubRepos } from '../services/github';
import { portfolioData } from '../data/portfolioData';

export default function GithubRepos() {
  const defaultUsername = portfolioData.personal.githubUsername || 'austin';
  const [usernameInput, setUsernameInput] = useState(defaultUsername);
  const [activeUsername, setActiveUsername] = useState(defaultUsername);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Filters & sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('stars'); // 'stars' | 'updated' | 'forks'
  const [isEditingUser, setIsEditingUser] = useState(false);

  const loadRepositories = async (userToFetch) => {
    setLoading(true);
    setError(null);
    setIsUsingFallback(false);

    try {
      const data = await fetchGithubRepos(userToFetch);
      if (!data || data.length === 0) {
        setError(`No public repositories found for "${userToFetch}".`);
        setRepos(portfolioData.fallbackRepos);
        setIsUsingFallback(true);
      } else {
        setRepos(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not reach GitHub API.');
      setRepos(portfolioData.fallbackRepos);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepositories(activeUsername);
  }, [activeUsername]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    const trimmed = usernameInput.trim();
    if (trimmed) {
      setActiveUsername(trimmed);
      setIsEditingUser(false);
    }
  };

  const availableLanguages = ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = repos
    .filter((repo) => {
      if (selectedLanguage !== 'All' && repo.language !== selectedLanguage) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query) ||
          repo.topics?.some((t) => t.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
      if (sortBy === 'forks') return b.forks_count - a.forks_count;
      return 0;
    });

  return (
    <section id="projects" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
              02 / Repositories
            </h2>
            <p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Open Source & GitHub Projects
            </p>
          </div>

          {/* Minimalist GitHub username badge / changer */}
          <div className="text-xs font-mono">
            {isEditingUser ? (
              <form onSubmit={handleUsernameSubmit} className="flex items-center gap-1.5">
                <span className="text-zinc-400">gh/</span>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="username"
                  className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs w-28 focus:outline-none focus:border-zinc-500 text-zinc-900 dark:text-zinc-100"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded text-[11px] font-medium"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingUser(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-[11px]"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <span>user: <span className="text-zinc-900 dark:text-zinc-200 font-medium">@{activeUsername}</span></span>
                <button
                  onClick={() => setIsEditingUser(true)}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 underline text-[11px]"
                >
                  switch
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fallback Notice */}
        {isUsingFallback && (
          <div className="mb-6 p-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between gap-3">
            <span>Showing curated showcase projects ({error || 'GitHub offline'}).</span>
            <button
              onClick={() => loadRepositories(activeUsername)}
              className="text-zinc-900 dark:text-zinc-100 font-medium underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )}

        {/* Controls: Search, Language Pills, Sort */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-transparent border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            />
          </div>

          {/* Sort & Language */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 focus:outline-none cursor-pointer"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang} className="dark:bg-zinc-900">
                  {lang === 'All' ? 'All Languages' : lang}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="stars" className="dark:bg-zinc-900">Most Stars</option>
              <option value="updated" className="dark:bg-zinc-900">Recently Updated</option>
              <option value="forks" className="dark:bg-zinc-900">Most Forks</option>
            </select>
          </div>
        </div>

        {/* Repositories List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 animate-pulse space-y-2"
              >
                <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="p-8 text-center border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-500">
            No repositories found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="group flex flex-col justify-between p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white/40 dark:bg-zinc-900/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sm text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4 flex items-center gap-1 tracking-tight"
                    >
                      <span>{repo.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5"
                        title="Live Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-850">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="text-zinc-600 dark:text-zinc-300">
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-zinc-400" />
                      {repo.stargazers_count}
                    </span>
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-zinc-400" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>

                  <span>{new Date(repo.updated_at).getFullYear()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View on GitHub link */}
        <div className="mt-8 text-center">
          <a
            href={`https://github.com/${activeUsername}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
