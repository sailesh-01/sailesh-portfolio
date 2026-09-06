import React from 'react';
import { Code, Layout, Database, Wrench, CheckCircle } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const categoryIcons = {
    "Programming Languages": <Code className="w-5 h-5 text-cyber" />,
    "Frameworks & Libraries": <Layout className="w-5 h-5 text-emerald-400" />,
    "Data & Cloud Infrastructure": <Database className="w-5 h-5 text-cyan-400" />,
    "Developer Tooling & Workflows": <Wrench className="w-5 h-5 text-amber-400" />
  };

  return (
    <section id="skills" className="py-24 relative z-10 px-4 sm:px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-cyber tracking-widest uppercase block mb-2 font-semibold">
            {skillsData.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{skillsData.title}</span>
            <div className="h-px bg-slate-800 flex-grow max-w-xs" />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            {skillsData.subtitle}
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.categories.map((category) => (
            <div
              key={category.name}
              className="glass-panel p-6 border border-slate-800/90 hover:border-cyber/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Title Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {categoryIcons[category.name] || <Code className="w-5 h-5 text-cyber" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                        skill.highlight
                          ? 'bg-slate-900/90 border-cyber/20 hover:border-cyber/50'
                          : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${skill.highlight ? 'bg-cyber' : 'bg-slate-600'}`} />
                        <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
