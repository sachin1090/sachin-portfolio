import { motion } from 'framer-motion';

/** Scroll-triggered fade-up. Fires once, and stays put when motion is reduced. */
export default function Reveal({ children, delay = 0, y = 22, className = '', as = 'div' }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
