import React from 'react';
import { GraduationCap, Cpu, Layers, GitBranch, ArrowUpRight, Code2 } from 'lucide-react';
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

            {/* GitHub Proof of Work - Native Cyber Telemetry */}
            <div className="glass-panel p-6 border border-slate-800 relative group hover:border-cyber/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-cyber" />
                  <span className="font-mono text-xs text-slate-200 font-semibold tracking-wider uppercase">
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

              {/* Native Live Telemetry Card */}
              <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 flex flex-col gap-4">
                {/* Telemetry Stats 3-Column Grid */}
                <div className="grid grid-cols-3 gap-2 text-center border-b border-slate-800/80 pb-3">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-cyber">15</span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Repositories</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-slate-800/80">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-neural">14</span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Showcase Apps</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-slate-200">100%</span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Open Source</span>
                  </div>
                </div>

                {/* Primary Stacks Breakdown */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-cyber" />
                      <span>Code Distribution</span>
                    </span>
                    <span className="text-slate-300 text-[10px]">Active Multi-Stack</span>
                  </div>

                  {/* Multi-Segment Language Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex">
                    <div className="h-full bg-cyber" style={{ width: '64%' }} title="JavaScript / React (64%)" />
                    <div className="h-full bg-neural" style={{ width: '22%' }} title="Python / Flask (22%)" />
                    <div className="h-full bg-amber-400" style={{ width: '14%' }} title="HTML / CSS3 (14%)" />
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber" />
                      <span>JavaScript (64%)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neural" />
                      <span>Python (22%)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>CSS3 (14%)</span>
                    </span>
                  </div>
                </div>

                {/* Live Status Footnote */}
                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neural animate-pulse" />
                    <span className="text-slate-300 text-[11px]">LIVE REPOSITORIES VERIFIED</span>
                  </div>
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyber hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>View GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
