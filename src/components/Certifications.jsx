import { CERTIFICATIONS } from '../data';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/** Follows the pointer so the card's radial glow tracks the cursor. */
function trackPointer(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

function CertCard({ cert, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <article
        onPointerMove={trackPointer}
        className={`spotlight card-lift tone-${cert.tone} surface group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-[transform,border-color,box-shadow] duration-400 hover:-translate-y-1.5 sm:p-7`}
      >
        {/* Tone rail along the top edge */}
        <span
          className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(to right, transparent, var(--card-tone), transparent)',
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p
              className="font-mono text-[0.9375rem] font-bold tracking-tight"
              style={{ color: 'var(--card-tone)' }}
            >
              {cert.code}
            </p>
            <p className="mt-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">
              Edition {cert.edition} · {cert.family}
            </p>
          </div>

          <span
            className="shrink-0 rounded-md px-2 py-1 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.12em]"
            style={{
              color: 'var(--card-tone)',
              backgroundColor: 'color-mix(in srgb, var(--card-tone) 13%, transparent)',
            }}
          >
            {cert.abbr}
          </span>
        </div>

        <h3 className="relative mt-5 text-lg leading-snug font-semibold tracking-tight text-title">
          {cert.title}
        </h3>

        <p className="relative mt-3 flex-1 text-[0.875rem] leading-relaxed text-body">
          {cert.blurb}
        </p>

        <ul className="relative mt-6 flex flex-wrap gap-1.5 border-t border-edge pt-5">
          {cert.focus.map((f) => (
            <li
              key={f}
              className="rounded-full border border-edge px-2.5 py-1 text-[0.6875rem] font-medium text-faint transition-colors group-hover:text-body"
            >
              {f}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Standards"
          title="Six ISO management systems, implemented end to end"
          description="Not just certificates on a wall — each of these was scoped, risk-assessed, documented, and driven through internal audit and management review."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.code} cert={cert} index={i} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-faint">
            The security family stacks: <span className="text-body">27001</span> sets the
            management system, <span className="text-body">27017</span> extends the controls into
            cloud infrastructure, and <span className="text-body">27018</span> covers personal data
            processed there — with <span className="text-body">42001</span> applying the same
            discipline to AI systems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
