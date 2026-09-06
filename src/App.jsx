import React, { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [bootComplete, setBootComplete] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem('ai_core_booted') === 'true'
  );

  return (
    <div className="relative min-h-screen bg-canvas text-slate-100 font-sans selection:bg-cyber/20 selection:text-cyber">
      {/* Skippable AI_CORE Boot HUD */}
      {!bootComplete && <Preloader onComplete={() => setBootComplete(true)} />}

      {/* Interactive Custom Mouse Pointer & Follower */}
      <CustomCursor />

      {/* Interactive Neural Network / Particles Background */}
      <BackgroundEffects />

      {/* Subtle Top Reading Scroll Progress */}
      <ScrollProgress />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Semantic Page Content */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back To Top Floating Action */}
      <BackToTop />
    </div>
  );
}
