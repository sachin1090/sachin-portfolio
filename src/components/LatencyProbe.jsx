import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { IconPulse } from './Icons';

const ENDPOINT = 'https://1.1.1.1/cdn-cgi/trace';
const SAMPLES = 6;

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function grade(ms) {
  if (ms < 40) return { label: 'Excellent', className: 'text-good' };
  if (ms < 120) return { label: 'Good', className: 'text-brand' };
  if (ms < 250) return { label: 'Usable', className: 'text-amber-500' };
  return { label: 'Degraded', className: 'text-rose-500' };
}

/**
 * Measures real round-trip time to Cloudflare's edge over several samples.
 * No bandwidth is claimed or simulated — only what the browser can actually time.
 */
export default function LatencyProbe() {
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [samples, setSamples] = useState([]);
  const [colo, setColo] = useState(null);

  const run = useCallback(async () => {
    setStatus('running');
    setSamples([]);
    setColo(null);

    const taken = [];
    let edge = null;

    for (let i = 0; i < SAMPLES; i += 1) {
      const url = `${ENDPOINT}?_=${Date.now()}-${i}`;
      const started = performance.now();
      try {
        // Preferred path: readable response tells us which edge node answered.
        const res = await fetch(url, { cache: 'no-store' });
        taken.push(Math.round(performance.now() - started));
        if (!edge && res.ok) {
          const text = await res.text();
          edge = text.match(/^colo=(.+)$/m)?.[1] ?? null;
        }
      } catch {
        try {
          // Fallback: opaque request still completes, so the timing stays real.
          await fetch(url, { mode: 'no-cors', cache: 'no-store' });
          taken.push(Math.round(performance.now() - started));
        } catch {
          setStatus('error');
          return;
        }
      }
      setSamples([...taken]);
    }

    setColo(edge);
    setStatus('done');
  }, []);

  const best = samples.length ? Math.min(...samples) : 0;
  const mid = samples.length ? median(samples) : 0;
  const jitter = samples.length > 1 ? Math.max(...samples) - best : 0;
  const peak = samples.length ? Math.max(...samples, 1) : 1;
  const rating = status === 'done' ? grade(mid) : null;

  return (
    <div className="rounded-2xl border border-edge bg-panel-2/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow flex items-center gap-2 text-faint">
          <IconPulse width={13} height={13} className="text-brand" />
          Edge latency
        </span>
        {rating && (
          <span className={`font-mono text-[0.625rem] font-bold uppercase tracking-widest ${rating.className}`}>
            {rating.label}
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { label: 'Median', value: mid },
          { label: 'Best', value: best },
          { label: 'Jitter', value: jitter },
        ].map((m) => (
          <div key={m.label}>
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-faint">{m.label}</p>
            <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-title">
              {m.value}
              <span className="ml-0.5 text-[0.6875rem] font-normal text-faint">ms</span>
            </p>
          </div>
        ))}
      </div>

      {/* Sample bars */}
      <div className="mt-5 flex h-10 items-end gap-1.5" aria-hidden="true">
        {Array.from({ length: SAMPLES }).map((_, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-sm ${samples[i] != null ? 'bg-brand/60' : 'bg-edge'}`}
            initial={{ height: '8%' }}
            animate={{ height: samples[i] != null ? `${Math.max(12, (samples[i] / peak) * 100)}%` : '8%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={run}
        disabled={status === 'running'}
        className="mt-5 w-full rounded-xl bg-title px-4 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-canvas transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'running'
          ? `Probing ${samples.length}/${SAMPLES}…`
          : status === 'done'
            ? 'Run again'
            : 'Run probe'}
      </button>

      <p className="mt-3 font-mono text-[0.5625rem] leading-relaxed uppercase tracking-[0.1em] text-faint">
        {status === 'error'
          ? 'Probe blocked — network or extension prevented the request.'
          : colo
            ? `${SAMPLES} round trips to Cloudflare · edge node ${colo}`
            : `${SAMPLES} real round trips to Cloudflare's edge. No bandwidth is estimated.`}
      </p>
    </div>
  );
}
