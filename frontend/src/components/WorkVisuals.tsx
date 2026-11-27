import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Layers } from "lucide-react";
import {
  CloudflareAwsLogo,
  DockerKubernetesLogo,
  FastlaneGithubLogo,
  FlutterLogo,
  GraphqlRestLogo,
  LangChainLlamaIndexLogo,
  NextjsReactLogo,
  NodeGoLogo,
  OpenAIAntropicLogo,
  PineconeQdrantLogo,
  PostgresRedisLogo,
  PythonFastApiLogo,
  ReactNativeLogo,
  SqliteWatermelonLogo,
  SupabaseFirebaseLogo,
  SwiftKotlinLogo,
  TailwindLogo,
  TypescriptLogo,
  VitestPlaywrightLogo,
} from "../TechLogos";
import type {
  CapabilityArea,
  ArchitectureLayerNode,
  WorkCategoryId,
  WorkProject,
} from "../data/workPortfolio";

type LogoKey = CapabilityArea["technologies"][number]["logoKey"];

const LOGO_MAP: Record<LogoKey, React.ComponentType<{ size?: number }>> = {
  nextjs: NextjsReactLogo,
  typescript: TypescriptLogo,
  tailwind: TailwindLogo,
  nodego: NodeGoLogo,
  postgres: PostgresRedisLogo,
  cloudflare: CloudflareAwsLogo,
  graphql: GraphqlRestLogo,
  playwright: VitestPlaywrightLogo,
  reactnative: ReactNativeLogo,
  flutter: FlutterLogo,
  swiftkotlin: SwiftKotlinLogo,
  sqlite: SqliteWatermelonLogo,
  supabase: SupabaseFirebaseLogo,
  fastlane: FastlaneGithubLogo,
  openai: OpenAIAntropicLogo,
  langchain: LangChainLlamaIndexLogo,
  pinecone: PineconeQdrantLogo,
  fastapi: PythonFastApiLogo,
  docker: DockerKubernetesLogo,
};

export function CapabilityTechIcon({
  logoKey,
  size = 24,
}: {
  logoKey: LogoKey;
  size?: number;
}) {
  const Icon = LOGO_MAP[logoKey] ?? TypescriptLogo;
  return <Icon size={size} />;
}

/**
 * Lightweight technical node-mesh canvas for the Hero section.
 * Guards automatically against reduced-motion, coarse mobile pointers, and offscreen visibility.
 */
export function WorkHeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isCoarse = window.matchMedia?.("(pointer: coarse)").matches;
    let animId = 0;
    let visible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 680);

    const pointer = { x: -1200, y: -1200 };
    const targetCount = isCoarse ? 18 : Math.min(38, Math.floor((width * height) / 19000));
    const nodes = Array.from({ length: targetCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      r: Math.random() * 1.6 + 1.1,
      hue: Math.random() > 0.45 ? 196 : 234,
    }));

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const onMove = (e: MouseEvent) => {
      if (isCoarse) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };

    const onLeave = () => {
      pointer.x = -1200;
      pointer.y = -1200;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !animId && !document.hidden) {
        animId = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    const onVis = () => {
      if (!document.hidden && visible && !animId) {
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    function draw() {
      animId = 0;
      if (!ctx || !visible || document.hidden) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";
      const lineBase = isLight ? "2, 132, 199" : "56, 189, 248";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!isCoarse) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 1) {
            const f = (1 - dist / 140) * 0.9;
            n.x -= (dx / dist) * f;
            n.y -= (dy / dist) * f;
          }
        }

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `hsla(${n.hue}, 82%, 44%, 0.48)`
          : `hsla(${n.hue}, 92%, 65%, 0.6)`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 138) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${lineBase}, ${(1 - d / 138) * (isLight ? 0.14 : 0.22)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className="wk-hero-canvas" aria-hidden="true" />;
}

/**
 * Interactive Discipline Blueprint inside the Portfolio Hero.
 * Lets visitors jump straight to a discipline filter in the Explorer.
 */
