/**
 * Inline 24px stroke icons — no icon dependency, themable via currentColor.
 */
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const IconSun = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const IconTerminal = (p) => (
  <svg {...base} {...p}>
    <path d="m4 17 6-5-6-5M12 19h8" />
  </svg>
);

export const IconMail = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2.5 6.5 8.4 5.9a2 2 0 0 0 2.2 0l8.4-5.9" />
  </svg>
);

export const IconLinkedIn = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.4h3.4V21H3.3V8.4Zm5.6 0h3.25v1.72h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.25 4.06 5.18V21h-3.39v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23V21H8.9V8.4Z" />
  </svg>
);

export const IconArrow = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCopy = (p) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 4.5 6v6c0 4.5 3.1 8.3 7.5 9.2 4.4-.9 7.5-4.7 7.5-9.2V6L12 2.8Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
);

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconMenu = (p) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconDownload = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16" />
  </svg>
);

export const IconPhone = (p) => (
  <svg {...base} {...p}>
    <path d="M15.5 21C7.5 21 3 16.5 3 8.5V6a1 1 0 0 1 1-1h3.2a1 1 0 0 1 1 .8l.7 3a1 1 0 0 1-.4 1L7 11.2a12 12 0 0 0 5.8 5.8l1.4-1.5a1 1 0 0 1 1-.3l3 .7a1 1 0 0 1 .8 1V20a1 1 0 0 1-1 1Z" />
  </svg>
);

export const IconPulse = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12h4l2.5-6 5 12L17 12h4" />
  </svg>
);
