import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-navy-dark/30 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-4">
            About Me &amp; Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric to-cyan mx-auto rounded-full" />
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 flex justify-center">
            {/* Beautiful graphic representation of the profile */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-electric to-cyan rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative w-[280px] h-[340px] md:w-[320px] md:h-[380px] rounded-2xl bg-navy/95 border border-slate-700/60 overflow-hidden flex flex-col justify-end p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent z-10" />
                
                {/* Simulated Grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <div className="relative z-20">
                  <h3 className="font-display font-bold text-xl text-white">Karthiga Ramesh</h3>
                  <p className="text-cyan text-sm mb-4">Computer Science GEngineer</p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Passionate about system designs, database queries, and styling interactives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 text-slate-300 dark:text-slate-300 light:text-slate-700 space-y-6">
            <h3 className="text-2xl font-display font-semibold text-white dark:text-white light:text-slate-900">
              My Journey
            </h3>
            <p className="leading-relaxed">
              I am a full-stack software engineer with a passion for building high-performance applications. I specialize in creating scalable web backends and premium user interfaces, focusing on clean code, micro-animations, and excellent user experience.
            </p>
            <p className="leading-relaxed">
              I have a strong foundation in both backend and frontend technologies, allowing me to build complete solutions from the ground up.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <div>
                <p className="text-cyan font-bold text-3xl md:text-4xl">Graduate 2027</p>
                <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm">Fresher</p>
              </div>
              <div>
                <p className="text-electric font-bold text-3xl md:text-4xl">5+</p>
                <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm">Projects Delivered</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
