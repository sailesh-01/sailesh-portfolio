import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Cpu } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-canvas/90 backdrop-blur-md shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          aria-label="Sailesh S - Home"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-cyber/30 group-hover:border-cyber flex items-center justify-center text-cyber font-mono font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-slate-200 group-hover:text-cyber transition-colors">
              SAILESH.S
            </span>
            <span className="font-mono text-[10px] text-neural tracking-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neural animate-pulse" />
              AI &amp; DS UNDERGRAD
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/70 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-cyber/15 text-cyber font-semibold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="font-mono text-xs px-4 py-2 rounded-lg bg-slate-900/80 border border-cyber/30 hover:border-cyber text-cyber hover:bg-cyber/10 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyber focus:outline-none focus:ring-2 focus:ring-cyber"
          aria-expanded={isOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-canvas/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl p-6 transition-all animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-mono text-sm flex items-center justify-between ${
                    isActive
                      ? 'bg-cyber/15 text-cyber font-bold border border-cyber/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-cyber'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    //{link.href.substring(1).toUpperCase()}
                  </span>
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 w-full text-center font-mono text-sm py-3 rounded-lg bg-cyber text-canvas font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              Get In Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
