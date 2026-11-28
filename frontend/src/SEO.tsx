import { useEffect } from "react";
import { buildStructuredData, DEFAULT_OG_IMAGE, getPageSEO, SITE_URL } from "./seo-data";

interface SEOProps {
  pathname: string;
}

export function SEO({ pathname }: SEOProps) {
  const seo = getPageSEO(pathname);
  const canonicalUrl = `${SITE_URL}${seo.canonicalPath === "/" ? "/" : seo.canonicalPath}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;

  useEffect(() => {
    document.title = seo.title;

    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", contentVal);
    };

    setMeta("name", "description", seo.description);
    setMeta(
      "name",
      "robots",
      seo.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (seo.noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", seo.ogType || "website");
    setMeta("property", "og:site_name", "DigentTech");
    setMeta("property", "og:locale", "en_US");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:url", canonicalUrl);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", ogImage);

    const allSchemas = buildStructuredData(seo);

    let script = document.querySelector<HTMLScriptElement>("#seo-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(allSchemas);
  }, [pathname, seo, canonicalUrl, ogImage]);

  return null;
}
