import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const ssrDir = path.resolve(rootDir, "dist-ssr");

const INDEXABLE_ROUTES = [
  "/",
  "/services",
  "/web-development",
  "/app-development",
  "/digital-marketing",
  "/ai-solutions",
  "/work",
  "/about",
  "/careers",
  "/online-courses",
  "/contact",
];

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function run() {
  const ssrFiles = fs.readdirSync(ssrDir).filter((f) => /\.(m?js)$/.test(f));
  if (!ssrFiles.length) {
    throw new Error("SSR entry bundle not found in dist-ssr/");
  }

  const ssrModuleUrl = pathToFileURL(path.join(ssrDir, ssrFiles[0])).href;
  const { render } = await import(ssrModuleUrl);

  const templatePath = path.join(distDir, "index.html");
  const templateHtml = fs.readFileSync(templatePath, "utf-8");

  const renderAndWrite = (routePath, outFile) => {
    const { html, seo, canonicalUrl, ogImage, jsonLd } = render(routePath);
    const robotsValue = seo.noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    const extraHead =
      routePath === "/"
        ? `<link rel="preload" as="image" href="/assets/visuals/hero-studio-poster.jpg" fetchpriority="high" />`
        : "";

    let pageHtml = templateHtml
      .replace("<!--ssr-outlet-->", html)
      .replace("<!--ssr-head-extra-->", extraHead)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(seo.title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeAttr(seo.description)}" />`
      )
      .replace(
        /<meta name="robots" content="[^"]*"\s*\/?>/,
        `<meta name="robots" content="${escapeAttr(robotsValue)}" />`
      )
      .replace(
        /<link rel="canonical" href="[^"]*"\s*\/?>\s*/,
        seo.noindex ? "" : `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />\n    `
      )
      .replace(
        /<meta property="og:type" content="[^"]*"\s*\/?>/,
        `<meta property="og:type" content="${escapeAttr(seo.ogType || "website")}" />`
      )
      .replace(
        /<meta property="og:url" content="[^"]*"\s*\/?>\s*/,
        seo.noindex ? "" : `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />\n    `
      )
      .replace(
        /<meta property="og:title" content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${escapeAttr(seo.title)}" />`
      )
      .replace(
        /<meta property="og:description" content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${escapeAttr(seo.description)}" />`
      )
      .replace(
        /<meta property="og:image" content="[^"]*"\s*\/?>/,
        `<meta property="og:image" content="${escapeAttr(ogImage)}" />`
      )
      .replace(
        /<meta name="twitter:url" content="[^"]*"\s*\/?>\s*/,
        seo.noindex ? "" : `<meta name="twitter:url" content="${escapeAttr(canonicalUrl)}" />\n    `
      )
      .replace(
        /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`
      )
      .replace(
        /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`
      )
      .replace(
        /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`
      )
      .replace(
        /<script id="seo-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script id="seo-json-ld" type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`
      );

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, pageHtml, "utf-8");
  };

  for (const route of INDEXABLE_ROUTES) {
    const outFile =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, `${route.slice(1)}.html`);
    renderAndWrite(route, outFile);
  }

  // Real 404.html served with HTTP 404 status on Cloudflare Pages / Workers (not_found_handling: "404-page")
  renderAndWrite("/404-not-found", path.join(distDir, "404.html"));

  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(`Prerendered ${INDEXABLE_ROUTES.length} routes + 404.html into dist/`);
}

run().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});

