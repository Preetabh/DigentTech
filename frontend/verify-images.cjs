const {
  chromium,
} = require("C:/Users/Lucky/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const fs = require("fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const checks = [];
  await page.goto("http://127.0.0.1:3000/");
  for (const theme of ["dark", "light"]) {
    await page.evaluate((t) => localStorage.setItem("dotcode-theme", t), theme);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("http://127.0.0.1:3000/");
      await page.locator("h1").waitFor();
      await page.locator(".hero-brand-art").evaluate((i) => i.decode());
      await page.locator(".workspace-card").scrollIntoViewIfNeeded();
      await page.locator(".workspace-card img").evaluate((i) => i.decode());
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        images: Array.from(document.querySelectorAll(".theme-image")).map(
          (i) => ({
            src: i.getAttribute("src"),
            ok: i.complete && i.naturalWidth > 0,
          }),
        ),
      }));
      if (
        state.overflow ||
        state.images.some((i) => !i.ok || !i.src.endsWith(theme + ".webp"))
      )
        throw Error(JSON.stringify({ theme, width, state }));
      checks.push({ theme, width, images: "loaded", overflow: false });
      if (width === 1440) {
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: `qa-${theme}-desktop-hero.png` });
      }
      if (width === 390) {
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: `qa-${theme}-mobile-hero.png` });
        for (
          let y = 0;
          y < (await page.evaluate(() => document.body.scrollHeight));
          y += 650
        ) {
          await page.evaluate(
            (y) => scrollTo({ top: y, behavior: "instant" }),
            y,
          );
          await page.waitForTimeout(90);
        }
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.waitForTimeout(800);
        await page.screenshot({
          path: `qa-${theme}-mobile.png`,
          fullPage: true,
        });
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:3000/");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.waitForFunction(() =>
    document
      .querySelector(".hero-brand-art")
      ?.getAttribute("src")
      ?.endsWith("sculpture-dark.webp"),
  );
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.waitForFunction(() =>
    document
      .querySelector(".hero-brand-art")
      ?.getAttribute("src")
      ?.endsWith("sculpture-light.webp"),
  );
  if (errors.length) throw Error(errors.join("\n"));
  fs.writeFileSync(
    "qa-image-checks.json",
    JSON.stringify(
      {
        checks,
        liveToggle: true,
        format: "Lossless WebP, original pixels preserved",
        browserErrors: errors,
      },
      null,
      2,
    ),
  );
  console.log(
    "PASS: 8 final theme/viewport/image checks, live image switching, no browser errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
