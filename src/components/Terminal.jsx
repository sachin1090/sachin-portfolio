import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS, EXPERIENCE, PROFILE, TOOLKIT } from '../data';
import { IconClose } from './Icons';

const BANNER = [
  { type: 'sys', text: `${PROFILE.name.toUpperCase()} // console v2.0` },
  { type: 'sys', text: "Type 'help' to list commands. Esc closes." },
];

function buildCommands({ close, toggleTheme }) {
  return {
    help: () => [
      'Available commands:',
      '  whoami      profile summary',
      '  certs       ISO standards implemented',
      '  exp         career history',
      '  skills      toolkit by domain',
      '  contact     how to reach me',
      '  uptime      years in the field',
      '  theme       toggle light / dark',
      '  clear       wipe the buffer',
      '  exit        close the console',
    ],

    whoami: () => [`${PROFILE.name} — ${PROFILE.role}`, PROFILE.location, '', PROFILE.summary],

    certs: () => [
      `${CERTIFICATIONS.length} management-system standards implemented:`,
      ...CERTIFICATIONS.map((c) => `  ${c.code.padEnd(15)} ${c.edition}   ${c.title}`),
    ],

    exp: () =>
      EXPERIENCE.flatMap((job) => [`${job.period}  ${job.company}`, `  └─ ${job.role}`]),

    skills: () => TOOLKIT.flatMap((g) => [`${g.group}:`, `  ${g.items.join(', ')}`]),

    contact: () => [`email     ${PROFILE.email}`, `linkedin  ${PROFILE.linkedin}`],

    uptime: () => ['up 8+ years, 0 unplanned career outages, load average: healthy'],

    theme: () => {
      toggleTheme();
      return ['Theme toggled.'];
    },

    ls: () => ['certs/  exp/  skills/  contact.txt  README.md'],

    sudo: () => ['Nice try. This session is already running with the right privileges.'],

    exit: () => {
      close();
      return null;
    },
  };
}

export default function Terminal({ open, onClose, onToggleTheme }) {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState(BANNER);
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);

  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const commands = buildCommands({ close: onClose, toggleTheme: onToggleTheme });

  const submit = () => {
    const raw = input.trim();
    if (!raw) return;

    setHistory((h) => [raw, ...h]);
    setCursor(-1);
    setInput('');

    if (raw.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }

    const handler = commands[raw.toLowerCase()];
    const output = handler
      ? handler()
      : [`command not found: ${raw}`, "Type 'help' for the list."];

    setLines((prev) => [
      ...prev,
      { type: 'cmd', text: raw },
      ...(output ?? []).map((text) => ({ type: 'out', text })),
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit();
      return;
    }
    // Up / Down walk previously entered commands.
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) {
        setCursor(next);
        setInput(history[next]);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setInput(next >= 0 ? history[next] : '');
    }
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive console"
    >
      <motion.div
        initial={{ scale: 0.97, y: 14 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 14 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-edge bg-panel shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-edge bg-panel-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
              sachin@infra: ~
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-6 w-6 place-items-center rounded text-faint transition-colors hover:text-title"
            aria-label="Close console"
          >
            <IconClose width={14} height={14} />
          </button>
        </div>

        {/* Buffer — clicking anywhere returns focus to the prompt */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="h-[22rem] w-full cursor-text overflow-y-auto p-5 text-left font-mono text-[0.75rem] leading-[1.65]"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.type === 'cmd'
                  ? 'mt-3 font-semibold text-title'
                  : line.type === 'sys'
                    ? 'text-brand'
                    : 'text-body'
              }
            >
              {line.type === 'cmd' && <span className="mr-2 text-brand">$</span>}
              <span className="whitespace-pre-wrap">{line.text}</span>
            </div>
          ))}

          <div className="mt-3 flex items-center gap-2 text-title">
            <span className="text-brand">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck="false"
              autoComplete="off"
              aria-label="Console input"
              className="flex-1 bg-transparent font-mono caret-brand outline-none"
            />
          </div>

          <div ref={endRef} />
        </div>
      </motion.div>
    </motion.div>
  );
}
