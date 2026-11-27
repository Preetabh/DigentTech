import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe2,
  Lock,
  MapPin,
  Minus,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";
import "./contact-page.css";

gsap.registerPlugin(ScrollTrigger);

interface ContactPageProps {
  theme?: "dark" | "light";
  email: string;
  availableServices: string[];
}

const BUDGET_OPTIONS = [
  "Let's discuss",
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
];

const TIMELINE_OPTIONS = [
  "Immediate (1–2 wks)",
  "This Month",
  "Quarter Roadmap",
  "Advisory / Audit",
];

const RESPONSE_STEPS = [
  {
    num: "01",
    window: "WITHIN 4 HOURS",
    title: "Principal Architect Review",
    desc: "A senior systems engineer reads your brief, reviews any referenced stack or bottlenecks, and confirms NDA readiness.",
  },
  {
    num: "02",
    window: "WITHIN 24 HOURS",
    title: "Scoped Roadmap & Milestone Proposal",
    desc: "You receive a clear breakdown of architecture options, recommended stack, delivery sprints, and transparent pricing.",
  },
  {
    num: "03",
    window: "DAYS 3–7",
    title: "Repository Setup & Sprint 01 Kickoff",
    desc: "We align on your timezone cadence, initialize shared Git repositories, and ship weekly staging builds with full IP ownership.",
  },
];

const CONSULTATION_FAQS = [
  {
    q: "How quickly will I hear back after submitting an architectural brief?",
    a: "Every submission routes directly to principal engineering leadership. Expect an initial technical response within 4–24 hours along with available consultation slots.",
  },
  {
    q: "What should I include if I don't have a full technical specification yet?",
    a: "A short description of the business outcome, primary user workflow, or bottleneck you want to eliminate is plenty. We help formalize database models, API contracts, and UI scope during discovery.",
  },
  {
    q: "Can we sign an NDA before discussing proprietary product architecture?",
    a: "Yes. Indicate NDA preference in your brief or email us directly and we will countersign your mutual NDA prior to any architecture walkthrough.",
  },
  {
    q: "Do you work with international startups and remote teams across time zones?",
    a: "Yes. Our engineering hub operates across India (UTC+5:30) with structured async Loom reviews and overlapping consultation windows for US, UK, UAE, and APAC partners.",
  },
  {
    q: "Do I retain full ownership of the codebase and cloud accounts?",
    a: "Always 100%. All repositories, Figma design tokens, infrastructure configs, and cloud deployments reside inside your organization's GitHub and cloud accounts with zero lock-in.",
  },
];

