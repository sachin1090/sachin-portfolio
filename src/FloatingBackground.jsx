import React from 'react';
import { motion } from 'framer-motion';

const IT_EQUIPMENT = [
  { icon: "☁️", label: "GCP_Node" },
  { icon: "🛡️", label: "ISO_27001" },
  { icon: "🔒", label: "Encrypted" },
  { icon: "📡", label: "Ping_Active" },
];

const FloatingItem = ({ index }) => {
  const item = IT_EQUIPMENT[index % IT_EQUIPMENT.length];
  const startX = Math.random() * 90 + 5;
  const duration = 30 + Math.random() * 20;

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ top: -50, left: `${startX}%`, opacity: 0 }}
      animate={{ 
        top: ['-5%', '105%'],
        opacity: [0, 0.15, 0.15, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay: index * 5 }}
      style={{ position: 'absolute', pointerEvents: 'auto', zIndex: 1 }}
      className="cursor-grab active:cursor-grabbing select-none p-4"
    >
      <div className="flex flex-col items-center gap-1 grayscale hover:grayscale-0 transition-all">
        <span className="text-2xl opacity-40 group-hover:opacity-100">{item.icon}</span>
        <span className="font-mono text-[7px] uppercase tracking-widest text-sky-500/50">{item.label}</span>
      </div>
    </motion.div>
  );
};

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(6)].map((_, i) => <FloatingItem key={i} index={i} />)}
    </div>
  );
}