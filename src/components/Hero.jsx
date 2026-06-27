import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const handleScrollToSection = (id) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Glowing Blobs for Premium Aesthetics */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-electric/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan/15 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Intro Text */}
        <div className="lg:col-span-12 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan dark:text-cyan font-mono font-semibold tracking-wider text-sm md:text-base mb-3 block">
              HI, MY NAME IS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white dark:text-white light:text-slate-900 leading-tight"
          >
            Karthiga Ramesh
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-4xl font-display font-medium text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2 mb-4 h-[48px] md:h-[60px]"
          >
            I build{' '}
            <span className="text-electric glow-text-electric">
              <TypeAnimation
                sequence={[
                  'scalable web backends',
                  1500,
                  'premium user interfaces',
                  1500,
                  'modern full-stack apps',
                  1500,
                  'cloud architectures',
                  1500,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl text-base md:text-lg mb-8 leading-relaxed"
          >
            I am an aspiring AI and Full-stack software engineer specializing in building high-performance applications. 
            I enjoy workingon innovative projects that leverage AI and modern web technologies. 
            I have a strong interest in AI and am eager to contribute to projects that push the boundaries of technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => handleScrollToSection('#projects')}
              className="px-6 py-3.5 bg-electric hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-electric/25 flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollToSection('#contact')}
              className="px-6 py-3.5 border border-slate-700 hover:border-cyan text-slate-300 hover:text-cyan rounded-lg font-medium transition-all glass"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex gap-5 mt-12 text-slate-400 dark:text-slate-400 light:text-slate-600"
          >
            <a
              href="https://github.com/karthiga-dev2907"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/karthiga-ramesh-495aa1397/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:karthigaramesh510@gmail.com"
              className="hover:text-cyan transition-colors duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>

      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan cursor-pointer transition-colors duration-300 animate-bounce pointer-events-auto">
        <button onClick={() => handleScrollToSection('#about')} aria-label="Scroll to About">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
