import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ThemeImage } from "./VisualExperience";

export function BrandLogo() {
  return (
    <a className="logo" href="/" aria-label="DigentTech home">
      <img src="/assets/logo.png" alt="DigentTech" width="56" height="56" />
      <span className="brand-text">
        DigentTech<small>DESIGN & DEVELOPMENT</small>
      </span>
    </a>
  );
}

// A restrained, pointer-responsive flow field. No external animation runtime.
export function FlowField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      visible = true,
      time = 0;
    const pointer = { x: 0.5, y: 0.5 };
    let smoothY = 0.5;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / width;
      pointer.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / height));
    };
    const draw = () => {
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }
      time += 0.009;
      smoothY += (pointer.y - smoothY) * 0.025;
      ctx.clearRect(0, 0, width, height);
      const light = document.documentElement.dataset.theme === "light";
      for (let n = 0; n < 30; n++) {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(
          0,
          light ? "rgba(37,99,235,0)" : "rgba(31,102,255,0)",
        );
        gradient.addColorStop(
          0.35,
          light ? "rgba(37,99,235,.14)" : "rgba(60,118,255,.28)",
        );
        gradient.addColorStop(
          0.7,
          light ? "rgba(110,66,225,.12)" : "rgba(95,205,245,.25)",
        );
        gradient.addColorStop(1, "rgba(99,69,245,0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const p = x / width;
          const wave = Math.sin(p * 4.6 + time + n * 0.035) * height * 0.17;
          const ripple =
            Math.cos(p * 8 - time * 0.55 + n * 0.05) * height * 0.04;
          const y =
            height * 0.56 +
            wave +
            ripple +
            (n - 15) * 5 +
            (smoothY - 0.5) * height * 0.12 * Math.sin(p * Math.PI);
          if (!x) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      if (!media.matches) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      resize();
      draw();
    };
    const observer = new ResizeObserver(start);
    observer.observe(canvas);
    const view = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) draw();
        else if (!visible) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    view.observe(canvas);
    const resume = () => {
      if (!document.hidden && visible && !frame) draw();
    };
    canvas.parentElement?.addEventListener("pointermove", move);
    document.addEventListener("visibilitychange", resume);
    media.addEventListener("change", start);
    start();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      view.disconnect();
      canvas.parentElement?.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", resume);
      media.removeEventListener("change", start);
    };
  }, []);
  return <canvas className="flow-field" ref={ref} aria-hidden="true" />;
}

export function HeroProject() {
  const [active, setActive] = useState(0);
  const items = [
    {
      name: "InfraPilot",
      sub: "Construction operations, in one place.",
      image: "/assets/projects/infrapilot-crm-portal.png",
      type: "ERP / CRM PLATFORM",
    },
    {
      name: "HrMitra",
      sub: "An HR workspace built around the working day.",
      image: "/assets/projects/hrmitra-hrm-portal.png",
      type: "WORKFORCE MANAGEMENT",
    },
  ];
  const item = items[active];
  return (
    <div className="hero-product">
      <div className="product-overline">
        <span>
          <i /> A LOOK INSIDE OUR WORK
        </span>
        <Code2 size={18} />
      </div>
      <div className="hero-image-stage">
        <ThemeImage
          alt="Sculptural blue glass and silver chrome brand study"
          className="hero-brand-art"
          priority
        />
        <div className="product-window">
          <div className="browser-bar">
            <div className="browser-dots">
              <i />
              <i />
              <i />
            </div>
            <span>{item.name.toLowerCase()} / dashboard</span>
            <span className="window-plus">＋</span>
          </div>
          <img
            key={item.name}
            src={item.image}
            alt={item.name + " dashboard preview"}
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="product-caption">
        <div>
          <span className="eyebrow">{item.type}</span>
          <h3>{item.name}</h3>
          <p>{item.sub}</p>
        </div>
        <a
          className="round-link"
          href="/work"
          aria-label={"Explore " + item.name}
        >
          <ArrowUpRight size={23} />
        </a>
      </div>
      <div
        className="project-tabs"
        role="tablist"
        aria-label="Featured project"
      >
        {items.map((p, i) => (
          <button
            key={p.name}
            id={"project-tab-" + i}
            role="tab"
            aria-selected={active === i}
            aria-controls="featured-project"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                setActive(1 - active);
                document.getElementById("project-tab-" + (1 - active))?.focus();
              }
            }}
          >
            <span>0{i + 1}</span>
            {p.name}
            <ArrowRight size={14} />
          </button>
        ))}
      </div>
      <div
        id="featured-project"
        role="tabpanel"
        aria-labelledby={"project-tab-" + active}
        className="sr-only"
      >
        {item.name}: {item.sub}
      </div>
    </div>
  );
}

export function StudioNote() {
  return (
    <section className="studio-note section wrap">
      <div className="studio-heading">
        <span className="eyebrow">A NOTE FROM THE STUDIO</span>
        <span className="studio-signature">
          Every project starts
          <br />
          with a good question.
        </span>
      </div>
      <div className="studio-copy">
        <h2>
          The details are
          <br />
          our <em>day job.</em>
        </h2>
        <p>
          Before we draw a screen, we ask how your business runs. What do
          customers need to find? Where does the team lose time? Which part of
          your current setup gets in the way?
        </p>
        <p>
          Those answers shape the work. We sketch the journeys, put prototypes
          in your hands, and review the details together. The result should feel
          like your business, from the first click to the everyday workflow.
        </p>
        <a href="/about" className="text-link">
          The people & the thinking <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="studio-seal" aria-hidden="true">
        <span>DigentTech</span>
        <img src="/assets/logo.png" alt="DigentTech" />
        <span>DETAILS MAKE THE DIFFERENCE</span>
      </div>
    </section>
  );
}
