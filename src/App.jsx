import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import useTheme from './hooks/useTheme';
import Background from './components/Background';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Toolkit from './components/Toolkit';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terminal from './components/Terminal';

export default function App() {
  const { theme, isDark, toggle } = useTheme();
  const [consoleOpen, setConsoleOpen] = useState(false);

  const openConsole = useCallback(() => setConsoleOpen(true), []);
  const closeConsole = useCallback(() => setConsoleOpen(false), []);

  // Ctrl/Cmd + ` opens the console from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setConsoleOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative min-h-screen">
      <a
        href="#certifications"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-lg focus:bg-title focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        Skip to content
      </a>

      <Background theme={theme} />

      <Nav isDark={isDark} onToggleTheme={toggle} onOpenConsole={openConsole} />

      <main className="relative z-10">
        <Hero />
        <Certifications />
        <Experience />
        <Toolkit />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer onOpenConsole={openConsole} />
      </div>

      <AnimatePresence>
        {consoleOpen && (
          <Terminal open={consoleOpen} onClose={closeConsole} onToggleTheme={toggle} />
        )}
      </AnimatePresence>
    </div>
  );
}
