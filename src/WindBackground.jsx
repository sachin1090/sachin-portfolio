import React, { useEffect, useRef } from 'react';

const WindBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const icons = ["☁️", "🛡️", "🔒", "📡", "📦", "💾", "🚀"];
    const particleCount = 150; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(isIcon = false) {
        this.isIcon = isIcon;
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = this.isIcon ? 18 : Math.random() * 1.5 + 0.5;
        this.content = this.isIcon ? icons[Math.floor(Math.random() * icons.length)] : "·";
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.opacity = this.isIcon ? 0.15 : 0.3;
      }

      update(mouse) {
        // Sandspiel Wind Field logic
        const wind = Math.sin(Date.now() * 0.0005) * 1.2;
        this.x += this.speedX + wind;
        this.y += this.speedY;

        // Mouse Push
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx / 15;
          this.y -= dy / 15;
        }

        if (this.y > canvas.height) this.y = -10;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.content, this.x, this.y);
      }
    }

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle(i % 12 === 0));
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(mouse); p.draw(); });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize(); init(); render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default WindBackground;