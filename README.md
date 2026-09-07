# Sachin Pandey — Portfolio

Personal portfolio for a Senior System Administrator: infrastructure, security, and the ISO
management systems behind them. React 19 + Vite + Tailwind CSS v4 + Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
npm run lint
```

Requires Node 20.19+ (Vite 8).

## Deploying to Cloudflare Pages

Connect the GitHub repo in the Cloudflare dashboard (**Workers & Pages → Create → Pages → Connect to
Git**) and use:

| Setting                 | Value           |
| ----------------------- | --------------- |
| Framework preset        | Vite            |
| Build command           | `npm run build` |
| Build output directory  | `dist`          |
| Root directory          | `/`             |

`.nvmrc` pins Node 22 for the build. If Cloudflare ignores it, add an environment variable
`NODE_VERSION` = `22` under **Settings → Environment variables** instead — Vite 8 will not build on
Node 18.

`public/_headers` ships security headers and immutable caching for the fingerprinted `/assets/*`
bundle. Cloudflare reads it from the build output automatically.

Every push to `main` triggers a production deploy; pushes to other branches get preview URLs.

## Editing content

**All copy lives in `src/data.js`.** Nothing else needs touching for routine updates:

| Export           | Drives                                              |
| ---------------- | --------------------------------------------------- |
| `PROFILE`        | Name, role, summary, quote, email, LinkedIn          |
| `STATS`          | The four figures under the hero                      |
| `CERTIFICATIONS` | The ISO cards (add one and the grid, hero panel, and footer all pick it up) |
| `EXPERIENCE`     | Timeline entries                                     |
| `TOOLKIT`        | Skill groups                                         |
| `NAV_LINKS`      | Nav items — the `id` must match a section `id`        |

Each certification carries a `tone` (`amber`, `emerald`, `sky`, `cyan`, `indigo`, `violet`) that
selects its accent colour. The tones are defined in `src/index.css`; add a new one there in both the
light and `.dark` block.

## Design system

Theming runs on semantic CSS custom properties declared in `src/index.css` — `--canvas`, `--panel`,
`--title`, `--body`, `--brand` and friends — exposed to Tailwind through `@theme inline`. Light and
dark are two value sets for the same tokens, swapped by a `dark` class on `<html>`, so components
use `bg-panel` / `text-title` and never branch on the theme themselves.

- `src/hooks/useTheme.js` persists the choice to `localStorage` and falls back to the OS preference.
- An inline script in `index.html` applies the stored theme before first paint (no flash).
- Everything respects `prefers-reduced-motion`; the canvas background sits out entirely.

## Structure

```
src/
  App.jsx                 composition + Ctrl-` console shortcut
  data.js                 all content
  index.css               tokens, primitives, animations
  hooks/useTheme.js
  components/
    Background.jsx        grid, gradient washes, node constellation
    Nav.jsx               sticky nav, scroll-spy, reading progress, mobile sheet
    Hero.jsx              pitch, stats, compliance panel
    Certifications.jsx    the six ISO standards
    Experience.jsx        timeline
    Toolkit.jsx           skills grid
    Contact.jsx           CTA + copy-to-clipboard
    Footer.jsx
    Terminal.jsx          keyboard-driven console (Ctrl + `)
    LatencyProbe.jsx      real round-trip measurement to Cloudflare's edge
    Icons.jsx, Reveal.jsx, SectionHeading.jsx
  legacy/                 earlier experiments, not imported (safe to delete)
```

## Notes

- `LatencyProbe` reports only what the browser can genuinely time — round-trip latency. It makes no
  bandwidth claims.
- `src/legacy/` holds the earlier webcam panel, cursor-guidance arrows, particle field, and hidden
  mini-game. They are no longer imported anywhere; delete the folder when you're sure.
