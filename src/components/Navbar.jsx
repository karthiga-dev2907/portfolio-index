import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#tech' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll detection for background transparency and scroll spy
  useEffect(() => {
    const handleScroll = () => {
      // Background change on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy logic
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navLinks[i].href.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Navbar height offset
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-4 shadow-lg'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="font-display font-bold text-xl tracking-wider flex items-center gap-2 group"
          >
            <span className="text-electric group-hover:text-cyan transition-colors duration-300">&lt;</span>
            <span className="text-white dark:text-white light:text-slate-900 transition-colors duration-300">Portfolio</span>
            <span className="text-cyan group-hover:text-electric transition-colors duration-300">/&gt;</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 font-medium">
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative text-sm tracking-wide transition-colors duration-300 hover:text-cyan ${
                        isActive
                          ? 'text-cyan dark:text-cyan font-semibold glow-text-cyan'
                          : 'text-slate-400 dark:text-slate-400 light:text-slate-600'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-cyan"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full glass hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 transition-all duration-300 text-cyan hover:text-electric"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            {/* Theme Toggle for mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass text-cyan hover:text-electric"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full glass text-white dark:text-white light:text-slate-900 hover:text-cyan transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-navy-dark dark:bg-navy-dark light:bg-slate-100 z-50 shadow-2xl p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-display font-bold text-lg text-cyan">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="flex flex-col gap-6 font-display font-medium text-lg flex-grow">
                {navLinks.map((link) => {
                  const sectionId = link.href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`block py-2 transition-colors duration-300 ${
                          isActive
                            ? 'text-cyan dark:text-cyan font-bold glow-text-cyan border-l-2 border-cyan pl-4'
                            : 'text-slate-400 dark:text-slate-400 light:text-slate-600 pl-4'
                        }`}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-slate-800 dark:border-slate-800 light:border-slate-300 pt-6 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
