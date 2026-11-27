import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  Code2,
  Database,
  Gauge,
  Globe2,
  Layers,
  LayoutGrid,
  Minus,
  Plus,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from "lucide-react";
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

gsap.registerPlugin(ScrollTrigger);

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

interface TechStackItem {
  name: string;
  roleTag: string;
  logo: React.ComponentType<{ size?: number }>;
  category: "frontend" | "backend" | "data" | "cloud";
  categoryLabel: string;
  desc: string;
  bullets: string[];
  metricValue: string;
  metricLabel: string;
  codeSnippet: string;
  adoption: string;
  advantage: string;
  benchmark: { metric: string; val: string; target: string; pct: number };
  specCode: string;
}

const WEB_SERVICES = [
  {
    num: "01",
    icon: Layers,
    title: "Custom Full-Stack Web Applications",
    text: "Bespoke SaaS platforms, multi-tenant B2B portals, and real-time operational dashboards architected with clean TypeScript contracts and modular state systems.",
    tags: ["Next.js / React SSR", "Multi-tenant Auth", "Real-time Dashboards"],
  },
  {
    num: "02",
    icon: Globe2,
    title: "High-Converting Business Websites",
    text: "Tailored brand flagships and landing architectures engineered for visual persuasion, sub-second routing, mobile clarity, and measurable conversion velocity.",
    tags: ["Conversion UX", "Sub-second Load", "Fluid Motion"],
  },
  {
    num: "03",
    icon: Zap,
    title: "Headless E-Commerce Storefronts",
    text: "Decoupled storefronts powered by Shopify Plus or Stripe Checkout with edge inventory filtering, instant cart state, and frictionless multi-currency checkout.",
    tags: ["Shopify Headless", "Stripe Checkout", "Edge Inventory"],
  },
  {
    num: "04",
    icon: LayoutGrid,
    title: "Flexible Headless CMS Ecosystems",
    text: "Editorial platforms on Sanity, Strapi, or headless WordPress empowering marketing teams to ship campaigns and rich pages cleanly without developer queues.",
    tags: ["Sanity / Strapi", "Headless WP", "Live Previews"],
  },
  {
    num: "05",
    icon: Bot,
    title: "AI Integrations & API Orchestration",
    text: "Native LLM copilots, RAG knowledge pipelines, CRM/ERP webhook sync, and resilient GraphQL/REST backends built directly into your core product.",
    tags: ["OpenAI / Gemini APIs", "RAG Pipelines", "Webhook Automation"],
  },
  {
    num: "06",
    icon: Gauge,
    title: "Technical SEO, Speed & Security Audits",
    text: "Systematic Core Web Vitals profiling, OWASP hardening, JSON-LD structured schema markup, bundle tree-shaking, and end-to-end Playwright verification.",
    tags: ["Core Web Vitals 100", "OWASP Compliance", "JSON-LD SEO"],
  },
];

const TECH_STACK: TechStackItem[] = [
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
      "Dynamic dark/light token variables",
      "Zero CSS-in-JS runtime execution overhead",
    ],
    metricValue: "12.4 KB",
    metricLabel: "Critical CSS Gzip Size",
    codeSnippet: "className='clay-card hover:scale-[1.01]'",
    adoption: "OpenAI · Shopify · Twitch · GitHub",
    advantage: "Under 15kb critical CSS payload",
    benchmark: { metric: "CSS Parse & Paint", val: "4.2ms", target: "16.0ms Target", pct: 97 },
    specCode: `// tokens.config.ts\nexport const surfaceTokens = {\n  dark: '#060812',\n  light: '#F5F4EB',\n  accent: '#38BDF8'\n};`,
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
    specCode: `// wrangler.toml\nname = "digenttech-edge-gateway"\nmain = "src/worker.ts"\ncompatibility_date = "2026-10-01"`,
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

const COMPARISON_ROWS = [
  {
    criterion: "Page Load & First Byte Speed",
    digent: "Edge SSR + sub-50ms TTFB targeting 95–100 Core Web Vitals",
    legacy: "Render-blocking theme scripts and bloated plugin waterfalls",
  },
  {
    criterion: "Code & IP Ownership",
    digent: "100% clean TypeScript repo transferred directly to your GitHub",
    legacy: "Vendor-locked builders with fragile proprietary shortcodes",
  },
  {
    criterion: "Security & Authentication",
    digent: "OWASP headers, parameterized SQL, RBAC & zero vulnerable plugin soup",
    legacy: "Frequent third-party extension patches & exposed admin surfaces",
  },
  {
    criterion: "Conversion & SEO Structure",
    digent: "Semantic HTML5, JSON-LD rich snippets & GSAP-tuned visual hierarchy",
    legacy: "Div-heavy DOM bloat hurting mobile UX and crawl budgets",
  },
  {
    criterion: "Scalability & AI Readiness",
    digent: "Modular APIs ready for LLM copilots, ERP webhooks & traffic spikes",
    legacy: "Structural rewrites required the moment custom logic grows",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    phase: "WEEK 1",
    title: "Discovery & Technical Goals",
    desc: "We align on target users, conversion benchmarks, existing systems, and core scope before a single line of code is written.",
    deliverables: ["Business & UX alignment brief", "Audit of legacy bottlenecks", "Milestone release map"],
  },
  {
    num: "02",
    phase: "WEEK 1–2",
    title: "Planning & System Blueprint",
    desc: "We finalize database entity relationships, API contracts, hosting topology, and sprint acceptance criteria with total clarity.",
    deliverables: ["Database & API schema spec", "Cloud & edge architecture map", "Sprint delivery schedule"],
  },
  {
    num: "03",
    phase: "WEEK 2–3",
    title: "UI/UX Design & Prototypes",
    desc: "We translate architecture into responsive wireframes, token systems, and accessible brand interfaces validated interactively.",
    deliverables: ["Design token foundation", "Responsive component layouts", "Revision rounds locked"],
  },
  {
    num: "04",
    phase: "WEEKS 3–6",
    title: "Full-Stack Development",
    desc: "We engineer modular TypeScript components, reactive frontends, and resilient backend APIs with continuous staging previews.",
    deliverables: ["Typed React / Next.js frontend", "Backend APIs & CMS wiring", "Weekly live staging links"],
  },
  {
    num: "05",
    phase: "WEEK 6–7",
    title: "QA, Cross-Browser & Security Testing",
    desc: "Every flow passes automated Playwright suites, mobile responsiveness checks, OWASP security scans, and speed remediation.",
    deliverables: ["E2E Playwright regression suite", "OWASP security checklist", "Core Web Vitals sign-off"],
  },
  {
    num: "06",
    phase: "LAUNCH + ONGOING",
    title: "CI/CD Launch & Maintenance",
    desc: "Zero-downtime edge DNS cutover, live telemetry monitoring, Git repository handover, and proactive ongoing stewardship.",
    deliverables: ["Zero-downtime edge deploy", "100% repo & IP handover", "30-day warranty + SLA option"],
  },
];

const FEATURES = [
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
    tags: ["Frictionless Funnels", "Ergonomic Flows", "Clear Hierarchy"],
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    text: "Rigorous input sanitization, CSRF verification, encrypted environment secrets, and strict HTTPS header policies baked in from day one.",
    tags: ["OWASP Compliant", "End-to-End Encryption", "Role-based Auth"],
  },
  {
    num: "04",
    icon: Code2,
    title: "Modular, Fully Typed Codebase",
    text: "Built with strict TypeScript schemas and reusable component hierarchies, making it straightforward for your in-house engineers to scale.",
    tags: ["TypeScript Strict", "Component Library", "Zero Tech Debt"],
  },
  {
    num: "05",
    icon: Search,
    title: "Technical SEO & Schema Markup",
    text: "Dynamic OpenGraph metadata, rich JSON-LD schema markup, semantic landmark structure, and crawl-ready routing out of the box.",
    tags: ["Semantic HTML5", "JSON-LD Schema", "Sitemap Automation"],
  },
  {
    num: "06",
    icon: Workflow,
    title: "Autonomous Content Management",
    text: "Integrate headless CMS dashboards (Sanity, Strapi, WP) allowing teams to publish pages and campaigns independently.",
    tags: ["Headless CMS", "Live Previews", "Role Permissions"],
  },
];

