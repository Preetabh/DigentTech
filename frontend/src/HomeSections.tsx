import React, { useEffect, useId, useRef, useState } from "react";
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
  Layers,
  MessageSquare,
  Minus,
  Plus,
  Quote,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { animateWorkSpotlight } from "./HomeAnimations";
import CardSwap, { Card, type CardSwapHandle } from "./components/CardSwap";
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
// Native <dialog> Top-Layer Synchronizer
// ============================================================================

function useDialogSync(
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  open: boolean,
  onClose: () => void
) {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [dialogRef, open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let startedOutside = false;
    const onDown = (e: PointerEvent) => {
      startedOutside = isOutside(e);
    };
    const onUp = (e: PointerEvent) => {
      if (startedOutside && isOutside(e)) {
        dialog.close();
      }
      startedOutside = false;
    };

    dialog.addEventListener("pointerdown", onDown);
    dialog.addEventListener("pointerup", onUp);
    return () => {
      dialog.removeEventListener("pointerdown", onDown);
      dialog.removeEventListener("pointerup", onUp);
    };
  }, [dialogRef]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [dialogRef, onClose]);
}

// ============================================================================
// Data Collections
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
  { text: "WEB DEVELOPMENT", accent: true },
  { text: "APP DEVELOPMENT", accent: false },
  { text: "GRAPHICS & UI DESIGN", accent: true },
  { text: "FREE ONLINE IT SUPPORT", accent: false },
  { text: "CODING COACHING", accent: true },
  { text: "FREE STUDENT INTERNSHIPS", accent: false },
];