export function WorkHeroDisciplineMap({
  counts,
  projects,
  onSelectCategory,
  onSelectProject,
}: {
  counts: Record<WorkCategoryId, number>;
  projects: WorkProject[];
  onSelectCategory: (cat: WorkCategoryId) => void;
  onSelectProject: (p: WorkProject) => void;
}) {
  const [hoveredCat, setHoveredCat] = useState<WorkCategoryId>("ai");
  const previewRef = useRef<HTMLButtonElement>(null);
  const connectorsRef = useRef<SVGSVGElement>(null);
  const isFirstMount = useRef(true);

  const nodes: { id: WorkCategoryId; label: string; code: string; desc: string }[] = [
    { id: "web", code: "SYS-01", label: "Web Platforms", desc: "Treasuries, Commerce & B2B SaaS" },
    { id: "mobile", code: "SYS-02", label: "Mobile Apps", desc: "Biometrics, BLE & Offline Sync" },
    { id: "ai", code: "SYS-03", label: "AI & Automation", desc: "Agent Graphs & Digital Twins" },
    { id: "design", code: "SYS-04", label: "Design Systems", desc: "OKLCH Tokens & Motion Kits" },
  ];

  const sampleProject =
    projects.find((p) => p.category === hoveredCat) ?? projects[0];

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          { y: 6, opacity: 0.65 },
          { y: 0, opacity: 1, duration: 0.28, ease: "power2.out", clearProps: "transform,opacity" },
        );
      }
      const activePath = connectorsRef.current?.querySelector<SVGPathElement>(
        ".wk-bp-connector.is-active",
      );
      if (activePath && typeof activePath.getTotalLength === "function") {
        const len = activePath.getTotalLength() || 80;
        gsap.fromTo(
          activePath,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.45, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" },
        );
      }
    });

    return () => ctx.revert();
  }, [hoveredCat]);

  return (
    <div className="wk-hero-blueprint" aria-label="Systems index by engineering discipline">
      <div className="wk-bp-header">
        <span className="wk-bp-dot" aria-hidden="true" />
        <span>ARCHITECTURE INDEX // {projects.length} SHIPPED SYSTEMS</span>
      </div>

      <div className="wk-bp-nodes">
        {nodes.map((node) => {
          const isActive = hoveredCat === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`wk-bp-node ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setHoveredCat(node.id)}
              onFocus={() => setHoveredCat(node.id)}
              onClick={() => onSelectCategory(node.id)}
            >
              <div className="wk-bp-node-top">
                <span className="wk-bp-code">{node.code}</span>
                <span className="wk-bp-count">{counts[node.id]} systems</span>
              </div>
              <strong>{node.label}</strong>
              <span className="wk-bp-desc">{node.desc}</span>
            </button>
          );
        })}
      </div>

      <svg
        ref={connectorsRef}
        className="wk-bp-connectors"
        viewBox="0 0 400 32"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M50 0 C50 20, 200 12, 200 32"
          className={`wk-bp-connector ${hoveredCat === "web" ? "is-active" : ""}`}
        />
        <path
          d="M150 0 C150 20, 200 12, 200 32"
          className={`wk-bp-connector ${hoveredCat === "mobile" ? "is-active" : ""}`}
        />
        <path
          d="M250 0 C250 20, 200 12, 200 32"
          className={`wk-bp-connector ${hoveredCat === "ai" ? "is-active" : ""}`}
        />
        <path
          d="M350 0 C350 20, 200 12, 200 32"
          className={`wk-bp-connector ${hoveredCat === "design" ? "is-active" : ""}`}
        />
      </svg>

      {sampleProject && (
        <button
          ref={previewRef}
          type="button"
          className="wk-bp-preview"
          onClick={() => onSelectProject(sampleProject)}
          aria-label={`Open ${sampleProject.name} case study`}
        >
          <div className="wk-bp-preview-meta">
            <span>FEATURED NODE · {sampleProject.index}</span>
            <strong>{sampleProject.name}</strong>
            <span className="wk-bp-preview-tag">{sampleProject.tagline}</span>
          </div>
          <span className="wk-bp-preview-cta">
            Inspect <ArrowRight size={14} />
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * Data-driven interactive Architecture Layer flow diagram used inside Case Study details.
 */
export function SolutionArchitectureDiagram({
  layers,
}: {
  layers: ArchitectureLayerNode[];
}) {
  const [selectedLayerIdx, setSelectedLayerIdx] = useState(0);

  return (
    <div className="wk-arch-diagram">
      <div className="wk-arch-pipeline" role="list" aria-label="Solution architecture layers">
        {layers.map((item, idx) => {
          const isSelected = selectedLayerIdx === idx;
          return (
            <React.Fragment key={item.layer}>
              <button
                type="button"
                role="listitem"
                className={`wk-arch-node ${isSelected ? "is-selected" : ""}`}
                onClick={() => setSelectedLayerIdx(idx)}
              >
                <span className="wk-arch-badge">{item.layer}</span>
                <strong>{item.title}</strong>
                <span className="wk-arch-proto">{item.protocol}</span>
              </button>
              {idx < layers.length - 1 && (
                <svg
                  className="wk-arch-arrow"
                  viewBox="0 0 32 16"
                  aria-hidden="true"
                >
                  <line x1="2" y1="8" x2="26" y2="8" />
                  <polyline points="21,3 27,8 21,13" />
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {layers[selectedLayerIdx] && (
        <div className="wk-arch-inspector" aria-live="polite">
          <Layers size={16} aria-hidden="true" />
          <div>
            <strong>
              {layers[selectedLayerIdx].layer} LAYER · {layers[selectedLayerIdx].title}
            </strong>
            <p>{layers[selectedLayerIdx].detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Interactive SVG Topology Map highlighting connected engineering domains in Section E.
 */
export function CapabilityTopologySvg({
  capabilities,
  activeId,
  onSelect,
}: {
  capabilities: CapabilityArea[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const positions: Record<string, { x: number; y: number }> = {
    frontend: { x: 86, y: 54 },
    api: { x: 240, y: 54 },
    mobile: { x: 86, y: 146 },
    backend: { x: 240, y: 146 },
    cloud: { x: 394, y: 54 },
    database: { x: 240, y: 238 },
    ai: { x: 394, y: 146 },
    security: { x: 394, y: 238 },
  };

  const activeCap = capabilities.find((c) => c.id === activeId) ?? capabilities[0];
  const connected = new Set([activeId, ...(activeCap?.connectedTo ?? [])]);

  const edges: [string, string][] = [];
  const seen = new Set<string>();
  for (const cap of capabilities) {
    for (const target of cap.connectedTo) {
      const key = [cap.id, target].sort().join("::");
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([cap.id, target]);
      }
    }
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const signals = svg.querySelectorAll<SVGLineElement>(".wk-topo-signal");
      if (signals.length) {
        gsap.fromTo(
          signals,
          { strokeDashoffset: 0 },
          { strokeDashoffset: -36, duration: 1.5, ease: "none", repeat: -1 },
        );
      }
      const selectedRect = svg.querySelector<SVGRectElement>(".wk-topo-node.is-selected rect");
      if (selectedRect) {
        gsap.fromTo(
          selectedRect,
          { scale: 0.94 },
          {
            scale: 1,
            transformOrigin: "center center",
            duration: 0.36,
            ease: "back.out(1.7)",
            clearProps: "transform",
          },
        );
      }
    }, svg);
    return () => ctx.revert();
  }, [activeId]);

  return (
    <svg
      ref={svgRef}
      className="wk-topology-svg"
      viewBox="0 0 480 292"
      role="img"
      aria-label="Connected software engineering capabilities diagram"
    >
      {edges.map(([a, b]) => {
        const p1 = positions[a];
        const p2 = positions[b];
        if (!p1 || !p2) return null;
        const isLit = a === activeId || b === activeId;
        return (
          <React.Fragment key={`${a}-${b}`}>
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              className={`wk-topo-edge ${isLit ? "is-lit" : ""}`}
            />
            {isLit && (
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                className="wk-topo-signal"
              />
            )}
          </React.Fragment>
        );
      })}

      {capabilities.map((cap) => {
        const pos = positions[cap.id];
        if (!pos) return null;
        const isSelected = cap.id === activeId;
        const isPeer = connected.has(cap.id);
        return (
          <g
            key={cap.id}
            transform={`translate(${pos.x}, ${pos.y})`}
            className={`wk-topo-node ${isSelected ? "is-selected" : isPeer ? "is-peer" : ""}`}
            onClick={() => onSelect(cap.id)}
            style={{ cursor: "pointer" }}
          >
            <rect x="-66" y="-22" width="132" height="44" rx="10" />
            <text y="-3" className="wk-topo-code" textAnchor="middle">
              {cap.code}
            </text>
            <text y="12" className="wk-topo-name" textAnchor="middle">
              {cap.title.replace(" Engineering", "").replace(" Architecture", "")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

