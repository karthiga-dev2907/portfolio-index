import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-slate-900/60 dark:border-slate-900/60 light:border-slate-200 bg-navy-dark dark:bg-navy-dark light:bg-slate-100 py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo/Identity */}
        <div>
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="font-display font-bold text-lg tracking-wider flex items-center gap-1 group"
          >
            <span className="text-electric">&lt;</span>
            <span className="text-white dark:text-white light:text-slate-900">Karthiga</span>
            <span className="text-cyan">/&gt;</span>
          </a>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            Computer Science Engineer
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 text-slate-400 dark:text-slate-400 light:text-slate-600">
          <a
            href="//github.com/karthiga-dev2907"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/karthiga-ramesh-495aa1397/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="mailto:karthigaramesh510@gmail.com"
            className="hover:text-cyan transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright & Info */}
        <div className="text-center md:text-right text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Karthiga Ramesh. All rights reserved.</p>
          <p className="mt-1 font-mono text-[10px]">
            Built with React, Tailwind &amp; FastAPI
          </p>
        </div>

      </div>
    </footer>
  );
}
