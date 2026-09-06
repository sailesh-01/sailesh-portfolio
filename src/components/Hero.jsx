import React, { useState, useEffect } from 'react';
import { ArrowDown, Code2, Database, Terminal, Sparkles, FolderGit2, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const roles = personalInfo.roles;
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 40);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          timer = setTimeout(() => setIsDeleting(true), 2200);
        }
      }, 90);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 flex items-center justify-center relative z-10 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Typewriter & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* System Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyber/30 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <span className="w-2 h-2 rounded-full bg-neural animate-ping" />
            <span className="font-mono text-[11px] text-cyber tracking-widest uppercase font-semibold">
              AI_CORE // OPERATIONAL
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber via-slate-100 to-emerald-400">Sailesh S</span>
          </h1>

          {/* Typewriter Subtitle */}
          <div className="h-10 flex items-center mb-6">
            <h2 className="font-mono text-lg sm:text-2xl text-slate-300 font-medium flex items-center">
              <span className="text-cyber mr-2">&gt;</span>
              <span>{displayText}</span>
              <span className="w-2 h-6 bg-neural ml-1 animate-pulse" />
            </h2>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            Undergraduate in <strong className="text-slate-100 font-semibold">Artificial Intelligence &amp; Data Science</strong> at{' '}
            <span className="text-cyber font-medium">Erode Sengunthar Engineering College</span> (2024–2028).
            Building intelligent software, data pipelines, and scalable full-stack applications.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyber text-canvas font-mono font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Projects</span>
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-neural text-slate-200 hover:text-neural font-mono font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-neural/10"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Telemetry Micro-Pills */}
          <div className="grid grid-cols-3 gap-3 mt-10 pt-6 border-t border-slate-800/80 w-full max-w-lg">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Major</span>
              <span className="font-mono text-xs font-bold text-cyber mt-0.5">B.Tech AI &amp; DS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Timeline</span>
              <span className="font-mono text-xs font-bold text-emerald-400 mt-0.5">2024 – 2028</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Location</span>
              <span className="font-mono text-xs font-bold text-slate-300 mt-0.5">Tamil Nadu, IN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual / Reference Avatar */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Animated Orbiting Rings */}
            <div className="absolute inset-0 rounded-3xl border border-cyber/20 animate-pulse" />
            <div className="absolute -inset-2 rounded-3xl border border-neural/20 animate-pulse-slow" />

            {/* Glowing Corner Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyber" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyber" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyber" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyber" />

            {/* Main Visual Container */}
            <div className="w-full h-full glass-panel p-4 flex flex-col items-center justify-between relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950">
              {/* Card Terminal Header */}
              <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[11px] text-slate-400">avatar_module.bin</span>
                <Sparkles className="w-3.5 h-3.5 text-cyber animate-pulse" />
              </div>

              {/* Reference Avatar & Photo Placement */}
              {/* PLACEHOLDER NOTE: Drop your real photo in public/assets/my-photo.png and it will show automatically! */}
              <div className="relative my-4 w-44 h-44 rounded-2xl overflow-hidden border-2 border-cyber/30 bg-slate-900 flex items-center justify-center group shadow-xl shadow-cyan-950/40">
                <img
                  src="https://images.unsplash.com/photo-1534972195531-a756b1126975?auto=format&fit=crop&w=600&q=80"
                  alt="Sailesh S - Developer Avatar Reference"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback to stylized SVG monogram if network is disconnected
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-slate-900 flex-col items-center justify-center text-cyber font-mono">
                  <Terminal className="w-12 h-12 mb-2" />
                  <span className="text-xs font-bold">SAILESH.DEV</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-60" />
              </div>

              {/* Status Bar */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">NODE: ONLINE</span>
                </div>
                <span className="text-cyber">LATENCY: 14ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyber transition-colors p-2 flex flex-col items-center gap-1 font-mono text-[10px]"
        aria-label="Scroll down to About"
      >
        <span>DISCOVER</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
