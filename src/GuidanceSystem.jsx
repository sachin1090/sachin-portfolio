import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuidanceSystem = () => {
  const [mousePos, setMousePos] = useState({ side: null });

  useEffect(() => {
    const handleMove = (e) => {
      const width = window.innerWidth;
      const x = e.clientX;
      
      // Increased threshold to 30% for easier testing
      if (x < width * 0.3) {
        setMousePos({ side: 'left' });
      } else if (x > width * 0.7) {
        setMousePos({ side: 'right' });
      } else {
        setMousePos({ side: null });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <AnimatePresence>
      {mousePos.side && (
        <motion.div
          key={mousePos.side}
          initial={{ opacity: 0, x: mousePos.side === 'left' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mousePos.side === 'left' ? -50 : 50 }}
          className={`fixed top-1/2 -translate-y-1/2 z-[999] pointer-events-none flex flex-col items-center gap-4
            ${mousePos.side === 'left' ? 'left-10' : 'right-10'}`}
        >
          {/* HUD Arrow */}
          <motion.div
            animate={{ x: mousePos.side === 'left' ? [0, 20, 0] : [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="text-sky-500 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          >
            <svg 
              width="80" 
              height="40" 
              viewBox="0 0 60 30" 
              style={{ transform: mousePos.side === 'right' ? 'rotate(180deg)' : 'none' }}
            >
              <path 
                d="M50 15L10 15M50 15L40 5M50 15L40 25" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-sky-400 font-bold">
              {mousePos.side === 'left' ? 'DETECT_CENTER_LOGS' : 'RETURN_TO_CORE'}
            </span>
            <div className="w-full h-[1px] bg-sky-500/30 mt-1" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuidanceSystem;