import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Orchestrates GPU-accelerated GSAP timelines, ScrollTrigger parallax,
 * staggered architectural reveals, rotary seal kinetics, and magnetic controls
 * across the Home page while respecting `prefers-reduced-motion`.
 */
export function useHomeGsapChoreography(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // 1. Continuous kinetic studio seal with interactive hover overdrive
      const sealSvg = root.querySelector<SVGSVGElement>(".home-seal-svg");
      const sealWrap = root.querySelector<HTMLElement>(".home-editorial-seal");
      if (sealSvg) {
        const sealTween = gsap.to(sealSvg, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
        });
        if (sealWrap) {
          const onEnter = () => gsap.to(sealTween, { timeScale: 3.2, duration: 0.45, ease: "power2.out" });
          const onLeave = () => gsap.to(sealTween, { timeScale: 1, duration: 0.65, ease: "power2.out" });
          sealWrap.addEventListener("mouseenter", onEnter);
          sealWrap.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            sealWrap.removeEventListener("mouseenter", onEnter);
            sealWrap.removeEventListener("mouseleave", onLeave);
          });
        }
      }

      // 1b. Interactive Split-Ribbon Hover Reveal on "DIGENT TECH"
      const kickerEl = root.querySelector<HTMLElement>(".home-editorial-kicker");
      if (kickerEl) {
        const topHalf = kickerEl.querySelector<HTMLElement>(".kicker-half-top");
        const bottomHalf = kickerEl.querySelector<HTMLElement>(".kicker-half-bottom");
        const midBar = kickerEl.querySelector<HTMLElement>(".kicker-mid-bar");

        if (topHalf && bottomHalf && midBar) {
          const hoverTl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.36, ease: "power3.out" },
          });

          hoverTl
            .to(topHalf, { y: -10 }, 0)
            .to(bottomHalf, { y: 10 }, 0)
            .to(midBar, { scaleX: 1, opacity: 1, duration: 0.34, ease: "expo.out" }, 0.03);

          const onHoverIn = () => hoverTl.play();
          const onHoverOut = () => hoverTl.reverse();

          kickerEl.addEventListener("mouseenter", onHoverIn);
          kickerEl.addEventListener("mouseleave", onHoverOut);
          kickerEl.addEventListener("focus", onHoverIn);
          kickerEl.addEventListener("blur", onHoverOut);
          cleanups.push(() => {
            kickerEl.removeEventListener("mouseenter", onHoverIn);
            kickerEl.removeEventListener("mouseleave", onHoverOut);
            kickerEl.removeEventListener("focus", onHoverIn);
            kickerEl.removeEventListener("blur", onHoverOut);
          });
        }
      }

      // 2. Opening architectural masthead timeline
      const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      introTl
        .fromTo(
          ".home-social-rail",
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, clearProps: "transform" },
          0
        )
        .fromTo(
          ".home-rail-links a",
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, clearProps: "transform" },
          0.12
        )
        .fromTo(
          ".home-editorial-kicker",
          { y: 42, clipPath: "inset(0 0 100% 0)", opacity: 0.15 },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.9,
            clearProps: "clipPath,transform",
          },
          0.05
        )
        .fromTo(
          ".home-editorial-title",
          { y: 34, opacity: 0.1 },
          { y: 0, opacity: 1, duration: 0.85, clearProps: "transform" },
          0.18
        )
        .fromTo(
          ".home-editorial-disciplines",
          { y: 20, opacity: 0.1 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: "transform" },
          0.32
        )
        .fromTo(
          ".home-editorial-seal",
          { scale: 0.78, opacity: 0.15 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)", clearProps: "transform" },
          0.15
        )
        .fromTo(
          [".home-editorial-note", ".home-editorial-proof-row"],
          { y: 24, opacity: 0.15 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, clearProps: "transform" },
          0.26
        )
        .fromTo(
          ".home-avatar-stack > *",
          { scale: 0.72, opacity: 0.2 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.6)", clearProps: "transform" },
          0.38
        )
        .fromTo(
          "#showreel .home-cinema-video",
          { scale: 1.07 },
          { scale: 1.0, duration: 1.25, ease: "power3.out" },
          0.1
        );

      // 3. Scroll-linked full-bleed video parallax & controls float
      const showreelEl = root.querySelector<HTMLElement>("#showreel");
      const cinemaVideo = root.querySelector<HTMLElement>("#showreel .home-cinema-video");
      if (showreelEl && cinemaVideo) {
        gsap.fromTo(
          cinemaVideo,
          { yPercent: -5, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: showreelEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );

        gsap.to("#showreel .home-cinema-controls", {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: showreelEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }

      // 4. Post-reel editorial bridge & capability ribbon wave
      gsap.fromTo(
        ".home-post-reel-bridge .wrap > *",
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".home-post-reel-bridge",
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".capability-strip > .wrap > *",
        { y: 18, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".capability-strip",
            start: "top 92%",
            once: true,
          },
        }
      );

      // 5. Deep Research Console split spotlight reveal
      const consoleSection = root.querySelector("#executive-console");
      if (consoleSection) {
        gsap.fromTo(
          ".home-console-intro > *",
          { x: -24, opacity: 0.2 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: consoleSection,
              start: "top 86%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".lux-console-wrapper",
          { y: 34, scale: 0.975, opacity: 0.2 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: consoleSection,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      // 6. Batched staggered card choreography across lower sections
      const batchTargets = [
        ".home-metrics-ribbon .metric-box",
        ".lux-workbench-section .lux-dossier-sheet",
        ".services-grid .service-card",
        ".projects-grid .project-card",
        ".home-tech-grid .home-tech-card",
        ".why-us-grid .why-card",
        ".testimonials-grid .testimonial-card",
        ".process-grid article",
        ".home-faq-list .home-faq-item",
      ];

      batchTargets.forEach((selector) => {
        const els = gsap.utils.toArray<HTMLElement>(selector, root);
        if (!els.length) return;
        ScrollTrigger.batch(els, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 26, opacity: 0.25 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      });

      // 7. Magnetic hover physics for fine-pointer desktop controls
      const finePointer = window.matchMedia?.("(pointer: fine)").matches;
      if (finePointer) {
        const magnetEls = root.querySelectorAll<HTMLElement>(
          ".home-editorial-arrow-box, .home-lux-primary-btn"
        );
        magnetEls.forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = (e.clientX - rect.left - rect.width / 2) * 0.22;
            const relY = (e.clientY - rect.top - rect.height / 2) * 0.22;
            xTo(Math.max(-8, Math.min(8, relX)));
            yTo(Math.max(-8, Math.min(8, relY)));
          };

          const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.45)" });
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
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
  }, [rootRef]);
}
