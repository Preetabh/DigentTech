import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Globe,
  MessageSquare,
  Minus,
  Plus,
  Quote,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  CloudflareAwsLogo,
  DockerKubernetesLogo,
  FastlaneGithubLogo,
  FlutterLogo,
  GraphqlRestLogo,
  LangChainLlamaIndexLogo,
  N8nMakeLogo,
  NextjsReactLogo,
  NodeGoLogo,
  OpenAIAntropicLogo,
  PineconeQdrantLogo,
  PostgresRedisLogo,
  PythonFastApiLogo,
  ReactNativeLogo,
  SentryCrashlyticsLogo,
  ShopifyStripeLogo,
  SupabaseFirebaseLogo,
  SwiftKotlinLogo,
  TailwindLogo,
  TypescriptLogo,
  VitestPlaywrightLogo,
} from "./TechLogos";

export interface HomeSectionsProps {
  theme: "dark" | "light";
  onNavigate: (path: string) => void;
}

// ============================================================================
// Data Collections (100% DigentTech Authentic Content & Assets)
// ============================================================================

const MARQUEE_PARTNERS = [
  { name: "Next.js & React", role: "Web Platforms", Logo: NextjsReactLogo },
  { name: "TypeScript", role: "Strict Core", Logo: TypescriptLogo },
  { name: "Cloudflare & AWS", role: "Edge Cloud", Logo: CloudflareAwsLogo },
  { name: "OpenAI & Claude", role: "Reasoning LLMs", Logo: OpenAIAntropicLogo },
  { name: "Postgres & Redis", role: "High-Speed Data", Logo: PostgresRedisLogo },
  { name: "Node.js & Go", role: "Service Mesh", Logo: NodeGoLogo },
  { name: "React Native", role: "Mobile Suites", Logo: ReactNativeLogo },
  { name: "Docker & K8s", role: "Containers", Logo: DockerKubernetesLogo },
  { name: "LangChain AI", role: "Agentic RAG", Logo: LangChainLlamaIndexLogo },
  { name: "Shopify & Stripe", role: "Commerce", Logo: ShopifyStripeLogo },
];

const TICKER_DISCIPLINES = [
  { text: "WEB PLATFORMS", accent: true },
  { text: "MOBILE APPS", accent: false },
  { text: "AUTONOMOUS AI", accent: true },
  { text: "CLOUD MESH", accent: false },
  { text: "DESIGN SYSTEMS", accent: true },
  { text: "HEADLESS COMMERCE", accent: false },
];

