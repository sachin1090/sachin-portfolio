/**
 * Exports the Claude Code session transcript for this project to a readable
 * HTML page.
 *
 *   npm run chat
 *
 * Reads the newest .jsonl under ~/.claude/projects/<slug>/ and writes
 * chat/conversation.html. Internal reasoning is not included.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Claude Code slugifies the project path: C:\sachin-portfolio-main -> C--sachin-portfolio-main
const slug = root.replace(/[\\/:]/g, '-').replace(/-+$/, '');
const sessionDir = join(homedir(), '.claude', 'projects', slug);

if (!existsSync(sessionDir)) {
  console.error(`No session directory at ${sessionDir}`);
  process.exit(1);
}

const transcripts = readdirSync(sessionDir)
  .filter((f) => f.endsWith('.jsonl'))
  .map((f) => ({ file: join(sessionDir, f), mtime: statSync(join(sessionDir, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (!transcripts.length) {
  console.error(`No .jsonl transcript found in ${sessionDir}`);
  process.exit(1);
}

const lines = readFileSync(transcripts[0].file, 'utf8').split('\n').filter(Boolean);

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Compact markdown subset: fences, tables, headings, lists, bold, inline code. */
function md(src) {
  const out = [];
  const lines = src.split('\n');
  let i = 0;

  const inline = (t) =>
    esc(t)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2">$1</a>');

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      const body = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
      i += 1;
      out.push(`<pre><code>${esc(body.join('\n'))}</code></pre>`);
      continue;
    }

    if (/^\s*\|.*\|\s*$/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? '')) {
      const cells = (r) =>
        r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        `<table><thead><tr>${head.map((h) => `<th>${inline(h)}</th>`).join('')}</tr></thead><tbody>` +
          rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('') +
          '</tbody></table>',
      );
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = Math.min(heading[1].length + 1, 5);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
        i += 1;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`);
      continue;
    }

    if (!line.trim()) {
      i += 1;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(```|#{1,4}\s|\s*([-*]|\d+\.)\s)/.test(lines[i])) {
      para.push(lines[i++]);
    }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }

  return out.join('\n');
}

/** One-line descriptor for a tool call, so the log stays skimmable. */
function toolSummary(block) {
  const a = block.input ?? {};
  const detail =
    a.description ?? a.file_path ?? a.command ?? a.pattern ?? a.prompt ?? a.skill ?? '';
  return `${block.name}${detail ? ` — ${String(detail).split('\n')[0].slice(0, 120)}` : ''}`;
}

const entries = [];

for (const raw of lines) {
  let o;
  try {
    o = JSON.parse(raw);
  } catch {
    continue;
  }
  if (o.isSidechain) continue;
  if (o.type !== 'user' && o.type !== 'assistant') continue;

  const content = o.message?.content;
  const parts = [];

  if (typeof content === 'string') {
    if (content.trim()) parts.push({ kind: 'text', text: content });
  } else if (Array.isArray(content)) {
    for (const b of content) {
      if (b.type === 'text' && b.text?.trim()) parts.push({ kind: 'text', text: b.text });
      else if (b.type === 'tool_use') parts.push({ kind: 'tool', text: toolSummary(b) });
      // thinking and tool_result blocks are intentionally omitted
    }
  }

  if (!parts.length) continue;

  // Skip system-injected reminders that aren't really the user talking.
  if (o.type === 'user' && parts.every((p) => p.text.includes('<system-reminder>'))) continue;

  entries.push({ role: o.type, parts, time: o.timestamp });
}

const fmt = (t) => {
  if (!t) return '';
  const d = new Date(t);
  return d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
};

const body = entries
  .map((e) => {
    const blocks = e.parts
      .map((p) =>
        p.kind === 'tool'
          ? `<div class="tool">${esc(p.text)}</div>`
          : `<div class="prose">${md(p.text)}</div>`,
      )
      .join('');
    return `<article class="turn ${e.role}">
  <header><span class="who">${e.role === 'user' ? 'Sachin' : 'Claude'}</span><time>${esc(fmt(e.time))}</time></header>
  ${blocks}
</article>`;
  })
  .join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Portfolio rebuild — session transcript</title>
<style>
  :root{--bg:#f5f7fb;--panel:#fff;--edge:rgba(15,23,42,.1);--title:#0b1220;--body:#46536b;--faint:#7b8799;--brand:#0369a1;--code:#eef2f8}
  @media (prefers-color-scheme:dark){:root{--bg:#070b14;--panel:#0d1322;--edge:rgba(148,163,184,.15);--title:#f1f5f9;--body:#a3b1c6;--faint:#6b7a90;--brand:#38bdf8;--code:#131b2d}}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--body);font:15px/1.65 "Segoe UI",system-ui,sans-serif}
  .wrap{max-width:860px;margin:0 auto;padding:40px 20px 80px}
  h1{color:var(--title);font-size:26px;letter-spacing:-.3px;margin:0 0 6px}
  .sub{color:var(--faint);font-size:13px;margin:0 0 34px}
  .turn{background:var(--panel);border:1px solid var(--edge);border-radius:14px;padding:18px 20px;margin-bottom:14px}
  .turn.user{border-left:3px solid var(--brand)}
  .turn header{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:10px}
  .who{font-weight:700;color:var(--title);font-size:13px;letter-spacing:.02em}
  time{color:var(--faint);font-size:11px;font-variant-numeric:tabular-nums}
  .prose>*:first-child{margin-top:0}.prose>*:last-child{margin-bottom:0}
  .prose h2,.prose h3,.prose h4,.prose h5{color:var(--title);margin:18px 0 8px;font-size:15px}
  p{margin:0 0 10px}
  ul,ol{margin:0 0 10px;padding-left:22px}
  li{margin-bottom:4px}
  code{background:var(--code);padding:1px 5px;border-radius:4px;font:13px ui-monospace,Consolas,monospace}
  pre{background:var(--code);padding:12px 14px;border-radius:9px;overflow-x:auto;margin:0 0 10px}
  pre code{background:none;padding:0;font-size:12.5px;line-height:1.55}
  table{border-collapse:collapse;width:100%;margin:0 0 10px;font-size:13.5px;display:block;overflow-x:auto}
  th,td{border:1px solid var(--edge);padding:6px 10px;text-align:left;vertical-align:top}
  th{color:var(--title);font-weight:600}
  a{color:var(--brand)}
  .tool{font:12px ui-monospace,Consolas,monospace;color:var(--faint);background:var(--code);border-radius:6px;padding:5px 9px;margin-bottom:6px;overflow-x:auto;white-space:nowrap}
</style>
</head>
<body>
<div class="wrap">
  <h1>Portfolio rebuild — session transcript</h1>
  <p class="sub">${entries.length} messages · exported ${esc(fmt(new Date().toISOString()))} · tool calls condensed, internal reasoning omitted</p>
  ${body}
</div>
</body>
</html>`;

mkdirSync(join(root, 'chat'), { recursive: true });
const dest = join(root, 'chat', 'conversation.html');
writeFileSync(dest, html, 'utf8');
console.log(`Transcript written to ${dest} (${entries.length} messages)`);
