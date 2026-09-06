import React, { useState, useEffect } from 'react';
import { Terminal, FastForward, CheckCircle2 } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('> INITIALIZING AI_CORE...');
  const [isFading, setIsFading] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const steps = [
    { text: '> INITIALIZING AI_CORE...', p: 20 },
    { text: '> LOADING NEURAL WEIGHTS...', p: 45 },
    { text: '> MOUNTING FULL_STACK PIPELINE...', p: 70 },
    { text: '> VERIFYING LATENCY & CONNECTIVITY...', p: 90 },
    { text: '> SYSTEM_READY: ACCESS_GRANTED', p: 100 }
  ];

  const finishBoot = () => {
    sessionStorage.setItem('ai_core_booted', 'true');
    setIsFading(true);
    setTimeout(() => {
      onComplete?.();
    }, 400);
  };

  useEffect(() => {
    // Check if user already saw the boot sequence in this session
    if (sessionStorage.getItem('ai_core_booted') === 'true') {
      onComplete?.();
      return;
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishBoot();
      return;
    }

    // Handle Escape key to skip
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSkipped(true);
        finishBoot();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex].text);
        setProgress(steps[stepIndex].p);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(finishBoot, 350);
      }
    }, 280);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  if (sessionStorage.getItem('ai_core_booted') === 'true') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-canvas flex items-center justify-center p-4 transition-opacity duration-400 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="System Initializing"
      aria-live="polite"
    >
      <div className="w-full max-w-md glass-panel p-6 border border-cyber/30 relative overflow-hidden shadow-2xl shadow-cyan-950/50">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-slate-400">ai_core_boot.exe</span>
          </div>

          <button
            type="button"
            onClick={finishBoot}
            className="text-xs font-mono text-cyber hover:text-emerald-400 transition-colors flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/80 border border-cyber/20 hover:border-cyber/50"
            title="Skip Intro Sequence (Press ESC)"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>SKIP [ESC]</span>
          </button>
        </div>

        {/* Neural Core Icon */}
        <div className="flex justify-center my-6">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyber/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-neural/40 animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-cyber flex items-center justify-center text-cyber font-mono font-bold text-xl shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              S
            </div>
          </div>
        </div>

        {/* Terminal Status Output */}
        <div className="font-mono text-xs text-neural mb-3 h-5 flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyber flex-shrink-0" />
          <span className="truncate">{currentStep}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-2">
          <div
            className="h-full bg-gradient-to-r from-cyber via-emerald-400 to-cyber transition-all duration-300 ease-out shadow-[0_0_10px_#38bdf8]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
          <span>AI_SUBSYSTEM // READY</span>
          <span className="text-cyber font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
