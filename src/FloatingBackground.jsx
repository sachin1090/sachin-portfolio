import React from 'react';
import { motion } from 'framer-motion';

const IT_EQUIPMENT = [
  { icon: "☁️", label: "GCP_Cloud" },
  { icon: "🖥️", label: "Proxmox_Node" },
  { icon: "🛡️", label: "ISO_27001" },
  { icon: "🔌", label: "Cisco_Link" },
  { icon: "💾", label: "Backup_Storage" },
  { icon: "🔒", label: "Sophos_Firewall" },
  { icon: "🚀", label: "Automation_Script" },
  { icon: "📦", label: "Container" },
];

const FloatingItem = ({ item }) => {
  const randomX = Math.random() * 80 + 10; 
  const randomY = Math.random() * 80 + 10;
  const duration = 25 + Math.random() * 20;

  return (
    <motion.div
      drag
      dragMomentum={true}
      whileDrag={{ scale: 1.4, zIndex: 999 }}
      initial={{ left: `${randomX}%`, top: `${randomY}%` }}
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -60, 60, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ 
        position: 'absolute', 
        zIndex: 10,
        pointerEvents: 'auto' // CRITICAL: Makes icon clickable
      }}
      className="cursor-grab active:cursor-grabbing select-none p-4 group"
    >
      <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity duration-300">
        <span className="text-4xl drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
          {item.icon}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-tighter text-sky-400 bg-black/60 px-2 py-0.5 rounded border border-sky-500/20">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
};

const FloatingBackground = () => {
  return (
    <div 
      className="fixed inset-0 overflow-hidden z-0"
      style={{ pointerEvents: 'none' }} // CRITICAL: Allows clicks to pass to content
    >
      <div className="relative w-full h-full">
        {[...IT_EQUIPMENT, ...IT_EQUIPMENT].map((item, index) => (
          <FloatingItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FloatingBackground;