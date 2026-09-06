import React, { useEffect, useRef } from 'react';

/**
 * High-performance, buttery-smooth scroll progress bar.
 * Uses GPU-accelerated transform: scaleX() and requestAnimationFrame
 * to eliminate lag, stutter, and layout reflows during scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (barRef.current && totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / totalHeight));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Initial calculation
    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyber via-emerald-400 to-cyber z-[9999] pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.7)]"
      style={{
        transformOrigin: '0% 50%',
        transform: 'scaleX(0)',
        willChange: 'transform'
      }}
      role="progressbar"
      aria-label="Page reading progress"
    />
  );
}
