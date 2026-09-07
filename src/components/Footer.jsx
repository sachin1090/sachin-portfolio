import { CERTIFICATIONS, PROFILE } from '../data';

export default function Footer({ onOpenConsole }) {
  return (
    <footer className="relative border-t border-edge px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-title">{PROFILE.name}</p>
          <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
            {PROFILE.discipline}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-3 gap-y-2">
          {CERTIFICATIONS.map((c) => (
            <li
              key={c.code}
              className={`tone-${c.tone} rounded-md border border-edge px-2 py-1 font-mono text-[0.5625rem] font-semibold tracking-[0.08em] uppercase`}
              style={{ color: 'var(--card-tone)' }}
            >
              {c.code}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onOpenConsole}
            className="no-print font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-brand"
          >
            Console
          </button>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
