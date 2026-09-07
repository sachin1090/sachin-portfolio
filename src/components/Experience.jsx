import { EXPERIENCE } from '../data';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Track record"
          title="Where the systems ran"
          description="Eight years of owning infrastructure across software, logistics, and manufacturing — each role broader in scope than the last."
        />

        <ol className="relative">
          {/* Spine */}
          <span
            className="absolute top-2 bottom-2 left-[7px] w-px bg-edge md:left-[calc(11rem_+_7px)]"
            aria-hidden="true"
          />

          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08} as="li">
              <div
                className={`relative grid gap-6 pl-9 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0 ${
                  i === EXPERIENCE.length - 1 ? 'pb-0' : 'pb-16'
                }`}
              >
                {/* Period rail */}
                <div className="md:pt-1 md:text-right">
                  <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-body">
                    {job.period}
                  </p>
                  {job.current && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-good/12 px-2 py-0.5 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-good">
                      <span className="h-1 w-1 rounded-full bg-good" />
                      Current
                    </span>
                  )}
                </div>

                {/* Node */}
                <span
                  className="absolute top-1.5 left-0 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-canvas bg-brand md:left-[11rem]"
                  aria-hidden="true"
                >
                  <span className="h-1 w-1 rounded-full bg-canvas" />
                </span>

                <div className="md:pl-6">
                  <h3 className="text-2xl font-semibold tracking-tight text-title sm:text-[1.75rem]">
                    {job.company}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-brand">{job.role}</p>
                  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-body">
                    {job.blurb}
                  </p>

                  <ul className="mt-6 space-y-3.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3.5">
                        <span
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-brand/70"
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-body">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {job.stack.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-edge bg-panel px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
