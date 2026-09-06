import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 px-4 sm:px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-cyber tracking-widest uppercase block mb-2 font-semibold">
            {educationData.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{educationData.title}</span>
            <div className="h-px bg-slate-800 flex-grow max-w-xs" />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            {educationData.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {educationData.timeline.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyber group-hover:border-emerald-400 transition-colors shadow-[0_0_10px_rgba(56,189,248,0.4)]" />

              <div className="glass-panel p-6 sm:p-7 border border-slate-800 hover:border-cyber/30 transition-all duration-300">
                {/* Period & Status Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-cyber bg-slate-900 px-3 py-1 rounded-full border border-cyber/20 flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/40">
                    {item.status}
                  </span>
                </div>

                {/* Degree & Institution */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyber transition-colors">
                  {item.degree}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-mono mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.institution} — {item.location}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
