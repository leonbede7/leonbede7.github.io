// Captures the first screen as the link-preview image. Run against a running preview or dev server.
import { chromium } from '@playwright/test';
const base = process.argv[2] ?? 'http://localhost:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
await page.waitForTimeout(2600);
await page.screenshot({ path: 'public/social.png' });
await browser.close();
console.log('Wrote public/social.png');
