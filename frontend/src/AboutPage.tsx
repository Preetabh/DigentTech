import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Mail,
  MapPin,
  Minus,
} from "lucide-react";
import { ThemeImage } from "./VisualExperience";
import "./about-page.css";

gsap.registerPlugin(ScrollTrigger);

const COMPARISON_DATA = [
  {
    dimension: "Senior Execution",
    agency: "Junior developers assigned once the contract closes",
    studio: "Direct principal architect and founder craftsmanship in every sprint",
  },
  {
    dimension: "Communication Layers",
    agency: "3–5 layers of account executives and PM ticket relays",
    studio: "Zero middlemen — direct engineering dialogue in shared channels",
  },
  {
    dimension: "Release Visibility",
    agency: "Month-long silences before the first clickable preview",
    studio: "Weekly staging drops and TestFlight builds on physical hardware",
  },
  {
    dimension: "Scope & Billing",
    agency: "Ambiguous hourly burn with recurring change-order friction",
    studio: "Fixed-milestone budgets tied to signed acceptance specs",
  },
  {
    dimension: "IP & Ownership",
    agency: "Vendor lock-in or deferred repository access at launch",
    studio: "100% clean TypeScript repo, Figma tokens, and cloud ownership on day one",
  },
];

const JOURNEY_STEPS = [
  {
    year: "2022 · Foundation",
    title: "The Direct Studio Model",
    desc: "Vishu Awasthi founded DigentTech to eliminate agency account bloat and put senior builders directly at the product table.",
  },
  {
    year: "2023 · Enterprise Systems",
    title: "Production CRM & Workforce Portals",
    desc: "Shipped internal operations software including InfraPilot and HrMitra with multi-tenant security and low-latency SQL backends.",
  },
  {
    year: "2024 · Mobile Architecture",
    title: "Cross-Platform 60fps Engineering",
    desc: "Expanded into React Native, Flutter, offline SQLite synchronization, biometric key vaults, and verified App Store shipping.",
  },
  {
    year: "2025+ · Multi-Theme & AI",
    title: "Private RAG & Tactile Systems",
    desc: "Engineered multi-agent workflows, grounded VPC RAG pipelines, and dual Light/Dark design token systems globally.",
  },
];

const FOUNDER_FAQS = [
  {
    q: "Do I work directly with Vishu or an outsourced account team?",
    a: "You work directly with Vishu and our core senior specialists. There are zero account managers or sales middlemen—every milestone, architecture schema, and design sprint is guided by engineering leadership.",
  },
  {
    q: "What stage companies does DigentTech partner with?",
    a: "We work with technical founders launching category-defining products, scaling teams modernizing legacy platforms, and operating businesses replacing disconnected tools with custom software.",
  },
  {
    q: "How quickly can a new engagement start?",
    a: "We cap active engagements at two to three builds per quarter so every project retains senior focus. Discovery and architecture specs typically kick off within 5 to 10 business days.",
  },
  {
    q: "Who owns the code, design assets, and cloud infrastructure?",
    a: "You retain 100% full ownership from day one. All repositories, Figma components, database schemas, and cloud deployments live directly under your organization's accounts.",
  },
];

