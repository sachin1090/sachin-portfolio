import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuidanceSystem = ({ isDark }) => {
  const [mousePos, setMousePos] = useState({ x: 0, side: null });

  useEffect(() => {
    const handleMove = (e) => {
      const width = window.innerWidth;
      const x = e.clientX;
      
      // Threshold: 20% from the edges
      if (x < width * 0.2) {
        setMousePos({ x, side: 'left' });
      } else if (x > width * 0.8) {
        setMousePos({ x, side: 'right' });
      } else {
        setMousePos({ x, side: null });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <AnimatePresence>
      {mousePos.side && (
        <motion.div
          initial={{ opacity: 0, x: mousePos.side === 'left' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mousePos.side === 'left' ? -20 : 20 }}
          className={`fixed top-1/2 -translate-y-1/2 z-[40] pointer-events-none flex flex-col items-center gap-2
            ${mousePos.side === 'left' ? 'left-12' : 'right-12'}`}
        >
          {/* Technical Arrow */}
          <motion.div
            animate={{ x: mousePos.side === 'left' ? [0, 15, 0] : [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-sky-500"
          >
            <svg 
              width="60" 
              height="30" 
              viewBox="0 0 60 30" 
              className={mousePos.side === 'right' ? 'rotate-180' : ''}
            >
              <path 
                d="M50 15L10 15M50 15L40 5M50 15L40 25" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
              />
              <rect x="0" y="14" width="5" height="2" fill="currentColor" opacity="0.5" />
            </svg>
          </motion.div>

          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-sky-500/60 font-bold bg-sky-500/5 px-2 py-1 rounded border border-sky-500/10 backdrop-blur-sm">
            {mousePos.side === 'left' ? 'Analyze_Center >>' : '<< Analyze_Center'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuidanceSystem;