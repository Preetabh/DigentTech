import {
    ArrowUpRight,
    BarChart3,
    Check,
    Code2,
    Cpu,
    Database,
    Gauge,
    Globe2,
    Layers,
    LayoutGrid,
    Minus,
    Plus,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Terminal,
    Workflow,
    X,
    Zap
} from "lucide-react";
import React, { useState } from "react";
import { WebTechCanvas } from "./ServiceCanvases";
import {
    CloudflareAwsLogo,
    GraphqlRestLogo,
    NextjsReactLogo,
    NodeGoLogo,
    PostgresRedisLogo,
    TailwindLogo,
    TypescriptLogo,
    VitestPlaywrightLogo,
} from "./TechLogos";
import { ThemeImage } from "./VisualExperience";
import "./service-pages.css";

function Button({
  children,
  href = "/contact?service=Web%20development",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a className="button" href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

function SectionHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function WebDevelopment() {
  // Hero inspector tab state
  const [inspectorTab, setInspectorTab] = useState<"arch" | "vitals" | "code">("arch");

  // Tech stack filter state
  const [techCategory, setTechCategory] = useState<"all" | "frontend" | "backend" | "data" | "cloud">("all");

  // Tech stack multi-format view switcher: 'bento' | 'benchmarks' | 'specs'
  const [techFormat, setTechFormat] = useState<"bento" | "benchmarks" | "specs">("bento");
  const [activeSpecIndex, setActiveSpecIndex] = useState<number>(0);

  // Project showcase modal state
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  React.useEffect(() => {
    if (selectedProject === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", key);
    };
  }, [selectedProject]);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Scope Estimator State
  const [platformType, setPlatformType] = useState<string>("SaaS & Web App");
  const [cmsType, setCmsType] = useState<string>("Headless CMS");
  const [integrationType, setIntegrationType] = useState<string>("Stripe & Auth");

  const webServices = [
    {
      num: "01",
      icon: LayoutGrid,
      title: "Custom Web Applications & SaaS",
      text: "Cloud-native single page and multi-page platforms with rich data visualization, role-based auth, real-time websockets, and scalable API layers.",
      tags: ["React / Next.js", "RBAC Auth", "Real-time WebSockets", "Micro-frontends"],
    },
    {
      num: "02",
      icon: Server,
      title: "Enterprise Portals & Operations Tools",
      text: "Unified operational workspaces that streamline ERP, CRM, inventory, and workforce workflows into one fast, intuitive, and accessible interface.",
      tags: ["Internal Tools", "Data Dashboards", "ERP Sync", "Workflow Automation"],
    },
    {
      num: "03",
      icon: ShoppingBag,
      title: "Headless E-Commerce & Marketplaces",
      text: "Sub-second storefronts built on modern headless commerce engines with frictionless multi-currency checkouts, Stripe integration, and custom catalogs.",
      tags: ["Shopify Plus", "Medusa", "Instant Checkout", "Custom Cart"],
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Marketing Flagships & Brand Sites",
      text: "Immersive digital flagship experiences with fluid micro-interactions, headless CMS authoring, modular design systems, and lighthouse-perfect SEO.",
      tags: ["Sanity / Strapi", "Fluid Motion", "Design Tokens", "SEO Architecture"],
    },
    {
      num: "05",
      icon: Cpu,
      title: "Resilient APIs & Cloud Backend",
      text: "High-throughput REST and GraphQL endpoints, serverless edge functions, third-party payment rails, webhooks, and secure cloud orchestration.",
      tags: ["GraphQL / REST", "Cloudflare Workers", "AWS Lambda", "Edge Caching"],
    },
    {
      num: "06",
      icon: Gauge,
      title: "Performance Optimization & Audits",
      text: "Deep profiling of rendering bottlenecks, bundle minimization, edge caching, server response tuning, and systematic Core Web Vitals remediation.",
      tags: ["Core Web Vitals", "Sub-second TTFB", "Asset Tree-shaking", "Lighthouse 100"],
    },
  ];

  const techStack = [
    {
      name: "React & Next.js 15",
      roleTag: "STREAMING EDGE ARCHITECTURE",
      logo: NextjsReactLogo,
      category: "frontend",
      categoryLabel: "FRONTEND FRAMEWORK",
      desc: "Server-side rendering, streaming suspense interfaces, static generation, and sub-second page routing at the edge.",
      bullets: [
        "Streaming SSR with React Server Components (RSC)",
        "Zero Layout Shift (CLS < 0.01) hydration",
        "Edge-cached static pre-rendering",
      ],
      metricValue: "100/100",
      metricLabel: "Core Web Vitals LCP",
      codeSnippet: "export default async function Page() { ... }",
      adoption: "Vercel · Notion · Stripe · Target",
      advantage: "Zero-layout-shift UI & Edge SSR",
      benchmark: { metric: "Time to Interactive", val: "0.38s", target: "1.2s Standard", pct: 98 },
      specCode: `// next.config.mjs\n/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  experimental: { ppr: true },\n  images: { formats: ['image/avif', 'image/webp'] }\n};\nexport default nextConfig;`,
    },
    {
      name: "TypeScript Strict",
      roleTag: "TYPE-CHECKED CONTRACTS",
      logo: TypescriptLogo,
      category: "frontend",
      categoryLabel: "FOUNDATION",
      desc: "End-to-end type safety guaranteeing maintainable contracts between UI components, database schemas, and API endpoints.",
      bullets: [
        "Strict null checks & schema validation",
        "Zod runtime validation inference",
        "Shared API & UI contract models",
      ],
      metricValue: "0 Errors",
      metricLabel: "Runtime Type Integrity",
      codeSnippet: "export type Schema<T> = z.infer<typeof T>;",
      adoption: "Microsoft · Airbnb · Slack · GitHub",
      advantage: "Eliminates runtime contract errors",
      benchmark: { metric: "Type-Check Velocity", val: "1.1s", target: "4.0s Target", pct: 96 },
      specCode: `// schema.contracts.ts\nimport { z } from 'zod';\nexport const UserContract = z.object({\n  id: z.string().uuid(),\n  role: z.enum(['admin', 'member'])\n});`,
    },
    {
      name: "Tailwind CSS & Tokens",
      roleTag: "HARDWARE-ACCELERATED STYLING",
      logo: TailwindLogo,
      category: "frontend",
      categoryLabel: "STYLING ENGINE",
      desc: "Design token architecture with GPU-accelerated transforms, zero runtime overhead, and minimal critical CSS payloads.",
      bullets: [
        "Sub-15kb production CSS bundle",
        "HSL dynamic dark/light CSS variables",
        "Zero CSS-in-JS runtime execution overhead",
      ],
      metricValue: "12.4 KB",
      metricLabel: "Critical CSS Gzip Size",
      codeSnippet: "className='clay-card hover:scale-[1.01]'",
      adoption: "OpenAI · Shopify · Twitch · GitHub",
      advantage: "Under 15kb critical CSS payload",
      benchmark: { metric: "CSS Parse & Paint", val: "4.2ms", target: "16.0ms Target", pct: 97 },
      specCode: `// tailwind.config.ts\nexport default {\n  theme: {\n    extend: { colors: { clay: { bg: '#0f1524', surface: '#121828' } } }\n  }\n};`,
    },
    {
      name: "Node.js & Go Microservices",
      roleTag: "HIGH-CONCURRENCY BACKEND",
      logo: NodeGoLogo,
      category: "backend",
      categoryLabel: "BACKEND RUNTIME",
      desc: "Asynchronous microservices, high-concurrency event streaming, and sub-millisecond JSON query data layers.",
      bullets: [
        "Non-blocking asynchronous event loops",
        "Compiled Go services for compute hotspots",
        "REST & gRPC low-latency streaming",
      ],
      metricValue: "18ms",
      metricLabel: "Average Endpoint Response",
      codeSnippet: "app.get('/api/stream', handleEventLoop);",
      adoption: "Uber · Netflix · PayPal · Cloudflare",
      advantage: "Sub-20ms average API response",
      benchmark: { metric: "Concurrent TPS", val: "68,000", target: "10,000 Target", pct: 94 },
      specCode: `// server.ts\nimport Fastify from 'fastify';\nconst fastify = Fastify({ logger: true });\nfastify.get('/health', async () => ({ status: 'optimal' }));`,
    },
    {
      name: "PostgreSQL & Supabase",
      roleTag: "RELATIONAL ACID DATABASE",
      logo: PostgresRedisLogo,
      category: "data",
      categoryLabel: "DATABASE",
      desc: "ACID-compliant relational databases with row-level security, JSON indexing, and automated read-replicas.",
      bullets: [
        "Fine-grained Row Level Security (RLS)",
        "PostGIS spatial indexing & vector search",
        "Connection pooling for zero downtime",
      ],
      metricValue: "< 2ms",
      metricLabel: "Indexed Query Latency",
      codeSnippet: "SELECT * FROM orders WHERE status = $1;",
      adoption: "Apple · Instagram · Reddit · Spotify",
      advantage: "Rock-solid data integrity & security",
      benchmark: { metric: "Indexed Select Latency", val: "1.8ms", target: "10ms Target", pct: 95 },
      specCode: `// schema.sql\nCREATE TABLE accounts (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  balance NUMERIC(14,2) NOT NULL\n);`,
    },
    {
      name: "Cloudflare Edge & Workers",
      roleTag: "GLOBAL DISTRIBUTED CDN",
      logo: CloudflareAwsLogo,
      category: "cloud",
      categoryLabel: "CLOUD & DEVOPS",
      desc: "Global edge network distributing compute and static assets across 300+ worldwide metropolitan points of presence.",
      bullets: [
        "Global Time to First Byte (TTFB) < 50ms",
        "DDoS protection & WAF layer 7 security",
        "Serverless Workers with 0ms cold starts",
      ],
      metricValue: "28ms",
      metricLabel: "Worldwide Global TTFB",
      codeSnippet: "export default { fetch(req) { return cache(req); } };",
      adoption: "Discord · GitLab · Canva · Garmin",
      advantage: "Global TTFB under 50ms",
      benchmark: { metric: "Cold Start Latency", val: "0.0ms", target: "250ms Serverless", pct: 99 },
      specCode: `// wrangler.toml\nname = "dotcode-edge-gateway"\nmain = "src/worker.ts"\ncompatibility_date = "2024-10-01"`,
    },
    {
      name: "GraphQL & REST APIs",
      roleTag: "DECLARATIVE DATA LAYER",
      logo: GraphqlRestLogo,
      category: "backend",
      categoryLabel: "API LAYER",
      desc: "Declarative data fetching preventing over-fetching, paired with automatic OpenAPI schema generation.",
      bullets: [
        "Type-safe auto-generated query clients",
        "Batching & deduplication of HTTP requests",
        "Instant OpenAPI v3 interactive docs",
      ],
      metricValue: "64% Less",
      metricLabel: "Network Payload Reduction",
      codeSnippet: "query GetProject($id: ID!) { ... }",
      adoption: "Meta · GitHub · Pinterest · Twitter",
      advantage: "Type-generated query hooks",
      benchmark: { metric: "Query Payload Size", val: "4.8 KB", target: "38 KB REST", pct: 93 },
      specCode: `// schema.graphql\ntype Query {\n  project(id: ID!): ProjectDetail!\n}`,
    },
    {
      name: "Vitest & Playwright E2E",
      roleTag: "AUTOMATED REGRESSION CI",
      logo: VitestPlaywrightLogo,
      category: "cloud",
      categoryLabel: "TESTING & CI",
      desc: "Headless cross-browser automated testing, visual regression assertion, and continuous integration pipelines.",
      bullets: [
        "Full desktop & mobile browser matrix testing",
        "Instant visual snapshot diff verification",
        "Zero-regression deployment confidence",
      ],
      metricValue: "100%",
      metricLabel: "Critical Path E2E Coverage",
      codeSnippet: "await expect(page.locator('h1')).toBeVisible();",
      adoption: "Google · Microsoft · Adobe · Stripe",
      advantage: "Continuous integration & instant rollbacks",
      benchmark: { metric: "E2E Suite Runtime", val: "18.4s", target: "60s CI Target", pct: 91 },
      specCode: `// e2e.spec.ts\ntest('homepage loads without regression', async ({ page }) => {\n  await page.goto('/');\n  await expect(page).toHaveTitle(/DigentTech/);\n});`,
    },
  ];

  const filteredTech = techCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === techCategory);

  const processSteps = [
    {
      num: "01",
      title: "Discovery & Technical Blueprint",
      desc: "We analyze business requirements, audit existing systems, map database schemas, and define API contracts and sprint milestones.",
      deliverables: ["Architecture specification", "Database entity diagram", "Interactive project timeline"],
    },
    {
      num: "02",
      title: "UI/UX System & Interactive Wireframes",
      desc: "We translate specifications into clean Figma wireframes, establish typography, color systems, and interactive clickable prototypes.",
      deliverables: ["Figma design system tokens", "High-fidelity mockups", "User flow validation"],
    },
    {
      num: "03",
      title: "Component-Driven Engineering",
      desc: "We develop modular TypeScript components, hook up state managers, write comprehensive tests, and deploy continuous preview environments.",
      deliverables: ["Clean typed codebase", "Weekly staging releases", "Accessible semantic markup"],
    },
    {
      num: "04",
      title: "Integrations, QA & Security Audits",
      desc: "We integrate payment processors, CRM pipelines, run automated penetration tests, and optimize Core Web Vitals to 100/100 standards.",
      deliverables: ["OWASP security compliance", "Cross-browser regression suite", "Performance benchmark report"],
    },
    {
      num: "05",
      title: "Zero-Downtime Launch & Continuous Care",
      desc: "We execute seamless DNS migration, configure edge CDN caching, verify production analytics, and conduct a full engineering handover.",
      deliverables: ["Zero-downtime cutover", "Handover documentation & code ownership", "30-day post-launch warranty"],
    },
  ];

  const features = [
    {
      num: "01",
      icon: Zap,
      title: "Sub-Second Global Edge Speed",
      text: "Assets and server-rendered components distributed through worldwide edge CDNs to ensure near-instantaneous page transitions anywhere.",
      tags: ["Sub-second TTFB", "Edge Caching", "Asset Compression"],
    },
    {
      num: "02",
      icon: Rocket,
      title: "Conversion-Centric Architecture",
      text: "Every interaction, checkout funnel, and navigation bar is ergonomically positioned to eliminate friction and maximize lead capture.",
      tags: ["Frictionless Funnels", "Heatmap-tested", "Micro-copy"],
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Enterprise-Grade Security",
      text: "Rigorous input sanitization, CSRF token verification, encrypted environment secrets, and strict HTTPS header policies baked in from day one.",
      tags: ["OWASP Compliant", "End-to-End Encryption", "Role-based Auth"],
    },
    {
      num: "04",
      icon: Code2,
      title: "Modular, Fully Typed Codebase",
      text: "Built with strict TypeScript schemas and reusable component hierarchies, making it straightforward for your in-house engineers to scale.",
      tags: ["TypeScript Strict", "Component Library", "Zero Technical Debt"],
    },
    {
      num: "05",
      icon: Search,
      title: "Search Engine Optimization (SEO)",
      text: "Dynamic OpenGraph cards, rich JSON-LD schema markup, accessible headings, and crawl-friendly routing that ranks high organically.",
      tags: ["Semantic HTML5", "JSON-LD Schema", "Sitemap Generation"],
    },
    {
      num: "06",
      icon: Workflow,
      title: "Autonomous Content Management",
      text: "Integrate visual headless CMS dashboards (Sanity, Strapi) allowing marketing teams to launch pages and update content without developer intervention.",
      tags: ["Headless CMS", "Live Previews", "Role Permissions"],
    },
  ];

  const showcaseProjects = [
    {
      name: "InfraPilot",
      type: "ENTERPRISE CRM & ERP PLATFORM",
      image: "/assets/projects/infrapilot-crm-portal.png",
      desc: "A unified construction operations portal connecting project budgeting, real-time client relationships, and team scheduling.",
      impact: [
        { label: "Daily Active Adoption", value: "+140%" },
        { label: "Query Latency", value: "38ms" },
        { label: "Uptime Reliability", value: "99.99%" },
      ],
      tags: ["React", "TypeScript", "ERP Architecture", "PostgreSQL", "Cloudflare Workers"],
      detail:
        "InfraPilot consolidated 5 disparate software tools into a single, high-performance web dashboard. Features role-based team management, real-time invoice generation, and automated project milestone tracking.",
    },
    {
      name: "HrMitra",
      type: "WORKFORCE MANAGEMENT SYSTEM",
      image: "/assets/projects/hrmitra-hrm-portal.png",
      desc: "An intuitive HR operations suite connecting automated attendance tracking, leave requests, employee onboarding, and payroll.",
      impact: [
        { label: "Admin Time Saved", value: "18 hrs/wk" },
        { label: "Core Web Vitals", value: "100/100" },
        { label: "Employee Adoption", value: "98.4%" },
      ],
      tags: ["Next.js", "Tailwind CSS", "REST APIs", "Redis Cache", "Auth0"],
      detail:
        "Designed to remove friction from daily workplace routines, HrMitra provides instantaneous payroll exports, biometric hardware integration, and multi-branch approval workflows with sub-second page loads.",
    },
    {
      name: "NovaCommerce",
      type: "HEADLESS E-COMMERCE ENGINE",
      image: "/assets/projects/novacommerce-web-portal.png",
      desc: "Sub-second headless retail storefront with global multi-currency checkout, dynamic inventory filtering, and instant edge routing.",
      impact: [
        { label: "Checkout Conversion", value: "+38%" },
        { label: "Page Switch Latency", value: "0.4s" },
        { label: "Holiday Uptime", value: "99.99%" },
      ],
      tags: ["Next.js", "Shopify Plus", "Edge Workers", "Stripe Checkout", "Tailwind CSS"],
      detail:
        "NovaCommerce replaces legacy monolithic storefronts with a decoupled Next.js frontend deployed at Cloudflare edge nodes. Featuring instantaneous product filtering, 1-click cart drawer transitions, and sub-second multi-currency checkouts.",
    },
    {
      name: "QuantOS Terminal",
      type: "INSTITUTIONAL LIQUIDITY TERMINAL",
      image: "/assets/projects/quantos-web-terminal.png",
      desc: "High-frequency WebGL trading and liquidity terminal processing 140k+ TPS with sub-2ms edge latency and tactile clay controls.",
      impact: [
        { label: "Edge Latency", value: "1.4ms" },
        { label: "Daily Volume", value: "$420M+" },
        { label: "Uptime SLA", value: "99.999%" },
      ],
      tags: ["WebGL", "WebSockets", "Rust Wasm", "Next.js", "Claymorphic UI"],
      detail:
        "Built for institutional liquidity providers, QuantOS features a hardware-accelerated WebGL candle engine, sub-millisecond orderbook delta feeds via WebSocket clusters, and claymorphic control modules for instant order execution.",
    },
  ];

  const faqItems = [
    {
      q: "How long does a custom web development project typically take?",
      a: "Most bespoke web applications and platforms require 4 to 10 weeks depending on scope, database complexity, and third-party integrations. Marketing flagships often take 3 to 5 weeks, while full enterprise SaaS platforms with multi-tenant architecture typically take 8 to 12 weeks with bi-weekly milestone deliverables.",
    },
    {
      q: "Do you build custom web applications from scratch or use templates?",
      a: "Every web platform we engineer is custom-built around your specific business objectives and brand guidelines. We don't use bloated WordPress themes or generic site builders. We write clean, high-performance TypeScript and React code with tailored design systems that you 100% own.",
    },
    {
      q: "How do you ensure our web application is fast and optimized for SEO?",
      a: "Performance is engineered into the architecture from line one. We implement server-side rendering (SSR), dynamic asset compression, edge caching via Cloudflare, and strict bundle-budgeting to achieve sub-second load times and 95+ Core Web Vitals scores across mobile and desktop devices.",
    },
    {
      q: "Can you integrate our existing third-party tools, ERPs, or CRM systems?",
      a: "Yes. We have extensive experience integrating payment gateways (Stripe, Razorpay), custom ERPs, CRMs (Salesforce, HubSpot), headless CMSs (Sanity, Strapi), and automated email notification engines via robust REST and GraphQL APIs.",
    },
    {
      q: "Who owns the codebase and intellectual property upon completion?",
      a: "You retain 100% full ownership of all code, design assets, and database schemas. Upon project completion, we push the complete repository to your GitHub/GitLab account and provide thorough documentation for seamless future maintenance.",
    },
    {
      q: "What does post-launch support and maintenance look like?",
      a: "Every project includes a 30-day post-launch warranty period where any bug fixes or adjustments are handled immediately at zero additional charge. We also offer ongoing monthly stewardship packages covering security patches, cloud monitoring, and continuous feature expansion.",
    },
  ];

  // Calculated estimate based on selections
  const estimatedSprints =
    (platformType.includes("SaaS") ? 4 : platformType.includes("Portal") ? 5 : 3) +
    (cmsType.includes("Headless") ? 1 : 0) +
    (integrationType.includes("Stripe") ? 1 : 0);

  const scopeQuery = encodeURIComponent(
    `Platform: ${platformType} | CMS: ${cmsType} | Integrations: ${integrationType} | Est. Sprints: ${estimatedSprints}`
  );

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="service-hero-stage">
        <WebTechCanvas />
        <div className="service-hero wrap">
          <div className="service-hero-copy">
            <span className="availability">
              <span className="live-indicator">
                <i />
                <span />
              </span>{" "}
              ENGINEERING &amp; ARCHITECTURE / WEB DEVELOPMENT
            </span>
            <h1>
              Web platforms built for
              <br />
              performance &amp; <em>scale.</em>
            </h1>
            <p>
              We architect bespoke web applications, enterprise portals, high-converting
              e-commerce engines, and high-performance digital flagships that convert visitors
              into lasting advocates.
            </p>
            <div className="service-hero-actions">
              <Button href="/contact?service=Web%20development">
                Start your web project
              </Button>
              <a className="text-link" href="#web-services">
                Explore capabilities <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-pill-badge">
              <Check size={14} color="#10b981" />
              <span>Full source code ownership · <strong>30-day warranty included</strong></span>
            </div>
          </div>

          {/* Interactive Web Hero Inspector */}
          <div className="inspector-window">
            <div className="inspector-header">
              <div className="inspector-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="inspector-url">
                <Globe2 size={12} />
                <span>dotcode.studio / web-architecture</span>
              </div>
              <span className="inspector-badge">LIVE 24MS</span>
            </div>

            <div className="inspector-tabs">
              <button
                className={"inspector-tab-btn " + (inspectorTab === "arch" ? "active" : "")}
                onClick={() => setInspectorTab("arch")}
              >
                <Workflow size={13} /> Architecture
              </button>
              <button
                className={"inspector-tab-btn " + (inspectorTab === "vitals" ? "active" : "")}
                onClick={() => setInspectorTab("vitals")}
              >
                <Gauge size={13} /> Core Vitals
              </button>
              <button
                className={"inspector-tab-btn " + (inspectorTab === "code" ? "active" : "")}
                onClick={() => setInspectorTab("code")}
              >
                <Terminal size={13} /> Typed API
              </button>
            </div>

            <div className="inspector-body">
              {inspectorTab === "arch" && (
                <div className="arch-flow">
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Globe2 size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Global Edge CDN</div>
                        <div className="arch-node-desc">Cloudflare 300+ PoPs · Asset Compression</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">0.02s TTFB</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Layers size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Next.js &amp; React SSR Layer</div>
                        <div className="arch-node-desc">Streaming Hydration · Strict TypeScript</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">60 FPS</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Database size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">PostgreSQL &amp; Redis Cache</div>
                        <div className="arch-node-desc">ACID Transactions · Read Replica Pool</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">12ms Query</span>
                  </div>
                </div>
              )}

              {inspectorTab === "vitals" && (
                <div className="vitals-grid">
                  <div className="vital-card">
                    <div>
                      <div className="vital-title">Performance</div>
                      <div className="vital-desc">Sub-second LCP</div>
                    </div>
                    <div className="vital-score">
                      100<small>/100</small>
                    </div>
                  </div>
                  <div className="vital-card">
                    <div>
                      <div className="vital-title">Accessibility</div>
                      <div className="vital-desc">WCAG AAA Compliance</div>
                    </div>
                    <div className="vital-score">
                      100<small>/100</small>
                    </div>
                  </div>
                  <div className="vital-card">
                    <div>
                      <div className="vital-title">Best Practices</div>
                      <div className="vital-desc">Modern web security</div>
                    </div>
                    <div className="vital-score">
                      100<small>/100</small>
                    </div>
                  </div>
                  <div className="vital-card">
                    <div>
                      <div className="vital-title">SEO Architecture</div>
                      <div className="vital-desc">JSON-LD Structured data</div>
                    </div>
                    <div className="vital-score">
                      100<small>/100</small>
                    </div>
                  </div>
                </div>
              )}

              {inspectorTab === "code" && (
                <pre className="code-preview">
                  <code>
                    <span className="code-keyword">export async function</span>{" "}
                    <span className="code-function">GET</span>(req: Request) &#123;
                    <br />
                    {"  "}<span className="code-comment">// Query cached edge response</span>
                    <br />
                    {"  "}<span className="code-keyword">const</span> data ={" "}
                    <span className="code-keyword">await</span> redis.
                    <span className="code-function">getOrSet</span>(
                    <span className="code-string">"portal:summary"</span>, () =&gt;
                    <br />
                    {"    "}db.<span className="code-function">fetchTenantMetrics</span>(&#123;
                    <br />
                    {"      "}<span className="code-prop">tenantId</span>: req.headers.
                    <span className="code-function">get</span>(<span className="code-string">"x-tenant"</span>),
                    <br />
                    {"      "}<span className="code-prop">timeoutMs</span>: 250,
                    <br />
                    {"    "}&#125;)
                    <br />
                    {"  "});
                    <br />
                    {"  "}<span className="code-keyword">return</span> Response.
                    <span className="code-function">json</span>(&#123; data, status:{" "}
                    <span className="code-string">"ok"</span> &#125;);
                    <br />
                    &#125;
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Hero Performance Metrics Strip */}
        <div className="metrics-strip">
          <div className="wrap">
            <div className="metric-item">
              <span className="metric-value">99.98<span>%</span></span>
              <span className="metric-label">Production SLA Uptime</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">&lt;0.8<span>s</span></span>
              <span className="metric-label">Core Web Vitals LCP</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">100<span>/100</span></span>
              <span className="metric-label">Lighthouse Performance</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">3.8<span>×</span></span>
              <span className="metric-label">Average Conversion Lift</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="section wrap" id="web-services">
        <div className="section-top">
          <SectionHeading
            label="CUSTOM WEB CAPABILITIES"
            title="Every layer of the web, engineered with intent."
            text="From customer-facing brand flagships to mission-critical business platforms, we engineer systems that grow with your company."
          />
          <a className="text-link" href="/contact?service=Web%20development">
            Request technical scope <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="features-grid-3x2">
          {webServices.map((service) => {
            const Icon = service.icon;
            return (
              <article className="feature-box" key={service.title}>
                <div className="feature-box-top">
                  <div className="feature-icon-badge">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="feature-num">{service.num}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="feature-tags">
                  {service.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. TECHNOLOGY STACK SECTION */}
      <section className="section wrap" id="web-stack">
        <div className="section-top">
          <SectionHeading
            label="MODERN TECH STACK"
            title="Proven frameworks. Zero legacy baggage."
            text="We select battle-tested, modern technologies tuned for maintainability, developer velocity, and enterprise reliability."
          />
        </div>

        {/* Tech category controls + Multi-Format Switcher */}
        <div className="tech-controls-bar">
          <div className="tech-tabs" role="tablist" aria-label="Technology filter">
            {[
              ["all", "All Technologies"],
              ["frontend", "Frontend & Styling"],
              ["backend", "Backend & APIs"],
              ["data", "Databases & Caching"],
              ["cloud", "Cloud & DevOps"],
            ].map(([cat, label]) => (
              <button
                key={cat}
                className={"tech-tab " + (techCategory === cat ? "active" : "")}
                onClick={() => setTechCategory(cat as any)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Multiple Format Switcher */}
          <div className="tech-format-switcher" role="group" aria-label="View layout format">
            <button
              className={"tech-format-btn " + (techFormat === "bento" ? "active" : "")}
              onClick={() => setTechFormat("bento")}
            >
              <LayoutGrid size={14} />
              <span>Bento &amp; Brand Art</span>
            </button>
            <button
              className={"tech-format-btn " + (techFormat === "benchmarks" ? "active" : "")}
              onClick={() => setTechFormat("benchmarks")}
            >
              <BarChart3 size={14} />
              <span>Live Benchmarks</span>
            </button>
            <button
              className={"tech-format-btn " + (techFormat === "specs" ? "active" : "")}
              onClick={() => setTechFormat("specs")}
            >
              <Code2 size={14} />
              <span>Architecture Specs</span>
            </button>
          </div>
        </div>

        {/* FORMAT 1: VISUAL BENTO & BRAND ART CARDS */}
        {techFormat === "bento" && (
          <div className="tech-grid">
            {filteredTech.map((tech, idx) => {
              const Logo = tech.logo;
              const isFeatured = idx === 0 && techCategory === "all";
              return (
                <div
                  className={"tech-card " + (isFeatured ? "featured-wide" : "")}
                  key={tech.name}
                >
                  <div className="tech-card-brand-row">
                    <div className="tech-brand-left">
                      <div className="tech-logo-badge">
                        <Logo size={32} />
                      </div>
                      <div className="tech-titles">
                        <h3>{tech.name}</h3>
                        <span className="tech-role-tag">{tech.roleTag}</span>
                      </div>
                    </div>
                    <span className="tech-category-pill">{tech.categoryLabel}</span>
                  </div>

                  <p style={{ fontSize: "12.5px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
                    {tech.desc}
                  </p>

                  {/* Formatted Feature Bullets */}
                  <ul className="tech-bullet-list">
                    {tech.bullets.map((b) => (
                      <li className="tech-bullet-item" key={b}>
                        <Check size={14} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Formatted Metric Banner */}
                  <div className="tech-metric-banner">
                    <div>
                      <div className="tech-metric-val">{tech.metricValue}</div>
                      <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Verified Baseline</span>
                    </div>
                    <div className="tech-metric-lbl">{tech.metricLabel}</div>
                  </div>

                  {/* Code Tag Snippet */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <code className="tech-code-pill">{tech.codeSnippet}</code>
                  </div>

                  {/* Adoption Row */}
                  <div className="tech-adoption-row">
                    <span>Adopted by:</span>
                    <strong>{tech.adoption}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FORMAT 2: LIVE PERFORMANCE BENCHMARKS VIEW */}
        {techFormat === "benchmarks" && (
          <div className="tech-benchmarks-grid">
            {filteredTech.map((tech) => {
              const Logo = tech.logo;
              return (
                <div className="benchmark-card" key={tech.name}>
                  <div className="benchmark-card-top">
                    <div className="tech-brand-left">
                      <div className="tech-logo-badge">
                        <Logo size={28} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "17px", fontWeight: 800 }}>{tech.name}</h3>
                        <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>
                          {tech.benchmark.metric}
                        </span>
                      </div>
                    </div>
                    <div className="tech-category-pill">{tech.categoryLabel}</div>
                  </div>

                  <div className="benchmark-meter-bar">
                    <div className="benchmark-meter-labels">
                      <span>Measured Latency / Speed</span>
                      <strong>{tech.benchmark.val}</strong>
                    </div>
                    <div className="benchmark-bar-track">
                      <div
                        className="benchmark-bar-fill"
                        style={{ width: `${tech.benchmark.pct}%` }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--muted)" }}>
                      <span>Efficiency Index: {tech.benchmark.pct}%</span>
                      <span>Target: {tech.benchmark.target}</span>
                    </div>
                  </div>

                  <div className="tech-bullet-list">
                    {tech.bullets.slice(0, 2).map((b) => (
                      <div className="tech-bullet-item" key={b}>
                        <Check size={14} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="tech-adoption-row">
                    <span>Enterprise Fit:</span>
                    <strong>{tech.adoption}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FORMAT 3: ARCHITECTURE CODE SPECS VIEW */}
        {techFormat === "specs" && (
          <div className="tech-specs-view">
            <div className="specs-nav-list">
              <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", paddingLeft: "8px" }}>
                Select Architecture Module
              </span>
              {filteredTech.map((tech, idx) => {
                const Logo = tech.logo;
                return (
                  <button
                    key={tech.name}
                    className={"specs-nav-btn " + (activeSpecIndex === idx ? "active" : "")}
                    onClick={() => setActiveSpecIndex(idx)}
                  >
                    <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center" }}>
                      <Logo size={20} />
                    </div>
                    <span>{tech.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="specs-terminal">
              {filteredTech[activeSpecIndex] && (
                <>
                  <div className="specs-terminal-top">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                      <strong style={{ color: "var(--ink)", fontFamily: "Manrope, sans-serif" }}>
                        {filteredTech[activeSpecIndex].name} Production Config
                      </strong>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>
                      {filteredTech[activeSpecIndex].categoryLabel}
                    </span>
                  </div>

                  <pre style={{ margin: 0, color: "#38bdf8", fontSize: "12px", lineHeight: 1.7, overflowX: "auto" }}>
                    {filteredTech[activeSpecIndex].specCode}
                  </pre>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase" }}>Hardware Metric</span>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--accent)" }}>
                        {filteredTech[activeSpecIndex].metricValue}
                      </div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase" }}>Target Baseline</span>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>
                        {filteredTech[activeSpecIndex].metricLabel}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 4. DEVELOPMENT PROCESS SECTION */}
      <section className="section wrap" id="web-process">
        <div className="section-top">
          <SectionHeading
            label="DELIVERY METHODOLOGY"
            title="Predictable velocity from wireframe to deployment."
            text="A milestone-driven lifecycle designed for transparency, rapid feedback, and zero launch surprises."
          />
        </div>

        <div className="roadmap-container">
          {processSteps.map((step) => (
            <article className="roadmap-card" key={step.title}>
              <div className="roadmap-num">{step.num}</div>
              <div className="roadmap-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <div className="roadmap-meta">
                {step.deliverables.map((del) => (
                  <div className="roadmap-deliverable" key={del}>
                    <Check size={14} />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. FEATURES / BENEFITS SECTION */}
      <section className="section wrap" id="web-features">
        <div className="section-top">
          <SectionHeading
            label="THE VALUE PROPOSITION"
            title="Engineered for outcomes, not just aesthetics."
            text="We design interfaces that look stunning and back them with rock-solid software engineering."
          />
        </div>

        <div className="features-grid-3x2">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div className="feature-box" key={feat.title}>
                <div className="feature-box-top">
                  <div className="feature-icon-badge">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="feature-num">{feat.num}</span>
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.text}</p>
                <div className="feature-tags">
                  {feat.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Design System & Architecture Studio Visual Banner */}
        <div className="studio-feature-banner">
          <div className="feature-banner-media">
            <ThemeImage
              variant="workspace"
              alt="DigentTech engineering workspace and architectural design system tokens"
            />
          </div>
          <div className="feature-banner-copy">
            <span className="eyebrow">DESIGN SYSTEMS &amp; ARCHITECTURE</span>
            <h3>From Figma components to typed production code.</h3>
            <p>
              We bridge visual brand identity and cloud engineering. Every token, breakpoint,
              and interactive state is engineered with rigorous accessibility and strict TypeScript contracts.
            </p>
            <div className="feature-tags">
              <span>Figma Tokens</span>
              <span>WCAG AAA Accessible</span>
              <span>Full Codebase Ownership</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECT SHOWCASE SECTION */}
      <section className="section wrap" id="web-showcase">
        <div className="section-top">
          <SectionHeading
            label="PROJECT SHOWCASE"
            title="Recent web platforms in production."
            text="Real interfaces. Real business problems. A few platforms we have designed and built."
          />
          <a className="text-link" href="/work">
            View full portfolio <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="showcase-featured-grid">
          {showcaseProjects.map((p, i) => (
            <article className="showcase-card" key={p.name}>
              <div className="showcase-media">
                <span className="showcase-media-tag">{p.type}</span>
                <img src={p.image} alt={p.name + " platform screenshot"} loading="lazy" />
              </div>
              <div className="showcase-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>

                <div className="showcase-stats-row">
                  {p.impact.map((stat) => (
                    <div className="showcase-stat-item" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="feature-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <button
                  className="button"
                  style={{ marginTop: "14px", alignSelf: "flex-start" }}
                  onClick={() => setSelectedProject(i)}
                >
                  Inspect Case Study
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for project deep-dive */}
        {selectedProject !== null && (
          <div className="modal-shade" onClick={() => setSelectedProject(null)}>
            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-label={showcaseProjects[selectedProject].name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="icon-button close-modal"
                aria-label="Close project modal"
                autoFocus
                onClick={() => setSelectedProject(null)}
              >
                <X />
              </button>
              <span className="eyebrow">
                {showcaseProjects[selectedProject].type}
              </span>
              <h2>{showcaseProjects[selectedProject].name}</h2>
              <img
                src={showcaseProjects[selectedProject].image}
                alt={showcaseProjects[selectedProject].name + " preview"}
              />
              <p>{showcaseProjects[selectedProject].detail}</p>
              <div className="tags">
                {showcaseProjects[selectedProject].tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Button href={"/contact?service=Web%20development&brief=" + encodeURIComponent("I would like to discuss a platform similar to " + showcaseProjects[selectedProject].name)}>
                Discuss a similar web build
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* INTERACTIVE SCOPE ESTIMATOR (CONVERSION CATALYST) */}
      <section className="section wrap" id="web-estimator">
        <div className="section-top">
          <SectionHeading
            label="PROJECT ESTIMATOR"
            title="Configure your web architecture."
            text="Select your specifications to see an instant sprint estimate and pre-fill your project brief."
          />
        </div>

        <div className="scope-estimator-box">
          <div className="estimator-grid">
            <div className="estimator-options">
              <div>
                <div className="estimator-group-title">1. PLATFORM TYPE</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {["SaaS & Web App", "Enterprise Operations Portal", "Marketing Flagship", "Headless E-Commerce"].map((t) => (
                    <button
                      key={t}
                      className={"estimator-chip " + (platformType === t ? "active" : "")}
                      onClick={() => setPlatformType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="estimator-group-title">2. CONTENT INFRASTRUCTURE</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {["Headless CMS (Sanity)", "Static Markdown", "Dynamic Database Only"].map((c) => (
                    <button
                      key={c}
                      className={"estimator-chip " + (cmsType === c ? "active" : "")}
                      onClick={() => setCmsType(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="estimator-group-title">3. ESSENTIAL INTEGRATIONS</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {["Stripe & Auth", "Custom ERP / CRM Sync", "Analytics & Marketing Automation", "Standard REST APIs"].map((i) => (
                    <button
                      key={i}
                      className={"estimator-chip " + (integrationType === i ? "active" : "")}
                      onClick={() => setIntegrationType(i)}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="estimator-output">
              <span className="eyebrow">ESTIMATED PROJECT ROADMAP</span>
              <div className="estimator-output-stat">
                <span>Estimated Duration:</span>
                <strong>{estimatedSprints} Sprints (~{estimatedSprints * 2} wks)</strong>
              </div>
              <div className="estimator-output-stat">
                <span>Delivery Cadence:</span>
                <strong style={{ fontSize: "16px", color: "var(--ink)" }}>Bi-weekly releases</strong>
              </div>
              <div className="estimator-output-stat" style={{ borderBottom: "0", paddingBottom: "0" }}>
                <span>Code Ownership:</span>
                <strong style={{ fontSize: "16px", color: "#10b981" }}>100% Client IP</strong>
              </div>
              <Button href={"/contact?service=Web%20development&brief=" + scopeQuery}>
                Build my starting brief
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="section wrap faq" id="web-faq">
        <SectionHeading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Everything you need to know about our web development."
          text="Clear answers to technical, timeline, and pricing questions."
        />

        <div>
          {faqItems.map((item, i) => (
            <article key={item.q}>
              <button
                aria-expanded={openFaq === i}
                aria-controls={"faq-" + i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {openFaq === i && <p id={"faq-" + i}>{item.a}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="service-cta-panel">
        <div className="wrap service-cta-inner">
          <span className="eyebrow">LET'S ARCHITECT YOUR WEB PLATFORM</span>
          <h2>
            Ready to turn your web presence into an
            <br />
            unfair <em>advantage?</em>
          </h2>
          <p>
            An idea on a sketch. A slow legacy portal that needs a rebuild. A SaaS product
            scaling to thousands of users. We are ready to take your technical vision to the next level.
          </p>
          <div className="service-cta-badges">
            <div className="service-cta-badge-item">
              <Check size={14} />
              <span>Kickoff within 7 business days</span>
            </div>
            <div className="service-cta-badge-item">
              <Check size={14} />
              <span>Full source code ownership</span>
            </div>
            <div className="service-cta-badge-item">
              <Check size={14} />
              <span>30-day post-launch warranty</span>
            </div>
          </div>
          <div className="service-cta-buttons">
            <Button href="/contact?service=Web%20development">
              Start a web project
            </Button>
            <a className="text-link" href="mailto:hr.digenttech@gmail.com?subject=Web%20Development%20Inquiry">
              Email engineering team <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
