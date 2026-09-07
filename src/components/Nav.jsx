import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { NAV_LINKS, PROFILE } from '../data';
import { IconClose, IconMenu, IconMoon, IconSun, IconTerminal } from './Icons';

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative flex h-9 w-[3.75rem] items-center rounded-full border border-edge bg-panel-2 px-1 transition-colors hover:border-edge-strong"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-panel text-brand shadow-sm"
        style={{ marginLeft: isDark ? '1.5rem' : 0 }}
      >
        {isDark ? <IconMoon width={13} height={13} /> : <IconSun width={13} height={13} />}
      </motion.span>
    </button>
  );
}

export default function Nav({ isDark, onToggleTheme, onOpenConsole }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section occupying the upper third of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-edge bg-canvas/80 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/65'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-edge bg-panel font-mono text-[11px] font-bold tracking-tight text-brand transition-colors group-hover:border-brand/50">
              {PROFILE.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[0.8125rem] font-semibold text-title">{PROFILE.name}</span>
              <span className="block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
                {PROFILE.role}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative rounded-md px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
                  active === link.id ? 'text-title' : 'text-faint hover:text-title'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-brand"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenConsole}
              className="hidden items-center gap-2 rounded-full border border-edge bg-panel px-3.5 py-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-body transition-colors hover:border-brand/50 hover:text-brand sm:flex"
              title="Open terminal (Ctrl + `)"
            >
              <IconTerminal width={13} height={13} />
              Console
            </button>

            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-edge bg-panel text-title md:hidden"
              aria-label="Open menu"
            >
              <IconMenu width={17} height={17} />
            </button>
          </div>
        </nav>
      </div>

      {/* Reading progress */}
      <motion.div
        style={{
          scaleX: progress,
          background: 'linear-gradient(to right, var(--brand), var(--brand-2))',
        }}
        className="h-px origin-left"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-[4.5rem] items-center justify-end px-5">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-edge bg-panel text-title"
                aria-label="Close menu"
              >
                <IconClose width={17} height={17} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-5 pt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                  className="border-b border-edge py-5 text-2xl font-semibold tracking-tight text-title"
                >
                  <span className="mr-3 font-mono text-xs text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </motion.a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenConsole();
                }}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-edge bg-panel py-4 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand"
              >
                <IconTerminal width={14} height={14} />
                Open console
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
