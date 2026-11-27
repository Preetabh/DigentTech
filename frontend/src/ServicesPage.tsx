import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { CapabilityExplorer } from "./VisualExperience";
import "./services-page.css";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceDivisionItem {
  path: string;
  title: string;
  headline: string;
  text: string;
  icon: LucideIcon;
  tags: string[];
  items: string[];
}

interface ServicesPageProps {
  services: ServiceDivisionItem[];
}

const SLICE_ARTWORKS = [
  "/assets/projects/work-aethercore-web.webp",
  "/assets/projects/work-velocepay-mobile.webp",
  "/assets/projects/work-lumina-commerce.webp",
  "/assets/projects/work-pulsemesh-ai.webp",
];

const ENGAGEMENT_MODELS = [
  {
    id: "mvp",
    stageLabel: "Validating an MVP",
    timeline: "2 – 4 Weeks",
    title: "Focused MVP Sprint",
    desc: "Rapid architecture, interactive Figma prototype, and production core shipped to test real customer workflows.",
    bullets: [
      "Principal Architect + Senior Fullstack",
      "Typed data layer & staging preview",
      "Fixed milestone budget upfront",
    ],
  },
  {
    id: "flagship",
    stageLabel: "Core Production",
    timeline: "6 – 8 Weeks",
    title: "Core Production System",
    desc: "Multi-theme design system, resilient API contracts, payments or CRM integrations, and automated Playwright regression suites.",
    bullets: [
      "Dedicated 4-person specialist squad",
      "< 280ms global edge TTFB target",
      "30-day warranty & repo transfer",
    ],
  },
  {
    id: "enterprise",
    stageLabel: "Enterprise Squad",
    timeline: "10 – 14 Weeks+",
    title: "Embedded Atelier Squad",
    desc: "Multi-region cloud modernization, private VPC AI pipelines, offline mobile ecosystems, and continuous release cadence.",
    bullets: [
      "Principal Architect + DevOps lead",
      "Private VPC AI & OWASP hardening",
      "Weekly drops & direct Git ownership",
    ],
  },
];

const PIPELINE_STEPS = [
  {
    title: "Discovery & System Spec",
    text: "Audit bottlenecks, align business conversion targets, and freeze schema contracts before engineering starts.",
  },
  {
    title: "Design Token Foundation",
    text: "Build accessible light and dark interfaces with explicit typography scales, focus states, and interactive prototypes.",
  },
  {
    title: "Full-Stack Sprint Drops",
    text: "Deliver typed React, native mobile, or backend services in verified two-week staging increments.",
  },
  {
    title: "Verification & Full Handover",
    text: "Pass Playwright cross-browser checks, Core Web Vitals budgets, and transfer 100% clean repository ownership.",
  },
];

