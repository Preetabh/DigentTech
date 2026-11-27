import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  // GSAP + ScrollTrigger choreography
  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          ".wk-hero-status",
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, clearProps: "transform,opacity" },
          0,
        )
        .fromTo(
          ".wk-hero-line",
          { y: 36, clipPath: "inset(0 0 100% 0)", opacity: 0.1 },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            clearProps: "clipPath,transform,opacity",
          },
          0.08,
        )
        .fromTo(
          ".wk-hero-intro",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" },
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
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.72, clearProps: "transform,opacity" },
          0.18,
        );

      const overviewBand = root.querySelector<HTMLElement>(".wk-overview");
      if (overviewBand) {
        ScrollTrigger.create({
          trigger: overviewBand,
          start: "top 88%",
          once: true,
          onEnter: () => {
            overviewBand.querySelectorAll<HTMLElement>("[data-wk-count]").forEach((el) => {
              const target = Number(el.dataset.wkCount || "0");
              const obj = { v: 0 };
              gsap.to(obj, {
                v: target,
                duration: 0.85,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(obj.v));
                },
              });
            });
            gsap.fromTo(
              overviewBand.querySelectorAll(".wk-stat-card"),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
            );
          },
        });
      }

      const processSection = root.querySelector<HTMLElement>(".wk-process-section");
      if (processSection) {
        const lineFill = processSection.querySelector<HTMLElement>(".wk-proc-line-fill");
        const stageCards = gsap.utils.toArray<HTMLElement>(".wk-proc-step", processSection);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: processSection, start: "top 85%", once: true },
        });
        if (lineFill) {
          tl.fromTo(
            lineFill,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.05, ease: "power2.inOut", clearProps: "transform" },
            0,
          );
        }
        if (stageCards.length) {
          tl.fromTo(
            stageCards,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            0.1,
          );
        }
      }

      [".wk-cap-item", ".wk-cta-panel"].forEach((sel) => {
        const items = gsap.utils.toArray<HTMLElement>(sel, root);
        if (!items.length) return;
        ScrollTrigger.batch(items, {
          start: "top 91%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 24, opacity: 0.1 },
              {
                y: 0,
                opacity: 1,
                duration: 0.62,
                stagger: 0.07,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
            );
          },
        });
      });

      if (window.matchMedia?.("(pointer: fine)").matches) {
        root.querySelectorAll<HTMLElement>(".wk-magnetic").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.32, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.32, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const relX = (e.clientX - rect.left - rect.width / 2) * 0.22;
            const relY = (e.clientY - rect.top - rect.height / 2) * 0.22;
            xTo(Math.max(-6, Math.min(6, relX)));
            yTo(Math.max(-6, Math.min(6, relY)));
          };
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)" });
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
            <span className="wk-result-count" aria-live="polite">
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
          <div className="wk-orbit-stage">
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
                className="wk-btn-primary wk-orbit-inspect"
                onClick={() => setSelectedProject(activeOrbitProject)}
              >
                <span>Inspect Case Study: {activeOrbitProject.name}</span>
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

            <div className="wk-cap-info">
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

        <div className="wk-proc-inspector" aria-live="polite">
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
