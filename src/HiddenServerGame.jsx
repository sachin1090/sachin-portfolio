import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HiddenServerGame = ({ isDark }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState(1000);
  const [gameState, setGameState] = useState('searching'); // searching, won
  const audioCtx = useRef(null);
  const oscillator = useRef(null);
  const gainNode = useRef(null);

  // Initialize a random server location
  const startGame = () => {
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = Math.random() * (window.innerHeight - 100) + 50;
    setTarget({ x, y });
    setGameState('searching');
    setIsPlaying(true);
    
    // Setup Audio Context
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNode.current = audioCtx.current.createGain();
    gainNode.current.connect(audioCtx.current.destination);
  };

  const playPing = (dist) => {
    if (!audioCtx.current || gameState === 'won') return;

    // Create a quick "ping" sound
    const osc = audioCtx.current.createOscillator();
    osc.type = 'sine';
    
    // Pitch increases as you get closer (Hotter = Higher Pitch)
    const freq = Math.max(200, 2000 - dist * 2);
    osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
    
    osc.connect(gainNode.current);
    gainNode.current.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gainNode.current.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + 0.1);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isPlaying || gameState === 'won') return;

      const dx = e.clientX - target.x;
      const dy = e.clientY - target.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      setDistance(d);

      // Win condition: within 40 pixels
      if (d < 40) {
        setGameState('won');
        setIsPlaying(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isPlaying, target, gameState]);

  // Handle periodic pings
  useEffect(() => {
    if (!isPlaying) return;

    // Ping interval shortens as you get closer (Hotter = Faster Pings)
    const intervalTime = Math.max(100, distance);
    const timer = setInterval(() => {
      playPing(distance);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, distance]);

  const getStatusText = () => {
    if (distance < 100) return "🔥 SMOKING HOT!!";
    if (distance < 250) return "🔥 HOTTER";
    if (distance < 450) return "☀️ WARM";
    return "❄️ COLD";
  };

  return (
    <div className="fixed bottom-10 right-10 z-[150]">
      {!isPlaying && gameState !== 'won' && (
        <button 
          onClick={startGame}
          className="bg-sky-500/10 border border-sky-500/40 text-sky-500 px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
        >
          [ Start_Ghost_Server_Hunt ]
        </button>
      )}

      {isPlaying && (
        <div className="flex flex-col items-end gap-2">
          <div className="bg-black/80 backdrop-blur-md border border-sky-500/30 p-3 rounded-lg shadow-2xl">
            <p className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-tighter">
              Signal_Strength: {getStatusText()}
            </p>
            <div className="w-32 h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ width: `${Math.max(0, 100 - distance/10)}%` }}
                 className="h-full bg-sky-500"
               />
            </div>
          </div>
          <button onClick={() => setIsPlaying(false)} className="text-[8px] text-red-500 font-mono font-bold">[ ABORT_HUNT ]</button>
        </div>
      )}

      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-sky-500/20 backdrop-blur-lg pointer-events-auto"
          >
            <div className={`p-10 rounded-3xl border-2 text-center shadow-2xl ${isDark ? 'bg-slate-950 border-sky-500' : 'bg-white border-sky-500'}`}>
              <h2 className="text-4xl font-bold text-sky-500 mb-4 tracking-tighter uppercase">CONGRATS! YOU WON.</h2>
              <p className="font-mono text-sm opacity-70 mb-8 uppercase tracking-widest">Ghost Server Successfully Located & Patched.</p>
              <button 
                onClick={() => setGameState('searching')}
                className="bg-sky-500 text-white px-8 py-3 rounded-full font-mono font-bold uppercase tracking-widest"
              >
                Return_To_Console
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HiddenServerGame;