const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require(path.resolve(__dirname, "../../frontend/node_modules/playwright"));

const DIST_DIR = path.resolve(__dirname, "../../frontend/dist");
const OUT_DIR = path.resolve(__dirname, "verification-screenshots");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".json": "application/json",
  ".woff2": "font/woff2",
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const reqPath = (req.url || "/").split("?")[0];
      let filePath = path.join(DIST_DIR, reqPath === "/" ? "index.html" : reqPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, "index.html");
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve({ server, port: addr.port });
    });
  });
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { server, port } = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const pageErrors = [];
  const brokenAssets = [];

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    page.on("pageerror", (e) => pageErrors.push(e.message));

    // 1. Desktop 1440 Light Mode scroll & full screenshot sweep
    await page.goto(baseUrl + "/", { waitUntil: "load" });
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "light"));
    await page.reload({ waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);

    await page.screenshot({ path: path.join(OUT_DIR, "home-light-1440-top.png") });

    const totalH = await page.evaluate(() => document.body.scrollHeight);
    for (let frac of [0.16, 0.3, 0.45, 0.6, 0.74, 0.88, 0.98]) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.round(totalH * frac));
      await page.waitForTimeout(550);
    }

    const stickyCheck = await page.evaluate(() =>
      document.querySelector(".site-header")?.classList.contains("is-fixed")
    );

    // Take crisp mid-section captures in Light 1440
    for (const [label, selector] of [
      ["about", ".lb-about-section"],
      ["highlights-services", ".lb-highlights-section"],
      ["whatwedo", ".lb-whatwedo-band"],
      ["projects", ".lb-projects-section"],
      ["testimonials-infra", ".lb-testimonials-band"],
      ["packages", ".lb-packages-section"],
      ["faq-partners", ".lb-faq-section"],
      ["footer", ".footer"],
    ]) {
      const loc = page.locator(selector).first();
      await loc.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(OUT_DIR, `home-light-1440-${label}.png`) });
    }

    // Hover first project card to verify slide-in caption overlay
    await page.locator(".lb-project-card").first().scrollIntoViewIfNeeded();
    await page.locator(".lb-project-card").first().hover();
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(OUT_DIR, "home-light-1440-project-hover.png") });

    // 2. Test interactive filter bar, case modal, proposal & estimate modals, FAQ accordion
    await page.locator(".lb-filter-bar").scrollIntoViewIfNeeded();
    await page.getByRole("tab", { name: "MOBILE APPS" }).click();
    await page.waitForTimeout(250);
    const mobileCount = await page.locator(".lb-project-card").count();
    await page.getByRole("tab", { name: "ALL" }).click();
    await page.waitForTimeout(200);
    const allCount = await page.locator(".lb-project-card").count();

    await page.locator(".lb-project-card").first().click();
    await page.getByRole("dialog").waitFor();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT_DIR, "modal-project-dossier.png") });
    await page.keyboard.press("Escape");

    await page.locator(".lb-pkg-scope-link").nth(1).click();
    await page.getByRole("dialog").waitFor();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT_DIR, "modal-proposal.png") });
    await page.keyboard.press("Escape");

    await page.locator(".lb-pkg-est-btn").nth(1).click();
    await page.getByRole("dialog").waitFor();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT_DIR, "modal-estimate.png") });
    await page.keyboard.press("Escape");

    // 3. Check metrics across viewports + themes
    const matrixResults = [];
    for (const theme of ["light", "dark"]) {
      await page.evaluate((t) => localStorage.setItem("dotcode-theme", t), theme);
      for (const vp of [
        { width: 1920, height: 1080 },
        { width: 1440, height: 900 },
        { width: 1024, height: 900 },
        { width: 390, height: 844 },
      ]) {
        await page.setViewportSize(vp);
        await page.goto(baseUrl + "/", { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(450);

        const metrics = await page.evaluate(() => ({
          theme: document.documentElement.dataset.theme,
          scrollW: document.documentElement.scrollWidth,
          innerW: window.innerWidth,
          overflowX: document.documentElement.scrollWidth > window.innerWidth,
          brokenImgs: Array.from(document.images)
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => img.getAttribute("src")),
        }));
        if (metrics.brokenImgs.length) brokenAssets.push(...metrics.brokenImgs);
        matrixResults.push({ theme, vp: `${vp.width}x${vp.height}`, ...metrics });

        if (theme === "dark" && vp.width === 1440) {
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-1440-top.png") });
          await page.locator(".lb-whatwedo-band").scrollIntoViewIfNeeded();
          await page.waitForTimeout(450);
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-1440-whatwedo.png") });
          await page.locator(".lb-packages-section").scrollIntoViewIfNeeded();
          await page.waitForTimeout(450);
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-1440-packages.png") });
        }
        if (theme === "light" && vp.width === 390) {
          await page.screenshot({ path: path.join(OUT_DIR, "home-light-390-top.png") });
          await page.locator(".lb-packages-section").scrollIntoViewIfNeeded();
          await page.waitForTimeout(400);
          await page.screenshot({ path: path.join(OUT_DIR, "home-light-390-packages.png") });
        }
      }
    }

    // 4. Verify non-Home subroutes render cleanly
    await page.setViewportSize({ width: 1440, height: 900 });
    const subRoutes = ["/services", "/work", "/about", "/contact"];
    const routeChecks = [];
    for (const r of subRoutes) {
      await page.goto(baseUrl + r, { waitUntil: "load" });
      await page.waitForTimeout(250);
      const h1 = await page.locator("h1").first().innerText();
      routeChecks.push({ route: r, h1: h1.slice(0, 60) });
    }

    console.log(
      JSON.stringify(
        {
          stickyHeaderFixedAfterScroll: stickyCheck,
          filterCounts: { allCount, mobileCount },
          pageErrors,
          brokenAssets,
          matrixResults,
          routeChecks,
        },
        null,
        2
      )
    );
  } finally {
    await browser.close();
    server.close();
    process.exit(pageErrors.length || brokenAssets.length ? 1 : 0);
  }
})();
