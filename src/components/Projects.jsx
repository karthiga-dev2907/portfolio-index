import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Full Stack', 'Frontend', 'Realtime'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-navy-dark/30 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric to-cyan mx-auto rounded-full" />
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-lg mx-auto mt-4 text-sm md:text-base">
            A curated showcase of applications I have built, ranging from data dashboards to real-time workspaces.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 font-mono ${
                filter === cat
                  ? 'bg-cyan text-navy shadow-lg shadow-cyan/20'
                  : 'bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-cyan/40 hover:text-cyan'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with AnimatePresence for smooth entry/exit */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="glass rounded-2xl overflow-hidden border border-slate-700/40 hover:border-cyan/35 transition-all group flex flex-col h-full shadow-2xl relative"
              >
                {/* Project Image & Overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-60" />
                  
                  {/* Category Tag on Image */}
                  <span className="absolute top-4 right-4 px-3 py-1 bg-navy/85 border border-slate-700/60 text-cyan text-[10px] font-mono rounded-full font-bold uppercase tracking-wider backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-3 group-hover:text-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-700 rounded text-xs font-mono border border-slate-800 dark:border-slate-800 light:border-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-cyan flex items-center gap-1.5 text-xs font-mono font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      SOURCE
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-cyan flex items-center gap-1.5 text-xs font-mono font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      DEMO
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
