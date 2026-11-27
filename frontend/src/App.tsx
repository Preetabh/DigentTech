import {
    ArrowRight,
    ArrowUpRight,
    Award,
    BarChart3,
    Check,
    ChevronDown,
    Clock,
    Cloud,
    Code2,
    Copy,
    Cpu,
    Database,
    Globe2,
    Home as HomeIcon,
    Layers,
    Lock,
    MapPin,
    Menu,
    Minus,
    Moon,
    Pause,
    Play,
    Plus,
    RefreshCw,
    Server,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Star,
    Sun,
    Terminal,
    TrendingUp,
    Users,
    X,
    Zap
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AISolutions } from "./AISolutions";
import { AboutPage } from "./AboutPage";
import { AppDevelopment } from "./AppDevelopment";
import { CareersPage } from "./CareersPage";
import { WorkPage } from "./WorkPage";
import { DigitalMarketing } from "./DigitalMarketing";
import { useHomeGsapChoreography } from "./HomeAnimations";
import { HomeEditorialSections } from "./HomeSections";
import { SEO } from "./SEO";
import { BrandLogo, StudioNote } from "./Studio";
import {
    CapabilityExplorer,
    DesignDetails,
    ProjectStarter,
    ThemeImage
} from "./VisualExperience";
import { WebDevelopment } from "./WebDevelopment";
import GhostFibers from "./GhostFibers";
import { DeepResearchHeroConsole, DeepResearchWorkbench } from "./HomeDashboard";
const email = (import.meta.env.VITE_CONTACT_EMAIL as string) || "hr.digenttech@gmail.com";
const services = [
  {
    path: "/web-development",
    title: "Web development",
    headline: "Platforms built for speed and scale.",
    text: "Sub-second React & Next.js platforms, multi-tenant SaaS portals, and headless storefronts engineered around measurable conversion.",
    icon: Globe2,
    tags: ["Enterprise SaaS", "Headless Commerce", "Edge SSR"],
    items: [
      "Sub-300ms edge rendering and design token architecture",
      "Typed API contracts, RBAC auth, and CMS integration",
      "Technical SEO, structured schema, and Core Web Vitals",
      "Playwright regression suite, rollout, and full repo handover",
    ],
  },
  {
    path: "/app-development",
    title: "App development",
    headline: "Mobile software teams rely on daily.",
    text: "Cross-platform iOS & Android applications with offline SQLite synchronization, biometric hardware vaults, and 60fps native responsiveness.",
    icon: Smartphone,
    tags: ["iOS & Android", "Offline Sync", "Biometric Auth"],
    items: [
      "Device-tested interactive prototypes and thumb ergonomics",
      "Unified React Native / Flutter apps with native bridges",
      "Offline-first SQLite sync and hardware Secure Enclave auth",
      "App Store & Google Play release management and OTA updates",
    ],
  },
  {
    path: "/digital-marketing",
    title: "Digital marketing",
    headline: "Acquisition grounded in real attribution.",
    text: "Programmatic SEO, dynamic creative testing, and server-side CAPI tracking built to lower acquisition cost and compound ROAS.",
    icon: BarChart3,
    tags: ["Technical SEO", "Server-Side CAPI", "Paid Scale"],
    items: [
      "Search intent clustering and conversion funnel architecture",
      "In-house ad creative sprints and high-converting landing pages",
      "Server-side GTM, Meta CAPI, and GA4 revenue attribution",
      "Weekly unit-economics reporting on ROAS, CAC, and LTV",
    ],
  },
  {
    path: "/ai-solutions",
    title: "AI & automation",
    headline: "Eliminate manual ops with grounded AI.",
    text: "Multi-agent workflows, hybrid vector RAG over private company records, and deterministic ERP automations with strict human review gates.",
    icon: Sparkles,
    tags: ["Multi-Agent RAG", "Private VPC", "ERP Automation"],
    items: [
      "Workflow bottleneck audit and token-ROI feasibility blueprint",
      "Hybrid vector RAG with verifiable paragraph citations",
      "Schema-enforced guardrails and human approval checkpoints",
      "Private VPC deployment with zero public model training",
    ],
  },
];
const navServices = [
  {
    title: "Web Development",
    href: "/web-development",
    icon: Globe2,
    badge: "Next.js · Edge SSR",
    description: "Sub-300ms SaaS portals, enterprise dashboards & headless commerce.",
    accent: "#3b82f6",
  },
  {
    title: "App Development",
    href: "/app-development",
    icon: Smartphone,
    badge: "iOS · Android",
    description: "60fps cross-platform apps with offline SQLite sync & biometrics.",
    accent: "#d6b676",
  },
  {
    title: "Digital Marketing",
    href: "/digital-marketing",
    icon: BarChart3,
    badge: "SEO · CAPI ROAS",
    description: "Server-side attribution, technical SEO & conversion-tested acquisition.",
    accent: "#10b981",
  },
  {
    title: "AI Solutions",
    href: "/ai-solutions",
    icon: Sparkles,
    badge: "Agents · Private RAG",
    description: "Deterministic multi-agent workflows, vector search & VPC LLMs.",
    accent: "#6b9fff",
  },
];

