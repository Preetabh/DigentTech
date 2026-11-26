import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Compass,
  Cpu,
  Database,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface HeroDossier {
  id: string;
  name: string;
  type: string;
  sub: string;
  image: string;
  domain: string;
  query: string;
  synthesis: string;
  metrics: { label: string; value: string; delta: string }[];
  steps: { code: string; label: string; detail: string }[];
  citations: string[];
  telemetry: {
    ttfb: string;
    uptime: string;
    throughput: string;
    security: string;
    points: number[];
    labels: string[];
  };
}

const HERO_DOSSIERS: HeroDossier[] = [
  {
    id: "infrapilot",
    name: "InfraPilot",
    type: "ERP / CRM PLATFORM",
    sub: "Multi-site infrastructure operations, budgets, and machinery telemetry unified in real time.",
    image: "/assets/projects/infrapilot-crm-portal.png",
    domain: "infrapilot.io / executive-console",
    query: "Synthesize architecture, site logistics telemetry & ROI for InfraPilot ERP",
    synthesis:
      "Unified 12 disconnected civil-infrastructure workflows into a single event-driven React 19 & PostgreSQL control plane, cutting equipment idle latency by 45% with zero-downtime offline sync.",
    metrics: [
      { label: "Logistics Lift", value: "+45%", delta: "Verified across 12 sites" },
      { label: "SLA Uptime", value: "99.98%", delta: "Multi-region failover" },
      { label: "Edge Query", value: "14ms", delta: "Indexed PG + Redis" },
    ],
    steps: [
      { code: "01", label: "Field Audit", detail: "12 active sites mapped" },
      { code: "02", label: "Data Mesh", detail: "Offline-resilient sync" },
      { code: "03", label: "Benchmark", detail: "45% faster dispatch" },
      { code: "04", label: "Verified", detail: "Production SLA live" },
    ],
    citations: ["Next.js 15 RSC", "PostgreSQL", "Cloudflare Edge", "RBAC Vault"],
    telemetry: {
      ttfb: "142ms",
      uptime: "99.98%",
      throughput: "48k req/m",
      security: "SOC2 · E2EE",
      points: [34, 42, 39, 58, 66, 74, 83, 91],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "Live"],
    },
  },
  {
    id: "hrmitra",
    name: "HrMitra",
    type: "WORKFORCE INTELLIGENCE",
    sub: "Enterprise biometric attendance, multi-tier approvals, and instant payroll orchestration.",
    image: "/assets/projects/hrmitra-hrm-portal.png",
    domain: "hrmitra.app / payroll-core",
    query: "Evaluate HrMitra 25,000-seat biometric sync & Redis batch payroll speed",
    synthesis:
      "Replaced 48-hour manual payroll reconciliation with an in-memory Redis batch compute pipeline and TypeScript contract boundary, settling 25,000+ daily employee shifts in under 90 seconds.",
    metrics: [
      { label: "Daily Seats", value: "25,000+", delta: "Biometric real-time sync" },
      { label: "Batch Run", value: "< 90s", delta: "92% overhead saved" },
      { label: "Reliability", value: "99.98%", delta: "Zero missed runs" },
    ],
    steps: [
      { code: "01", label: "Shift Mapping", detail: "25k+ biometric nodes" },
      { code: "02", label: "Queue Core", detail: "Redis worker topology" },
      { code: "03", label: "Compliance", detail: "Automated ledger audit" },
      { code: "04", label: "Verified", detail: "90s full payroll run" },
    ],
    citations: ["React 19", "TypeScript", "Redis Streams", "Node.js"],
    telemetry: {
      ttfb: "118ms",
      uptime: "99.99%",
      throughput: "82k req/m",
      security: "ISO 27001 Ready",
      points: [28, 35, 51, 62, 69, 78, 88, 95],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "Live"],
    },
  },
  {
    id: "novacommerce",
    name: "NovaCommerce",
    type: "HEADLESS RETAIL ENGINE",
    sub: "Sub-second headless storefront engineered for high-throughput global retail drops.",
    image: "/assets/projects/novacommerce-web-portal.png",
    domain: "novacommerce.co / edge-store",
    query: "Analyze NovaCommerce edge rendering latency & mobile checkout conversion lift",
    synthesis:
      "Decoupled legacy monolithic storefront onto Cloudflare Workers and Next.js 15 edge streaming, compressing global Time-to-First-Byte from 2.4s to 0.28s and driving a +64% mobile conversion lift.",
    metrics: [
      { label: "Global TTFB", value: "0.28s", delta: "Down from 2.4s legacy" },
      { label: "Mobile CVR", value: "+64%", delta: "Verified 60-day lift" },
      { label: "Peak Load", value: "15k/s", delta: "Zero drop congestion" },
    ],
    steps: [
      { code: "01", label: "Perf Audit", detail: "Core Web Vitals trace" },
      { code: "02", label: "Edge SSR", detail: "Cloudflare Worker rails" },
      { code: "03", label: "Checkout", detail: "Multi-currency Stripe" },
      { code: "04", label: "Verified", detail: "+64% CVR benchmark" },
    ],
    citations: ["Edge Workers", "GraphQL", "Stripe Rails", "Next.js 15"],
    telemetry: {
      ttfb: "280ms",
      uptime: "99.99%",
      throughput: "15k req/s",
      security: "PCI-DSS Level 1",
      points: [30, 44, 53, 61, 72, 81, 89, 96],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "Live"],
    },
  },
  {
    id: "aurapay",
    name: "AuraPay Vault",
    type: "FINTECH MOBILE ECOSYSTEM",
    sub: "Cross-border mobile banking with hardware biometric signing and instant multi-currency rails.",
    image: "/assets/projects/aurapay-mobile-app.png",
    domain: "aurapay.finance / biometric-vault",
    query: "Audit AuraPay hardware Secure Enclave signing & 40-currency settlement engine",
    synthesis:
      "Engineered a tactile 60fps React Native fintech suite anchored to iOS Secure Enclave & Android Keystore hardware attestation, scaling past 100,000 active cards at a 4.9★ Store rating.",
    metrics: [
      { label: "Issued Cards", value: "100k+", delta: "40 active currencies" },
      { label: "App Rating", value: "4.9★", delta: "12k+ verified reviews" },
      { label: "Fraud Rate", value: "0.00%", delta: "Hardware attestation" },
    ],
    steps: [
      { code: "01", label: "Threat Model", detail: "Zero-trust enclave spec" },
      { code: "02", label: "Native Bridge", detail: "60fps tactile gestures" },
      { code: "03", label: "FX Settlement", detail: "Sub-second ledger lock" },
      { code: "04", label: "Verified", detail: "100k+ cards live" },
    ],
    citations: ["React Native", "Biometric SDK", "Go Ledger", "Zero-Fraud"],
    telemetry: {
      ttfb: "94ms",
      uptime: "99.99%",
      throughput: "64k tx/hr",
      security: "Hardware Enclave",
      points: [40, 48, 57, 65, 76, 84, 92, 98],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "Live"],
    },
  },
];