interface HighlightStat {
  target: number;
  decimals?: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const KEY_HIGHLIGHTS: HighlightStat[] = [
  { target: 50, suffix: "+", label: "Production Systems Shipped" },
  { target: 99.98, decimals: 2, suffix: "%", label: "Edge Uptime & SLA Reliability" },
  { target: 4.9, decimals: 1, suffix: "★", label: "Verified Delivery Rating" },
  { target: 280, prefix: "<", suffix: "ms", label: "Global Edge P95 TTFB" },
  { target: 100, suffix: "%", label: "Full Code & IP Ownership" },
];

const SERVICE_CARDS = [
  {
    code: "01",
    title: "Web Platforms",
    desc: "Sub-300ms Next.js applications, enterprise portals, and headless commerce built on typed edge runtimes.",
    route: "/web-development",
    cta: "EXPLORE WEB",
    Icon: Globe,
  },
  {
    code: "02",
    title: "Mobile Apps",
    desc: "Offline-first React Native, Flutter, and native Swift/Kotlin mobile products engineered for daily resilience.",
    route: "/app-development",
    cta: "EXPLORE MOBILE",
    Icon: Smartphone,
  },
  {
    code: "03",
    title: "Autonomous AI",
    desc: "Private VPC RAG pipelines, LangGraph multi-agent operations, and deterministic document workflows.",
    route: "/ai-solutions",
    cta: "EXPLORE AI",
    Icon: Bot,
  },
  {
    code: "04",
    title: "Digital Growth",
    desc: "Technical SEO foundations, conversion telemetry, analytics attribution, and high-velocity performance funnels.",
    route: "/digital-marketing",
    cta: "EXPLORE GROWTH",
    Icon: TrendingUp,
  },
];

const WHAT_WE_DO_ITEMS = [
  {
    title: "Web & SaaS Architecture",
    watermark: "W",
    desc: "Multi-tenant SaaS portals, high-concurrency customer dashboards, and SSR marketing surfaces.",
    image: "/assets/projects/novacommerce-web-portal.png",
    route: "/web-development",
  },
  {
    title: "Mobile Product Suites",
    watermark: "M",
    desc: "Smooth 60fps iOS & Android apps with offline local queues, biometric auth, and OTA releases.",
    image: "/assets/projects/infrapilot-mobile-app.png",
    route: "/app-development",
  },
  {
    title: "Autonomous AI Agents",
    watermark: "A",
    desc: "Citation-grounded enterprise search, automated triage agents, and zero-leak VPC LLM deployment.",
    image: "/assets/projects/quantos-web-terminal.png",
    route: "/ai-solutions",
  },
  {
    title: "Enterprise ERPs & Portals",
    watermark: "E",
    desc: "Unified workforce, HRMS, and operational command centers tailored around real internal workflows.",
    image: "/assets/projects/hrmitra-hrm-portal.png",
    route: "/services",
  },
  {
    title: "Design Systems & Tokens",
    watermark: "D",
    desc: "Multi-theme Obsidian & Ivory design languages shipped in Figma and strict React component libraries.",
    image: "/assets/projects/claymorphism-design-tokens.png",
    route: "/services",
  },
  {
    title: "Fintech & Growth Engines",
    watermark: "F",
    desc: "Payment gateways, ledger telemetry, conversion instrumentation, and multi-channel growth stacks.",
    image: "/assets/projects/aurapay-mobile-app.png",
    route: "/digital-marketing",
  },
];

interface PortfolioProject {
  id: string;
  title: string;
  category: "WEB PLATFORMS" | "MOBILE APPS" | "AI & AUTOMATION" | "DESIGN SYSTEMS";
  metric: string;
  stack: string[];
  client: string;
  summary: string;
  architecture: string[];
  image: string;
  route: string;
}

const PORTFOLIO_FILTERS = [
  "ALL",
  "WEB PLATFORMS",
  "MOBILE APPS",
  "AI & AUTOMATION",
  "DESIGN SYSTEMS",
] as const;

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "infrapilot",
    title: "InfraPilot Field Suite",
    category: "MOBILE APPS",
    metric: "140ms Cold Start · Offline Sync",
    stack: ["React Native", "SQLite Sync", "Node.js", "Postgres"],
    client: "Infrastructure Operations Group",
    summary:
      "Multi-site field telemetry, defect photography, and executive CRM portal engineered with background conflict-free SQLite synchronization.",
    architecture: [
      "Deterministic delta-sync engine sustaining offline operation across zero-connectivity sites",
      "Unified mobile dispatch + executive browser console with role-based approval trails",
      "Automated PDF compliance reports cutting site sign-off turnaround by 64%",
    ],
    image: "/assets/projects/infrapilot-crm-portal.png",
    route: "/app-development",
  },
  {
    id: "hrmitra",
    title: "HRMitra Command Portal",
    category: "WEB PLATFORMS",
    metric: "12k+ Active Staff · 99.98% Uptime",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    client: "Enterprise People Operations",
    summary:
      "High-volume attendance, payroll ledger, and multi-branch workforce management suite replacing fragmented legacy spreadsheets.",
    architecture: [
      "Sub-200ms payroll calculation engine with immutable audit event logs",
      "Real-time branch attendance dashboards + companion mobile check-in app",
      "Zero-downtime blue/green schema migrations across distributed tenants",
    ],
    image: "/assets/projects/hrmitra-hrm-portal.png",
    route: "/web-development",
  },
  {
    id: "novacommerce",
    title: "NovaCommerce Flagship",
    category: "WEB PLATFORMS",
    metric: "210ms Edge TTFB · +38% CVR",
    stack: ["Next.js", "Cloudflare Workers", "Shopify", "Stripe"],
    client: "Direct-to-Consumer Flagship",
    summary:
      "Headless luxury commerce storefront with edge-cached catalog pages, instant bundle builder, and sub-second checkout.",
    architecture: [
      "Edge-revalidated ISR pages delivering consistent <210ms TTFB across Tier-1 & Tier-2 networks",
      "Custom cart drawer + server-side attribution pipeline with zero layout shift",
      "Automated Playwright visual regression coverage before every release",
    ],
    image: "/assets/projects/novacommerce-web-portal.png",
    route: "/web-development",
  },
  {
    id: "quantos",
    title: "QuantOS Autonomous Desk",
    category: "AI & AUTOMATION",
    metric: "94% Ticket Auto-Triage",
    stack: ["LangGraph", "Python FastAPI", "Qdrant", "OpenAI"],
    client: "B2B Research & Ops",
    summary:
      "Private VPC research and multi-agent operational desk grounded on internal SOPs with citation verification and human approval gates.",
    architecture: [
      "Hybrid dense + keyword vector retrieval with strict per-role document ACLs",
      "Deterministic JSON schema outputs feeding CRM and ERP webhooks safely",
      "Full trace observability showing token cost, latency, and citation score",
    ],
    image: "/assets/projects/quantos-web-terminal.png",
    route: "/ai-solutions",
  },
  {
    id: "aurapay",
    title: "AuraPay Wallet & Ledger",
    category: "MOBILE APPS",
    metric: "60fps Biometric Flow",
    stack: ["Flutter", "Go", "PostgreSQL", "Sentry"],
    client: "Fintech Consumer App",
    summary:
      "Cross-platform digital wallet and instant expense ledger crafted with hardware-backed biometrics and idempotent transaction APIs.",
    architecture: [
      "Double-entry Go microservice core enforcing strict idempotency keys",
      "Hardware enclave pin/biometric signing with zero plain-text token storage",
      "Sub-second statement search and categorized spend analytics",
    ],
    image: "/assets/projects/aurapay-mobile-app.png",
    route: "/app-development",
  },
  {
    id: "pulsefit",
    title: "PulseFit Coaching Companion",
    category: "MOBILE APPS",
    metric: "4.9★ Store Rating",
    stack: ["React Native", "Supabase", "TanStack", "Fastlane"],
    client: "Connected Wellness Brand",
    summary:
      "Daily coaching companion featuring adaptive workout timers, offline media caching, and streak telemetry.",
    architecture: [
      "Optimistic UI updates synced cleanly to Supabase real-time channels",
      "Automated Fastlane & GitHub Actions pipelines shipping iOS/Android betas weekly",
      "Custom chart animations running smoothly at 60fps on mid-range devices",
    ],
    image: "/assets/projects/pulsefit-mobile-app.png",
    route: "/app-development",
  },
  {
    id: "clay-tokens",
    title: "Digent Design System",
    category: "DESIGN SYSTEMS",
    metric: "64 Accessible Primitives",
    stack: ["Figma Tokens", "React", "TypeScript", "Tailwind"],
    client: "DigentTech Atelier Standards",
    summary:
      "Unified design token architecture synchronizing Obsidian Dark and Editorial Ivory light themes across multi-product engineering squads.",
    architecture: [
      "Semantic surface, elevation, and contrast-verified color token pipeline",
      "Accessible keyboard-first dialogs, drawers, tables, and form primitives",
      "Zero-runtime CSS variables ensuring instant zero-flash theme switching",
    ],
    image: "/assets/projects/claymorphism-design-tokens.png",
    route: "/services",
  },
  {
    id: "infrapilot-mob",
    title: "FieldSync Mobile Terminal",
    category: "AI & AUTOMATION",
    metric: "3.4x Faster Dispatch",
    stack: ["Python FastAPI", "React Native", "OCR + Vision", "AWS"],
    client: "Logistics & Field Teams",
    summary:
      "Vision-assisted invoice and site inspection capture converting mobile photos into structured ERP entries in under two seconds.",
    architecture: [
      "On-device image compression + structured LLM vision extraction pipeline",
      "Confidence scoring automatically flagging anomalies for supervisor sign-off",
      "Encrypted S3 archival with lifecycle retention policies",
    ],
    image: "/assets/projects/infrapilot-mobile-app.png",
    route: "/ai-solutions",
  },
];

