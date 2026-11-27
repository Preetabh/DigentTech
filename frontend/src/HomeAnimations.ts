import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, isLowPowerDevice } from "./utils/gsapConfig";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Transitions the active project details when CardSwap cycles or swaps cards.
 */
export function animateWorkSpotlight(container: HTMLElement | null) {
  if (!container || prefersReducedMotion()) return;

  const items = gsap.utils.toArray<HTMLElement>(".lb-work-spotlight-stagger", container);
  if (items.length) {
    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { x: 16, opacity: 0.2 },
      {
        x: 0,
        opacity: 1,
        duration: 0.44,
        stagger: 0.038,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }
    );
  }
}

export function useHomeGsapChoreography(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined" || prefersReducedMotion()) return;

    const cleanups: Array<() => void> = [];
    const lowPower = isLowPowerDevice();

    const ctx = gsap.context(() => {
      // 1. Rotating seal & hover speed acceleration (paused off-screen for GPU savings)
      const sealSvg = root.querySelector<HTMLElement>(".home-seal-svg");
      const sealWrap = root.querySelector<HTMLElement>(".home-editorial-seal");
      if (sealSvg) {
        const spinTween = gsap.to(sealSvg, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
          force3D: true,
        });

        ScrollTrigger.create({
          trigger: sealSvg,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? spinTween.play() : spinTween.pause()),
          onRefresh: (self) => (self.isActive ? spinTween.play() : spinTween.pause()),
        });

        if (sealWrap) {
          const onEnter = () => {
            gsap.to(spinTween, { timeScale: 3.6, duration: 0.45, ease: "power2.out" });
            gsap.to(".home-seal-core", { scale: 1.08, duration: 0.35, ease: "power2.out", force3D: true });
          };
          const onLeave = () => {
            gsap.to(spinTween, { timeScale: 1, duration: 0.65, ease: "power2.out" });
            gsap.to(".home-seal-core", { scale: 1, duration: 0.45, ease: "power2.out", force3D: true });
          };
          sealWrap.addEventListener("mouseenter", onEnter);
          sealWrap.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            sealWrap.removeEventListener("mouseenter", onEnter);
            sealWrap.removeEventListener("mouseleave", onLeave);
          });
        }
      }

      // 2. Hero kicker split curtain reveal
      const kickerEl = root.querySelector<HTMLElement>(".home-editorial-kicker");
      if (kickerEl) {
        const topHalf = kickerEl.querySelector<HTMLElement>(".kicker-half-top");
        const botHalf = kickerEl.querySelector<HTMLElement>(".kicker-half-bottom");
        const midBar = kickerEl.querySelector<HTMLElement>(".kicker-mid-bar");

        if (topHalf && botHalf && midBar) {
          const splitTl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.36, ease: "power3.out" },
          });
          splitTl
            .to(topHalf, { y: -10 }, 0)
            .to(botHalf, { y: 10 }, 0)
            .to(midBar, { scaleX: 1, opacity: 1, duration: 0.34, ease: "expo.out" }, 0.03);

          const play = () => splitTl.play();
          const reverse = () => splitTl.reverse();

          kickerEl.addEventListener("mouseenter", play);
          kickerEl.addEventListener("mouseleave", reverse);
          kickerEl.addEventListener("focus", play);
          kickerEl.addEventListener("blur", reverse);
          cleanups.push(() => {
            kickerEl.removeEventListener("mouseenter", play);
            kickerEl.removeEventListener("mouseleave", reverse);
            kickerEl.removeEventListener("focus", play);
            kickerEl.removeEventListener("blur", reverse);
          });
        }
      }

      // 3. Initial Hero & Showreel entrance choreography
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".home-social-rail", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, clearProps: "transform" }, 0)
        .fromTo(
          ".home-rail-links a",
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, clearProps: "transform" },
          0.12
        )
        .fromTo(
          ".home-editorial-kicker",
          { y: 24, opacity: 0.15 },
          { y: 0, opacity: 1, duration: 0.72, force3D: true, clearProps: "transform" },
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
          { scale: 0.78, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: "back.out(1.6)", clearProps: "transform,opacity" },
          0.2
        )
        .fromTo(
          "#showreel .home-cinema-video",
          { scale: 1.07 },
          { scale: 1, duration: 1.25, ease: "power3.out" },
          0.1
        );

      // 4. Scroll-linked Cinema Showreel parallax (skipped on low-power devices for smooth video playback)
      const showreelEl = root.querySelector<HTMLElement>("#showreel");
      const cinemaVideo = root.querySelector<HTMLElement>("#showreel .home-cinema-video");
      if (showreelEl && cinemaVideo && !lowPower) {
        gsap.fromTo(
          cinemaVideo,
          { yPercent: -5, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: showreelEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      }

      // 5. Sticky header scroll class elevation
      const headerEl = document.querySelector<HTMLElement>(".site-header");
      if (headerEl) {
        const onHeaderScroll = () => {
          if (window.scrollY > 50) {
            headerEl.classList.add("is-fixed");
          } else {
            headerEl.classList.remove("is-fixed");
          }
        };
        onHeaderScroll();
        window.addEventListener("scroll", onHeaderScroll, { passive: true });
        cleanups.push(() => {
          window.removeEventListener("scroll", onHeaderScroll);
          headerEl.classList.remove("is-fixed");
        });
      }

      // 6. About & FAQ frame image parallax + GSAP Viewport-Paused Marquees (smooth on all PCs, never pauses on hover)
      const bindMarquee = (selector: string, viewportSelector: string, distancePct: number, dur: number) => {
        const track = root.querySelector<HTMLElement>(selector);
        const vp = root.querySelector<HTMLElement>(viewportSelector);
        if (!track || !vp) return;

        const tween = gsap.fromTo(
          track,
          { xPercent: 0 },
          {
            xPercent: distancePct,
            duration: dur,
            ease: "none",
            repeat: -1,
            force3D: true,
            overwrite: false,
          }
        );

        const rect = vp.getBoundingClientRect();
        const initiallyVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
        if (initiallyVisible) {
          tween.play();
        } else {
          tween.pause();
        }

        ScrollTrigger.create({
          trigger: vp,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
          onRefresh: (self) => (self.isActive ? tween.play() : tween.pause()),
        });
      };
      bindMarquee(".lb-marquee-track", ".lb-marquee-viewport", -50, 38);
      bindMarquee(".lb-keyword-track", ".lb-keyword-marquee", -33.333333, 44);

      const aboutFrame = root.querySelector<HTMLElement>(".lb-about-photo-frame");
      const aboutImg = root.querySelector<HTMLElement>(".lb-about-photo-img");
      if (aboutFrame && aboutImg && !lowPower) {
        gsap.fromTo(
          aboutImg,
          { yPercent: -6, scale: 1.09 },
          {
            yPercent: 6,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: aboutFrame,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      const faqFrame = root.querySelector<HTMLElement>(".lb-faq-photo-frame");
      const faqImg = root.querySelector<HTMLElement>(".lb-faq-photo-frame img");
      if (faqFrame && faqImg && !lowPower) {
        gsap.fromTo(
          faqImg,
          { yPercent: -4, scale: 1.08 },
          {
            yPercent: 4,
            scale: 1.01,
            ease: "none",
            scrollTrigger: {
              trigger: faqFrame,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 7. Engineering delivery flow strip timeline
      const flowStrip = root.querySelector<HTMLElement>(".lb-work-flow-strip");
      if (flowStrip) {
        const lineFill = flowStrip.querySelector<HTMLElement>(".lb-work-flow-line-fill");
        const steps = gsap.utils.toArray<HTMLElement>(".lb-work-flow-step", flowStrip);
        const indices = gsap.utils.toArray<HTMLElement>(".lb-work-flow-index", flowStrip);
        const flowTl = gsap.timeline({
          scrollTrigger: {
            trigger: flowStrip,
            start: "top 88%",
            once: true,
          },
        });
        if (lineFill) {
          flowTl.fromTo(
            lineFill,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "power3.inOut", clearProps: "transform" },
            0
          );
        }
        if (steps.length) {
          flowTl.fromTo(
            steps,
            { y: 26, scale: 0.96, opacity: 0.1 },
            { y: 0, scale: 1, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity" },
            0.08
          );
        }
        if (indices.length) {
          flowTl.fromTo(
            indices,
            { scale: 0.7 },
            { scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.8)", clearProps: "transform" },
            0.12
          );
        }
      }

      // 8. Work spotlight clip reveal + subtle image scrub
      const spotlightEl = root.querySelector<HTMLElement>(".lb-work-spotlight");
      if (spotlightEl) {
        const spotMedia = spotlightEl.querySelector<HTMLElement>(".lb-work-spotlight-media");
        const spotImg = spotlightEl.querySelector<HTMLElement>(".lb-work-spotlight-media img");
        const spotItems = gsap.utils.toArray<HTMLElement>(".lb-work-spotlight-stagger", spotlightEl);
        const spotTl = gsap.timeline({
          scrollTrigger: {
            trigger: spotlightEl,
            start: "top 87%",
            once: true,
          },
        });
        if (spotMedia) {
          spotTl.fromTo(
            spotMedia,
            { y: 14, scale: 0.985, opacity: 0.45 },
            { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "power3.out", force3D: true, clearProps: "transform,opacity" },
            0
          );
        }
        if (spotItems.length) {
          spotTl.fromTo(
            spotItems,
            { x: 18, opacity: 0.3 },
            { x: 0, opacity: 1, duration: 0.46, stagger: 0.04, ease: "power3.out", force3D: true, clearProps: "transform,opacity" },
            0.08
          );
        }
        if (spotImg && !lowPower) {
          gsap.fromTo(
            spotImg,
            { yPercent: -4, scale: 1.07 },
            {
              yPercent: 4,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: spotlightEl,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.05,
              },
            }
          );
        }
      }

      // 8B. What We Do: Pure GPU ScaleY + Opacity Black Curtain (zero clip-path rasterization on low PCs) + Dual X/Y Scroll Parallax
      const whatWeDoBand = root.querySelector<HTMLElement>(".lb-whatwedo-band");
      if (whatWeDoBand) {
        const blackCurtain = whatWeDoBand.querySelector<HTMLElement>(".lb-whatwedo-black-curtain");
        const isLightTheme = () => document.documentElement.dataset.theme === "light";

        const activateBlack = (fromDirection: "up" | "down" = "down") => {
          whatWeDoBand.classList.add("is-black-active");
          if (blackCurtain && isLightTheme()) {
            gsap.set(blackCurtain, {
              transformOrigin: fromDirection === "down" ? "center top" : "center bottom",
            });
            gsap.to(blackCurtain, {
              scaleY: 1,
              opacity: 1,
              duration: 0.56,
              ease: "power3.out",
              force3D: true,
              overwrite: "auto",
            });
          }
        };

        const deactivateToWhite = (leavingDirection: "up" | "down") => {
          if (!isLightTheme()) return;
          whatWeDoBand.classList.remove("is-black-active");
          if (blackCurtain) {
            gsap.set(blackCurtain, {
              transformOrigin: leavingDirection === "down" ? "center top" : "center bottom",
            });
            gsap.to(blackCurtain, {
              scaleY: 0,
              opacity: 0,
              duration: 0.45,
              ease: "power2.inOut",
              force3D: true,
              overwrite: "auto",
            });
          }
        };

        const wwTrigger = ScrollTrigger.create({
          trigger: whatWeDoBand,
          start: "top 74%",
          end: "bottom 26%",
          onEnter: () => activateBlack("down"),
          onEnterBack: () => activateBlack("up"),
          onLeave: () => deactivateToWhite("down"),
          onLeaveBack: () => deactivateToWhite("up"),
          onRefresh: (self) => {
            if (!isLightTheme()) {
              whatWeDoBand.classList.add("is-black-active");
              if (blackCurtain) gsap.set(blackCurtain, { opacity: 1, scaleY: 1 });
              return;
            }
            if (self.isActive) {
              whatWeDoBand.classList.add("is-black-active");
              if (blackCurtain) gsap.set(blackCurtain, { opacity: 1, scaleY: 1 });
            } else {
              whatWeDoBand.classList.remove("is-black-active");
              if (blackCurtain) {
                gsap.set(blackCurtain, {
                  transformOrigin: self.progress >= 0.5 ? "center top" : "center bottom",
                  opacity: 0,
                  scaleY: 0,
                });
              }
            }
          },
        });

        const themeObs = new MutationObserver(() => {
          wwTrigger.refresh();
          wwTrigger.vars.onRefresh?.(wwTrigger);
        });
        themeObs.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        cleanups.push(() => themeObs.disconnect());

        {
          const wwHead = whatWeDoBand.querySelector<HTMLElement>(".lb-centered-header");
          if (wwHead) {
            gsap.fromTo(
              wwHead,
              { y: -20 },
              {
                y: 16,
                ease: "none",
                force3D: true,
                immediateRender: false,
                scrollTrigger: {
                  trigger: whatWeDoBand,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              }
            );
          }

          const mm = gsap.matchMedia();
          const wwCards = gsap.utils.toArray<HTMLElement>(".lb-whatwedo-grid .lb-wire-card", whatWeDoBand);
          const wwWatermarks = gsap.utils.toArray<HTMLElement>(".lb-wire-watermark", whatWeDoBand);
          const wwImages = gsap.utils.toArray<HTMLElement>(".lb-wire-media img", whatWeDoBand);

          mm.add("(min-width: 768px)", () => {
            wwCards.forEach((card, i) => {
              const col = i % 3;
              const xFrom = col === 0 ? -22 : col === 2 ? 22 : 0;
              const xTo = col === 0 ? 8 : col === 2 ? -8 : 0;
              const yFrom = col === 1 ? 34 : 20;
              const yTo = col === 1 ? -22 : -12;

              gsap.fromTo(
                card,
                { x: xFrom, y: yFrom },
                {
                  x: xTo,
                  y: yTo,
                  ease: "none",
                  force3D: true,
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: whatWeDoBand,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.85,
                  },
                }
              );
            });
          });

          mm.add("(max-width: 767px)", () => {
            wwCards.forEach((card) => {
              gsap.fromTo(
                card,
                { y: 16 },
                {
                  y: -10,
                  ease: "none",
                  force3D: true,
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.75,
                  },
                }
              );
            });
          });

          wwWatermarks.forEach((wm, i) => {
            const dir = i % 2 === 0 ? -16 : 16;
            gsap.fromTo(
              wm,
              { x: dir },
              {
                x: -dir,
                ease: "none",
                force3D: true,
                immediateRender: false,
                scrollTrigger: {
                  trigger: wm.closest(".lb-wire-card") || whatWeDoBand,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              }
            );
          });

          wwImages.forEach((img) => {
            gsap.fromTo(
              img,
              { yPercent: -4, scale: 1.05 },
              {
                yPercent: 4,
                scale: 1,
                ease: "none",
                force3D: true,
                immediateRender: false,
                scrollTrigger: {
                  trigger: img.closest(".lb-wire-media") || whatWeDoBand,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              }
            );
          });

          cleanups.push(() => mm.revert());
        }
      }

      // 9. Batched scroll reveal choreography across Home sections
      const batchTargets = [
        ".lb-centered-header",
        ".lb-about-copy > *",
        ".lb-services-grid .lb-service-box",
        ".lb-whatwedo-grid .lb-wire-card-inner",
        ".lb-cardswap-showcase",
        ".lb-cardswap-dock",
        ".lb-testimonials-grid .lb-testimonial-card",
        ".lb-infra-grid .lb-infra-card",
        ".lb-packages-stack .lb-package-row",
        ".lb-faq-photo-frame, .lb-faq-list .lb-faq-item",
        ".lb-ecosystem-grid .lb-ecosystem-card",
      ];

      batchTargets.forEach((selector) => {
        const els = gsap.utils.toArray<HTMLElement>(selector, root);
        if (!els.length) return;
        ScrollTrigger.batch(els, {
          start: "top 91%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 28, scale: 0.98, opacity: 0.12 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.72,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });
      });

      // 10. Fine-pointer magnetic controls, radial surface glows, and quickTo 3D card tilt (desktop high-power only)
      const finePointer = window.matchMedia?.("(pointer: fine)").matches;
      if (finePointer && !lowPower) {
        const magnetEls = root.querySelectorAll<HTMLElement>(
          ".home-editorial-arrow-box, .lb-btn-rect, .lb-btn-outline-rect, .lb-pkg-est-btn, .lb-fab-inquiry"
        );
        magnetEls.forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = (e.clientX - rect.left - rect.width / 2) * 0.2;
            const relY = (e.clientY - rect.top - rect.height / 2) * 0.2;
            xTo(Math.max(-7, Math.min(7, relX)));
            yTo(Math.max(-7, Math.min(7, relY)));
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

        const glowTargets = root.querySelectorAll<HTMLElement>(
          ".lb-service-box, .lb-wire-card-inner, .lb-package-row, .lb-infra-card, .lb-ecosystem-card, .lb-work-flow-step, .lb-cardswap-showcase"
        );
        glowTargets.forEach((el) => {
          const onPointerMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 100;
            const my = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty("--mx", `${mx.toFixed(1)}%`);
            el.style.setProperty("--my", `${my.toFixed(1)}%`);
          };
          el.addEventListener("pointermove", onPointerMove, { passive: true });
          cleanups.push(() => {
            el.removeEventListener("pointermove", onPointerMove);
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
