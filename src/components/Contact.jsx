import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    const mailto = `mailto:${personal.email}?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            04 / Contact
          </h2>
          <p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Let's Talk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Email & Links */}
          <div className="space-y-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you have an engineering role, contract project, or question, feel free to reach out directly.
            </p>

            <div className="space-y-2">
              <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Email
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
                >
                  {personal.email}
                </a>
                <button
                  onClick={handleCopy}
                  className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
                  title="Copy email"
                >
                  {copied ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <Check className="w-3 h-3" /> copied
                    </span>
                  ) : (
                    <span>[copy]</span>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Social Profiles
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={`https://github.com/${personal.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Clean form */}
          <div>
            {submitted ? (
              <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">Mail client opened</p>
                <p>If your client did not launch, you can write directly to {personal.email}.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="underline pt-1 block"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-transparent border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-transparent border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-transparent border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
