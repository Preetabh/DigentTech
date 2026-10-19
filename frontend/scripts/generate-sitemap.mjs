import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.VITE_SITE_URL || "https://www.digenttech.workers.dev";
const today = new Date().toISOString().split("T")[0];

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemapContent, "utf-8");
console.log(`Successfully generated sitemap.xml at ${outputPath}`);
