import React from 'react';
import { GraduationCap, Cpu, Layers, GitBranch, ArrowUpRight } from 'lucide-react';
import { aboutData, personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 px-4 sm:px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-cyber tracking-widest uppercase block mb-2 font-semibold">
            {aboutData.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{aboutData.title}</span>
            <div className="h-px bg-slate-800 flex-grow max-w-xs" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Content */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-slate-300 text-base leading-relaxed">
            {aboutData.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}

            {/* Verified Focus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="glass-panel p-4 border border-slate-800 hover:border-cyber/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyber/10 border border-cyber/30 flex items-center justify-center text-cyber">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-sm font-semibold text-white">AI &amp; Data Focus</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Developing statistical models, Python analytical workflows, and intelligent prediction layers.
                </p>
              </div>

              <div className="glass-panel p-4 border border-slate-800 hover:border-neural/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-neural/10 border border-neural/30 flex items-center justify-center text-neural">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-sm font-semibold text-white">Full-Stack Systems</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Engineering fast client interfaces in React &amp; Tailwind with robust Node.js and Supabase backends.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Credential & GitHub Proof */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Academic Credential Card */}
            <div className="glass-panel p-6 border border-slate-800 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyber/30 flex items-center justify-center text-cyber flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider block mb-1">
                    ACADEMIC STATUS // ACTIVE
                  </span>
                  <h3 className="text-base font-bold text-white mb-1">
                    B.Tech Artificial Intelligence &amp; Data Science
                  </h3>
                  <p className="text-sm text-slate-400 mb-2">
                    Erode Sengunthar Engineering College
                  </p>
                  <span className="inline-block font-mono text-xs text-cyber bg-slate-900 px-2.5 py-1 rounded border border-cyber/20">
                    Graduation: 2028
                  </span>
                </div>
              </div>
            </div>

            {/* GitHub Proof of Work */}
            <div className="glass-panel p-6 border border-slate-800 relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-cyber" />
                  <span className="font-mono text-xs text-slate-300 font-semibold tracking-wider uppercase">
                    GitHub Proof of Work
                  </span>
                </div>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-cyber hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>@sailesh-01</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub Readme Stats Card */}
              <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950/60 p-2 flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=sailesh-01&show_icons=true&theme=transparent&title_color=38bdf8&icon_color=10b981&text_color=94a3b8&bg_color=00000000&hide_border=true"
                  alt="Sailesh's GitHub Stats"
                  className="w-full max-w-sm h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
