import { useEffect, useRef } from "react";

/**
 * WebTechCanvas
 * High-tech connected node constellation and interactive particle grid for Web Development.
 * Simulates distributed edge networks, servers, and sub-second data pipelines.
 */
export function WebTechCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Pointer coordinates normalized
    const mouse = { x: -1000, y: -1000, active: false };

    // Node particle definition
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      pulseSpeed: number;
      pulseAngle: number;
      colorIndex: number;
    }

    let nodes: Node[] = [];
    const nodeCount = 55;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize nodes on major resize
      if (nodes.length === 0 || Math.abs(nodes[0].x) > width + 100) {
        initNodes();
      }
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 2 + 1.2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius,
          baseRadius: radius,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulseAngle: Math.random() * Math.PI * 2,
          colorIndex: Math.floor(Math.random() * 3),
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";
      const maxDistance = Math.min(width, height) * 0.22;

      // Color palettes
      const colors = isLight
        ? [
            "rgba(37, 99, 235, ", // royal blue
            "rgba(14, 165, 233, ", // sky blue
            "rgba(99, 102, 241, ", // indigo
          ]
        : [
            "rgba(56, 189, 248, ", // cyan
            "rgba(96, 165, 250, ", // light blue
            "rgba(129, 140, 248, ", // violet
          ];

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // Move nodes
        a.x += a.vx;
        a.y += a.vy;

        // Bounce gently at boundaries
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        // Pointer repulsion / interaction
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRepel = 120;
          if (dist < maxRepel && dist > 0) {
            const force = (1 - dist / maxRepel) * 1.5;
            a.x += (dx / dist) * force;
            a.y += (dy / dist) * force;
          }
        }

        // Pulse radius
        a.pulseAngle += a.pulseSpeed;
        a.radius = a.baseRadius + Math.sin(a.pulseAngle) * 0.8;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * (isLight ? 0.22 : 0.35);
            ctx.strokeStyle = colors[a.colorIndex] + opacity + ")";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw mouse connection if nearby
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.45;
            ctx.strokeStyle = colors[0] + opacity + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Draw Node glowing circle
        ctx.beginPath();
        ctx.arc(a.x, a.y, Math.max(1, a.radius), 0, Math.PI * 2);
        ctx.fillStyle = colors[a.colorIndex] + (isLight ? "0.6)" : "0.85)");
        ctx.fill();

        // Subtle outer glow ring on key nodes
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = colors[a.colorIndex] + (isLight ? "0.15)" : "0.22)");
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      if (!media.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      resize();
      render();
    };

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) render();
      else if (!isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    viewObserver.observe(canvas);

    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", handlePointerMove);
    parent?.addEventListener("pointerleave", handlePointerLeave);

    start();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      viewObserver.disconnect();
      parent?.removeEventListener("pointermove", handlePointerMove);
      parent?.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className="service-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

/**
 * AppMotionCanvas
 * Fluid touch-physics gesture field and glowing interactive ripple rings for App Development.
 * Reflects silky 60fps mobile responsiveness, haptic ripples, and native gesture kinetics.
 */
export function AppMotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let isVisible = true;

    // Interactive touch ripple state
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }

    const ripples: Ripple[] = [];
    const pointer = { x: 0.5, y: 0.5, isDown: false };
    let smoothX = 0.5;
    let smoothY = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / width;
      pointer.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / height));

      // Occasional ripple creation on movement
      if (Math.random() < 0.12 && ripples.length < 8) {
        ripples.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 0,
          maxRadius: Math.random() * 80 + 50,
          opacity: 0.6,
          speed: Math.random() * 1.5 + 1.2,
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 140,
        opacity: 0.8,
        speed: 2.2,
      });
    };

    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }

      time += 0.012;
      smoothX += (pointer.x - smoothX) * 0.03;
      smoothY += (pointer.y - smoothY) * 0.03;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";

      // 1. Draw organic kinetic gesture waves (silky multi-frequency ribbon)
      const waveCount = 20;
      for (let n = 0; n < waveCount; n++) {
        const progress = n / waveCount;
        const gradient = ctx.createLinearGradient(0, 0, width, height);

        if (isLight) {
          gradient.addColorStop(0, "rgba(37, 99, 235, 0)");
          gradient.addColorStop(0.3, "rgba(37, 99, 235, 0.12)");
          gradient.addColorStop(0.7, "rgba(147, 51, 234, 0.1)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        } else {
          gradient.addColorStop(0, "rgba(56, 189, 248, 0)");
          gradient.addColorStop(0.3, "rgba(59, 130, 246, 0.22)");
          gradient.addColorStop(0.7, "rgba(168, 85, 247, 0.18)");
          gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.beginPath();

        const step = 10;
        for (let x = 0; x <= width; x += step) {
          const p = x / width;
          const wave1 = Math.sin(p * 3.8 + time + n * 0.06) * height * 0.14;
          const wave2 = Math.cos(p * 6.2 - time * 0.7 + n * 0.04) * height * 0.05;
          const gestureOffset = (smoothY - 0.5) * height * 0.16 * Math.sin(p * Math.PI);
          const y = height * 0.54 + wave1 + wave2 + gestureOffset + (n - 10) * 6;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 2. Draw active touch ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.96;

        if (r.opacity < 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(37, 99, 235, ${r.opacity * 0.4})`
          : `rgba(56, 189, 248, ${r.opacity * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Ambient floating gesture beacons
      const beaconCount = 6;
      for (let b = 0; b < beaconCount; b++) {
        const bx = width * (0.2 + b * 0.14) + Math.cos(time + b) * 25;
        const by = height * (0.35 + (b % 3) * 0.18) + Math.sin(time * 0.8 + b * 1.5) * 20;
        const rad = 3 + Math.sin(time * 2 + b) * 1.5;

        ctx.beginPath();
        ctx.arc(bx, by, rad, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "rgba(37, 99, 235, 0.4)" : "rgba(56, 189, 248, 0.65)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bx, by, rad * 3, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? "rgba(37, 99, 235, 0.1)" : "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!media.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      resize();
      render();
    };

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) render();
      else if (!isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    viewObserver.observe(canvas);

    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", handlePointerMove);
    parent?.addEventListener("pointerdown", handlePointerDown);

    start();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      viewObserver.disconnect();
      parent?.removeEventListener("pointermove", handlePointerMove);
      parent?.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return <canvas className="service-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

/**
 * AboutStudioCanvas
 * Luxury ambient geometric constellation and harmonic studio light field.
 * Reflects precision craftsmanship, architectural connections, and intentional design.
 */
export function AboutStudioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = { x: -1000, y: -1000, active: false };

    interface StudioPoint {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      phase: number;
    }

    let points: StudioPoint[] = [];
    const pointCount = 42;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (points.length === 0 || Math.abs(points[0].x) > width + 100) {
        initPoints();
      }
    };

    const initPoints = () => {
      points = [];
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2.2 + 1.2,
          alpha: Math.random() * 0.5 + 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    let time = 0;
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";
      const primaryColor = isLight ? "rgba(34, 95, 218, " : "rgba(107, 159, 255, ";
      const lineColor = isLight ? "rgba(34, 95, 218, " : "rgba(56, 189, 248, ";

      // Update and draw points
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Bounce borders
        if (pt.x < 0 || pt.x > width) pt.vx *= -1;
        if (pt.y < 0 || pt.y > height) pt.vy *= -1;

        // Mouse repelling/attracting
        if (mouse.active) {
          const dx = mouse.x - pt.x;
          const dy = mouse.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            pt.x -= (dx / dist) * force * 1.5;
            pt.y -= (dy / dist) * force * 1.5;
          }
        }

        // Draw point
        const pulse = Math.sin(time * 2 + pt.phase) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `${primaryColor}${pt.alpha * pulse})`;
        ctx.fill();

        // Connect near points
        for (let j = i + 1; j < points.length; j++) {
          const pt2 = points[j];
          const dx = pt.x - pt2.x;
          const dy = pt.y - pt2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!media.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      resize();
      render();
    };

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) render();
      else if (!isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    viewObserver.observe(canvas);

    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", handlePointerMove);
    parent?.addEventListener("pointerleave", handlePointerLeave);

    start();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      viewObserver.disconnect();
      parent?.removeEventListener("pointermove", handlePointerMove);
      parent?.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className="service-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

/**
 * MarketingRadarCanvas
 * Telemetry growth radar & RoAS harmonic curve simulation for Digital Marketing.
 * Features rotating radar sweep, conversion blip beacons, and dynamic growth trajectories.
 */
export function MarketingRadarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = { x: -1000, y: -1000, active: false };

    interface Beacon {
      angle: number;
      distNorm: number;
      baseRadius: number;
      pulse: number;
      valLabel: string;
      roas: string;
      color: string;
    }

    let beacons: Beacon[] = [];
    const beaconLabels = [
      { l: "Google Search", r: "4.8x", c: "#4285F4" },
      { l: "Meta CAPI", r: "5.2x", c: "#0082fb" },
      { l: "Klaviyo VIP", r: "8.6x", c: "#10b981" },
      { l: "Organic SEO", r: "6.1x", c: "#f59e0b" },
      { l: "TikTok Spark", r: "3.9x", c: "#ec4899" },
      { l: "YouTube Pre-roll", r: "4.1x", c: "#ef4444" },
      { l: "Omni Retarget", r: "7.4x", c: "#8b5cf6" },
      { l: "Affiliate Rev", r: "5.8x", c: "#06b6d4" },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (beacons.length === 0) {
        initBeacons();
      }
    };

    const initBeacons = () => {
      beacons = beaconLabels.map((b, i) => ({
        angle: (i / beaconLabels.length) * Math.PI * 2 + Math.random() * 0.3,
        distNorm: 0.28 + (i % 4) * 0.18,
        baseRadius: 3 + Math.random() * 2,
        pulse: 0,
        valLabel: b.l,
        roas: b.r,
        color: b.c,
      }));
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    let sweepAngle = 0;
    let time = 0;

    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }

      time += 0.016;
      sweepAngle = (sweepAngle + 0.018) % (Math.PI * 2);

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";
      const cx = width > 768 ? width * 0.65 : width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      const gridStroke = isLight ? "rgba(34, 95, 218, 0.09)" : "rgba(107, 159, 255, 0.12)";
      const crosshairColor = isLight ? "rgba(34, 95, 218, 0.07)" : "rgba(255, 255, 255, 0.08)";

      // Draw Concentric Radar Rings
      const ringCounts = 4;
      for (let r = 1; r <= ringCounts; r++) {
        const radius = (maxR / ringCounts) * r;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = gridStroke;
        ctx.lineWidth = r === ringCounts ? 1.5 : 1;
        if (r % 2 === 1) {
          ctx.setLineDash([4, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sweeping radar beam gradient cone
      const coneAngle = 0.5; // radians
      const sweepGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      const sweepStartColor = isLight ? "rgba(37, 99, 235, 0.22)" : "rgba(56, 189, 248, 0.28)";
      sweepGradient.addColorStop(0, sweepStartColor);
      sweepGradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - coneAngle, sweepAngle, false);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Sweep frontier line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
      ctx.strokeStyle = isLight ? "rgba(37, 99, 235, 0.6)" : "rgba(56, 189, 248, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ambient Growth Sine Curves across bottom
      ctx.beginPath();
      ctx.moveTo(0, height * 0.78);
      for (let x = 0; x <= width; x += 12) {
        const y = height * 0.78 - Math.sin(x * 0.008 + time * 1.5) * 24 - Math.cos(x * 0.003 - time) * 16;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isLight ? "rgba(37, 99, 235, 0.16)" : "rgba(34, 197, 94, 0.22)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Draw Beacons & telemetry blips
      for (let i = 0; i < beacons.length; i++) {
        const b = beacons[i];
        const bx = cx + Math.cos(b.angle) * (b.distNorm * maxR);
        const by = cy + Math.sin(b.angle) * (b.distNorm * maxR);

        // Check if radar sweep just touched this beacon
        let angleDiff = sweepAngle - b.angle;
        while (angleDiff < 0) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI * 2) angleDiff -= Math.PI * 2;

        if (angleDiff < 0.25) {
          b.pulse = 1;
        } else {
          b.pulse = Math.max(0, b.pulse - 0.012);
        }

        // Mouse hover interaction
        let mouseBoost = 0;
        if (mouse.active) {
          const mdx = bx - mouse.x;
          const mdy = by - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100) {
            mouseBoost = (100 - mdist) / 100;
          }
        }

        const activeStrength = Math.max(b.pulse, mouseBoost);

        // Draw beacon glow ring
        if (activeStrength > 0.05) {
          ctx.beginPath();
          ctx.arc(bx, by, b.baseRadius + activeStrength * 10, 0, Math.PI * 2);
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = activeStrength * 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // Draw beacon core dot
        ctx.beginPath();
        ctx.arc(bx, by, b.baseRadius + activeStrength * 2, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Draw subtle data label if active
        if (activeStrength > 0.4 || mouseBoost > 0.2) {
          ctx.fillStyle = isLight ? "#0f172a" : "#f8fafc";
          ctx.font = "10px monospace";
          ctx.fillText(`${b.valLabel} (${b.roas})`, bx + 8, by - 4);
        }
      }

      if (!media.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      resize();
      render();
    };

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) render();
      else if (!isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    viewObserver.observe(canvas);

    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", handlePointerMove);
    parent?.addEventListener("pointerleave", handlePointerLeave);

    start();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      viewObserver.disconnect();
      parent?.removeEventListener("pointermove", handlePointerMove);
      parent?.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className="service-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

/**
 * AINeuralCanvas
 * Synaptic neural decision mesh & autonomous agent vector flow for AI & Automation.
 * Features multi-layer agent clusters, firing action potentials, and dynamic pointer forcefields.
 */
export function AINeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = { x: -1000, y: -1000, active: false };

    interface Synapse {
      from: number;
      to: number;
      progress: number;
      speed: number;
      color: string;
    }

    interface Neuron {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      layer: number;
      connections: number[];
    }

    let neurons: Neuron[] = [];
    let pulses: Synapse[] = [];
    const neuronCount = 48;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (neurons.length === 0) {
        initNeuralNet();
      }
    };

    const initNeuralNet = () => {
      neurons = [];
      pulses = [];

      for (let i = 0; i < neuronCount; i++) {
        const layer = Math.floor(Math.random() * 4);
        neurons.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2.2 + 1.8,
          pulse: Math.random() * Math.PI * 2,
          layer,
          connections: [],
        });
      }

      // Establish connections between nearby neurons
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && neurons[i].connections.length < 4) {
            neurons[i].connections.push(j);
            if (Math.random() > 0.4) {
              pulses.push({
                from: i,
                to: j,
                progress: Math.random(),
                speed: 0.008 + Math.random() * 0.012,
                color: ["#10b981", "#8b5cf6", "#38bdf8"][Math.floor(Math.random() * 3)],
              });
            }
          }
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    let time = 0;

    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }

      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";
      const neuronBaseColor = isLight ? "rgba(34, 95, 218, " : "rgba(16, 185, 129, ";
      const axonColor = isLight ? "rgba(34, 95, 218, " : "rgba(107, 159, 255, ";

      // Update and draw neurons
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;

        // Pointer repulsion / magnetic tether
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const pull = (160 - dist) / 160;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isLight ? `rgba(37, 99, 235, ${pull * 0.35})` : `rgba(52, 211, 153, ${pull * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw neuron core
        const pulseVal = Math.sin(time * 2 + n.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulseVal, 0, Math.PI * 2);
        ctx.fillStyle = `${neuronBaseColor}${0.65 * pulseVal})`;
        ctx.fill();

        // Connect axons
        for (const targetIdx of n.connections) {
          const target = neurons[targetIdx];
          if (!target) continue;
          const dx = n.x - target.x;
          const dy = n.y - target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `${axonColor}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw firing synaptic action potential pulses
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
        }

        const source = neurons[pulse.from];
        const target = neurons[pulse.to];
        if (!source || !target) continue;

        const px = source.x + (target.x - source.x) * pulse.progress;
        const py = source.y + (target.y - source.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!media.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      resize();
      render();
    };

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) render();
      else if (!isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    viewObserver.observe(canvas);

    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", handlePointerMove);
    parent?.addEventListener("pointerleave", handlePointerLeave);

    start();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      viewObserver.disconnect();
      parent?.removeEventListener("pointermove", handlePointerMove);
      parent?.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className="service-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

