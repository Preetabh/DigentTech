import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Low-PC friendly global GSAP runtime tuning: prevent jump bursts after GC/tab switches
gsap.ticker.lagSmoothing(500, 33);
gsap.defaults({
  ease: "power2.out",
  overwrite: "auto",
});

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

/**
 * Detects reduced-motion preferences or ultra-constrained hardware (<= 2 CPU cores / <= 2GB RAM)
 * so heavy continuous video/pointer listeners step down without disabling core marquee/scroll motion.
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return cores <= 2 || memory <= 2;
}

export { gsap, ScrollTrigger };

