import { chromium } from 'playwright';
import path from 'path';

async function testAboutPage() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop Dark Mode
  const contextDark = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageDark = await contextDark.newPage();
  console.log("Navigating to /about in dark mode...");
  await pageDark.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  
  // Scroll to founder spotlight
  const founder = pageDark.locator('#founder');
  await founder.scrollIntoViewIfNeeded();
  await pageDark.waitForTimeout(600);
  await pageDark.screenshot({ path: path.join(process.cwd(), 'scratch_about_founder_dark.png') });
  console.log("Captured scratch_about_founder_dark.png");

  // Scroll to principles & timeline
  const principles = pageDark.locator('#principles');
  await principles.scrollIntoViewIfNeeded();
  await pageDark.waitForTimeout(600);
  await pageDark.screenshot({ path: path.join(process.cwd(), 'scratch_about_principles.png') });
  console.log("Captured scratch_about_principles.png");

  // 2. Desktop Light Mode
  const contextLight = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLight = await contextLight.newPage();
  await pageLight.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  const themeToggle = pageLight.locator('button.icon-button:has-text("theme"), button[aria-label*="theme"], button.icon-button');
  // Click theme button
  const toggleBtn = pageLight.locator('.header-actions button.icon-button');
  if (await toggleBtn.count() > 0) {
    await toggleBtn.first().click();
    await pageLight.waitForTimeout(500);
  }
  const founderLight = pageLight.locator('#founder');
  await founderLight.scrollIntoViewIfNeeded();
  await pageLight.waitForTimeout(600);
  await pageLight.screenshot({ path: path.join(process.cwd(), 'scratch_about_founder_light.png') });
    console.log("Captured scratch_about_founder_light.png");

  // 3. Mobile Check
  await pageDark.setViewportSize({ width: 390, height: 844 });
  await pageDark.waitForTimeout(400);
  const scrollWidth = await pageDark.evaluate(() => document.documentElement.scrollWidth);
  const innerWidth = await pageDark.evaluate(() => window.innerWidth);
  console.log(`Mobile width check: scrollWidth=${scrollWidth}, innerWidth=${innerWidth}, diff=${scrollWidth - innerWidth}`);
  await pageDark.screenshot({ path: path.join(process.cwd(), 'scratch_about_mobile.png') });
  console.log("Captured scratch_about_mobile.png");

  await browser.close();
  console.log("Verification finished successfully!");
}

testAboutPage().catch(console.error);
