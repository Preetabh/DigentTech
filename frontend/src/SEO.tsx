import React, { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_URL, getPageSEO } from "./seo-data";

interface SEOProps {
  pathname: string;
}

export function SEO({ pathname }: SEOProps) {
  const seo = getPageSEO(pathname);
  const canonicalUrl = `${SITE_URL}${seo.canonicalPath === "/" ? "" : seo.canonicalPath}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;

  useEffect(() => {
    // 1. Update Document Title
    document.title = seo.title;

    // Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", contentVal);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", seo.description);
    setMeta(
      "name",
      "robots",
      seo.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 3. Canonical Tag
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 4. Open Graph Tags
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", seo.ogType || "website");
    setMeta("property", "og:site_name", "DigentTech");
    setMeta("property", "og:locale", "en_US");

    // 5. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const breadcrumbSchema =
      seo.breadcrumbs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: seo.breadcrumbs.map((b, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: b.name,
              item: `${SITE_URL}${b.path === "/" ? "" : b.path}`,
            })),
          }
        : null;

    const allSchemas = [
      ...seo.schemas,
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ];

    let script = document.querySelector<HTMLScriptElement>("#seo-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(allSchemas);
  }, [pathname, seo, canonicalUrl, ogImage]);

  // Semantic Breadcrumbs container (accessible, rendered in DOM for screen readers and SEO crawlers)
  if (seo.breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="seo-breadcrumbs wrap" aria-label="Breadcrumb" style={{ display: "none" }}>
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {seo.breadcrumbs.map((crumb, idx) => (
          <li
            key={crumb.path}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a itemProp="item" href={crumb.path}>
              <span itemProp="name">{crumb.name}</span>
            </a>
            <meta itemProp="position" content={String(idx + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