export function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [activeJump, setActiveJump] = useState<"founder" | "advantage" | "principles" | "journey">("founder");
  const [storyTab, setStoryTab] = useState<"vision" | "standard" | "partnership">("vision");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("hr.digenttech@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const scrollToSection = (sectionId: "founder" | "advantage" | "principles" | "journey") => {
    setActiveJump(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. Authored GSAP + ScrollTrigger Choreography
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: fine)").matches;

    if (prefersReduced) return;

    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          ".abx-hero-line",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.58,
            stagger: 0.09,
            clearProps: "transform,opacity",
          }
        )
        .fromTo(
          ".abx-hero-subbar, .abx-jump-bar",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.46,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          "-=0.25"
        );

      // Section reveals (immediateRender: false keeps offscreen content safe on hash jumps)
      gsap.utils.toArray<HTMLElement>(".abx-reveal", root).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.52,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }
        );
      });

      // Bento & Timeline stagger batches
      [".abx-bento-shell", ".abx-timeline-grid .abx-bezel", ".abx-faq-item"].forEach((sel) => {
        const items = gsap.utils.toArray<HTMLElement>(sel, root);
        if (!items.length) return;
        ScrollTrigger.batch(items, {
          start: "top 95%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 22, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.48,
                stagger: 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      });

      // Scrubbed Studio Journey Spine
      const timeWrap = root.querySelector<HTMLElement>("#journey");
      const timeFill = root.querySelector<HTMLElement>(".abx-timeline-fill");
      if (timeWrap && timeFill) {
        gsap.fromTo(
          timeFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timeWrap,
              start: "top 82%",
              end: "bottom 75%",
              scrub: 0.35,
            },
          }
        );
      }

      // Workspace Image gentle scroll parallax
      const wsImg = root.querySelector<HTMLElement>(".abx-workspace-frame img");
      if (wsImg) {
        gsap.fromTo(
          wsImg,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".abx-workspace-frame",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }

      // Magnetic CTAs (fine pointer only)
      if (isFinePointer) {
        gsap.utils.toArray<HTMLElement>(".abx-magnetic", root).forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.28, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.28, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const rect = btn.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
            const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.14;
            xTo(Math.max(-8, Math.min(8, dx)));
            yTo(Math.max(-8, Math.min(8, dy)));
          };
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.55)" });
          };
          btn.addEventListener("pointermove", onMove);
          btn.addEventListener("pointerleave", onLeave);
          cleanupFns.push(() => {
            btn.removeEventListener("pointermove", onMove);
            btn.removeEventListener("pointerleave", onLeave);
          });
        });
      }
    }, root);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  // 2. Smooth GSAP transition when Founder narrative tab switches
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".abx-story-panel > *",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [storyTab]);

  // Keep ScrollTrigger geometry accurate when FAQ opens/closes
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [openFaq]);

  return (
    <div ref={rootRef} className="abx-page">
      {/* 1. EDITORIAL STUDIO HERO */}
      <section className="abx-hero" id="top">
        <div className="wrap abx-hero-top">
          <h1 className="abx-hero-h1">
            <span className="abx-hero-line">Senior craft. Zero layers.</span>
            <span className="abx-hero-line">Digital flagships built to endure</span>
          </h1>

          <div className="abx-hero-subbar">
            <div>
              <p className="abx-hero-lead">
                DigentTech is an independent software and interface studio founded to replace
                bloated agency relay chains with direct principal engineering and lasting product
                craft.
              </p>
              <div className="abx-hero-actions">
                <div className="abx-magnetic">
                  <a className="abx-pill-cta" href="/contact?service=General%20inquiry">
                    <span>Schedule founder conversation</span>
                    <span className="abx-pill-icon">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
                <a className="abx-quiet-link abx-magnetic" href="/work">
                  <span>Inspect shipped systems</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="abx-specs-tray">
              <div className="abx-specs-grid">
                <div className="abx-spec-cell">
                  <strong>Est. 2022</strong>
                  <span>Principal-led studio</span>
                </div>
                <div className="abx-spec-cell">
                  <strong>2–3 Builds / Qtr</strong>
                  <span>Capped partner roster</span>
                </div>
                <div className="abx-spec-cell">
                  <strong>100% Ownership</strong>
                  <span>Client Git &amp; IP rights</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="abx-jump-bar" aria-label="Jump to About sections">
            {(
              [
                ["founder", "Founder Profile"],
                ["advantage", "Studio Difference"],
                ["principles", "Principles & Craft"],
                ["journey", "Studio Journey"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={"abx-jump-btn " + (activeJump === id ? "active" : "")}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* 2. FOUNDER MONOGRAPH DOUBLE-BEZEL SPOTLIGHT */}
      <section className="abx-band" id="founder">
        <div className="wrap">
          <div className="abx-bezel abx-reveal">
            <div className="abx-bezel-core abx-founder-core">
              {/* Left: Portrait & Direct Connect */}
              <div className="abx-founder-aside">
                <div className="abx-portrait-wrap">
                  <img
                    src="/assets/founder.png"
                    alt="Vishu Awasthi, Founder and Principal Strategist of DigentTech"
                    loading="eager"
                  />
                </div>

                <div className="abx-founder-meta-card">
                  <div className="abx-founder-name">
                    <strong>Vishu Awasthi</strong>
                    <span>Founder &amp; Architect</span>
                  </div>

                  <button
                    type="button"
                    className="abx-connect-row"
                    onClick={handleCopyEmail}
                    aria-label="Copy founder email"
                  >
                    <span className="abx-connect-left">
                      <Mail size={14} />
                      <span>hr.digenttech@gmail.com</span>
                    </span>
                    {copiedEmail ? (
                      <span className="abx-copied-tag">Copied!</span>
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>

                  <a className="abx-connect-row" href="/contact?service=General%20inquiry">
                    <span className="abx-connect-left">
                      <Calendar size={14} />
                      <span>Book 1-on-1 Strategy Call</span>
                    </span>
                    <ArrowUpRight size={14} />
                  </a>

                  <div className="abx-loc-note">
                    <MapPin size={13} />
                    <span>Barabanki &amp; Lucknow, India · Global remote</span>
                  </div>
                </div>
              </div>

              {/* Right: Leadership Philosophy & Commitments */}
              <div className="abx-founder-main">
                <div className="abx-founder-header">
                  <h2>Meet Vishu Awasthi.</h2>
                  <div className="abx-founder-sub">
                    Founder &amp; Principal Strategist · Direct Architecture &amp; Product Delivery
                  </div>
                </div>

                <div className="abx-story-tabs" role="tablist" aria-label="Founder narrative">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={storyTab === "vision"}
                    className={"abx-story-tab " + (storyTab === "vision" ? "active" : "")}
                    onClick={() => setStoryTab("vision")}
                  >
                    The Vision
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={storyTab === "standard"}
                    className={"abx-story-tab " + (storyTab === "standard" ? "active" : "")}
                    onClick={() => setStoryTab("standard")}
                  >
                    Engineering Standard
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={storyTab === "partnership"}
                    className={"abx-story-tab " + (storyTab === "partnership" ? "active" : "")}
                    onClick={() => setStoryTab("partnership")}
                  >
                    Direct Partnership
                  </button>
                </div>

                <blockquote className="abx-quote">
                  <p>
                    “Great software isn&apos;t manufactured on corporate assembly lines with five
                    layers of account managers. It is built when senior engineering and commercial
                    strategy sit at the exact same desk.”
                  </p>
                  <cite>— Vishu Awasthi · Founder, DigentTech</cite>
                </blockquote>

                <div className="abx-story-panel">
                  {storyTab === "vision" && (
                    <>
                      <p>
                        DigentTech was created as an antidote to bloated software agencies—uniting
                        commercial direction, systematic interface taste, and hardened engineering
                        without middleman telephone games.
                      </p>
                      <p>
                        Every product is shaped around measurable customer clarity, fast response
                        budgets, and codebases your internal team enjoys owning long after launch.
                      </p>
                    </>
                  )}
                  {storyTab === "standard" && (
                    <>
                      <p>
                        We treat software as durable physical architecture: strict TypeScript
                        contracts, indexed SQL databases, sub-300ms edge routing, and accessible
                        Light &amp; Dark design token systems.
                      </p>
                      <p>
                        No disposable starter kits or brittle plugins. Systems ship automated with
                        Playwright verification and clean module boundaries that scale cleanly.
                      </p>
                    </>
                  )}
                  {storyTab === "partnership" && (
                    <>
                      <p>
                        You work side-by-side with Vishu and senior engineers inside shared channels.
                        Decisions happen directly with the builders writing the code.
                      </p>
                      <p>
                        Weekly preview links and iOS TestFlight hardware drops keep your team in
                        complete control of every sprint milestone before final sign-off.
                      </p>
                    </>
                  )}
                </div>

                <div className="abx-commitments">
                  <div className="abx-commit-item">
                    <Check size={15} />
                    <div>
                      <strong>Zero Technical Debt</strong>
                      <span>Strict TypeScript contracts &amp; documented schemas</span>
                    </div>
                  </div>
                  <div className="abx-commit-item">
                    <Check size={15} />
                    <div>
                      <strong>WCAG AA+ Contrast</strong>
                      <span>Accessible Light &amp; Dark systems built intentionally</span>
                    </div>
                  </div>
                  <div className="abx-commit-item">
                    <Check size={15} />
                    <div>
                      <strong>Weekly Staging Drops</strong>
                      <span>Live preview URLs and device builds every sprint</span>
                    </div>
                  </div>
                  <div className="abx-commit-item">
                    <Check size={15} />
                    <div>
                      <strong>100% Client IP Rights</strong>
                      <span>Direct commits inside your own Git organization</span>
                    </div>
                  </div>
                </div>

                <div className="abx-founder-actions">
                  <div className="abx-magnetic">
                    <a className="abx-pill-cta" href="/contact?service=General%20inquiry">
                      <span>Schedule 1-on-1 with Vishu</span>
                      <span className="abx-pill-icon">
                        <ArrowUpRight size={16} />
                      </span>
                    </a>
                  </div>
                  <a className="abx-quiet-link abx-magnetic" href="/careers">
                    <span>Explore studio careers</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO ADVANTAGE COMPARISON LEDGER */}
      <section className="abx-band" id="advantage">
        <div className="wrap">
          <div className="abx-band-head abx-reveal">
            <h2>Why founders choose a direct studio over layered agencies.</h2>
            <p>
              We removed the account overhead so every rupee and sprint goes directly into senior
              design and production code.
            </p>
          </div>

          <div className="abx-bezel abx-reveal">
            <div className="abx-bezel-core abx-compare-table">
              <div className="abx-compare-head">
                <div>Dimension</div>
                <div>Typical Outsourcing Agency</div>
                <div className="studio-col">DigentTech Direct Studio</div>
              </div>

              {COMPARISON_DATA.map((row) => (
                <div className="abx-compare-row" key={row.dimension}>
                  <div className="abx-compare-dim">{row.dimension}</div>
                  <div className="abx-compare-cell">
                    <Minus size={15} />
                    <span>{row.agency}</span>
                  </div>
                  <div className="abx-compare-cell studio">
                    <Check size={15} color="var(--abx-emerald)" />
                    <span>{row.studio}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 12-COLUMN PRINCIPLES & STUDIO WORKSPACE BENTO */}
      <section className="abx-band" id="principles">
        <div className="wrap">
          <div className="abx-band-head abx-reveal">
            <h2>Principles we refuse to compromise across any sprint.</h2>
            <p>
              Every interface and backend commit is reviewed against four engineering standards
              before reaching staging.
            </p>
          </div>

          <div className="abx-bento">
            <div className="abx-bento-shell abx-span-7">
              <div className="abx-bento-core">
                <span className="abx-bento-kicker">Studio Practice · From Sketches to Production</span>
                <h3>Intentional discovery paired with live architectural execution</h3>
                <p>
                  Every engagement begins with paper flow mapping, semantic design tokens, and
                  documented entity models before writing UI or API code.
                </p>
                <div className="abx-workspace-frame">
                  <ThemeImage
                    variant="workspace"
                    alt="DigentTech design systems and architectural workspace"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            <div className="abx-bento-shell abx-span-5">
              <div className="abx-bento-core">
                <span className="abx-bento-kicker">Operational Transparency</span>
                <h3>Clarity first, always</h3>
                <p>
                  A sharp brief, fixed sprint deliverables, and plain-spoken weekly demos anchored
                  strictly in real product progress instead of jargon.
                </p>
              </div>
            </div>

            <div className="abx-bento-shell abx-span-4">
              <div className="abx-bento-core">
                <span className="abx-bento-kicker">Interface Rigor</span>
                <h3>Care in every micro-detail</h3>
                <p>
                  From sub-pixel SVG alignment and Light/Dark WCAG contrast to indexed SQL latency,
                  sweating the details keeps products effortless.
                </p>
              </div>
            </div>

            <div className="abx-bento-shell abx-span-4">
              <div className="abx-bento-core">
                <span className="abx-bento-kicker">Human Ergonomics</span>
                <h3>Real device validation</h3>
                <p>
                  We test flows on real iOS, Android, and desktop viewports for keyboard focus,
                  thumb ergonomics, and reduced-motion accessibility.
                </p>
              </div>
            </div>

            <div className="abx-bento-shell abx-span-4">
              <div className="abx-bento-core">
                <span className="abx-bento-kicker">Modern Stack</span>
                <h3>Always shipping forward</h3>
                <p>
                  Continuous mastery across edge rendering, TypeScript contracts, WebSockets, and
                  private enterprise AI architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDIO JOURNEY SCRUBBED TIMELINE */}
      <section className="abx-band" id="journey">
        <div className="wrap">
          <div className="abx-band-head abx-reveal">
            <h2>How we built an independent studio that ships.</h2>
            <p>
              Steadily expanding from web architecture to full-stack mobile software and private
              enterprise automation.
            </p>
          </div>

          <div className="abx-timeline-track" aria-hidden="true">
            <div className="abx-timeline-fill" />
          </div>

          <div className="abx-timeline-grid">
            {JOURNEY_STEPS.map((step) => (
              <div className="abx-bezel" key={step.year}>
                <article className="abx-bezel-core abx-time-core">
                  <span className="abx-time-year">{step.year}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNER FAQ */}
      <section className="abx-band" id="faq">
        <div className="wrap">
          <div className="abx-band-head abx-reveal">
            <h2>Direct answers about partnering with DigentTech.</h2>
            <p>Clear policies on principal involvement, kickoff readiness, and codebase ownership.</p>
          </div>

          <div className="abx-faq-list">
            {FOUNDER_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <article className={"abx-faq-item " + (isOpen ? "open" : "")} key={faq.q}>
                  <button
                    type="button"
                    className="abx-faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={`abx-faq-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <p id={`abx-faq-${idx}`} className="abx-faq-answer">
                      {faq.a}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURAL CLOSING BAND */}
      <section className="abx-closing">
        <div className="wrap abx-closing-inner abx-reveal">
          <h2>Bring your next flagship directly to Vishu and the engineering desk.</h2>
          <div className="abx-closing-side">
            <p>
              Whether validating an early concept or modernizing an operational platform—start with
              a clear brief and expect an engineering response within 24 hours.
            </p>
            <div className="abx-closing-actions">
              <div className="abx-magnetic">
                <a className="abx-pill-cta" href="/contact?service=General%20inquiry">
                  <span>Schedule strategy session</span>
                  <span className="abx-pill-icon">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
              <a className="abx-quiet-link abx-magnetic" href="/services">
                <span>Explore capabilities</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
