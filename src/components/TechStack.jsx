import React from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../data/techStack';

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <section id="tech" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-4">
            Tech Stack
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric to-cyan mx-auto rounded-full" />
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-lg mx-auto mt-4 text-sm md:text-base">
            These are the languages, frameworks, and developer tools that I use to bring products to life.
          </p>
        </div>

        {/* Tech Stack Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {techStack.map((categoryGroup, catIdx) => (
            <motion.div
              key={catIdx}
              variants={cardVariants}
              className="glass p-8 rounded-2xl border border-slate-700/40 shadow-xl flex flex-col h-full hover:border-cyan/35 transition-colors duration-300"
            >
              <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan inline-block shadow-lg shadow-cyan/50" />
                {categoryGroup.category}
              </h3>
              
              <ul className="space-y-4 flex-grow">
                {categoryGroup.skills.map((skill, skillIdx) => (
                  <li key={skillIdx} className="group relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium text-sm group-hover:text-cyan transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-slate-500 font-mono text-xs">
                        {skill.level}
                      </span>
                    </div>
                    {/* Visual Progress/Glow bar */}
                    <div className="w-full h-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 w-full`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Small Tech Badges Strip */}
        <div className="mt-16 text-center border-t border-slate-800 dark:border-slate-800 light:border-slate-200 pt-10">
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-xs uppercase tracking-wider mb-6 font-mono">
            Always learning and experimenting with new tech
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {["GraphQL", "Next.js", "Serverless", "Kubernetes", "Prisma", "Pydantic", "SlowAPI", "Uvicorn", "PostgreSQL", "Socket.io", "GitHub CI/CD"].map((badge, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-700 rounded-full text-xs font-mono border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-cyan/40 hover:text-cyan transition-all cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
