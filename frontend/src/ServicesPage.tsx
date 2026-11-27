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

const ENGAGEMENT_MODELS = [
  {
    id: "mvp",
    stageLabel: "Validating an MVP",
    code: "MODEL 01 · VALIDATION",
    duration: "2 – 4 Weeks",
    title: "Focused MVP Sprint",
    desc: "Rapid architecture, interactive Figma prototype, and production core built to launch cleanly with real users and investor clarity.",
    bullets: [
      "Principal Architect + Senior Fullstack",
      "Clickable prototype & typed data layer",
      "Continuous preview deployments",
    ],
  },
  {
    id: "flagship",
    stageLabel: "Launching Core Flagship",
    code: "MODEL 02 · FLAGSHIP",
    duration: "6 – 8 Weeks",
    title: "Core Production System",
    desc: "Complete multi-theme design system, high-concurrency backend APIs, payments/CRM integrations, and automated Playwright E2E checks.",
    bullets: [
      "Dedicated 4-person specialist squad",
      "< 280ms global TTFB edge architecture",
      "30-day warranty & full team handover",
    ],
  },
  {
    id: "enterprise",
    stageLabel: "Scaling Enterprise Stack",
    code: "MODEL 03 · ENTERPRISE",
    duration: "10 – 14 Weeks+",
    title: "Embedded Atelier Squad",
    desc: "Multi-region cloud modernization, custom RAG/agent AI pipelines, offline mobile ecosystems, and continuous sprint velocity.",
    bullets: [
      "Principal Architect + DevOps automation",
      "Private VPC AI & strict security gates",
      "Weekly executive releases & Git ownership",
    ],
  },
];