const SHOWCASE_PROJECTS = [
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
    desc: "High-frequency WebGL trading and liquidity terminal processing 140k+ TPS with sub-2ms edge latency and tactile controls.",
    impact: [
      { label: "Edge Latency", value: "1.4ms" },
      { label: "Daily Volume", value: "$420M+" },
      { label: "Uptime SLA", value: "99.999%" },
    ],
    tags: ["WebGL", "WebSockets", "Rust Wasm", "Next.js", "TypeScript"],
    detail:
      "Built for institutional liquidity providers, QuantOS features a hardware-accelerated WebGL candle engine, sub-millisecond orderbook delta feeds via WebSocket clusters, and resilient execution modules.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How long does a custom web development project typically take?",
    a: "Most custom marketing flagships deliver in 3 to 5 weeks, while multi-tenant SaaS platforms, headless stores, and enterprise portals require 6 to 10 weeks with bi-weekly live staging releases.",
  },
  {
    q: "Do you build custom web applications from scratch or use templates?",
    a: "Every platform we engineer is custom-built around your business logic and brand guidelines. We do not rely on bloated themes or rigid page builders — you receive clean, typed TypeScript and React code that scales effortlessly.",
  },
  {
    q: "How do you collaborate with remote clients across different time zones?",
    a: "We operate remote-first across India, North America, Europe, and UAE time zones with structured async Loom walkthroughs, live staging URLs after every milestone, and overlapping weekly engineering syncs.",
  },
  {
    q: "How are design revisions and scope feedback handled?",
    a: "Each design and prototype phase includes structured revision rounds mapped upfront alongside interactive clickable previews, ensuring visual alignment before full-stack implementation locks.",
  },
  {
    q: "How do you ensure fast loading speeds and strong technical SEO?",
    a: "Speed and search readiness are built into the foundation: server-side rendering, image AVIF/WebP compression, global edge caching via Cloudflare, semantic HTML5 headings, and JSON-LD schema markup targeting 95–100 Core Web Vitals.",
  },
  {
    q: "Can you integrate AI copilots, payment gateways, CRMs, or existing ERPs?",
    a: "Yes. We routinely wire OpenAI/Gemini AI workflows, Stripe and Razorpay payments, HubSpot/Salesforce CRMs, custom ERPs, and headless CMS tools over documented REST and GraphQL contracts.",
  },
  {
    q: "Who owns the codebase and what post-launch support do we get?",
    a: "You retain 100% ownership of all source code, design tokens, and cloud infrastructure pushed directly to your GitHub/GitLab organization, backed by a 30-day post-launch warranty and optional monthly care SLA.",
  },
];