interface HighlightStat {
  target: number;
  decimals?: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const KEY_HIGHLIGHTS: HighlightStat[] = [
  { target: 50, suffix: "+", label: "Websites, Apps & Designs Delivered" },
  { target: 100, suffix: "%", label: "Free Online IT Support for People" },
  { target: 4.9, decimals: 1, suffix: "★", label: "Trusted Client & Student Rating" },
  { target: 100, suffix: "%", label: "Free Real-Project Internships" },
  { target: 100, suffix: "%", label: "Full Code Ownership for Clients" },
];

const SERVICE_CARDS = [
  {
    code: "01",
    title: "Web Development",
    desc: "Fast, mobile-friendly business websites, online stores, and custom web portals built clearly from scratch.",
    route: "/web-development",
    cta: "EXPLORE WEB DEVELOPMENT",
    Icon: Globe,
    highlightTag: "",
  },
  {
    code: "02",
    title: "App Development",
    desc: "Smooth Android and iOS mobile apps designed so your customers and team can use them effortlessly every day.",
    route: "/app-development",
    cta: "EXPLORE APP DEVELOPMENT",
    Icon: Smartphone,
    highlightTag: "",
  },
  {
    code: "03",
    title: "Graphics, Coaching & Internships",
    desc: "Logos, posters, UI designs, friendly step-by-step tech classes, and zero-fee internships on live projects.",
    route: "/online-courses",
    cta: "EXPLORE CLASSES & INTERNSHIPS",
    Icon: Layers,
    highlightTag: "FREE INTERNSHIPS",
  },
  {
    code: "04",
    title: "Free Online IT Support",
    desc: "Stuck with software errors, laptop setup, website bugs, or tech questions? We help people online completely free.",
    route: "/contact?service=Free%20Online%20IT%20Support",
    cta: "GET FREE TECH HELP",
    Icon: ShieldCheck,
    highlightTag: "100% FREE ONLINE HELP",
  },
];

const WHAT_WE_DO_ITEMS = [
  {
    title: "Website Development",
    watermark: "W",
    badge: "",
    desc: "Modern business websites, company portals, and online stores that open fast and look great on every phone.",
    image: "/assets/projects/novacommerce-web-portal.png",
    route: "/web-development",
  },
  {
    title: "Android & iOS Mobile Apps",
    watermark: "A",
    badge: "",
    desc: "Simple, reliable mobile apps for shops, startups, and teams with smooth screens and real-time updates.",
    image: "/assets/projects/infrapilot-mobile-app.png",
    route: "/app-development",
  },
  {
    title: "Graphics & Brand Design",
    watermark: "G",
    badge: "",
    desc: "Clean logos, social media graphics, banners, and modern app UI designs that make people trust your brand.",
    image: "/assets/projects/claymorphism-design-tokens.png",
    route: "/services",
  },
  {
    title: "Coding & Design Coaching",
    watermark: "C",
    badge: "",
    desc: "Easy-to-follow live coaching classes where beginners and students learn web, app, and design skills practically.",
    image: "/assets/projects/hrmitra-hrm-portal.png",
    route: "/online-courses",
  },
  {
    title: "Free Student Internships",
    watermark: "I",
    badge: "ZERO FEE",
    desc: "Zero-fee internships on real studio projects with mentor guidance so students gain confidence and portfolio work.",
    image: "/assets/projects/quantos-web-terminal.png",
    route: "/careers",
  },
  {
    title: "Free Online IT Support",
    watermark: "S",
    badge: "100% FREE HELP",
    desc: "Dedicated free online IT help for fixing tech issues, website bugs, software setups, and student questions.",
    image: "/assets/projects/aurapay-mobile-app.png",
    route: "/contact?service=Free%20Online%20IT%20Support",
  },
];

const PORTFOLIO_FILTERS = [
  "ALL",
  "WEB PLATFORMS",
  "MOBILE APPS",
  "AI & AUTOMATION",
  "DESIGN SYSTEMS",
] as const;

const DELIVERY_FLOW_STEPS = [
  {
    step: "01",
    phase: "TALK & UNDERSTAND",
    title: "Share Your Idea",
    detail: "Tell us what you need in simple words—websites, apps, graphics, or help.",
  },
  {
    step: "02",
    phase: "PLAN & DESIGN",
    title: "Preview the Look",
    detail: "Review clean screen designs, clear timelines, and honest pricing upfront.",
  },
  {
    step: "03",
    phase: "BUILD & CHECK",
    title: "Weekly Live Progress",
    detail: "See real working links every week and test everything on phone and desktop.",
  },
  {
    step: "04",
    phase: "LAUNCH & HELP",
    title: "Go Live + Support",
    detail: "Launch smoothly with full code ownership and friendly ongoing IT support.",
  },
];

interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  category: "WEB PLATFORMS" | "MOBILE APPS" | "AI & AUTOMATION" | "DESIGN SYSTEMS";
  metric: string;
  velocity: string;
  stack: string[];
  client: string;
  summary: string;
  architecture: string[];
  flowStages: string[];
  image: string;
  route: string;
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "pulse-mesh",
    index: "01",
    title: "PulseMesh Neural Ops",
    category: "AI & AUTOMATION",
    metric: "1.4M Daily Events · 34ms Inference",
    velocity: "6 Weeks to Production",
    stack: ["LangGraph", "Python FastAPI", "Qdrant", "Next.js"],
    client: "Meridian Logistics Cloud",
    summary:
      "Autonomous multi-agent freight dispatch and predictive route solver coordinating live fleet corridors across 42 hubs with deterministic citation guardrails.",
    architecture: [
      "Streaming spatial graph ingestion sustaining sub-35ms route policy inference",
      "Human-in-the-loop override rails with immutable replay audit trails",
      "99.8% ETA compliance accuracy lifting cross-hub corridor throughput by 37%",
    ],
    flowStages: ["Telemetry Mesh", "Vector Router", "Policy Solver", "Edge Dispatch"],
    image: "/assets/projects/work-pulsemesh-ai.webp",
    route: "/ai-solutions",
  },
  {
    id: "aether-core",
    index: "02",
    title: "AetherCore Treasury OS",
    category: "WEB PLATFORMS",
    metric: "$4.91T Cleared · 99.99% SLA",
    velocity: "8 Weeks Architecture",
    stack: ["React 19", "TypeScript", "Go Ledger", "PostgreSQL"],
    client: "Nordik Clearing Systems",
    summary:
      "Institutional multi-currency settlement cockpit uniting real-time liquidity flow graphs, idempotent sweeping, and cryptographic ledger inspection.",
    architecture: [
      "Double-entry Go ledger core enforcing strict idempotency & serializable locks",
      "Real-time WebSocket liquidity graph streaming Fedwire, CHIPS & TARGET2 lanes",
      "Zero-layout-shift workstation interface supporting 120Hz market snapshots",
    ],
    flowStages: ["Ledger Core", "Risk Mesh", "Liquidity UI", "SOC-2 Audit"],
    image: "/assets/projects/work-aethercore-web.webp",
    route: "/web-development",
  },
  {
    id: "veloce-pay",
    index: "03",
    title: "VelocePay Instant Wallet",
    category: "MOBILE APPS",
    metric: "60fps Enclave · 99.98% Crash-Free",
    velocity: "5 Weeks MVP + Apps",
    stack: ["React Native", "Swift Enclave", "Go", "Stripe Rails"],
    client: "Veloce Consumer Financial",
    summary:
      "Hardware-biometric digital wallet and virtual card vault engineered for instant QR settlement, multi-currency balance curves, and offline queue resilience.",
    architecture: [
      "Device Secure Enclave cryptographic request signing with zero plaintext secrets",
      "Sub-140ms cold start & 60fps spring-driven card vault gestures",
      "Idempotent payment retries surviving flaky subway & cellular handoffs",
    ],
    flowStages: ["Biometric Key", "Vault Card", "Instant Rail", "Ledger Sync"],
    image: "/assets/projects/work-velocepay-mobile.webp",
    route: "/app-development",
  },
  {
    id: "kinetix-twin",
    index: "04",
    title: "Kinetix Spatial Twin",
    category: "AI & AUTOMATION",
    metric: "-44% Faults · 18ms Telemetry",
    velocity: "7 Weeks Full Rollout",
    stack: ["Python FastAPI", "WebGL", "TimescaleDB", "Redis"],
    client: "VoltGrid Energy Partners",
    summary:
      "Predictive 3D substation digital twin and harmonic anomaly triage workspace monitoring 280 solar & battery storage nodes in real time.",
    architecture: [
      "Sub-20ms harmonic spectrum stream detecting thermal drift hours ahead of failure",
      "Interactive 3D wireframe node map isolating phase imbalance across sectors",
      "Autonomous escalation engine eliminating manual operator ticket triage",
    ],
    flowStages: ["Sensor Ingest", "3D Mesh", "Fault Triage", "Auto Dispatch"],
    image: "/assets/projects/work-kinetix-twin.webp",
    route: "/ai-solutions",
  },
  {
    id: "lumina-commerce",
    index: "05",
    title: "Lumina Headless Store",
    category: "WEB PLATFORMS",
    metric: "190ms Edge TTFB · 2.4x CVR",
    velocity: "4 Weeks Migration",
    stack: ["Next.js 15", "Cloudflare Workers", "Shopify", "Stripe"],
    client: "Lumina Nordic Retail",
    summary:
      "Edge-rendered composable flagship commerce experience featuring interactive 3D SKU inspection, instant variant switching, and 0.00 CLS checkout.",
    architecture: [
      "Cloudflare Edge ISR storefront hitting 190ms global TTFB at 18,400 req/sec",
      "Predictive prefetch slide-over drawer driving 2.4x checkout conversion lift",
      "Multi-currency localized pricing & server-side attribution pipeline",
    ],
    flowStages: ["Edge Cache", "3D Viewer", "Instant Cart", "Global Pay"],
    image: "/assets/projects/work-lumina-commerce.webp",
    route: "/web-development",
  },
  {
    id: "stratum-system",
    index: "06",
    title: "Stratum Token Engine",
    category: "DESIGN SYSTEMS",
    metric: "12.4:1 AAA · 14 Product Squads",
    velocity: "3 Weeks Token Core",
    stack: ["W3C Tokens", "React", "TypeScript", "Figma API"],
    client: "Cross-Platform Design Ops",
    summary:
      "Zero-runtime OKLCH design token pipeline and 64-component primitive suite synchronizing Midnight Dark and Porcelain Light surfaces across teams.",
    architecture: [
      "Semantic contrast-checked surface & elevation ramps with zero theme flicker",
      "Automated Figma-to-React token diffs & Playwright screenshot CI gates",
      "Keyboard-first ARIA primitives built on native popover & dialog standards",
    ],
    flowStages: ["OKLCH Ramps", "Figma Sync", "Primitives", "CI Diff Gate"],
    image: "/assets/projects/work-stratum-system.webp",
    route: "/services",
  },
  {
    id: "medisync-care",
    index: "07",
    title: "MediSync Ward Companion",
    category: "MOBILE APPS",
    metric: "99.99% Uptime · BLE Vitals",
    velocity: "6 Weeks Clinical Pilot",
    stack: ["Flutter", "Supabase", "Bluetooth LE", "Go"],
    client: "Helios Health Network",
    summary:
      "HIPAA-aligned ward companion streaming wearable ECG/SpO2 waveforms to clinician rounds with encrypted 1.2s voice shift handoffs.",
    architecture: [
      "Continuous BLE wearable ingestion sustaining sub-second waveform plotting",
      "Zero-knowledge encrypted voice handoff notes parsed directly into ward charts",
      "Offline-safe SQLite shift cache with automatic cryptographic reconciliation",
    ],
    flowStages: ["BLE Stream", "ECG Engine", "Voice Notes", "Ward Lock"],
    image: "/assets/projects/work-medisync-mobile.webp",
    route: "/app-development",
  },
  {
    id: "orbit-crm",
    index: "08",
    title: "Orbit Revenue Pipeline",
    category: "WEB PLATFORMS",
    metric: "18k+ Seats · +31% Velocity",
    velocity: "7 Weeks Enterprise",
    stack: ["Next.js", "Postgres", "Node.js", "Redis"],
    client: "Stride B2B Enterprise",
    summary:
      "Multi-tenant B2B revenue intelligence cockpit automating 140ms SLA lead routing, security review gates, and executive pipeline forecasting.",
    architecture: [
      "Tenant-isolated PostgreSQL row-level security verified across 18,000+ seats",
      "Sub-140ms territory assignment & forecasting spline updates under heavy load",
      "Audit-ready approval gates integrating CRM, legal redlines & billing webhooks",
    ],
    flowStages: ["SLA Router", "Kanban Core", "RBAC Guard", "Forecasting"],
    image: "/assets/projects/work-orbit-crm.webp",
    route: "/web-development",
  },
  {
    id: "foundry-kit",
    index: "09",
    title: "Foundry Motion SDK",
    category: "DESIGN SYSTEMS",
    metric: "120fps Motion · 0 Layout Shift",
    velocity: "4 Weeks Studio SDK",
    stack: ["GSAP 3.15", "View Transitions", "CSS Anchor", "TypeScript"],
    client: "Digent Partner Architecture",
    summary:
      "Production UI motion & native layout kit combining GSAP ScrollTrigger timelines, top-layer dialogs with @starting-style, and View Transitions.",
    architecture: [
      "Hardware-composited animation primitives honoring prefers-reduced-motion",
      "Native <dialog> and CSS Anchor Positioning patterns with Progressive Fallbacks",
      "Zero external scroll-hijacking bloat keeping LCP fast across mobile devices",
    ],
    flowStages: ["GSAP Core", "Top Layer", "View Morph", "A11y Motion"],
    image: "/assets/projects/work-foundry-kit.webp",
    route: "/services",
  },
];

