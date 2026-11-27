import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Filter,
  Flame,
  LayoutGrid,
  List,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlexCarousel, {
  type FlexCarouselHandle,
  type FlexCarouselItem,
  type FlexCarouselPreset,
} from "./FlexCarousel";
import "./work-page.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  index: string;
  name: string;
  category: "web" | "mobile" | "ai" | "design";
  categoryLabel: string;
  liveBadge: string;
  metric: string;
  metricLabel: string;
  velocity: string;
  image: string;
  description: string;
  detail: string;
  challenge: string;
  solution: string;
  flowStages: string[];
  tags: string[];
  color: "sand" | "lavender" | "emerald" | "cyan" | "rose" | "amber" | "violet";
  accentHex: string;
  stats: { label: string; val: string }[];
  clientOutcome: string;
}

const FLOW_STEPS = [
  {
    step: "01",
    phase: "SYSTEM AUDIT",
    title: "Architecture & Latency Spec",
    desc: "We instrument bottleneck traces, threat boundaries, and deterministic schema blueprints before committing sprint velocity.",
  },
  {
    step: "02",
    phase: "EDGE & TOKENS",
    title: "Unified Stack Foundation",
    desc: "Simultaneous delivery of OKLCH contrast tokens, strict TypeScript API contracts, and edge caching topology.",
  },
  {
    step: "03",
    phase: "BUILD & HARDEN",
    title: "Autonomous CI Gates",
    desc: "Playwright end-to-end verification, bundle budgets, and load testing embedded into every pull request.",
  },
  {
    step: "04",
    phase: "TELEMETRY & IP",
    title: "Production Ownership",
    desc: "Zero-downtime rollouts with SLO observability and 100% clean repository, design token, and runbook handover.",
  },
];

const STACK_MARQUEE_ITEMS = [
  "LANGGRAPH MULTI-AGENT",
  "CLOUDFLARE WORKERS ISR",
  "GO ACID LEDGER",
  "SWIFT HARDWARE ENCLAVE",
  "WEBGL DIGITAL TWIN",
  "W3C OKLCH TOKENS",
  "BLE CLINICAL TELEMETRY",
  "POSTGRESQL RLS",
  "GSAP 120FPS",
  "NATIVE TOP-LAYER DIALOGS",
];