export function ServicesPage({ services }: ServicesPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [activeSliceIdx, setActiveSliceIdx] = useState(0);
  const [selectedStageId, setSelectedStageId] = useState("flagship");

  const webService = services[0];
  const appService = services[1];
  const growthService = services[2];
  const aiService = services[3];

  // 1. Authored GSAP + ScrollTrigger Motion Choreography
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
          ".svx-hero-line",
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            clearProps: "transform,opacity",
          }
        )
        .fromTo(
          ".svx-hero-subbar",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.48,
            clearProps: "transform,opacity",
          },
          "-=0.28"
        )
        .fromTo(
          ".svx-stage-bezel, .svx-slice",
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.54,
            stagger: 0.055,
            clearProps: "transform,opacity",
          },
          "-=0.3"
        );

      // Section headings & closing band reveal (immediateRender: false prevents offscreen jumps)
      gsap.utils.toArray<HTMLElement>(".svx-reveal", root).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }
        );
      });

      // Double-Bezel Bento staggered reveal
      const bentoShells = gsap.utils.toArray<HTMLElement>(".svx-bento-shell", root);
      if (bentoShells.length) {
        ScrollTrigger.batch(bentoShells, {
          start: "top 95%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 26, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.54,
                stagger: 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      }

      // Engagement Ledger rows stagger
      const ledgerRows = gsap.utils.toArray<HTMLElement>(".svx-ledger-shell", root);
      if (ledgerRows.length) {
        ScrollTrigger.batch(ledgerRows, {
          start: "top 95%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { x: -16, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.48,
                stagger: 0.07,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      }

      // Scrubbed Pipeline Progress Rail
      const pipeWrap = root.querySelector<HTMLElement>(".svx-pipeline-wrap");
      const pipeFill = root.querySelector<HTMLElement>(".svx-pipeline-fill");
      if (pipeWrap && pipeFill) {
        gsap.fromTo(
          pipeFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pipeWrap,
              start: "top 86%",
              end: "bottom 72%",
              scrub: 0.4,
            },
          }
        );
      }

      // Magnetic CTAs & optical subtle tilt on desktop fine-pointer devices
      if (isFinePointer) {
        gsap.utils.toArray<HTMLElement>(".svx-magnetic", root).forEach((btn) => {
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

  // 2. Smooth GSAP animation when active Horizontal Slice changes
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svx-slice.active .svx-slice-detail > *",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.34,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [activeSliceIdx]);

  // 3. Tactile highlight motion when Engagement Stage selector switches
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svx-ledger-shell.active",
        { scale: 0.99 },
        { scale: 1, duration: 0.3, ease: "power2.out", clearProps: "transform" }
      );
    }, root);

    return () => ctx.revert();
  }, [selectedStageId]);

  return (
    <div ref={rootRef} className="svx-page">
      {/* 1. WIDE EDITORIAL HERO + DOUBLE-BEZEL SLICE STAGE */}
      <section className="svx-hero" id="top">
        <div className="wrap svx-hero-top">
          <h1 className="svx-hero-h1">
            <span className="svx-hero-line">Full-stack engineering,</span>
            <span className="svx-hero-line">from architecture to scale.</span>
          </h1>

          <div className="svx-hero-subbar">
            <div>
              <p className="svx-hero-lead">
                Four specialized engineering teams under one principal-led roof—shipping edge web
                platforms, native mobile software, grounded AI pipelines, and measurable acquisition.
              </p>
              <div className="svx-hero-actions">
                <div className="svx-magnetic">
                  <a className="svx-pill-cta" href="/contact">
                    <span>Start an architectural brief</span>
                    <span className="svx-pill-icon">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
                <a className="svx-quiet-link svx-magnetic" href="#divisions">
                  <span>Explore engineering matrix</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="svx-specs-tray">
              <div className="svx-specs-ledger">
                <div className="svx-spec-cell">
                  <strong>2-Week Cadence</strong>
                  <span>Verified staging drops</span>
                </div>
                <div className="svx-spec-cell">
                  <strong>Fixed Scope</strong>
                  <span>Clear milestone pricing</span>
                </div>
                <div className="svx-spec-cell">
                  <strong>100% Ownership</strong>
                  <span>Clean repo &amp; IP transfer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Double-Bezel Interactive Slice Matrix */}
          <div className="svx-stage-bezel">
            <div className="svx-slices" role="tablist" aria-label="Practice division showcase">
              {services.map((srv, idx) => {
                const Icon = srv.icon;
                const isActive = activeSliceIdx === idx;
                const artwork = SLICE_ARTWORKS[idx % SLICE_ARTWORKS.length];
                return (
                  <div
                    key={srv.path}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    className={"svx-slice " + (isActive ? "active" : "")}
                    onClick={() => setActiveSliceIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveSliceIdx(idx);
                      }
                    }}
                  >
                    <div className="svx-slice-bg" aria-hidden="true">
                      <img src={artwork} alt="" loading={idx === 0 ? "eager" : "lazy"} />
                      <div className="svx-slice-scrim" />
                    </div>

                    <div className="svx-slice-top">
                      <div className="svx-slice-icon">
                        <Icon size={18} strokeWidth={1.6} />
                      </div>
                      <span className="svx-slice-role">
                        0{idx + 1} · {srv.tags[0]}
                      </span>
                    </div>

                    <div className="svx-slice-body">
                      <h2 className="svx-slice-title">{srv.title}</h2>

                      {isActive && (
                        <div className="svx-slice-detail">
                          <p className="svx-slice-desc">{srv.text}</p>
                          <ul className="svx-slice-points">
                            {srv.items.map((pt) => (
                              <li key={pt}>
                                <Check size={14} />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="svx-slice-foot">
                            <div className="svx-slice-tags">
                              {srv.tags.map((t) => (
                                <span key={t}>{t}</span>
                              ))}
                            </div>
                            <a
                              className="svx-slice-cta"
                              href={srv.path}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Open {srv.title.toLowerCase()}</span>
                              <span className="svx-slice-cta-dot">
                                <ArrowUpRight size={14} />
                              </span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. GAPLESS 12-COLUMN DOUBLE-BEZEL BENTO ARCHITECTURE */}
      <section className="svx-band" id="divisions">
        <div className="wrap">
          <div className="svx-band-head svx-reveal">
            <h2>Specialized divisions built as one cohesive stack.</h2>
            <p>
              Every engagement pairs bespoke product interfaces with resilient backends—so frontend,
              mobile, growth attribution, and automation share the same data contracts.
            </p>
          </div>

          <div className="svx-bento">
            {webService && (
              <div className="svx-bento-shell svx-span-7">
                <a className="svx-bento-card" href={webService.path}>
                  <div className="svx-bento-copy">
                    <span className="svx-bento-meta">Edge SSR · Headless Commerce · SaaS</span>
                    <h3>{webService.title}</h3>
                    <p>{webService.text}</p>
                    <ul className="svx-bento-list">
                      {webService.items.slice(0, 3).map((item) => (
                        <li key={item}>
                          <Check size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="svx-bento-link">
                      Explore web architecture <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="svx-bento-media">
                    <img
                      src="/assets/projects/quantos-web-terminal.png"
                      alt="DigentTech institutional web terminal"
                      loading="lazy"
                    />
                  </div>
                </a>
              </div>
            )}

            {appService && (
              <div className="svx-bento-shell svx-span-5">
                <a className="svx-bento-card" href={appService.path}>
                  <div className="svx-bento-copy">
                    <span className="svx-bento-meta">iOS &amp; Android · Offline SQLite · Biometrics</span>
                    <h3>{appService.title}</h3>
                    <p>{appService.text}</p>
                  </div>
                  <div className="svx-bento-media tall">
                    <img
                      src="/assets/projects/aurapay-mobile-app.png"
                      alt="DigentTech native mobile product suite"
                      loading="lazy"
                    />
                  </div>
                  <span className="svx-bento-link">
                    Explore mobile engineering <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            )}

            {aiService && (
              <div className="svx-bento-shell svx-span-4">
                <a className="svx-bento-card" href={aiService.path}>
                  <span className="svx-bento-meta">Multi-Agent RAG · Private VPC</span>
                  <h3>{aiService.title}</h3>
                  <p>{aiService.text}</p>
                  <ul className="svx-bento-list">
                    {aiService.items.slice(0, 3).map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="svx-bento-link">
                    Explore AI systems <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            )}

            {growthService && (
              <div className="svx-bento-shell svx-span-4">
                <a className="svx-bento-card" href={growthService.path}>
                  <span className="svx-bento-meta">Technical SEO · Server-Side CAPI</span>
                  <h3>{growthService.title}</h3>
                  <p>{growthService.text}</p>
                  <ul className="svx-bento-list">
                    {growthService.items.slice(0, 3).map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="svx-bento-link">
                    Explore growth systems <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            )}

            <div className="svx-bento-shell svx-span-4">
              <a className="svx-bento-card" href="/contact">
                <span className="svx-bento-meta">Handover Standard</span>
                <h3>Complete code &amp; IP</h3>
                <p>
                  Every engagement commits directly into your own GitHub organization with zero vendor
                  lock-in.
                </p>
                <div className="svx-ownership-table">
                  <div className="svx-own-row">
                    <span>Source Code</span>
                    <strong>100% Client Git</strong>
                  </div>
                  <div className="svx-own-row">
                    <span>Design Tokens</span>
                    <strong>Figma + CSS Variables</strong>
                  </div>
                  <div className="svx-own-row">
                    <span>Post-Launch</span>
                    <strong>30-Day Warranty SLA</strong>
                  </div>
                </div>
                <span className="svx-bento-link">
                  Request project scope <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGAGEMENT MODELS LEDGER & SCRUBBED DELIVERY PIPELINE */}
      <section className="svx-band" id="engagement-models">
        <div className="wrap">
          <div className="svx-band-head svx-reveal">
            <h2>Structured delivery models aligned to your stage.</h2>
            <p>
              Select where your product stands today to highlight the sprint duration, squad roster,
              and verification rhythm that fit best.
            </p>
          </div>

          <div className="svx-stage-bar" role="group" aria-label="Select product stage">
            {ENGAGEMENT_MODELS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={"svx-stage-pill " + (selectedStageId === m.id ? "active" : "")}
                onClick={() => setSelectedStageId(m.id)}
              >
                {m.stageLabel}
              </button>
            ))}
          </div>

          <div className="svx-ledger">
            {ENGAGEMENT_MODELS.map((model) => {
              const isActive = selectedStageId === model.id;
              return (
                <div
                  key={model.id}
                  className={"svx-ledger-shell " + (isActive ? "active" : "")}
                >
                  <article className="svx-ledger-row">
                    <div className="svx-ledger-title">
                      <small>{model.timeline}</small>
                      <h3>{model.title}</h3>
                    </div>

                    <p className="svx-ledger-desc">{model.desc}</p>

                    <ul className="svx-ledger-facts">
                      {model.bullets.map((b) => (
                        <li key={b}>
                          <Check size={14} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      className="svx-ledger-action"
                      href={
                        "/contact?brief=" +
                        encodeURIComponent(`Interested in ${model.title} (${model.timeline})`)
                      }
                    >
                      <span>Scope this model</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="svx-pipeline-wrap">
            <div className="svx-pipeline-track" aria-hidden="true">
              <div className="svx-pipeline-fill" />
            </div>
            <div className="svx-pipeline-grid">
              {PIPELINE_STEPS.map((step) => (
                <div className="svx-pipe-step" key={step.title}>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONNECTED INTERACTIVE STUDY */}
      <CapabilityExplorer />

      {/* 5. ARCHITECTURAL CLOSING BAND */}
      <section className="svx-closing">
        <div className="wrap svx-closing-inner svx-reveal">
          <h2>Bring your technical requirements directly to our principal desk.</h2>
          <div className="svx-closing-side">
            <p>
              Share your target launch window, existing codebase links, or product bottlenecks. We
              respond within 24 hours with clear architectural options and milestone pricing.
            </p>
            <div className="svx-closing-actions">
              <div className="svx-magnetic">
                <a className="svx-pill-cta" href="/contact">
                  <span>Start architectural brief</span>
                  <span className="svx-pill-icon">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
              <a className="svx-quiet-link svx-magnetic" href="/work">
                <span>Inspect shipped work</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