const CLIENT_TESTIMONIALS = [
  {
    initials: "RK",
    name: "Raghavendra Kulkarni",
    role: "Director · InfraPilot Systems",
    quote:
      "DigentTech built our field mobile app and web dashboard cleanly from scratch. Our team now finishes daily reports in minutes without any confusion.",
  },
  {
    initials: "AM",
    name: "Ananya Malhotra",
    role: "Founder · NovaCommerce Studio",
    quote:
      "They made our online store fast and super easy to browse on phones. Visitors find products faster and our orders grew quickly in the first month.",
  },
  {
    initials: "VS",
    name: "Vikramaditya Singh",
    role: "Head of Technology · HRMitra",
    quote:
      "Talking directly to the people building our product saved weeks of back-and-forth. Every update arrived on time, tested, and ready for real users.",
  },
  {
    initials: "NK",
    name: "Neha Kapoor",
    role: "Product Lead · QuantOS",
    quote:
      "Clean design, clear communication, and reliable support even after launch. They explain every step in plain English without hiding behind technical jargon.",
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
    id: "starter-web",
    tierNumber: "01",
    title: "Business Website & Graphics",
    badge: "FAST LAUNCH",
    price: "Custom Quote",
    timeline: "2 – 4 Weeks",
    summary:
      "A clean, mobile-friendly website with custom logo, posters, and Google setup so customers find and trust your business online.",
    highlights: [
      "Custom Modern Website Design",
      "Logo, Banners & UI Graphics",
      "Fast Mobile & Desktop Views",
      "Full Hosting & Code Ownership",
    ],
    proposalStages: [
      { step: "01", title: "Simple Discussion & Plan", detail: "We listen to your business goals and finalize pages, colors, and fixed budget within 48 hours." },
      { step: "02", title: "Website Layout & Graphics", detail: "Custom design mockups, logo polish, and clean mobile layouts ready for your approval." },
      { step: "03", title: "Fast Development", detail: "Clean code built for quick loading, contact forms, WhatsApp/email leads, and SEO basics." },
      { step: "04", title: "Live Launch & Guidance", detail: "Domain setup, testing on phone and desktop, and easy guide so you stay in full control." },
    ],
  },
  {
    id: "core-platform",
    tierNumber: "02",
    title: "Complete Web & Mobile App",
    badge: "MOST POPULAR · ALL-IN-ONE",
    price: "Project Based",
    timeline: "5 – 8 Weeks",
    featured: true,
    summary:
      "Custom website plus Android & iOS mobile app with admin dashboard, online payments, graphics, and smooth post-launch support.",
    highlights: [
      "Website + Android & iOS App",
      "Custom Admin Panel & Login",
      "Payment Gateway & Notifications",
      "UI Design & Brand Graphics",
      "Tested on Real Phones & Browsers",
      "Friendly Post-Launch Tech Help",
    ],
    proposalStages: [
      { step: "01", title: "Feature Plan & Screens", detail: "Step-by-step screen flow so you see every button and user journey clearly before coding starts." },
      { step: "02", title: "Graphics & App UI System", detail: "Clean light and dark themes, custom icons, and responsive screens for mobile and web." },
      { step: "03", title: "Weekly Live Previews", detail: "Try new features every week on your phone and browser and share quick feedback directly." },
      { step: "04", title: "Play Store, App Store & Web Launch", detail: "Smooth release handling, speed checks, and full GitHub & cloud handover to you." },
    ],
  },
  {
    id: "learning-support",
    tierNumber: "03",
    title: "Coaching, Free Internship & Free IT Help",
    badge: "HELPING PEOPLE · ZERO FEE OPTIONS",
    price: "Free Help / Coaching",
    timeline: "Ongoing / Flexible",
    summary:
      "Need free online IT support, beginner-friendly coding & design coaching, or a zero-fee internship to gain real experience? Reach out directly.",
    highlights: [
      "100% Free Online IT Support for People",
      "Free Student Internships on Live Work",
      "Practical Web, App & Graphics Coaching",
      "Clear Career & Portfolio Guidance",
    ],
    proposalStages: [
      { step: "01", title: "Ask for Free IT Support Online", detail: "Share your laptop, software, app, or website issue via our form—we guide and help fix it free." },
      { step: "02", title: "Join Friendly Coaching Classes", detail: "Learn HTML, React, mobile apps, or graphic design with easy explanations and hands-on tasks." },
      { step: "03", title: "Apply for Zero-Fee Internship", detail: "Work alongside senior developers on live studio projects and build real confidence—₹0 fee." },
      { step: "04", title: "Grow Your Portfolio & Career", detail: "Get code reviews, project certificates, and practical help preparing for real tech jobs." },
    ],
  },
];

