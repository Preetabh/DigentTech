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
    Cpu,
    Database,
    Globe2,
    Home as HomeIcon,
    Layers,
    Lock,
    Menu,
    Minus,
    Moon,
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
import React, { useEffect, useState } from "react";
import { AISolutions } from "./AISolutions";
import { AboutPage } from "./AboutPage";
import { AppDevelopment } from "./AppDevelopment";
import { CareersPage } from "./CareersPage";
import { DigitalMarketing } from "./DigitalMarketing";
import { SEO } from "./SEO";
import { BrandLogo, FlowField, HeroProject, StudioNote } from "./Studio";
import {
    CapabilityExplorer,
    DesignDetails,
    ProjectStarter,
    ThemeImage
} from "./VisualExperience";
import { WebDevelopment } from "./WebDevelopment";
import CrystalizedBall from "./CrystalizedBall";
const email = (import.meta.env.VITE_CONTACT_EMAIL as string) || "hr.digenttech@gmail.com";
const services = [
  {
    path: "/web-development",
    title: "Web development",
    headline: "Websites with purpose.",
    text: "Thoughtful websites, online stores and business platforms. Designed around your customers. Built around your goals.",
    icon: Globe2,
    tags: ["Business websites", "E-commerce", "Custom platforms"],
    items: [
      "Responsive interface and design system",
      "Content management and essential integrations",
      "Search foundations and performance optimization",
      "Testing, launch and handover",
    ],
  },
  {
    path: "/app-development",
    title: "App development",
    headline: "Your idea. In their hands.",
    text: "Intuitive mobile experiences that turn a useful idea into an everyday habit. From the first prototype to the final release.",
    icon: Smartphone,
    tags: ["iOS & Android", "Cross-platform", "Product design"],
    items: [
      "User journeys and interactive prototypes",
      "Cross-platform mobile application",
      "Backend, authentication and integrations",
      "Release preparation and documentation",
    ],
  },
  {
    path: "/digital-marketing",
    title: "Digital marketing",
    headline: "Make your next move count.",
    text: "A clear strategy, compelling creative and measurable campaigns. Reach the people who matter to your business.",
    icon: BarChart3,
    tags: ["SEO", "Paid campaigns", "Social strategy"],
    items: [
      "Audience and channel strategy",
      "Campaign creative and landing page direction",
      "Analytics and conversion tracking",
      "Performance reporting and ongoing improvements",
    ],
  },
  {
    path: "/ai-solutions",
    title: "AI & automation",
    headline: "Less busywork. More possibility.",
    text: "Practical tools that connect your systems, simplify repetitive work and give your team time to focus.",
    icon: Sparkles,
    tags: ["Workflow automation", "Internal tools", "AI assistants"],
    items: [
      "Workflow discovery and feasibility review",
      "Connected tools and custom automations",
      "Human review and access controls",
      "Documentation and team onboarding",
    ],
  },
];
const navServices = [
  {
    title: "Web Development",
    href: "/web-development",
    icon: Globe2,
    badge: "Next.js · React",
    description: "Sub-second web platforms, enterprise SaaS portals & custom e-commerce.",
    accent: "#0065fc",
  },
  {
    title: "App Development",
    href: "/app-development",
    icon: Smartphone,
    badge: "iOS · Android",
    description: "High-performance cross-platform apps with tactile native UX and offline sync.",
    accent: "#00c6ff",
  },
  {
    title: "Digital Marketing",
    href: "/digital-marketing",
    icon: BarChart3,
    badge: "SEO · Growth",
    description: "ROI-driven search optimization, multi-channel ad scaling & conversion funnels.",
    accent: "#10b981",
  },
  {
    title: "AI Solutions",
    href: "/ai-solutions",
    icon: Sparkles,
    badge: "Agents · Workflows",
    description: "Intelligent autonomous agents, workflow automations & LLM integrations.",
    accent: "#8b5cf6",
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
    "Discover",
    "We listen first. Together, we define your audience, priorities and what success should look like.",
  ],
  [
    "Design",
    "We turn the brief into a clear direction, with user journeys and designs you can review.",
  ],
  [
    "Build",
    "We work in focused milestones, share progress and keep decisions visible throughout.",
  ],
  [
    "Launch & improve",
    "We test, launch and hand over your product, with a clear path for what comes next.",
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
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <header className="page-hero wrap">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
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

function Work({ full = false }: { full?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
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
      ? projects
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
            View full gallery ({projects.length}) <ArrowUpRight size={18} />
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
    { name: "Tailwind & Design Tokens", cat: "frontend", desc: "Fluid multi-brand token system with tactile claymorphic elevation layers.", badge: "Design System" },
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

function HomeProjectEstimator() {
  const [domain, setDomain] = useState<string>("web");
  const [scale, setScale] = useState<string>("core");

  const domainOptions = [
    { id: "web", label: "Web Platform & SaaS" },
    { id: "mobile", label: "Mobile Application (iOS/Android)" },
    { id: "ai", label: "AI Agent & Workflow Automation" },
    { id: "modern", label: "Full Digital Modernization" },
  ];

  const scaleOptions = [
    { id: "mvp", label: "MVP Sprint (2-4 Weeks)" },
    { id: "core", label: "Core Production System (6-8 Weeks)" },
    { id: "enterprise", label: "Enterprise Platform (10-14 Weeks)" },
  ];

  const getEstimates = () => {
    if (scale === "mvp") {
      return {
        timeline: "2 – 4 Weeks",
        team: "1 Lead Architect + 1 Senior Fullstack Engineer + 1 UI/UX Specialist",
        milestones: "3 Bi-weekly Review Milestones",
        features: [
          "Interactive Figma Prototype & Design Tokens",
          "Production Core Architecture & Database",
          "Responsive Cross-device Frontend",
          "Continuous Deployment & Staging Preview",
          "100% Repository & Asset Handover",
        ],
      };
    } else if (scale === "core") {
      return {
        timeline: "6 – 8 Weeks",
        team: "1 Principal Architect + 2 Fullstack Engineers + 1 Mobile Specialist + 1 QA Engineer",
        milestones: "5 Iterative Sprint Releases",
        features: [
          "Complete Design System with Accessible Micro-interactions",
          "Scalable Microservices / Serverless API Core",
          "Enterprise Auth, Role-Based Access & Audit Logs",
          "Performance SLA Optimization (<300ms TTFB)",
          "Third-party integrations (Stripe, CRM, Cloud Telemetry)",
          "Production Automated Testing & Security Review",
        ],
      };
    } else {
      return {
        timeline: "10 – 14 Weeks",
        team: "Dedicated Dedicated Squad: Lead Architect + 3 Engineers + 1 DevOps Lead + 1 Product Designer",
        milestones: "Bi-weekly Continuous Production Releases",
        features: [
          "High-Throughput Multi-Region Architecture",
          "Custom LLM / AI Orchestration & Vector Stores",
          "Offline-First Realtime Data Sync & WebSocket Feed",
          "Disaster Recovery, ISO/SOC Compliance Foundations",
          "Dedicated Slack Channel & 24/7 SLA Support",
          "Comprehensive Architecture & API Documentation",
        ],
      };
    }
  };

  const est = getEstimates();

  return (
    <section className="home-estimator-section wrap">
      <div className="section-top">
        <Heading
          label="PROJECT SCOPING ENGINE"
          title="Estimate your team, timeline & deliverables."
          text="Select your target system and scope to visualize the engineering squad and sprint schedule."
        />
      </div>
      <div className="home-estimator-box">
        <div className="estimator-inputs">
          <div className="estimator-group">
            <span className="estimator-label">1. Choose System Domain</span>
            <div className="estimator-choice-chips">
              {domainOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`estimator-choice-btn ${domain === opt.id ? "active" : ""}`}
                  onClick={() => setDomain(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="estimator-group">
            <span className="estimator-label">2. Target Scope &amp; Complexity</span>
            <div className="estimator-choice-chips">
              {scaleOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`estimator-choice-btn ${scale === opt.id ? "active" : ""}`}
                  onClick={() => setScale(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="estimator-summary-card">
          <div className="estimator-summary-top">
            <span className="estimator-summary-badge">ENGINEERING BLUEPRINT</span>
            <span className="estimator-time-val">{est.timeline}</span>
          </div>

          <div className="estimator-team-row">
            <Users size={16} />
            <span><strong>Squad:</strong> {est.team}</span>
          </div>

          <div className="estimator-team-row">
            <Clock size={16} />
            <span><strong>Cadence:</strong> {est.milestones}</span>
          </div>

          <div className="estimator-inclusions">
            <span className="estimator-inc-title">Core Deliverables Included:</span>
            <ul>
              {est.features.map((f) => (
                <li key={f}>
                  <Check size={14} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            href={`/contact?service=${encodeURIComponent(
              domain === "web"
                ? "Web development"
                : domain === "mobile"
                ? "App development"
                : domain === "ai"
                ? "AI & automation"
                : "Complete Modernization"
            )}&brief=${encodeURIComponent(
              `Estimated Timeline: ${est.timeline}. Scope: ${
                domainOptions.find((d) => d.id === domain)?.label
              } (${scaleOptions.find((s) => s.id === scale)?.label}).`
            )}`}
          >
            Lock In This Project Scope <ArrowRight size={16} />
          </Button>
        </div>
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
      <span className="eyebrow">LET'S MAKE SOMETHING WORTH OPENING.</span>
      <div>
        <h2>
          What are you
          <br />
          working <em>on?</em>
        </h2>
        <Button>Start a conversation</Button>
      </div>
      <p>
        An idea on a napkin. A website you've outgrown. A workflow that needs a
        rethink.
        <br />
        That's enough to start.
      </p>
      <span className="cta-coordinate">DigentTech / NEXT CHAPTER ↗</span>

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
  return (
    <>
      <section className="hero-stage">
        <FlowField />
        <div className="hero-crystal-bg" aria-hidden="true">
          <CrystalizedBall
            preset="plasma"
            color="#F25BD0"
            theme={theme}
            size={0.78}
            crackle={0.85}
            fill={0.5}
            interactive
            hoverStrength={0.7}
          />
        </div>
        <div className="hero wrap">
          <div className="hero-copy">
            <span className="availability">
              <i /> DESIGN-LED. ENGINEERING-DRIVEN.
            </span>
            <h1>
              Digital products.
              <br />
              Built with <em>intent.</em>
            </h1>
            <p>
              Websites your customers remember. Apps they come back to. Business
              tools your team actually wants to use.
            </p>
            <div className="hero-actions">
              <Button>Tell us your idea</Button>
              <a className="text-link" href="/work">
                See what we've built <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-note">
              <div className="note-line" />
              <span>
                Based in India. Built for wherever you are.
                <br />
                <strong>Strategy, design and development. Together.</strong>
              </span>
            </div>
          </div>
          <HeroProject />
        </div>
        <div className="hero-bottom wrap">
          <span>
            SCROLL TO EXPLORE <span>↓</span>
          </span>
          <span>GOOD DESIGN IS GOOD BUSINESS.</span>
        </div>
      </section>
      <div className="capability-strip">
        <div className="wrap">
          <span>Web experiences</span>
          <i>＋</i>
          <span>Mobile products</span>
          <i>＋</i>
          <span>Business platforms</span>
          <i>＋</i>
          <span>Digital growth</span>
        </div>
      </div>
      <HomeMetricsRibbon />
      <Services />
      <Work />
      <TechStackShowcase />
      <WhyUsSection />
      <StudioNote />
      <TestimonialsSection />
      <CapabilityExplorer />
      <DesignDetails />
      <HomeProjectEstimator />
      <Process />
      <HomeFAQ />
      <ProjectStarter />
      <CTA />
    </>
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
function Academy() {
  return (
    <>
      <PageHero
        label="DigentTech ACADEMY"
        title="Practical IT training & mentorship."
        text="Hands-on learning paths in full-stack engineering, product design, and digital marketing for learners in Lucknow, Barabanki, and online."
      />
      <section className="wrap section">
        <div className="course-grid">
          {[
            [
              "Full-stack development",
              "From interface fundamentals to connected web applications.",
              "HTML & CSS / React / APIs",
            ],
            [
              "Digital marketing",
              "Learn to connect strategy, content and campaign measurement.",
              "SEO / Content / Analytics",
            ],
            [
              "Product design",
              "Turn a problem into a clear, usable digital experience.",
              "Research / Figma / Prototyping",
            ],
          ].map(([t, d, tags], i) => (
            <article className="course-card" key={t}>
              <span className="eyebrow">LEARNING PATH / 0{i + 1}</span>
              <div className={"course-art course-" + i} aria-hidden="true">
                {["{ }", "↗", "✳"][i]}
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="course-topics">{tags}</span>
              <Button
                href={"/contact?service=" + encodeURIComponent(t + " course")}
              >
                Ask about availability
              </Button>
            </article>
          ))}
        </div>
        <p className="course-note">
          Contact us for current course availability, format, fees and schedules
          before enrolling.
        </p>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
function Careers() {
  return <CareersPage />;
}
function Contact() {
  const query = new URLSearchParams(location.search).get("service") || "";
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    draftUrl?: string;
  }>({ type: "idle", message: "" });

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
      const response = await fetch("/api/contact", {
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
            "Thank you! Your project inquiry has been received. Our team will contact you shortly.",
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
          "Could not send via backend API. You can open an email draft directly below.",
        draftUrl: backupUrl,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        label="LET'S TALK"
        title="Every great project starts with a conversation."
        text="Tell us a little about your idea. We'll take it from there."
      />
      <section className="contact-layout wrap section">
        <aside>
          <span className="eyebrow">SAY HELLO</span>
          <h2>We're all ears.</h2>
          <p>
            A rough idea or a detailed brief — both are a good place to start.
          </p>
          <a className="contact-email" href={"mailto:" + email}>
            {email}
            <ArrowUpRight size={18} />
          </a>
          <div className="contact-info">
            <span>BASED IN</span>
            <p>
              Barabanki, India
              <br />
              Working with you, wherever you are.
            </p>
          </div>
          <div className="contact-info">
            <span>WHAT HAPPENS NEXT</span>
            <p>
              We discuss your goals, define the scope and share a proposal with
              clear next steps.
            </p>
          </div>
        </aside>
        <form onSubmit={submit}>
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
              Email address
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
              What do you need?
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
                <option>Product & brand design</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Estimated budget
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
            Tell us about your project
            <textarea
              name="message"
              defaultValue={
                new URLSearchParams(location.search).get("brief") || ""
              }
              rows={5}
              placeholder="What are you looking to build or improve?"
              required
              minLength={10}
              maxLength={5000}
              disabled={submitting}
            />
          </label>
          <p className="form-note">
            Directly transmitted to the DigentTech team via centralized Brevo HTTP service. We respond within 24 hours.
          </p>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? (
              <>Sending inquiry...</>
            ) : (
              <>
                Send project inquiry <ArrowUpRight size={18} />
              </>
            )}
          </button>
          {feedback.type === "success" && (
            <div
              className="form-status"
              role="status"
              style={{
                borderColor: "rgba(56, 189, 248, 0.4)",
                background: "rgba(56, 189, 248, 0.08)",
              }}
            >
              <strong style={{ color: "#38bdf8", display: "block", marginBottom: 4 }}>
                ✓ Inquiry Transmitted
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
                  Click here to send directly via your email client ↗
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
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector<HTMLMetaElement>(
      "meta[name=theme-color]",
    );
    if (meta) meta.content = theme === "dark" ? "#080a0e" : "#f8f9fc";
    try {
      localStorage.setItem("dotcode-theme", theme);
    } catch {}
  }, [theme]);
  const s = services.find((s) => s.path === path);
  useEffect(() => {
    const sync = () => {
      setPath(location.pathname.replace(/\/$/, "") || "/");
      setSearch(location.search);
      setMenu(false);
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
      history.pushState({}, "", u.pathname + u.search);
      sync();
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("popstate", sync);
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", click);
    };
  }, []);
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".section-heading,.service-card,.project-card,.process-grid article,.studio-copy,.studio-heading,.cta,.feature-box,.tech-card,.roadmap-card,.showcase-card",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
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
  else if (path === "/work" || path === "/projects")
    content = (
      <>
        <WorkHero />
        <Work full />
        <CTA />
      </>
    );
  else if (path === "/services")
    content = (
      <>
        <PageHero
          label="OUR SERVICES"
          title="From the first idea to the next big step."
          text="Strategy, design, technology and growth. A connected approach to your digital journey."
        />
        <Services full />
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
  else if (path === "/contact") content = <Contact key={search} />;
  else if (path === "/careers") content = <Careers />;
  else if (path === "/online-courses") content = <Academy />;
  else
    content = (
      <>
        <PageHero
          label="404 / A DOT OUT OF PLACE"
          title="Let's get you back on track."
          text="We couldn't find that page. There's plenty more to explore."
        />
        <div className="wrap missing-page">
          <Button href="/">Back to home</Button>
        </div>
      </>
    );
  return (
    <>
      <SEO pathname={path} />
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
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
      <main id="main">{content}</main>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-main">
            <div>
              <BrandLogo />
              <p>
                Independent thinking.
                <br />
                Considered digital work.
              </p>
              <a className="text-link" href={"mailto:" + email}>
                Say hello <ArrowUpRight size={16} />
              </a>
            </div>
            <div>
              <span className="eyebrow">EXPLORE</span>
              <a href="/">Home</a>
              <a href="/work">Our work</a>
              <a href="/about">The studio</a>
              <a href="/careers">Careers</a>
              <a href="/online-courses">Academy</a>
              <a href="/contact">Contact</a>
            </div>
            <div>
              <span className="eyebrow">WHAT WE DO</span>
              {services.map((s) => (
                <a href={s.path} key={s.path}>
                  {s.title}
                </a>
              ))}
            </div>
            <div className="footer-message">
              <span className="eyebrow">HAVE A GOOD IDEA?</span>
              <a href="/contact">
                Let's build
                <br />
                something great. <ArrowUpRight />
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