const CLIENT_TESTIMONIALS = [
  {
    initials: "RK",
    name: "Raghavendra Kulkarni",
    role: "Director of Operations · InfraPilot Systems",
    quote:
      "DigentTech re-architected our entire field app and admin CRM into one offline-capable platform. Our site engineers now close reports in minutes instead of waiting until evening.",
  },
  {
    initials: "AM",
    name: "Ananya Malhotra",
    role: "Founder · NovaCommerce Studio",
    quote:
      "Their obsession with Core Web Vitals showed immediately—our storefront TTFB dropped below 220ms nationwide and paid checkout conversion climbed 38% within the first month.",
  },
  {
    initials: "VS",
    name: "Vikramaditya Singh",
    role: "Head of Technology · HRMitra Enterprise",
    quote:
      "Having principal engineers handle both UI polish and database indexing meant zero handoff friction. Every two-week sprint shipped tested, production-ready code on schedule.",
  },
  {
    initials: "NK",
    name: "Neha Kapoor",
    role: "VP Product · QuantOS Research",
    quote:
      "Our compliance team needed private AI automation with zero external data leakage. DigentTech delivered a grounded LangGraph desk inside our own VPC with verifiable citations.",
  },
];

const INFRASTRUCTURE_STACK = [
  { name: "Next.js & React", role: "SSR & Edge Apps", Logo: NextjsReactLogo },
  { name: "TypeScript", role: "End-to-End Safety", Logo: TypescriptLogo },
  { name: "Node.js & Go", role: "Concurrent APIs", Logo: NodeGoLogo },
  { name: "PostgreSQL & Redis", role: "ACID & Caching", Logo: PostgresRedisLogo },
  { name: "Cloudflare & AWS", role: "Zero-Downtime Cloud", Logo: CloudflareAwsLogo },
  { name: "OpenAI & Claude", role: "Private AI Models", Logo: OpenAIAntropicLogo },
  { name: "LangChain & RAG", role: "Agent Orchestration", Logo: LangChainLlamaIndexLogo },
  { name: "Docker & K8s", role: "Container Fleet", Logo: DockerKubernetesLogo },
];

interface EngagementPackage {
  id: string;
  tierNumber: string;
  title: string;
  badge: string;
  price: string;
  timeline: string;
  featured?: boolean;
  summary: string;
  highlights: string[];
  proposalStages: { step: string; title: string; detail: string }[];
}

