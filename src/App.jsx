import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSDATA } from './data';
import NetworkModule from './NetworkModule';
import FloatingBackground from './FloatingBackground';

// --- Terminal Pop-up Component ---
const ConsoleModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: "SACHIN_OS [v4.5.0] - SECURITY_AUDIT_PASSED", type: "sys" },
    { text: "Type 'help' for commands or use the icons below.", type: "sys" }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => { 
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" }); 
  }, [history]);

  const handleCmd = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      let res = "";

      switch(cmd) {
        case 'help': res = "ls, whoami, contact, clear, exit"; break;
        case 'ls': res = "experience/  arsenal/  iso_cert/  contact_me.sh"; break;
        case 'whoami': res = SYSDATA.summary; break;
        case 'contact': res = `Email: ${SYSDATA.email}`; break;
        case 'exit': onClose(); return;
        case 'clear': setHistory([]); setInput(''); return;
        default: res = `Access Denied: Command '${cmd}' not recognized.`;
      }
      setHistory([...history, { text: `$ ${input}`, type: "cmd" }, { text: res, type: "res" }]);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        className="w-full max-w-2xl bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-[11px]"
      >
        <div className="bg-slate-900 px-5 py-3 flex justify-between items-center border-b border-slate-800">
          <div className="flex gap-4 items-center">
            <span className="text-slate-500 font-bold uppercase text-[9px]">Root@Sachin: ~</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={SYSDATA.linkedin} target="_blank" rel="noreferrer" className="text-sky-500 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="text-[9px] font-bold uppercase">LinkedIn</span>
            </a>
            <a href={`mailto:${SYSDATA.email}`} className="text-sky-500 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span className="text-[9px] font-bold uppercase">Write_Email</span>
            </a>
            <button onClick={onClose} className="text-slate-500 hover:text-red-400 font-bold uppercase text-[9px]"> [ X ] </button>
          </div>
        </div>
        <div className="h-80 p-8 overflow-y-auto custom-scrollbar text-left bg-black/40">
          {history.map((h, i) => (
            <div key={i} className={`mb-2 ${h.type === 'cmd' ? 'text-white font-bold' : 'text-sky-400 opacity-80'}`}>
              {h.text}
            </div>
          ))}
          <div className="flex gap-2 text-white">
            <span>$</span>
            <input className="bg-transparent outline-none flex-1 text-white" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCmd} autoFocus spellCheck="false" />
          </div>
          <div ref={scrollRef} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Physical Switch Component ---
const PhysicalSwitch = ({ isDark, onToggle }) => (
  <div onClick={onToggle} className={`relative w-10 h-16 rounded-xl cursor-pointer transition-all border-2 flex flex-col items-center justify-between p-1 ${isDark ? 'bg-slate-800 border-slate-700 shadow-inner' : 'bg-slate-200 border-slate-300 shadow-lg'}`}>
    <motion.div animate={{ y: isDark ? 24 : 0 }} className={`w-6 h-6 rounded-lg ${isDark ? 'bg-slate-900 border-t border-slate-700' : 'bg-white border-b border-slate-100'}`} />
  </div>
);

// --- Main App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isConsoleOpen, setConsoleOpen] = useState(false);

  return (
    <div className={`relative min-h-screen transition-colors duration-700 ${isDark ? 'bg-[#0f172a] text-slate-300' : 'bg-[#f8fafc] text-slate-600'}`}>
      
      {/* BACKGROUND LAYER 0: Interactive IT Equipment */}
      <FloatingBackground />

      {/* BACKGROUND LAYER 1: Blueprint Grid Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.04] z-[1]" 
        style={{ 
          backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', 
          backgroundSize: '60px 60px',
          pointerEvents: 'none' // CRITICAL
        }} 
      />
      {/* FOREGROUND LAYER 10: Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center backdrop-blur-md border-b border-black/5">
        <h2 className={`font-mono text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {SYSDATA.name} // SYS_ADMIN
        </h2>
        <div className="flex items-center gap-8">
          <button onClick={() => setConsoleOpen(true)} className="font-mono text-[10px] text-sky-500 hover:text-sky-400 border-b border-sky-500/30 tracking-widest uppercase font-bold">Connect_To_Console</button>
          <PhysicalSwitch isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </nav>

      {/* FOREGROUND LAYER 10: Main Content */}
      <nav className="fixed top-0 w-full z-50 ...">...</nav>
      <main className="max-w-4xl mx-auto ... relative z-10">...</main>
      <main className="max-w-4xl mx-auto px-6 pt-48 pb-32 relative z-10 text-left">
        <section className="mb-48">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sky-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-6 font-bold underline underline-offset-8 decoration-sky-500/20">
            Infrastructure_Manifesto
          </motion.p>
          <h1 className={`text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.95] mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {SYSDATA.quote} [cite: 1]
          </h1>

          {/* Draggable Network Diagnostic Module */}
          <div className="max-w-2xl mt-12 mb-20 relative z-20">
            <NetworkModule isDark={isDark} />
          </div>

          <p className="max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed font-medium">
            {SYSDATA.summary} [cite: 4, 19]
          </p>
        </section>

        {/* Professional Experience Section */}
        <section className="space-y-40">
          <h2 className="font-mono text-[10px] tracking-[0.6em] uppercase text-sky-500 font-bold mb-12">// Tenure_Logs</h2>
          {SYSDATA.experience.map((job, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="border-l-2 border-sky-500/20 pl-12 relative group hover:border-sky-500 transition-colors duration-500"
            >
              <div className="absolute w-3 h-3 bg-sky-500 rounded-full -left-[7.5px] top-1 group-hover:shadow-[0_0_20px_#38bdf8] transition-all duration-300" />
              <h3 className={`font-bold text-4xl uppercase tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {job.company}
              </h3>
              <p className="text-sky-500 font-mono text-[11px] mb-10 font-bold uppercase tracking-widest">
                {job.role} <span className="text-slate-500 mx-2">//</span> {job.period}
              </p>
              <ul className="text-[15px] space-y-6 opacity-80">
                {job.logs.map((log, j) => (
                  <li key={j} className="flex gap-4 items-start leading-relaxed text-left"> 
                    <span className="text-sky-500 font-mono text-[10px] mt-1">0{j+1}</span> 
                    <span>{log}</span> 
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>
      </main>

      {/* OVERLAY LAYER 100: Console Modal */}
      <AnimatePresence>
        {isConsoleOpen && <ConsoleModal isOpen={isConsoleOpen} onClose={() => setConsoleOpen(false)} />}
      </AnimatePresence>

      {/* Footer Section */}
      <footer className={`py-20 border-t relative z-10 ${isDark ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center opacity-40 font-mono text-[9px] uppercase tracking-[0.6em]">
          <span>© 2026 Sachin Pandey [cite: 1]</span>
          <span>Security_Compliant // ISO_27001 [cite: 25]</span>
        </div>
      </footer>
    </div>
  );
}