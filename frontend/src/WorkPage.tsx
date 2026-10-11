import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Check,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  Flame,
  Globe2,
  HelpCircle,
  Layers,
  LayoutGrid,
  List,
  Lock,
  Maximize2,
  Radio,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import "./work-page.css";

interface ProjectItem {
  id: string;
  name: string;
  category: "web" | "mobile" | "design";
  categoryLabel: string;
  liveBadge: string;
  metric: string;
  metricLabel: string;
  image: string;
  description: string;
  detail: string;
  challenge: string;
  solution: string;
  tags: string[];
  color: "sand" | "lavender" | "emerald" | "cyan" | "rose" | "amber" | "violet";
  accentHex: string;
  stats: { label: string; val: string }[];
  clientOutcome: string;
}

const PRODUCTION_PROJECTS: ProjectItem[] = [
  {
    id: "infrapilot-crm",
    name: "InfraPilot",
    category: "web",
    categoryLabel: "ERP / CRM PLATFORM",
    liveBadge: "Active in 12 enterprise sites",
    metric: "45% faster site logistics",
    metricLabel: "Logistics Velocity",
    image: "/assets/projects/infrapilot-crm-portal.png",
    description:
      "Bringing heavy infrastructure operations, budgets, and sub-contractors into one unified live dashboard.",
    detail:
      "A mission-critical enterprise portal built for civil infrastructure teams. Tracks real-time machinery allocations, vendor payments, blueprint revisions, and milestone compliance with zero latency.",
    challenge:
      "Infrastructure civil teams struggled with paper-based vendor receipts, untracked machinery downtime, and fragmented site progress reports causing massive cost overruns.",
    solution:
      "We architected an offline-resilient Next.js enterprise portal connected to PostgreSQL, automated equipment allocation engines, and instant digital milestone approvals.",
    tags: ["React 19", "Enterprise ERP", "Cloud Architecture", "PostgreSQL", "Next.js"],
    color: "sand",
    accentHex: "#f59e0b",
    stats: [
      { label: "Deployment", val: "12 Enterprise Sites" },
      { label: "Efficiency", val: "45% Logistics Boost" },
      { label: "Architecture", val: "Next.js / Node.js" },
      { label: "Uptime SLA", val: "99.98%" },
    ],
    clientOutcome: "Deployed across 12 major infrastructure projects with zero server downtime.",
  },
  {
    id: "hrmitra-portal",
    name: "HrMitra Portal",
    category: "web",
    categoryLabel: "WORKFORCE MANAGEMENT",
    liveBadge: "25k+ active daily employees",
    metric: "99.98% system uptime",
    metricLabel: "SLA Reliability",
    image: "/assets/projects/hrmitra-hrm-portal.png",
    description:
      "An intuitive people workspace connecting attendance, multi-tier approvals, payroll and team performance.",
    detail:
      "A modern workforce management suite that automates biometric attendance tracking, leave requests, employee compliance, and payroll slips with instant calculation speed.",
    challenge:
      "Processing biometric attendance and monthly salary calculations across 25,000 employees used to take over 48 hours of manual payroll verification.",
    solution:
      "Built an in-memory Redis payroll processing queue and responsive React interface that completes 25,000 salary computations in under 90 seconds.",
    tags: ["Next.js", "Workforce UX", "TypeScript", "Redis", "TailwindCSS"],
    color: "lavender",
    accentHex: "#8b5cf6",
    stats: [
      { label: "Active Users", val: "25k+ Daily Seats" },
      { label: "SLA Uptime", val: "99.98% Availability" },
      { label: "Payroll Speed", val: "90s Batch Run" },
      { label: "Stack", val: "React / Node / Redis" },
    ],
    clientOutcome: "Reduced payroll processing overhead by 92% across enterprise shifts.",
  },
  {
    id: "novacommerce-store",
    name: "NovaCommerce",
    category: "web",
    categoryLabel: "HEADLESS RETAIL",
    liveBadge: "Edge CDN deployed globally",
    metric: "0.28s TTFB · +64% CVR",
    metricLabel: "Sub-Second Global TTFB",
    image: "/assets/projects/novacommerce-web-portal.png",
    description:
      "Sub-second headless digital storefront built for high-throughput multi-currency retail transactions.",
    detail:
      "Decoupled commerce experience powered by Cloudflare Workers and Next.js 15. Features instant search filtering, fluid cart drawers, dynamic inventory sync, and localized checkout rails.",
    challenge:
      "A legacy Shopify theme suffered from 3.8s mobile load times, high bounce rates, and checkout abandonment during viral product drops.",
    solution:
      "Migrated to an edge-rendered headless architecture with Cloudflare edge caching, instant predictive prefetching, and multi-currency Stripe checkout.",
    tags: ["Shopify Plus", "Edge Workers", "Stripe Rails", "GraphQL", "Next.js 15"],
    color: "emerald",
    accentHex: "#10b981",
    stats: [
      { label: "Global TTFB", val: "0.28s Sub-second" },
      { label: "Mobile CVR", val: "+64% Conversion Lift" },
      { label: "Peak Drops", val: "15k req / sec" },
      { label: "Infrastructure", val: "Edge CDN & Stripe" },
    ],
    clientOutcome: "+64% mobile checkout conversions within 60 days of headless rollout.",
  },
  {
    id: "aurapay-app",
    name: "AuraPay Vault",
    category: "mobile",
    categoryLabel: "FINTECH MOBILE APP",
    liveBadge: "100k+ downloads · 4.9★",
    metric: "Zero-fraud biometric vault",
    metricLabel: "Security Architecture",
    image: "/assets/projects/aurapay-mobile-app.png",
    description:
      "Next-generation mobile banking with multi-currency cross-border transfers and instant biometric cards.",
    detail:
      "Clean tactile mobile banking interface with end-to-end encrypted biometric signing, automated expense categorization, and sub-second instant remittance across 40 currencies.",
    challenge:
      "Cross-border remittance apps were confusing, slow, and riddled with opaque fee schedules and clunky authentication walls.",
    solution:
      "Engineered tactile claymorphic debit cards, haptic transfer confirmations, and hardware Secure Enclave biometric authorization via React Native.",
    tags: ["React Native", "iOS / Android", "Biometric SDK", "FinTech", "Reanimated 3"],
    color: "cyan",
    accentHex: "#00c6ff",
    stats: [
      { label: "App Store Rating", val: "4.9★ (12k Reviews)" },
      { label: "Active Cards", val: "100k+ Issued" },
      { label: "Transfer Speed", val: "< 140ms Native" },
      { label: "Security", val: "Biometric Hardware Vault" },
    ],
    clientOutcome: "Achieved 4.9★ on the App Store with over 100,000 active biometric debit accounts.",
  },
  {
    id: "pulsefit-app",
    name: "PulseFit Telemetry",
    category: "mobile",
    categoryLabel: "CONNECTED HEALTH",
    liveBadge: "Apple Watch & Wear OS sync",
    metric: "500k+ workouts tracked",
    metricLabel: "Sensor Telemetry",
    image: "/assets/projects/pulsefit-mobile-app.png",
    description:
      "Real-time biometric workout coaching with smart device telemetry and interactive recovery analytics.",
    detail:
      "Engineered for high-performance athletes. Streams real-time Bluetooth heart-rate monitors, predicts fatigue with local ML models, and generates personalized metabolic recovery schedules.",
    challenge:
      "High-frequency 60Hz Bluetooth sensor streams caused heavy battery drain and UI micro-stutters during intense training sessions.",
    solution:
      "Built a native background BLE thread and offline ML recovery estimator that uses under 3% battery per training session while rendering buttery 120fps strain curves.",
    tags: ["Flutter", "BLE Telemetry", "HealthKit Sync", "FastAPI", "Offline ML"],
    color: "rose",
    accentHex: "#f43f5e",
    stats: [
      { label: "Telemetry", val: "Realtime BLE 60Hz" },
      { label: "Workouts", val: "500k+ Logged" },
      { label: "Battery Drain", val: "< 3% per 2h" },
      { label: "Platform", val: "iOS / WatchOS / Android" },
    ],
    clientOutcome: "500,000+ workouts logged with 99.9% telemetry packet delivery rate.",
  },
  {
    id: "quantos-terminal",
    name: "Quantos Terminal",
    category: "web",
    categoryLabel: "MARKET INTELLIGENCE",
    liveBadge: "Sub-5ms tick engine",
    metric: "1.2M events/sec stream",
    metricLabel: "Realtime Concurrency",
    image: "/assets/projects/quantos-web-terminal.png",
    description:
      "Ultra-low-latency financial analytics terminal visualizing order-book depth and liquidity flows.",
    detail:
      "A high-frequency web trading terminal supporting interactive Canvas order books, automated risk alerting, and zero-drop WebSocket channels even during market volatility spikes.",
    challenge:
      "Traders needed to monitor order books across 14 crypto exchanges simultaneously without browser tab crashes or canvas memory leaks.",
    solution:
      "Constructed a high-performance Go WebSocket multiplexer paired with custom HTML5 Canvas 2D render loops achieving sub-5ms tick-to-screen updates.",
    tags: ["WebSockets", "Canvas 2D", "Go Engine", "TimescaleDB", "React"],
    color: "amber",
    accentHex: "#eab308",
    stats: [
      { label: "Throughput", val: "1.2M Events / sec" },
      { label: "WebSocket Lag", val: "< 5ms Latency" },
      { label: "Tick-to-Screen", val: "60 FPS V-Sync" },
      { label: "Rendering", val: "Hardware Accelerated" },
    ],
    clientOutcome: "Sub-5ms order-book telemetry relied upon by prop traders across volatile market opens.",
  },
  {
    id: "claymorphism-tokens",
    name: "Claymorphism Design System",
    category: "design",
    categoryLabel: "SYSTEM & TOKENS",
    liveBadge: "Adopted by 8 product squads",
    metric: "180+ reusable tokens",
    metricLabel: "Design Architecture",
    image: "/assets/projects/claymorphism-design-tokens.png",
    description:
      "A tactile, accessible multi-brand design system bridging cross-platform UI tokens and code.",
    detail:
      "Comprehensive token system for modern products, featuring calibrated elevation shadows, fluid typography scales, accessible color pairings, and automated Figma-to-code pipelines.",
    challenge:
      "Design and engineering teams suffered from constant token drift, inconsistent button elevations, and accessibility contrast failures.",
    solution:
      "Engineered an automated Figma Tokens to CSS/TypeScript pipeline with WCAG 2.2 AAA color verification and tactile 3D clay elevation layers.",
    tags: ["Design Tokens", "WCAG AAA", "Figma Tokens", "Storybook", "Claymorphic"],
    color: "violet",
    accentHex: "#a855f7",
    stats: [
      { label: "Component Count", val: "180+ Primitives" },
      { label: "Accessibility", val: "WCAG 2.2 AAA" },
      { label: "Token Sync", val: "Automated CI/CD" },
      { label: "Tokens", val: "Cross-Platform Sync" },
    ],
    clientOutcome: "Accelerated frontend sprint velocities by 40% across 8 active product squads.",
  },
  {
    id: "infrapilot-field",
    name: "InfraPilot Inspector",
    category: "mobile",
    categoryLabel: "FIELD INSPECTION APP",
    liveBadge: "Rugged offline blueprint sync",
    metric: "+210% inspection speed",
    metricLabel: "Field Productivity",
    image: "/assets/projects/infrapilot-mobile-app.png",
    description:
      "Mobile site inspection app for construction supervisors to document defects and annotate blueprints.",
    detail:
      "Engineered for high-dust, outdoor environments. Features high-contrast sunlight visibility mode, rapid camera defect snapping, offline blueprint caching, and automated PDF site summary distribution.",
    challenge:
      "Inspectors in remote highway projects frequently worked with zero cellular signal, creating backlogs of unrecorded defect punch lists.",
    solution:
      "Built local SQLite database synchronization with encrypted image compression and one-tap PDF defect export.",
    tags: ["React Native", "Camera API", "Canvas Annotation", "Fastlane", "SQLite"],
    color: "sand",
    accentHex: "#d97706",
    stats: [
      { label: "Inspection Velocity", val: "+210% Faster" },
      { label: "App Store Rating", val: "4.9 ★" },
      { label: "Sync Latency", val: "24ms" },
      { label: "Offline Cache", val: "100% Guaranteed" },
    ],
    clientOutcome: "Reduced site inspection reporting cycle from 3 days to under 15 minutes.",
  },
  {
    id: "hrmitra-mobile",
    name: "HrMitra Mobile",
    category: "mobile",
    categoryLabel: "WORKFORCE COMPANION",
    liveBadge: "12,000+ daily shift check-ins",
    metric: "85ms offline punch speed",
    metricLabel: "Biometric Punch Velocity",
    image: "/assets/projects/hrmitra-mobile-app.png",
    description:
      "Cross-platform mobile application for workforce attendance, biometric punch-in, and geo-fenced shifts.",
    detail:
      "HrMitra Mobile lets employees clock in instantly via geofenced GPS boundaries and facial verification even in remote facilities without internet. Auto-syncs as soon as connection is available.",
    challenge:
      "Shift changes at manufacturing facilities created physical queues of hundreds of employees waiting for biometric punch kiosks.",
    solution:
      "Decentralized clock-ins to employee smartphones with geofenced GPS fencing and 85ms on-device biometric verification.",
    tags: ["React Native", "Expo SDK", "SQLite Offline", "Biometric Auth", "Geofencing"],
    color: "lavender",
    accentHex: "#7c3aed",
    stats: [
      { label: "Daily Shifts", val: "12,000+ Active" },
      { label: "Offline Punch", val: "85ms Speed" },
      { label: "Crash-Free Rate", val: "99.94%" },
      { label: "Location Check", val: "GPS Geofenced" },
    ],
    clientOutcome: "Eliminated shift punch queues, saving an estimated 1,500 employee-hours per month.",
  },
];