const ENGAGEMENT_PACKAGES: EngagementPackage[] = [
  {
    id: "mvp-sprint",
    tierNumber: "01",
    title: "Focused MVP Sprint",
    badge: "VALIDATION & LAUNCH",
    price: "From $4,500",
    timeline: "3 – 4 Weeks",
    summary:
      "Rapid product architecture, interactive Figma design language, and deployed production core to validate with real users.",
    highlights: [
      "Principal Architect + Senior Fullstack",
      "Core Database, Auth & Payments",
      "Responsive Dark & Light UI",
      "Automated Vercel / AWS Deploy",
    ],
    proposalStages: [
      { step: "01", title: "Architecture & Spec Blueprint", detail: "Schema modeling, user flow wireframes, and fixed milestone delivery schedule within 72 hours." },
      { step: "02", title: "UI System & Brand Polish", detail: "Typography hierarchy, accessible component primitives, and desktop + mobile responsive views." },
      { step: "03", title: "Core Full-Stack Build", detail: "Typed API endpoints, authentication, dashboard views, and core business workflows." },
      { step: "04", title: "Staging QA & Production Launch", detail: "End-to-end smoke checks, Core Web Vitals tuning, DNS cutover, and full Git handover." },
    ],
  },
  {
    id: "core-platform",
    tierNumber: "02",
    title: "Core Production Platform",
    badge: "MOST POPULAR · FLAGSHIP",
    price: "From $9,800",
    timeline: "6 – 8 Weeks",
    featured: true,
    summary:
      "Complete custom web or cross-platform mobile system with third-party integrations, Playwright QA, and telemetry dashboards.",
    highlights: [
      "Dedicated 4-Person Specialist Squad",
      "Multi-Theme Design System",
      "<280ms Global Edge P95 Speed",
      "CI/CD + Playwright E2E Suite",
      "CRM / ERP / Stripe Integrations",
      "30-Day Post-Launch SLA Warranty",
    ],
    proposalStages: [
      { step: "01", title: "Technical Discovery & RFC", detail: "Full domain model, concurrency targets, API contracts, and security threat checklist." },
      { step: "02", title: "Atelier Design System in Figma", detail: "Dual-theme token library, interactive prototypes, and motion choreography specs." },
      { step: "03", title: "Parallel Web / Mobile Sprints", detail: "Weekly live staging builds with typed REST/GraphQL backends and caching layer." },
      { step: "04", title: "Automated Testing & Hardening", detail: "Playwright E2E tests, load testing, Sentry error tracking, and SEO metadata audit." },
      { step: "05", title: "Production Rollout & Handover", detail: "Zero-downtime deployment, team walkthrough workshops, and 30-day priority support." },
    ],
  },
  {
    id: "enterprise-ai",
    tierNumber: "03",
    title: "Enterprise AI & Cloud Scale",
    badge: "DEDICATED POD",
    price: "Custom Retainer",
    timeline: "10 – 14 Weeks+",
    summary:
      "Multi-region cloud modernization, private VPC LangGraph AI agents, offline mobile suites, and continuous release velocity.",
    highlights: [
      "Private VPC AI & Vector Search",
      "Multi-Tenant Security & Audit Logs",
      "Shared Slack + Bi-Weekly Exec Drops",
      "Full DevOps & Terraform IaC",
    ],
    proposalStages: [
      { step: "01", title: "Systems Audit & AI Feasibility", detail: "Infrastructure review, latency profiling, data privacy boundaries, and ROI benchmarks." },
      { step: "02", title: "Cloud IaC & Data Backbone", detail: "Multi-region VPC, Terraform modules, PostgreSQL/Qdrant vector pipelines, and IAM roles." },
      { step: "03", title: "Agentic & Platform Engineering", detail: "Citation-verified RAG workflows, offline-first mobile apps, and real-time operational UI." },
      { step: "04", title: "Observability & SRE Handover", detail: "Distributed tracing, eval regression harnesses, runbooks, and internal engineer training." },
    ],
  },
];

const HOME_FAQS = [
  {
    q: "How do DigentTech engagements start and how fast can we launch?",
    a: "Every engagement starts with a crisp 48–72 hour technical architecture spec and fixed milestone roadmap. Focused MVPs ship to production in 3–4 weeks, while comprehensive production web, mobile, and AI platforms typically launch in 6–8 weeks with live weekly staging builds.",
  },
  {
    q: "Do we retain 100% ownership of the source code and cloud infrastructure?",
    a: "Yes, without exception. Every repository, Figma design file, Terraform script, database schema, and deployment pipeline is built inside your organization's GitHub and cloud accounts with full intellectual property transfer.",
  },
  {
    q: "Can you deploy private AI agents without sending company data to public models?",
    a: "Absolutely. We architect private VPC RAG and LangGraph workflows using isolated enterprise API endpoints or self-hosted open-weight models behind role-based access control, citation grounding, and zero third-party training retention.",
  },
  {
    q: "How does DigentTech ensure performance and zero regressions after launch?",
    a: "We enforce strict TypeScript boundaries, automated Playwright browser tests, Core Web Vitals budgets (<280ms TTFB), and Sentry telemetry before any production tag is cut—backed by a 30-day warranty and optional ongoing engineering retainers.",
  },
  {
    q: "Where is your team based, and how do you collaborate across time zones?",
    a: "Our engineering atelier is headquartered in Lucknow, India, working daily with founders and enterprises across India, the US, Europe, and the Middle East via shared Slack channels, Linear sprint boards, and overlapping standups.",
  },
];

const BOTTOM_ECOSYSTEM_STACK = [
  { name: "React Native", Logo: ReactNativeLogo },
  { name: "Flutter", Logo: FlutterLogo },
  { name: "Swift & Kotlin", Logo: SwiftKotlinLogo },
  { name: "Tailwind UI", Logo: TailwindLogo },
  { name: "Supabase", Logo: SupabaseFirebaseLogo },
  { name: "Python FastAPI", Logo: PythonFastApiLogo },
  { name: "Pinecone Vector", Logo: PineconeQdrantLogo },
  { name: "n8n & Make", Logo: N8nMakeLogo },
  { name: "GraphQL / REST", Logo: GraphqlRestLogo },
  { name: "Playwright QA", Logo: VitestPlaywrightLogo },
  { name: "Fastlane CI", Logo: FastlaneGithubLogo },
  { name: "Sentry Telemetry", Logo: SentryCrashlyticsLogo },
];

// ============================================================================
// Helper Sub-components
// ============================================================================

function SlantedBadge({ label, darkBand = false }: { label: string; darkBand?: boolean }) {
  return (
    <div className={`lb-slanted-badge ${darkBand ? "on-dark" : ""}`}>
      <span className="lb-slanted-slash" aria-hidden="true">
        <span className="lb-slanted-inner">//</span>
      </span>
      <span className="lb-slanted-text">{label}</span>
    </div>
  );
}

