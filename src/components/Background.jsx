import { useEffect, useRef } from 'react';

/**
 * Ambient layer: blueprint grid + two slow gradient washes + a sparse
 * node/link constellation on canvas. Everything is decorative and
 * pointer-transparent; the canvas skips entirely under reduced motion.
 */
export default function Background({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (reduced || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let frame;
    let nodes = [];
    let width = 0;
    let height = 0;

    // Read the themed node colour once per theme change.
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--net').trim() || '148, 190, 240';

    const LINK_DISTANCE = 150;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport area, capped so laptops stay cool.
      const count = Math.min(64, Math.round((width * height) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Gentle drift away from the cursor.
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 20000 && d2 > 0.01) {
          const push = (1 - Math.sqrt(d2) / 141) * 0.6;
          n.x += (dx / Math.sqrt(d2)) * push;
          n.y += (dy / Math.sqrt(d2)) * push;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / LINK_DISTANCE) * 0.13})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(${rgb}, 0.32)`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const onPointer = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    draw();
    window.addEventListener('resize', build);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', build);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Blueprint grid, masked so it fades toward the bottom of the viewport */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 120% 85% at 50% 0%, #000 35%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 120% 85% at 50% 0%, #000 35%, transparent 78%)',
        }}
      />

      {/* Slow colour washes */}
      <div
        className="animate-drift absolute -top-[22rem] -left-[16rem] h-[46rem] w-[46rem] rounded-full blur-[130px]"
        style={{ background: 'var(--glow-a)' }}
      />
      <div
        className="animate-drift absolute -top-[10rem] -right-[20rem] h-[42rem] w-[42rem] rounded-full blur-[140px]"
        style={{ background: 'var(--glow-b)', animationDelay: '-13s' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
