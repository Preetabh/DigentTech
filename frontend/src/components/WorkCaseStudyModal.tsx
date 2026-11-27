import React, { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  X,
} from "lucide-react";
import { SolutionArchitectureDiagram } from "./WorkVisuals";
import type { WorkProject } from "../data/workPortfolio";

function useDialogSync(
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  open: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [dialogRef, open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d || "closedBy" in HTMLDialogElement.prototype) return;
    const outside = (e: PointerEvent) => {
      const r = d.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    let downOut = false;
    const onDown = (e: PointerEvent) => {
      downOut = outside(e);
    };
    const onUp = (e: PointerEvent) => {
      if (downOut && outside(e)) d.close();
      downOut = false;
    };
    d.addEventListener("pointerdown", onDown);
    d.addEventListener("pointerup", onUp);
    return () => {
      d.removeEventListener("pointerdown", onDown);
      d.removeEventListener("pointerup", onUp);
    };
  }, [dialogRef]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handleNativeClose = () => {
      d.returnValue = "";
      onClose();
    };
    d.addEventListener("close", handleNativeClose);
    return () => d.removeEventListener("close", handleNativeClose);
  }, [dialogRef, onClose]);
}

export function WorkCaseStudyModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
}: {
  project: WorkProject | null;
  allProjects: WorkProject[];
  onClose: () => void;
  onSelectProject: (next: WorkProject) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useDialogSync(dialogRef, Boolean(project), onClose);

  useEffect(() => {
    const body = bodyRef.current;
    if (!project || !body) return;
    body.scrollTo({ top: 0, behavior: "smooth" });
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".wk-case-overview-box",
          { y: 12, opacity: 0.25 },
          { y: 0, opacity: 1, duration: 0.42, clearProps: "transform,opacity" },
          0,
        )
        .fromTo(
          ".wk-case-media-frame img",
          { scale: 1.045 },
          { scale: 1, duration: 0.68, ease: "power2.out", clearProps: "transform" },
          0.04,
        )
        .fromTo(
          ".wk-arch-node",
          { y: 12, opacity: 0.25 },
          { y: 0, opacity: 1, duration: 0.36, stagger: 0.05, clearProps: "transform,opacity" },
          0.12,
        )
        .fromTo(
          ".wk-case-outcomes-list li",
          { x: -10, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 0.34, stagger: 0.045, clearProps: "transform,opacity" },
          0.16,
        );
    }, body);

    return () => ctx.revert();
  }, [project?.id]);

  const currentIdx = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;
  const prevProj =
    currentIdx >= 0
      ? allProjects[(currentIdx - 1 + allProjects.length) % allProjects.length]
      : null;
  const nextProj =
    currentIdx >= 0
      ? allProjects[(currentIdx + 1) % allProjects.length]
      : null;

  const relatedProjects = project
    ? project.relatedIds
        .map((id) => allProjects.find((p) => p.id === id))
        .filter((p): p is WorkProject => Boolean(p))
    : [];

  return (
    <dialog
      ref={dialogRef}
      className="wk-case-dialog"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      {project && (
        <div ref={bodyRef} className="wk-case-scroll">
          {/* Top sticky bar inside modal */}
          <div className="wk-case-topbar">
            <div className="wk-case-crumbs">
              <span className="wk-case-idx">CASE STUDY // {project.index}</span>
              <span className="wk-case-sep">/</span>
              <span>{project.categoryLabel}</span>
              <span className="wk-case-sep">/</span>
              <span>{project.industry}</span>
            </div>

            <div className="wk-case-nav-btns">
              {prevProj && (
                <button
                  type="button"
                  className="wk-case-step-btn"
                  onClick={() => onSelectProject(prevProj)}
                  aria-label={`Previous case study: ${prevProj.name}`}
                  title={prevProj.name}
                >
                  <ArrowLeft size={14} />
                  <span>Prev</span>
                </button>
              )}
              {nextProj && (
                <button
                  type="button"
                  className="wk-case-step-btn"
                  onClick={() => onSelectProject(nextProj)}
                  aria-label={`Next case study: ${nextProj.name}`}
                  title={nextProj.name}
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              )}
              <button
                type="button"
                className="wk-case-close"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close case study"
                autoFocus
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="wk-case-body">
            {/* 1. Project Overview */}
            <header className="wk-case-header">
              <span className="wk-case-engagement">{project.engagementModel}</span>
              <h2 id={titleId} className="wk-case-title">
                {project.name}
              </h2>
              <p className="wk-case-tagline">{project.tagline}</p>

              <div className="wk-case-overview-box">
                <span className="wk-case-kicker">01 · PROJECT OVERVIEW</span>
                <p>{project.overview}</p>
              </div>
            </header>

            {/* 8. Project Asset Visual */}
            <div className="wk-case-media-frame">
              <img src={project.image} alt={project.alt} />
              <div className="wk-case-media-caption">
                <Layers size={14} aria-hidden="true" />
                <span>
                  {project.flowStages.join("  →  ")}
                </span>
              </div>
            </div>

            {/* 2. Business Problem & 3. Engineering Approach */}
            <div className="wk-case-dual-grid">
              <section className="wk-case-panel">
                <span className="wk-case-kicker">02 · BUSINESS PROBLEM</span>
                <h3>Operational Constraints</h3>
                <p>{project.businessProblem}</p>
              </section>
              <section className="wk-case-panel">
                <span className="wk-case-kicker">03 · ENGINEERING APPROACH</span>
                <h3>Technical Strategy</h3>
                <p>{project.engineeringApproach}</p>
              </section>
            </div>

            {/* 4. Solution Architecture */}
            <section className="wk-case-section">
              <div className="wk-case-section-head">
                <span className="wk-case-kicker">04 · SOLUTION ARCHITECTURE</span>
                <h3>Interactive System Layer Topology</h3>
                <p>{project.architectureSummary}</p>
              </div>
              <SolutionArchitectureDiagram layers={project.architectureLayers} />
            </section>

            {/* 5. Technology Stack & 6. Key Features */}
            <div className="wk-case-dual-grid">
              <section className="wk-case-panel">
                <span className="wk-case-kicker">05 · TECHNOLOGY STACK</span>
                <h3>Production Dependencies</h3>
                <div className="wk-case-stack-grid">
                  {project.stackDetails.map((dep) => (
                    <div key={dep.name} className="wk-case-stack-item">
                      <Cpu size={14} aria-hidden="true" />
                      <div>
                        <strong>{dep.name}</strong>
                        <span>{dep.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="wk-case-panel">
                <span className="wk-case-kicker">06 · KEY FEATURES</span>
                <h3>Core Platform Capabilities</h3>
                <ul className="wk-case-features-list">
                  {project.keyFeatures.map((feat) => (
                    <li key={feat.title}>
                      <strong>{feat.title}</strong>
                      <span>{feat.detail}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* 7. Development Process */}
            <section className="wk-case-section">
              <span className="wk-case-kicker">07 · DEVELOPMENT PROCESS</span>
              <h3>Execution Lifecycle Milestones</h3>
              <div className="wk-case-process-row">
                {project.processHighlights.map((item) => (
                  <div key={item.stage} className="wk-case-proc-step">
                    <strong>{item.stage}</strong>
                    <span>{item.artifact}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Engineering Outcomes */}
            <section className="wk-case-outcomes-box">
              <div className="wk-case-outcomes-head">
                <ShieldCheck size={18} aria-hidden="true" />
                <div>
                  <span className="wk-case-kicker">09 · VERIFIED ENGINEERING OUTCOMES</span>
                  <h3>Architectural & Delivery Impact</h3>
                </div>
              </div>
              <ul className="wk-case-outcomes-list">
                {project.engineeringOutcomes.map((out) => (
                  <li key={out}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 10. Related Projects */}
            {relatedProjects.length > 0 && (
              <section className="wk-case-section">
                <span className="wk-case-kicker">10 · RELATED PROJECTS</span>
                <h3>Explore Connected Architectures</h3>
                <div className="wk-case-related-grid">
                  {relatedProjects.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      className="wk-case-related-card"
                      onClick={() => onSelectProject(rel)}
                    >
                      <img src={rel.image} alt={rel.alt} loading="lazy" />
                      <div className="wk-case-related-info">
                        <span>
                          {rel.index} · {rel.categoryLabel}
                        </span>
                        <strong>{rel.name}</strong>
                        <small>{rel.tagline}</small>
                      </div>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Modal Footer CTAs */}
            <footer className="wk-case-footer">
              <a
                href={`/contact?service=${encodeURIComponent(
                  project.category === "mobile"
                    ? "App development"
                    : project.category === "ai"
                      ? "AI & automation"
                      : "Web development",
                )}&brief=${encodeURIComponent(
                  `Project inquiry inspired by ${project.name} (${project.industry}).`,
                )}`}
                className="wk-btn-primary"
              >
                <span>Start a Similar Project</span>
                <ArrowRight size={16} />
              </a>
              <a href={project.serviceRoute} className="wk-btn-secondary">
                <span>Explore Discipline Page</span>
                <ArrowUpRight size={15} />
              </a>
            </footer>
          </div>
        </div>
      )}
    </dialog>
  );
}

