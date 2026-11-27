import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Monitor,
  Smartphone,
  WandSparkles,
  ChartNoAxesCombined,
  ArrowRight,
  Palette,
  MousePointer2,
} from "lucide-react";

export function ThemeImage({
  variant = "sculpture",
  alt,
  className = "",
  priority = false,
}: {
  variant?: "sculpture" | "workspace";
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() =>
      setTheme(root.dataset.theme === "light" ? "light" : "dark"),
    );
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return (
    <img
      className={"theme-image " + className}
      data-theme-visual={theme}
      src={`/assets/visuals/${variant}-${theme}.webp`}
      alt={alt}
      width={1536}
      height={1024}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

const capabilities = [
  {
    name: "Web experiences",
    icon: Monitor,
    service: "Web development",
    href: "/web-development",
    heading: "Web platforms built to convert and endure.",
    text: "A high-performing web platform organizes complex offerings cleanly, loads under 300ms globally, and guides visitors directly to qualified enquiries.",
    items: [
      "Clear information hierarchy and zero-friction navigation",
      "Responsive design system with accessible contrast",
      "Headless CMS, payments, and CRM integrations",
    ],
    label: "WEB PLATFORM / ARCHITECTURE STUDY",
    type: "web",
  },
  {
    name: "Mobile products",
    icon: Smartphone,
    service: "App development",
    href: "/app-development",
    heading: "Mobile software teams rely on every day.",
    text: "We design physical thumb-zone ergonomics, offline SQLite synchronization, and biometric authentication before polishing every pixel of the native experience.",
    items: [
      "Interactive clickable prototypes tested on device",
      "Unified iOS and Android builds at 60fps",
      "Hardware biometrics, push routing, and offline sync",
    ],
    label: "MOBILE PRODUCT / ERGONOMIC STUDY",
    type: "app",
  },
  {
    name: "Growth & marketing",
    icon: ChartNoAxesCombined,
    service: "Digital marketing",
    href: "/digital-marketing",
    heading: "Acquisition grounded in server-side attribution.",
    text: "Align audience targeting, high-converting landing pages, and first-party conversion tracking so every marketing rupee compounds measurable pipeline.",
    items: [
      "Technical SEO architecture and search intent mapping",
      "Conversion-tested ad creative and landing flows",
      "Server-side CAPI tracking and live ROAS reporting",
    ],
    label: "GROWTH ENGINE / ATTRIBUTION STUDY",
    type: "growth",
  },
  {
    name: "AI & automation",
    icon: WandSparkles,
    service: "AI & automation",
    href: "/ai-solutions",
    heading: "Eliminate manual bottlenecks with grounded AI.",
    text: "Connect internal ERPs, documents, and team workflows with deterministic agent pipelines that keep human approval in control and private data inside your VPC.",
    items: [
      "Operational audit and token-ROI feasibility",
      "Hybrid vector RAG with verifiable citations",
      "Human-in-the-loop approvals and access controls",
    ],
    label: "AI ORCHESTRATION / WORKFLOW STUDY",
    type: "flow",
  },
];
function InterfaceStudy({ type }: { type: string }) {
  if (type === "app")
    return (
      <div className="study-phone">
        <div className="phone-speaker" />
        <div className="phone-header">
          <span>Site #04 · Synced</span>
          <span className="phone-avatar">DT</span>
        </div>
        <h4>
          Field dispatch,
          <br />
          offline-ready.
        </h4>
        <div className="phone-task">
          <span className="study-label">ACTIVE MILESTONE</span>
          <strong>Biometric &amp; GPS verification</strong>
          <div className="task-progress" />
        </div>
        {[
          "Approve vendor milestone #12",
          "Sync blueprint revision v3.4",
          "Export site compliance audit",
        ].map((t, i) => (
          <div className="phone-list" key={t}>
            <span>0{i + 1}</span>
            {t}
            <ArrowUpRight size={11} />
          </div>
        ))}
        <div className="phone-nav">
          <Monitor size={15} />
          <Layers3 size={15} />
          <Palette size={15} />
        </div>
      </div>
    );
  if (type === "growth")
    return (
      <div className="study-growth">
        <span className="study-label">SERVER-SIDE ATTRIBUTION</span>
        <div className="campaign-core">
          <ChartNoAxesCombined size={26} />
          <strong>4.8× Blended ROAS</strong>
          <span>99.2% first-party signal match quality</span>
        </div>
        <div className="campaign-channels">
          {["Search", "Meta CAPI", "Retention"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="campaign-loop">
          <ArrowRight size={16} />
          <span>Audit · Attribute · Compound Revenue</span>
        </div>
      </div>
    );
  if (type === "flow")
    return (
      <div className="study-flow">
        <span className="study-label">DETERMINISTIC AGENT PIPELINE</span>
        {[
          ["01", "Document / webhook ingested"],
          ["02", "Hybrid vector RAG retrieval"],
          ["03", "Staff team review checkpoint"],
          ["04", "ERP & ledger commit verified"],
        ].map(([n, t], i) => (
          <div className="flow-step" key={n}>
            <span>{n}</span>
            <strong>{t}</strong>
            {i === 2 ? <MousePointer2 size={16} /> : <Check size={16} />}
          </div>
        ))}
      </div>
    );
  return (
    <div className="study-browser">
      <div className="study-browser-bar">
        <span>◆ &nbsp; ENTERPRISE PORTAL</span>
        <span>Platform &nbsp; Telemetry &nbsp; API</span>
      </div>
      <div className="study-web-main">
        <span className="study-label">EDGE SSR · SUB-280MS TTFB</span>
        <h4>
          Clarity at
          <br />
          enterprise <em>scale.</em>
        </h4>
        <div className="study-web-button">
          Launch interactive dossier <ArrowUpRight size={12} />
        </div>
        <div className="study-web-sculpture">
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="study-web-footer">
        <span>Core Web Vitals: 100 / 100</span>
        <span>WCAG AA+</span>
      </div>
    </div>
  );
}
export function CapabilityExplorer() {
  const [active, setActive] = useState(0);
  const item = capabilities[active];
  return (
    <section className="capability-explorer section wrap" id="services">
      <div className="section-top">
        <div className="section-heading">
          <span className="eyebrow">A CONNECTED SET OF CAPABILITIES</span>
          <h2>
            The right pieces.
            <br />
            Working <em>together.</em>
          </h2>
          <p>
            Explore how we can help, from a first website to a connected digital
            product.
          </p>
        </div>
        <a className="text-link" href="/services">
          All services <ArrowUpRight size={18} />
        </a>
      </div>
      <div
        className="capability-tabs"
        role="tablist"
        aria-label="Explore capabilities"
      >
        {capabilities.map((c, i) => (
          <button
            key={c.name}
            id={"capability-tab-" + i}
            role="tab"
            aria-selected={i === active}
            aria-controls="capability-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 3
                      : (active + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setActive(next);
                document.getElementById("capability-tab-" + next)?.focus();
              }
            }}
          >
            <c.icon size={19} />
            <span>{c.name}</span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <div
        className="capability-panel"
        id="capability-panel"
        role="tabpanel"
        aria-labelledby={"capability-tab-" + active}
      >
        <div className="capability-copy" key={item.name}>
          <span className="eyebrow">
            0{active + 1} / {item.service.toUpperCase()}
          </span>
          <h3>{item.heading}</h3>
          <p>{item.text}</p>
          <ul>
            {item.items.map((t) => (
              <li key={t}>
                <Check size={15} />
                {t}
              </li>
            ))}
          </ul>
          <a href={item.href} className="text-link">
            Explore {item.service.toLowerCase()} <ArrowUpRight size={18} />
          </a>
        </div>
        <div className={"capability-study study-" + item.type}>
          <span className="study-corner-label">{item.label}</span>
          <InterfaceStudy type={item.type} />
          <span className="study-disclaimer">
            Illustrative concept, shaped around your brand.
          </span>
        </div>
      </div>
    </section>
  );
}

export function DesignDetails() {
  return (
    <section className="design-details section wrap">
      <div className="section-top">
        <div className="section-heading">
          <span className="eyebrow">DESIGN SYSTEMS &amp; ENGINEERING RIGOR</span>
          <h2>
            Every token has a
            <br />
            measurable <em>purpose.</em>
          </h2>
        </div>
        <p className="detail-intro">
          Clear typographic hierarchy, accessible contrast ratios, and documented
          design tokens so your internal engineering team can scale without
          rewriting UI primitives.
        </p>
      </div>
      <div className="detail-bento">
        <figure className="workspace-card">
          <ThemeImage
            variant="workspace"
            alt="Design architecture session with wireframes, material tokens, and workstation"
          />
          <figcaption>
            <span>RESEARCH-LED ARCHITECTURE</span>
            <h3>
              Audit the workflow.
              <br />
              Ship the system cleanly.
            </h3>
            <span className="image-credit">DigentTech Atelier · Process &amp; Systems Practice</span>
          </figcaption>
        </figure>
        <div className="detail-side">
          <article className="design-system-card">
            <div className="bento-card-head">
              <Palette size={20} />
              <span>TYPOGRAPHY &amp; TOKEN PARITY</span>
            </div>
            <div className="design-type">
              Aa
              <span>
                Precision
                <br />
                <em>hierarchy.</em>
              </span>
            </div>
            <div className="color-swatches">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <p>
              Dark-first obsidian and warm ivory light tokens engineered for
              WCAG AA+ readability across desktop and mobile viewports.
            </p>
          </article>
          <article className="quality-card">
            <div className="bento-card-head">
              <Code2 size={20} />
              <span>PRODUCTION DELIVERABLE STANDARDS</span>
            </div>
            <div className="quality-tags">
              {[
                "Responsive breakpoints",
                "Keyboard & ARIA ready",
                "100% repository handover",
                "Zero layout shift UI",
              ].map((t) => (
                <span key={t}>
                  <Check size={13} />
                  {t}
                </span>
              ))}
            </div>
            <a href="/about" className="text-link">
              Inspect our engineering standard <ArrowUpRight size={16} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ProjectStarter() {
  const [kind, setKind] = useState(0);
  const [priorities, setPriorities] = useState<string[]>([]);
  const options = [
    "Sub-300ms global web performance",
    "Unified customer onboarding & checkout",
    "Automated workflows saving team hours",
    "Higher qualified lead conversion rate",
  ];
  const item = capabilities[kind];
  const brief = `Service focus: ${item.service}.\nPrimary objectives: ${priorities.length ? priorities.join(", ") : "Requesting full architecture discovery review."}`;
  return (
    <section className="project-starter wrap">
      <div className="starter-intro">
        <span className="eyebrow">DIRECT CONSULTATION INTAKE</span>
        <h2>
          Align on your
          <br />
          next <em>milestone.</em>
        </h2>
        <p>
          Select your primary engineering track and commercial goals below to
          pre-populate a structured brief for our lead architect.
        </p>
        <span className="starter-note">
          Your selections carry directly into the consultation desk for a 24-hour scoped response.
        </span>
      </div>
      <div className="starter-controls">
        <span className="starter-label">01 / PRIMARY PRACTICE TRACK</span>
        <div className="starter-kinds">
          {capabilities.map((c, i) => (
            <button
              key={c.service}
              aria-pressed={kind === i}
              onClick={() => setKind(i)}
            >
              <c.icon size={16} />
              {c.service}
            </button>
          ))}
        </div>
        <span className="starter-label">02 / MEASURABLE OUTCOMES TARGETED</span>
        <div className="priority-options">
          {options.map((t) => (
            <button
              key={t}
              aria-pressed={priorities.includes(t)}
              onClick={() =>
                setPriorities(
                  priorities.includes(t)
                    ? priorities.filter((x) => x !== t)
                    : [...priorities, t],
                )
              }
            >
              <span className="priority-check">
                {priorities.includes(t) && <Check size={12} />}
              </span>
              {t}
            </button>
          ))}
        </div>
        <a
          className="button"
          href={
            "/contact?service=" +
            encodeURIComponent(item.service) +
            "&brief=" +
            encodeURIComponent(brief)
          }
        >
          Export brief to consultation desk <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
