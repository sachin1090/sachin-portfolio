import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HiddenServerGame = ({ isDark }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState(1000);
  const [gameState, setGameState] = useState('searching'); // searching, won
  const audioCtx = useRef(null);
  const gainNode = useRef(null);

  // Initialize game and sound engine
  const startGame = () => {
    // Spawn target away from edges
    const x = Math.random() * (window.innerWidth - 300) + 150;
    const y = Math.random() * (window.innerHeight - 300) + 150;
    setTarget({ x, y });
    setGameState('searching');
    setIsPlaying(true);
    
    // Setup Audio
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNode.current = audioCtx.current.createGain();
    gainNode.current.connect(audioCtx.current.destination);
  };

  const playPing = (dist) => {
    if (!audioCtx.current || gameState === 'won') return;
    const osc = audioCtx.current.createOscillator();
    osc.type = 'sine';
    
    // Frequency shifts up as distance decreases
    const freq = Math.max(150, 1800 - dist * 1.5);
    osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
    
    osc.connect(gainNode.current);
    gainNode.current.gain.setValueAtTime(0.08, audioCtx.current.currentTime);
    gainNode.current.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + 0.08);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.08);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isPlaying || gameState === 'won') return;
      const dx = e.clientX - target.x;
      const dy = e.clientY - target.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      setDistance(d);

      // Win condition: within 35 pixels
      if (d < 35) {
        setGameState('won');
        setIsPlaying(false);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isPlaying, target, gameState]);

  useEffect(() => {
    if (!isPlaying) return;
    // Interval shortens as distance decreases
    const intervalTime = Math.max(80, distance * 0.9);
    const timer = setInterval(() => playPing(distance), intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, distance]);

  const getStatusText = () => {
    if (distance < 80) return "☀️ PLASMA_HOT";
    if (distance < 200) return "🔥 HOTTER";
    if (distance < 400) return "☀️ WARM";
    return "❄️ COLD";
  };

  return (
    <div className="fixed bottom-10 right-10 z-[180]">
      {!isPlaying && gameState !== 'won' && (
        <button 
          onClick={startGame}
          className="bg-sky-500/10 border border-sky-500/40 text-sky-500 px-5 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-sky-500 hover:text-white transition-all shadow-lg"
        >
          [ Start_Ghost_Server_Hunt ]
        </button>
      )}

      {isPlaying && (
        <div className="flex flex-col items-end gap-3">
          <div className="bg-black/90 backdrop-blur-md border border-sky-500/30 p-4 rounded-xl shadow-2xl w-44">
            <p className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-tighter">
              Signal: {getStatusText()}
            </p>
            <div className="w-full h-1.5 bg-slate-800 mt-2.5 rounded-full overflow-hidden border border-white/5">
               <motion.div 
                 animate={{ width: `${Math.max(5, 100 - distance/12)}%` }}
                 className="h-full bg-sky-500"
               />
            </div>
          </div>
          <button onClick={() => setIsPlaying(false)} className="text-[9px] text-red-500 font-mono font-bold hover:text-red-400"> [ ABORT_HUNT ] </button>
        </div>
      )}

      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-xl pointer-events-auto z-[300]"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className={`p-10 rounded-3xl border-2 text-center shadow-2xl max-w-xl ${isDark ? 'bg-slate-950 border-sky-500/50' : 'bg-white border-sky-500'}`}
            >
              {/* Technical Server Image */}
              <div className="aspect-[2/1] bg-black/40 rounded-xl border border-slate-800 mb-8 p-6 flex flex-col justify-center gap-2 font-mono text-sky-500/70 text-[10px] uppercase tracking-widest shadow-inner">
                <div className="flex justify-between border-b border-slate-800 pb-2"><span>[ U_Rack_01 ]</span><span className="text-green-500">● ONLINE</span></div>
                <div className="flex justify-between"><span>Host: Ghost_Serv_v4</span><span>IP: 192.168.10.101</span></div>
                <div className="flex justify-between opacity-40"><span>CPU: 48-Core</span><span>Uptime: 198d</span></div>
              </div>

              {/* Dynamic Dialogue */}
              <h2 className={`text-5xl font-bold mb-4 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-950'}`}>Good, you found the host of this application.</h2>
              
              <div className="w-full h-px bg-sky-500/20 my-6" />

              <p className="font-mono text-sm opacity-90 mb-10 uppercase tracking-widest text-sky-400">
                Since you have found it, can you tell me where my RAM stick is?
              </p>

              <button 
                onClick={() => setGameState('searching')}
                className="bg-sky-500 text-white px-10 py-3.5 rounded-full font-mono font-bold uppercase tracking-widest hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
              >
                [ ACKNOWLEDGE_INCIDENT ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HiddenServerGame;