function LuxuryTelemetryChart({
  points,
  labels,
}: {
  points: number[];
  labels: string[];
}) {
  const width = 420;
  const height = 112;
  const padX = 12;
  const padY = 14;
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;

  const coords = points.map((val, idx) => {
    const x = padX + (idx / (points.length - 1)) * usableW;
    const y = padY + (1 - val / 100) * usableH;
    return { x, y, val };
  });

  const linePath = coords.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    const prev = coords[i - 1];
    const cx = ((prev.x + pt.x) / 2).toFixed(1);
    return `${acc} C ${cx} ${prev.y.toFixed(1)}, ${cx} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, "");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${height - 6} L ${coords[0].x.toFixed(1)} ${height - 6} Z`;
  const last = coords[coords.length - 1];

  return (
    <div className="lux-chart-shell">
      <div className="lux-chart-meta">
        <span>SYNTHESIS PERFORMANCE &amp; THROUGHPUT CURVE</span>
        <span className="lux-chart-live">
          <i /> P99 OPTIMAL
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="lux-chart-svg"
        role="img"
        aria-label="System performance and throughput trend"
      >
        <defs>
          <linearGradient id="luxAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--lux-gold)" stopOpacity="0.34" />
            <stop offset="65%" stopColor="var(--accent)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="luxStrokeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="55%" stopColor="var(--lux-gold)" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {[24, 54, 84].map((yLine) => (
          <line
            key={yLine}
            x1={padX}
            y1={yLine}
            x2={width - padX}
            y2={yLine}
            stroke="var(--line)"
            strokeDasharray="3 4"
            strokeWidth="1"
            opacity="0.65"
          />
        ))}
        <path d={areaPath} fill="url(#luxAreaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="url(#luxStrokeGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {coords.map((c, idx) => (
          <circle
            key={idx}
            cx={c.x}
            cy={c.y}
            r={idx === coords.length - 1 ? 4.5 : 2.2}
            fill={idx === coords.length - 1 ? "var(--lux-gold)" : "var(--bg)"}
            stroke={idx === coords.length - 1 ? "#ffffff" : "var(--accent)"}
            strokeWidth={idx === coords.length - 1 ? "1.6" : "1.4"}
          />
        ))}
        <circle
          cx={last.x}
          cy={last.y}
          r="9"
          fill="var(--lux-gold)"
          opacity="0.22"
        />
      </svg>
      <div className="lux-chart-axis">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export function DeepResearchHeroConsole({
  onInspectDossier,
}: {
  onInspectDossier?: (dossierId: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"synthesis" | "interface" | "telemetry">("synthesis");
  const [pulseStep, setPulseStep] = useState<number>(3);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const item = HERO_DOSSIERS[activeIndex];

  const triggerSynthesisPulse = () => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPulseStep(3);
      setIsSynthesizing(false);
      return;
    }
    setIsSynthesizing(true);
    setPulseStep(0);
  };

  useEffect(() => {
    if (!isSynthesizing) return;
    if (pulseStep >= 3) {
      const doneTimer = window.setTimeout(() => setIsSynthesizing(false), 220);
      return () => window.clearTimeout(doneTimer);
    }
    const timer = window.setTimeout(() => {
      setPulseStep((s) => Math.min(3, s + 1));
    }, 155);
    return () => window.clearTimeout(timer);
  }, [isSynthesizing, pulseStep]);

  const handleSelectDossier = (idx: number) => {
    setActiveIndex(idx);
    triggerSynthesisPulse();
  };

  return (
    <div className="lux-console-wrapper">
      <div className="lux-console-frame">
        {/* Console Window Chrome */}
        <div className="lux-console-chrome">
          <div className="lux-chrome-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="lux-chrome-address">
            <Compass size={12} />
            <span>{item.domain}</span>
          </div>
          <div className="lux-chrome-status">
            <span className={`lux-status-orb ${isSynthesizing ? "pulsing" : ""}`} />
            <span>{isSynthesizing ? "SYNTHESIZING" : "VERIFIED LIVE"}</span>
          </div>
        </div>

        {/* Deep Research Prompt Bar */}
        <div className="lux-prompt-strip">
          <div className="lux-prompt-query">
            <span className="lux-prompt-badge">
              <Sparkles size={11} />
              RESEARCH PROMPT
            </span>
            <p title={item.query}>{item.query}</p>
          </div>
          <button
            type="button"
            className="lux-resynth-btn"
            onClick={triggerSynthesisPulse}
            title="Replay synthesis pipeline"
            aria-label="Replay synthesis pipeline"
          >
            <RefreshCw size={12} className={isSynthesizing ? "spin" : ""} />
          </button>
        </div>

        {/* Console Mode Tabs */}
        <div className="lux-mode-bar" role="tablist" aria-label="Console view mode">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "synthesis"}
            className={`lux-mode-btn ${viewMode === "synthesis" ? "active" : ""}`}
            onClick={() => setViewMode("synthesis")}
          >
            <Sparkles size={13} />
            <span>Research Brief</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "interface"}
            className={`lux-mode-btn ${viewMode === "interface" ? "active" : ""}`}
            onClick={() => setViewMode("interface")}
          >
            <Layers size={13} />
            <span>Live Interface</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "telemetry"}
            className={`lux-mode-btn ${viewMode === "telemetry" ? "active" : ""}`}
            onClick={() => setViewMode("telemetry")}
          >
            <TrendingUp size={13} />
            <span>Telemetry</span>
          </button>
        </div>

        {/* Console Main Body */}
        <div className="lux-console-body">
          {viewMode === "synthesis" && (
            <div className="lux-synthesis-view" key={item.id}>
              {/* 4-Phase Deep Research Reasoning Trail */}
              <div className="lux-reasoning-track">
                {item.steps.map((st, idx) => {
                  const completed = idx <= pulseStep;
                  const current = isSynthesizing && idx === pulseStep;
                  return (
                    <div
                      key={st.code}
                      className={`lux-reasoning-node ${completed ? "done" : ""} ${current ? "active" : ""}`}
                    >
                      <div className="lux-node-head">
                        <span className="lux-node-code">{st.code}</span>
                        <span className="lux-node-check">
                          <Check size={10} />
                        </span>
                      </div>
                      <strong>{st.label}</strong>
                      <span>{st.detail}</span>
                    </div>
                  );
                })}
              </div>

              {/* Synthesized Executive Summary */}
              <div className="lux-synthesis-card">
                <div className="lux-synthesis-top">
                  <span className="lux-synthesis-tag">
                    {item.type} · SYNTHESIS SUMMARY
                  </span>
                  <span className="lux-confidence-chip">99.6% Grounded</span>
                </div>
                <p className="lux-synthesis-text">{item.synthesis}</p>
                <div className="lux-citation-row">
                  <span className="lux-cite-label">VERIFIED STACK:</span>
                  {item.citations.map((cite, idx) => (
                    <span key={cite} className="lux-cite-pill">
                      <em>[{idx + 1}]</em> {cite}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Executive KPI Cards */}
              <div className="lux-kpi-trio">
                {item.metrics.map((m) => (
                  <div key={m.label} className="lux-kpi-card">
                    <span className="lux-kpi-label">{m.label}</span>
                    <strong className="lux-kpi-value">{m.value}</strong>
                    <span className="lux-kpi-delta">{m.delta}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === "interface" && (
            <div className="lux-interface-view" key={item.id}>
              <div className="lux-viewport-frame">
                <img
                  src={item.image}
                  alt={item.name + " dashboard preview"}
                />
              </div>
              <div className="lux-interface-caption">
                <div>
                  <span className="lux-synthesis-tag">{item.type}</span>
                  <h4>{item.name}</h4>
                  <p>{item.sub}</p>
                </div>
                <button
                  type="button"
                  className="lux-inspect-circle"
                  onClick={() => onInspectDossier?.(item.id)}
                  aria-label={`Inspect ${item.name} dossier`}
                  title={`Inspect ${item.name} dossier`}
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          )}

          {viewMode === "telemetry" && (
            <div className="lux-telemetry-view" key={item.id}>
              <LuxuryTelemetryChart
                points={item.telemetry.points}
                labels={item.telemetry.labels}
              />
              <div className="lux-telemetry-grid">
                <div className="lux-tel-tile">
                  <span>
                    <Zap size={12} /> Global TTFB
                  </span>
                  <strong>{item.telemetry.ttfb}</strong>
                </div>
                <div className="lux-tel-tile">
                  <span>
                    <ShieldCheck size={12} /> Production SLA
                  </span>
                  <strong>{item.telemetry.uptime}</strong>
                </div>
                <div className="lux-tel-tile">
                  <span>
                    <Database size={12} /> Throughput
                  </span>
                  <strong>{item.telemetry.throughput}</strong>
                </div>
                <div className="lux-tel-tile">
                  <span>
                    <Lock size={12} /> Compliance
                  </span>
                  <strong>{item.telemetry.security}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Dossier Switcher Footer */}
        <div className="lux-console-footer">
          <div
            className="lux-dossier-tabs"
            role="tablist"
            aria-label="Featured project"
          >
            {HERO_DOSSIERS.map((d, i) => (
              <button
                key={d.id}
                id={"project-tab-" + i}
                role="tab"
                type="button"
                aria-selected={activeIndex === i}
                aria-controls="featured-project"
                tabIndex={activeIndex === i ? 0 : -1}
                onClick={() => handleSelectDossier(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next =
                      e.key === "ArrowRight"
                        ? (activeIndex + 1) % HERO_DOSSIERS.length
                        : (activeIndex - 1 + HERO_DOSSIERS.length) %
                          HERO_DOSSIERS.length;
                    handleSelectDossier(next);
                    document.getElementById("project-tab-" + next)?.focus();
                  }
                }}
              >
                <span className="lux-tab-idx">0{i + 1}</span>
                <span>{d.name}</span>
              </button>
            ))}
          </div>

          <a className="lux-footer-dossier-link" href="/work">
            <span>Full Archive</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div
        id="featured-project"
        role="tabpanel"
        aria-labelledby={"project-tab-" + activeIndex}
        className="sr-only"
      >
        {item.name}: {item.sub}
      </div>
    </div>
  );
}

interface SynthesisBlueprint {
  reportCode: string;
  headline: string;
  thesis: string;
  timeline: string;
  latencyTarget: string;
  squad: string;
  milestones: string;
  digentDays: number;
  agencyDays: number;
  sources: string[];
  deliverables: string[];
}

export function DeepResearchWorkbench() {
  const [domain, setDomain] = useState<string>("web");
  const [scale, setScale] = useState<string>("core");
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const domainOptions = [
    { id: "web", label: "Web Platform & SaaS", serviceName: "Web development" },
    { id: "mobile", label: "Mobile App (iOS / Android)", serviceName: "App development" },
    { id: "ai", label: "AI Agents & Vector RAG", serviceName: "AI & automation" },
    { id: "modern", label: "Full Digital Modernization", serviceName: "Complete Modernization" },
  ];

  const scaleOptions = [
    { id: "mvp", label: "MVP Sprint (2–4 Wks)" },
    { id: "core", label: "Core Production (6–8 Wks)" },
    { id: "enterprise", label: "Enterprise Scale (10–14 Wks)" },
  ];

  const chapters = [
    { id: 0, num: "I", title: "Executive Thesis" },
    { id: 1, num: "II", title: "Core Deliverables" },
    { id: 2, num: "III", title: "Squad & Cadence" },
    { id: 3, num: "IV", title: "Velocity Benchmark" },
  ];

  const getBlueprint = (): SynthesisBlueprint => {
    const domainTitles: Record<string, { headline: string; thesis: string; sources: string[] }> = {
      web: {
        headline: "Sub-Second Edge SaaS & Enterprise Web Architecture",
        thesis:
          "Research confirms edge-rendered React 19 + TypeScript contracts paired with Cloudflare Workers eliminates cold-start friction, holding global TTFB under 280ms while boosting qualified conversion.",
        sources: ["Next.js 15 RSC", "PostgreSQL ACID", "Cloudflare Edge", "Strict Zod Contracts"],
      },
      mobile: {
        headline: "60fps Tactile Cross-Platform Mobile & Biometric Core",
        thesis:
          "Unified React Native / Flutter execution backed by SQLite offline sync and hardware Secure Enclave signing delivers native responsiveness at half the dual-team maintenance cost.",
        sources: ["React Native / Flutter", "Hardware Keystore", "Offline SQLite", "OTA Releases"],
      },
      ai: {
        headline: "Deterministic Multi-Agent & Hybrid Vector RAG Pipeline",
        thesis:
          "Combining dense-sparse hybrid vector search (Qdrant) with LangGraph verification loops and private VPC deployment guarantees verifiable citations with zero public training leakage.",
        sources: ["LangGraph Agents", "Qdrant Hybrid RAG", "Claude 3.5 / vLLM", "Zod Schema Guard"],
      },
      modern: {
        headline: "Zero-Downtime Strangler-Fig Digital Modernization",
        thesis:
          "Incrementally routing legacy monolith modules behind an edge API gateway allows continuous UI modernization and 4.8x ROI lift without disrupting active customer sessions.",
        sources: ["API Gateway Strangler", "Design Tokens", "Redis Caching", "Automated E2E"],
      },
    };

    const scaleMeta: Record<
      string,
      {
        timeline: string;
        latencyTarget: string;
        squad: string;
        milestones: string;
        digentDays: number;
        agencyDays: number;
        deliverables: string[];
      }
    > = {
      mvp: {
        timeline: "2 – 4 Weeks",
        latencyTarget: "< 300ms Edge Target",
        squad: "1 Principal Architect + 1 Senior Fullstack + 1 Product Designer",
        milestones: "3 Bi-Weekly Live Staging Drops",
        digentDays: 21,
        agencyDays: 75,
        deliverables: [
          "Interactive Figma Prototype & Design Tokens",
          "Production Core Architecture & Typed Database",
          "Responsive Cross-Device Luxury Frontend",
          "CI/CD Staging Preview & 100% IP Repository",
        ],
      },
      core: {
        timeline: "6 – 8 Weeks",
        latencyTarget: "< 240ms Global TTFB",
        squad: "1 Principal Architect + 2 Staff Engineers + 1 Specialist + 1 QA Lead",
        milestones: "5 Iterative Production Sprint Releases",
        digentDays: 48,
        agencyDays: 145,
        deliverables: [
          "Complete Multi-Theme Design System & Micro-Interactions",
          "High-Concurrency Serverless / Microservices Core",
          "Enterprise RBAC Auth, Audit Trails & Telemetry",
          "Automated E2E Playwright Suite & Security Audit",
          "Stripe, CRM & Cloud Integrations",
          "Full Architecture Runbooks & Team Handover",
        ],
      },
      enterprise: {
        timeline: "10 – 14 Weeks",
        latencyTarget: "< 180ms Multi-Region SLA",
        squad: "Dedicated 6-Person Senior Atelier Squad + 24/7 DevOps Lead",
        milestones: "Continuous Bi-Weekly Production Rollouts",
        digentDays: 84,
        agencyDays: 240,
        deliverables: [
          "Multi-Region Active-Active Cloud Infrastructure",
          "Custom LLM / Multi-Agent Orchestration & Vector Vault",
          "Offline-First Realtime Sync & WebSocket Telemetry",
          "SOC2 / ISO Compliance Foundations & Disaster Recovery",
          "Dedicated Direct Slack Channel with Staff Architects",
          "Executive Training & Full Code Sovereignty",
        ],
      },
    };

    const d = domainTitles[domain] || domainTitles.web;
    const s = scaleMeta[scale] || scaleMeta.core;

    return {
      reportCode: `DT-2026-${domain.toUpperCase()}-${scale.toUpperCase()}`,
      headline: d.headline,
      thesis: d.thesis,
      sources: d.sources,
      ...s,
    };
  };

  const bp = getBlueprint();
  const activeDomainObj = domainOptions.find((d) => d.id === domain) || domainOptions[0];
  const activeScaleObj = scaleOptions.find((s) => s.id === scale) || scaleOptions[1];
  const velocityRatio = (bp.agencyDays / bp.digentDays).toFixed(1);

  return (
    <section className="lux-workbench-section wrap" id="deep-research-workbench">
      <div className="section-top">
        <div className="section-heading">
          <span className="eyebrow">DEEP RESEARCH ARCHITECTURE SYNTHESIZER</span>
          <h2>
            Synthesize your system
            <br />
            <em>blueprint</em> in real time.
          </h2>
          <p>
            Select a domain focus and delivery horizon to generate an executive engineering dossier, squad topology, and verified sprint schedule.
          </p>
        </div>
        <div className="lux-grounded-pill">
          <ShieldCheck size={14} />
          <span>99.6% Grounded · Zero Vendor Lock-In</span>
        </div>
      </div>

      <div className="lux-workbench-shell">
        {/* Left Research Outline & Configuration Rail */}
        <aside className="lux-workbench-rail">
          <div className="lux-rail-block">
            <span className="lux-rail-label">01 / SYSTEM DOMAIN</span>
            <div className="lux-rail-options">
              {domainOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`lux-rail-btn ${domain === opt.id ? "active" : ""}`}
                  onClick={() => setDomain(opt.id)}
                >
                  <span>{opt.label}</span>
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>

          <div className="lux-rail-block">
            <span className="lux-rail-label">02 / DELIVERY HORIZON</span>
            <div className="lux-scale-pills">
              {scaleOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`lux-scale-chip ${scale === opt.id ? "active" : ""}`}
                  onClick={() => setScale(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lux-rail-block lux-outline-nav">
            <span className="lux-rail-label">DOSSIER OUTLINE</span>
            <div className="lux-outline-list">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`lux-outline-item ${activeChapter === ch.id ? "active" : ""}`}
                  onClick={() => setActiveChapter(ch.id)}
                >
                  <span className="lux-outline-num">{ch.num}</span>
                  <span>{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Luxury Deep Research Dossier Report */}
        <div className="lux-dossier-sheet">
          <div className="lux-dossier-header">
            <div className="lux-dossier-id">
              <Terminal size={13} />
              <span>REPORT ID · {bp.reportCode}</span>
            </div>
            <div className="lux-dossier-badges">
              <span className="lux-badge-gold">{bp.timeline}</span>
              <span className="lux-badge-emerald">{bp.latencyTarget}</span>
            </div>
          </div>

          <h3 className="lux-dossier-title">{bp.headline}</h3>

          <div
            className={`lux-dossier-block ${activeChapter === 0 ? "highlighted" : ""}`}
            onClick={() => setActiveChapter(0)}
          >
            <div className="lux-block-eyebrow">
              <span>I. ARCHITECTURAL THESIS</span>
              <span>VERIFIED SYNTHESIS</span>
            </div>
            <p className="lux-dossier-thesis">{bp.thesis}</p>
            <div className="lux-citation-row">
              <span className="lux-cite-label">GROUNDING NODES:</span>
              {bp.sources.map((src, i) => (
                <span key={src} className="lux-cite-pill">
                  <em>[{i + 1}]</em> {src}
                </span>
              ))}
            </div>
          </div>

          <div className="lux-dossier-split">
            <div
              className={`lux-dossier-card ${activeChapter === 2 ? "highlighted" : ""}`}
              onClick={() => setActiveChapter(2)}
            >
              <div className="lux-card-meta">
                <Users size={15} />
                <span>III. ASSIGNED SENIOR SQUAD</span>
              </div>
              <strong>{bp.squad}</strong>
              <span className="lux-card-sub">
                <Clock size={12} /> {bp.milestones}
              </span>
            </div>

            <div
              className={`lux-dossier-card ${activeChapter === 3 ? "highlighted" : ""}`}
              onClick={() => setActiveChapter(3)}
            >
              <div className="lux-card-meta">
                <Cpu size={15} />
                <span>IV. DELIVERY VELOCITY</span>
              </div>
              <div className="lux-velocity-bars">
                <div className="lux-bar-row">
                  <span>DigentTech ({bp.digentDays}d)</span>
                  <div className="lux-bar-track">
                    <div
                      className="lux-bar-fill gold"
                      style={{ width: `${Math.round((bp.digentDays / bp.agencyDays) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="lux-bar-row muted">
                  <span>Legacy Agency ({bp.agencyDays}d)</span>
                  <div className="lux-bar-track">
                    <div className="lux-bar-fill muted" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
              <span className="lux-card-sub">
                {velocityRatio}× faster time-to-production verified
              </span>
            </div>
          </div>

          <div
            className={`lux-dossier-block ${activeChapter === 1 ? "highlighted" : ""}`}
            onClick={() => setActiveChapter(1)}
          >
            <div className="lux-block-eyebrow">
              <span>II. SCOPED DELIVERABLES &amp; HANDOVER</span>
              <span>100% IP OWNERSHIP</span>
            </div>
            <ul className="lux-deliverable-grid">
              {bp.deliverables.map((d) => (
                <li key={d}>
                  <span className="lux-check-ring">
                    <Check size={11} />
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lux-dossier-footer">
            <div className="lux-footer-note">
              <span className="pulse-dot" />
              <span>Ready to initialize repository &amp; design tokens within 3–5 business days.</span>
            </div>
            <a
              className="button lux-cta-button"
              href={`/contact?service=${encodeURIComponent(
                activeDomainObj.serviceName
              )}&brief=${encodeURIComponent(
                `[${bp.reportCode}] Estimated Timeline: ${bp.timeline}. Scope: ${activeDomainObj.label} (${activeScaleObj.label}). Target: ${bp.latencyTarget}.`
              )}`}
            >
              Lock In &amp; Export Brief
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

