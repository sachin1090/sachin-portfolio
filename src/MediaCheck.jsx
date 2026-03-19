import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaCheck = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, testing, ready
  
  const videoRef = useRef(null);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const monitorNode = useRef(null);

  // Sync Video Ref with Stream
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isOpen]);

  const startTest = async () => {
    setStatus('testing');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      
      setStream(mediaStream);

      // Audio Engine Setup
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(mediaStream);
      
      // Create a gain node for monitoring (listening back)
      monitorNode.current = audioContext.current.createGain();
      monitorNode.current.gain.value = 0; // Muted by default to prevent feedback
      
      source.connect(analyser.current);
      source.connect(monitorNode.current);
      monitorNode.current.connect(audioContext.current.destination);

      const checkMic = () => {
        if (!analyser.current) return;
        const data = new Uint8Array(analyser.current.frequencyBinCount);
        analyser.current.getByteFrequencyData(data);
        const average = data.reduce((a, b) => a + b) / data.length;
        setMicLevel(average);
        requestAnimationFrame(checkMic);
      };
      checkMic();
      setStatus('ready');
    } catch (e) {
      console.error("Hardware Access Error:", e);
      setStatus('error');
    }
  };

  const toggleMonitor = () => {
    if (monitorNode.current) {
      const newMonitoringState = !isMonitoring;
      setIsMonitoring(newMonitoringState);
      // Warning: Feedback loop possible if speakers are loud!
      monitorNode.current.gain.value = newMonitoringState ? 1 : 0;
    }
  };

  const stopTest = () => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    setIsMonitoring(false);
    setStatus('idle');
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center">
      {/* 1. Straightened Toggle Tab */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className={`px-3 py-10 rounded-r-xl border-y border-r flex flex-col items-center justify-center gap-4 transition-all shadow-2xl
          ${isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'}`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="font-mono text-[9px] [writing-mode:vertical-lr] uppercase tracking-[0.3em] text-sky-500 font-bold">
            Hardware_Vault
          </span>
        </button>
      )}

      {/* 2. Straightened Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: -300, opacity: 0 }}
            className={`w-72 p-6 rounded-r-2xl border-y border-r backdrop-blur-xl shadow-[20px_0_50px_rgba(0,0,0,0.5)] 
            ${isDark ? 'bg-slate-950/95 border-slate-800' : 'bg-white border-slate-200'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[10px] text-sky-500 font-bold uppercase tracking-widest">// SYS_CHECK_v2.0</span>
              <button onClick={() => { stopTest(); setIsOpen(false); }} className="text-[12px] text-red-500 font-bold hover:scale-110 transition-transform"> [CLOSE] </button>
            </div>

            <div className="space-y-5">
              {/* Camera Preview Box */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 relative shadow-inner">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted // Always mute the video tag to prevent double-audio
                  className={`w-full h-full object-cover transition-opacity duration-500 ${stream ? 'opacity-100' : 'opacity-0'}`} 
                />
                {!stream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                    <span className="text-[8px] font-mono opacity-30 uppercase tracking-tighter">Camera_Offline</span>
                  </div>
                )}
              </div>

              {/* Microphone Logic */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[8px] uppercase font-bold opacity-40">Mic_Input_Gain</p>
                  <p className="text-[8px] font-mono text-sky-400 font-bold">{Math.round(micLevel)}%</p>
                </div>
                <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    animate={{ width: `${Math.min(micLevel * 3, 100)}%` }} 
                    className={`h-full ${micLevel > 5 ? 'bg-sky-500' : 'bg-slate-600'}`} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-3">
                <button 
                  onClick={status === 'idle' ? startTest : stopTest}
                  className={`w-full py-3 rounded-lg font-mono text-[9px] font-bold uppercase tracking-widest transition-all
                  ${status === 'testing' ? 'bg-slate-800 animate-pulse' : 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400'}`}
                >
                  {status === 'idle' ? 'Initialize_Hardware' : 'Terminate_Session'}
                </button>

                {stream && (
                  <button 
                    onClick={toggleMonitor}
                    className={`w-full py-2 rounded-lg font-mono text-[8px] font-bold uppercase border transition-all
                    ${isMonitoring ? 'bg-green-500/10 border-green-500 text-green-500' : 'border-slate-700 text-slate-500 hover:border-sky-500'}`}
                  >
                    {isMonitoring ? '● Monitoring_Audio (Listen_Mode)' : '○ Enable_Loopback (Hear_Self)'}
                  </button>
                )}
              </div>
              
              {status === 'ready' && (
                <div className="p-3 bg-sky-500/5 rounded border border-sky-500/10">
                  <p className="text-[8px] font-mono text-sky-400 text-center uppercase font-bold tracking-tighter leading-tight">
                    {micLevel > 5 ? "Status: Communication Ready" : "Warning: No Audio Detected"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaCheck;