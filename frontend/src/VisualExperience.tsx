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
  variant?: "sculpture" | "workspace" | "work-showcase";
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
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

const capabilities = [
  {
    name: "Web experiences",
    icon: Monitor,
    service: "Web development",
    href: "/web-development",
    heading: "Make the first click count.",
    text: "A considered website is more than a good-looking homepage. It helps people find what they need, understand your business and take the next step.",
    items: [
      "Clear information and navigation",
      "A responsive, distinctive design",
      "Connected content and integrations",
    ],
    label: "WEBSITE / INTERFACE STUDY",
    type: "web",
  },
  {
    name: "Mobile products",
    icon: Smartphone,
    service: "App development",
    href: "/app-development",
    heading: "The useful app. The one they keep.",
    text: "We work through the journey before the screens: the moments your app needs to simplify, the features that matter and how it feels in everyday use.",
    items: [
      "User flows and clickable prototypes",
      "iOS and Android experiences",
      "Connected accounts and services",
    ],
    label: "MOBILE / INTERFACE STUDY",
    type: "app",
  },
  {
    name: "Growth & marketing",
    icon: ChartNoAxesCombined,
    service: "Digital marketing",
    href: "/digital-marketing",
    heading: "A plan behind every campaign.",
    text: "Connect audience, message and channel with a deliberate strategy. Keep the creative consistent and the reporting easy to understand.",
    items: [
      "Audience and channel planning",
      "Campaign creative and landing pages",
      "Analytics and conversion tracking",
    ],
    label: "GROWTH / WORKFLOW STUDY",
    type: "growth",
  },
  {
    name: "AI & automation",
    icon: WandSparkles,
    service: "AI & automation",
    href: "/ai-solutions",
    heading: "Give the routine work a better route.",
    text: "Connect the tools you already use. Reduce repeated steps, keep people in the loop and make the flow of information easier to manage.",
    items: [
      "Workflow mapping and feasibility",
      "Connected tools and automations",
      "Review, access and handover",
    ],
    label: "AUTOMATION / WORKFLOW STUDY",
    type: "flow",
  },
];
function InterfaceStudy({ type }: { type: string }) {
  if (type === "app")
    return (
      <div className="study-phone">
        <div className="phone-speaker" />
        <div className="phone-header">
          <span>Good morning.</span>
          <span className="phone-avatar">A</span>
        </div>
        <h4>
          Your day,
          <br />
          at a glance.
        </h4>
        <div className="phone-task">
          <span className="study-label">TODAY'S FOCUS</span>
          <strong>Make room for good work.</strong>
          <div className="task-progress" />
        </div>
        {[
          "Plan the next sprint",
          "Review a new direction",
          "Share the next milestone",
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
        <span className="study-label">A CONNECTED CAMPAIGN</span>
        <div className="campaign-core">
          <ChartNoAxesCombined size={26} />
          <strong>One clear message.</strong>
          <span>Multiple ways to reach people.</span>
        </div>
        <div className="campaign-channels">
          {["Search", "Social", "Content"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="campaign-loop">
          <ArrowRight size={16} />
          <span>Measure. Learn. Refine.</span>
        </div>
      </div>
    );
  if (type === "flow")
    return (
      <div className="study-flow">
        <span className="study-label">A SIMPLER WORKFLOW</span>
        {[
          ["01", "Request arrives"],
          ["02", "Connect the right tools"],
          ["03", "Your team reviews"],
          ["04", "The next step runs"],
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
        <span>◆ &nbsp; YOUR BRAND</span>
        <span>Studio &nbsp; Work &nbsp; Contact</span>
      </div>
      <div className="study-web-main">
        <span className="study-label">A DIFFERENT POINT OF VIEW.</span>
        <h4>
          A place for
          <br />
          your next <em>idea.</em>
        </h4>
        <div className="study-web-button">
          Explore the collection <ArrowUpRight size={12} />
        </div>
        <div className="study-web-sculpture">
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="study-web-footer">
        <span>Considered design.</span>
        <span>01 — 03</span>
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
          <span className="eyebrow">WHAT GOES INTO THE WORK</span>
          <h2>
            Every detail has
            <br />a <em>reason.</em>
          </h2>
        </div>
        <p className="detail-intro">
          A clear hierarchy. A familiar interaction. A visual language that
          holds together. That's how a product starts to feel like yours.
        </p>
      </div>
      <div className="detail-bento">
        <figure className="workspace-card">
          <ThemeImage
            variant="workspace"
            alt="Illustrative design session with wireframes, blue material samples and a laptop"
          />
          <figcaption>
            <span>FROM THE FIRST SKETCH</span>
            <h3>
              Think it through.
              <br />
              Then bring it to life.
            </h3>
            <span className="image-credit">Illustrative studio study</span>
          </figcaption>
        </figure>
        <div className="detail-side">
          <article className="design-system-card">
            <div className="bento-card-head">
              <Palette size={20} />
              <span>VISUAL LANGUAGE</span>
            </div>
            <div className="design-type">
              Aa
              <span>
                Considered
                <br />
                <em>by design.</em>
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
              Typography, colour and components that feel like one connected
              brand.
            </p>
          </article>
          <article className="quality-card">
            <div className="bento-card-head">
              <Code2 size={20} />
              <span>BUILT FOR EVERYDAY USE</span>
            </div>
            <div className="quality-tags">
              {[
                "Responsive layouts",
                "Keyboard-friendly",
                "Clear handover",
                "Thoughtful motion",
              ].map((t) => (
                <span key={t}>
                  <Check size={13} />
                  {t}
                </span>
              ))}
            </div>
            <a href="/about" className="text-link">
              Our approach <ArrowUpRight size={16} />
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
    "A fresh visual identity",
    "An easier customer journey",
    "Tools that save team time",
    "A clearer path to enquiries",
  ];
  const item = capabilities[kind];
  const brief = `I am interested in ${item.service.toLowerCase()}.\nMy priorities: ${priorities.length ? priorities.join(", ") : "I would like to discuss the options."}`;
  return (
    <section className="project-starter wrap">
      <div className="starter-intro">
        <span className="eyebrow">A QUICK STARTING POINT</span>
        <h2>
          What would make
          <br />
          your business <em>better?</em>
        </h2>
        <p>
          You don't need a finished brief. Pick a direction and the things you'd
          like to improve.
        </p>
        <span className="starter-note">
          Your choices become a starting brief in the contact form.
        </span>
      </div>
      <div className="starter-controls">
        <span className="starter-label">01 / WHAT ARE YOU THINKING ABOUT?</span>
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
        <span className="starter-label">02 / WHAT MATTERS MOST?</span>
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
          Build my starting brief <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