export function WebDevelopment() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  const [inspectorTab, setInspectorTab] = useState<"arch" | "vitals" | "code">("arch");
  const [techCategory, setTechCategory] = useState<"all" | "frontend" | "backend" | "data" | "cloud">("all");
  const [techFormat, setTechFormat] = useState<"bento" | "benchmarks" | "specs">("bento");
  const [activeSpecIndex, setActiveSpecIndex] = useState<number>(0);
  const [activeProcessIdx, setActiveProcessIdx] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Scope Estimator state
  const [platformType, setPlatformType] = useState("SaaS & Web App");
  const [cmsType, setCmsType] = useState("Headless CMS (Sanity)");
  const [integrationType, setIntegrationType] = useState("Stripe & Auth");

  const filteredTech = useMemo(
    () =>
      techCategory === "all"
        ? TECH_STACK
        : TECH_STACK.filter((t) => t.category === techCategory),
    [techCategory]
  );

  // Calculated estimate based on selections
  const estimatedSprints = useMemo(() => {
    const base = platformType.includes("SaaS")
      ? 4
      : platformType.includes("Portal")
      ? 5
      : platformType.includes("E-Commerce")
      ? 4
      : 2;
    const cmsBonus = cmsType.includes("AI") ? 2 : cmsType.includes("Headless") ? 1 : 0;
    const integrationBonus = integrationType.includes("ERP")
      ? 2
      : integrationType.includes("Stripe") || integrationType.includes("Edge")
      ? 1
      : 0;
    return base + cmsBonus + integrationBonus;
  }, [platformType, cmsType, integrationType]);

  const recommendedStack = useMemo(() => {
    const core = platformType.includes("Website") ? "Next.js 15 · Tailwind · GSAP" : "Next.js 15 · TypeScript · PostgreSQL";
    const layer = cmsType.includes("AI") ? " · Gemini/OpenAI · Sanity" : cmsType.includes("Headless") ? " · Sanity CMS" : "";
    return core + layer + " · Cloudflare Edge";
  }, [platformType, cmsType]);

  const scopeQuery = encodeURIComponent(
    `Platform: ${platformType} | Content/AI: ${cmsType} | Integrations: ${integrationType} | Est. Sprints: ${estimatedSprints}`
  );

  // 1. Full-page GSAP + ScrollTrigger Choreography
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: fine)").matches;

    if (prefersReduced) {
      return;
    }

    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Hero entrance timeline (fires cleanly above the fold without trapping hidden elements)
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          ".wd-hero-badge",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, clearProps: "transform,opacity" }
        )
        .fromTo(
          ".wd-hero-title-line",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.62,
            stagger: 0.1,
            clearProps: "transform,opacity",
          },
          "-=0.22"
        )
        .fromTo(
          ".wd-hero-lead, .service-hero-actions, .hero-pill-badge",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          "-=0.35"
        )
        .fromTo(
          ".inspector-window",
          { y: 28, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.65,
            clearProps: "transform,opacity",
          },
          "-=0.5"
        )
        .fromTo(
          ".metric-item",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            stagger: 0.07,
            clearProps: "transform,opacity",
          },
          "-=0.3"
        );

      // Metric value roll-ups on scroll / entry
      gsap.utils.toArray<HTMLElement>("[data-wd-counter]", root).forEach((el) => {
        const target = Number(el.dataset.wdCounter || "0");
        const decimals = Number(el.dataset.wdDecimals || "0");
        const prefix = el.dataset.wdPrefix || "";
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.05,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = prefix + obj.val.toFixed(decimals);
              },
            });
          },
        });
      });

      // Section headings reveal (immediateRender: false prevents offscreen blank traps on anchor jumps)
      gsap.utils.toArray<HTMLElement>(".wd-section-reveal", root).forEach((secHead) => {
        gsap.fromTo(
          secHead,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.56,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: secHead,
              start: "top 95%",
              once: true,
            },
          }
        );
      });

      // Batch card choreography across grids
      const batchGroups = [
        "#web-services .feature-box",
        "#web-compare .wd-compare-card",
        "#web-features .feature-box",
        "#web-showcase .showcase-card",
        "#web-faq article",
      ];

      batchGroups.forEach((selector) => {
        const items = gsap.utils.toArray<HTMLElement>(selector, root);
        if (!items.length) return;
        ScrollTrigger.batch(items, {
          start: "top 96%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 26, scale: 0.985, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.52,
                stagger: 0.055,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      });

      // 6-stage Process Rail Scrubbed Fill + Stage Reveal
      const processContainer = root.querySelector<HTMLElement>(".wd-process-wrapper");
      const railFill = root.querySelector<HTMLElement>(".wd-process-rail-fill");
      const processCards = gsap.utils.toArray<HTMLElement>("#web-process .roadmap-card", root);

      if (processContainer && railFill) {
        gsap.fromTo(
          railFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: processContainer,
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.35,
            },
          }
        );
      }

      if (processCards.length) {
        ScrollTrigger.batch(processCards, {
          start: "top 96%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { x: -16, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      }

      // Studio Workbench subtle scroll parallax
      const workbenchImg = root.querySelector<HTMLElement>(".feature-banner-media img");
      if (workbenchImg) {
        gsap.fromTo(
          workbenchImg,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".studio-feature-banner",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }

      // Scope Estimator box entrance
      const estimatorBox = root.querySelector<HTMLElement>(".scope-estimator-box");
      if (estimatorBox) {
        gsap.fromTo(
          estimatorBox,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: estimatorBox,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // CTA Stage entrance
      const ctaInner = root.querySelector<HTMLElement>(".service-cta-inner");
      if (ctaInner) {
        gsap.fromTo(
          ctaInner.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: ctaInner,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // Desktop fine-pointer micro-interactions: cursor spotlight + magnetic CTAs + inspector subtle tilt
      if (isFinePointer) {
        const spotlightCards = gsap.utils.toArray<HTMLElement>(
          ".feature-box, .tech-card, .wd-compare-card",
          root
        );
        spotlightCards.forEach((card) => {
          const onMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mx", `${px.toFixed(1)}%`);
            card.style.setProperty("--my", `${py.toFixed(1)}%`);
          };
          card.addEventListener("pointermove", onMove);
          cleanupFns.push(() => card.removeEventListener("pointermove", onMove));
        });

        const magneticBtns = gsap.utils.toArray<HTMLElement>(".wd-magnetic", root);
        magneticBtns.forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const rect = btn.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
            const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.14;
            xTo(Math.max(-9, Math.min(9, dx)));
            yTo(Math.max(-9, Math.min(9, dy)));
          };
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
          };
          btn.addEventListener("pointermove", onMove);
          btn.addEventListener("pointerleave", onLeave);
          cleanupFns.push(() => {
            btn.removeEventListener("pointermove", onMove);
            btn.removeEventListener("pointerleave", onLeave);
          });
        });

        const inspector = heroVisualRef.current;
        if (inspector) {
          const rxTo = gsap.quickTo(inspector, "rotationY", { duration: 0.45, ease: "power2.out" });
          const ryTo = gsap.quickTo(inspector, "rotationX", { duration: 0.45, ease: "power2.out" });
          const onMove = (e: PointerEvent) => {
            const r = inspector.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            rxTo(nx * 4.5);
            ryTo(-ny * 4.5);
          };
          const onLeave = () => {
            rxTo(0);
            ryTo(0);
          };
          inspector.addEventListener("pointermove", onMove);
          inspector.addEventListener("pointerleave", onLeave);
          cleanupFns.push(() => {
            inspector.removeEventListener("pointermove", onMove);
            inspector.removeEventListener("pointerleave", onLeave);
          });
        }
      }
    }, root);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  // 2. Smooth GSAP transition when Hero Inspector tab switches
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".inspector-body > *",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.34,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [inspectorTab]);

  // 3. Smooth GSAP choreography on Tech Stack category or view-format switch + animated bars
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(
        ".tech-card, .benchmark-card, .tech-specs-view",
        root
      );
      if (targets.length) {
        gsap.fromTo(
          targets,
          { y: 18, scale: 0.985, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.42,
            stagger: 0.045,
            ease: "power2.out",
            clearProps: "transform,opacity",
          }
        );
      }

      const bars = gsap.utils.toArray<HTMLElement>(".benchmark-bar-fill", root);
      bars.forEach((bar) => {
        const targetPct = bar.dataset.pct || "90";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${targetPct}%`,
            duration: 0.72,
            ease: "power3.out",
          }
        );
      });
    }, root);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [techCategory, techFormat]);

  // Refresh ScrollTrigger when FAQ expands/collapses
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [openFaq]);

  // 4. GSAP pulse when estimator selections change
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wd-est-pulse",
        { scale: 0.96, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.32, stagger: 0.04, ease: "back.out(1.7)" }
      );
    }, root);

    return () => ctx.revert();
  }, [platformType, cmsType, integrationType]);

  // 5. GSAP entrance when showcase modal opens
  useEffect(() => {
    const root = rootRef.current;
    if (!root || selectedProject === null) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-modal",
        { y: 26, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.36,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [selectedProject]);

  return (
    <div ref={rootRef} className="wd-page">
      {/* 1. HERO SECTION */}
      <section className="service-hero-stage" id="top">
        <WebTechCanvas />
        <div className="service-hero wrap">
          <div className="service-hero-copy">
            <span className="availability wd-hero-badge">
              <span className="live-indicator">
                <i />
                <span />
              </span>{" "}
              ENGINEERING &amp; ARCHITECTURE / WEB DEVELOPMENT
            </span>
            <h1>
              <span className="wd-hero-title-line">Web platforms built for</span>
              <span className="wd-hero-title-line">
                performance &amp; <em>scale.</em>
              </span>
            </h1>
            <p className="wd-hero-lead">
              We architect bespoke web applications, SaaS platforms, headless e-commerce engines,
              and high-converting brand websites engineered for speed, security, and measurable conversion.
            </p>
            <div className="service-hero-actions">
              <div className="wd-magnetic">
                <Button href="/contact?service=Web%20development">
                  Start your web project
                </Button>
              </div>
              <a className="text-link wd-magnetic" href="#web-services">
                Explore capabilities <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-pill-badge">
              <Check size={14} color="#10b981" />
              <span>
                100% source code ownership · Remote across global time zones ·{" "}
                <strong>30-day warranty</strong>
              </span>
            </div>
          </div>

          {/* Interactive Web Hero Inspector */}
          <div className="inspector-window wd-hero-inspector-wrap" ref={heroVisualRef}>
            <div className="inspector-header">
              <div className="inspector-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="inspector-url">
                <Globe2 size={12} />
                <span>digenttech.dev / web-architecture</span>
              </div>
              <span className="inspector-badge">LIVE 24MS</span>
            </div>

            <div className="inspector-tabs" role="tablist" aria-label="Architecture preview views">
              <button
                type="button"
                role="tab"
                aria-selected={inspectorTab === "arch"}
                className={"inspector-tab-btn " + (inspectorTab === "arch" ? "active" : "")}
                onClick={() => setInspectorTab("arch")}
              >
                <Workflow size={13} /> Architecture
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inspectorTab === "vitals"}
                className={"inspector-tab-btn " + (inspectorTab === "vitals" ? "active" : "")}
                onClick={() => setInspectorTab("vitals")}
              >
                <Gauge size={13} /> Core Vitals
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inspectorTab === "code"}
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
                        <div className="arch-node-desc">Cloudflare 300+ PoPs · AVIF &amp; Brotli</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">28ms TTFB</span>
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
                    <span className="arch-node-stat">60 FPS UI</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Database size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">PostgreSQL, Redis &amp; AI Layer</div>
                        <div className="arch-node-desc">ACID Replica Pool · Vector RAG Hooks</div>
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
                      <div className="vital-desc">WCAG AA/AAA Contrast</div>
                    </div>
                    <div className="vital-score">
                      100<small>/100</small>
                    </div>
                  </div>
                  <div className="vital-card">
                    <div>
                      <div className="vital-title">Security</div>
                      <div className="vital-desc">OWASP &amp; CSP Hardened</div>
                    </div>
                    <div className="vital-score">
                      100<small>/100</small>
                    </div>
                  </div>
                  <div className="vital-card">
                    <div>
                      <div className="vital-title">Technical SEO</div>
                      <div className="vital-desc">JSON-LD &amp; Semantic DOM</div>
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
                    {"  "}<span className="code-comment">// Cached multi-region edge query</span>
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

        {/* Metrics Strip */}
        <div className="metrics-strip">
          <div className="wrap">
            <div className="metric-item">
              <div className="metric-value">
                <span data-wd-counter="100" data-wd-decimals="0">100</span>
                <span>/100</span>
              </div>
              <div className="metric-label">Core Web Vitals &amp; Technical SEO Target</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">
                &lt; <span data-wd-counter="50" data-wd-decimals="0">50</span>
                <span>ms</span>
              </div>
              <div className="metric-label">Global Edge Time-to-First-Byte (TTFB)</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">
                <span data-wd-counter="99.99" data-wd-decimals="2">99.99</span>
                <span>%</span>
              </div>
              <div className="metric-label">Production Uptime SLA &amp; Zero-Downtime Deploys</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">
                <span data-wd-counter="100" data-wd-decimals="0">100</span>
                <span>%</span>
              </div>
              <div className="metric-label">Clean TypeScript Repository &amp; IP Ownership</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES & SERVICES GRID */}
      <section className="section wrap" id="web-services">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="CUSTOM WEB CAPABILITIES"
            title="Every layer of the web, engineered with intent."
            text="From high-converting brand websites to AI-native SaaS portals and headless commerce, built cleanly from the architecture up."
          />
          <a className="text-link wd-magnetic" href="/contact?service=Web%20development">
            Request technical scope <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="features-grid-3x2">
          {WEB_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article className="feature-box wd-spotlight-card" key={service.title}>
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

      {/* 3. INTERACTIVE TECHNOLOGY STACK SECTION */}
      <section className="section wrap" id="web-stack">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="MODERN TECH STACK"
            title="Proven frameworks. Zero legacy baggage."
            text="Switch between architectural overview cards, measured runtime benchmarks, and real production configuration files."
          />
        </div>

        <div className="tech-controls-bar">
          <div className="tech-tabs" role="tablist" aria-label="Technology category filter">
            {(
              [
                ["all", "All Technologies"],
                ["frontend", "Frontend & Styling"],
                ["backend", "Backend & APIs"],
                ["data", "Databases & Caching"],
                ["cloud", "Cloud & DevOps"],
              ] as const
            ).map(([cat, label]) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={techCategory === cat}
                className={"tech-tab " + (techCategory === cat ? "active" : "")}
                onClick={() => {
                  setTechCategory(cat);
                  setActiveSpecIndex(0);
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="tech-format-switcher" role="group" aria-label="View layout format">
            <button
              type="button"
              className={"tech-format-btn " + (techFormat === "bento" ? "active" : "")}
              onClick={() => setTechFormat("bento")}
            >
              <LayoutGrid size={14} />
              <span>Bento &amp; Brand Art</span>
            </button>
            <button
              type="button"
              className={"tech-format-btn " + (techFormat === "benchmarks" ? "active" : "")}
              onClick={() => setTechFormat("benchmarks")}
            >
              <BarChart3 size={14} />
              <span>Live Benchmarks</span>
            </button>
            <button
              type="button"
              className={"tech-format-btn " + (techFormat === "specs" ? "active" : "")}
              onClick={() => setTechFormat("specs")}
            >
              <Code2 size={14} />
              <span>Architecture Specs</span>
            </button>
          </div>
        </div>

        {techFormat === "bento" && (
          <div className="tech-grid">
            {filteredTech.map((tech, idx) => {
              const Logo = tech.logo;
              const isFeatured = idx === 0 && techCategory === "all";
              return (
                <div
                  className={"tech-card wd-spotlight-card " + (isFeatured ? "featured-wide" : "")}
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

                  <p className="wd-tech-desc">{tech.desc}</p>

                  <ul className="tech-bullet-list">
                    {tech.bullets.map((b) => (
                      <li className="tech-bullet-item" key={b}>
                        <Check size={14} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="tech-metric-banner">
                    <div>
                      <div className="tech-metric-val">{tech.metricValue}</div>
                      <span className="wd-verified-tag">Verified Baseline</span>
                    </div>
                    <div className="tech-metric-lbl">{tech.metricLabel}</div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <code className="tech-code-pill">{tech.codeSnippet}</code>
                  </div>

                  <div className="tech-adoption-row">
                    <span>Adopted by:</span>
                    <strong>{tech.adoption}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
                        data-pct={tech.benchmark.pct}
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

        {techFormat === "specs" && (
          <div className="tech-specs-view">
            <div className="specs-nav-list">
              <span className="wd-specs-nav-label">Select Architecture Module</span>
              {filteredTech.map((tech, idx) => {
                const Logo = tech.logo;
                return (
                  <button
                    key={tech.name}
                    type="button"
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
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#10b981",
                        }}
                      />
                      <strong style={{ color: "var(--ink)", fontFamily: "Manrope, sans-serif" }}>
                        {filteredTech[activeSpecIndex].name} Production Config
                      </strong>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>
                      {filteredTech[activeSpecIndex].categoryLabel}
                    </span>
                  </div>

                  <pre className="wd-specs-code">{filteredTech[activeSpecIndex].specCode}</pre>

                  <div className="wd-specs-stats-grid">
                    <div className="wd-specs-stat-card">
                      <span>Hardware Metric</span>
                      <strong>{filteredTech[activeSpecIndex].metricValue}</strong>
                    </div>
                    <div className="wd-specs-stat-card">
                      <span>Target Baseline</span>
                      <div className="wd-specs-stat-sub">
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

      {/* 4. CUSTOM ENGINEERING VS TEMPLATE DEBT COMPARISON */}
      <section className="section wrap" id="web-compare">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="ARCHITECTURAL DIFFERENCE"
            title="Why high-growth teams outgrow generic templates."
            text="Comparing DigentTech custom engineering against commodity themes and plugin-heavy site builders."
          />
        </div>

        <div className="wd-compare-grid">
          <article className="wd-compare-card wd-compare-pro wd-spotlight-card">
            <div className="wd-compare-head">
              <span className="wd-compare-tag pro">
                <Sparkles size={13} /> DIGENTTECH CUSTOM STACK
              </span>
              <h3>Built to compound performance</h3>
            </div>
            <ul className="wd-compare-list">
              {COMPARISON_ROWS.map((row) => (
                <li key={row.criterion}>
                  <div className="wd-compare-icon pro">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong>{row.criterion}</strong>
                    <p>{row.digent}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="wd-compare-card wd-compare-legacy wd-spotlight-card">
            <div className="wd-compare-head">
              <span className="wd-compare-tag legacy">GENERIC THEMES &amp; SITE BUILDERS</span>
              <h3>Where template debt slows you down</h3>
            </div>
            <ul className="wd-compare-list">
              {COMPARISON_ROWS.map((row) => (
                <li key={row.criterion}>
                  <div className="wd-compare-icon legacy">
                    <X size={14} />
                  </div>
                  <div>
                    <strong>{row.criterion}</strong>
                    <p>{row.legacy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 5. 6-STAGE ENGINEERING LIFECYCLE WITH SCRUBBED GSAP SPINE */}
      <section className="section wrap" id="web-process">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="6-STAGE DELIVERY METHODOLOGY"
            title="Predictable velocity from discovery to continuous care."
            text="A six-stage pipeline designed for remote collaboration, rapid prototype validation, and zero launch surprises."
          />
        </div>

        <div className="wd-process-wrapper">
          <div className="wd-process-rail" aria-hidden="true">
            <div className="wd-process-rail-fill" />
          </div>

          <div className="roadmap-container">
            {PROCESS_STEPS.map((step, idx) => (
              <article
                className={"roadmap-card " + (activeProcessIdx === idx ? "wd-step-active" : "")}
                key={step.title}
                onMouseEnter={() => setActiveProcessIdx(idx)}
                onFocus={() => setActiveProcessIdx(idx)}
                tabIndex={0}
              >
                <div className="wd-roadmap-num-col">
                  <div className="roadmap-num">{step.num}</div>
                  <span className="wd-roadmap-phase">{step.phase}</span>
                </div>
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
        </div>
      </section>

      {/* 6. FEATURES / OUTCOMES SECTION + PARALLAX STUDIO BANNER */}
      <section className="section wrap" id="web-features">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="THE VALUE PROPOSITION"
            title="Engineered for outcomes, not just aesthetics."
            text="We craft responsive interfaces built to convert and back them with resilient full-stack engineering."
          />
        </div>

        <div className="features-grid-3x2">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div className="feature-box wd-spotlight-card" key={feat.title}>
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
              and GSAP interaction state is built with clean accessibility and strict TypeScript contracts.
            </p>
            <div className="feature-tags">
              <span>Figma Design Tokens</span>
              <span>GSAP Scroll Choreography</span>
              <span>100% Client IP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROJECT SHOWCASE SECTION */}
      <section className="section wrap" id="web-showcase">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="PROJECT SHOWCASE"
            title="Recent web platforms in production."
            text="Real interfaces. Real business problems. Flagship platforms we have designed, architected, and shipped."
          />
          <a className="text-link wd-magnetic" href="/work">
            View full portfolio <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="showcase-featured-grid">
          {SHOWCASE_PROJECTS.map((p, i) => (
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
                  type="button"
                  className="button wd-magnetic"
                  style={{ marginTop: "14px", alignSelf: "flex-start" }}
                  onClick={() => setSelectedProject(i)}
                >
                  Inspect Case Study
                </button>
              </div>
            </article>
          ))}
        </div>

        {selectedProject !== null && (
          <div className="modal-shade" onClick={() => setSelectedProject(null)}>
            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-label={SHOWCASE_PROJECTS[selectedProject].name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="icon-button close-modal"
                aria-label="Close project modal"
                autoFocus
                onClick={() => setSelectedProject(null)}
              >
                <X />
              </button>
              <span className="eyebrow">{SHOWCASE_PROJECTS[selectedProject].type}</span>
              <h2>{SHOWCASE_PROJECTS[selectedProject].name}</h2>
              <img
                src={SHOWCASE_PROJECTS[selectedProject].image}
                alt={SHOWCASE_PROJECTS[selectedProject].name + " preview"}
              />
              <p>{SHOWCASE_PROJECTS[selectedProject].detail}</p>
              <div className="tags">
                {SHOWCASE_PROJECTS[selectedProject].tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Button
                href={
                  "/contact?service=Web%20development&brief=" +
                  encodeURIComponent(
                    "I would like to discuss a platform similar to " +
                      SHOWCASE_PROJECTS[selectedProject].name
                  )
                }
              >
                Discuss a similar web build
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* 8. INTERACTIVE SCOPE ESTIMATOR */}
      <section className="section wrap" id="web-estimator">
        <div className="section-top wd-section-reveal">
          <SectionHeading
            label="PROJECT ESTIMATOR"
            title="Configure your web architecture."
            text="Select your platform scope, content infrastructure, and integrations to generate a tailored timeline."
          />
        </div>

        <div className="scope-estimator-box">
          <div className="estimator-grid">
            <div className="estimator-options">
              <div>
                <div className="estimator-group-title">1. PLATFORM TYPE</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {[
                    "Custom Business Website",
                    "SaaS & Web App",
                    "Headless E-Commerce",
                    "Enterprise Operations Portal",
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={"estimator-chip " + (platformType === t ? "active" : "")}
                      onClick={() => setPlatformType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="estimator-group-title">2. CONTENT &amp; AI INFRASTRUCTURE</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {[
                    "Headless CMS (Sanity)",
                    "Headless CMS + AI Copilot",
                    "Static Markdown",
                    "Dynamic Database Only",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
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
                  {[
                    "Stripe & Auth",
                    "Custom ERP / CRM Sync",
                    "Analytics & SEO Automation",
                    "Global Edge Multi-Region",
                  ].map((i) => (
                    <button
                      key={i}
                      type="button"
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
              <div className="estimator-output-stat wd-est-pulse">
                <span>Estimated Duration:</span>
                <strong>
                  {estimatedSprints} Sprints (~{estimatedSprints * 2} wks)
                </strong>
              </div>
              <div className="estimator-output-stat wd-est-pulse">
                <span>Recommended Stack:</span>
                <strong style={{ fontSize: "13.5px", color: "var(--ink)", textAlign: "right" }}>
                  {recommendedStack}
                </strong>
              </div>
              <div className="estimator-output-stat">
                <span>Delivery Cadence:</span>
                <strong style={{ fontSize: "15px", color: "var(--ink)" }}>Bi-weekly live demos</strong>
              </div>
              <div className="estimator-output-stat" style={{ borderBottom: "0", paddingBottom: "0" }}>
                <span>Code Ownership:</span>
                <strong style={{ fontSize: "15px", color: "#10b981" }}>100% Client IP</strong>
              </div>
              <Button href={"/contact?service=Web%20development&brief=" + scopeQuery}>
                Build my starting brief
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="section wrap faq" id="web-faq">
        <div className="wd-section-reveal">
          <SectionHeading
            label="FREQUENTLY ASKED QUESTIONS"
            title="Everything you need to know about our web development."
            text="Clear answers on engineering standards, remote time-zone workflow, revisions, and timelines."
          />
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <article key={item.q}>
              <button
                type="button"
                aria-expanded={openFaq === i}
                aria-controls={"faq-" + i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {openFaq === i && (
                <p id={"faq-" + i} className="wd-faq-answer">
                  {item.a}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="service-cta-panel">
        <div className="wrap service-cta-inner">
          <span className="eyebrow">LET&apos;S ARCHITECT YOUR WEB PLATFORM</span>
          <h2>
            Ready to turn your web presence into an
            <br />
            unfair <em>advantage?</em>
          </h2>
          <p>
            An idea on a sketch. A sluggish template site that needs a clean custom rebuild. Or a SaaS
            platform scaling globally. Let&apos;s engineer your next production release.
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
            <div className="wd-magnetic">
              <Button href="/contact?service=Web%20development">
                Start a web project
              </Button>
            </div>
            <a
              className="text-link wd-magnetic"
              href="mailto:hr.digenttech@gmail.com?subject=Web%20Development%20Inquiry"
            >
              Email engineering team <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