const PRODUCTION_PROJECTS: ProjectItem[] = [
  {
    id: "pulsemesh-neural-ops",
    index: "01",
    name: "PulseMesh Neural Ops",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    liveBadge: "42 Logistics Hubs · Sub-35ms",
    metric: "1.4M Daily Events",
    metricLabel: "Autonomous Routing Throughput",
    velocity: "6 Weeks Production",
    image: "/assets/projects/work-pulsemesh-ai.webp",
    description:
      "Autonomous multi-agent freight dispatch and predictive corridor solver coordinating live fleet telemetry with citation guardrails.",
    detail:
      "Engineered for continental freight carriers moving real-time telemetry across 42 hubs. Combines high-frequency Qdrant vector routing with deterministic LangGraph policy solvers and instant supervisor overrides.",
    challenge:
      "Manual dispatch desks were overwhelmed by 1.4M daily route exceptions, weather delays, and carrier capacity shifts, stalling high-value corridor ETAs.",
    solution:
      "Built a sub-35ms streaming spatial routing graph paired with human-in-the-loop approval rails and full replay audit logging.",
    flowStages: ["Telemetry Mesh", "Vector Router", "Policy Solver", "Edge Dispatch"],
    tags: ["LangGraph", "Python FastAPI", "Qdrant", "Next.js", "WebSockets"],
    color: "cyan",
    accentHex: "#38bdf8",
    stats: [
      { label: "Daily Events", val: "1.4M+ Routed" },
      { label: "Inference Latency", val: "34ms P95" },
      { label: "ETA Accuracy", val: "99.8% Verified" },
      { label: "Throughput Lift", val: "+37% Velocity" },
    ],
    clientOutcome:
      "Lifted cross-hub freight corridor throughput by 37% with 99.8% verified ETA reliability.",
  },
  {
    id: "aethercore-treasury-os",
    index: "02",
    name: "AetherCore Treasury OS",
    category: "web",
    categoryLabel: "INSTITUTIONAL FINTECH",
    liveBadge: "Fedwire · CHIPS · TARGET2",
    metric: "$4.91T Settlement Ledger",
    metricLabel: "Multi-Currency Settlement Volume",
    velocity: "8 Weeks Architecture",
    image: "/assets/projects/work-aethercore-web.webp",
    description:
      "Real-time institutional settlement cockpit uniting multi-currency liquidity sweeps, cryptographic audit trails, and risk heatmaps.",
    detail:
      "Purpose-built institutional clearing terminal streaming live multi-rail FX settlement liquidity with double-entry ACID invariants and 120Hz telemetry sparklines.",
    challenge:
      "Legacy batch treasury reporting delayed cross-rail liquidity rebalancing by hours and obscured intraday counterparty exposure.",
    solution:
      "Architected an idempotent Go ledger microservice feeding a zero-layout-shift React workstation via multiplexed WebSockets.",
    flowStages: ["Ledger Core", "Risk Mesh", "Liquidity UI", "SOC-2 Audit"],
    tags: ["React 19", "TypeScript", "Go Ledger", "PostgreSQL", "Redis"],
    color: "lavender",
    accentHex: "#818cf8",
    stats: [
      { label: "Volume Tracked", val: "$4.91T Flows" },
      { label: "Ledger Safety", val: "Double-Entry ACID" },
      { label: "UI Frame Rate", val: "120Hz Smooth" },
      { label: "Uptime SLA", val: "99.99%" },
    ],
    clientOutcome:
      "Compressed multi-currency settlement reconciliation from 3.5 hours to under 18 seconds.",
  },
  {
    id: "velocepay-wallet",
    index: "03",
    name: "VelocePay Instant Wallet",
    category: "mobile",
    categoryLabel: "FINTECH MOBILE APP",
    liveBadge: "iOS Enclave · Android Biometrics",
    metric: "60fps Enclave Flow",
    metricLabel: "Hardware Biometric Clearing",
    velocity: "5 Weeks MVP + Apps",
    image: "/assets/projects/work-velocepay-mobile.webp",
    description:
      "Hardware-biometric digital wallet and virtual card vault engineered for instant QR settlement and resilient offline queues.",
    detail:
      "Consumer mobile finance platform pairing native device Secure Enclave request signing with interactive balance curves and virtual card lifecycle management.",
    challenge:
      "First-generation cross-platform wallets suffered dropped biometric sessions, slow cold starts, and failed QR scans under poor cellular coverage.",
    solution:
      "Implemented native Enclave key attestation, deterministic idempotency keys, and GPU-composited card vault gestures.",
    flowStages: ["Biometric Key", "Vault Card", "Instant Rail", "Ledger Sync"],
    tags: ["React Native", "Swift Enclave", "Go", "Stripe Rails", "SQLite"],
    color: "violet",
    accentHex: "#818cf8",
    stats: [
      { label: "Crash-Free", val: "99.98% Sessions" },
      { label: "Cold Start", val: "138ms Native" },
      { label: "Signing Rail", val: "Hardware Enclave" },
      { label: "Frame Pace", val: "Locked 60fps" },
    ],
    clientOutcome:
      "Maintained a 99.98% crash-free session rate across 400k+ monthly biometric authorizations.",
  },
  {
    id: "kinetix-spatial-twin",
    index: "04",
    name: "Kinetix Spatial Twin",
    category: "ai",
    categoryLabel: "INDUSTRIAL AI TWIN",
    liveBadge: "280 Solar & Battery Nodes",
    metric: "-44% Unplanned Faults",
    metricLabel: "Predictive Grid Telemetry",
    velocity: "7 Weeks Full Rollout",
    image: "/assets/projects/work-kinetix-twin.webp",
    description:
      "Predictive 3D substation digital twin and harmonic anomaly triage console cutting unplanned field dispatches across 280 energy nodes.",
    detail:
      "Real-time WebGL topology viewer ingesting inverter harmonic spectra at 18ms cadence to surface thermal drift and auto-route maintenance crews.",
    challenge:
      "Grid engineers reacted only after breaker trips because SCADA tables buried subtle harmonic phase drift across distributed solar arrays.",
    solution:
      "Built a TimescaleDB + FastAPI anomaly pipeline feeding a live 3D wireframe node map with autonomous dispatch prioritization.",
    flowStages: ["Sensor Ingest", "3D Mesh", "Fault Triage", "Auto Dispatch"],
    tags: ["Python FastAPI", "WebGL", "TimescaleDB", "Redis", "TypeScript"],
    color: "cyan",
    accentHex: "#38bdf8",
    stats: [
      { label: "Active Nodes", val: "280 Substations" },
      { label: "Telemetry Lag", val: "18ms Stream" },
      { label: "Fault Reduction", val: "-44% Outages" },
      { label: "Manual Triage", val: "0 Escalations" },
    ],
    clientOutcome:
      "Reduced unplanned substation field dispatches by 44% within one quarter of deployment.",
  },
  {
    id: "lumina-headless-store",
    index: "05",
    name: "Lumina Headless Store",
    category: "web",
    categoryLabel: "HEADLESS COMMERCE",
    liveBadge: "Global Edge ISR · 18.4k req/s",
    metric: "190ms Edge TTFB",
    metricLabel: "Sub-200ms Global Delivery",
    velocity: "4 Weeks Migration",
    image: "/assets/projects/work-lumina-commerce.webp",
    description:
      "Edge-rendered composable commerce platform with sub-second SKU filtering, interactive 3D product views, and 2.4x conversion.",
    detail:
      "Replaced a slow monolithic retail theme with Cloudflare Workers ISR routing, zero-shift cart drawers, and instant multi-currency checkout rails.",
    challenge:
      "Limited-edition Nordic audio drops triggered 4.1s load spikes and severe checkout drop-offs on mobile networks.",
    solution:
      "Engineered predictive route prefetching, edge-cached GraphQL product catalogs, and isolated server attribution webhooks.",
    flowStages: ["Edge Cache", "3D Viewer", "Instant Cart", "Global Pay"],
    tags: ["Next.js 15", "Cloudflare Workers", "Shopify", "Stripe", "GraphQL"],
    color: "emerald",
    accentHex: "#34d399",
    stats: [
      { label: "Global TTFB", val: "190ms Edge" },
      { label: "Checkout Lift", val: "2.4x Conversion" },
      { label: "Peak Traffic", val: "18.4k req / sec" },
      { label: "Visual Stability", val: "0.00 CLS Score" },
    ],
    clientOutcome:
      "Delivered 2.4x higher mobile conversion rate while sustaining 18,400 requests/second on launch drops.",
  },
  {
    id: "stratum-token-engine",
    index: "06",
    name: "Stratum Token Engine",
    category: "design",
    categoryLabel: "DESIGN ARCHITECTURE",
    liveBadge: "14 Squads · Zero-Flash Sync",
    metric: "12.4:1 AAA Contrast",
    metricLabel: "OKLCH Multi-Theme System",
    velocity: "3 Weeks Token Core",
    image: "/assets/projects/work-stratum-system.webp",
    description:
      "W3C DTCG design token pipeline compiling OKLCH dark/light surface pairs, accessible primitives, and CI visual diffs.",
    detail:
      "Single-source semantic styling system unifying Tailwind/CSS tokens, Figma Variables, and WCAG AAA primitives across web and native squads.",
    challenge:
      "Fourteen independent product squads shipped inconsistent contrast ratios, duplicate modals, and janky theme hydration flashes.",
    solution:
      "Published automated W3C token compilation, pre-paint color-scheme resolution, and 64+ accessible React primitives.",
    flowStages: ["OKLCH Ramps", "Figma Sync", "Primitives", "CI Diff Gate"],
    tags: ["W3C Tokens", "React", "TypeScript", "Figma API", "Playwright"],
    color: "amber",
    accentHex: "#38bdf8",
    stats: [
      { label: "Adopting Squads", val: "14 Product Teams" },
      { label: "UI Primitives", val: "64 Accessible" },
      { label: "Contrast Target", val: "12.4:1 WCAG AAA" },
      { label: "UI Regression", val: "0 CI Failures" },
    ],
    clientOutcome:
      "Cut new feature UI scaffolding time by 62% with zero WCAG contrast regressions.",
  },
  {
    id: "medisync-ward-companion",
    index: "07",
    name: "MediSync Ward Companion",
    category: "mobile",
    categoryLabel: "HEALTHCARE MOBILE",
    liveBadge: "HIPAA Encrypted · BLE Vitals",
    metric: "99.99% Care SLA",
    metricLabel: "Clinical Shift Sync Reliability",
    velocity: "6 Weeks Clinical Pilot",
    image: "/assets/projects/work-medisync-mobile.webp",
    description:
      "HIPAA-aligned clinician ward companion featuring continuous BLE ECG/SpO2 streaming and 1.2s encrypted shift handoffs.",
    detail:
      "Built for step-down and ICU nursing teams requiring continuous wearable vitals visualization and structured AES-256 voice shift transcriptions.",
    challenge:
      "Manual clipboard vital checks and fragmented shift change briefings created charting lag across high-acuity hospital wings.",
    solution:
      "Paired Flutter Bluetooth Low Energy telemetry collectors with offline SQLite storage and zero-knowledge encrypted handoff cards.",
    flowStages: ["BLE Stream", "ECG Engine", "Voice Notes", "Ward Lock"],
    tags: ["Flutter", "Supabase", "Bluetooth LE", "Go", "AES-256"],
    color: "cyan",
    accentHex: "#38bdf8",
    stats: [
      { label: "Uptime SLA", val: "99.99% Clinical" },
      { label: "Waveform Pace", val: "Real-time BLE" },
      { label: "Voice Sync", val: "1.2s Verify" },
      { label: "Security Spec", val: "HIPAA + AES-256" },
    ],
    clientOutcome:
      "Saved nurses 52 minutes of charting overhead per shift with real-time ICU bay monitoring.",
  },
  {
    id: "orbit-revenue-pipeline",
    index: "08",
    name: "Orbit Revenue Pipeline",
    category: "web",
    categoryLabel: "ENTERPRISE B2B SAAS",
    liveBadge: "18,000+ Active Enterprise Seats",
    metric: "+31% Deal Velocity",
    metricLabel: "Multi-Org Pipeline Routing",
    velocity: "7 Weeks Enterprise",
    image: "/assets/projects/work-orbit-crm.webp",
    description:
      "High-throughput revenue intelligence platform automating SLA lead routing, security review stages, and territory forecasting.",
    detail:
      "Enterprise CRM command workspace managing $42.8M+ active B2B ARR pipelines with strict PostgreSQL row-level isolation.",
    challenge:
      "Enterprise deals stalled in disconnected security and legal queues with inaccurate spreadsheet revenue rollups.",
    solution:
      "Engineered a 140ms SLA routing rule engine, multi-stage Kanban board, and real-time Redis-backed forecast spline analytics.",
    flowStages: ["SLA Router", "Kanban Core", "RBAC Guard", "Forecasting"],
    tags: ["Next.js", "PostgreSQL RLS", "Node.js", "Redis", "SOC-2"],
    color: "sand",
    accentHex: "#818cf8",
    stats: [
      { label: "Active Seats", val: "18,000+ Reps" },
      { label: "Deal Velocity", val: "+31% Faster" },
      { label: "Routing Time", val: "140ms SLA" },
      { label: "Forecast Score", val: "96.4% Accuracy" },
    ],
    clientOutcome:
      "Accelerated enterprise deal cycle velocity by 31% across 18,000 global commercial seats.",
  },
  {
    id: "foundry-motion-sdk",
    index: "09",
    name: "Foundry Motion SDK",
    category: "design",
    categoryLabel: "MOTION & LAYOUT SDK",
    liveBadge: "GSAP 3.15 · Native Top Layer",
    metric: "120fps Composited",
    metricLabel: "Zero Layout Shift Choreography",
    velocity: "4 Weeks Studio SDK",
    image: "/assets/projects/work-foundry-kit.webp",
    description:
      "Production component kit pairing GSAP ScrollTrigger timelines, native top-layer dialogs, and View Transition primitives.",
    detail:
      "Internal and partner UI engineering standard enforcing GPU-composited animations, @starting-style overlays, and full prefers-reduced-motion safety.",
    challenge:
      "Off-the-shelf UI libraries suffered top-layer z-index traps, forced reflow jank, and zero respect for reduced-motion accessibility.",
    solution:
      "Authored composable GSAP hooks, CSS Anchor Positioning tab underlines, and View Transitions powered navigation wrappers.",
    flowStages: ["GSAP Core", "Top Layer", "View Morph", "A11y Motion"],
    tags: ["GSAP 3.15", "View Transitions", "CSS Anchor", "TypeScript", "Dialogs"],
    color: "lavender",
    accentHex: "#38bdf8",
    stats: [
      { label: "Frame Target", val: "120 FPS Locked" },
      { label: "Layout Shifts", val: "0.00 CLS" },
      { label: "Modal Layer", val: "Native :modal" },
      { label: "A11y Guard", val: "Reduced-Motion" },
    ],
    clientOutcome:
      "Powering flagship production experiences with 100 Lighthouse Performance & zero jank.",
  },
];

