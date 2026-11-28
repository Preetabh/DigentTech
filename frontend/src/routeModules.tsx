import React, { lazy, type ComponentType } from "react";

export interface RouteModuleSet {
  WorkPage: ComponentType<{ initialProjectId?: string }>;
  ServicesPage: ComponentType<{ services: unknown[] }>;
  WebDevelopment: ComponentType;
  AppDevelopment: ComponentType;
  DigitalMarketing: ComponentType;
  AISolutions: ComponentType;
  AboutPage: ComponentType;
  CareersPage: ComponentType;
  ContactPage: ComponentType<{ theme?: "dark" | "light"; email: string; availableServices: string[] }>;
  GhostFibers: ComponentType<Record<string, unknown>>;
}

type LoaderMap = {
  [K in keyof RouteModuleSet]: () => Promise<{ default: RouteModuleSet[K] }>;
};

const resolvedCache: Partial<RouteModuleSet> = {};

const loaders: LoaderMap = {
  WorkPage: () => import("./WorkPage").then((m) => ({ default: m.WorkPage })),
  ServicesPage: () =>
    import("./ServicesPage").then((m) => ({
      default: m.ServicesPage as RouteModuleSet["ServicesPage"],
    })),
  WebDevelopment: () => import("./WebDevelopment").then((m) => ({ default: m.WebDevelopment })),
  AppDevelopment: () => import("./AppDevelopment").then((m) => ({ default: m.AppDevelopment })),
  DigitalMarketing: () => import("./DigitalMarketing").then((m) => ({ default: m.DigitalMarketing })),
  AISolutions: () => import("./AISolutions").then((m) => ({ default: m.AISolutions })),
  AboutPage: () => import("./AboutPage").then((m) => ({ default: m.AboutPage })),
  CareersPage: () => import("./CareersPage").then((m) => ({ default: m.CareersPage })),
  ContactPage: () => import("./ContactPage").then((m) => ({ default: m.ContactPage })),
  GhostFibers: () =>
    import("./GhostFibers").then((m) => ({
      default: m.default as unknown as RouteModuleSet["GhostFibers"],
    })),
};

function makeComponent<K extends keyof RouteModuleSet>(
  key: K,
  ssrPages?: RouteModuleSet
): RouteModuleSet[K] {
  if (ssrPages?.[key]) return ssrPages[key];
  if (resolvedCache[key]) return resolvedCache[key] as RouteModuleSet[K];
  return lazy(async () => {
    const mod = await loaders[key]();
    resolvedCache[key] = mod.default;
    return mod;
  }) as unknown as RouteModuleSet[K];
}

export function getRouteComponents(ssrPages?: RouteModuleSet): RouteModuleSet {
  return {
    WorkPage: makeComponent("WorkPage", ssrPages),
    ServicesPage: makeComponent("ServicesPage", ssrPages),
    WebDevelopment: makeComponent("WebDevelopment", ssrPages),
    AppDevelopment: makeComponent("AppDevelopment", ssrPages),
    DigitalMarketing: makeComponent("DigitalMarketing", ssrPages),
    AISolutions: makeComponent("AISolutions", ssrPages),
    AboutPage: makeComponent("AboutPage", ssrPages),
    CareersPage: makeComponent("CareersPage", ssrPages),
    ContactPage: makeComponent("ContactPage", ssrPages),
    GhostFibers: makeComponent("GhostFibers", ssrPages),
  };
}

export async function preloadRouteModule(pathname: string): Promise<void> {
  const clean = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  const toLoad: Array<keyof RouteModuleSet> = [];

  if (clean === "/work" || clean === "/projects" || clean.startsWith("/work/")) {
    toLoad.push("WorkPage");
  } else if (clean === "/services") {
    toLoad.push("ServicesPage");
  } else if (clean === "/web-development") {
    toLoad.push("WebDevelopment");
  } else if (clean === "/app-development") {
    toLoad.push("AppDevelopment");
  } else if (clean === "/digital-marketing") {
    toLoad.push("DigitalMarketing");
  } else if (clean === "/ai-solutions") {
    toLoad.push("AISolutions");
  } else if (clean === "/about") {
    toLoad.push("AboutPage");
  } else if (clean === "/careers") {
    toLoad.push("CareersPage");
  } else if (clean === "/contact") {
    toLoad.push("ContactPage");
  } else if (clean !== "/") {
    toLoad.push("GhostFibers");
  }

  await Promise.all(
    toLoad.map(async (key) => {
      if (!resolvedCache[key]) {
        const mod = await loaders[key]();
        (resolvedCache as Record<keyof RouteModuleSet, unknown>)[key] = mod.default;
      }
    })
  );
}