function CountUpStat({ item, active }: { item: HighlightStat; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(item.target);
      return;
    }

    let rafId = 0;
    const duration = 1350;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(item.target * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplay(item.target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, item.target]);

  const formatted = item.decimals
    ? display.toFixed(item.decimals)
    : Math.round(display).toString();

  return (
    <div className="lb-highlight-cell">
      <div className="lb-highlight-value">
        {item.prefix ?? ""}
        {formatted}
        <span>{item.suffix}</span>
      </div>
      <div className="lb-highlight-label">{item.label}</div>
    </div>
  );
}

// ============================================================================
// Modals: Engineering Proposal + Free Estimate + Project Dossier
// ============================================================================

function ProposalModal({
  pkg,
  onClose,
  onRequestEstimate,
}: {
  pkg: EngagementPackage | null;
  onClose: () => void;
  onRequestEstimate: (packageName: string) => void;
}) {
  useEffect(() => {
    if (!pkg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pkg, onClose]);

  if (!pkg) return null;

  return (
    <div
      className="lb-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${pkg.title} Proposal Breakdown`}
      onClick={onClose}
    >
      <div className="lb-proposal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lb-modal-head">
          <div>
            <span className="lb-modal-kicker">
              TIER {pkg.tierNumber} · {pkg.badge}
            </span>
            <h3>{pkg.title} — Architecture Proposal</h3>
          </div>
          <button
            type="button"
            className="lb-modal-close"
            onClick={onClose}
            aria-label="Close proposal modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="lb-proposal-meta">
          <div>
            <span>TYPICAL TIMELINE</span>
            <strong>{pkg.timeline}</strong>
          </div>
          <div>
            <span>INVESTMENT RANGE</span>
            <strong>{pkg.price}</strong>
          </div>
          <div>
            <span>DELIVERY MODEL</span>
            <strong>Fixed Milestone · Full IP</strong>
          </div>
        </div>

        <div className="lb-proposal-stages">
          {pkg.proposalStages.map((s) => (
            <div key={s.step} className="lb-proposal-stage">
              <div className="lb-stage-num">{s.step}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lb-modal-footer">
          <button type="button" className="lb-btn-ghost" onClick={onClose}>
            Close Overview
          </button>
          <button
            type="button"
            className="lb-btn-solid"
            onClick={() => {
              const title = pkg.title;
              onClose();
              onRequestEstimate(title);
            }}
          >
            Configure Free Estimate <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

const ESTIMATE_SCOPES = [
  "Web Platform",
  "Mobile App",
  "Autonomous AI",
  "UI/UX System",
  "Cloud & DevOps",
  "Growth & SEO",
];

function EstimateModal({
  open,
  initialPackage,
  onClose,
}: {
  open: boolean;
  initialPackage: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Web Platform",
    "UI/UX System",
  ]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((item) => item !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="lb-modal-backdrop dark-glass"
      role="dialog"
      aria-modal="true"
      aria-label="Get Free Engineering Estimate"
      onClick={onClose}
    >
      <div className="lb-estimate-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lb-modal-head">
          <div>
            <span className="lb-modal-kicker">
              PROJECT SCOPING · {initialPackage.toUpperCase()}
            </span>
            <h3>Get a Tailored Engineering Estimate</h3>
          </div>
          <button
            type="button"
            className="lb-modal-close"
            onClick={onClose}
            aria-label="Close estimate modal"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="lb-estimate-success">
            <div className="lb-success-icon">
              <ShieldCheck size={28} />
            </div>
            <h4>Specification Request Prepared</h4>
            <p>
              Thank you, <strong>{name}</strong>. Our principal engineering desk has captured your{" "}
              <strong>{initialPackage}</strong> brief across{" "}
              <strong>{selectedScopes.join(", ") || "Custom Scope"}</strong>. Send directly to{" "}
              <a href={`mailto:hr.digenttech@gmail.com?subject=${encodeURIComponent(`Project Estimate — ${initialPackage} (${name})`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nPackage: ${initialPackage}\nScopes: ${selectedScopes.join(", ")}\n\nNotes:\n${notes}`)}`}>
                hr.digenttech@gmail.com
              </a>{" "}
              or expect a response within 24 business hours.
            </p>
            <button type="button" className="lb-btn-gold" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="lb-estimate-form" onSubmit={handleSubmit}>
            <div className="lb-form-row">
              <label>
                <span>Full Name *</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                <span>Work Email *</span>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="lb-form-row single">
              <label>
                <span>Phone / WhatsApp (Optional)</span>
                <input
                  type="tel"
                  placeholder="+91 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>

            <div className="lb-scope-picker">
              <span className="lb-scope-label">Select Engineering Modules</span>
              <div className="lb-scope-grid">
                {ESTIMATE_SCOPES.map((scope) => {
                  const active = selectedScopes.includes(scope);
                  return (
                    <button
                      key={scope}
                      type="button"
                      className={`lb-scope-chip ${active ? "active" : ""}`}
                      onClick={() => toggleScope(scope)}
                      aria-pressed={active}
                    >
                      <span className="lb-scope-box">{active && <Check size={12} />}</span>
                      <span>{scope}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lb-form-row single">
              <label>
                <span>Brief Goals & Target Timeline</span>
                <textarea
                  rows={3}
                  placeholder="Share core workflows, existing stack, or desired launch window..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </div>

            <div className="lb-modal-footer">
              <span className="lb-est-note">
                Direct reply from Principal Architects within 24 hrs
              </span>
              <button type="submit" className="lb-btn-gold">
                Request Estimate <ArrowUpRight size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ProjectDossierModal({
  project,
  onClose,
  onNavigate,
  onOpenEstimate,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenEstimate: (pkgTitle: string) => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="lb-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Engineering Case Study`}
      onClick={onClose}
    >
      <div className="lb-project-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lb-modal-close floating"
          onClick={onClose}
          aria-label="Close case study modal"
        >
          <X size={18} />
        </button>

        <div className="lb-project-modal-grid">
          <div className="lb-project-modal-visual">
            <img src={project.image} alt={project.title} />
            <div className="lb-project-modal-badge">{project.metric}</div>
          </div>

          <div className="lb-project-modal-body">
            <span className="lb-modal-kicker">
              {project.category} · {project.client}
            </span>
            <h3>{project.title}</h3>
            <p className="lb-project-modal-summary">{project.summary}</p>

            <div className="lb-project-modal-arch">
              <h4>Architecture & Delivery Notes</h4>
              <ul>
                {project.architecture.map((line) => (
                  <li key={line}>
                    <Check size={14} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lb-project-modal-tags">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="lb-modal-footer">
              <button
                type="button"
                className="lb-btn-ghost"
                onClick={() => {
                  const target = project.route;
                  onClose();
                  onNavigate(target);
                }}
              >
                Explore Practice <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="lb-btn-solid"
                onClick={() => {
                  const title = project.title;
                  onClose();
                  onOpenEstimate(`Similar to ${title}`);
                }}
              >
                Build Something Similar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Exported Home Sections Composite
// ============================================================================

export function HomeEditorialSections({ theme, onNavigate }: HomeSectionsProps) {
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [highlightsVisible, setHighlightsVisible] = useState(false);

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);

  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const [proposalPkg, setProposalPkg] = useState<EngagementPackage | null>(null);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [estimatePackageLabel, setEstimatePackageLabel] = useState("Core Production Platform");

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Trigger animated counters when Key Highlights section enters viewport
  useEffect(() => {
    const el = highlightsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHighlightsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance testimonials carousel smoothly (2 cards per view -> 2 pages on desktop)
  const totalTestimonialSlides = Math.ceil(CLIENT_TESTIMONIALS.length / 2);
  useEffect(() => {
    if (testimonialPaused) return;
    const timer = window.setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [testimonialPaused, totalTestimonialSlides]);

  // Show floating scroll-to-top button past the hero fold
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects =
    activeFilter === "ALL"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  const visibleTestimonials = CLIENT_TESTIMONIALS.slice(
    testimonialSlide * 2,
    testimonialSlide * 2 + 2
  );

  const handleOpenEstimate = (pkgTitle: string) => {
    setEstimatePackageLabel(pkgTitle);
    setEstimateOpen(true);
  };

  return (
    <div className="lb-sections-flow">
      {/* 1. Associated Technology & Cloud Partners Marquee */}
      <section className="lb-partners-strip" aria-label="Core Technology Partners">
        <div className="wrap">
          <div className="lb-centered-header">
            <h2 className="lb-marcellus-sub">Core Technology &amp; Cloud Partners</h2>
            <span className="lb-short-rule" aria-hidden="true" />
          </div>
        </div>

        <div className="lb-marquee-viewport">
          <div className="lb-marquee-track">
            {[...MARQUEE_PARTNERS, ...MARQUEE_PARTNERS].map((item, idx) => (
              <div key={`${item.name}-${idx}`} className="lb-partner-pill">
                <div className="lb-partner-logo-box">
                  <item.Logo size={30} />
                </div>
                <div className="lb-partner-text">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Editorial About Split + Dual-Tone Kinetic Text Ticker */}
      <section className="lb-about-section">
        <div className="wrap">
          <div className="lb-about-grid">
            <div className="lb-about-photo-frame">
              <img
                className="lb-about-photo-img"
                src={
                  theme === "dark"
                    ? "/assets/visuals/workspace-dark.webp"
                    : "/assets/visuals/workspace-light.webp"
                }
                alt="DigentTech engineering workspace and architecture studio"
                loading="lazy"
              />
              <div className="lb-about-photo-caption">
                <span>DIGENTTECH ATELIER · LUCKNOW &amp; GLOBAL</span>
              </div>
            </div>

            <div className="lb-about-copy">
              <div className="lb-welcome-kicker">
                <span className="lb-welcome-icon" aria-hidden="true">
                  <Cpu size={14} />
                </span>
                <span>WELCOME TO DIGENT TECH</span>
              </div>

              <h2 className="lb-about-title">
                Turning Product Vision into <em>Resilient</em> Software Reality
              </h2>

              <p className="lb-about-desc">
                DigentTech is a principal-led software, mobile, and applied AI studio crafting
                production infrastructure for ambitious founders and enterprises. We pair disciplined
                editorial taste with sub-300ms edge engineering—delivering scalable codebases you own
                100% from day one.
              </p>

              <div className="lb-about-actions">
                <a
                  href="/about"
                  className="lb-btn-rect"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/about");
                  }}
                >
                  READ MORE <ArrowRight size={15} />
                </a>
                <button
                  type="button"
                  className="lb-btn-outline-rect"
                  onClick={() => handleOpenEstimate("Custom Discovery")}
                >
                  GET FREE ESTIMATE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Dual-Tone Text Ticker */}
        <div className="lb-keyword-marquee" aria-hidden="true">
          <div className="lb-keyword-track">
            {[...TICKER_DISCIPLINES, ...TICKER_DISCIPLINES, ...TICKER_DISCIPLINES].map(
              (item, idx) => (
                <span
                  key={`${item.text}-${idx}`}
                  className={`lb-keyword-item ${item.accent ? "is-bold" : "is-muted"}`}
                >
                  {item.text}
                  <i className="lb-keyword-sep">✦</i>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* 3. Key Highlights Dark Textured Stats Banner */}
      <section ref={highlightsRef} className="lb-highlights-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="PROVEN METRICS" />
            <h2 className="lb-section-heading">Our Key Highlights</h2>
          </div>
        </div>

        <div className="lb-highlights-band">
          <div className="wrap">
            <div className="lb-highlights-grid">
              {KEY_HIGHLIGHTS.map((stat) => (
                <CountUpStat key={stat.label} item={stat} active={highlightsVisible} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Services — 4 Dashed Corner-Anchor Chamfer Cards */}
      <section className="lb-services-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="WHAT WE ENGINEER" />
            <h2 className="lb-section-heading">Our Services</h2>
            <p className="lb-section-sub">
              Four specialized engineering practices operating under one principal-led team.
            </p>
          </div>

          <div className="lb-services-grid">
            {SERVICE_CARDS.map((svc) => (
              <article key={svc.code} className="lb-service-box">
                <span className="lb-service-corner-sq" aria-hidden="true" />
                <div className="lb-service-box-top">
                  <span className="lb-service-num">{svc.code}</span>
                  <div className="lb-service-icon">
                    <svc.Icon size={24} strokeWidth={1.65} />
                  </div>
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <a
                  href={svc.route}
                  className="lb-service-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(svc.route);
                  }}
                >
                  <span className="lb-dash-line" />
                  <span>{svc.cta}</span>
                  <ArrowRight size={14} className="lb-link-arrow" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dark Band: What We Do (6 Offset-Wireframe Cards + Watermarks) */}
      <section id="what-we-do" className="lb-whatwedo-band">
        <div className="wrap">
          <div className="lb-centered-header on-dark">
            <SlantedBadge label="CORE DELIVERABLES" darkBand />
            <h2 className="lb-section-heading on-dark">What We Do</h2>
            <p className="lb-section-sub on-dark">
              Architecture, full-stack product delivery, and automated cloud intelligence built for longevity.
            </p>
          </div>

          <div className="lb-whatwedo-grid">
            {WHAT_WE_DO_ITEMS.map((item) => (
              <article key={item.title} className="lb-wire-card">
                <div className="lb-wire-card-inner">
                  <div className="lb-wire-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="lb-wire-body">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <a
                      href={item.route}
                      className="lb-wire-readmore"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.route);
                      }}
                    >
                      <span className="lb-dash-line" />
                      <span>READ MORE</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                  <span className="lb-wire-watermark" aria-hidden="true">
                    {item.watermark}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dark Filter Pill Bar + 4-Column Portrait Project Showcase Grid */}
      <section className="lb-projects-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="FLAGSHIP WORK" />
            <h2 className="lb-section-heading">Shipped Platforms &amp; Case Studies</h2>
          </div>

          <div className="lb-filter-bar-wrap">
            <div className="lb-filter-bar" role="tablist" aria-label="Filter projects by discipline">
              <span className="lb-filter-rail" aria-hidden="true" />
              {PORTFOLIO_FILTERS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`lb-filter-btn ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lb-projects-grid">
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                className="lb-project-card"
                onClick={() => setSelectedProject(proj)}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${proj.title} case study`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(proj);
                  }
                }}
              >
                <img src={proj.image} alt={proj.title} loading="lazy" />

                <div className="lb-project-top-badge">{proj.category}</div>

                {/* Slide-in Asymmetrical Frosted Glass Caption Overlay */}
                <div className="lb-project-overlay-banner">
                  <span className="lb-overlay-notch" aria-hidden="true" />
                  <div className="lb-overlay-content">
                    <span className="lb-overlay-metric">{proj.metric}</span>
                    <h3>{proj.title}</h3>
                    <span className="lb-overlay-cta">
                      Inspect Dossier <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="lb-projects-more">
            <a
              href="/work"
              className="lb-btn-rect"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/work");
              }}
            >
              EXPLORE ALL CASE STUDIES <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Dark Blueprint Carousel + Curved Bottom Divider */}
      <section
        className="lb-testimonials-band"
        onMouseEnter={() => setTestimonialPaused(true)}
        onMouseLeave={() => setTestimonialPaused(false)}
      >
        <div className="wrap">
          <div className="lb-testimonials-head">
            <div className="lb-centered-header on-dark">
              <SlantedBadge label="CLIENT FEEDBACK" darkBand />
              <h2 className="lb-section-heading on-dark">What Engineering Partners Say</h2>
            </div>

            <div className="lb-carousel-controls">
              <button
                type="button"
                className="lb-carousel-arrow"
                aria-label="Previous testimonials"
                onClick={() =>
                  setTestimonialSlide(
                    (prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides
                  )
                }
              >
                <ChevronLeft size={18} />
              </button>
              <div className="lb-carousel-dots">
                {Array.from({ length: totalTestimonialSlides }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Testimonial page ${i + 1}`}
                    className={`lb-carousel-dot ${testimonialSlide === i ? "active" : ""}`}
                    onClick={() => setTestimonialSlide(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="lb-carousel-arrow"
                aria-label="Next testimonials"
                onClick={() =>
                  setTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides)
                }
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="lb-testimonials-grid">
            {visibleTestimonials.map((item) => (
              <article key={item.name} className="lb-testimonial-card">
                <div className="lb-testimonial-quote-box">
                  <Quote size={28} className="lb-quote-mark" aria-hidden="true" />
                  <p>“{item.quote}”</p>
                </div>
                <div className="lb-testimonial-footer">
                  <div className="lb-testimonial-avatar" aria-hidden="true">
                    <span>{item.initials}</span>
                  </div>
                  <div className="lb-testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Smooth Curved Bottom Wave Divider */}
        <div className="lb-wave-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 76" preserveAspectRatio="none">
            <path d="M0,24 C360,84 1080,84 1440,24 L1440,76 L0,76 Z" />
          </svg>
        </div>
      </section>

      {/* 8A. Enterprise Infrastructure & Integrations 4x2 Grid */}
      <section className="lb-infra-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <h2 className="lb-marcellus-sub underlined">
              Enterprise Infrastructure &amp; Integrations
            </h2>
          </div>

          <div className="lb-infra-grid">
            {INFRASTRUCTURE_STACK.map((item) => (
              <div key={item.name} className="lb-infra-card">
                <div className="lb-infra-logo">
                  <item.Logo size={38} />
                </div>
                <div className="lb-infra-text">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8B. 3-Tier Horizontal Engineering Packages */}
      <section className="lb-packages-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="ENGAGEMENT TIERS" />
            <h2 className="lb-section-heading">Engineering Packages</h2>
            <p className="lb-section-sub">
              Clear fixed-milestone budgets or dedicated enterprise pods—inspect deliverables or request a tailored estimate.
            </p>
          </div>

          <div className="lb-packages-stack">
            {ENGAGEMENT_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`lb-package-row ${pkg.featured ? "is-featured" : ""}`}
              >
                <div className="lb-pkg-left-box">
                  <span className="lb-pkg-tier-badge">
                    {pkg.tierNumber} · {pkg.badge}
                  </span>
                  <h3>{pkg.title}</h3>
                  <div className="lb-pkg-price">{pkg.price}</div>
                  <div className="lb-pkg-time">{pkg.timeline}</div>
                </div>

                <div className="lb-pkg-center">
                  <p className="lb-pkg-summary">{pkg.summary}</p>
                  <ul className="lb-pkg-checklist">
                    {pkg.highlights.map((pt) => (
                      <li key={pt}>
                        <Check size={14} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="lb-pkg-scope-link"
                    onClick={() => setProposalPkg(pkg)}
                  >
                    <Sparkles size={14} /> View Scope Breakdown <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="lb-pkg-cta-col">
                  <button
                    type="button"
                    className={`lb-pkg-est-btn ${pkg.featured ? "is-gold" : ""}`}
                    onClick={() => handleOpenEstimate(pkg.title)}
                  >
                    <span>ESTIMATE</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Split (Portrait Left + Accordion Right) & Bottom Ecosystem Logo Grid */}
      <section className="lb-faq-section">
        <div className="wrap">
          <div className="lb-faq-grid">
            <div className="lb-faq-photo-col">
              <div className="lb-faq-photo-frame">
                <img
                  src="/assets/founder.png"
                  alt="DigentTech engineering leadership portrait"
                  loading="lazy"
                />
                <div className="lb-faq-photo-note">
                  <strong>Principal-Led Engineering</strong>
                  <span>Every milestone reviewed &amp; architected directly with senior leads.</span>
                </div>
              </div>
            </div>

            <div className="lb-faq-accordion-col">
              <SlantedBadge label="FAQ'S" />
              <h2 className="lb-faq-heading">Frequently Asked Questions</h2>

              <div className="lb-faq-list">
                {HOME_FAQS.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={item.q}
                      className={`lb-faq-item ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        className="lb-faq-trigger"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      >
                        <span className="lb-faq-question">{item.q}</span>
                        <span className={`lb-faq-pill ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                        </span>
                      </button>
                      <div className="lb-faq-panel">
                        <div className="lb-faq-panel-inner">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ecosystem Logos Grid */}
      <section className="lb-bottom-ecosystem">
        <div className="wrap">
          <div className="lb-centered-header">
            <h2 className="lb-marcellus-sub">Associated Frameworks &amp; Tooling</h2>
            <span className="lb-short-rule" aria-hidden="true" />
          </div>

          <div className="lb-ecosystem-grid">
            {BOTTOM_ECOSYSTEM_STACK.map((item) => (
              <div key={item.name} className="lb-ecosystem-card">
                <div className="lb-ecosystem-icon-well">
                  <item.Logo size={34} />
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom-Right Actions */}
      <div className="lb-floating-actions">
        {showScrollTop && (
          <button
            type="button"
            className="lb-fab-top"
            aria-label="Scroll back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={17} />
          </button>
        )}
        <button
          type="button"
          className="lb-fab-inquiry"
          aria-label="Open quick project estimate"
          onClick={() => handleOpenEstimate("Quick Inquiry")}
        >
          <MessageSquare size={20} />
        </button>
      </div>

      {/* Interactive Modals */}
      <ProposalModal
        pkg={proposalPkg}
        onClose={() => setProposalPkg(null)}
        onRequestEstimate={handleOpenEstimate}
      />
      <EstimateModal
        open={estimateOpen}
        initialPackage={estimatePackageLabel}
        onClose={() => setEstimateOpen(false)}
      />
      <ProjectDossierModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={onNavigate}
        onOpenEstimate={handleOpenEstimate}
      />
    </div>
  );
}

