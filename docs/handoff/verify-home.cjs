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

    // Test delivery flow & interactive Work Spotlight before filter grid
    const flowCount = await page.locator(".lb-work-flow-step").count();
    let spotlightTitleBefore = "";
    let spotlightTitleAfter = "";
    if (await page.locator(".lb-work-spotlight").count()) {
      await page.locator(".lb-work-spotlight").scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(OUT_DIR, "home-light-1440-spotlight.png") });
      spotlightTitleBefore = (await page.locator(".lb-work-spotlight-title").innerText()).trim();
      const nextBtn = page.getByRole("button", { name: "Next spotlight project" });
      if (await nextBtn.count()) {
        await nextBtn.click();
        await page.waitForTimeout(300);
        spotlightTitleAfter = (await page.locator(".lb-work-spotlight-title").innerText()).trim();
      }
    }

    // 2. Test interactive filter bar, case modal, proposal & estimate modals, FAQ accordion
    await page.locator(".lb-filter-bar").scrollIntoViewIfNeeded();
    await page.getByRole("tab", { name: /MOBILE APPS/i }).click();
    await page.waitForTimeout(250);
    const mobileCount = await page.locator(".lb-project-card").count();
    await page.getByRole("tab", { name: /ALL/i }).click();
    await page.waitForTimeout(250);
    const allCount = await page.locator(".lb-project-card").count();

    await page.locator(".lb-project-card").first().click();
    await page.waitForFunction(() => Boolean(document.querySelector("dialog.lb-dialog[open]")));
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT_DIR, "modal-project-dossier.png") });
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector("dialog[open]"));

    await page.locator(".lb-pkg-scope-link").nth(1).click();
    await page.waitForFunction(() => Boolean(document.querySelector("dialog.lb-dialog[open]")));
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT_DIR, "modal-proposal.png") });
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector("dialog[open]"));

    await page.locator(".lb-pkg-est-btn").nth(1).click();
    await page.waitForFunction(() => Boolean(document.querySelector("dialog.lb-dialog[open]")));
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT_DIR, "modal-estimate.png") });
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector("dialog[open]"));

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
          await page.locator(".lb-projects-section").scrollIntoViewIfNeeded();
          await page.waitForTimeout(450);
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-1440-projects.png") });
          await page.locator(".lb-packages-section").scrollIntoViewIfNeeded();
          await page.waitForTimeout(450);
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-1440-packages.png") });
          await page.locator(".footer").scrollIntoViewIfNeeded();
          await page.waitForTimeout(450);
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-1440-footer.png") });
        }
        if (theme === "light" && vp.width === 390) {
          await page.screenshot({ path: path.join(OUT_DIR, "home-light-390-top.png") });
          await page.locator(".lb-packages-section").scrollIntoViewIfNeeded();
          await page.waitForTimeout(400);
          await page.screenshot({ path: path.join(OUT_DIR, "home-light-390-packages.png") });
        }
        if (theme === "dark" && vp.width === 390) {
          await page.screenshot({ path: path.join(OUT_DIR, "home-dark-390-top.png") });
        }
      }
    }

    // 4. Verify non-Home subroutes render cleanly + WorkPage interactive check
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "light"));
    const subRoutes = ["/services", "/work", "/about", "/contact"];
    const routeChecks = [];
    for (const r of subRoutes) {
      await page.goto(baseUrl + r, { waitUntil: "load" });
      await page.waitForTimeout(300);
      const h1 = await page.locator("h1").first().innerText();
      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      routeChecks.push({ route: r, h1: h1.slice(0, 60), overflowX });
    }

    // Detailed /work QA suite (hero, overview, filters, search, 10-section case study modal, capabilities, 6-stage process, CTAs)
    await page.goto(baseUrl + "/", { waitUntil: "load" });
    await page.waitForTimeout(250);
    await page.locator('header nav a[href="/work"]').first().click();
    await page.locator(".dt-route-loader").waitFor({ state: "visible", timeout: 2500 });
    await page.waitForTimeout(40);
    await page.screenshot({
      path: path.join(OUT_DIR, "route-switch-loader.png"),
      animations: "allow",
    });
    await page.waitForFunction(() => !document.querySelector(".dt-route-loader"), { timeout: 3000 });
    await page.waitForTimeout(750);
    await page.screenshot({ path: path.join(OUT_DIR, "work-light-1440-top.png") });

    await page.evaluate(() => localStorage.setItem("dotcode-theme", "dark"));
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-top.png") });

    // Scroll overview & explorer
    await page.locator(".wk-overview").scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-overview.png") });

    await page.locator(".wk-explorer").scrollIntoViewIfNeeded();
    await page.locator(".circular-carousel[data-ready]").waitFor({ state: "attached", timeout: 4500 });
    await page.waitForTimeout(750);
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-grid.png") });

    // Also capture Light mode #F5F4EB open CircularCarousel stage
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "light"));
    await page.reload({ waitUntil: "load" });
    await page.locator(".wk-explorer").scrollIntoViewIfNeeded();
    await page.locator(".circular-carousel[data-ready]").waitFor({ state: "attached", timeout: 4500 });
    await page.waitForTimeout(750);
    await page.screenshot({ path: path.join(OUT_DIR, "work-light-1440-grid.png") });

    // Switch back to Dark and test category filter tabs, search, empty reset & modal
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "dark"));
    await page.reload({ waitUntil: "load" });
    await page.locator(".wk-explorer").scrollIntoViewIfNeeded();
    await page.locator(".circular-carousel[data-ready]").waitFor({ state: "attached", timeout: 4500 });
    await page.waitForTimeout(450);

    const filterMatrix = {};
    for (const tabLabel of ["Web Platforms", "Mobile Applications", "AI & Automation", "Design Systems", "All Systems"]) {
      await page.locator(".wk-tabs").getByRole("tab", { name: new RegExp(tabLabel, "i") }).click();
      await page.waitForTimeout(350);
      filterMatrix[tabLabel] = await page.locator(".circular-carousel__card").count();
    }

    // Open Case Study Modal + Related switching
    await page.locator(".wk-orbit-inspect").click();
    await page.locator("dialog.wk-case-dialog").waitFor({ state: "visible" });
    await page.waitForTimeout(300);
    const modalTitleBefore = (await page.locator(".wk-case-title").innerText()).trim();
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-modal.png") });
    await page.locator(".wk-case-related-card").first().click();
    await page.waitForTimeout(250);
    const modalTitleRelated = (await page.locator(".wk-case-title").innerText()).trim();
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector("dialog[open]"));

    // Test Section E Capabilities & Section F 6-stage Process
    await page.locator(".wk-tech-section").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.getByRole("tab", { name: /Backend Architecture/i }).click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-capabilities.png") });

    await page.locator(".wk-process-section").scrollIntoViewIfNeeded();
    await page.waitForTimeout(550);
    await page.getByRole("tab", { name: /04.*Quality Assurance/i }).click();
    await page.waitForTimeout(200);
    const procHeading = (await page.locator(".wk-proc-ins-left h3").innerText()).trim();
    const workFlowSteps = await page.locator(".wk-proc-step").count();
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-process.png") });

    await page.locator(".footer-global-banner").scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-1440-footer.png") });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(350);
    const workMobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    await page.screenshot({ path: path.join(OUT_DIR, "work-dark-390-top.png") });

    // 4. Thorough verification of /web-development (Light #F5F4EB + Dark + GSAP + Interactive controls)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "light"));
    await page.goto(`${baseUrl}/web-development`, { waitUntil: "load" });
    await page.waitForTimeout(950);
    const webLightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.screenshot({ path: path.join(OUT_DIR, "web-light-1440-top.png") });

    // Switch Hero Inspector tab on light mode
    await page.locator(".inspector-tabs").getByRole("tab", { name: /Core Vitals/i }).click();
    await page.waitForTimeout(400);
    const vitalsCount = await page.locator(".vitals-grid .vital-card").count();

    // Switch to Dark mode for scrolled sections + GSAP checks
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "dark"));
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(950);
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-1440-top.png") });

    await page.locator("#web-services").scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-1440-services.png") });

    await page.locator("#web-stack").scrollIntoViewIfNeeded();
    await page.waitForTimeout(550);
    await page.locator(".tech-format-switcher").getByRole("button", { name: /Live Benchmarks/i }).click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-1440-benchmarks.png") });

    await page.locator("#web-compare").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-1440-compare.png") });

    await page.locator("#web-process").scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    const processStepsCount = await page.locator("#web-process .roadmap-card").count();
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-1440-process.png") });

    await page.locator("#web-showcase").scrollIntoViewIfNeeded();
    await page.waitForTimeout(550);
    await page.locator("#web-showcase .showcase-card button").first().click();
    await page.waitForTimeout(350);
    const webModalTitle = (await page.locator(".project-modal h2").innerText()).trim();
    await page.locator(".project-modal .close-modal").click();
    await page.waitForTimeout(200);

    await page.locator("#web-estimator").scrollIntoViewIfNeeded();
    await page.waitForTimeout(550);
    await page.locator("#web-estimator").getByRole("button", { name: /Headless CMS \+ AI Copilot/i }).click();
    await page.waitForTimeout(350);
    const estimatorSummary = (await page.locator(".estimator-output strong").first().innerText()).trim();
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-1440-estimator.png") });

    // Mobile 390x844 overflow check for /web-development
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(450);
    const webMobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    await page.screenshot({ path: path.join(OUT_DIR, "web-dark-390-top.png") });

    // 5. Verification of redesigned /contact page (Light #F5F4EB + Dark + GSAP + Brief Telemetry)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => localStorage.setItem("dotcode-theme", "light"));
    await page.goto(`${baseUrl}/contact?service=AI%20solutions&brief=Custom%20RAG%20pipeline`, {
      waitUntil: "load",
    });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT_DIR, "contact-light-1440-top.png") });

    await page.evaluate(() => localStorage.setItem("dotcode-theme", "dark"));
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(900);
    await page.locator(".ct-chips-wrap").nth(1).getByRole("button", { name: /₹2,00,000 – ₹5,00,000/i }).click();
    await page.locator("input[name='name']").fill("Rohan Sharma");
    await page.locator("input[name='email']").fill("rohan@example.com");
    await page.waitForTimeout(300);
    const contactReadinessAfter = (await page.locator(".ct-readiness-top strong").innerText()).trim();
    await page.screenshot({ path: path.join(OUT_DIR, "contact-dark-1440-top.png") });

    await page.locator("#ct-conduit").scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    const contactConduitCards = await page.locator(".ct-conduit-card").count();
    await page.screenshot({ path: path.join(OUT_DIR, "contact-dark-1440-conduit.png") });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(450);
    const contactMobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    await page.screenshot({ path: path.join(OUT_DIR, "contact-dark-390-top.png") });

    const report = {
      stickyHeaderFixedAfterScroll: stickyCheck,
      flowCount,
      spotlightCheck: { spotlightTitleBefore, spotlightTitleAfter },
      filterCounts: { allCount, mobileCount },
      workCheck: {
        filterMatrix,
        modalTitleBefore,
        modalTitleRelated,
        procHeading,
        workFlowSteps,
        workMobileOverflow,
      },
      webCheck: {
        webLightBg,
        vitalsCount,
        processStepsCount,
        webModalTitle,
        estimatorSummary,
        webMobileOverflow,
      },
      contactCheck: {
        contactReadinessAfter,
        contactConduitCards,
        contactMobileOverflow,
      },
      pageErrors,
      brokenAssets,
      matrixResults,
      routeChecks,
    };
    const jsonOut = JSON.stringify(report, null, 2);
    fs.writeFileSync(path.join(__dirname, "verification-results.json"), jsonOut + "\n", "utf8");
    console.log(jsonOut);
  } catch (err) {
    console.error("VERIFY SUITE ERROR:", err);
    pageErrors.push(err && err.message ? err.message : String(err));
  } finally {
    await browser.close();
    server.close();
    if (pageErrors.length || brokenAssets.length) {
      process.exitCode = 1;
    }
  }
})();
