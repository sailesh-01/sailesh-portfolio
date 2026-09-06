import React from 'react';
import { Github, Linkedin, Mail, Heart, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 relative z-10 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:items-start text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <Terminal className="w-4 h-4 text-cyber" />
            <span className="font-mono text-sm font-bold text-white tracking-wider">
              SAILESH S // DEV
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            &copy; {currentYear} Sailesh S. Built with React &amp; Tailwind CSS.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-6 font-mono text-xs text-slate-400">
          <a href="#home" className="hover:text-cyber transition-colors">Home</a>
          <a href="#about" className="hover:text-cyber transition-colors">About</a>
          <a href="#skills" className="hover:text-cyber transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyber transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyber transition-colors">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyber transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyber/30"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/30"
            aria-label="Email Contact"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
