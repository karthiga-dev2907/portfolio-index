import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    // Retrieve theme from localStorage or default to dark
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    // Sync classes based on selected theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen text-slate-100 dark:text-slate-100 light:text-slate-900 bg-navy dark:bg-navy light:bg-slate-50 transition-colors duration-300">
      
      {/* Toast Notification Container */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#0A0F1E' : '#FFFFFF',
            color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#06B6D4',
              secondary: '#0A0F1E',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      {/* Navbar Section */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
