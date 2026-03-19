import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaCheck = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [timeLeft, setTimeLeft] = useState(8);
  
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const analyser = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) videoRef.current.srcObject = stream;
  }, [stream, isOpen]);

  const initHardware = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      const ctx = new AudioContext();
      analyser.current = ctx.createAnalyser();
      ctx.createMediaStreamSource(s).connect(analyser.current);
      const updateMic = () => {
        if (!analyser.current) return;
        const data = new Uint8Array(analyser.current.frequencyBinCount);
        analyser.current.getByteFrequencyData(data);
        setMicLevel(data.reduce((a, b) => a + b) / data.length);
        requestAnimationFrame(updateMic);
      };
      updateMic();
    } catch (e) { alert("Access Denied: Check Browser Permissions"); }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeLeft(8);
    audioChunks.current = [];
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
      setAudioUrl(URL.createObjectURL(blob));
    };
    mediaRecorder.current.start();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const clearVolatileData = () => {
    setAudioUrl(null);
    audioChunks.current = [];
  };

  const terminate = () => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    clearVolatileData();
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-stretch">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className={`p-2 rounded-r-lg border border-l-0 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xl'}`}>
          <span className="font-mono text-[9px] [writing-mode:vertical-lr] uppercase tracking-widest text-sky-500 font-bold">Hardware_Console</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }} className={`w-80 p-6 rounded-r-2xl border-y border-r shadow-2xl ${isDark ? 'bg-[#020617] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[10px] text-sky-500 font-bold tracking-widest">// COMMS_AUDIT</span>
              <button onClick={() => { terminate(); setIsOpen(false); }} className="text-[10px] opacity-50 hover:opacity-100 font-bold"> [EXIT] </button>
            </div>

            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 relative">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                {!stream && <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono opacity-20">SYSTEM_OFFLINE</div>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-mono uppercase opacity-50"><span>Input_Level</span><span>{Math.round(micLevel)}%</span></div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${Math.min(micLevel * 3, 100)}%` }} className="h-full bg-sky-500" />
                </div>
              </div>

              <div className="grid gap-3">
                {!stream ? (
                  <button onClick={initHardware} className="py-3 bg-sky-500 text-white font-mono text-[9px] font-bold uppercase rounded-lg">Initialize_Hardware</button>
                ) : (
                  <>
                    {!audioUrl ? (
                      <button onClick={startRecording} disabled={isRecording} className={`py-3 font-mono text-[9px] font-bold uppercase rounded-lg ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-white'}`}>
                        {isRecording ? `Recording... ${timeLeft}s` : 'Test Mic (8s Loop)'}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <audio controls src={audioUrl} className="w-full h-8" />
                        <button onClick={clearVolatileData} className="w-full py-2 bg-red-500/10 text-red-500 font-mono text-[8px] font-bold uppercase border border-red-500/20 rounded-lg">Wipe_Buffer</button>
                      </div>
                    )}
                  </>
                )}
              </div>

              <p className="text-[7px] font-mono opacity-30 leading-tight uppercase">Privacy_Note: All audio data is stored in volatile RAM and destroyed upon session termination or manual wipe.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaCheck;