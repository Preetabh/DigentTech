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

export const SITE_URL =
  ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SITE_URL) ||
  "https://digenttech.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

// Base Organization Schema
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "DigentTech",
  alternateName: "DigentTech Design & Development",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  image: DEFAULT_OG_IMAGE,
  email: "hr.digenttech@gmail.com",
  description:
    "DigentTech is an independent software development, web engineering, mobile apps, and AI solutions studio founded by Vishu Awasthi.",
  founder: {
    "@type": "Person",
    name: "Vishu Awasthi",
    jobTitle: "Founder & Principal Strategist",
    image: `${SITE_URL}/assets/founder.png`,
  },
  foundingDate: "2022",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barabanki",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
    { "@type": "City", name: "Lucknow" },
    { "@type": "City", name: "Barabanki" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "Custom Software Development",
    "Next.js and React",
    "Flutter and React Native",
    "Enterprise AI Solutions and Automation",
    "Digital Marketing and Technical SEO",
    "Cloud Architecture and DevOps",
  ],
};

// Base WebSite Schema
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "DigentTech",
  description:
    "Software development, web applications, mobile apps, and enterprise AI engineering studio.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

// ProfessionalService Schema (LocalBusiness in UP / India)
export const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "DigentTech Software & Design Studio",
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: "hr.digenttech@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barabanki",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.9275,
    longitude: 81.1834,
  },
  areaServed: ["Barabanki", "Lucknow", "Uttar Pradesh", "India", "Worldwide"],
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

export function getPageSEO(pathname: string): PageSEO {
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  switch (cleanPath) {
    case "/":
      return {
        title: "DigentTech — Software Development, Web & Mobile App Company in India",
        description:
          "DigentTech is a premier software development studio based in India (serving Lucknow, Barabanki & global clients). We engineer high-performance web platforms, mobile apps, and AI solutions.",
        canonicalPath: "/",
        ogType: "website",
        ogImage: DEFAULT_OG_IMAGE,
        breadcrumbs: [{ name: "Home", path: "/" }],
        schemas: [
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          PROFESSIONAL_SERVICE_SCHEMA,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: "DigentTech — Software Development, Web & Mobile App Company",
            description:
              "High-performance digital products, web platforms, and mobile applications for founders and ambitious enterprises.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      };

    case "/services":
      return {
        title: "Digital Services & Technology Solutions — Web, Apps & AI | DigentTech",
        description:
          "Explore DigentTech's end-to-end technology capabilities: custom web development, mobile apps, performance marketing, and enterprise AI automation.",
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
              "Connected approach to strategy, design, engineering, and digital growth.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "DigentTech Core Technology Services",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Web Development",
                url: `${SITE_URL}/web-development`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "App Development",
                url: `${SITE_URL}/app-development`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Digital Marketing",
                url: `${SITE_URL}/digital-marketing`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "AI Solutions & Automation",
                url: `${SITE_URL}/ai-solutions`,
              },
            ],
          },
        ],
      };

    case "/web-development":
      return {
        title: "Web Development Services — Next.js, React & Custom Platforms | DigentTech",
        description:
          "Custom web development services by DigentTech. Next.js 15, React, sub-second latency, accessible claymorphic interfaces, and cloud-native databases.",
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
            "@type": "Service",
            name: "Custom Web Application & Website Development",
            serviceType: "Web Development",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: ["India", "Worldwide"],
            description:
              "High-performance web applications, enterprise SaaS portals, e-commerce platforms, and API systems built with React, Next.js, and TypeScript.",
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          },
        ],
      };

    case "/app-development":
      return {
        title: "Mobile App Development Company — iOS, Android & Flutter | DigentTech",
        description:
          "Leading mobile app development company. We engineer iOS and Android applications with React Native, Flutter, offline synchronization, and BLE hardware telemetry.",
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
            "@type": "Service",
            name: "Mobile Application Development",
            serviceType: "Mobile App Development",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: ["India", "Worldwide"],
            description:
              "Cross-platform and native mobile apps with 60fps gesture physics, native sensor telemetry, offline-first SQLite sync, and store publishing.",
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          },
        ],
      };

    case "/digital-marketing":
      return {
        title: "Digital Marketing & Technical SEO Services | DigentTech",
        description:
          "Data-driven digital marketing and technical SEO services. Maximize organic Google search rankings, Core Web Vitals performance, and conversion funnels.",
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
            "@type": "Service",
            name: "Digital Marketing & Technical SEO Strategy",
            serviceType: "Digital Marketing",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: ["India", "Worldwide"],
            description:
              "Organic search engine dominance, technical audit, Core Web Vitals optimization, programmatic SEO, and attribution tracking.",
          },
        ],
      };

    case "/ai-solutions":
      return {
        title: "Enterprise AI Solutions & Workflow Automation Systems | DigentTech",
        description:
          "Custom AI solutions and agentic automation. LLM orchestration, enterprise RAG knowledge bases, and autonomous workflow microservices by DigentTech.",
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
            "@type": "Service",
            name: "Enterprise AI Systems & Intelligent Workflow Automation",
            serviceType: "AI Solutions",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: ["India", "Worldwide"],
            description:
              "Multi-agent reasoning workflows, LLM orchestration, vector database search (Qdrant/pgvector), and low-latency FastAPI endpoints.",
          },
        ],
      };

    case "/work":
    case "/projects":
      return {
        title: "Portfolio & Case Studies — Software & Product Design | DigentTech",
        description:
          "Explore DigentTech case studies and featured production applications: real-time financial trading terminals, mobile fitness telemetry, cloud DevOps, and design systems.",
        canonicalPath: "/work",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/work" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: `${SITE_URL}/work`,
            name: "DigentTech Work & Portfolio Showcase",
            description:
              "Featured production applications and client flagships designed and engineered by DigentTech.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/about":
      return {
        title: "About DigentTech — Leadership, Craft & Engineering Culture",
        description:
          "Meet Vishu Awasthi and the DigentTech studio collective. Founded in 2022 in India, eliminating agency bloat to deliver digital flagships with lasting craft.",
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
            name: "About DigentTech Studio",
            description:
              "Boutique design and software engineering studio founded by Vishu Awasthi in India, serving global partners.",
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      };

    case "/careers":
      return {
        title: "Careers & Open Positions — Join DigentTech Studio",
        description:
          "Join DigentTech. We are hiring Senior Full-Stack Engineers, Mobile Developers, UI/UX Designers, and AI Specialists. 100% remote-first, top market compensation + equity.",
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
            name: "Careers & Culture at DigentTech",
            description:
              "Opportunities for engineers, designers, and AI specialists who care about craft and autonomy.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ],
      };

    case "/online-courses":
      return {
        title: "IT Training & Mentorship Programs — Full-Stack & UI/UX | DigentTech Academy",
        description:
          "Practical IT training and hands-on mentorship programs in Lucknow & Barabanki region. Learn full-stack development, product design, and digital marketing with senior practitioners.",
        canonicalPath: "/online-courses",
        ogType: "website",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Academy", path: "/online-courses" },
        ],
        schemas: [
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Full-Stack Development Mentorship",
            description:
              "Interface fundamentals to connected web applications: HTML & CSS, modern React, TypeScript, APIs and databases.",
            provider: { "@id": `${SITE_URL}/#organization` },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "blended",
              courseWorkload: "PT10H",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Digital Marketing & SEO Strategy Mentorship",
            description:
              "Learn to connect audience research, content architecture, technical SEO, and conversion analytics.",
            provider: { "@id": `${SITE_URL}/#organization` },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "blended",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Product Design & Prototyping Mentorship",
            description:
              "Transform problem statements into usable digital experiences with Figma, interactive design systems, and token architectures.",
            provider: { "@id": `${SITE_URL}/#organization` },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "blended",
            },
          },
        ],
      };

    case "/contact":
      return {
        title: "Contact DigentTech — Start a Software Project or Consultation",
        description:
          "Get in touch with DigentTech for web development, mobile apps, AI systems, or digital consulting. Based in Barabanki / Lucknow, Uttar Pradesh, serving clients worldwide.",
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
            description:
              "Initiate a project discussion or schedule a technical discovery call.",
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      };

    default:
      return {
        title: "Page Not Found — DigentTech",
        description:
          "The page you were looking for could not be found. Explore DigentTech's web development, mobile apps, and engineering portfolio.",
        canonicalPath: cleanPath,
        noindex: true,
        breadcrumbs: [{ name: "Home", path: "/" }],
        schemas: [],
      };
  }
}
