export interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  noindex?: boolean;
  breadcrumbs: Array<{ name: string; path: string }>;
  schemas: object[];
}

export const SITE_URL = (
  ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SITE_URL) ||
  "https://digenttech.pages.dev"
).replace(/\/+$/, "");

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "DigentTech",
  alternateName: "Digent Tech",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/logo.png`,
    width: 1024,
    height: 1024,
  },
  image: DEFAULT_OG_IMAGE,
  email: "hr.digenttech@gmail.com",
  telephone: "+91-9194134646",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9194134646",
      email: "hr.digenttech@gmail.com",
      contactType: "customer support",
      areaServed: ["IN", "Worldwide"],
      availableLanguage: ["English"],
    },
  ],
  description:
    "DigentTech builds custom websites, mobile apps, and graphics, alongside coding coaching, free student internships, and free online IT support.",
  founder: {
    "@type": "Person",
    name: "Vishu Awasthi",
    jobTitle: "Founder & Principal Strategist",
  },
  foundingDate: "2022",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barabanki",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "DigentTech",
  alternateName: "Digent Tech",
  description:
    "Official website of DigentTech for custom websites, mobile apps, graphics, coding coaching, free internships, and free online IT support.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export function buildStructuredData(seo: PageSEO): object[] {
  const breadcrumbSchema =
    !seo.noindex && seo.breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: seo.breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: b.name,
            item: `${SITE_URL}${b.path === "/" ? "/" : b.path}`,
          })),
        }
      : null;

  return [...seo.schemas, ...(breadcrumbSchema ? [breadcrumbSchema] : [])];
}

export function getPageSEO(pathname: string): PageSEO {
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (cleanPath.startsWith("/work/") && cleanPath.length > "/work/".length) {
    return {
      title: "Project Case Study — Work Archive | DigentTech",
      description:
        "Inspect detailed software architecture, system design, and engineering outcomes delivered by DigentTech.",
      canonicalPath: cleanPath,
      ogType: "website",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
      ],
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: `${SITE_URL}${cleanPath}`,
          name: "DigentTech Case Study",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
      ],
    };
  }

  switch (cleanPath) {
    case "/":
      return {
        title: "DigentTech | Official Website",
        description:
          "DigentTech builds custom websites, mobile apps, and graphics—while offering coding coaching, free student internships, and free online IT support.",
        canonicalPath: "/",
        ogType: "website",
        ogImage: DEFAULT_OG_IMAGE,
        breadcrumbs: [{ name: "Home", path: "/" }],
        schemas: [
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: "DigentTech | Official Website",
            description:
              "Custom websites, mobile apps, and graphics by DigentTech, alongside coding coaching, free student internships, and free online IT support.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      };

    case "/services":
      return {
        title: "Services — Websites, Apps, AI & IT Support | DigentTech",
        description:
          "Explore DigentTech services: custom web development, mobile apps, digital marketing, AI automation, coding coaching, and free online IT support.",
        canonicalPath: "/services",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/services`,
            name: "Services & Capabilities — DigentTech",
            description:
              "Web engineering, mobile apps, AI automation, digital marketing, and tech mentorship from DigentTech.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/web-development":
      return {
        title: "Web Development Services — React & Custom Portals | DigentTech",
        description:
          "Custom websites, SaaS portals, and headless online stores built clearly from scratch with React, Next.js, and TypeScript by DigentTech.",
        canonicalPath: "/web-development",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Web Development", path: "/web-development" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/web-development`,
            name: "Web Development Services — DigentTech",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/app-development":
      return {
        title: "Mobile App Development — iOS, Android & Flutter | DigentTech",
        description:
          "DigentTech engineers reliable Android and iOS mobile apps with React Native, Flutter, offline synchronization, and clean daily workflows.",
        canonicalPath: "/app-development",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "App Development", path: "/app-development" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/app-development`,
            name: "Mobile App Development — DigentTech",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/digital-marketing":
      return {
        title: "Digital Marketing & Technical SEO Services | DigentTech",
        description:
          "Data-backed digital marketing, analytics attribution, Core Web Vitals tuning, and technical SEO foundations built for measurable growth by DigentTech.",
        canonicalPath: "/digital-marketing",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Digital Marketing", path: "/digital-marketing" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/digital-marketing`,
            name: "Digital Marketing — DigentTech",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/ai-solutions":
      return {
        title: "AI Solutions & Workflow Automation Systems | DigentTech",
        description:
          "Custom AI tools, private document search pipelines, and automated business workflow systems engineered with clear guardrails by DigentTech.",
        canonicalPath: "/ai-solutions",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "AI Solutions", path: "/ai-solutions" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/ai-solutions`,
            name: "AI Solutions & Automation — DigentTech",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/work":
    case "/projects":
      return {
        title: "Work & Case Studies — Websites, Apps & Systems | DigentTech",
        description:
          "Explore production case studies, custom web platforms, mobile apps, AI automation systems, and interface kits shipped by DigentTech.",
        canonicalPath: "/work",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: `${SITE_URL}/work`,
            name: "DigentTech Work & Case Studies",
            description:
              "Production web platforms, mobile apps, AI workflows, and design systems by DigentTech.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/about":
      return {
        title: "About DigentTech — Founder, Team & Engineering Studio",
        description:
          "Learn about DigentTech, led by Vishu Awasthi in India—building custom software, offering coding coaching, free internships, and free IT help.",
        canonicalPath: "/about",
        ogType: "profile",
        ogImage: `${SITE_URL}/assets/founder.png`,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: `${SITE_URL}/about`,
            name: "About DigentTech",
            description:
              "Independent software design and engineering studio based in Uttar Pradesh, India.",
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      };

    case "/careers":
      return {
        title: "Careers & Free Student Internships | DigentTech",
        description:
          "Explore engineering roles and zero-fee live-project internships for students and builders collaborating directly with the DigentTech team.",
        canonicalPath: "/careers",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/careers`,
            name: "Careers at DigentTech",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/online-courses":
      return {
        title: "Coding Coaching & Practical Mentorship | DigentTech",
        description:
          "Step-by-step coding coaching, UI/graphic design classes, and free student internships focused on live real-world project practice at DigentTech.",
        canonicalPath: "/online-courses",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Academy", path: "/online-courses" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}/online-courses`,
            name: "Coding Coaching & Academy — DigentTech",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/contact":
      return {
        title: "Contact DigentTech — Start a Project or Free IT Help",
        description:
          "Contact DigentTech on +91-9194134646 or hr.digenttech@gmail.com for websites, apps, graphics, internships, or free online IT support.",
        canonicalPath: "/contact",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: `${SITE_URL}/contact`,
            name: "Contact DigentTech",
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      };

    default:
      return {
        title: "Page Not Found | DigentTech",
        description:
          "The requested page could not be found on DigentTech. Return to the homepage or browse our services and work archive.",
        canonicalPath: cleanPath,
        noindex: true,
        breadcrumbs: [{ name: "Home", path: "/" }],
        schemas: [],
      };
  }
}