export function ContactPage({ email, availableServices }: ContactPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const initialParams = useMemo(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const rawService = params.get("service") || "Web development";
    const rawCase = params.get("case") || "";
    const rawCap = params.get("capability") || "";
    const rawChannels = params.get("channels") || "";
    const rawSource = params.get("source") || "";
    const rawBrief = params.get("brief") || "";

    const syntheticParts = [
      rawBrief,
      rawCase ? `Reference case study: ${rawCase}` : "",
      rawCap ? `Focus capability: ${rawCap}` : "",
      rawChannels ? `Channels of interest: ${rawChannels}` : "",
      rawSource && !rawBrief ? `Originated from: ${rawSource} showcase` : "",
    ].filter(Boolean);

    return {
      service: rawService,
      prefill: syntheticParts.join(" | "),
    };
  }, []);

  const serviceOptions = useMemo(() => {
    const base = [...availableServices, "Product & brand design", "Something else"];
    if (initialParams.service && !base.includes(initialParams.service)) {
      return [initialParams.service, ...base];
    }
    return base;
  }, [availableServices, initialParams.service]);

  const [selectedService, setSelectedService] = useState(initialParams.service || "Web development");
  const [selectedBudget, setSelectedBudget] = useState("Let's discuss");
  const [selectedTimeline, setSelectedTimeline] = useState("This Month");
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [messageVal, setMessageVal] = useState(initialParams.prefill);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    draftUrl?: string;
  }>({ type: "idle", message: "" });

  // Dynamic brief readiness percentage (encourages clear architectural details)
  const readinessPct = useMemo(() => {
    let score = 28; // baseline for pre-selected track + budget + timeline
    if (nameVal.trim().length >= 2) score += 20;
    if (emailVal.includes("@") && emailVal.includes(".")) score += 24;
    if (messageVal.trim().length >= 15) score += 28;
    else if (messageVal.trim().length >= 1) score += 12;
    return Math.min(100, score);
  }, [nameVal, emailVal, messageVal]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanedName = nameVal.trim();
    const cleanedEmail = emailVal.trim();
    const rawMsg = messageVal.trim();
    const composedMessage = rawMsg.includes("[Target Timeline:")
      ? rawMsg
      : `${rawMsg}\n\n[Target Timeline: ${selectedTimeline}]`;

    const payload = {
      name: cleanedName,
      email: cleanedEmail,
      service: selectedService || "Web development",
      budget: selectedBudget || "Let's discuss",
      message: composedMessage,
    };

    const mailtoBody = `Hello DigentTech,\n\nName: ${payload.name}\nEmail: ${payload.email}\nService: ${payload.service}\nBudget: ${payload.budget}\nTimeline: ${selectedTimeline}\n\nProject brief:\n${rawMsg}`;
    const backupUrl = `mailto:${email}?subject=${encodeURIComponent(
      "Project inquiry: " + payload.service
    )}&body=${encodeURIComponent(mailtoBody)}`;

    setSubmitting(true);
    setFeedback({ type: "idle", message: "" });

    try {
      const apiBase = ((import.meta.env.VITE_API_URL as string) || "").replace(/\/$/, "");
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setFeedback({
          type: "success",
          message:
            data.message ||
            "Thank you! Your project inquiry has been received. A lead architect will respond within 24 hours.",
        });
        setNameVal("");
        setEmailVal("");
        setMessageVal("");
      } else {
        throw new Error(
          data.message || "Failed to submit your inquiry. Please try again or use direct email."
        );
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message:
          err.message ||
          "Could not reach backend API. You can send directly via your email client below.",
        draftUrl: backupUrl,
      });
    } finally {
      setSubmitting(false);
    }
  }

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
      // Hero entrance timeline (renders both columns cleanly above the fold)
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          ".ct-status-pill",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, clearProps: "transform,opacity" }
        )
        .fromTo(
          ".ct-hero-line",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.58,
            stagger: 0.09,
            clearProps: "transform,opacity",
          },
          "-=0.2"
        )
        .fromTo(
          ".ct-hero-lead, .ct-guarantee-item, .ct-channel-card, .ct-readiness-card",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.48,
            stagger: 0.06,
            clearProps: "transform,opacity",
          },
          "-=0.36"
        )
        .fromTo(
          ".ct-console-card",
          { y: 26, scale: 0.97, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.62,
            clearProps: "transform,opacity",
          },
          "-=0.52"
        );

      // Ambient drifting aurora orbs (GPU transforms only)
      gsap.to(".ct-aurora-orb.one", {
        x: -24,
        y: 18,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".ct-aurora-orb.two", {
        x: 22,
        y: -16,
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll-triggered section reveals (immediateRender: false prevents anchor-jump hidden traps)
      gsap.utils.toArray<HTMLElement>(".ct-reveal-head", root).forEach((el) => {
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
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }
        );
      });

      // Response Conduit beam draw + cards reveal
      const beam = root.querySelector<HTMLElement>(".ct-conduit-beam");
      if (beam) {
        gsap.fromTo(
          beam,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: "#ct-conduit", start: "top 86%", once: true },
          }
        );
      }

      const conduitCards = gsap.utils.toArray<HTMLElement>(".ct-conduit-card", root);
      if (conduitCards.length) {
        ScrollTrigger.batch(conduitCards, {
          start: "top 94%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 28, scale: 0.97, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.54,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      }

      const faqItems = gsap.utils.toArray<HTMLElement>(".ct-faq-item", root);
      if (faqItems.length) {
        ScrollTrigger.batch(faqItems, {
          start: "top 95%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.055,
                ease: "power2.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      }

      // Desktop fine-pointer spotlight & magnetic buttons
      if (isFinePointer) {
        gsap.utils.toArray<HTMLElement>(".ct-spotlight", root).forEach((card) => {
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

        gsap.utils.toArray<HTMLElement>(".ct-magnetic", root).forEach((btn) => {
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

  // 2. Micro-spring feedback pulse on readiness summary tags when chips change
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ct-readiness-tag",
        { scale: 0.93, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.28, stagger: 0.03, ease: "back.out(1.8)" }
      );
    }, root);

    return () => ctx.revert();
  }, [selectedService, selectedBudget, selectedTimeline]);

  // 3. Feedback banner entrance animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root || feedback.type === "idle") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ct-status-box",
        { y: 12, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    }, root);

    return () => ctx.revert();
  }, [feedback.type]);

  return (
    <div ref={rootRef} className="ct-page">
      {/* 1. SPLIT ARCHITECTURAL CONSULTATION DESK */}
      <section className="ct-hero-stage" id="team">
        <div className="ct-hero-grid-bg" aria-hidden="true" />
        <div className="ct-hero-aurora" aria-hidden="true">
          <div className="ct-aurora-orb one" />
          <div className="ct-aurora-orb two" />
        </div>

        <div className="wrap ct-split">
          {/* LEFT RAIL: TITLE, GUARANTEES, DIRECT EMAIL & READINESS METER */}
          <div className="ct-left-col">
            <span className="ct-status-pill">
              <span className="ct-live-dot" />
              PRINCIPAL CONSULTATION DESK · &lt; 24H RESPONSE
            </span>

            <h1 className="ct-hero-h1">
              <span className="ct-hero-line">Start with a clear</span>
              <span className="ct-hero-line">
                <em>architectural brief.</em>
              </span>
            </h1>

            <p className="ct-hero-lead">
              Share your goals, product constraints, or system bottlenecks. Every inquiry is
              reviewed directly by a principal engineer—never routed through generic sales queues.
            </p>

            <div className="ct-guarantee-list">
              <div className="ct-guarantee-item">
                <span className="ct-guarantee-check">
                  <Check size={12} />
                </span>
                <span>Fixed-milestone scope proposal &amp; sprint map within 24 hours</span>
              </div>
              <div className="ct-guarantee-item">
                <span className="ct-guarantee-check">
                  <Check size={12} />
                </span>
                <span>100% client source-code &amp; design token IP ownership</span>
              </div>
              <div className="ct-guarantee-item">
                <span className="ct-guarantee-check">
                  <Check size={12} />
                </span>
                <span>Mutual NDA available prior to discovery walkthroughs</span>
              </div>
            </div>

            {/* Direct Channel Card */}
            <div className="ct-channel-card ct-spotlight">
              <div className="ct-channel-row">
                <a className="ct-email-link" href={"mailto:" + email}>
                  {email}
                  <ArrowUpRight size={17} />
                </a>
                <button
                  type="button"
                  className={"ct-copy-btn " + (copied ? "copied" : "")}
                  onClick={handleCopyEmail}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy email"}</span>
                </button>
              </div>
              <div className="ct-channel-meta">
                <div className="ct-channel-meta-item">
                  <MapPin size={14} />
                  <span>Barabanki &amp; Lucknow, India</span>
                </div>
                <div className="ct-channel-meta-item">
                  <Globe2 size={14} />
                  <span>Serving US, UK, UAE, CA &amp; IN</span>
                </div>
              </div>
            </div>

            {/* Live Brief Readiness Telemetry */}
            <div className="ct-readiness-card" aria-live="polite">
              <div className="ct-readiness-top">
                <span>BRIEF READINESS TELEMETRY</span>
                <strong>{readinessPct}%</strong>
              </div>
              <div className="ct-readiness-track">
                <div className="ct-readiness-fill" style={{ width: `${readinessPct}%` }} />
              </div>
              <div className="ct-readiness-tags">
                <span className="ct-readiness-tag">{selectedService}</span>
                <span className="ct-readiness-tag">{selectedBudget}</span>
                <span className="ct-readiness-tag">{selectedTimeline}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE BRIEF INTAKE CONSOLE */}
          <div className="ct-console-card">
            <div className="ct-console-chrome">
              <div className="ct-console-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="ct-console-title">DIGENTTECH // BRIEF-INTAKE</span>
              <span className="ct-console-sla">ENCRYPTED CHANNEL</span>
            </div>

            <form ref={formRef} className="ct-form" onSubmit={submit}>
              {initialParams.prefill && (
                <div className="ct-prefill-banner">
                  <Sparkles size={14} />
                  <span>Brief pre-populated from your architectural configurator</span>
                </div>
              )}

              {/* 1. Track Chip Selector */}
              <div className="ct-field-group">
                <div className="ct-field-label">
                  <span>1. Primary Practice Track</span>
                  <small>Select track</small>
                </div>
                <div className="ct-chips-wrap" role="group" aria-label="Primary practice track">
                  {serviceOptions.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      className={"ct-chip " + (selectedService === srv ? "active" : "")}
                      onClick={() => setSelectedService(srv)}
                      disabled={submitting}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Target Budget Chips */}
              <div className="ct-field-group">
                <div className="ct-field-label">
                  <span>2. Target Budget Range</span>
                  <small>Flexible per scope</small>
                </div>
                <div className="ct-chips-wrap" role="group" aria-label="Target budget range">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={"ct-chip " + (selectedBudget === b ? "active" : "")}
                      onClick={() => setSelectedBudget(b)}
                      disabled={submitting}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Timeline Chips */}
              <div className="ct-field-group">
                <div className="ct-field-label">
                  <span>3. Target Launch Window</span>
                  <small>Kickoff speed</small>
                </div>
                <div className="ct-chips-wrap" role="group" aria-label="Target timeline">
                  {TIMELINE_OPTIONS.map((tl) => (
                    <button
                      key={tl}
                      type="button"
                      className={"ct-chip " + (selectedTimeline === tl ? "active" : "")}
                      onClick={() => setSelectedTimeline(tl)}
                      disabled={submitting}
                    >
                      {tl}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Name & Email */}
              <div className="ct-form-row">
                <label className="ct-field-group">
                  <span className="ct-field-label">Your Name</span>
                  <input
                    className="ct-input"
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    required
                    maxLength={100}
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    disabled={submitting}
                  />
                </label>

                <label className="ct-field-group">
                  <span className="ct-field-label">Work Email Address</span>
                  <input
                    className="ct-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    required
                    maxLength={200}
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    disabled={submitting}
                  />
                </label>
              </div>

              {/* 5. Technical Context Textarea */}
              <label className="ct-field-group">
                <span className="ct-field-label">
                  <span>Project Goals &amp; Technical Context</span>
                  <small>{messageVal.trim().length} chars</small>
                </span>
                <textarea
                  className="ct-textarea"
                  name="message"
                  rows={4}
                  placeholder="Describe what you are building, user workflows, integrations, or bottlenecks you want resolved..."
                  required
                  minLength={10}
                  maxLength={5000}
                  value={messageVal}
                  onChange={(e) => setMessageVal(e.target.value)}
                  disabled={submitting}
                />
              </label>

              <div className="ct-submit-bar">
                <p className="ct-submit-note">
                  <Lock size={14} />
                  <span>Routed directly to engineering principals. NDA honored immediately.</span>
                </p>

                <div className="ct-magnetic">
                  <button className="ct-submit-btn" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>Transmitting brief...</>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send architectural inquiry</span>
                        <ArrowUpRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {feedback.type === "success" && (
                <div className="ct-status-box success" role="status">
                  <strong style={{ color: "#10b981", display: "block", marginBottom: 4 }}>
                    ✓ Architectural Brief Transmitted
                  </strong>
                  {feedback.message}
                </div>
              )}

              {feedback.type === "error" && (
                <div className="ct-status-box error" role="alert">
                  <strong style={{ color: "#f87171", display: "block", marginBottom: 4 }}>
                    Direct Email Fallback Ready
                  </strong>
                  {feedback.message}
                  {feedback.draftUrl && (
                    <a
                      href={feedback.draftUrl}
                      style={{ marginTop: 8, display: "inline-block", color: "var(--accent)", fontWeight: 600 }}
                    >
                      Open pre-filled draft in your email client ↗
                    </a>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 2. RESPONSE CONDUIT: WHAT HAPPENS NEXT */}
      <section className="ct-conduit-section" id="ct-conduit">
        <div className="wrap">
          <div className="ct-section-top ct-reveal-head">
            <div>
              <span className="eyebrow">RESPONSE PIPELINE</span>
              <h2>What happens after you hit send.</h2>
            </div>
            <p>
              No automated sales drip or junior handoff. Your architectural brief triggers a
              structured three-step principal engineering workflow.
            </p>
          </div>

          <div className="ct-conduit-wrap">
            <div className="ct-conduit-beam" aria-hidden="true" />
            <div className="ct-conduit-grid">
              {RESPONSE_STEPS.map((step) => (
                <article className="ct-conduit-card ct-spotlight" key={step.num}>
                  <div className="ct-conduit-head">
                    <span className="ct-conduit-badge">{step.num}</span>
                    <span className="ct-conduit-window">{step.window}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONSULTATION FAQ */}
      <section className="ct-faq-section" id="ct-faq">
        <div className="wrap">
          <div className="ct-section-top ct-reveal-head">
            <div>
              <span className="eyebrow">A FEW GOOD QUESTIONS</span>
              <h2>Let&apos;s clear things up before we talk.</h2>
            </div>
            <p>
              Quick answers on engagement scoping, cost clarity, time zones, and ownership.
            </p>
          </div>

          <div className="ct-faq-list">
            {CONSULTATION_FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <article className={"ct-faq-item " + (isOpen ? "open" : "")} key={item.q}>
                  <button
                    type="button"
                    className="ct-faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={"ct-faq-" + i}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  {isOpen && (
                    <p id={"ct-faq-" + i} className="ct-faq-answer">
                      {item.a}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
