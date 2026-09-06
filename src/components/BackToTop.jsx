import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-7 right-7 z-40 p-3 rounded-xl bg-slate-900/90 border border-cyber/30 hover:border-cyber text-cyber hover:text-white shadow-xl shadow-cyan-950/60 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyber backdrop-blur-sm"
      aria-label="Back to top of page"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