export function ServicesPage({ services }: ServicesPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  const [activeDivIdx, setActiveDivIdx] = useState(0);
  const [selectedStageId, setSelectedStageId] = useState("flagship");

  const activeService = services[activeDivIdx] || services[0];
  const ActiveIcon = activeService?.icon;

  // 1. Full-page GSAP + ScrollTrigger Choreography
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
          ".sv-status-pill",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, clearProps: "transform,opacity" }
        )
        .fromTo(
          ".sv-hero-line",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.56,
            stagger: 0.09,
            clearProps: "transform,opacity",
          },
          "-=0.2"
        )
        .fromTo(
          ".sv-hero-lead, .sv-hero-actions, .sv-highlight-pill",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.48,
            stagger: 0.06,
            clearProps: "transform,opacity",
          },
          "-=0.35"
        )
        .fromTo(
          ".sv-console",
          { y: 24, scale: 0.97, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            clearProps: "transform,opacity",
          },
          "-=0.48"
        );

      // Ambient orb drift (GPU-only)
      gsap.to(".sv-orb.one", {
        x: -24,
        y: 18,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".sv-orb.two", {
        x: 20,
        y: -16,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll-triggered headings
      gsap.utils.toArray<HTMLElement>(".sv-reveal-head", root).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.52,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          }
        );
      });

      // Batch card grids cleanly without trapping offscreen content
      [".sv-division-card", ".sv-eng-card"].forEach((selector) => {
        const cards = gsap.utils.toArray<HTMLElement>(selector, root);
        if (!cards.length) return;
        ScrollTrigger.batch(cards, {
          start: "top 95%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 26, scale: 0.98, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.52,
                stagger: 0.065,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      });

      // CTA Reveal
      const ctaBox = root.querySelector<HTMLElement>(".sv-cta-box");
      if (ctaBox) {
        gsap.fromTo(
          ctaBox,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: ctaBox, start: "top 94%", once: true },
          }
        );
      }

      // Desktop fine-pointer spotlight & magnetic buttons + subtle console tilt
      if (isFinePointer) {
        gsap.utils.toArray<HTMLElement>(".sv-spotlight", root).forEach((card) => {
          const onMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mx", `${px.toFixed(1)}%`);
            card.style.setProperty("--my", `${py.toFixed(1)}%`);
          };
          card.addEventListener("pointermove", onMove);
          cleanupFns.push(() => card.removeEventListener("pointermove", onMove));
        });

        gsap.utils.toArray<HTMLElement>(".sv-magnetic", root).forEach((btn) => {
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
            gsap.to(btn, { x: 0, y: 0, duration: 0.48, ease: "elastic.out(1, 0.55)" });
          };
          btn.addEventListener("pointermove", onMove);
          btn.addEventListener("pointerleave", onLeave);
          cleanupFns.push(() => {
            btn.removeEventListener("pointermove", onMove);
            btn.removeEventListener("pointerleave", onLeave);
          });
        });

        const consoleEl = consoleRef.current;
        if (consoleEl) {
          const rxTo = gsap.quickTo(consoleEl, "rotationY", { duration: 0.45, ease: "power2.out" });
          const ryTo = gsap.quickTo(consoleEl, "rotationX", { duration: 0.45, ease: "power2.out" });
          const onMove = (e: PointerEvent) => {
            const r = consoleEl.getBoundingClientRect();
            rxTo((((e.clientX - r.left) / r.width) - 0.5) * 3.8);
            ryTo(-(((e.clientY - r.top) / r.height) - 0.5) * 3.8);
          };
          const onLeave = () => {
            rxTo(0);
            ryTo(0);
          };
          consoleEl.addEventListener("pointermove", onMove);
          consoleEl.addEventListener("pointerleave", onLeave);
          cleanupFns.push(() => {
            consoleEl.removeEventListener("pointermove", onMove);
            consoleEl.removeEventListener("pointerleave", onLeave);
          });
        }
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

  // 2. Smooth GSAP transition when Hero Practice Console tab changes
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sv-console-body > *",
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
  }, [activeDivIdx]);

  // 3. Highlight bounce when Engagement Stage selector changes
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sv-eng-card.highlighted",
        { scale: 0.985 },
        { scale: 1, duration: 0.35, ease: "back.out(1.6)", clearProps: "transform" }
      );
    }, root);

    return () => ctx.revert();
  }, [selectedStageId]);

  return (
    <div ref={rootRef} className="sv-page">
      {/* 1. SPLIT PRACTICE HERO + INTERACTIVE CONSOLE */}
      <section className="sv-hero-stage" id="top">
        <div className="sv-hero-grid" aria-hidden="true" />
        <div className="sv-aurora" aria-hidden="true">
          <div className="sv-orb one" />
          <div className="sv-orb two" />
        </div>

        <div className="wrap sv-split">
          <div className="sv-hero-copy">
            <span className="sv-status-pill">
              <span className="sv-live-dot" />
              PRACTICE DIVISIONS · DIGENTTECH ATELIER
            </span>

            <h1 className="sv-hero-h1">
              <span className="sv-hero-line">Full-stack engineering,</span>
              <span className="sv-hero-line">
                from <em>architecture</em> to scale.
              </span>
            </h1>

            <p className="sv-hero-lead">
              Four specialized engineering divisions operating under one principal-led roof—delivering
              sub-300ms web platforms, offline-first mobile apps, private AI workflows, and
              measurable growth.
            </p>

            <div className="sv-hero-actions">
              <div className="sv-magnetic">
                <a className="button" href="/contact">
                  Discuss your project <ArrowUpRight size={18} />
                </a>
              </div>
              <a className="text-link sv-magnetic" href="#divisions">
                Explore divisions <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="sv-hero-highlights">
              <span className="sv-highlight-pill">
                <Check size={13} /> 2-Week Verified Staging Sprints
              </span>
              <span className="sv-highlight-pill">
                <Check size={13} /> Fixed Milestone Budgets
              </span>
              <span className="sv-highlight-pill">
                <Check size={13} /> 100% Repository &amp; IP Ownership
              </span>
            </div>
          </div>

          {activeService && (
            <div className="sv-console" ref={consoleRef}>
              <div className="sv-console-bar">
                <div className="sv-console-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="sv-console-id">DIVISION // ARCHITECTURE SPEC</span>
                <span className="sv-console-sla">0{activeDivIdx + 1} / 0{services.length}</span>
              </div>

              <div className="sv-console-tabs" role="tablist" aria-label="Inspect engineering divisions">
                {services.map((srv, idx) => {
                  const shortLabel = srv.title.split(" ")[0];
                  return (
                    <button
                      key={srv.path}
                      type="button"
                      role="tab"
                      aria-selected={activeDivIdx === idx}
                      className={"sv-console-tab " + (activeDivIdx === idx ? "active" : "")}
                      onClick={() => setActiveDivIdx(idx)}
                    >
                      <span>0{idx + 1}</span>
                      <span>{shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              <div className="sv-console-body">
                <div className="sv-console-head">
                  <div>
                    <span className="eyebrow">{activeService.title.toUpperCase()}</span>
                    <h2>{activeService.headline}</h2>
                  </div>
                  {ActiveIcon && (
                    <div className="sv-console-icon">
                      <ActiveIcon size={22} strokeWidth={1.6} />
                    </div>
                  )}
                </div>

                <p className="sv-console-desc">{activeService.text}</p>

                <ul className="sv-console-items">
                  {activeService.items.map((item) => (
                    <li key={item}>
                      <Check size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="sv-console-footer">
                  <div className="sv-console-tags">
                    {activeService.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a className="text-link" href={activeService.path}>
                    Explore {activeService.title.toLowerCase()} <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. ENGAGEMENT MODELS + STAGE SELECTOR */}
      <section className="sv-section" id="engagement-models">
        <div className="wrap">
          <div className="sv-section-top sv-reveal-head">
            <div>
              <span className="eyebrow">ENGAGEMENT MODELS</span>
              <h2>Structured delivery built around your stage.</h2>
            </div>
            <p>
              Select your current stage to highlight the sprint cadence, squad composition, and
              deliverable model tailored to your roadmap.
            </p>
          </div>

          <div className="sv-stage-filter" role="group" aria-label="Select company stage">
            {ENGAGEMENT_MODELS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={"sv-stage-btn " + (selectedStageId === m.id ? "active" : "")}
                onClick={() => setSelectedStageId(m.id)}
              >
                {m.stageLabel}
              </button>
            ))}
          </div>

          <div className="sv-eng-grid">
            {ENGAGEMENT_MODELS.map((model) => {
              const isHighlighted = selectedStageId === model.id;
              return (
                <article
                  key={model.id}
                  className={
                    "sv-eng-card sv-spotlight " + (isHighlighted ? "highlighted" : "")
                  }
                >
                  <div className="sv-eng-head">
                    <span className="sv-eng-code">{model.code}</span>
                    <span className="sv-eng-duration">{model.duration}</span>
                  </div>
                  <h3>{model.title}</h3>
                  <p>{model.desc}</p>
                  <ul className="sv-eng-list">
                    {model.bullets.map((b) => (
                      <li key={b}>
                        <Check size={14} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    className="sv-eng-cta"
                    href={"/contact?brief=" + encodeURIComponent(`Interested in ${model.title} (${model.duration})`)}
                  >
                    Scope this model <ArrowUpRight size={15} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CORE ENGINEERING DIVISIONS GRID */}
      <section className="sv-section" id="divisions">
        <div className="wrap">
          <div className="sv-section-top sv-reveal-head">
            <div>
              <span className="eyebrow">CORE ENGINEERING PILLARS</span>
              <h2>Four specialized divisions. One unified standard.</h2>
            </div>
            <p>
              Deep technical execution across full-stack web apps, native mobile software,
              attribution-first growth, and grounded enterprise AI.
            </p>
          </div>

          <div className="sv-divisions-grid">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <a className="sv-division-card sv-spotlight" href={s.path} key={s.path}>
                  <div className="sv-div-top">
                    <div className="sv-div-icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="sv-div-num">0{idx + 1}</span>
                  </div>
                  <span className="sv-div-kicker">{s.tags.join(" · ")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul className="sv-div-list">
                    {s.items.slice(0, 3).map((it) => (
                      <li key={it}>
                        <Check size={14} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="sv-div-bottom">
                    <span>Open {s.title} deep-dive</span>
                    <ArrowUpRight size={18} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CONNECTED CAPABILITIES INTERACTIVE EXPLORER */}
      <CapabilityExplorer />

      {/* 5. CTA CONVERSION BAND */}
      <section className="sv-cta-panel">
        <div className="wrap">
          <div className="sv-cta-box sv-spotlight">
            <div className="sv-cta-copy">
              <span className="eyebrow">READY TO ARCHITECT</span>
              <h2>Need a multi-disciplinary squad for your next release?</h2>
              <p>
                Tell us what you are building and we will map a clear milestone plan, recommended
                architecture, and fixed sprint budget within 24 hours.
              </p>
            </div>
            <div className="sv-cta-actions">
              <div className="sv-magnetic">
                <a className="button" href="/contact">
                  Start your architectural brief <ArrowUpRight size={18} />
                </a>
              </div>
              <a className="text-link sv-magnetic" href="/work">
                Inspect shipped work <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
