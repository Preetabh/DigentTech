import {
    ArrowUpRight,
    Award,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Compass,
    Copy,
    Cpu,
    HeartHandshake,
    Mail,
    MapPin,
    Milestone,
    Scale,
    ShieldCheck,
    Sparkles,
    Target,
    Terminal,
    User,
    XCircle,
    Zap
} from "lucide-react";
import React, { useState } from "react";
import { AboutStudioCanvas } from "./ServiceCanvases";
import { ThemeImage } from "./VisualExperience";
import "./about-page.css";

function SectionHeading({
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

export function AboutPage() {
  // View mode switcher: 'profile' | 'advantage' | 'principles' | 'journey'
  const [activeView, setActiveView] = useState<"profile" | "advantage" | "principles" | "journey">("profile");

  // Story narrative tabs on the founder card
  const [storyTab, setStoryTab] = useState<"vision" | "standard" | "partnership">("vision");

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText("hr.digenttech@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const comparisonData = [
    {
      dimension: "Senior Execution",
      agency: "Junior developers assigned after sales contract is signed",
      dotcode: "Direct senior architect & founder craftsmanship on every sprint",
    },
    {
      dimension: "Communication Layers",
      agency: "3–5 layers of account executives, PMs, and ticket coordinators",
      dotcode: "Zero middlemen. Direct collaboration with the builder in shared Slack",
    },
    {
      dimension: "Feedback Cadence",
      agency: "Lengthy 3–4 month waterfall reviews before first clickable demo",
      dotcode: "Weekly device drops on Apple TestFlight & edge preview links",
    },
    {
      dimension: "Scope & Billing",
      agency: "Hourly estimates with frequent billable scope change orders",
      dotcode: "Transparent fixed-scope milestones with guaranteed outcomes",
    },
    {
      dimension: "IP & Code Ownership",
      agency: "Vendor lock-in with proprietary starter kits or deferred handover",
      dotcode: "100% full source code, Figma vectors, and cloud ownership on day one",
    },
  ];

  const founderFaqs = [
    {
      q: "Do I work directly with Vishu or an outsourced account team?",
      a: "You work directly with Vishu and our core senior specialists. There are zero account managers, sales middlemen, or junior handoffs. Every strategic milestone, system architecture schema, and design sprint is personally guided and reviewed by leadership.",
    },
    {
      q: "What size companies does DigentTech typically partner with?",
      a: "We partner with ambitious early-stage founders launching category-defining products, venture-backed scaleups modernizing their tech stack, and established businesses seeking bespoke platforms that outperform generic SaaS tools.",
    },
    {
      q: "How quickly can we kick off a new engagement?",
      a: "We take on only 2 to 3 select engagements per quarter to ensure intense focus and craft. Typically, once scope and milestones are aligned, discovery and prototyping begin within 5 to 10 business days.",
    },
    {
      q: "Who owns the code, design assets, and intellectual property?",
      a: "You retain 100% full ownership of all source code, Figma design files, database architectures, and cloud deployment pipelines from day one. There is zero vendor lock-in.",
    },
  ];

  return (
    <>
      {/* 1. HERO STAGE WITH AMBIENT STUDIO CANVAS */}
      <section className="about-hero-stage">
        <AboutStudioCanvas />
        <div className="about-hero-section wrap">
          <header className="page-hero">
            <span className="eyebrow">
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  marginRight: "6px",
                }}
              />
              THE STUDIO / DIRECT DIGITAL ARCHITECTURE
            </span>
            <h1>
              Senior craft. Zero layers.
              <br />
              Digital flagships built to <em>endure.</em>
            </h1>
            <p>
              DigentTech is a boutique design and engineering studio founded to
              eliminate agency bloat. We partner directly with founders to conceive,
              architect, and ship digital products with uncompromising taste and
              production resilience.
            </p>
          </header>

          {/* Interactive View Mode Switcher */}
          <div className="about-view-switcher-bar">
            <nav className="about-view-switcher" aria-label="About section view filter">
              <button
                className={"about-view-btn " + (activeView === "profile" ? "active" : "")}
                onClick={() => setActiveView("profile")}
              >
                <User size={14} />
                <span>Executive Profile</span>
              </button>
              <button
                className={"about-view-btn " + (activeView === "advantage" ? "active" : "")}
                onClick={() => setActiveView("advantage")}
              >
                <Scale size={14} />
                <span>The Studio Difference</span>
              </button>
              <button
                className={"about-view-btn " + (activeView === "principles" ? "active" : "")}
                onClick={() => setActiveView("principles")}
              >
                <Compass size={14} />
                <span>Principles &amp; Craft</span>
              </button>
              <button
                className={"about-view-btn " + (activeView === "journey" ? "active" : "")}
                onClick={() => setActiveView("journey")}
              >
                <Milestone size={14} />
                <span>Studio Journey</span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* 2. LIVE STUDIO METRICS STRIP */}
      <section className="about-metrics-strip">
        <div className="wrap">
          <div className="about-metrics-grid">
            <div className="about-metric-card">
              <span className="stat-num">
                45<span>+</span>
              </span>
              <span className="stat-label">Production Flagships Shipped</span>
            </div>
            <div className="about-metric-card">
              <span className="stat-num">
                99.8<span>%</span>
              </span>
              <span className="stat-label">Client Partnership Retention</span>
            </div>
            <div className="about-metric-card">
              <span className="stat-num">
                120<span> FPS</span>
              </span>
              <span className="stat-label">Tactile Claymorphic Standard</span>
            </div>
            <div className="about-metric-card">
              <span className="stat-num">
                7<span>+</span>
              </span>
              <span className="stat-label">Global Partner Geographies</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXECUTIVE FOUNDER SPOTLIGHT (MEET VISHU AWASTHI) */}
      <section className="founder-spotlight-section wrap" id="founder">
        <div className="founder-executive-card">
          {/* Left: Founder Media Column */}
          <div className="founder-media-col">
            <div className="founder-portrait-frame">
              <div className="founder-status-pill">
                <span className="founder-status-dot" />
                <span>ACTIVE FOR Q2/Q3 PARTNERSHIPS</span>
              </div>
              <img
                src="/assets/founder.png"
                alt="Vishu Awasthi, Founder and Principal Strategist of DigentTech"
                loading="eager"
              />
              <div className="founder-floating-badge">
                <div className="founder-badge-icon">
                  <Award size={18} />
                </div>
                <div className="founder-badge-text">
                  <strong>Vishu Awasthi</strong>
                  <span>Founder &amp; Principal Strategist</span>
                </div>
              </div>
            </div>

            {/* Quick Connect Tray */}
            <div className="founder-connect-tray">
              <button
                className="founder-connect-btn"
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy founder email"
              >
                <div className="founder-connect-left">
                  <Mail size={15} color="var(--accent)" />
                  <span>hr.digenttech@gmail.com</span>
                </div>
                {copiedEmail ? (
                  <span className="copy-feedback-pill">Copied!</span>
                ) : (
                  <Copy size={13} color="var(--muted)" />
                )}
              </button>

              <a
                className="founder-connect-link"
                href="/contact?service=General%20inquiry"
              >
                <div className="founder-connect-left">
                  <Calendar size={15} color="var(--accent)" />
                  <span>Schedule 1-on-1 Strategy Call</span>
                </div>
                <ArrowUpRight size={14} />
              </a>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "var(--muted)",
                  padding: "4px 8px",
                }}
              >
                <MapPin size={12} color="var(--accent)" />
                <span>Based in India · Serving Global Partners</span>
              </div>
            </div>
          </div>

          {/* Right: Leadership Philosophy & Commitment */}
          <div className="founder-content-col">
            <div className="founder-header-group">
              <span className="eyebrow">THE PEOPLE BEHIND THE WORK</span>
              <h2>Meet Vishu Awasthi.</h2>
              <div className="founder-role-title">
                <span className="role-pill">FOUNDER &amp; LEAD ARCHITECT</span>
                <span className="location-pill">DigentTech STUDIO · EST. 2022</span>
              </div>
            </div>

            {/* Interactive Story Tabs */}
            <div className="founder-story-tab-bar" role="tablist" aria-label="Founder narrative">
              <button
                className={"founder-story-tab-btn " + (storyTab === "vision" ? "active" : "")}
                onClick={() => setStoryTab("vision")}
              >
                The Vision
              </button>
              <button
                className={"founder-story-tab-btn " + (storyTab === "standard" ? "active" : "")}
                onClick={() => setStoryTab("standard")}
              >
                Engineering Standard
              </button>
              <button
                className={"founder-story-tab-btn " + (storyTab === "partnership" ? "active" : "")}
                onClick={() => setStoryTab("partnership")}
              >
                Direct Partnership
              </button>
            </div>

            {/* Strategic Quote Banner */}
            <div className="founder-quote-banner">
              <p>
                “Great software isn't manufactured on corporate agency assembly
                lines with five layers of account managers. It's built when
                senior engineering and commercial strategy sit at the exact same
                desk.”
              </p>
              <span className="founder-quote-author">
                — Vishu Awasthi · Founder, DigentTech
              </span>
            </div>

            {/* Narrative Content by Tab */}
            {storyTab === "vision" && (
              <>
                <p className="founder-bio-text">
                  Founder &amp; strategist at DigentTech. Bringing business direction
                  and digital execution together, with a focus on thoughtful work
                  and strong partnerships.
                </p>
                <p className="founder-bio-text">
                  DigentTech was founded to provide a refreshing antidote to bloated
                  agency models: replacing layers of account middlemen with direct
                  senior execution, tactile aesthetic craft, and ruthless technical rigor.
                </p>
              </>
            )}

            {storyTab === "standard" && (
              <>
                <p className="founder-bio-text">
                  We treat software as physical architecture. Every interface is built
                  with typed contracts, indexed relational schemas, sub-second edge
                  routing, and GPU-accelerated claymorphic lighting.
                </p>
                <p className="founder-bio-text">
                  No quick-and-dirty templates. We engineer systems with zero technical
                  debt that continue running cleanly as your company scales from 1,000 to
                  1,000,000 daily users.
                </p>
              </>
            )}

            {storyTab === "partnership" && (
              <>
                <p className="founder-bio-text">
                  When you partner with DigentTech, you speak directly with Vishu and core
                  senior architects. No junior handoffs, no telephone games, and no
                  surprise invoices.
                </p>
                <p className="founder-bio-text">
                  We distribute private weekly builds to your phone via Apple TestFlight
                  so you can test on real hardware early and often, keeping you 100% in
                  control of every sprint milestone.
                </p>
              </>
            )}

            {/* 4 Core Pillars Bento Grid */}
            <div className="founder-pillars-grid">
              <div className="founder-pillar-item">
                <div className="pillar-top">
                  <div className="pillar-icon-box">
                    <ShieldCheck size={16} />
                  </div>
                  <strong>Zero Technical Debt</strong>
                </div>
                <p>
                  Typed contracts, indexed schemas, and architectures engineered
                  to scale effortlessly without rewrites.
                </p>
              </div>

              <div className="founder-pillar-item">
                <div className="pillar-top">
                  <div className="pillar-icon-box">
                    <Sparkles size={16} />
                  </div>
                  <strong>120 FPS Tactile Craft</strong>
                </div>
                <p>
                  Claymorphic lighting, subtle spring physics, and micro-interactions
                  tuned for human delight.
                </p>
              </div>

              <div className="founder-pillar-item">
                <div className="pillar-top">
                  <div className="pillar-icon-box">
                    <Terminal size={16} />
                  </div>
                  <strong>Weekly Device Builds</strong>
                </div>
                <p>
                  Direct TestFlight drops and edge preview links every single week.
                  Full transparency, zero surprises.
                </p>
              </div>

              <div className="founder-pillar-item">
                <div className="pillar-top">
                  <div className="pillar-icon-box">
                    <Cpu size={16} />
                  </div>
                  <strong>100% Full IP Ownership</strong>
                </div>
                <p>
                  All source code, design files, and infrastructure credentials
                  belong to you on day one.
                </p>
              </div>
            </div>

            {/* Direct Actions Row */}
            <div className="founder-actions-row">
              <a className="button" href="/contact?service=General%20inquiry">
                Schedule a 1-on-1 with Vishu
                <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="/careers">
                Build with us <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE STUDIO ADVANTAGE (TRADITIONAL AGENCY VS DigentTech) */}
      <section className="comparison-section wrap" id="advantage">
        <div className="section-top">
          <SectionHeading
            label="THE STUDIO ADVANTAGE"
            title="Why founders choose DigentTech over traditional agencies."
            text="We stripped away the agency bloat to deliver faster velocity, higher craft, and direct builder accountability."
          />
        </div>

        <div className="comparison-box">
          <div className="comparison-header-row">
            <div>Strategic Dimension</div>
            <div>Traditional Agency</div>
            <div className="col-studio">
              <Sparkles size={14} />
              DigentTech Studio
            </div>
          </div>

          {comparisonData.map((item) => (
            <div className="comparison-item-row" key={item.dimension}>
              <div className="comparison-dim">{item.dimension}</div>
              <div className="comparison-bad">
                <XCircle size={17} className="icon-cross" />
                <span>{item.agency}</span>
              </div>
              <div className="comparison-good">
                <CheckCircle2 size={17} className="icon-check" />
                <span>{item.dotcode}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STUDIO PRINCIPLES (WHAT GUIDES US) */}
      <section className="section wrap" id="principles">
        <div className="section-top">
          <SectionHeading
            label="WHAT GUIDES US"
            title="The principles we refuse to compromise."
            text="Every decision at DigentTech is filtered through these four commitments to ensure our work creates lasting value."
          />
        </div>

        <div className="studio-principles-grid">
          <article className="principle-bento-card">
            <div className="principle-card-top">
              <div className="principle-icon-circle">
                <Target size={22} />
              </div>
              <span className="principle-card-num">01</span>
            </div>
            <h3>Clarity first, always</h3>
            <p>
              A clear brief, realistic milestones, and straightforward communication.
              We speak plainly, avoid vanity jargon, and anchor every feature in
              tangible commercial outcomes.
            </p>
            <div className="principle-tag-list">
              <span>Transparent Scope</span>
              <span>Direct Roadmaps</span>
              <span>Zero Jargon</span>
            </div>
          </article>

          <article className="principle-bento-card">
            <div className="principle-card-top">
              <div className="principle-icon-circle">
                <Sparkles size={22} />
              </div>
              <span className="principle-card-num">02</span>
            </div>
            <h3>Care in every micro-detail</h3>
            <p>
              Thoughtful design and reliable engineering belong together. From
              sub-pixel SVG vector alignment to 14ms SQLite queries, we obsess over
              the subtle nuances that separate great from ordinary.
            </p>
            <div className="principle-tag-list">
              <span>Claymorphic Lighting</span>
              <span>120Hz Animations</span>
              <span>Micro-Interactions</span>
            </div>
          </article>

          <article className="principle-bento-card">
            <div className="principle-card-top">
              <div className="principle-icon-circle">
                <HeartHandshake size={22} />
              </div>
              <span className="principle-card-num">03</span>
            </div>
            <h3>People at the center</h3>
            <p>
              Build useful experiences around real human ergonomics, not theoretical
              assumptions. We test on physical phones and collect feedback from
              actual end-users throughout the journey.
            </p>
            <div className="principle-tag-list">
              <span>Thumb-Zone Ergonomics</span>
              <span>Accessibility First</span>
              <span>Real User Feedback</span>
            </div>
          </article>

          <article className="principle-bento-card">
            <div className="principle-card-top">
              <div className="principle-icon-circle">
                <Zap size={22} />
              </div>
              <span className="principle-card-num">04</span>
            </div>
            <h3>Always curious &amp; hungry</h3>
            <p>
              Keep learning, question the obvious, and find a better way. We stay on
              the bleeding edge of WebSockets, edge computing, React Server
              Components, and spatial tactile design.
            </p>
            <div className="principle-tag-list">
              <span>Edge Computing</span>
              <span>Next-Gen Frameworks</span>
              <span>Continuous Velocity</span>
            </div>
          </article>
        </div>
      </section>

      {/* 6. STUDIO EVOLUTION & MILESTONES */}
      <section className="section wrap" id="journey">
        <div className="section-top">
          <SectionHeading
            label="THE DigentTech JOURNEY"
            title="How we built a studio that ships."
            text="From an independent engineering practice to a trusted digital partner for visionary founders across three continents."
          />
        </div>

        <div className="timeline-track">
          <div className="timeline-card">
            <div className="timeline-header">
              <span className="timeline-year">2022</span>
              <span className="timeline-badge">FOUNDATION</span>
            </div>
            <h3>The Direct Studio Model</h3>
            <p>
              Vishu Awasthi founded DigentTech to dismantle the traditional agency
              structure: replacing account overhead with direct senior craftsmanship,
              modern web standards, and obsessive design execution.
            </p>
          </div>

          <div className="timeline-card">
            <div className="timeline-header">
              <span className="timeline-year">2023</span>
              <span className="timeline-badge">ENTERPRISE SCALE</span>
            </div>
            <h3>Enterprise Portals &amp; Operations Systems</h3>
            <p>
              Engineered mission-critical enterprise systems including InfraPilot CRM
              and HrMitra workforce management, serving thousands of daily active
              shifts with offline synchronization and sub-second query latency.
            </p>
          </div>

          <div className="timeline-card">
            <div className="timeline-header">
              <span className="timeline-year">2024</span>
              <span className="timeline-badge">CROSS-PLATFORM VELOCITY</span>
            </div>
            <h3>High-Performance Mobile Architectures</h3>
            <p>
              Expanded into full-cycle mobile engineering with React Native, Flutter,
              and native Swift/Kotlin bridging — guaranteeing 100% App Store and
              Google Play approvals with 60fps native feel.
            </p>
          </div>

          <div className="timeline-card">
            <div className="timeline-header">
              <span className="timeline-year">2025 &amp; BEYOND</span>
              <span className="timeline-badge">TACTILE DESIGN ERA</span>
            </div>
            <h3>Claymorphic Spatial UI &amp; Global Footprint</h3>
            <p>
              Pioneered soft-extruded claymorphic design systems with physical light
              models, partnering with founders worldwide across the United States,
              Europe, the Middle East, and India.
            </p>
          </div>
        </div>
      </section>

      {/* 7. STUDIO WORKSPACE & CRAFT STUDY */}
      <section className="section wrap">
        <div className="section-top">
          <SectionHeading
            label="STUDIO PRACTICE"
            title="From sketches to systems."
            text="Every project starts with human listening, paper wireframes, and architectural rigor before a single line of production code is committed."
          />
        </div>

        <div className="studio-workspace-showcase">
          <figure className="workspace-figure-box">
            <ThemeImage
              variant="workspace"
              alt="Illustrative design workspace with paper wireframes and blue materials"
              priority={false}
            />
            <figcaption className="workspace-caption-bar">
              <div className="workspace-caption-text">
                <strong>Intentional Discovery &amp; Tactile Prototyping</strong>
                <span>
                  Physical whiteboard mapping, design token systems, and modular
                  engineering architecture.
                </span>
              </div>
              <a className="button" href="/work">
                View our shipped work
                <ArrowUpRight size={16} />
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="section wrap faq" id="faq">
        <SectionHeading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Direct answers about partnering with us."
          text="Everything you need to know about our engagement model, communication cadence, and code delivery."
        />
        <div>
          {founderFaqs.map((faq, idx) => (
            <article key={faq.q}>
              <button
                aria-expanded={openFaq === idx}
                aria-controls={`faq-${idx}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.q}
                {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFaq === idx && <p id={`faq-${idx}`}>{faq.a}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* 9. ELEVATED STUDIO CTA */}
      <section className="cta wrap">
        <span className="eyebrow">READY TO BUILD SOMETHING EXTRAORDINARY?</span>
        <div>
          <h2>
            Let's start a
            <br />
            direct <em>conversation.</em>
          </h2>
          <a className="button" href="/contact?service=General%20inquiry">
            Schedule strategy session
            <ArrowUpRight size={18} />
          </a>
        </div>
        <p>
          An idea on a napkin. A web platform you have outgrown. A mobile app that
          needs senior craft.
          <br />
          Reach out directly to Vishu and the studio team — we respond within 24 hours.
        </p>
        <span className="cta-coordinate">
          DigentTech STUDIO / FOUNDER DIRECT ↗
        </span>
      </section>
    </>
  );
}