const BENCHMARKS = [
  {
    icon: Zap,
    metric: "< 280ms",
    title: "Sub-Second Global TTFB",
    desc: "Distributed edge rendering & intelligent Cloudflare Workers computation nearest to each client.",
  },
  {
    icon: ShieldCheck,
    metric: "99.98%",
    title: "Production SLA Uptime",
    desc: "Multi-region failover, automated error telemetry, and zero-downtime database migrations.",
  },
  {
    icon: Lock,
    metric: "100%",
    title: "Client IP & Code Ownership",
    desc: "Clean GitHub repository transfers, Figma vectors, and secrets access belonging exclusively to you on day one.",
  },
  {
    icon: Cpu,
    metric: "120 FPS",
    title: "Native Fluidity Standard",
    desc: "GPU-accelerated animations, spring gesture physics, and zero dropped frames on all devices.",
  },
];

/**
 * Interactive Cyber-Wave Canvas for Work Page Hero
 */
function WorkOrbitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const mouse = { x: -1000, y: -1000 };

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(50, Math.floor((width * height) / 10000));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.2 + 1,
        hue: Math.random() > 0.5 ? 210 : 260,
      });
    }

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse displacement
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0) {
          const force = (1 - dist / 150) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Boundary check
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Render point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, 0.6)`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.9)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist2 / 120) * 0.18;
            ctx.strokeStyle = `rgba(0, 101, 252, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="wrk-hero-canvas" />;
}

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "blueprint">("cards");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const searchInputId = useId();

  // Filter projects
  const filteredProjects = PRODUCTION_PROJECTS.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const CATEGORIES = [
    { id: "all", label: `All Systems (${PRODUCTION_PROJECTS.length})` },
    {
      id: "web",
      label: `Web Platforms (${PRODUCTION_PROJECTS.filter((p) => p.category === "web").length})`,
    },
    {
      id: "mobile",
      label: `Mobile Apps (${PRODUCTION_PROJECTS.filter((p) => p.category === "mobile").length})`,
    },
    {
      id: "design",
      label: `Design Systems (${PRODUCTION_PROJECTS.filter((p) => p.category === "design").length})`,
    },
  ];

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProject === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  return (
    <div className="wrk-root">
      {/* 1. CINEMATIC WORK HERO */}
      <section className="wrk-hero">
        <WorkOrbitCanvas />
        <div className="wrk-bg-grid" />
        <div className="wrk-glow-1" />
        <div className="wrk-glow-2" />

        <div className="wrap wrk-hero-inner">
          <div className="wrk-hero-badge">
            <span className="wrk-pulse-ring" />
            <Radio size={14} className="wrk-radio-icon" />
            <span>PROVEN PRODUCTION ECOSYSTEM • 9 FLAGSHIP SYSTEMS</span>
          </div>

          <h1 className="wrk-hero-title">
            Architected for scale.
            <br />
            Shipped with <em>uncompromising craft.</em>
          </h1>

          <p className="wrk-hero-subtitle">
            Explore our production business platforms, fintech mobile products, and high-throughput
            digital engines. Real systems deployed globally with sub-second latency and verified SLA uptime.
          </p>

          {/* Telemetry Stat Cards */}
          <div className="wrk-hero-telemetry-row">
            <div className="wrk-telemetry-card">
              <span className="wrk-tele-num">9</span>
              <span className="wrk-tele-title">Production Systems</span>
              <span className="wrk-tele-sub">Shipped across Web, Mobile &amp; AI</span>
            </div>
            <div className="wrk-telemetry-card">
              <span className="wrk-tele-num">99.98%</span>
              <span className="wrk-tele-title">SLA Reliability</span>
              <span className="wrk-tele-sub">Enterprise infrastructure uptime</span>
            </div>
            <div className="wrk-telemetry-card">
              <span className="wrk-tele-num">&lt; 280ms</span>
              <span className="wrk-tele-title">Edge Latency</span>
              <span className="wrk-tele-sub">Global average TTFB</span>
            </div>
            <div className="wrk-telemetry-card">
              <span className="wrk-tele-num">100%</span>
              <span className="wrk-tele-title">IP Ownership</span>
              <span className="wrk-tele-sub">Complete code repository handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE CONTROLS & FILTER TOOLBAR */}
      <section className="wrap wrk-toolbar-section">
        <div className="wrk-toolbar">
          {/* Domain Tabs */}
          <div className="wrk-category-pills" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeCategory === c.id}
                className={`wrk-cat-pill ${activeCategory === c.id ? "active" : ""}`}
                onClick={() => setActiveCategory(c.id)}
              >
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Search & View Mode Switcher */}
          <div className="wrk-toolbar-right">
            <div className="wrk-search-box">
              <Search size={15} className="wrk-search-icon" />
              <input
                id={searchInputId}
                type="text"
                placeholder="Search by project or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="wrk-search-input"
                aria-label="Filter production projects"
              />
              {searchQuery && (
                <button
                  className="wrk-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear filter"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="wrk-view-switcher">
              <button
                className={`wrk-view-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
                aria-label="3D Grid view"
                title="3D Card Grid"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`wrk-view-btn ${viewMode === "blueprint" ? "active" : ""}`}
                onClick={() => setViewMode("blueprint")}
                aria-label="Blueprint view"
                title="Engineering Blueprint Specs"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE GALLERY — 3D CARDS VIEW */}
      <section className="wrap wrk-gallery-section">
        {filteredProjects.length === 0 ? (
          <div className="wrk-empty-state">
            <HelpCircle size={36} />
            <h3>No projects match “{searchQuery}”</h3>
            <p>Try clearing your search term or select another category.</p>
            <button
              className="wrk-btn-glass"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "cards" ? (
          <div className="wrk-projects-grid">
            {filteredProjects.map((proj) => (
              <ProjectCard3D
                key={proj.id}
                project={proj}
                onSelect={() => setSelectedProject(proj)}
              />
            ))}
          </div>
        ) : (
          /* BLUEPRINT ENGINEERING VIEW */
          <div className="wrk-blueprint-list">
            {filteredProjects.map((proj) => (
              <article key={proj.id} className="wrk-blueprint-row">
                <div className="wrk-bp-left">
                  <div className="wrk-bp-meta">
                    <span className="wrk-bp-category">{proj.categoryLabel}</span>
                    <span className="wrk-bp-live-badge">{proj.liveBadge}</span>
                  </div>
                  <h3 className="wrk-bp-title">{proj.name}</h3>
                  <p className="wrk-bp-desc">{proj.description}</p>
                  <div className="wrk-bp-tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="wrk-bp-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="wrk-bp-center">
                  <div className="wrk-bp-stats-grid">
                    {proj.stats.map((s) => (
                      <div key={s.label} className="wrk-bp-stat-item">
                        <span className="wrk-bp-stat-lbl">{s.label}</span>
                        <strong className="wrk-bp-stat-val">{s.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="wrk-bp-right">
                  <button
                    type="button"
                    className="wrk-btn-glow"
                    onClick={() => setSelectedProject(proj)}
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. PERFORMANCE BENCHMARKS BENTO RIBBON */}
      <section className="wrap wrk-benchmarks-section">
        <div className="wrk-section-heading">
          <span className="wrk-eyebrow">ENGINEERING BENCHMARKS</span>
          <h2>Guaranteed Architectural Standards</h2>
          <p>
            Every line of code shipped from our studio is filtered through these non-negotiable performance principles.
          </p>
        </div>

        <div className="wrk-benchmarks-grid">
          {BENCHMARKS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className={`wrk-benchmark-card wrk-accent-${idx}`}>
                <div className="wrk-bench-top">
                  <div className="wrk-bench-icon">
                    <Icon size={22} />
                  </div>
                  <span className="wrk-bench-metric">{b.metric}</span>
                </div>
                <h3 className="wrk-bench-title">{b.title}</h3>
                <p className="wrk-bench-desc">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. VERIFIED CLIENT IMPACT REEL */}
      <section className="wrap wrk-testimonials-section">
        <div className="wrk-section-heading">
          <span className="wrk-eyebrow">VERIFIED PARTNER FEEDBACK</span>
          <h2>Systems That Founders &amp; Leaders Trust</h2>
          <p>
            Real metrics, measurable commercial velocity, and direct architectural impact.
          </p>
        </div>

        <div className="wrk-testimonials-grid">
          <div className="wrk-testimonial-card">
            <div className="wrk-testi-stars">★★★★★</div>
            <p className="wrk-testi-quote">
              “DigentTech took InfraPilot from an architectural concept to an active ERP deployed across 12 infrastructure sites. Their code hygiene and sprint velocity are unmatched.”
            </p>
            <div className="wrk-testi-pill">
              <Zap size={13} />
              <span>45% Faster Site Logistics</span>
            </div>
            <div className="wrk-testi-author">
              <div className="wrk-testi-avatar">RV</div>
              <div>
                <strong>Rajeshwar Verma</strong>
                <span>VP of Engineering · InfraPilot Corp</span>
              </div>
            </div>
          </div>

          <div className="wrk-testimonial-card">
            <div className="wrk-testi-stars">★★★★★</div>
            <p className="wrk-testi-quote">
              “Our workforce platform handles 25,000+ daily employee check-ins without a hiccup. The biometric sync and payroll speed are practically instantaneous.”
            </p>
            <div className="wrk-testi-pill">
              <ShieldCheck size={13} />
              <span>99.98% SLA Uptime</span>
            </div>
            <div className="wrk-testi-author">
              <div className="wrk-testi-avatar">AM</div>
              <div>
                <strong>Ananya Mehta</strong>
                <span>Head of Digital Operations · HrMitra</span>
              </div>
            </div>
          </div>

          <div className="wrk-testimonial-card">
            <div className="wrk-testi-stars">★★★★★</div>
            <p className="wrk-testi-quote">
              “Our retail conversion jumped 64% after switching to the headless Next.js storefront they engineered. Global TTFB dropped from 2.4s to 280ms.”
            </p>
            <div className="wrk-testi-pill">
              <Flame size={13} />
              <span>+64% Mobile CVR Lift</span>
            </div>
            <div className="wrk-testi-author">
              <div className="wrk-testi-avatar">MT</div>
              <div>
                <strong>Marcus Thorne</strong>
                <span>Director of E-Commerce · NovaCommerce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECT ESTIMATOR LAUNCHER CTA */}
      <section className="wrap wrk-cta-section">
        <div className="wrk-cta-card">
          <div className="wrk-cta-glow" />
          <div className="wrk-cta-content">
            <span className="wrk-eyebrow">HAVE A SYSTEM TO ARCHITECT?</span>
            <h2>Let's build your next flagship product.</h2>
            <p>
              Whether you need a high-frequency trading terminal, enterprise ERP platform,
              or a buttery 120fps mobile application, we ship production systems within 4 to 8 weeks.
            </p>
            <div className="wrk-cta-actions">
              <a href="/contact?service=Web%20development" className="wrk-btn-glow">
                <span>Start a Project Brief</span>
                <ArrowRight size={16} />
              </a>
              <a href="/services" className="wrk-btn-glass">
                <span>Explore Full Capabilities</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEEP-DIVE CASE STUDY MODAL */}
      {selectedProject && (
        <div className="wrk-modal-shade" onClick={() => setSelectedProject(null)}>
          <div
            className="wrk-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.name}
          >
            <button
              type="button"
              className="wrk-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* Modal Top Bar */}
            <div className="wrk-modal-bar">
              <div>
                <span className="wrk-modal-category">{selectedProject.categoryLabel}</span>
                <h2 className="wrk-modal-title">{selectedProject.name}</h2>
              </div>
              <span className="wrk-modal-metric-pill">
                <Zap size={13} /> {selectedProject.metric}
              </span>
            </div>

            {/* Modal Hero Visual */}
            <div className="wrk-modal-media">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.name} system showcase`}
                loading="eager"
              />
              <div className="wrk-modal-overlay-badge">
                <span className="wrk-modal-dot" />
                <span>{selectedProject.liveBadge}</span>
              </div>
            </div>

            {/* Modal Metrics Bar */}
            <div className="wrk-modal-stats-bar">
              {selectedProject.stats.map((s) => (
                <div key={s.label} className="wrk-modal-stat-box">
                  <span className="wrk-modal-stat-lbl">{s.label}</span>
                  <strong className="wrk-modal-stat-val">{s.val}</strong>
                </div>
              ))}
            </div>

            {/* Narrative Case Study Sections */}
            <div className="wrk-modal-body">
              <div className="wrk-modal-narrative-grid">
                <div className="wrk-modal-section">
                  <h4>THE COMMERCIAL CHALLENGE</h4>
                  <p>{selectedProject.challenge}</p>
                </div>
                <div className="wrk-modal-section">
                  <h4>THE ENGINEERING SOLUTION</h4>
                  <p>{selectedProject.solution}</p>
                </div>
              </div>

              <div className="wrk-modal-section">
                <h4>VERIFIED PRODUCTION IMPACT</h4>
                <div className="wrk-modal-outcome-box">
                  <Check size={16} className="wrk-outcome-check" />
                  <span>{selectedProject.clientOutcome}</span>
                </div>
              </div>

              {/* Architecture Tech Stack */}
              <div className="wrk-modal-section">
                <h4>PRODUCTION ARCHITECTURE &amp; TOKENS</h4>
                <div className="wrk-modal-tags">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="wrk-modal-tag-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="wrk-modal-footer">
                <a
                  href={`/contact?service=${encodeURIComponent(
                    selectedProject.category === "mobile"
                      ? "App development"
                      : "Web development"
                  )}&brief=${encodeURIComponent(
                    `Inquiry regarding architecture similar to ${selectedProject.name}.`
                  )}`}
                  className="wrk-btn-glow"
                >
                  <span>Discuss a Similar Architecture</span>
                  <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  className="wrk-btn-glass"
                  onClick={() => setSelectedProject(null)}
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 3D Interactive Project Card with Cursor Spotlight Tracking
 */
function ProjectCard3D({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const cx = (x / rect.width - 0.5) * 2;
    const cy = (y / rect.height - 0.5) * 2;
    setTilt({ x: -cy * 5.5, y: cx * 5.5 });
  };

  return (
    <button
      ref={cardRef}
      className="wrk-card-interactive"
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      aria-label={`${project.name} case study details`}
      style={
        {
          "--mouse-x": `${coords.x}px`,
          "--mouse-y": `${coords.y}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="wrk-card-inner"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
        }}
      >
        <div className="wrk-card-spotlight" />

        {/* Window Top Bar */}
        <div className="wrk-card-bar">
          <div className="wrk-card-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="wrk-card-domain">
            {project.name.toLowerCase().replace(/\s+/g, "")}.io / platform
          </span>
          <div className="wrk-card-live">
            <span className="wrk-live-dot" />
            <span>Live System</span>
          </div>
        </div>

        {/* Elevated Image Media Stage */}
        <div className={`wrk-card-media-stage wrk-stage-${project.color}`}>
          <div className="wrk-card-img-wrap">
            <img
              src={project.image}
              alt={`${project.name} interface`}
              loading="lazy"
            />
          </div>
          <div className="wrk-card-hover-overlay">
            <span>Inspect Blueprint</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Info Block */}
        <div className="wrk-card-content">
          <div className="wrk-card-meta-row">
            <span className="wrk-card-category">{project.categoryLabel}</span>
            <span className="wrk-card-metric-pill">
              <Zap size={11} style={{ color: "var(--accent)" }} />
              {project.metric}
            </span>
          </div>

          <div className="wrk-card-title-row">
            <h3>{project.name}</h3>
            <div className="wrk-card-arrow">
              <ArrowUpRight size={16} />
            </div>
          </div>

          <p className="wrk-card-desc">{project.description}</p>

          <div className="wrk-card-tags">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="wrk-card-tag-pill">
                {t}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="wrk-card-tag-more">+{project.tags.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
