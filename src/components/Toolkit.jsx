import { PLATFORMS, TOOLKIT } from '../data';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Toolkit() {
  return (
    <section id="toolkit" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title="What I run day to day"
          description="The stack behind the uptime — grouped the way the work actually splits."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {TOOLKIT.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05}>
              <div className="h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2 sm:p-7">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[0.625rem] font-bold text-brand tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[0.9375rem] font-semibold tracking-tight text-title">
                    {group.group}
                  </h3>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[0.875rem] text-body">
                      <span className="h-px w-3 shrink-0 bg-brand/50" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Named products, kept separate from the capability groups above */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <div className="flex items-center gap-3 pb-6">
              <span className="eyebrow text-faint">Platforms</span>
              <span className="rule-fade h-px flex-1" />
            </div>
            <ul className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-edge bg-panel px-3.5 py-1.5 text-[0.8125rem] font-medium text-body transition-colors hover:border-edge-strong hover:text-title"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
