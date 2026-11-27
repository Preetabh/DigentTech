import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, isLowPowerDevice } from "./utils/gsapConfig";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
} from "lucide-react";
import CircularCarousel, {
  type CircularCarouselHandle,
  type CircularCarouselItem,
} from "./CircularCarousel";
import { WorkCaseStudyModal } from "./components/WorkCaseStudyModal";
import {
  CapabilityTechIcon,
  CapabilityTopologySvg,
  WorkHeroDisciplineMap,
  WorkHeroNetworkCanvas,
} from "./components/WorkVisuals";
import {
  DEVELOPMENT_PROCESS_STAGES,
  ENGINEERING_CAPABILITIES,
  getWorkOverviewStats,
  WORK_PROJECTS,
  type WorkCategoryId,
  type WorkProject,
} from "./data/workPortfolio";
import "./work-page.css";

gsap.registerPlugin(ScrollTrigger);

interface WorkPageProps {
  initialProjectId?: string;
}

const CATEGORY_TABS: { id: "all" | WorkCategoryId; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "web", label: "Web Platforms" },
  { id: "mobile", label: "Mobile Applications" },
  { id: "ai", label: "AI & Automation" },
  { id: "design", label: "Design Systems" },
];

export function WorkPage({ initialProjectId }: WorkPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLElement>(null);
  const carouselCtrlRef = useRef<CircularCarouselHandle | null>(null);
  const orbitStageRef = useRef<HTMLDivElement>(null);
  const orbitResultRef = useRef<HTMLSpanElement>(null);
  const orbitInspectLabelRef = useRef<HTMLSpanElement>(null);
  const capInfoRef = useRef<HTMLDivElement>(null);
  const procInspectorRef = useRef<HTMLDivElement>(null);
  const categoryMounted = useRef(false);
  const orbitIdxMounted = useRef(false);
  const capMounted = useRef(false);
  const stageMounted = useRef(false);

  const [category, setCategory] = useState<"all" | WorkCategoryId>("all");
  const [activeOrbitIdx, setActiveOrbitIdx] = useState(0);
  const [activeCapId, setActiveCapId] = useState(ENGINEERING_CAPABILITIES[0].id);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light",
  );

  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(() => {
    const slug =
      initialProjectId ||
      (typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("project")
        : null);
    if (!slug) return null;
    return WORK_PROJECTS.find((p) => p.id === slug) ?? null;
  });

  useEffect(() => {
    const syncTheme = () =>
      setIsLight(document.documentElement.dataset.theme === "light");
    syncTheme();
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  const stats = useMemo(() => getWorkOverviewStats(WORK_PROJECTS), []);

  const filteredProjects = useMemo(() => {
    return category === "all"
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((project) => project.category === category);
  }, [category]);

  useEffect(() => {
    setActiveOrbitIdx(0);
  }, [category]);

  const carouselItems: CircularCarouselItem[] = useMemo(
    () =>
      filteredProjects.map((p) => ({
        src: p.image,
        alt: p.alt,
        title: p.name,
        subtitle: `${p.categoryLabel} · ${p.industry}`,
      })),
    [filteredProjects],
  );

  const activeOrbitProject =
    filteredProjects[activeOrbitIdx] ?? filteredProjects[0] ?? null;

  // Keep ?project= query parameter cleanly synced for deep links
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (selectedProject) {
      url.searchParams.set("project", selectedProject.id);
    } else {
      url.searchParams.delete("project");
    }
    const nextUrl =
      url.pathname + (url.search ? url.search : "") + (url.hash ? url.hash : "");
    window.history.replaceState({}, "", nextUrl);
  }, [selectedProject]);

  // GSAP + ScrollTrigger choreography (gsap.matchMedia + compositor transforms + SVG draws)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") {
      return;
    }

    const cleanups: Array<() => void> = [];
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        finePointer: "(pointer: fine)",
      },
      (context) => {
        const { reduceMotion, finePointer } = context.conditions ?? {};
        if (reduceMotion) return;
        const lowPower = isLowPowerDevice();

        // 1. Hero architectural entrance (pure GPU transform + autoAlpha) + SVG connector stroke draw
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out", force3D: true } });
        heroTl
          .fromTo(
            ".wk-hero-status",
            { y: -12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, clearProps: "transform,opacity" },
            0,
          )
          .fromTo(
            ".wk-hero-line",
            { y: 24, opacity: 0.1 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.08,
              clearProps: "transform,opacity",
            },
            0.06,
          )
          .fromTo(
            ".wk-hero-intro",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.62, clearProps: "transform,opacity" },
            0.22,
          )
          .fromTo(
            ".wk-hero-ctas",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, clearProps: "transform,opacity" },
            0.3,
          )
          .fromTo(
            ".wk-hero-blueprint",
            { x: 24, scale: 0.985, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, duration: 0.72, clearProps: "transform,opacity" },
            0.16,
          )
          .fromTo(
            ".wk-bp-node",
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.44, stagger: 0.055, clearProps: "transform,opacity" },
            0.28,
          );

        root.querySelectorAll<SVGPathElement>(".wk-bp-connectors path").forEach((pathEl, idx) => {
          const len = typeof pathEl.getTotalLength === "function" ? pathEl.getTotalLength() : 80;
          heroTl.fromTo(
            pathEl,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 0.55,
              ease: "power2.out",
              clearProps: "strokeDasharray,strokeDashoffset",
            },
            0.42 + idx * 0.04,
          );
        });

        // 2. Hero scrubbed atmospheric depth parallax (skipped on low-power CPUs/GPUs)
        const heroEl = root.querySelector<HTMLElement>(".wk-hero");
        if (heroEl && !lowPower) {
          gsap.to(".wk-hero-glow-a", {
            yPercent: 24,
            xPercent: 8,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: 0.85 },
          });
          gsap.to(".wk-hero-glow-b", {
            yPercent: -20,
            xPercent: -6,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: 0.85 },
          });
          gsap.to(".wk-hero-grid-bg", {
            yPercent: 12,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: 0.7 },
          });
          gsap.to(".wk-hero-blueprint", {
            y: -26,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: 0.7 },
          });
        }

        // 3. Portfolio overview counter roll-ups & elevation
        const overviewBand = root.querySelector<HTMLElement>(".wk-overview");
        if (overviewBand) {
          ScrollTrigger.create({
            trigger: overviewBand,
            start: "top 90%",
            once: true,
            onEnter: () => {
              overviewBand.querySelectorAll<HTMLElement>("[data-wk-count]").forEach((el) => {
                const target = Number(el.dataset.wkCount || "0");
                const obj = { v: 0 };
                gsap.to(obj, {
                  v: target,
                  duration: 0.9,
                  ease: "power3.out",
                  onUpdate: () => {
                    el.textContent = String(Math.round(obj.v));
                  },
                });
              });
              gsap.fromTo(
                overviewBand.querySelectorAll(".wk-stat-card"),
                { y: 22, scale: 0.97, opacity: 0.15 },
                {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  duration: 0.56,
                  stagger: 0.055,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
              );
            },
          });
        }

        // 4. Open 3D Orbit Explorer header, control tray & subtle scroll scale settle
        const explorerEl = root.querySelector<HTMLElement>(".wk-explorer");
        if (explorerEl) {
          gsap.fromTo(
            [".wk-explorer-top", ".wk-controls"],
            { y: 20, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              stagger: 0.08,
              ease: "power3.out",
              immediateRender: false,
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: explorerEl, start: "top 88%", once: true },
            },
          );
          gsap.fromTo(
            ".wk-orbit-stage",
            { scale: 0.975 },
            {
              scale: 1,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: explorerEl,
                start: "top 88%",
                end: "top 28%",
                scrub: 0.6,
              },
            },
          );
        }

        // 5. Capability detail panel reveal & SVG initial edge draw
        const techEl = root.querySelector<HTMLElement>(".wk-tech-section");
        if (techEl) {
          gsap.fromTo(
            ".wk-cap-detail-panel",
            { y: 24, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              immediateRender: false,
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: techEl, start: "top 88%", once: true },
            },
          );
        }

        // 6. 6-Stage delivery pipeline scrubbed progress spine + card stagger
        const processSection = root.querySelector<HTMLElement>(".wk-process-section");
        if (processSection) {
          const lineFill = processSection.querySelector<HTMLElement>(".wk-proc-line-fill");
          const stageCards = gsap.utils.toArray<HTMLElement>(".wk-proc-step", processSection);
          if (lineFill) {
            gsap.fromTo(
              lineFill,
              { scaleX: 0.08 },
              {
                scaleX: 1,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: processSection,
                  start: "top 82%",
                  end: "center 46%",
                  scrub: 0.55,
                },
              },
            );
          }
          if (stageCards.length) {
            gsap.fromTo(
              stageCards,
              { y: 22, opacity: 0.15 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.065,
                ease: "power3.out",
                immediateRender: false,
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: processSection, start: "top 88%", once: true },
              },
            );
          }
          gsap.fromTo(
            ".wk-proc-inspector",
            { y: 20, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              immediateRender: false,
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: ".wk-proc-inspector", start: "top 92%", once: true },
            },
          );
        }

        // 7. Batched capability rows + CTA panel reveal & scrubbed CTA grid depth
        [".wk-cap-item", ".wk-cta-panel"].forEach((sel) => {
          const items = gsap.utils.toArray<HTMLElement>(sel, root);
          if (!items.length) return;
          ScrollTrigger.batch(items, {
            start: "top 92%",
            once: true,
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                { y: 20, opacity: 0.15 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.58,
                  stagger: 0.055,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
              );
            },
          });
        });

        const ctaSection = root.querySelector<HTMLElement>(".wk-cta-section");
        if (ctaSection) {
          gsap.fromTo(
            ".wk-cta-grid-overlay",
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: ctaSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        // 8. Fine-pointer micro-interactions: magnetic CTAs, card 3D tilt, specular glints (desktop high-power only)
        if (finePointer && !lowPower) {
          root.querySelectorAll<HTMLElement>(".wk-magnetic").forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.28, ease: "power3.out" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.28, ease: "power3.out" });
            const onMove = (e: MouseEvent) => {
              const rect = btn.getBoundingClientRect();
              const relX = (e.clientX - rect.left - rect.width / 2) * 0.22;
              const relY = (e.clientY - rect.top - rect.height / 2) * 0.22;
              xTo(Math.max(-6, Math.min(6, relX)));
              yTo(Math.max(-6, Math.min(6, relY)));
            };
            const onLeave = () => {
              gsap.to(btn, { x: 0, y: 0, duration: 0.52, ease: "elastic.out(1, 0.5)" });
            };
            btn.addEventListener("mousemove", onMove);
            btn.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              btn.removeEventListener("mousemove", onMove);
              btn.removeEventListener("mouseleave", onLeave);
            });
          });

          root.querySelectorAll<HTMLElement>(".wk-stat-card").forEach((card) => {
            const rxTo = gsap.quickTo(card, "rotationX", { duration: 0.28, ease: "power2.out" });
            const ryTo = gsap.quickTo(card, "rotationY", { duration: 0.28, ease: "power2.out" });
            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / Math.max(1, rect.width);
              const py = (e.clientY - rect.top) / Math.max(1, rect.height);
              card.style.setProperty("--wk-mx", `${(px * 100).toFixed(1)}%`);
              card.style.setProperty("--wk-my", `${(py * 100).toFixed(1)}%`);
              rxTo((0.5 - py) * 6);
              ryTo((px - 0.5) * 6);
            };
            const onLeave = () => {
              gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.45,
                ease: "power3.out",
                clearProps: "transform",
              });
            };
            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
            });
          });

          const ctaPanel = root.querySelector<HTMLElement>(".wk-cta-panel");
          if (ctaPanel) {
            const onCtaMove = (e: MouseEvent) => {
              const rect = ctaPanel.getBoundingClientRect();
              const px = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
              const py = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
              ctaPanel.style.setProperty("--wk-cta-x", `${px.toFixed(1)}%`);
              ctaPanel.style.setProperty("--wk-cta-y", `${py.toFixed(1)}%`);
            };
            ctaPanel.addEventListener("mousemove", onCtaMove);
            cleanups.push(() => ctaPanel.removeEventListener("mousemove", onCtaMove));
          }
        }
      },
      root,
    );

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
    };
  }, []);

  // Category tab transition settle on Orbit Stage
  useEffect(() => {
    if (!categoryMounted.current) {
      categoryMounted.current = true;
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (orbitStageRef.current) {
        gsap.fromTo(
          orbitStageRef.current,
          { scale: 0.985, opacity: 0.6 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out", clearProps: "transform,opacity" },
        );
      }
      if (orbitResultRef.current) {
        gsap.fromTo(
          orbitResultRef.current,
          { y: 5, opacity: 0.35 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", clearProps: "transform,opacity" },
        );
      }
    });
    return () => ctx.revert();
  }, [category]);

  // Active Orbit Card label crisp transition
  useEffect(() => {
    if (!orbitIdxMounted.current) {
      orbitIdxMounted.current = true;
      return;
    }
    if (
      !orbitInspectLabelRef.current ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const tween = gsap.fromTo(
      orbitInspectLabelRef.current,
      { y: 5, opacity: 0.45 },
      { y: 0, opacity: 1, duration: 0.24, ease: "power2.out", clearProps: "transform,opacity" },
    );
    return () => {
      tween.kill();
    };
  }, [activeOrbitProject?.id]);

  // Engineering capability wave when activeCapId switches
  useEffect(() => {
    if (!capMounted.current) {
      capMounted.current = true;
      return;
    }
    const panel = capInfoRef.current;
    if (!panel || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelector(".wk-cap-info-head"),
        { y: 8, opacity: 0.3 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", clearProps: "transform,opacity" },
      );
      gsap.fromTo(
        panel.querySelectorAll(".wk-cap-tech-pill"),
        { y: 10, scale: 0.96, opacity: 0.2 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.32,
          stagger: 0.035,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
      gsap.fromTo(
        panel.querySelectorAll(".wk-cap-proj-link"),
        { x: -6, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          duration: 0.28,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
    }, panel);
    return () => ctx.revert();
  }, [activeCapId]);

  // 6-stage lifecycle inspector crossfade
  useEffect(() => {
    if (!stageMounted.current) {
      stageMounted.current = true;
      return;
    }
    const panel = procInspectorRef.current;
    if (!panel || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelector(".wk-proc-ins-left"),
        { y: 8, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", clearProps: "transform,opacity" },
      );
      gsap.fromTo(
        panel.querySelectorAll(".wk-proc-deliverables li"),
        { x: -10, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          duration: 0.28,
          stagger: 0.045,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
      gsap.fromTo(
        panel.querySelector(".wk-proc-gate"),
        { scale: 0.97, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.32, ease: "power2.out", clearProps: "transform,opacity" },
      );
    }, panel);
    return () => ctx.revert();
  }, [activeStageIdx]);

  const selectCategoryAndScroll = (cat: WorkCategoryId) => {
    setCategory(cat);
    explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeCapability =
    ENGINEERING_CAPABILITIES.find((c) => c.id === activeCapId) ??
    ENGINEERING_CAPABILITIES[0];
  const activeStage =
    DEVELOPMENT_PROCESS_STAGES[activeStageIdx] ?? DEVELOPMENT_PROCESS_STAGES[0];

  const capabilityProjects = activeCapability.projectIds
    .map((id) => WORK_PROJECTS.find((p) => p.id === id))
    .filter((p): p is WorkProject => Boolean(p));

  return (
    <div ref={rootRef} className="wk-root">
      {/* SECTION A — CINEMATIC PORTFOLIO HERO */}
      <section className="wk-hero" aria-label="Portfolio hero">
        <WorkHeroNetworkCanvas />
        <div className="wk-hero-grid-bg" aria-hidden="true" />
        <div className="wk-hero-glow wk-hero-glow-a" aria-hidden="true" />
        <div className="wk-hero-glow wk-hero-glow-b" aria-hidden="true" />

        <div className="wrap wk-hero-layout">
          <div className="wk-hero-copy">
            <div className="wk-hero-status">
              <span className="wk-status-dot" aria-hidden="true" />
              <span>PRODUCTION PORTFOLIO · FULL-STACK, MOBILE &amp; AI ENGINEERING</span>
            </div>

            <h1 className="wk-hero-title">
              <span className="wk-hero-line">Systems Engineered for</span>
              <span className="wk-hero-line">
                <em>Real-World Scale.</em>
              </span>
            </h1>

            <p className="wk-hero-intro">
              Explore shipped web platforms, native biometric &amp; telemetry mobile apps, autonomous AI
              orchestration graphs, and accessible UI foundations built by DigentTech.
            </p>

            <div className="wk-hero-ctas">
              <button
                type="button"
                className="wk-btn-primary wk-magnetic"
                onClick={() =>
                  explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                <span>Explore Our Work</span>
                <ArrowDown size={16} aria-hidden="true" />
              </button>
              <a href="/contact?source=work" className="wk-btn-secondary">
                <span>Discuss Your Project</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <WorkHeroDisciplineMap
            counts={stats.byCategory}
            projects={WORK_PROJECTS}
            onSelectCategory={selectCategoryAndScroll}
            onSelectProject={setSelectedProject}
          />
        </div>
      </section>

      {/* SECTION B — PORTFOLIO OVERVIEW */}
      <section className="wrap wk-overview" aria-label="Portfolio distribution overview">
        <div className="wk-overview-head">
          <div>
            <span className="wk-eyebrow">01 // PORTFOLIO OVERVIEW</span>
            <h2>Systems Composition Across Engineering Domains</h2>
          </div>
          <p>
            Computed dynamically from the {stats.totalSystems} documented architecture deployments
            across {stats.industriesCount} industries.
          </p>
        </div>

        <div className="wk-stats-grid">
          <div className="wk-stat-card wk-stat-highlight">
            <strong data-wk-count={stats.totalSystems}>{stats.totalSystems}</strong>
            <span>Production Systems</span>
            <small>Documented architectures</small>
          </div>
          <div className="wk-stat-card">
            <strong data-wk-count={stats.byCategory.web}>{stats.byCategory.web}</strong>
            <span>Web Applications</span>
            <small>Treasuries, commerce &amp; B2B SaaS</small>
          </div>
          <div className="wk-stat-card">
            <strong data-wk-count={stats.byCategory.mobile}>{stats.byCategory.mobile}</strong>
            <span>Mobile Applications</span>
            <small>Biometric wallets &amp; ward apps</small>
          </div>
          <div className="wk-stat-card">
            <strong data-wk-count={stats.byCategory.ai}>{stats.byCategory.ai}</strong>
            <span>AI &amp; Automation</span>
            <small>Agent routing &amp; spatial twins</small>
          </div>
          <div className="wk-stat-card">
            <strong data-wk-count={stats.byCategory.design}>{stats.byCategory.design}</strong>
            <span>Enterprise Foundations</span>
            <small>Token engines &amp; motion kits</small>
          </div>
          <div className="wk-stat-card">
            <strong data-wk-count={stats.uniqueTechnologies}>
              {stats.uniqueTechnologies}
            </strong>
            <span>Core Technologies</span>
            <small>Across UI, backend, DB &amp; edge</small>
          </div>
        </div>
      </section>

      {/* SECTION C — OPEN UNBOXED 3D ORBIT EXPLORER */}
      <section
        id="work-explorer"
        ref={explorerRef}
        className="wk-explorer"
        aria-label="Interactive Project Explorer"
      >
        <div className="wrap">
          <div className="wk-explorer-top">
            <div>
              <span className="wk-eyebrow">02 // INTERACTIVE PROJECT EXPLORER</span>
              <h2>Architected Systems &amp; Case Studies</h2>
            </div>
            <span ref={orbitResultRef} className="wk-result-count" aria-live="polite">
              Showing {filteredProjects.length} of {WORK_PROJECTS.length} systems · Drag or click front card
            </span>
          </div>

          <div className="wk-controls">
            <div
              className="wk-tabs"
              role="tablist"
              aria-label="Filter portfolio systems by category"
            >
              {CATEGORY_TABS.map((tab) => {
                const isSelected = category === tab.id;
                const count =
                  tab.id === "all" ? stats.totalSystems : stats.byCategory[tab.id];
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`wk-tab ${isSelected ? "active" : ""}`}
                    onClick={() => setCategory(tab.id)}
                  >
                    <span>{tab.label}</span>
                    <span className="wk-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="wk-orbit-open">
          <div ref={orbitStageRef} className="wk-orbit-stage">
            <CircularCarousel
              items={carouselItems}
              preset="orbit"
              intro="rise"
              cardWidth={280}
              aspectRatio={1.55}
              gap={26}
              speed={12}
              cornerRadius={14}
              depthFade={0.48}
              fadeColor={isLight ? "#f5f4eb" : "#060812"}
              innerShade={0.55}
              captions
              focusOnClick
              pauseOnHover
              controlRef={carouselCtrlRef}
              onChange={(idx) => setActiveOrbitIdx(idx)}
              onItemClick={(_, idx) => {
                if (idx === activeOrbitIdx && filteredProjects[idx]) {
                  setSelectedProject(filteredProjects[idx]);
                }
              }}
            />
          </div>

          {activeOrbitProject && (
            <div className="wrap wk-orbit-actions">
              <button
                type="button"
                className="wk-orbit-arrow"
                aria-label="Previous showcase project"
                onClick={() => carouselCtrlRef.current?.stepBy(-1)}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                className="wk-btn-primary wk-orbit-inspect wk-magnetic"
                onClick={() => setSelectedProject(activeOrbitProject)}
              >
                <span ref={orbitInspectLabelRef}>Inspect Case Study: {activeOrbitProject.name}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="wk-orbit-arrow"
                aria-label="Next showcase project"
                onClick={() => carouselCtrlRef.current?.stepBy(1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION E — ENGINEERING & TECHNOLOGY CAPABILITIES */}
      <section className="wrap wk-tech-section" aria-label="Engineering and technology capabilities">
        <div className="wk-section-head">
          <div>
            <span className="wk-eyebrow">03 // ENGINEERING &amp; TECHNOLOGY</span>
            <h2>Production Stack Proven Across Shipped Systems</h2>
          </div>
          <p>
            Select any engineering capability below to inspect connected architectural domains,
            actual production stack choices, and projects built with that discipline.
          </p>
        </div>

        <div className="wk-tech-workspace">
          <div className="wk-cap-list" role="tablist" aria-label="Engineering capabilities">
            {ENGINEERING_CAPABILITIES.map((cap) => {
              const active = cap.id === activeCapId;
              return (
                <button
                  key={cap.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`wk-cap-item ${active ? "is-active" : ""}`}
                  onClick={() => setActiveCapId(cap.id)}
                >
                  <span className="wk-cap-code">{cap.code}</span>
                  <strong>{cap.title}</strong>
                  <ArrowRight size={14} className="wk-cap-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="wk-cap-detail-panel">
            <div className="wk-cap-topo-box">
              <div className="wk-topo-caption">
                <Terminal size={14} aria-hidden="true" />
                <span>SYSTEM CAPABILITY TOPOLOGY MAP (CLICK NODES TO INSPECT)</span>
              </div>
              <CapabilityTopologySvg
                capabilities={ENGINEERING_CAPABILITIES}
                activeId={activeCapId}
                onSelect={setActiveCapId}
              />
            </div>

            <div ref={capInfoRef} className="wk-cap-info">
              <div className="wk-cap-info-head">
                <span>{activeCapability.code}</span>
                <h3>{activeCapability.title}</h3>
                <p>{activeCapability.summary}</p>
              </div>

              <div className="wk-cap-tech-row">
                {activeCapability.technologies.map((tech) => (
                  <div key={tech.name} className="wk-cap-tech-pill">
                    <CapabilityTechIcon logoKey={tech.logoKey} size={22} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>

              <div className="wk-cap-projects">
                <span className="wk-cap-sub-label">DEMONSTRATED IN SYSTEMS:</span>
                <div className="wk-cap-proj-pills">
                  {capabilityProjects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      className="wk-cap-proj-link"
                      onClick={() => setSelectedProject(proj)}
                    >
                      <span>
                        {proj.index} · {proj.name}
                      </span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F — 6-STAGE DEVELOPMENT PROCESS TIMELINE */}
      <section className="wrap wk-process-section" aria-label="Software development process">
        <div className="wk-section-head">
          <div>
            <span className="wk-eyebrow">04 // DEVELOPMENT LIFECYCLE</span>
            <h2>Six Disciplined Stages from Spec to Scale</h2>
          </div>
          <p>
            Select any lifecycle stage to inspect concrete deliverables and the engineering
            verification gate required before advancing.
          </p>
        </div>

        <div className="wk-proc-timeline-wrap">
          <div className="wk-proc-track" aria-hidden="true">
            <span className="wk-proc-line-fill" />
          </div>

          <div className="wk-proc-grid" role="tablist" aria-label="Development process stages">
            {DEVELOPMENT_PROCESS_STAGES.map((stage, idx) => {
              const isSelected = activeStageIdx === idx;
              return (
                <button
                  key={stage.code}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`wk-proc-step ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveStageIdx(idx)}
                >
                  <span className="wk-proc-num">{stage.code}</span>
                  <strong>{stage.title}</strong>
                  <span className="wk-proc-short">{stage.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={procInspectorRef} className="wk-proc-inspector" aria-live="polite">
          <div className="wk-proc-ins-left">
            <span className="wk-proc-ins-code">
              STAGE {activeStage.code} OF 06 · LIFECYCLE SPECIFICATION
            </span>
            <h3>
              {activeStage.code} — {activeStage.title}
            </h3>
            <p>{activeStage.summary}</p>
          </div>

          <div className="wk-proc-ins-right">
            <div className="wk-proc-deliverables">
              <span>CONCRETE DELIVERABLES</span>
              <ul>
                {activeStage.deliverables.map((d) => (
                  <li key={d}>
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wk-proc-gate">
              <Sparkles size={15} aria-hidden="true" />
              <div>
                <span>VERIFICATION GATE</span>
                <strong>{activeStage.verificationGate}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G — FINAL CONVERSION SECTION */}
      <section className="wrap wk-cta-section" aria-label="Project inquiry call to action">
        <div className="wk-cta-panel">
          <div className="wk-cta-grid-overlay" aria-hidden="true" />
          <div className="wk-cta-inner">
            <span className="wk-eyebrow">05 // INITIATE ENGINEERING</span>
            <h2>Have an ambitious idea? Let’s engineer it.</h2>
            <p>
              From initial architecture blueprints and edge web platforms to hardware-secured mobile
              suites and grounded AI agents, our team turns complex product requirements into
              production software with clean repository ownership.
            </p>
            <div className="wk-cta-actions">
              <a href="/contact?source=work" className="wk-btn-primary wk-magnetic">
                <span>Start a Project</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="/contact#team" className="wk-btn-secondary">
                <span>Contact Our Engineering Team</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D — 10-SECTION IMMERSIVE CASE STUDY MODAL */}
      <WorkCaseStudyModal
        project={selectedProject}
        allProjects={WORK_PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />
    </div>
  );
}
