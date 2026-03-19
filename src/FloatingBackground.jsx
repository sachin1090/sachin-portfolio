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
  // Random starting positions and floating speeds
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const duration = 15 + Math.random() * 20;

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.5, zIndex: 50 }}
      initial={{ x: `${randomX}vw`, y: `${randomY}vh` }}
      animate={{
        x: [`${randomX}vw`, `${(randomX + 10) % 100}vw`, `${randomX}vw`],
        y: [`${randomY}vh`, `${(randomY + 15) % 100}vh`, `${randomY}vh`],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute cursor-grab active:cursor-grabbing select-none p-4 group"
    >
      <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
        <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all drop-shadow-2xl">
          {item.icon}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-tighter text-sky-500 hidden group-hover:block">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
};

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-auto z-0">
      {/* We repeat the items to fill the background space */}
      {[...IT_EQUIPMENT, ...IT_EQUIPMENT].map((item, index) => (
        <FloatingItem key={index} item={item} />
      ))}
    </div>
  );
};

export default FloatingBackground;