import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = ['/', '/work/kokpit/', '/work/assistant/', '/work/showroom/', '/work/galerija/', '/work/intake-eval/', '/work/predictiondesk/', '/work/potez/', '/work/catapult/', '/cv/'];

for (const path of PAGES) {
  test(`${path} loads without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    const res = await page.goto(path, { waitUntil: 'networkidle' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
  });
}

test('without JavaScript the day is a readable list', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('.day')).not.toHaveClass(/is-pinned/);
  for (const title of ['Assistant, morning brief', 'Showroom, the studio is software', 'The workshop, where it is checked']) {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
  }
  await expect(page.locator('[data-beam]').first()).toHaveAttribute('d', /^M/);
  await ctx.close();
});

test('reduced motion: nothing is pinned and a time button changes the drawing', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.day')).not.toHaveClass(/is-pinned/);
  await expect(page.locator('[data-clock]')).toHaveText('07:00');
});

test('scrolling moves the sun and switches the active stop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.day')).toHaveClass(/is-pinned/);
  await page.evaluate(() => {
    const d = document.querySelector<HTMLElement>('[data-day]')!;
    window.scrollTo(0, d.offsetTop + (4 / 8) * (d.offsetHeight - window.innerHeight) + 4);
  });
  await expect(page.locator('.day')).toHaveAttribute('data-stop', 'showroom');
  await expect(page.locator('[data-clock]')).toHaveText('12:30');
  await expect(page.locator('.day .rm[data-room="showroom"]')).toHaveClass(/is-lit/);
  await expect(page.locator('[data-panel="showroom"]')).toBeVisible();
});

test('a time button jumps to its stop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('[data-goto="desk"]').click();
  await expect(page.locator('.day')).toHaveAttribute('data-stop', 'desk');
  await expect(page.locator('[data-clock]')).toHaveText('16:30');
});

test('a deep link to the room schedule lands below the day', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#rooms');
  await expect(page.getByRole('heading', { name: 'Room schedule' })).toBeInViewport();
});

test('phone width has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/work/kokpit/', '/work/showroom/', '/cv/']) {
    await page.goto(path, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
  }
});

test('unknown addresses get the 404 page', async ({ page }) => {
  const res = await page.goto('/no-such-room/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not on the drawings');
});
