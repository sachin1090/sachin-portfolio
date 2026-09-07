import { motion } from 'framer-motion';
import { CERTIFICATIONS, PROFILE, STATS } from '../data';
import { IconArrow, IconDownload, IconLinkedIn, IconMail, IconShield } from './Icons';
import LatencyProbe from './LatencyProbe';

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative px-5 pt-32 pb-20 sm:px-8 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        {/* ---- Left: the pitch ---- */}
        <div>
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-panel px-3.5 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-good" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-good" />
            </span>
            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-body">
              {PROFILE.location} · Open to conversations
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 text-[2.75rem] leading-[1.04] font-semibold tracking-[-0.03em] text-title sm:text-6xl lg:text-[4.25rem]"
          >
            {PROFILE.name}
            <span className="mt-2 block text-gradient">{PROFILE.role}</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-xl text-base leading-relaxed text-body sm:text-lg"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.figure
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 border-l-2 border-brand/40 pl-5"
          >
            <blockquote className="text-lg font-medium tracking-tight text-title italic sm:text-xl">
              “{PROFILE.quote}”
            </blockquote>
          </motion.figure>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-title px-6 py-3.5 text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
            >
              <IconMail width={15} height={15} />
              Get in touch
              <IconArrow
                width={15}
                height={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={PROFILE.resume}
              download
              className="inline-flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-6 py-3.5 text-sm font-semibold text-title transition-colors hover:border-edge-strong"
            >
              <IconDownload width={15} height={15} />
              Download CV
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-6 py-3.5 text-sm font-semibold text-title transition-colors hover:border-edge-strong"
            >
              <IconLinkedIn width={15} height={15} />
              LinkedIn
            </a>
          </motion.div>

          <motion.dl
            variants={rise}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-8 border-t border-edge pt-9 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-3xl font-semibold tracking-tight text-title tabular-nums">
                  {stat.value}
                </dd>
                <p className="mt-2 text-[0.6875rem] leading-snug uppercase tracking-[0.1em] text-faint">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- Right: compliance panel ---- */}
        <motion.aside
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
          className="surface relative overflow-hidden rounded-3xl p-6 sm:p-7"
        >
          <div className="flex items-center justify-between gap-3 border-b border-edge pb-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/12 text-brand">
                <IconShield width={15} height={15} />
              </span>
              <div>
                <p className="text-[0.8125rem] font-semibold text-title">Compliance coverage</p>
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-faint">
                  Management systems implemented
                </p>
              </div>
            </div>
            <span className="font-mono text-2xl font-semibold text-brand tabular-nums">
              {CERTIFICATIONS.length}
            </span>
          </div>

          <ul className="divide-y divide-edge">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.li
                key={cert.code}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.45 }}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="font-mono text-[0.75rem] font-semibold text-title">{cert.code}</span>
                <span className="flex-1 truncate text-right text-[0.75rem] text-faint">
                  {cert.family}
                </span>
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-good/15 text-good">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m4 12.5 5 5L20 6.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6">
            <LatencyProbe />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
