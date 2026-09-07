import { useCallback, useState } from 'react';
import { PROFILE } from '../data';
import { IconArrow, IconCheck, IconCopy, IconLinkedIn, IconMail, IconPhone } from './Icons';
import Reveal from './Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }, []);

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="surface relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20">
            {/* Soft brand wash behind the CTA */}
            <div
              className="pointer-events-none absolute inset-x-0 -top-40 h-80 blur-[100px]"
              style={{ background: 'var(--glow-a)' }}
              aria-hidden="true"
            />

            <div className="relative">
              <p className="eyebrow text-brand">Contact</p>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl leading-[1.12] font-semibold tracking-tight text-title sm:text-5xl">
                Need infrastructure that holds up to an audit?
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body">
                Happy to talk about infrastructure ownership, ISMS implementation, or getting an
                organisation audit-ready. Fastest route is email.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-title px-7 py-4 text-sm font-semibold text-canvas transition-opacity hover:opacity-90 sm:w-auto"
                >
                  <IconMail width={15} height={15} />
                  {PROFILE.email}
                  <IconArrow
                    width={15}
                    height={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-edge bg-panel px-6 py-4 text-sm font-semibold text-title transition-colors hover:border-edge-strong sm:w-auto"
                >
                  {copied ? (
                    <IconCheck width={15} height={15} className="text-good" />
                  ) : (
                    <IconCopy width={15} height={15} />
                  )}
                  {copied ? 'Copied' : 'Copy address'}
                </button>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                <a
                  href={PROFILE.phoneHref}
                  className="link-underline inline-flex items-center gap-2 font-mono text-sm font-medium text-faint transition-colors hover:text-title"
                >
                  <IconPhone width={14} height={14} />
                  {PROFILE.phone}
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-2 text-sm font-medium text-faint transition-colors hover:text-title"
                >
                  <IconLinkedIn width={14} height={14} />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
