/**
 * Renders cv/cv.html to public/Sachin_Pandey_CV.pdf using headless Chrome/Edge.
 *
 *   npm run cv
 *
 * The HTML is the source of truth — edit cv/cv.html, then re-run this.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'cv/cv.html');
const output = resolve(root, 'public/Sachin_Pandey_CV.pdf');

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const browser = CANDIDATES.find((p) => existsSync(p));

if (!browser) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to the executable and retry.');
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`Missing CV source: ${source}`);
  process.exit(1);
}

rmSync(output, { force: true });

execFileSync(browser, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${output}`,
  pathToFileURL(source).href,
]);

if (!existsSync(output)) {
  console.error('Render produced no file.');
  process.exit(1);
}

console.log(`CV written to ${output}`);