const BENCHMARKS = [
  {
    icon: Zap,
    metric: "< 200ms",
    title: "Sub-Second Global TTFB",
    desc: "Distributed edge rendering and intelligent Cloudflare Workers execution closest to every session.",
  },
  {
    icon: ShieldCheck,
    metric: "99.98%",
    title: "Production SLA Uptime",
    desc: "Multi-region failover, OpenTelemetry error budgets, and zero-downtime schema rollouts.",
  },
  {
    icon: Code2,
    metric: "100%",
    title: "Client IP & Code Ownership",
    desc: "Clean repositories, Figma token libraries, and infrastructure IaC owned exclusively by your team.",
  },
  {
    icon: Sparkles,
    metric: "120 FPS",
    title: "Composited Motion & Fluidity",
    desc: "GPU-accelerated GSAP choreography, native View Transitions, and 0.00 CLS across mobile and desktop.",
  },
];

function useWorkDialogSync(
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  open: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [dialogRef, open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d || "closedBy" in HTMLDialogElement.prototype) return;
    const isOutside = (e: PointerEvent) => {
      const r = d.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    let downOutside = false;
    const onDown = (e: PointerEvent) => {
      downOutside = isOutside(e);
    };
    const onUp = (e: PointerEvent) => {
      if (downOutside && isOutside(e)) d.close();
      downOutside = false;
    };
    d.addEventListener("pointerdown", onDown);
    d.addEventListener("pointerup", onUp);
    return () => {
      d.removeEventListener("pointerdown", onDown);
      d.removeEventListener("pointerup", onUp);
    };
  }, [dialogRef]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onNativeClose = () => {
      d.returnValue = "";
      onClose();
    };
    d.addEventListener("close", onNativeClose);
    return () => d.removeEventListener("close", onNativeClose);
  }, [dialogRef, onClose]);
}

function InteractiveHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const mouse = { x: -1000, y: -1000 };
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
    }[] = [];
    const nodeCount = Math.min(48, Math.floor((width * height) / 11500));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        hue: Math.random() > 0.45 ? 196 : 235,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < 150 && distMouse > 0) {
          const force = (1 - distMouse / 150) * 1.4;
          p.x -= (dxMouse / distMouse) * force;
          p.y -= (dyMouse / distMouse) * force;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 92%, 64%, 0.56)`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 125) * 0.2;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="wrk-hero-canvas" aria-hidden="true" />;
}

export function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const stageDeckRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filterChangedRef = useRef(false);
  const stageHoverRef = useRef(false);

  const [category, setCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "blueprint">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [heroDeckIdx, setHeroDeckIdx] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [lensPreset, setLensPreset] = useState<FlexCarouselPreset>("liquid");
  const carouselCtrlRef = useRef<FlexCarouselHandle | null>(null);
  const searchInputId = useId();
  const modalTitleId = useId();

  useWorkDialogSync(dialogRef, !!selectedProject, () => setSelectedProject(null));

  const heroDeckItems = PRODUCTION_PROJECTS.slice(0, 4);
  const activeDeckProject = heroDeckItems[heroDeckIdx] ?? PRODUCTION_PROJECTS[0];

  useEffect(() => {
    setCarouselIdx(0);
  }, [category, searchQuery]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!stageHoverRef.current) {
        setHeroDeckIdx((prev) => (prev + 1) % heroDeckItems.length);
      }
    }, 4600);
    return () => window.clearInterval(id);
  }, [heroDeckItems.length]);

  useEffect(() => {
    const deck = stageDeckRef.current;
    if (
      !deck ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;
    gsap.fromTo(
      deck.querySelectorAll(".wrk-stage-swap"),
      { y: 12, opacity: 0.2, scale: 0.985 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.42,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "transform,opacity",
      },
    );
  }, [heroDeckIdx]);

  const filteredProjects = PRODUCTION_PROJECTS.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const carouselItems: FlexCarouselItem[] = filteredProjects.map((p) => ({
    src: p.image,
    alt: `${p.name} — ${p.categoryLabel}`,
    title: p.name,
    subtitle: `${p.categoryLabel} · ${p.metric}`,
  }));

  const activeCarouselProject = filteredProjects[carouselIdx] ?? filteredProjects[0];

  const categories = [
    { id: "all", name: "All Systems", count: PRODUCTION_PROJECTS.length },
    {
      id: "web",
      name: "Web Platforms",
      count: PRODUCTION_PROJECTS.filter((p) => p.category === "web").length,
    },
    {
      id: "mobile",
      name: "Mobile Apps",
      count: PRODUCTION_PROJECTS.filter((p) => p.category === "mobile").length,
    },
    {
      id: "ai",
      name: "AI & Automation",
      count: PRODUCTION_PROJECTS.filter((p) => p.category === "ai").length,
    },
    {
      id: "design",
      name: "Design Systems",
      count: PRODUCTION_PROJECTS.filter((p) => p.category === "design").length,
    },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          ".wrk-hero-badge",
          { y: -14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, clearProps: "transform,opacity" },
          0,
        )
        .fromTo(
          ".wrk-hero-title",
          { y: 34, clipPath: "inset(0 0 100% 0)", opacity: 0.12 },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.85,
            clearProps: "clipPath,transform,opacity",
          },
          0.08,
        )
        .fromTo(
          ".wrk-hero-subtitle",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" },
          0.18,
        )
        .fromTo(
          ".wrk-hero-actions",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, clearProps: "transform,opacity" },
          0.25,
        )
        .fromTo(
          ".wrk-telemetry-card",
          { y: 22, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.58,
            stagger: 0.08,
            ease: "back.out(1.4)",
            clearProps: "transform,opacity",
          },
          0.28,
        )
        .fromTo(
          ".wrk-stage-deck",
          { x: 28, scale: 0.96, opacity: 0 },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.78,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.14,
        );

      root.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
        const target = Number(el.dataset.countTo || "0");
        const decimals = Number(el.dataset.countDecimals || "0");
        const prefix = el.dataset.countPrefix || "";
        const suffix = el.dataset.countSuffix || "";
        const obj = { v: decimals ? Math.max(0, target - 4.5) : 0 };
        gsap.to(obj, {
          v: target,
          duration: 0.72,
          delay: 0.14,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = `${prefix}${decimals ? obj.v.toFixed(decimals) : Math.round(obj.v)}${suffix}`;
          },
        });
      });

      const flowBand = root.querySelector<HTMLElement>(".wrk-flow-band");
      if (flowBand) {
        const lineFill = flowBand.querySelector<HTMLElement>(".wrk-flow-line-fill");
        const flowCards = gsap.utils.toArray<HTMLElement>(".wrk-flow-card", flowBand);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: flowBand, start: "top 86%", once: true },
        });
        if (lineFill) {
          tl.fromTo(
            lineFill,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.15, ease: "power3.inOut", clearProps: "transform" },
            0,
          );
        }
        if (flowCards.length) {
          tl.fromTo(
            flowCards,
            { y: 26, scale: 0.96, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.62,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            0.08,
          );
        }
      }

      [
        ".wrk-carousel-shell",
        ".wrk-blueprint-row",
        ".wrk-benchmark-card",
        ".wrk-testimonial-card",
        ".wrk-cta-card",
      ].forEach((sel) => {
        const els = gsap.utils.toArray<HTMLElement>(sel, root);
        if (!els.length) return;
        ScrollTrigger.batch(els, {
          start: "top 91%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 26, scale: 0.97, opacity: 0.08 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.68,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
            );
          },
        });
      });

      const deck = stageDeckRef.current;
      if (deck && window.matchMedia?.("(pointer: fine)").matches) {
        const xImg = gsap.quickTo(deck.querySelector(".wrk-stage-frame"), "rotateY", {
          duration: 0.45,
          ease: "power3.out",
        });
        const yImg = gsap.quickTo(deck.querySelector(".wrk-stage-frame"), "rotateX", {
          duration: 0.45,
          ease: "power3.out",
        });
        const onDeckMove = (e: MouseEvent) => {
          const r = deck.getBoundingClientRect();
          const cx = (e.clientX - r.left) / r.width - 0.5;
          const cy = (e.clientY - r.top) / r.height - 0.5;
          xImg(cx * 9);
          yImg(-cy * 7);
        };
        const onDeckLeave = () => {
          xImg(0);
          yImg(0);
        };
        deck.addEventListener("mousemove", onDeckMove);
        deck.addEventListener("mouseleave", onDeckLeave);
        cleanups.push(() => {
          deck.removeEventListener("mousemove", onDeckMove);
          deck.removeEventListener("mouseleave", onDeckLeave);
        });
      }

      if (window.matchMedia?.("(pointer: fine)").matches) {
        root.querySelectorAll<HTMLElement>(".wrk-btn-glow").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            const relX = (e.clientX - r.left - r.width / 2) * 0.2;
            const relY = (e.clientY - r.top - r.height / 2) * 0.2;
            xTo(Math.max(-6, Math.min(6, relX)));
            yTo(Math.max(-6, Math.min(6, relY)));
          };
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
          };
          btn.addEventListener("mousemove", onMove);
          btn.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", onMove);
            btn.removeEventListener("mouseleave", onLeave);
          });
        });
      }
    }, root);

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!filterChangedRef.current) return;
    const gallery = galleryRef.current;
    if (!gallery) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.refresh();
      return;
    }
    const items = gsap.utils.toArray<HTMLElement>(
      ".wrk-carousel-shell, .wrk-blueprint-row",
      gallery,
    );
    if (items.length) {
      gsap.killTweensOf(items);
      gsap.fromTo(
        items,
        { y: 24, clipPath: "inset(0 0 12% 0)", opacity: 0 },
        {
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.5,
          stagger: { amount: 0.28, from: "start" },
          ease: "power3.out",
          clearProps: "clipPath,transform,opacity",
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        },
      );
    }
  }, [category, viewMode, searchQuery]);

  return (
    <div ref={rootRef} className="wrk-root wrk-v2">
      {/* 1. SPLIT ASYMMETRIC HERO + INTERACTIVE ORBITAL STAGE */}
      <section className="wrk-hero">
        <InteractiveHeroCanvas />
        <div className="wrk-bg-grid" />
        <div className="wrk-glow-1" />
        <div className="wrk-glow-2" />

        <div className="wrap wrk-hero-split">
          <div className="wrk-hero-copy">
            <div className="wrk-hero-badge">
              <span className="wrk-pulse-ring" />
              <Radio size={14} className="wrk-radio-icon" />
              <span>PRODUCTION ARCHIVE • 9 FLAGSHIP SYSTEMS</span>
            </div>

            <h1 className="wrk-hero-title">
              Architected for scale.
              <br />
              Shipped with <em>uncompromising craft.</em>
            </h1>

            <p className="wrk-hero-subtitle">
              Autonomous AI engines, institutional treasuries, edge commerce storefronts, and
              hardware-secured mobile suites engineered for global production velocity.
            </p>

            <div className="wrk-hero-actions">
              <a href="/contact?service=Web%20development" className="wrk-btn-glow">
                <span>Initiate Technical Brief</span>
                <ArrowRight size={16} />
              </a>
              <button
                type="button"
                className="wrk-btn-glass"
                onClick={() =>
                  galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                <span>Explore Live Matrix</span>
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="wrk-hero-telemetry-row">
              <div className="wrk-telemetry-card">
                <span className="wrk-tele-num" data-count-to="9">
                  {PRODUCTION_PROJECTS.length}
                </span>
                <span className="wrk-tele-title">Production Systems</span>
                <span className="wrk-tele-sub">Web, Mobile &amp; AI</span>
              </div>
              <div className="wrk-telemetry-card">
                <span
                  className="wrk-tele-num"
                  data-count-to="99.98"
                  data-count-decimals="2"
                  data-count-suffix="%"
                >
                  99.98%
                </span>
                <span className="wrk-tele-title">SLA Reliability</span>
                <span className="wrk-tele-sub">Multi-region uptime</span>
              </div>
              <div className="wrk-telemetry-card">
                <span
                  className="wrk-tele-num"
                  data-count-to="190"
                  data-count-prefix="< "
                  data-count-suffix="ms"
                >
                  &lt; 190ms
                </span>
                <span className="wrk-tele-title">Edge Latency</span>
                <span className="wrk-tele-sub">Workers P95 TTFB</span>
              </div>
              <div className="wrk-telemetry-card">
                <span className="wrk-tele-num" data-count-to="100" data-count-suffix="%">
                  100%
                </span>
                <span className="wrk-tele-title">IP Ownership</span>
                <span className="wrk-tele-sub">Full repo handover</span>
              </div>
            </div>
          </div>

          {/* Right: 3D Interactive Orbital Flagship Deck */}
          <div
            ref={stageDeckRef}
            className="wrk-stage-deck"
            onMouseEnter={() => {
              stageHoverRef.current = true;
            }}
            onMouseLeave={() => {
              stageHoverRef.current = false;
            }}
          >
            <div className="wrk-stage-orbit" aria-hidden="true" />
            <div className="wrk-stage-frame">
              <div className="wrk-stage-header">
                <span className="wrk-stage-idx wrk-stage-swap">
                  {activeDeckProject.index} // {activeDeckProject.categoryLabel}
                </span>
                <span className="wrk-stage-live">
                  <span className="wrk-live-dot" />
                  <span>Active Telemetry</span>
                </span>
              </div>

              <button
                type="button"
                className="wrk-stage-media-btn"
                onClick={() => setSelectedProject(activeDeckProject)}
                aria-label={`Inspect ${activeDeckProject.name} blueprint`}
              >
                <img
                  src={activeDeckProject.image}
                  alt={`${activeDeckProject.name} live system preview`}
                  className="wrk-stage-swap"
                />
                <div className="wrk-stage-scanbeam" aria-hidden="true" />
                <div className="wrk-stage-float-tl wrk-stage-swap">
                  <Zap size={12} />
                  <span>{activeDeckProject.metric}</span>
                </div>
                <div className="wrk-stage-float-br wrk-stage-swap">
                  <span>{activeDeckProject.velocity}</span>
                  <ArrowUpRight size={13} />
                </div>
              </button>

              <div className="wrk-stage-footer">
                <div className="wrk-stage-meta wrk-stage-swap">
                  <strong>{activeDeckProject.name}</strong>
                  <span>{activeDeckProject.liveBadge}</span>
                </div>
                <div className="wrk-stage-dots" role="tablist" aria-label="Featured flagship switcher">
                  {heroDeckItems.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === heroDeckIdx}
                      className={`wrk-stage-dot ${idx === heroDeckIdx ? "active" : ""}`}
                      onClick={() => setHeroDeckIdx(idx)}
                      aria-label={`Preview ${item.name}`}
                    >
                      {item.index}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KINETIC STACK MARQUEE TICKER */}
      <div className="wrk-marquee-band" aria-hidden="true">
        <div className="wrk-marquee-track">
          {[...STACK_MARQUEE_ITEMS, ...STACK_MARQUEE_ITEMS].map((item, idx) => (
            <span key={`${item}-${idx}`} className="wrk-marquee-item">
              <span className="wrk-marquee-sep" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 3. END-TO-END INTERACTIVE DELIVERY CONDUIT */}
      <section className="wrap wrk-flow-band" aria-label="Engineering delivery flow">
        <div className="wrk-flow-head-bar">
          <div>
            <span className="wrk-eyebrow">END-TO-END FLOW</span>
            <h2>How Every Flagship Platform Ships</h2>
          </div>
          <span className="wrk-flow-active-pill">
            STAGE {FLOW_STEPS[activePhase].step} · {FLOW_STEPS[activePhase].phase}
          </span>
        </div>

        <div className="wrk-flow-stage">
          <div className="wrk-flow-line" aria-hidden="true">
            <span className="wrk-flow-line-fill" />
          </div>
          <div className="wrk-flow-grid">
            {FLOW_STEPS.map((f, idx) => (
              <div
                key={f.step}
                className={`wrk-flow-card ${activePhase === idx ? "is-active" : ""}`}
                onMouseEnter={() => setActivePhase(idx)}
                onClick={() => setActivePhase(idx)}
              >
                <div className="wrk-flow-card-top">
                  <span className="wrk-flow-num">{f.step}</span>
                  <span className="wrk-flow-phase">{f.phase}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMMAND FILTER DOCK */}
      <section className="wrap wrk-toolbar-section">
        <div className="wrk-toolbar">
          <div
            className="wrk-category-pills"
            role="tablist"
            aria-label="Filter case studies by engineering domain"
          >
            {categories.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`wrk-cat-pill ${active ? "active" : ""}`}
                  onClick={(e) => {
                    filterChangedRef.current = true;
                    setCategory(cat.id);
                    e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
                  }}
                >
                  <span>{cat.name}</span>
                  <span className="wrk-cat-count" aria-hidden="true">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="wrk-toolbar-right">
            <div className="wrk-search-box">
              <Search size={15} className="wrk-search-icon" aria-hidden="true" />
              <input
                id={searchInputId}
                type="text"
                placeholder="Search by project or stack..."
                value={searchQuery}
                onChange={(e) => {
                  filterChangedRef.current = true;
                  setSearchQuery(e.target.value);
                }}
                className="wrk-search-input"
                aria-label="Filter production projects"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="wrk-search-clear"
                  onClick={() => {
                    filterChangedRef.current = true;
                    setSearchQuery("");
                  }}
                  aria-label="Clear filter"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="wrk-view-switcher">
              <button
                type="button"
                className={`wrk-view-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => {
                  filterChangedRef.current = true;
                  setViewMode("cards");
                }}
                aria-label="Bento Grid view"
                title="Architectural Bento Grid"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                className={`wrk-view-btn ${viewMode === "blueprint" ? "active" : ""}`}
                onClick={() => {
                  filterChangedRef.current = true;
                  setViewMode("blueprint");
                }}
                aria-label="Blueprint view"
                title="Engineering Blueprint Specs"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ASYMMETRIC BENTO SHOWCASE & BLUEPRINT MATRIX */}
      <section ref={galleryRef} className="wrap wrk-gallery-section">
        {filteredProjects.length === 0 ? (
          <div className="wrk-empty-state">
            <Filter size={36} />
            <h3>No projects match “{searchQuery}”</h3>
            <p>Try clearing your search term or select another domain tab.</p>
            <button
              type="button"
              className="wrk-btn-glass"
              onClick={() => {
                filterChangedRef.current = true;
                setCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "cards" && activeCarouselProject ? (
          <div className="wrk-carousel-shell">
            <div className="wrk-carousel-topbar">
              <span className="wrk-carousel-hint">
                <span className="wrk-pulse-ring" aria-hidden="true" />
                INTERACTIVE WEBGL LENS · DRAG, WHEEL OR CLICK CARD TO ZOOM
              </span>

              <div className="wrk-carousel-controls">
                <div
                  className="wrk-preset-pills"
                  role="radiogroup"
                  aria-label="Lens optical preset"
                >
                  {(["liquid", "ribbon", "vortex", "arch"] as FlexCarouselPreset[]).map(
                    (presetName) => (
                      <button
                        key={presetName}
                        type="button"
                        role="radio"
                        aria-checked={lensPreset === presetName}
                        className={`wrk-preset-btn ${lensPreset === presetName ? "active" : ""}`}
                        onClick={() => setLensPreset(presetName)}
                      >
                        {presetName}
                      </button>
                    ),
                  )}
                </div>

                <div className="wrk-carousel-nav-group">
                  <button
                    type="button"
                    className="wrk-carousel-nav-btn"
                    aria-label="Previous showcase project"
                    onClick={() => carouselCtrlRef.current?.step(-1)}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="wrk-carousel-nav-btn"
                    aria-label="Next showcase project"
                    onClick={() => carouselCtrlRef.current?.step(1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="wrk-carousel-viewport">
              <FlexCarousel
                items={carouselItems}
                preset={lensPreset}
                intro="bloom"
                cardHeight={0.54}
                gap={16}
                radius={14}
                fit="landscape"
                squeeze={0.2}
                liquid={0.35}
                followCursor
                focusOnClick
                captions
                captureWheel
                controlRef={carouselCtrlRef}
                onChange={(idx) => setCarouselIdx(idx)}
              />
            </div>

            <div className="wrk-carousel-dock">
              <div className="wrk-carousel-dock-meta">
                <div className="wrk-carousel-dock-kicker">
                  <span>
                    {activeCarouselProject.index} // {activeCarouselProject.categoryLabel}
                  </span>
                  <span className="wrk-card-metric-pill">
                    <Zap size={11} style={{ color: "var(--accent)" }} />
                    {activeCarouselProject.metric}
                  </span>
                </div>
                <h3 className="wrk-carousel-dock-title">{activeCarouselProject.name}</h3>
                <p className="wrk-carousel-dock-desc">{activeCarouselProject.detail}</p>
                <div className="wrk-featured-pipeline">
                  {activeCarouselProject.flowStages.map((st, idx) => (
                    <span key={st} className="wrk-featured-step">
                      <em>0{idx + 1}</em> {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="wrk-carousel-dock-right">
                <div className="wrk-carousel-dots-row" aria-label="Select flagship project">
                  {filteredProjects.map((proj, idx) => (
                    <button
                      key={proj.id}
                      type="button"
                      className={`wrk-carousel-idx-pill ${proj.id === activeCarouselProject.id ? "active" : ""}`}
                      onClick={() => carouselCtrlRef.current?.goTo(idx)}
                      aria-label={`Jump to ${proj.name}`}
                    >
                      {proj.index}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="wrk-btn-glow wrk-carousel-inspect"
                  onClick={() => setSelectedProject(activeCarouselProject)}
                >
                  <span>Inspect Full Case Study</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="wrk-blueprint-list">
            {filteredProjects.map((proj) => (
              <article key={proj.id} className="wrk-blueprint-row">
                <div className="wrk-bp-thumb">
                  <img src={proj.image} alt={`${proj.name} thumbnail`} loading="lazy" />
                  <span className="wrk-bp-idx">{proj.index}</span>
                </div>

                <div className="wrk-bp-left">
                  <div className="wrk-bp-meta">
                    <span className="wrk-bp-category">
                      {proj.categoryLabel} · {proj.velocity}
                    </span>
                    <span className="wrk-bp-live-badge">{proj.liveBadge}</span>
                  </div>
                  <h3 className="wrk-bp-title">{proj.name}</h3>
                  <p className="wrk-bp-desc">{proj.description}</p>
                  <div className="wrk-bp-tags">
                    {proj.flowStages.map((st, sIdx) => (
                      <span key={st} className="wrk-bp-stage-pill">
                        <em>0{sIdx + 1}</em> {st}
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

      {/* 6. PERFORMANCE BENCHMARKS */}
      <section className="wrap wrk-benchmarks-section">
        <div className="wrk-section-heading">
          <span className="wrk-eyebrow">ENGINEERING BENCHMARKS</span>
          <h2>Guaranteed Architectural Standards</h2>
          <p>
            Every system shipped from our studio passes deterministic latency, accessibility, and
            reliability gates.
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

      {/* 7. VERIFIED PARTNER FEEDBACK */}
      <section className="wrap wrk-testimonials-section">
        <div className="wrk-section-heading">
          <span className="wrk-eyebrow">VERIFIED PARTNER FEEDBACK</span>
          <h2>Systems That Founders &amp; Leaders Trust</h2>
          <p>
            Real production metrics, faster clearing cycles, and measurable engineering leverage.
          </p>
        </div>

        <div className="wrk-testimonials-grid">
          <div className="wrk-testimonial-card">
            <div className="wrk-testi-stars">★★★★★</div>
            <p className="wrk-testi-quote">
              “PulseMesh compressed our corridor rerouting response down to 34 milliseconds while
              keeping deterministic compliance replay logs across every logistics hub.”
            </p>
            <div className="wrk-testi-pill">
              <Zap size={13} />
              <span>+37% Corridor Throughput</span>
            </div>
            <div className="wrk-testi-author">
              <div className="wrk-testi-avatar">HL</div>
              <div>
                <strong>Henrik Lindqvist</strong>
                <span>VP Platform Engineering · Meridian Logistics</span>
              </div>
            </div>
          </div>

          <div className="wrk-testimonial-card">
            <div className="wrk-testi-stars">★★★★★</div>
            <p className="wrk-testi-quote">
              “MediSync gave our ICU nursing shifts real-time BLE vitals clarity and zero-knowledge
              voice handoffs—cutting manual charting overhead by 52 minutes every shift.”
            </p>
            <div className="wrk-testi-pill">
              <ShieldCheck size={13} />
              <span>99.99% Clinical Uptime</span>
            </div>
            <div className="wrk-testi-author">
              <div className="wrk-testi-avatar">KR</div>
              <div>
                <strong>Dr. Kavita Rao</strong>
                <span>Chief Medical Informatics Officer · Helios Health</span>
              </div>
            </div>
          </div>

          <div className="wrk-testimonial-card">
            <div className="wrk-testi-stars">★★★★★</div>
            <p className="wrk-testi-quote">
              “Switching to Lumina’s edge-rendered Next.js storefront dropped global TTFB to 190ms and
              drove a 2.4x conversion surge during high-traffic product drops.”
            </p>
            <div className="wrk-testi-pill">
              <Flame size={13} />
              <span>2.4× Checkout Conversion</span>
            </div>
            <div className="wrk-testi-author">
              <div className="wrk-testi-avatar">MT</div>
              <div>
                <strong>Marcus Thorne</strong>
                <span>Director of Commerce · Lumina Nordic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA CONSOLE */}
      <section className="wrap wrk-cta-section">
        <div className="wrk-cta-card">
          <div className="wrk-cta-glow" />
          <div className="wrk-cta-content">
            <span className="wrk-eyebrow">HAVE A SYSTEM TO ARCHITECT?</span>
            <h2>Let’s build your next flagship product.</h2>
            <p>
              Whether you need an autonomous AI pipeline, institutional treasury console, or
              hardware-secured mobile product, our senior pods ship production code in 4 to 8 weeks.
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

      {/* 9. NATIVE <dialog> DEEP-DIVE CASE STUDY MODAL */}
      <dialog
        ref={dialogRef}
        className="wrk-modal-dialog"
        aria-labelledby={modalTitleId}
        {...({ closedby: "any" } as Record<string, string>)}
      >
        {selectedProject && (
          <>
            <button
              type="button"
              className="wrk-modal-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="wrk-modal-bar">
              <div>
                <span className="wrk-modal-category">
                  {selectedProject.index} · {selectedProject.categoryLabel} ·{" "}
                  {selectedProject.velocity}
                </span>
                <h1 id={modalTitleId} className="wrk-modal-title">
                  {selectedProject.name}
                </h1>
              </div>
              <span className="wrk-modal-metric-pill">
                <Zap size={13} /> {selectedProject.metric}
              </span>
            </div>

            <div className="wrk-modal-media">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.name} system showcase`}
                ref={(el) => {
                  el?.setAttribute("fetchpriority", "low");
                }}
              />
              <div className="wrk-modal-overlay-badge">
                <span className="wrk-modal-dot" />
                <span>{selectedProject.liveBadge}</span>
              </div>
            </div>

            <div className="wrk-modal-stats-bar">
              {selectedProject.stats.map((s) => (
                <div key={s.label} className="wrk-modal-stat-box">
                  <span className="wrk-modal-stat-lbl">{s.label}</span>
                  <strong className="wrk-modal-stat-val">{s.val}</strong>
                </div>
              ))}
            </div>

            <div className="wrk-modal-body">
              <div className="wrk-modal-flow-row" aria-label="Build pipeline stages">
                {selectedProject.flowStages.map((stage, i) => (
                  <span key={stage} className="wrk-modal-flow-chip">
                    <em>0{i + 1}</em> {stage}
                  </span>
                ))}
              </div>

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

              <div className="wrk-modal-footer">
                <a
                  href={`/contact?service=${encodeURIComponent(
                    selectedProject.category === "mobile"
                      ? "App development"
                      : selectedProject.category === "ai"
                        ? "AI Solutions"
                        : "Web development",
                  )}&brief=${encodeURIComponent(
                    `Inquiry regarding architecture similar to ${selectedProject.name}.`,
                  )}`}
                  className="wrk-btn-glow"
                >
                  <span>Discuss a Similar Architecture</span>
                  <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  className="wrk-btn-glass"
                  autoFocus
                  onClick={() => dialogRef.current?.close()}
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

function ProjectCardBento({
  project,
  featured,
  onSelect,
}: {
  project: ProjectItem;
  featured?: boolean;
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
    setTilt({ x: -cy * (featured ? 2.5 : 4.2), y: cx * (featured ? 2.5 : 4.2) });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      className={`wrk-card-interactive ${featured ? "is-featured" : ""}`}
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
            ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)`
            : "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)",
        }}
      >
        <div className="wrk-card-spotlight" />

        <div className={`wrk-card-media-stage wrk-stage-${project.color}`}>
          <div className="wrk-card-hud-top">
            <span className="wrk-card-hud-idx">
              {project.index} // {project.velocity.toUpperCase()}
            </span>
            <span className="wrk-card-live">
              <span className="wrk-live-dot" />
              <span>{featured ? project.liveBadge : "Live System"}</span>
            </span>
          </div>

          <div className="wrk-card-img-wrap">
            <img
              src={project.image}
              alt={`${project.name} interface`}
              loading={featured ? "eager" : "lazy"}
            />
          </div>

          <div className="wrk-card-corners" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="wrk-card-hover-overlay">
            <Layers size={13} />
            <span>Inspect Architecture</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

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

          <p className="wrk-card-desc">
            {featured ? project.detail : project.description}
          </p>

          {featured && (
            <div className="wrk-featured-pipeline">
              {project.flowStages.map((st, idx) => (
                <span key={st} className="wrk-featured-step">
                  <em>0{idx + 1}</em> {st}
                </span>
              ))}
            </div>
          )}

          {featured && (
            <div className="wrk-featured-stats">
              {project.stats.map((st) => (
                <div key={st.label} className="wrk-featured-stat">
                  <span>{st.label}</span>
                  <strong>{st.val}</strong>
                </div>
              ))}
            </div>
          )}

          <div className="wrk-card-tags">
            {project.tags.slice(0, featured ? 4 : 3).map((t) => (
              <span key={t} className="wrk-card-tag-pill">
                {t}
              </span>
            ))}
            {project.tags.length > (featured ? 4 : 3) && (
              <span className="wrk-card-tag-more">
                +{project.tags.length - (featured ? 4 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
