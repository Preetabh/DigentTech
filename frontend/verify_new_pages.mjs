import { chromium } from 'playwright';
import path from 'path';

async function testNewPages() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // ==========================================
  // 1. Digital Marketing Verification
  // ==========================================
  console.log("=== Testing /digital-marketing ===");
  const contextMarketing = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageM = await contextMarketing.newPage();
  await pageM.goto('http://localhost:3000/digital-marketing', { waitUntil: 'networkidle' });
  await pageM.waitForTimeout(600);

  // Hero screenshot
  await pageM.screenshot({ path: path.join(process.cwd(), 'scratch_mkt_hero_dark.png') });
  console.log("Captured scratch_mkt_hero_dark.png");

  // Click simulator tab
  const tabAttr = pageM.locator('button:has-text("Attribution Flow")');
  if (await tabAttr.count() > 0) {
    await tabAttr.click();
    await pageM.waitForTimeout(300);
  }

  // Scroll to Tech Stack and switch to Live Benchmarks
  const techSec = pageM.locator('#marketing-tech');
  await techSec.scrollIntoViewIfNeeded();
  await pageM.waitForTimeout(400);

  const btnBench = pageM.locator('button:has-text("Live Benchmarks")');
  if (await btnBench.count() > 0) {
    await btnBench.click();
    await pageM.waitForTimeout(400);
    await pageM.screenshot({ path: path.join(process.cwd(), 'scratch_mkt_benchmarks.png') });
    console.log("Captured scratch_mkt_benchmarks.png");
  }

  // Switch to Tech Specs
  const btnSpecs = pageM.locator('button:has-text("Tech Specs")');
  if (await btnSpecs.count() > 0) {
    await btnSpecs.click();
    await pageM.waitForTimeout(400);
    await pageM.screenshot({ path: path.join(process.cwd(), 'scratch_mkt_specs.png') });
    console.log("Captured scratch_mkt_specs.png");
  }

  // Scroll to Case Studies & open modal
  const workSec = pageM.locator('#marketing-work');
  await workSec.scrollIntoViewIfNeeded();
  await pageM.waitForTimeout(400);
  await pageM.screenshot({ path: path.join(process.cwd(), 'scratch_mkt_work.png') });
  console.log("Captured scratch_mkt_work.png");

  const firstCard = pageM.locator('.showcase-card').first();
  await firstCard.click();
  await pageM.waitForTimeout(500);
  await pageM.screenshot({ path: path.join(process.cwd(), 'scratch_mkt_modal.png') });
  console.log("Captured scratch_mkt_modal.png");

  // Close modal
  await pageM.keyboard.press('Escape');
  await pageM.waitForTimeout(300);

  // Mobile overflow check
  await pageM.setViewportSize({ width: 390, height: 844 });
  await pageM.waitForTimeout(400);
  const mktScrollW = await pageM.evaluate(() => document.documentElement.scrollWidth);
  const mktInnerW = await pageM.evaluate(() => window.innerWidth);
  console.log(`Digital Marketing Mobile width: scrollWidth=${mktScrollW}, innerWidth=${mktInnerW}, diff=${mktScrollW - mktInnerW}`);
  await pageM.screenshot({ path: path.join(process.cwd(), 'scratch_mkt_mobile.png') });
  console.log("Captured scratch_mkt_mobile.png");

  // ==========================================
  // 2. AI & Automation Verification
  // ==========================================
  console.log("\n=== Testing /ai-solutions ===");
  const contextAI = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageAI = await contextAI.newPage();
  await pageAI.goto('http://localhost:3000/ai-solutions', { waitUntil: 'networkidle' });
  await pageAI.waitForTimeout(600);

  // Hero screenshot
  await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_hero_dark.png') });
  console.log("Captured scratch_ai_hero_dark.png");

  // Click simulator tab
  const tabRAG = pageAI.locator('button:has-text("Vector RAG")');
  if (await tabRAG.count() > 0) {
    await tabRAG.click();
    await pageAI.waitForTimeout(300);
  }

  // Scroll to Tech Stack and switch to Benchmarks & Specs
  const aiTechSec = pageAI.locator('#ai-tech');
  await aiTechSec.scrollIntoViewIfNeeded();
  await pageAI.waitForTimeout(400);

  const aiBtnBench = pageAI.locator('button:has-text("Live Benchmarks")');
  if (await aiBtnBench.count() > 0) {
    await aiBtnBench.click();
    await pageAI.waitForTimeout(400);
    await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_benchmarks.png') });
    console.log("Captured scratch_ai_benchmarks.png");
  }

  const aiBtnSpecs = pageAI.locator('button:has-text("Architecture Specs")');
  if (await aiBtnSpecs.count() > 0) {
    await aiBtnSpecs.click();
    await pageAI.waitForTimeout(400);
    await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_specs.png') });
    console.log("Captured scratch_ai_specs.png");
  }

  // Scroll to Case Studies & open modal
  const aiWorkSec = pageAI.locator('#ai-work');
  await aiWorkSec.scrollIntoViewIfNeeded();
  await pageAI.waitForTimeout(400);
  await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_work.png') });
  console.log("Captured scratch_ai_work.png");

  const aiFirstCard = pageAI.locator('.showcase-card').first();
  await aiFirstCard.click();
  await pageAI.waitForTimeout(500);
  await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_modal.png') });
  console.log("Captured scratch_ai_modal.png");

  // Close modal
  await pageAI.keyboard.press('Escape');
  await pageAI.waitForTimeout(300);

  // Light mode check
  const toggleBtn = pageAI.locator('.header-actions button.icon-button');
  if (await toggleBtn.count() > 0) {
    await toggleBtn.first().click();
    await pageAI.waitForTimeout(500);
    await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_hero_light.png') });
    console.log("Captured scratch_ai_hero_light.png");
  }

  // Mobile overflow check
  await pageAI.setViewportSize({ width: 390, height: 844 });
  await pageAI.waitForTimeout(400);
  const aiScrollW = await pageAI.evaluate(() => document.documentElement.scrollWidth);
  const aiInnerW = await pageAI.evaluate(() => window.innerWidth);
  console.log(`AI Solutions Mobile width: scrollWidth=${aiScrollW}, innerWidth=${aiInnerW}, diff=${aiScrollW - aiInnerW}`);
  await pageAI.screenshot({ path: path.join(process.cwd(), 'scratch_ai_mobile.png') });
  console.log("Captured scratch_ai_mobile.png");

  await browser.close();
  console.log("\nAll verifications completed successfully!");
}

testNewPages().catch(console.error);
