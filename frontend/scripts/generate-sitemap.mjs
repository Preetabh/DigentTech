import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = (process.env.VITE_SITE_URL || "https://digenttech.pages.dev").replace(/\/+$/, "");

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/web-development", priority: "0.9", changefreq: "monthly" },
  { path: "/app-development", priority: "0.9", changefreq: "monthly" },
  { path: "/digital-marketing", priority: "0.9", changefreq: "monthly" },
  { path: "/ai-solutions", priority: "0.9", changefreq: "monthly" },
  { path: "/work", priority: "0.8", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/careers", priority: "0.8", changefreq: "weekly" },
  { path: "/online-courses", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outputPaths = [
  path.resolve(__dirname, "../public/sitemap.xml"),
  path.resolve(__dirname, "../dist/sitemap.xml"),
];

for (const outPath of outputPaths) {
  if (outPath.includes(`${path.sep}dist${path.sep}`) && !fs.existsSync(path.dirname(outPath))) {
    continue;
  }
  fs.writeFileSync(outPath, sitemapContent, "utf-8");
}

console.log(`Generated sitemap.xml for ${routes.length} routes (${siteUrl})`);
