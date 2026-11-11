// Renders /cv/ from the built site to public/leon-bede-cv.pdf. Run after `astro build`.
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

// Pass the address of a running preview to reuse it: node scripts/cv-pdf.mjs http://localhost:4398
const given = process.argv[2];
const PORT = 4399;
const server = given ? null : spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore', shell: process.platform === 'win32' });

async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview server did not start at ${url}`);
}

try {
  const url = `${given ?? `http://localhost:${PORT}`}/cv/`;
  await waitFor(url);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: 'public/leon-bede-cv.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('Wrote public/leon-bede-cv.pdf');
} finally {
  if (!server) {
    // nothing to stop
  } else if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  else server.kill();
}