const projects = [
  {
    name: "InfraPilot",
    category: "web",
    categoryLabel: "ERP / CRM PLATFORM",
    liveBadge: "Active in 12 enterprise sites",
    metric: "45% faster site logistics",
    image: "/assets/projects/infrapilot-crm-portal.png",
    description: "Bringing heavy infrastructure operations, budgets and sub-contractors into one unified live dashboard.",
    detail: "A mission-critical enterprise portal built for civil infrastructure teams. Tracks real-time machinery allocations, vendor payments, blueprint revisions, and milestone compliance with zero latency.",
    tags: ["React 19", "Enterprise ERP", "Cloud Architecture", "PostgreSQL"],
    color: "sand",
    stats: [
      { label: "Deployment", val: "12 Enterprise Sites" },
      { label: "Efficiency", val: "45% Logistics Boost" },
      { label: "Architecture", val: "Next.js / Node.js" },
    ],
  },
  {
    name: "HrMitra",
    category: "web",
    categoryLabel: "WORKFORCE MANAGEMENT",
    liveBadge: "25k+ active daily employees",
    metric: "99.98% system uptime",
    image: "/assets/projects/hrmitra-hrm-portal.png",
    description: "An intuitive people workspace connecting attendance, multi-tier approvals, payroll and team performance.",
    detail: "A modern workforce management suite that automates biometric attendance tracking, leave requests, employee compliance, and payroll slips with instant calculation speed.",
    tags: ["Next.js", "Workforce UX", "TypeScript", "Redis"],
    color: "lavender",
    stats: [
      { label: "Active Users", val: "25k+ Daily Seats" },
      { label: "SLA Uptime", val: "99.98% Availability" },
      { label: "Stack", val: "React / Tailwind / Node" },
    ],
  },
  {
    name: "NovaCommerce",
    category: "web",
    categoryLabel: "HEADLESS RETAIL",
    liveBadge: "Edge CDN deployed globally",
    metric: "0.28s TTFB · +64% CVR",
    image: "/assets/projects/novacommerce-web-portal.png",
    description: "Sub-second headless digital storefront built for high-throughput multi-currency retail transactions.",
    detail: "Decoupled commerce experience powered by Cloudflare Workers and Next.js 15. Features instant search filtering, fluid cart drawers, dynamic inventory sync, and localized checkout rails.",
    tags: ["Shopify Plus", "Edge Workers", "Stripe Rails", "GraphQL"],
    color: "emerald",
    stats: [
      { label: "Global TTFB", val: "0.28s Sub-second" },
      { label: "Mobile CVR", val: "+64% Conversion Lift" },
      { label: "Infrastructure", val: "Edge CDN & Stripe" },
    ],
  },
  {
    name: "AuraPay",
    category: "mobile",
    categoryLabel: "FINTECH MOBILE APP",
    liveBadge: "100k+ downloads · 4.9★",
    metric: "Zero-fraud biometric vault",
    image: "/assets/projects/aurapay-mobile-app.png",
    description: "Next-generation mobile banking with multi-currency cross-border transfers and instant biometric cards.",
    detail: "Clean tactile mobile banking interface with end-to-end encrypted biometric signing, automated expense categorization, and sub-second instant remittance across 40 currencies.",
    tags: ["React Native", "iOS / Android", "Biometric SDK", "FinTech"],
    color: "cyan",
    stats: [
      { label: "App Store Rating", val: "4.9★ (12k Reviews)" },
      { label: "Active Cards", val: "100k+ Issued" },
      { label: "Security", val: "Biometric Hardware Vault" },
    ],
  },
  {
    name: "PulseFit",
    category: "mobile",
    categoryLabel: "CONNECTED HEALTH",
    liveBadge: "Apple Watch & Wear OS sync",
    metric: "500k+ workouts tracked",
    image: "/assets/projects/pulsefit-mobile-app.png",
    description: "Real-time biometric workout coaching with smart device telemetry and interactive recovery analytics.",
    detail: "Engineered for high-performance athletes. Streams real-time Bluetooth heart-rate monitors, predicts fatigue with local ML models, and generates personalized metabolic recovery schedules.",
    tags: ["Flutter", "BLE Telemetry", "HealthKit Sync", "FastAPI"],
    color: "rose",
    stats: [
      { label: "Telemetry", val: "Realtime BLE 60Hz" },
      { label: "Workouts", val: "500k+ Logged" },
      { label: "Platform", val: "iOS / WatchOS / Android" },
    ],
  },
  {
    name: "Quantos Terminal",
    category: "web",
    categoryLabel: "MARKET INTELLIGENCE",
    liveBadge: "Sub-5ms tick engine",
    metric: "1.2M events/sec stream",
    image: "/assets/projects/quantos-web-terminal.png",
    description: "Ultra-low-latency financial analytics terminal visualizing order-book depth and liquidity flows.",
    detail: "A high-frequency web trading terminal supporting interactive Canvas order books, automated risk alerting, and zero-drop WebSocket channels even during market volatility spikes.",
    tags: ["WebSockets", "Canvas 2D", "Go Engine", "TimescaleDB"],
    color: "amber",
    stats: [
      { label: "Throughput", val: "1.2M Events / sec" },
      { label: "WebSocket Lag", val: "< 5ms Latency" },
      { label: "Rendering", val: "Hardware Accelerated" },
    ],
  },
  {
    name: "Claymorphism Design System",
    category: "design",
    categoryLabel: "SYSTEM & TOKENS",
    liveBadge: "Adopted by 8 product squads",
    metric: "180+ reusable tokens",
    image: "/assets/projects/claymorphism-design-tokens.png",
    description: "A tactile, accessible multi-brand design system bridging cross-platform UI tokens and code.",
    detail: "Comprehensive token system for modern products, featuring calibrated elevation shadows, fluid typography scales, accessible color pairings, and automated Figma-to-code pipelines.",
    tags: ["Design Tokens", "WCAG AAA", "Figma Tokens", "Storybook"],
    color: "violet",
    stats: [
      { label: "Component Count", val: "180+ Primitives" },
      { label: "Accessibility", val: "WCAG 2.2 AAA" },
      { label: "Tokens", val: "Cross-Platform Sync" },
    ],
  },
];
const steps = [
  [
    "Discover & Scope",
    "We audit operational bottlenecks, map data contracts, and lock fixed milestone pricing before writing code.",
  ],
  [
    "Prototype & Tokens",
    "Interactive Figma user flows and accessible dark/light token systems reviewed directly on your devices.",
  ],
  [
    "Bi-Weekly Sprints",
    "You test live staging deployments every 14 days with full GitHub visibility and direct staff architect access.",
  ],
  [
    "Launch & Handover",
    "Zero-downtime edge rollout, automated E2E checks, team onboarding, and 100% repository & cloud ownership.",
  ],
];
function Button({
  children,
  href = "/contact",
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
function Heading({
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
function PageHero({
  label,
  title,
  text,
  theme = "dark",
  highlights = [],
}: {
  label: string;
  title: React.ReactNode;
  text: string;
  theme?: "dark" | "light";
  highlights?: string[];
}) {
  return (
    <header className="atelier-hero-stage">
      <div className="home-hero-ghost-bg" aria-hidden="true">
        <GhostFibers
          lineColor={theme === "light" ? "#1d4ed8" : "#11224d"}
          glowColor={theme === "light" ? "#0284c7" : "#38bdf8"}
          speed={0.18}
          scale={1.9}
          layers={3}
          brightness={theme === "light" ? 1.08 : 1.25}
          glowIntensity={theme === "light" ? 0.5 : 0.85}
          blueBoost={theme === "light" ? 1.0 : 1.1}
          vignette={0.85}
          grain={0.03}
          lightMode={theme === "light"}
          dpr={1.2}
          fps={40}
        />
      </div>
      <div className="atelier-hero-inner wrap">
        <span className="atelier-hero-badge">
          <i /> {label}
        </span>
        <h1>{title}</h1>
        <p>{text}</p>
        {highlights.length > 0 && (
          <div className="atelier-hero-highlights">
            {highlights.map((h) => (
              <span key={h} className="atelier-hero-chip">
                <Check size={13} />
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
function Services({ full = false }: { full?: boolean }) {
  return (
    <section className="section wrap" id="services">
      <div className="section-top">
        <Heading
          label="CORE ENGINEERING PILLARS"
          title="From the front end to the bigger picture."
          text="Full-spectrum digital capability designed around your commercial goals."
        />
        {!full && (
          <a className="text-link" href="/services">
            Explore all services <ArrowUpRight size={18} />
          </a>
        )}
      </div>
      <div className="service-grid">
        {services.map((s, i) => (
          <a className="service-card" href={s.path} key={s.path}>
            <div className="service-card-top">
              <s.icon size={28} strokeWidth={1.4} />
              <span>0{i + 1}</span>
            </div>
            <span className="service-headline-tag">{s.tags[0]}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul className="service-items-list">
              {s.items.slice(0, 3).map((it) => (
                <li key={it}>
                  <Check size={13} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="service-bottom">
              <span>View Architecture &amp; Scope</span>
              <ArrowUpRight size={22} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
function ProjectInteractiveCard({
  project,
  onSelect,
}: {
  project: (typeof projects)[0];
  onSelect: () => void;
}) {
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    setTilt({
      x: -normY * 5,
      y: normX * 5,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <button
      ref={cardRef}
      className="project-card project-card-interactive"
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${project.name} project details`}
      style={
        {
          "--mouse-x": `${coords.x}px`,
          "--mouse-y": `${coords.y}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="project-card-inner"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
        }}
      >
        <div className="project-card-spotlight" />

        {/* Mac-style Window Top Bar */}
        <div className="project-window-bar">
          <div className="project-window-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="project-window-domain">
            {project.name.toLowerCase().replace(/\s+/g, "")}.io / platform
          </span>
          <div className="project-status-pulse">
            <span className="project-status-dot" />
            <span>Live System</span>
          </div>
        </div>

        {/* Realistic Stage & Elevated Image */}
        <div className={"project-stage " + project.color}>
          <div className="project-stage-img-wrapper">
            <img
              src={project.image}
              alt={project.name + " application dashboard"}
              loading="lazy"
            />
          </div>
          <div className="project-hover-pill">
            <span>Explore Case Study</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Info Block */}
        <div className="project-info-block">
          <div className="project-meta-row">
            <span className="project-category-badge">{project.categoryLabel}</span>
            <span className="project-metric-pill">
              <Zap size={11} style={{ color: "var(--accent)" }} />
              {project.metric}
            </span>
          </div>

          <div className="project-title-row">
            <h3>{project.name}</h3>
            <div className="project-arrow-icon">
              <ArrowUpRight size={17} />
            </div>
          </div>

          <p className="project-desc-text">{project.description}</p>

          <div className="project-tags-list">
            {project.tags.map((t) => (
              <span key={t} className="project-tag-item">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function WorkHero() {
  
  return (
    <section className="work-hero-section wrap">
      <div className="work-hero-content">
        <div className="work-hero-badge">
          <span className="pulse-dot" />
          <span>OUR WORK & PRODUCTION ECOSYSTEM</span>
        </div>
        <h1 className="work-hero-title">
          Ideas turned into <em>everyday experiences.</em>
        </h1>
        <p className="work-hero-text">
          Explore our production business platforms, fintech mobile products and high-impact digital experiences. Real systems engineered for performance, reliability and scale.
        </p>

        <div className="work-hero-stats">
          <div className="hero-stat-chip">
            <span className="hero-stat-num">7</span>
            <span className="hero-stat-desc">Production Systems</span>
          </div>
          <div className="hero-stat-chip">
            <span className="hero-stat-num">99.98%</span>
            <span className="hero-stat-desc">SLA Reliability</span>
          </div>
          <div className="hero-stat-chip">
            <span className="hero-stat-num">&lt; 0.3s</span>
            <span className="hero-stat-desc">Edge Latency</span>
          </div>
        </div>
      </div>

      <div className="work-hero-visual-stage">
        <div className="work-hero-image-card">
          <ThemeImage
            variant="work-showcase"
            alt="DigentTech 3D Digital Product Architecture and Engineering Showcase"
            className="work-hero-art"
            priority={true}
          />
          <div className="work-hero-glass-overlay">
            <div className="glass-indicator">
              <span className="indicator-dot" />
              <span>LIVE CLOUD ARCHITECTURE</span>
            </div>
            <span className="glass-tag">NEXT.JS 15 · EDGE RUNTIME</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({
  full = false,
  selectedIdx,
  onSelectIdx,
}: {
  full?: boolean;
  selectedIdx?: number | null;
  onSelectIdx?: (idx: number | null) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<number | null>(null);
  const selected = selectedIdx !== undefined ? selectedIdx : internalSelected;
  const setSelected = onSelectIdx || setInternalSelected;
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects", count: full ? projects.length : 6 },
    {
      id: "web",
      label: "Web Platforms",
      count: projects.filter((p) => p.category === "web").length,
    },
    {
      id: "mobile",
      label: "Mobile Apps",
      count: projects.filter((p) => p.category === "mobile").length,
    },
    {
      id: "design",
      label: "Design Systems",
      count: projects.filter((p) => p.category === "design").length,
    },
  ];

  const displayedProjects =
    filter === "all"
      ? (full ? projects : projects.slice(0, 6))
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (selected === null) return;
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "Tab") {
        const list = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".project-modal button, .project-modal a",
          ),
        );
        const first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [selected]);

  return (
    <section className="section wrap work-section" id="work">
      <div className="section-top">
        <Heading
          label={full ? "EXPLORE BY DOMAIN" : "PORTFOLIO & CASE STUDIES"}
          title={full ? "All Production Systems." : "Crafted for scale. Shipped with pride."}
          text={full ? "Filter our deployments by technology domain or inspect live architecture specifications." : "Production platforms, mobile ecosystems and modern design systems engineered to outperform."}
        />
        {!full && (
          <a className="text-link" href="/work">
            View full archive (9) <ArrowUpRight size={18} />
          </a>
        )}
      </div>

      {/* Category Tabs */}
      <div className="work-filter-bar" role="tablist" aria-label="Project filter">
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={filter === cat.id}
            className={`work-filter-btn ${filter === cat.id ? "active" : ""}`}
            onClick={() => setFilter(cat.id)}
          >
            <span>{cat.label}</span>
            <span className="work-filter-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Interactive 3D Projects Grid */}
      <div className="project-grid">
        {displayedProjects.map((p) => {
          const originalIndex = projects.findIndex((orig) => orig.name === p.name);
          return (
            <ProjectInteractiveCard
              key={p.name}
              project={p}
              onSelect={() => setSelected(originalIndex)}
            />
          );
        })}
      </div>

      {/* Modal Dialog */}
      {selected !== null && (
        <div className="modal-shade" onClick={() => setSelected(null)}>
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-label={projects[selected].name}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="icon-button close-modal"
              aria-label="Close project"
              autoFocus
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <div className="project-modal-header">
              <div>
                <span className="eyebrow">{projects[selected].categoryLabel}</span>
                <h2>{projects[selected].name}</h2>
              </div>
              <span className="project-metric-pill" style={{ alignSelf: "flex-start", marginTop: "4px" }}>
                <Zap size={12} style={{ color: "var(--accent)" }} />
                {projects[selected].liveBadge}
              </span>
            </div>

            <div className="project-modal-img-container">
              <img
                src={projects[selected].image}
                alt={projects[selected].name + " dashboard"}
              />
            </div>

            <div className="project-modal-metrics-bar">
              {projects[selected].stats.map((st) => (
                <div key={st.label} className="project-modal-metric-item">
                  <span className="project-modal-metric-label">{st.label}</span>
                  <span className="project-modal-metric-val">{st.val}</span>
                </div>
              ))}
            </div>

            <p>{projects[selected].detail}</p>
            <div className="tags">
              {projects[selected].tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Button href={`/contact?service=${encodeURIComponent(projects[selected].category === "mobile" ? "App development" : "Web development")}&brief=${encodeURIComponent(`Inquiry about ${projects[selected].name} architecture`)}`}>
              Discuss a similar project
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
function Process() {
  return (
    <section className="process-section">
      <div className="section wrap">
        <Heading
          label="THE WAY WE WORK"
          title="You know what ships next."
          text="A clear scope. Regular reviews. No disappearing act between the brief and the launch."
        />
        <div className="process-grid">
          {steps.map(([t, d], i) => (
            <article key={t}>
              <span className="process-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function HomeMetricsRibbon() {
  const metrics = [
    { value: "50+", title: "Production Systems", sub: "Shipped across FinTech, SaaS & Commerce" },
    { value: "99.98%", title: "Production SLA Uptime", sub: "Enterprise infrastructure reliability" },
    { value: "4.8x", title: "Average Client ROI Lift", sub: "Measured within 6 months post-launch" },
    { value: "<280ms", title: "Global TTFB Latency", sub: "Distributed edge rendering & caching" },
    { value: "100%", title: "Client IP Ownership", sub: "Full code repositories & asset rights" },
  ];
  return (
    <section className="home-metrics-ribbon wrap">
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div key={m.title} className="metric-box">
            <span className="metric-value">{m.value}</span>
            <span className="metric-title">{m.title}</span>
            <span className="metric-sub">{m.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechStackShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const techCategories = [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Web & Frontend" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "cloud", label: "Cloud & Backend" },
    { id: "ai", label: "AI & Automation" },
  ];

  const technologies = [
    { name: "Next.js 15 / React 19", cat: "frontend", desc: "Sub-second server actions, SSR/ISR pipelines, and micro-frontends.", badge: "Core Engine" },
    { name: "TypeScript Strict", cat: "frontend", desc: "End-to-end typed contract boundaries ensuring zero production runtime surprises.", badge: "Zero Drift" },
    { name: "Tailwind & Design Tokens", cat: "frontend", desc: "Fluid multi-brand token system with WCAG AA+ dark and light surface parity.", badge: "Design System" },
    { name: "React Native / Expo", cat: "mobile", desc: "Native 60/120fps iOS and Android applications with offline-first synchronization.", badge: "Mobile First" },
    { name: "Flutter Engine", cat: "mobile", desc: "Cross-platform high-performance hardware-accelerated interfaces.", badge: "Cross Platform" },
    { name: "Biometric Keystore", cat: "mobile", desc: "Hardware secure enclave for FaceID, TouchID, and local credential tokens.", badge: "Security" },
    { name: "Node.js & Go Microservices", cat: "cloud", desc: "Event-driven asynchronous services handling high-concurrency throughput.", badge: "Low Latency" },
    { name: "PostgreSQL & Timescale", cat: "cloud", desc: "Relational integrity with partition-level time-series analytics indexing.", badge: "Primary DB" },
    { name: "Cloudflare Edge Workers", cat: "cloud", desc: "Sub-50ms distributed cache computation nearest to the end user.", badge: "Edge Compute" },
    { name: "LangChain & LlamaIndex", cat: "ai", desc: "Production RAG orchestration over proprietary enterprise vector stores.", badge: "LLM Pipeline" },
    { name: "OpenAI & Anthropic APIs", cat: "ai", desc: "Fine-tuned model distillation for custom domain workflows and reasoning.", badge: "Intelligent AI" },
    { name: "N8N & Custom Webhooks", cat: "ai", desc: "Deterministic multi-system event loops with human-in-the-loop review guards.", badge: "Automation" },
  ];

  const filtered = activeTab === "all" ? technologies : technologies.filter((t) => t.cat === activeTab);

  return (
    <section className="tech-stack-section wrap">
      <div className="section-top">
        <Heading
          label="BATTLE-TESTED CAPABILITY"
          title="Engineered with modern, resilient stacks."
          text="We select zero legacy fluff. Every layer is chosen for speed, security, and developer ergonomics."
        />
        <div className="tech-tab-pills">
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              className={`tech-tab-btn ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="home-tech-grid">
        {filtered.map((item) => (
          <div key={item.name} className="home-tech-card">
            <div className="home-tech-top">
              <span className="home-tech-name">{item.name}</span>
              <span className="home-tech-badge">{item.badge}</span>
            </div>
            <p className="home-tech-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  const cards = [
    {
      icon: Clock,
      title: "2-Week Tangible Sprints",
      desc: "We don't vanish for months. You test clickable staging builds every fortnight with verified acceptance criteria.",
      badge: "Fast Cadence",
      digent: "Milestones shipped every 14 days",
      legacy: "Months of silent wireframing",
    },
    {
      icon: Users,
      title: "Direct Senior Engineering Squad",
      desc: "Speak directly with the lead engineers and principal architects designing your code. No bloated junior delegate layers.",
      badge: "No Middlemen",
      digent: "Direct Slack with Staff Engineers",
      legacy: "Tier-3 support ticket runarounds",
    },
    {
      icon: ShieldCheck,
      title: "100% Complete IP Ownership",
      desc: "From the first commit, all GitHub repos, design tokens, secrets, and deployment pipelines belong exclusively to you.",
      badge: "Your Code",
      digent: "Clean handover & root repository rights",
      legacy: "Proprietary vendor lock-in traps",
    },
    {
      icon: Zap,
      title: "Sub-300ms SLA & Global Edge",
      desc: "Engineered with modern edge caching, serverless routines, and minimal bundle sizes for instant load speed worldwide.",
      badge: "Sub-Second",
      digent: "<280ms TTFB global average",
      legacy: "Bloated 4s+ legacy monolith templates",
    },
    {
      icon: Award,
      title: "Transparent Milestone Budgets",
      desc: "Every sprint deliverable has fixed, transparent pricing upfront. Zero hidden hourly creep or billing surprises.",
      badge: "Predictable",
      digent: "Locked milestones & defined releases",
      legacy: "Uncapped, runaway hourly bills",
    },
    {
      icon: Cpu,
      title: "AI-Augmented Velocity",
      desc: "We integrate custom AI accelerators into our development cycle to build complex features in half the traditional time.",
      badge: "Modern Edge",
      digent: "AI-native scaffolding & test suites",
      legacy: "Sluggish, repetitive boilerplate cycles",
    },
  ];

  return (
    <section className="why-us-section wrap">
      <div className="section-top">
        <Heading
          label="THE DIGENTTECH ADVANTAGE"
          title="Why ambitious teams build with us."
          text="Compare how we ship vs traditional agency bureaucracy and fragmented freelancing."
        />
      </div>
      <div className="why-us-grid">
        {cards.map((c) => (
          <div key={c.title} className="why-card">
            <div className="why-card-header">
              <div className="why-icon-box">
                <c.icon size={22} />
              </div>
              <span className="why-metric-badge">{c.badge}</span>
            </div>
            <h3 className="why-card-title">{c.title}</h3>
            <p className="why-card-desc">{c.desc}</p>
            <div className="why-vs-container">
              <div className="why-vs-row">
                <span className="why-vs-good">
                  <Check size={14} /> DigentTech: {c.digent}
                </span>
              </div>
              <div className="why-vs-row">
                <span className="why-vs-bad">
                  <Minus size={14} /> Others: {c.legacy}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "DigentTech took InfraPilot from an architectural concept to an active ERP deployed across 12 infrastructure sites. Their velocity and code hygiene are in a league of their own.",
      name: "Rajeshwar Verma",
      role: "VP of Engineering",
      company: "InfraPilot Infrastructure Corp",
      metric: "45% Faster Site Logistics",
      stars: 5,
    },
    {
      quote: "Our workforce platform handles 25,000+ daily employee check-ins without a hiccup. The biometric sync and payroll processing are practically instantaneous. Absolute rockstar team.",
      name: "Ananya Mehta",
      role: "Head of Digital Operations",
      company: "HrMitra Solutions",
      metric: "99.98% SLA Availability",
      stars: 5,
    },
    {
      quote: "Our retail conversion jumped 64% after switching to the headless Next.js storefront they engineered. Global TTFB dropped from 2.4s to 280ms. The ROI was clear within 60 days.",
      name: "Marcus Thorne",
      role: "Director of E-Commerce",
      company: "NovaCommerce Global",
      metric: "+64% Mobile CVR Lift",
      stars: 5,
    },
  ];

  return (
    <section className="testimonials-section wrap">
      <div className="section-top">
        <Heading
          label="VERIFIED CLIENT IMPACT"
          title="Loved by founders and product leaders."
          text="Real metrics and unfiltered feedback from partners who scale with DigentTech."
        />
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card">
            <div className="testimonial-stars">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="testimonial-quote">"{t.quote}"</p>
            <div className="testimonial-outcome-pill">
              <TrendingUp size={14} />
              <span>{t.metric}</span>
            </div>
            <div className="testimonial-author-row">
              <div className="testimonial-avatar">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="testimonial-meta">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role} · {t.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does your 2-week sprint cadence actually work?",
      a: "Every 14 days, we ship a tangible, demonstrable increment directly to your staging environment. At the start of the sprint, we commit to specific user stories. During the sprint, you have real-time visibility in our private Slack and GitHub. At the end of the sprint, we demo the working build together, review metrics, and lock the next backlog priority.",
    },
    {
      q: "Do we retain 100% intellectual property and code ownership?",
      a: "Yes, without exception. From day one, all repositories, design tokens, Figma files, cloud configs, and environment keys belong exclusively to your business. We do not use proprietary vendor lock-in code or demand licensing royalties.",
    },
    {
      q: "Can you modernize an existing legacy application without customer downtime?",
      a: "Absolutely. We specialize in the Strangler Fig pattern—incrementally migrating high-value modules into modern Next.js or Go microservices behind a unified API gateway. Your end customers experience zero downtime while performance and UI modernize seamlessly.",
    },
    {
      q: "Who from your team will we communicate with on a daily basis?",
      a: "You communicate directly with the Staff Engineer and Principal Designer building your product. We do not use non-technical account managers who act as communication bottlenecks. You receive daily asynchronous updates, Loom walk-throughs, and instant Slack answers.",
    },
    {
      q: "What happens after our initial platform launch?",
      a: "We provide comprehensive post-launch warranty support, automated uptime telemetry, and continuous enhancement retainers. We also fully onboard your internal engineering team with architectural documentation, recorded video guides, and paired sessions.",
    },
    {
      q: "How quickly can we kick off our project?",
      a: "Once we align on the initial scope and milestones in our discovery session, we typically spin up our squad repository and design workspace within 3 to 5 business days.",
    },
  ];

  return (
    <section className="home-faq-section wrap">
      <div className="section-top">
        <Heading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Clear answers before you commit."
          text="Everything you need to know about our sprints, code quality, and commercial terms."
        />
      </div>
      <div className="home-faq-list">
        {faqs.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.q}
              className={`home-faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                className="home-faq-q"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className="home-faq-icon">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {isOpen && (
                <div className="home-faq-a">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta wrap">
      <span className="eyebrow">READY TO INITIATE YOUR NEXT RELEASE?</span>
      <div>
        <h2>
          What system are we
          <br />
          architecting <em>next?</em>
        </h2>
        <Button>Request architectural consultation</Button>
      </div>
      <p>
        Whether launching a flagship SaaS platform, replacing legacy operational tooling,
        or deploying private AI agents—a lead architect responds within 24 hours with a
        scoped milestone plan.
      </p>
      <span className="cta-coordinate">DigentTech ATELIER · EXECUTIVE DESK ↗</span>

      <div className="cta-trust-bar">
        <div className="cta-trust-badge">
          <ShieldCheck size={16} />
          <span>100% IP &amp; Code Ownership</span>
        </div>
        <div className="cta-trust-badge">
          <Clock size={16} />
          <span>2-Week Tangible Sprints</span>
        </div>
        <div className="cta-trust-badge">
          <Zap size={16} />
          <span>Sub-300ms SLA Latency</span>
        </div>
        <div className="cta-trust-badge">
          <Users size={16} />
          <span>Direct Senior Squad (No Account Managers)</span>
        </div>
      </div>
    </section>
  );
}

function Home({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [selectedWorkIdx, setSelectedWorkIdx] = useState<number | null>(null);
  const homeRootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useHomeGsapChoreography(homeRootRef);
  const [reelPlaying, setReelPlaying] = useState<boolean>(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return true;
  });

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    if (reelPlaying) {
      const p = vid.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          setReelPlaying(false);
        });
      }
    } else {
      vid.pause();
    }
  }, [reelPlaying]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      setReelPlaying(!e.matches);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const handleInspectDossier = (dossierId: string) => {
    const idMap: Record<string, number> = {
      infrapilot: 0,
      hrmitra: 1,
      novacommerce: 2,
      aurapay: 3,
    };
    const idx = idMap[dossierId];
    if (idx !== undefined) {
      setSelectedWorkIdx(idx);
    }
  };

  return (
    <div ref={homeRootRef} className="home-page" data-theme-mode={theme}>
      <section className="home-editorial-masthead">
        <div className="home-aurora-mesh" aria-hidden="true" />
        <aside className="home-social-rail" aria-label="Quick Studio Navigation">
          <div className="home-rail-links">
            <a href="/work" title="Client Dossiers">WK</a>
            <a href="/ai-solutions" title="AI Systems">AI</a>
            <a href="/services" title="Services">SV</a>
            <a href="/contact" title="Start Brief">CT</a>
          </div>
          <span className="home-rail-line" aria-hidden="true" />
          <span className="home-rail-label">INDEX</span>
        </aside>

        <div className="wrap home-editorial-grid">
          <div className="home-editorial-left">
            <div className="home-editorial-kicker" tabIndex={0}>
              <span className="kicker-sizer" aria-hidden="true">DIGENT TECH</span>
              <span className="kicker-half kicker-half-top" aria-hidden="true">DIGENT TECH</span>
              <span className="kicker-half kicker-half-bottom" aria-hidden="true">DIGENT TECH</span>
              <span className="kicker-mid-bar" aria-hidden="true">
                <span className="kicker-mid-text">
                  ARCHITECTURE, PRODUCT ENGINEERING &amp; DEEP AI
                </span>
              </span>
              <span className="sr-only">DIGENT TECH</span>
            </div>
            <h1 className="home-editorial-title">
              Engineering Digital Legacies
              <br />
              in Product, Cloud &amp; <em>Deep AI</em>
            </h1>
            <p className="home-editorial-disciplines">
              Web Platforms <span>|</span> Mobile Apps <span>|</span> Autonomous AI{" "}
              <span>|</span> Cloud Mesh <span>|</span> Product Systems <span>|</span>{" "}
              Enterprise UI
            </p>
          </div>

          <div className="home-editorial-right">
            <div className="home-editorial-seal" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="home-seal-svg">
                <defs>
                  <path
                    id="digentSealPath"
                    d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <circle cx="60" cy="60" r="54" className="home-seal-outer" />
                <text className="home-seal-ring-text">
                  <textPath href="#digentSealPath" startOffset="0%">
                    DIGENT TECH · DEEP SYSTEMS · ARCHITECTURE · ATELIER ·
                  </textPath>
                </text>
              </svg>
              <div className="home-seal-core">DT</div>
            </div>

            <p className="home-editorial-note">
              We are a collective of systems architects, product designers, and AI
              engineers working together to craft enduring software anchored in
              precision and performance.
            </p>

            <div className="home-editorial-proof-row">
              <div className="home-editorial-rating-cluster">
                <div className="home-avatar-stack">
                  <img
                    src="/assets/founder.png"
                    alt="DigentTech Founding Architect"
                    className="home-avatar-img"
                  />
                  <span className="home-avatar-token">AK</span>
                  <span className="home-avatar-token alt">MT</span>
                  <a
                    href="/work"
                    className="home-avatar-more"
                    aria-label="Explore verified client work"
                    title="Explore case studies"
                  >
                    +
                  </a>
                </div>
                <span className="home-rating-stem" aria-hidden="true" />
                <div className="home-rating-stars" aria-label="Rated 4.9 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <span className="home-rating-caption">(4.9) VERIFIED DELIVERY</span>
              </div>

              <a
                href="#what-we-do"
                className="home-editorial-arrow-box"
                aria-label="Explore DigentTech capabilities and case studies"
                title="Explore Capabilities"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 5v9h11" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 10l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="showreel" className="home-cinema-stage" aria-label="DigentTech Studio Showreel">
        <video
          ref={videoRef}
          className="home-cinema-video"
          src="/assets/visuals/hero-studio-reel.mp4"
          poster="/assets/visuals/hero-studio-poster.jpg"
          autoPlay={reelPlaying}
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="home-cinema-controls">
          <span className="home-cinema-chip">Studio Reel · 01–07</span>
          <button
            type="button"
            className="home-reel-toggle"
            onClick={() => setReelPlaying((p) => !p)}
            aria-label={reelPlaying ? "Pause studio reel video" : "Play studio reel video"}
            title={reelPlaying ? "Pause video" : "Play video"}
          >
            {reelPlaying ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
            <span>{reelPlaying ? "Pause" : "Play"}</span>
          </button>
          <a href="/contact" className="home-cinema-brief-pill">
            Initiate Brief <ArrowUpRight size={13} />
          </a>
        </div>
      </section>

      <HomeEditorialSections
        theme={theme}
        onNavigate={(to) => {
          window.dispatchEvent(new CustomEvent("dt:navigate", { detail: { to } }));
        }}
      />
    </div>
  );
}
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    [
      "How do we get started?",
      "Tell us what you have in mind through our project form. We will discuss your goals and prepare a scope with deliverables, timeline and pricing.",
    ],
    [
      "How much will my project cost?",
      "Pricing depends on scope, complexity and integrations. We provide a project-specific proposal after understanding your requirements.",
    ],
    [
      "Will I be involved during the project?",
      "Yes. We share work at agreed milestones so you can review progress and give feedback before the next stage.",
    ],
    [
      "Can you improve an existing website?",
      "Absolutely. We can review your current experience, identify priorities and recommend a focused improvement plan or a full rebuild.",
    ],
  ];
  return (
    <section className="section wrap faq">
      <Heading label="A FEW GOOD QUESTIONS" title="Let's clear things up." />
      <div>
        {items.map(([q, a], i) => (
          <article key={q}>
            <button
              aria-expanded={open === i}
              aria-controls={"faq-" + i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {q}
              {open === i ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            {open === i && <p id={"faq-" + i}>{a}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
function ServicePage({ s }: { s: (typeof services)[number] }) {
  return (
    <>
      <PageHero
        label={"SERVICES / " + s.title.toUpperCase()}
        title={s.headline}
        text={s.text}
      />
      <section className="service-detail wrap">
        <div className="service-intro">
          <s.icon size={64} strokeWidth={1} />
          <h2>
            Made for your business.
            <br />
            Built around your people.
          </h2>
          <div className="tags">
            {s.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <Button>Discuss your project</Button>
        </div>
        <div className="deliverables">
          <span className="eyebrow">WHAT WE CAN HELP WITH</span>
          {s.items.map((d, i) => (
            <div key={d}>
              <span>0{i + 1}</span>
              <h3>{d}</h3>
              <Check size={20} />
            </div>
          ))}
          <p>
            Every project starts with a scoped proposal. We'll agree on
            deliverables, milestones and pricing before work begins.
          </p>
        </div>
      </section>
      <DesignDetails />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
function About() {
  return <AboutPage />;
}
function Academy({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const tracks = [
    {
      title: "Full-Stack Product Engineering",
      icon: Code2,
      duration: "12 Weeks · Hybrid",
      desc: "Master modern interface architecture, strict TypeScript contracts, REST/PostgreSQL APIs, and production edge deployment.",
      syllabus: [
        "Semantic HTML5, CSS Grid & Responsive Design Tokens",
        "React 19, Hooks, State Architecture & TypeScript",
        "Node.js APIs, PostgreSQL Schemas & Authentication",
        "Automated Testing, GitHub CI & Cloud Deployment",
      ],
      outcome: "Ship a live full-stack SaaS portal with clean GitHub history.",
    },
    {
      title: "Performance Growth & Technical SEO",
      icon: TrendingUp,
      duration: "8 Weeks · Hybrid",
      desc: "Learn commercial acquisition systems: technical search crawling, conversion-rate landing architecture, and revenue attribution.",
      syllabus: [
        "Technical SEO Audits, Core Web Vitals & JSON-LD Schema",
        "Search Intent Clustering & Programmatic Content",
        "Google Search, Meta CAPI & Server-Side Tagging",
        "GA4 Attribution Funnels & Unit-Economics Reporting",
      ],
      outcome: "Build and audit a live search & conversion attribution model.",
    },
    {
      title: "Product UI/UX & Design Systems",
      icon: Layers,
      duration: "10 Weeks · Hybrid",
      desc: "Solve real operational bottlenecks through user journey research, Figma component systems, and developer-ready handoffs.",
      syllabus: [
        "User Workflow Audits & Information Architecture",
        "Figma Auto-Layout, Variants & Multi-Theme Variables",
        "WCAG Accessibility Contrast & Typographic Hierarchy",
        "Interactive Prototypes & Engineering Token Handover",
      ],
      outcome: "Deliver an audited multi-brand Figma system & case dossier.",
    },
  ];

  return (
    <>
      <PageHero
        theme={theme}
        label="DIGENTTECH ACADEMY · APPLIED MENTORSHIP"
        title={
          <>
            Production skills taught by <em>practicing architects.</em>
          </>
        }
        text="Small-cohort engineering, product design, and growth tracks in Lucknow, Barabanki, and live online—focused on shipping real systems rather than slide decks."
        highlights={[
          "Max 15 Learners / Cohort",
          "Staff Engineer Code Reviews",
          "Live Deployed Capstone",
        ]}
      />
      <section className="wrap section">
        <div className="atelier-academy-standards">
          <div className="atelier-std-tile">
            <strong>Live Code Reviews</strong>
            <span>Every assignment reviewed line-by-line by active studio engineers</span>
          </div>
          <div className="atelier-std-tile">
            <strong>Real Production Tools</strong>
            <span>GitHub PR workflows, TypeScript, Figma tokens, and live staging URLs</span>
          </div>
          <div className="atelier-std-tile">
            <strong>Hybrid Cohort Access</strong>
            <span>In-person mentorship in Lucknow &amp; Barabanki plus interactive remote seats</span>
          </div>
          <div className="atelier-std-tile">
            <strong>Transparent Tuition</strong>
            <span>Clear batch schedules, syllabus details, and fees shared before enrollment</span>
          </div>
        </div>

        <div className="atelier-course-grid">
          {tracks.map((tr) => {
            const Icon = tr.icon;
            return (
              <article className="atelier-course-card" key={tr.title}>
                <div className="atelier-course-top">
                  <div className="atelier-course-icon">
                    <Icon size={20} />
                  </div>
                  <span className="atelier-course-meta">{tr.duration}</span>
                </div>
                <h3>{tr.title}</h3>
                <p>{tr.desc}</p>
                <ul className="atelier-syllabus-list">
                  {tr.syllabus.map((mod) => (
                    <li key={mod}>
                      <Check size={14} />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="atelier-course-outcome">
                  <strong>Capstone:</strong> {tr.outcome}
                </p>
                <Button
                  href={"/contact?service=" + encodeURIComponent(tr.title + " course")}
                >
                  Request batch schedule &amp; fees
                </Button>
              </article>
            );
          })}
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
function Careers() {
  return <CareersPage />;
}
function Contact({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const params = new URLSearchParams(location.search);
  const query = params.get("service") || "";
  const prefilledBrief = params.get("brief") || "";
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    draftUrl?: string;
  }>({ type: "idle", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);

    const payload = {
      name: String(d.get("name") || "").trim(),
      email: String(d.get("email") || "").trim(),
      service: String(d.get("service") || "Web development"),
      budget: String(d.get("budget") || "Let's discuss"),
      message: String(d.get("message") || "").trim(),
    };

    const mailtoBody = `Hello DigentTech,\n\nName: ${payload.name}\nEmail: ${payload.email}\nService: ${payload.service}\nBudget: ${payload.budget}\n\nProject brief:\n${payload.message}`;
    const backupUrl = `mailto:${email}?subject=${encodeURIComponent("Project inquiry: " + payload.service)}&body=${encodeURIComponent(mailtoBody)}`;

    setSubmitting(true);
    setFeedback({ type: "idle", message: "" });

    try {
      const apiBase = ((import.meta.env.VITE_API_URL as string) || "").replace(/\/$/, "");
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setFeedback({
          type: "success",
          message:
            data.message ||
            "Thank you! Your project inquiry has been received. A lead architect will respond within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error(
          data.message || "Failed to submit your inquiry. Please try again or use direct email."
        );
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message:
          err.message ||
          "Could not reach backend API. You can send directly via your email client below.",
        draftUrl: backupUrl,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        theme={theme}
        label="EXECUTIVE CONSULTATION DESK"
        title={
          <>
            Start with a clear <em>architectural brief.</em>
          </>
        }
        text="Share your goals, product constraints, or system bottlenecks. Every inquiry is reviewed directly by a principal architect—never routed through junior sales queues."
        highlights={[
          "< 24h Architect Response",
          "Fixed-Milestone Scope Proposal",
          "NDA Ready Before Discovery",
        ]}
      />
      <section className="contact-layout wrap section">
        <aside>
          <span className="eyebrow">DIRECT PRINCIPAL CHANNEL</span>
          <h2>Speak straight with the builders.</h2>
          <p>
            Whether you have a full technical RFP or an operational problem to solve,
            we respond with concrete architecture options and timeline clarity.
          </p>
          <a className="contact-email" href={"mailto:" + email}>
            {email}
            <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            className="atelier-copy-email-btn"
            onClick={handleCopyEmail}
          >
            <Copy size={13} />
            <span>{copied ? "Copied email address" : "Copy studio email"}</span>
          </button>

          <div className="atelier-contact-sla-list">
            <div className="atelier-sla-item">
              <Clock size={15} />
              <span>24-hour review with a scoped milestone roadmap</span>
            </div>
            <div className="atelier-sla-item">
              <ShieldCheck size={15} />
              <span>100% client IP ownership &amp; zero lock-in terms</span>
            </div>
            <div className="atelier-sla-item">
              <MapPin size={15} />
              <span>Barabanki &amp; Lucknow, India · Serving global teams</span>
            </div>
          </div>
        </aside>
        <form className="atelier-contact-card" onSubmit={submit}>
          {prefilledBrief && (
            <div className="atelier-brief-prefill-pill">
              <Sparkles size={13} />
              <span>Pre-populated from your Deep Research Workbench brief</span>
            </div>
          )}
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                required
                maxLength={100}
                disabled={submitting}
              />
            </label>
            <label>
              Work email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="alex@company.com"
                required
                maxLength={200}
                disabled={submitting}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Primary practice track
              <select
                name="service"
                defaultValue={query || "Web development"}
                disabled={submitting}
              >
                {query && !services.some((s) => s.title === query) && (
                  <option>{query}</option>
                )}
                {services.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
                <option>Product &amp; brand design</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Target budget range
              <select
                name="budget"
                defaultValue="Let's discuss"
                disabled={submitting}
              >
                <option>Let's discuss</option>
                <option>Under ₹50,000</option>
                <option>₹50,000 – ₹2,00,000</option>
                <option>₹2,00,000 – ₹5,00,000</option>
                <option>₹5,00,000+</option>
              </select>
            </label>
          </div>
          <label>
            Project goals &amp; technical context
            <textarea
              name="message"
              defaultValue={prefilledBrief}
              rows={5}
              placeholder="Describe what you are building, key user workflows, or timeline goals..."
              required
              minLength={10}
              maxLength={5000}
              disabled={submitting}
            />
          </label>
          <p className="form-note">
            Encrypted submission routed straight to DigentTech engineering leadership. Response guaranteed within 24 hours.
          </p>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? (
              <>Transmitting brief...</>
            ) : (
              <>
                Send architectural inquiry <ArrowUpRight size={18} />
              </>
            )}
          </button>
          {feedback.type === "success" && (
            <div
              className="form-status"
              role="status"
              style={{
                borderColor: "rgba(16, 185, 129, 0.4)",
                background: "rgba(16, 185, 129, 0.08)",
              }}
            >
              <strong style={{ color: "#10b981", display: "block", marginBottom: 4 }}>
                ✓ Brief Transmitted
              </strong>
              {feedback.message}
            </div>
          )}
          {feedback.type === "error" && (
            <div
              className="form-status"
              role="alert"
              style={{
                borderColor: "rgba(239, 68, 68, 0.4)",
                background: "rgba(239, 68, 68, 0.08)",
              }}
            >
              <strong style={{ color: "#f87171", display: "block", marginBottom: 4 }}>
                Notice
              </strong>
              {feedback.message}
              {feedback.draftUrl && (
                <a
                  href={feedback.draftUrl}
                  style={{ marginTop: 8, display: "inline-block" }}
                >
                  Open pre-filled draft in your email client ↗
                </a>
              )}
            </div>
          )}
        </form>
      </section>
      <FAQ />
    </>
  );
}
export default function App() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, "") || "/");
  const [menu, setMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [search, setSearch] = useState(location.search);
  const mainRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("dotcode-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    if (document.documentElement.dataset.theme === "light") return "light";
    return typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const tcMeta = document.querySelector<HTMLMetaElement>("meta[name=theme-color]");
    if (tcMeta) tcMeta.content = theme === "light" ? "#f5f4eb" : "#060812";
    const csMeta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    let hasSaved = false;
    try {
      const saved = localStorage.getItem("dotcode-theme");
      hasSaved = saved === "light" || saved === "dark";
    } catch {}
    if (csMeta) csMeta.content = hasSaved ? theme : "light dark";
  }, [theme]);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    const onMq = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem("dotcode-theme");
        if (saved === "light" || saved === "dark") return;
      } catch {}
      setTheme(e.matches ? "light" : "dark");
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === "dotcode-theme") {
        if (e.newValue === "light" || e.newValue === "dark") setTheme(e.newValue);
        else setTheme(mq?.matches ? "light" : "dark");
      }
    };
    mq?.addEventListener?.("change", onMq);
    window.addEventListener("storage", onStorage);
    return () => {
      mq?.removeEventListener?.("change", onMq);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const sys = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    try {
      if (next !== sys) localStorage.setItem("dotcode-theme", next);
      else localStorage.removeItem("dotcode-theme");
    } catch {}
    setTheme(next);
  };
  useEffect(() => {
    const bar = scrollProgressRef.current;
    if (
      !bar ||
      typeof window === "undefined" ||
      window.CSS?.supports?.("animation-timeline", "scroll()") ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      bar.style.transform = `scaleX(${pct})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [routeSwitch, setRouteSwitch] = useState<{
    phase: "idle" | "active" | "leaving";
    label: string;
    top: number;
  }>({ phase: "idle", label: "", top: 76 });
  const switchTimersRef = useRef<number[]>([]);
  const s = services.find((s) => s.path === path);
  useEffect(() => {
    const clearSwitchTimers = () => {
      switchTimersRef.current.forEach((id) => window.clearTimeout(id));
      switchTimersRef.current = [];
    };
    const formatRouteLabel = (pathname: string) => {
      const clean = pathname.replace(/\/$/, "") || "/";
      if (clean === "/") return "Home";
      if (clean === "/work") return "Work Archive";
      if (clean === "/services") return "Practice Areas";
      if (clean === "/about") return "Studio & Leadership";
      if (clean === "/careers") return "Careers";
      if (clean === "/online-courses") return "Academy";
      if (clean === "/contact") return "Consultation";
      const matched = services.find((svc) => svc.path === clean);
      return matched ? matched.title : clean.slice(1).replace(/[-/]+/g, " ");
    };
    const sync = () => {
      setPath(location.pathname.replace(/\/$/, "") || "/");
      setSearch(location.search);
      setMenu(false);
    };
    const runSwitch = (targetRaw: string) => {
      const u = new URL(targetRaw, location.origin);
      if (u.origin !== location.origin || !["http:", "https:"].includes(u.protocol)) return;
      const targetPath = u.pathname.replace(/\/$/, "") || "/";
      const currentPath = location.pathname.replace(/\/$/, "") || "/";
      const targetNorm = targetPath + u.search;
      const currentNorm = currentPath + location.search;
      setMenu(false);
      setServicesOpen(false);
      if (targetNorm === currentNorm) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      clearSwitchTimers();
      const headerEl = document.querySelector<HTMLElement>(".site-header");
      const top = Math.max(0, Math.round(headerEl?.getBoundingClientRect().bottom ?? 76));
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      setRouteSwitch({ phase: "active", label: formatRouteLabel(targetPath), top });
      const swapDelay = reduced ? 40 : 280;
      const leaveDelay = reduced ? 90 : 540;
      const doneDelay = reduced ? 150 : 740;
      switchTimersRef.current.push(
        window.setTimeout(() => {
          history.pushState({}, "", u.pathname + u.search);
          sync();
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }, swapDelay),
        window.setTimeout(() => {
          setRouteSwitch((prev) =>
            prev.phase === "idle" ? prev : { ...prev, phase: "leaving" },
          );
        }, leaveDelay),
        window.setTimeout(() => {
          setRouteSwitch({ phase: "idle", label: "", top });
          mainRef.current?.focus({ preventScroll: true });
        }, doneDelay),
      );
    };
    const click = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const u = new URL(a.href);
      if (
        u.origin !== location.origin ||
        !["http:", "https:"].includes(u.protocol) ||
        u.hash
      )
        return;
      e.preventDefault();
      runSwitch(u.href);
    };
    const onCustomNav = (e: Event) => {
      const to = (e as CustomEvent<{ to?: string }>).detail?.to;
      if (to) runSwitch(to);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("dt:navigate", onCustomNav);
    document.addEventListener("click", click);
    return () => {
      clearSwitchTimers();
      window.removeEventListener("popstate", sync);
      window.removeEventListener("dt:navigate", onCustomNav);
      document.removeEventListener("click", click);
    };
  }, []);
  useEffect(() => {
    if (
      path === "/" ||
      (window.CSS?.supports?.("(animation-timeline: view()) and (animation-range: entry)") &&
        window.matchMedia?.("(prefers-reduced-motion: no-preference)").matches)
    )
      return;
    const elements = document.querySelectorAll(
      ".section-heading,.service-card,.project-card,.process-grid article,.studio-copy,.studio-heading,.cta,.feature-box,.tech-card,.roadmap-card,.showcase-card,.lux-workbench-shell,.home-tech-card,.why-card,.testimonial-card,.home-faq-item,.atelier-engagement-card,.atelier-course-card",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.02, rootMargin: "80px 0px" },
    );
    elements.forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [path]);
  let content: React.ReactNode;
  if (path === "/") content = <Home theme={theme} />;
  else if (
    path === "/work" ||
    path === "/projects" ||
    path.startsWith("/work/")
  ) {
    const slug = path.startsWith("/work/") ? path.slice("/work/".length) : undefined;
    content = <WorkPage initialProjectId={slug} />;
  }
  else if (path === "/services")
    content = (
      <>
        <PageHero
          theme={theme}
          label="PRACTICE DIVISIONS · DIGENTTECH ATELIER"
          title={
            <>
              Full-stack engineering, from <em>architecture</em> to scale.
            </>
          }
          text="Four specialized engineering divisions operating under one principal-led roof—delivering sub-300ms web platforms, offline-first mobile apps, private AI workflows, and measurable growth."
          highlights={[
            "2-Week Verified Staging Sprints",
            "Fixed Milestone Budgets",
            "100% Repository & IP Ownership",
          ]}
        />
        <section className="atelier-engagement-section wrap">
          <div className="section-top">
            <Heading
              label="ENGAGEMENT MODELS"
              title="Structured delivery options built around your stage."
              text="Choose the cadence that aligns with your roadmap—whether validating a new product or scaling enterprise infrastructure."
            />
          </div>
          <div className="atelier-engagement-grid">
            <article className="atelier-engagement-card">
              <div className="atelier-eng-head">
                <span className="atelier-eng-code">MODEL 01 · VALIDATION</span>
                <span className="atelier-eng-duration">2 – 4 Weeks</span>
              </div>
              <h3>Focused MVP Sprint</h3>
              <p>
                Rapid architecture, interactive Figma prototype, and production core built to launch with real users and investor clarity.
              </p>
              <ul className="atelier-eng-list">
                <li><Check size={14} /> Principal Architect + Senior Fullstack</li>
                <li><Check size={14} /> Clickable prototype &amp; core database</li>
                <li><Check size={14} /> Continuous staging deployments</li>
              </ul>
            </article>
            <article className="atelier-engagement-card">
              <div className="atelier-eng-head">
                <span className="atelier-eng-code">MODEL 02 · FLAGSHIP</span>
                <span className="atelier-eng-duration">6 – 8 Weeks</span>
              </div>
              <h3>Core Production System</h3>
              <p>
                Complete multi-theme design system, high-concurrency backend APIs, payments/CRM integrations, and automated Playwright QA.
              </p>
              <ul className="atelier-eng-list">
                <li><Check size={14} /> Dedicated 4-person specialist squad</li>
                <li><Check size={14} /> &lt;280ms global TTFB edge architecture</li>
                <li><Check size={14} /> 30-day warranty &amp; team handover</li>
              </ul>
            </article>
            <article className="atelier-engagement-card">
              <div className="atelier-eng-head">
                <span className="atelier-eng-code">MODEL 03 · ENTERPRISE</span>
                <span className="atelier-eng-duration">10 – 14 Weeks+</span>
              </div>
              <h3>Embedded Atelier Squad</h3>
              <p>
                Multi-region cloud modernization, custom LangGraph AI pipelines, offline mobile ecosystems, and continuous release velocity.
              </p>
              <ul className="atelier-eng-list">
                <li><Check size={14} /> Principal Architect + 24/7 DevOps lead</li>
                <li><Check size={14} /> Private VPC AI &amp; SOC2-ready posture</li>
                <li><Check size={14} /> Shared Slack &amp; bi-weekly executive drops</li>
              </ul>
            </article>
          </div>
        </section>
        <Services full />
        <CapabilityExplorer />
        <Process />
        <FAQ />
        <CTA />
      </>
    );
  else if (path === "/web-development") content = <WebDevelopment />;
  else if (path === "/app-development") content = <AppDevelopment />;
  else if (path === "/digital-marketing") content = <DigitalMarketing />;
  else if (path === "/ai-solutions") content = <AISolutions />;
  else if (s) content = <ServicePage s={s} />;
  else if (path === "/about") content = <About />;
  else if (path === "/contact") content = <Contact key={search} theme={theme} />;
  else if (path === "/careers") content = <Careers />;
  else if (path === "/online-courses") content = <Academy theme={theme} />;
  else
    content = (
      <>
        <PageHero
          theme={theme}
          label="404 / ROUTE NOT FOUND"
          title={
            <>
              That route isn't part of our <em>atelier.</em>
            </>
          }
          text="The page you requested may have moved or never existed. Navigate directly to one of our core engineering destinations below."
        />
        <div className="wrap missing-page atelier-missing-actions">
          <Button href="/">Back to home dashboard</Button>
          <a className="nav-cta" href="/work">
            Explore shipped systems <ArrowUpRight size={16} />
          </a>
          <a className="nav-cta" href="/services">
            View practice areas <ArrowUpRight size={16} />
          </a>
        </div>
      </>
    );
  return (
    <>
      <SEO pathname={path} />
      <div
        ref={scrollProgressRef}
        id="scroll-progress"
        className="dt-scroll-progress"
        aria-hidden="true"
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <BrandLogo />
          <nav
            id="navigation"
            className={menu ? "navigation open" : "navigation"}
            aria-label="Main navigation"
          >
            {[
              { label: "Home", href: "/", icon: HomeIcon },
              { label: "Work", href: "/work" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? path === "/"
                  : path === item.href || (item.href === "/services" && (path === "/services" || !!s));

              if (item.label === "Services") {
                return (
                  <div
                    key={item.href}
                    className="nav-services-wrapper"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <a
                      href={item.href}
                      className={isActive ? "active nav-services-trigger" : "nav-services-trigger"}
                      aria-current={isActive ? "page" : undefined}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                      <ChevronDown size={13} className="nav-services-chevron" />
                    </a>

                    {/* Desktop Hover Mega-Dropdown */}
                    <div
                      className={`nav-services-dropdown ${servicesOpen ? "open" : ""}`}
                      role="menu"
                      aria-label="Practice areas"
                    >
                      <div className="services-dropdown-header">
                        <span className="dropdown-eyebrow">PRACTICE AREAS & CAPABILITIES</span>
                        <span className="dropdown-counter">4 SPECIALIZED DIVISIONS</span>
                      </div>
                      <div className="services-dropdown-grid">
                        {navServices.map((svc) => {
                          const SvgIcon = svc.icon;
                          const isSubActive = path === svc.href;
                          return (
                            <a
                              key={svc.href}
                              href={svc.href}
                              className={`services-dropdown-card ${isSubActive ? "active" : ""}`}
                              role="menuitem"
                              onClick={() => {
                                setServicesOpen(false);
                                setMenu(false);
                              }}
                            >
                              <div
                                className="service-badge-icon"
                                style={{ color: svc.accent, borderColor: `${svc.accent}33` }}
                              >
                                <SvgIcon size={18} />
                              </div>
                              <div className="service-card-text">
                                <div className="service-card-heading">
                                  <span className="service-title">{svc.title}</span>
                                  <span className="service-tag">{svc.badge}</span>
                                </div>
                                <p className="service-description">{svc.description}</p>
                              </div>
                              <ArrowRight size={14} className="service-card-arrow" />
                            </a>
                          );
                        })}
                      </div>
                      <div className="services-dropdown-footer">
                        <div className="dropdown-footer-left">
                          <span className="pulse-dot" />
                          <span>Looking for custom end-to-end architecture?</span>
                        </div>
                        <a
                          href="/services"
                          className="dropdown-footer-cta"
                          onClick={() => {
                            setServicesOpen(false);
                            setMenu(false);
                          }}
                        >
                          View all services <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>

                    {/* Mobile sub-links visible only when mobile menu is opened */}
                    {menu && (
                      <div className="mobile-subservices-panel">
                        {navServices.map((svc) => {
                          const SvgIcon = svc.icon;
                          return (
                            <a
                              key={svc.href}
                              href={svc.href}
                              className={`mobile-subservice-item ${path === svc.href ? "active" : ""}`}
                              onClick={() => {
                                setServicesOpen(false);
                                setMenu(false);
                              }}
                            >
                              <SvgIcon size={15} style={{ color: svc.accent }} />
                              <span>{svc.title}</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  href={item.href}
                  key={item.href}
                  className={isActive ? "active" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {Icon && (
                    <Icon
                      size={15}
                      style={{ marginRight: "5px", verticalAlign: "-2px" }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
            <a className="mobile-contact" href="/contact">
              Let's talk ↗
            </a>
          </nav>
          <button
            className="theme-toggle icon-button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <a className="nav-cta" href="/contact">
            Let's talk <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-button icon-button"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="navigation"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {routeSwitch.phase !== "idle" && (
        <div
          className={`dt-route-loader${routeSwitch.phase === "leaving" ? " is-leaving" : ""}`}
          style={{ ["--dt-loader-top" as string]: `${routeSwitch.top}px` }}
          role="status"
          aria-live="polite"
          aria-label={`Switching to ${routeSwitch.label}`}
        >
          <div className="dt-loader-beam" aria-hidden="true" />
          <div className="dt-loader-stage">
            <div className="dt-loader-emblem" aria-hidden="true">
              <div className="dt-loader-brackets">
                <span className="dt-loader-bracket dt-loader-bracket-tl" />
                <span className="dt-loader-bracket dt-loader-bracket-br" />
              </div>
              <span className="dt-loader-core" />
            </div>
            <span className="dt-loader-label">{routeSwitch.label}</span>
          </div>
        </div>
      )}
      <main id="main" ref={mainRef} tabIndex={-1}>
        {content}
      </main>
      <footer className="footer">
        <div className="footer-global-wrap">
          <div className="footer-global-banner">
            <img
              src="/assets/footer-global-banner.jpg"
              alt=""
              className="footer-global-bg"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="footer-global-scrim" aria-hidden="true" />
            <div className="footer-global-inner">
              <div className="footer-global-flags" aria-label="Global delivery hubs">
                <span className="footer-hub-chip" title="India">
                  <svg viewBox="0 0 24 16" aria-hidden="true">
                    <rect width="24" height="5.33" fill="#FF9933" />
                    <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
                    <rect y="10.67" width="24" height="5.33" fill="#138808" />
                    <circle cx="12" cy="8" r="1.8" fill="#000080" />
                  </svg>
                  <span>IN</span>
                </span>
                <span className="footer-hub-chip" title="United States">
                  <svg viewBox="0 0 24 16" aria-hidden="true">
                    <rect width="24" height="16" fill="#FFFFFF" />
                    <rect y="0" width="24" height="2.3" fill="#B22234" />
                    <rect y="4.6" width="24" height="2.3" fill="#B22234" />
                    <rect y="9.2" width="24" height="2.3" fill="#B22234" />
                    <rect y="13.7" width="24" height="2.3" fill="#B22234" />
                    <rect width="10.5" height="9" fill="#3C3B6E" />
                  </svg>
                  <span>US</span>
                </span>
                <span className="footer-hub-chip" title="United Kingdom">
                  <svg viewBox="0 0 24 16" aria-hidden="true">
                    <rect width="24" height="16" fill="#012169" />
                    <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2.8" />
                    <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.2" />
                    <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="4.2" />
                    <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.4" />
                  </svg>
                  <span>UK</span>
                </span>
                <span className="footer-hub-chip" title="United Arab Emirates">
                  <svg viewBox="0 0 24 16" aria-hidden="true">
                    <rect width="24" height="5.33" fill="#00732F" />
                    <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
                    <rect y="10.67" width="24" height="5.33" fill="#000000" />
                    <rect width="6.5" height="16" fill="#FF0000" />
                  </svg>
                  <span>UAE</span>
                </span>
                <span className="footer-hub-chip" title="Canada">
                  <svg viewBox="0 0 24 16" aria-hidden="true">
                    <rect width="24" height="16" fill="#FF0000" />
                    <rect x="6" width="12" height="16" fill="#FFFFFF" />
                    <path d="M12 3.5L13.4 7H15.5L13.8 8.6L14.4 11.2L12 9.8L9.6 11.2L10.2 8.6L8.5 7H10.6Z" fill="#FF0000" />
                  </svg>
                  <span>CA</span>
                </span>
              </div>

              <div className="footer-global-content">
                <h2>What’s Stopping Your Product from Scaling?</h2>
                <p>
                  Nothing. Partner with our global systems architects and ship production AI, web,
                  or mobile platforms with full IP ownership.
                </p>
                <a href="/contact" className="footer-global-btn">
                  <span>Book My Strategy Call</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="footer-main">
            <div>
              <BrandLogo />
              <p>
                Independent software engineering studio.
                <br />
                Senior architecture, full IP ownership.
              </p>
              <a className="text-link" href={"mailto:" + email}>
                Direct leadership contact <ArrowUpRight size={16} />
              </a>
            </div>
            <div>
              <span className="eyebrow">ATELIER</span>
              <a href="/">Home</a>
              <a href="/work">Shipped work</a>
              <a href="/services">Practice areas</a>
              <a href="/about">Leadership &amp; studio</a>
              <a href="/careers">Careers</a>
              <a href="/online-courses">Academy</a>
              <a href="/contact">Consultation</a>
            </div>
            <div>
              <span className="eyebrow">CAPABILITIES</span>
              {services.map((s) => (
                <a href={s.path} key={s.path}>
                  {s.title}
                </a>
              ))}
            </div>
            <div className="footer-message">
              <span className="eyebrow">READY TO SCOPE?</span>
              <a href="/contact">
                Initiate your
                <br />
                next system. <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} DigentTech. All rights reserved.
            </span>
            <span>
              Design & development. India. <span className="footer-dot">●</span>
            </span>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
