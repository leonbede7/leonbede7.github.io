// Review captures. Usage: node scripts/shots.mjs <outDir> [baseUrl]
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const out = process.argv[2] ?? '.impeccable/review';
const base = process.argv[3] ?? 'http://localhost:4321';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function shot(name, path, { width, height, full = false, media, reduce = false, js = true, prep } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: reduce ? 'reduce' : 'no-preference', javaScriptEnabled: js });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle' });
  if (media) await page.emulateMedia({ media });
  if (prep) await prep(page);
  if (full && js) {
    // Walk the page so lazy images load, then wait until every image has decoded.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 20000 });
  }
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: full });
  await ctx.close();
  console.log('shot', name);
}

const stop = (i) => async (page) => {
  await page.evaluate((i) => {
    const d = document.querySelector('[data-day]');
    const span = d.offsetHeight - innerHeight;
    const n = JSON.parse(d.dataset.states).length - 1;
    scrollTo(0, d.offsetTop + (i / n) * span + 4);
  }, i);
  await page.waitForTimeout(1600);
};

const only = process.argv[4];
const jobs = {
  'hero-desktop': () => shot('hero-desktop', '/', { width: 1440, height: 900 }),
  'hero-1280': () => shot('hero-1280', '/', { width: 1280, height: 720 }),
  'hero-1366': () => shot('hero-1366', '/', { width: 1366, height: 768 }),
  'stop4-1366': () => shot('stop4-1366', '/', { width: 1366, height: 768, prep: stop(4) }),
  'stop4-1280': () => shot('stop4-1280', '/', { width: 1280, height: 720, prep: stop(4) }),
  'hero-1440x780': () => shot('hero-1440x780', '/', { width: 1440, height: 780 }),
  'hero-1366x650': () => shot('hero-1366x650', '/', { width: 1366, height: 650 }),
  'hero-1280x620': () => shot('hero-1280x620', '/', { width: 1280, height: 620 }),
  'stop4-1366x650': () => shot('stop4-1366x650', '/', { width: 1366, height: 650, prep: stop(4) }),
  'hero-390x664': () => shot('hero-390x664', '/', { width: 390, height: 664 }),
  'stop4-390x664': () => shot('stop4-390x664', '/', { width: 390, height: 664, prep: stop(4) }),
  'stop8-desktop': () => shot('stop8-desktop', '/', { width: 1440, height: 900, prep: stop(8) }),
  'hero-1600': () => shot('hero-1600', '/', { width: 1600, height: 1000 }),
  'stop4-desktop': () => shot('stop4-desktop', '/', { width: 1440, height: 900, prep: stop(4) }),
  'stop7-desktop': () => shot('stop7-desktop', '/', { width: 1440, height: 900, prep: stop(7) }),
  'hero-mobile': () => shot('hero-mobile', '/', { width: 390, height: 844 }),
  'stop2-mobile': () => shot('stop2-mobile', '/', { width: 390, height: 844, prep: stop(2) }),
  'stop6-mobile': () => shot('stop6-mobile', '/', { width: 390, height: 844, prep: stop(6) }),
  'stop8-mobile': () => shot('stop8-mobile', '/', { width: 390, height: 844, prep: stop(8) }),
  'desktop': () => shot('desktop', '/', { width: 1440, height: 900, full: true, reduce: true }),
  'mobile': () => shot('mobile', '/', { width: 390, height: 844, full: true, reduce: true }),
  'nojs-desktop': () => shot('nojs-desktop', '/', { width: 1440, height: 900, full: true, js: false }),
  'sheet-kokpit': () => shot('sheet-kokpit', '/work/kokpit/', { width: 1440, height: 900, full: true }),
  'sheet-showroom-mobile': () => shot('sheet-showroom-mobile', '/work/showroom/', { width: 390, height: 844, full: true }),
  'sheet-assistant': () => shot('sheet-assistant', '/work/assistant/', { width: 1440, height: 900, full: true }),
  'cv-print': () => shot('cv-print', '/cv/', { width: 794, height: 1123, full: true, media: 'print' }),
  'cv-desktop': () => shot('cv-desktop', '/cv/', { width: 1440, height: 900, full: true }),
};
for (const [name, run] of Object.entries(jobs)) if (!only || only.split(',').includes(name)) await run();
await browser.close();
