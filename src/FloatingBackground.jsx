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
  const randomX = Math.random() * 85; 
  const randomY = Math.random() * 85;
  const duration = 20 + Math.random() * 25;

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.4, zIndex: 40 }}
      initial={{ left: `${randomX}%`, top: `${randomY}%` }}
      animate={{
        x: [0, 40, -40, 0],
        y: [0, -50, 50, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ position: 'absolute', zIndex: 10 }}
      className="cursor-grab active:cursor-grabbing select-none p-4 group"
    >
      <div className="flex flex-col items-center gap-1 opacity-25 hover:opacity-100 transition-opacity duration-500">
        <span className="text-4xl drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
          {item.icon}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-tighter text-sky-500 bg-black/40 px-1 rounded">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
};

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="relative w-full h-full pointer-events-auto">
        {[...IT_EQUIPMENT, ...IT_EQUIPMENT].map((item, index) => (
          <FloatingItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FloatingBackground;