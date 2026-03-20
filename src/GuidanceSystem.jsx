import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuidanceSystem = () => {
  const [mousePos, setMousePos] = useState({ side: null });

  useEffect(() => {
    const handleMove = (e) => {
      const width = window.innerWidth;
      const x = e.clientX;
      
      // Detection zones: 30% from each edge
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
    <AnimatePresence mode="wait">
      {mousePos.side && (
        <motion.div
          key={mousePos.side}
          initial={{ opacity: 0, x: mousePos.side === 'left' ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mousePos.side === 'left' ? -40 : 40 }}
          className={`fixed top-1/2 -translate-y-1/2 z-[999] pointer-events-none flex flex-col items-center gap-4
            ${mousePos.side === 'left' ? 'left-10' : 'right-10'}`}
        >
          {/* Technical Guidance Arrow */}
          <motion.div
            animate={{ x: mousePos.side === 'left' ? [0, 15, 0] : [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="text-sky-500 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
          >
            <svg 
              width="70" 
              height="35" 
              viewBox="0 0 60 30" 
              // If on left, arrow points right. If on right, arrow points left.
              style={{ transform: mousePos.side === 'left' ? 'none' : 'rotate(180deg)' }}
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

          {/* Dynamic Plane Labels */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-sky-400 font-bold px-3 py-1 bg-black/40 border border-sky-500/20 backdrop-blur-md rounded">
              {mousePos.side === 'left' ? 'LEFT_PLANE' : 'RIGHT_PLANE'}
            </span>
            <div className="flex gap-1">
               <div className="w-1 h-1 bg-sky-500/40 rounded-full animate-ping" />
               <div className="w-1 h-1 bg-sky-500/40 rounded-full" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuidanceSystem;