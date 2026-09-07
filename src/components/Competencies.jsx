import { COMPETENCIES } from '../data';
import Reveal from './Reveal';

/**
 * The eight areas of ownership, as a dense band directly under the hero —
 * the "what I actually do" answer before a reader commits to scrolling.
 */
export default function Competencies() {
  return (
    <section className="relative px-5 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 pb-8">
            <span className="eyebrow text-faint">Core competencies</span>
            <span className="rule-fade h-px flex-1" />
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {COMPETENCIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="group h-full bg-panel p-5 transition-colors duration-300 hover:bg-panel-2">
                <span className="font-mono text-[0.625rem] font-bold text-brand tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[0.9375rem] leading-snug font-semibold tracking-tight text-title">
                  {c.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-faint transition-colors group-hover:text-body">
                  {c.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