const HOME_FAQS = [
  {
    q: "What services and help does DigentTech provide?",
    a: "We build fast websites, Android & iOS mobile apps, and custom graphics/UI designs for businesses. We also offer friendly coding & design coaching, free zero-fee student internships, and free online IT support to help people solve tech problems.",
  },
  {
    q: "Is your online IT support really 100% free?",
    a: "Yes! Helping people with technology is at the heart of what we do. If you are stuck with a software error, website setup, laptop problem, or learning question, reach out through our contact form and we will help guide and troubleshoot it online for free.",
  },
  {
    q: "How do the Free Internships and Coding Coaching work?",
    a: "Our student internships have zero fees—you never pay to learn with us. Interns work on real projects with direct mentor guidance. We also run practical coaching classes for beginners wanting to learn web development, mobile apps, and graphic design step by step.",
  },
  {
    q: "Do I get full ownership of my website or app code?",
    a: "Always yes. Every line of code, design file, logo, and domain stays 100% in your name and your accounts so you are never locked in.",
  },
  {
    q: "How do I start a project, ask for free IT help, or apply for an internship?",
    a: "Simply click 'Let's talk' in the top bar or 'Get Free IT Help' below. Tell us in plain words what you need—whether it is a business website, mobile app, graphics, coaching, internship, or free tech support—and we will reply within 24 hours.",
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
// Native <dialog> Modals: Proposal, Estimate & Project Dossier
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useDialogSync(dialogRef, !!pkg, onClose);

  return (
    <dialog
      ref={dialogRef}
      className="lb-dialog lb-proposal-modal"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      {pkg && (
        <>
          <div className="lb-modal-head">
            <div>
              <span className="lb-modal-kicker">
                TIER {pkg.tierNumber} · {pkg.badge}
              </span>
              <h2 id={titleId} className="lb-modal-title">
                {pkg.title} — Architecture Proposal
              </h2>
            </div>
            <button
              type="button"
              className="lb-modal-close"
              onClick={() => dialogRef.current?.close()}
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
            <button
              type="button"
              className="lb-btn-ghost"
              onClick={() => dialogRef.current?.close()}
            >
              Close Overview
            </button>
            <button
              type="button"
              className="lb-btn-solid"
              autoFocus
              onClick={() => {
                const title = pkg.title;
                dialogRef.current?.close();
                onRequestEstimate(title);
              }}
            >
              Configure Free Estimate <ArrowRight size={15} />
            </button>
          </div>
        </>
      )}
    </dialog>
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
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
    if (open) setSubmitted(false);
  }, [open]);

  useDialogSync(dialogRef, open, onClose);

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
    <dialog
      ref={dialogRef}
      className="lb-dialog dark-glass lb-estimate-modal"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="lb-modal-head">
        <div>
          <span className="lb-modal-kicker">
            PROJECT SCOPING · {initialPackage.toUpperCase()}
          </span>
          <h2 id={titleId} className="lb-modal-title">
            Get a Tailored Engineering Estimate
          </h2>
        </div>
        <button
          type="button"
          className="lb-modal-close"
          onClick={() => dialogRef.current?.close()}
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
            <a
              href={`mailto:hr.digenttech@gmail.com?subject=${encodeURIComponent(
                `Project Estimate — ${initialPackage} (${name})`
              )}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nPackage: ${initialPackage}\nScopes: ${selectedScopes.join(", ")}\n\nNotes:\n${notes}`
              )}`}
            >
              hr.digenttech@gmail.com
            </a>{" "}
            or expect a response within 24 business hours.
          </p>
          <button
            type="button"
            className="lb-btn-gold"
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
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
                autoFocus
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
              <span>Brief Goals &amp; Target Timeline</span>
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
    </dialog>
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useDialogSync(dialogRef, !!project, onClose);

  return (
    <dialog
      ref={dialogRef}
      className="lb-dialog lb-project-modal"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      {project && (
        <>
          <button
            type="button"
            className="lb-modal-close floating"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close case study modal"
          >
            <X size={18} />
          </button>

          <div className="lb-project-modal-grid">
            <div className="lb-project-modal-visual">
              <img
                src={project.image}
                alt={project.title}
                ref={(el) => {
                  el?.setAttribute("fetchpriority", "low");
                }}
              />
              <div className="lb-project-modal-badge">{project.metric}</div>
            </div>

            <div className="lb-project-modal-body">
              <span className="lb-modal-kicker">
                {project.category} · {project.client}
              </span>
              <h2 id={titleId} className="lb-project-modal-title">
                {project.title}
              </h2>
              <p className="lb-project-modal-summary">{project.summary}</p>

              <div className="lb-project-modal-arch">
                <h4>Architecture &amp; Delivery Notes</h4>
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
                    dialogRef.current?.close();
                    onNavigate(target);
                  }}
                >
                  Explore Practice <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  className="lb-btn-solid"
                  autoFocus
                  onClick={() => {
                    const title = project.title;
                    dialogRef.current?.close();
                    onOpenEstimate(`Similar to ${title}`);
                  }}
                >
                  Build Something Similar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}

function WelcomeHighlightModal({
  open,
  onClose,
  onNavigate,
  onOpenEstimate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenEstimate: (pkgTitle: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useDialogSync(dialogRef, open, onClose);

  const dismiss = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="lb-dialog lb-welcome-modal"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      {open && (
        <div className="lb-welcome-split">
          <div className="lb-welcome-visual">
            <img
              src="/assets/visuals/welcome-helpdesk.jpg"
              alt="Friendly DigentTech engineer offering free online IT support, coding coaching, and web app builds"
              width={896}
              height={1200}
            />
            <div className="lb-welcome-visual-scrim" aria-hidden="true" />
            <div className="lb-welcome-visual-cap">
              <span className="lb-welcome-cap-kicker">ONLINE HELP DESK · INDIA &amp; GLOBAL</span>
              <strong>Real builders ready to help you free online.</strong>
              <a href="tel:+919194134646" className="lb-welcome-phone-link">
                Call: +91-9194134646
              </a>
            </div>
          </div>

          <div className="lb-welcome-shell">
            <div className="lb-welcome-top">
              <span className="lb-welcome-pill">
                <span className="lb-free-help-dot" aria-hidden="true" />
                <span>FREE ONLINE IT SUPPORT · COACHING · BUILDS</span>
              </span>
              <button
                type="button"
                className="lb-modal-close lb-welcome-close"
                onClick={dismiss}
                aria-label="Close popup"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <h2 id={titleId} className="lb-welcome-heading">
              Need Free Tech Help, a Website, App, or Internship?
            </h2>
            <p className="lb-welcome-text">
              Tell us what you need in simple words. We build websites, mobile apps, and
              graphics—and help students &amp; people for free with online IT support, coaching, and
              zero-fee internships.
            </p>

            <div className="lb-welcome-cards">
              <button
                type="button"
                className="lb-welcome-option is-help"
                onClick={() => {
                  dismiss();
                  onNavigate("/contact?service=Free%20Online%20IT%20Support");
                }}
              >
                <div>
                  <span className="lb-welcome-tag">100% FREE</span>
                  <strong>Free Online IT Support</strong>
                  <small>Laptop, software, setup &amp; tech troubleshooting</small>
                </div>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="lb-welcome-option"
                onClick={() => {
                  dismiss();
                  onOpenEstimate("Website, App or Graphics Build");
                }}
              >
                <div>
                  <span className="lb-welcome-tag">CLIENT BUILDS</span>
                  <strong>Websites, Mobile Apps &amp; Graphics</strong>
                  <small>Custom portals, Android/iOS apps, logos &amp; UI design</small>
                </div>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="lb-welcome-option"
                onClick={() => {
                  dismiss();
                  onNavigate("/careers");
                }}
              >
                <div>
                  <span className="lb-welcome-tag">₹0 FEE</span>
                  <strong>Coaching &amp; Free Internships</strong>
                  <small>Learn coding &amp; work on live projects with mentors</small>
                </div>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="lb-welcome-actions">
              <button
                type="button"
                className="lb-welcome-skip"
                onClick={dismiss}
              >
                Close &amp; browse site
              </button>
              <button
                type="button"
                className="lb-btn-rect"
                onClick={() => {
                  dismiss();
                  onNavigate("/contact?service=Free%20Online%20IT%20Support");
                }}
              >
                ASK FOR FREE IT HELP <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

// ============================================================================
// Main Exported Home Sections Composite
// ============================================================================

export function HomeEditorialSections({ theme, onNavigate }: HomeSectionsProps) {
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [highlightsVisible, setHighlightsVisible] = useState(false);

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [spotlightId, setSpotlightId] = useState<string>(PORTFOLIO_PROJECTS[0].id);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<CardSwapHandle | null>(null);
  const spotlightInteracted = useRef(false);

  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [testimonialSliding, setTestimonialSliding] = useState(false);
  const [testimonialPaused, setTestimonialPaused] = useState(() =>
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const [proposalPkg, setProposalPkg] = useState<EngagementPackage | null>(null);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [estimatePackageLabel, setEstimatePackageLabel] = useState("Core Production Platform");
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("dt-welcome-popup-v1") === "1") return;
    } catch {}
    const timer = window.setTimeout(() => {
      setWelcomeOpen(true);
    }, 2100);
    return () => window.clearTimeout(timer);
  }, []);

  const handleCloseWelcome = () => {
    setWelcomeOpen(false);
    try {
      sessionStorage.setItem("dt-welcome-popup-v1", "1");
    } catch {}
  };

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

  const totalTestimonialSlides = Math.ceil(CLIENT_TESTIMONIALS.length / 2);
  useEffect(() => {
    if (testimonialPaused) return;
    const timer = window.setInterval(() => {
      setTestimonialSliding(true);
      setTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [testimonialPaused, totalTestimonialSlides]);

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

  const spotlightProject =
    filteredProjects.find((p) => p.id === spotlightId) ??
    filteredProjects[0] ??
    PORTFOLIO_PROJECTS[0];
  const rawSpotlightIdx = filteredProjects.findIndex((p) => p.id === spotlightProject.id);
  const spotlightIdx = rawSpotlightIdx >= 0 ? rawSpotlightIdx : 0;

  useEffect(() => {
    if (spotlightInteracted.current) {
      animateWorkSpotlight(spotlightRef.current);
    }
  }, [spotlightProject.id]);

  const handleSelectFilter = (cat: string, buttonEl?: HTMLElement | null) => {
    spotlightInteracted.current = true;
    setActiveFilter(cat);
    const nextFirst =
      cat === "ALL"
        ? PORTFOLIO_PROJECTS[0]
        : PORTFOLIO_PROJECTS.find((p) => p.category === cat);
    if (nextFirst) setSpotlightId(nextFirst.id);
    buttonEl?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const stepSpotlight = (delta: number) => {
    if (filteredProjects.length < 2) return;
    spotlightInteracted.current = true;
    if (delta < 0) {
      cardSwapRef.current?.prev();
    } else {
      cardSwapRef.current?.next();
    }
  };

  const renderCategoryBadgeIcon = (category: string) => {
    if (category.includes("AI")) return <Bot size={13} aria-hidden="true" />;
    if (category.includes("MOBILE")) return <Smartphone size={13} aria-hidden="true" />;
    if (category.includes("DESIGN")) return <Layers size={13} aria-hidden="true" />;
    return <Globe size={13} aria-hidden="true" />;
  };

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
                src="/assets/visuals/workspace-light.webp"
                alt="DigentTech engineering workspace and architecture studio"
                width={1536}
                height={1024}
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
                <span>WELCOME TO DIGENTTECH</span>
              </div>

              <h2 className="lb-about-title">
                Smart Software for Business. <em>Free Tech Help</em> for People.
              </h2>

              <p className="lb-about-desc">
                Need a clean website, mobile app, or custom graphics? We build everything in simple,
                clear steps with zero confusing jargon. Alongside our client projects, we love
                helping people—offering practical tech coaching, zero-fee student internships,
                and free online IT support whenever someone gets stuck.
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

      {/* 3. Key Highlights Dark Textured Stats Banner + Highlighted Free Online IT Support Callout */}
      <section ref={highlightsRef} className="lb-highlights-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="PROVEN NUMBERS & COMMUNITY CARE" />
            <h2 className="lb-section-heading">Why People Trust DigentTech</h2>
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

        <div className="wrap">
          <div className="lb-free-help-banner" role="region" aria-label="Free Online IT Support and Community Programs">
            <div className="lb-free-help-copy">
              <div className="lb-free-help-badge">
                <span className="lb-free-help-dot" aria-hidden="true" />
                <span>FREE ONLINE IT SUPPORT · FREE INTERNSHIPS · FRIENDLY COACHING</span>
              </div>
              <h3>Need Tech Help, Coaching, or a Free Internship? We Are Here for You.</h3>
              <p>
                Whether your laptop is acting up, a website has an error, or you are a student
                looking to learn coding and get free real-project experience—reach out anytime.
                Our online IT support for individuals and student guidance is 100% free.
              </p>
              <div className="lb-free-help-pills">
                <span><Check size={13} /> Free Online IT Help</span>
                <span><Check size={13} /> Zero-Fee Student Internships</span>
                <span><Check size={13} /> Step-by-Step Coaching</span>
              </div>
            </div>
            <div className="lb-free-help-actions">
              <a
                href="/contact?service=Free%20Online%20IT%20Support"
                className="lb-btn-rect"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/contact?service=Free%20Online%20IT%20Support");
                }}
              >
                ASK FOR FREE IT HELP <ArrowRight size={15} />
              </a>
              <a
                href="/careers"
                className="lb-btn-outline-rect"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/careers");
                }}
              >
                APPLY FOR FREE INTERNSHIP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Services — 4 Dashed Corner-Anchor Chamfer Cards */}
      <section className="lb-services-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="HOW WE CAN HELP YOU" />
            <h2 className="lb-section-heading">What We Offer</h2>
            <p className="lb-section-sub">
              Easy-to-understand web, app, and graphic design services for businesses—plus coaching, free internships, and free online IT support for learners and people in need.
            </p>
          </div>

          <div className="lb-services-grid">
            {SERVICE_CARDS.map((svc) => (
              <article
                key={svc.code}
                className={`lb-service-box ${svc.highlightTag ? "is-community-highlight" : ""}`}
              >
                <span className="lb-service-corner-sq" aria-hidden="true" />
                <div className="lb-service-box-top">
                  <span className="lb-service-num">
                    {svc.code}
                    {svc.highlightTag && (
                      <em className="lb-service-highlight-pill">{svc.highlightTag}</em>
                    )}
                  </span>
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
        <div className="lb-whatwedo-black-curtain" aria-hidden="true" />
        <div className="wrap lb-whatwedo-wrap">
          <div className="lb-centered-header on-dark">
            <SlantedBadge label="EVERYTHING IN ONE PLACE" darkBand />
            <h2 className="lb-section-heading on-dark">What We Do</h2>
            <p className="lb-section-sub on-dark">
              Web development, mobile apps, graphics &amp; UI design, coding coaching, free internships, and free online IT support—explained simply.
            </p>
          </div>

          <div className="lb-whatwedo-grid">
            {WHAT_WE_DO_ITEMS.map((item) => (
              <article key={item.title} className={`lb-wire-card ${item.badge ? "is-free-highlight" : ""}`}>
                <div className="lb-wire-card-inner">
                  <div className="lb-wire-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    {item.badge && <span className="lb-wire-free-badge">{item.badge}</span>}
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
                      <span>{item.badge ? "GET FREE HELP" : "EXPLORE MORE"}</span>
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

      {/* 6. Shipped Platforms, Delivery Flow Strip, Interactive Spotlight & 9 Flagship Cards */}
      <section className="lb-projects-section" aria-label="Our Work and Simple Process">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="OUR WORK · 09 REAL PROJECTS" />
            <h2 className="lb-section-heading">
              Websites, Apps &amp; Designs <em>Built Cleanly</em>
            </h2>
            <p className="lb-section-sub">
              See how our step-by-step process works, preview featured projects, or click any card below to inspect real work we have built.
            </p>
          </div>

          <div className="lb-work-flow-strip" aria-label="Engineering delivery flow">
            <div className="lb-work-flow-line" aria-hidden="true">
              <span className="lb-work-flow-line-fill" />
            </div>
            <div className="lb-work-flow-grid">
              {DELIVERY_FLOW_STEPS.map((s) => (
                <div key={s.step} className="lb-work-flow-step">
                  <div className="lb-work-flow-head">
                    <span className="lb-work-flow-index">{s.step}</span>
                    <span className="lb-work-flow-phase">{s.phase}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lb-filter-bar-wrap">
            <div className="lb-filter-bar" role="tablist" aria-label="Filter projects by discipline">
              {PORTFOLIO_FILTERS.map((cat) => {
                const count =
                  cat === "ALL"
                    ? PORTFOLIO_PROJECTS.length
                    : PORTFOLIO_PROJECTS.filter((p) => p.category === cat).length;
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`lb-filter-btn ${active ? "active" : ""}`}
                    onClick={(e) => handleSelectFilter(cat, e.currentTarget)}
                  >
                    <span>{cat}</span>
                    <span className="lb-filter-count" aria-hidden="true">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive 3D CardSwap Flagship Showcase */}
          <div
            className="lb-cardswap-showcase"
            aria-label={`Interactive project stack: ${spotlightProject.title}`}
          >
            <div ref={spotlightRef} className="lb-work-spotlight-body lb-cardswap-info">
              <div className="lb-work-spotlight-controls">
                <span className="lb-work-spot-counter">
                  PROJECT {String(spotlightIdx + 1).padStart(2, "0")} /{" "}
                  {String(filteredProjects.length).padStart(2, "0")}
                </span>
                <div className="lb-work-spot-arrows">
                  <button
                    type="button"
                    className="lb-work-spot-arrow-btn"
                    aria-label="Previous spotlight project"
                    onClick={() => stepSpotlight(-1)}
                    disabled={filteredProjects.length < 2}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="lb-work-spot-arrow-btn"
                    aria-label="Next spotlight project"
                    onClick={() => stepSpotlight(1)}
                    disabled={filteredProjects.length < 2}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="lb-work-spotlight-kicker lb-work-spotlight-stagger">
                <Layers size={14} aria-hidden="true" />
                <span>
                  {spotlightProject.category} · {spotlightProject.client}
                </span>
              </div>

              <h3 className="lb-work-spotlight-title lb-work-spotlight-stagger">
                {spotlightProject.title}
              </h3>

              <div className="lb-cardswap-meta-row lb-work-spotlight-stagger">
                <span className="lb-swap-pill-metric">
                  <Zap size={12} aria-hidden="true" />
                  {spotlightProject.metric}
                </span>
                <span className="lb-swap-pill-vel">{spotlightProject.velocity}</span>
              </div>

              <p className="lb-work-spotlight-summary lb-work-spotlight-stagger">
                {spotlightProject.summary}
              </p>

              <div
                className="lb-work-spotlight-flow lb-work-spotlight-stagger"
                aria-label="System build flow stages"
              >
                {spotlightProject.flowStages.map((stage, i) => (
                  <span key={stage} className="lb-work-stage-chip">
                    <em>0{i + 1}</em>
                    {stage}
                  </span>
                ))}
              </div>

              <ul className="lb-work-spotlight-arch lb-work-spotlight-stagger">
                {spotlightProject.architecture.map((line) => (
                  <li key={line}>
                    <Check size={14} aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="lb-work-spotlight-tags lb-work-spotlight-stagger">
                {spotlightProject.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="lb-work-spotlight-actions lb-work-spotlight-stagger">
                <button
                  type="button"
                  className="lb-btn-rect"
                  onClick={() => setSelectedProject(spotlightProject)}
                >
                  INSPECT FULL DOSSIER <ArrowUpRight size={15} />
                </button>
                <a
                  href="/work"
                  className="lb-btn-outline-rect"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/work");
                  }}
                >
                  OPEN WORK ARCHIVE <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="lb-cardswap-stage-col">
              <div className="lb-cardswap-stage-wrap">
                <CardSwap
                  key={activeFilter}
                  ref={cardSwapRef}
                  theme="light"
                  width={460}
                  height={350}
                  cardDistance={46}
                  verticalDistance={54}
                  depth={82}
                  skewAmount={5}
                  visibleCards={Math.min(4, Math.max(1, filteredProjects.length))}
                  delay={4200}
                  autoplay={filteredProjects.length > 1}
                  pauseOnHover={true}
                  draggable={filteredProjects.length > 1}
                  parallax={0.42}
                  hoverSpread={0.12}
                  dim={0.42}
                  cardRadius={16}
                  onChange={(idx) => {
                    spotlightInteracted.current = true;
                    const proj = filteredProjects[idx];
                    if (proj) setSpotlightId(proj.id);
                  }}
                  onCardClick={(idx) => {
                    const proj = filteredProjects[idx];
                    if (proj && idx === spotlightIdx) {
                      setSelectedProject(proj);
                    }
                  }}
                >
                  {filteredProjects.map((proj) => (
                    <Card key={proj.id} className="lb-swap-project-tile">
                      <div className="card-swap-item">
                        <div className="card-swap-head">
                          <span className="card-swap-icon" aria-hidden="true">
                            {renderCategoryBadgeIcon(proj.category)}
                          </span>
                          <span className="lb-swap-idx">{proj.index}</span>
                          <span className="card-swap-title">{proj.title}</span>
                          <span className="lb-swap-cat">{proj.category}</span>
                        </div>
                        <div className="card-swap-media">
                          <img
                            src={proj.image}
                            alt={`${proj.title} platform preview`}
                            draggable={false}
                          />
                          <div className="lb-swap-media-bar">
                            <span className="lb-swap-metric">{proj.metric}</span>
                            <span className="lb-swap-action">
                              Dossier <ArrowUpRight size={13} aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
              <p className="lb-swap-hint">
                Drag any front card to swap, click a stacked card to bring it forward, or click the front card to open its full case study.
              </p>
            </div>
          </div>

          {/* Quick-Jump Project Index Dock */}
          <div className="lb-cardswap-dock" role="list" aria-label="Quick project selector">
            {filteredProjects.map((proj, idx) => {
              const isFront = proj.id === spotlightProject.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="listitem"
                  className={`lb-cardswap-dock-btn ${isFront ? "is-active" : ""}`}
                  onClick={() => {
                    spotlightInteracted.current = true;
                    if (idx === spotlightIdx) {
                      setSelectedProject(proj);
                    } else {
                      cardSwapRef.current?.goToIndex(idx);
                    }
                  }}
                >
                  <span className="lb-dock-idx">{proj.index}</span>
                  <span className="lb-dock-title">{proj.title}</span>
                </button>
              );
            })}
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
              EXPLORE ALL 9 PRODUCTION SYSTEMS <ArrowRight size={15} />
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
                onClick={() => {
                  setTestimonialSliding(true);
                  setTestimonialSlide(
                    (prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides
                  );
                }}
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
                    onClick={() => {
                      setTestimonialSliding(true);
                      setTestimonialSlide(i);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                className="lb-carousel-arrow"
                aria-label="Next testimonials"
                onClick={() => {
                  setTestimonialSliding(true);
                  setTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            key={testimonialSliding ? testimonialSlide : "initial"}
            className={`lb-testimonials-grid ${testimonialSliding ? "is-sliding" : ""}`}
          >
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

      {/* 8B. 3-Tier Horizontal Options: Business Builds + Learning & Free IT Help */}
      <section className="lb-packages-section">
        <div className="wrap">
          <div className="lb-centered-header">
            <SlantedBadge label="WAYS WE WORK TOGETHER" />
            <h2 className="lb-section-heading">Plans, Learning &amp; Free Tech Help</h2>
            <p className="lb-section-sub">
              Choose a website or mobile app plan for your business—or join our coding coaching, free internships, and free online IT support.
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
                  src="/assets/founder.webp"
                  alt="DigentTech engineering leadership portrait"
                  width={720}
                  height={960}
                  loading="lazy"
                />
                <div className="lb-faq-photo-note">
                  <strong>Friendly &amp; Direct Support</strong>
                  <span>Work directly with real builders—or ask us for free online IT help anytime.</span>
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

      {/* Native <dialog> Modals */}
      <WelcomeHighlightModal
        open={welcomeOpen && !proposalPkg && !estimateOpen && !selectedProject}
        onClose={handleCloseWelcome}
        onNavigate={onNavigate}
        onOpenEstimate={handleOpenEstimate}
      />
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
