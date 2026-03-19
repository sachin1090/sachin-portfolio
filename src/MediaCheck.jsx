import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaCheck = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const [status, setStatus] = useState('idle');
  const videoRef = useRef(null);
  const analyser = useRef(null);

  const startTest = async () => {
    setStatus('testing');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(mediaStream);
      source.connect(analyser.current);
      
      const checkMic = () => {
        if (!analyser.current) return;
        const data = new Uint8Array(analyser.current.frequencyBinCount);
        analyser.current.getByteFrequencyData(data);
        setMicLevel(data.reduce((a, b) => a + b) / data.length);
        requestAnimationFrame(checkMic);
      };
      checkMic();
      setTimeout(() => setStatus('ready'), 2000);
    } catch (e) { setStatus('error'); }
  };

  const stopTest = () => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    setStatus('idle');
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[60] flex items-center">
      {/* Small Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-32 rounded-full border flex flex-col items-center justify-center gap-4 transition-all
        ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}
        ${isOpen ? 'translate-x-[-10px] opacity-0' : 'opacity-100'}`}
      >
        <span className="font-mono text-[8px] rotate-90 uppercase tracking-[0.3em] whitespace-nowrap text-sky-500 font-bold">Hardware_Check</span>
        <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
      </button>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: -100, opacity: 0 }}
            className={`w-64 p-5 rounded-2xl border backdrop-blur-md shadow-2xl ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[9px] text-sky-500 font-bold uppercase tracking-widest">// Media_Vault</span>
              <button onClick={() => { stopTest(); setIsOpen(false); }} className="text-[10px] opacity-50 hover:opacity-100 font-bold"> [X] </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 relative">
                {stream ? <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" /> : 
                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono opacity-20 uppercase">Feed_Offline</div>}
              </div>

              <div className="space-y-2">
                <p className="text-[8px] uppercase font-bold opacity-40">Microphone_Gain</p>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${Math.min(micLevel * 3, 100)}%` }} className="h-full bg-sky-500" />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={status === 'idle' ? startTest : stopTest}
                  className={`w-full py-2 rounded-lg font-mono text-[9px] font-bold uppercase tracking-widest transition-all
                  ${status === 'testing' ? 'bg-slate-800 animate-pulse' : 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'}`}
                >
                  {status === 'idle' ? 'Check Devices' : 'Stop Check'}
                </button>
              </div>
              
              {status === 'ready' && (
                <p className="text-[8px] font-mono text-green-400 text-center uppercase font-bold tracking-tighter">
                  {micLevel > 10 ? "Ready for Meeting: 10/10 Clarity" : "Low Gain Detected: Check Mic"}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaCheck;