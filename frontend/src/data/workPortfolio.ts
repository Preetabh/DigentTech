export type WorkCategoryId = "web" | "mobile" | "ai" | "design";

export type WorkLayoutVariant =
  | "editorial-full"
  | "split-left"
  | "split-right"
  | "mosaic-tall"
  | "mosaic-wide"
  | "compact";

export interface ArchitectureLayerNode {
  layer: string;
  title: string;
  detail: string;
  protocol: string;
}

export interface StackDependency {
  name: string;
  role: "Frontend" | "Backend" | "Mobile" | "AI / ML" | "Database" | "Cloud / Edge" | "Systems / QA";
}

export interface ProjectFeatureItem {
  title: string;
  detail: string;
}

export interface ProcessStageItem {
  code: string;
  title: string;
  shortTitle: string;
  summary: string;
  deliverables: string[];
  verificationGate: string;
}

export interface CapabilityArea {
  id: string;
  code: string;
  title: string;
  summary: string;
  connectedTo: string[];
  technologies: {
    name: string;
    logoKey:
      | "nextjs"
      | "typescript"
      | "tailwind"
      | "nodego"
      | "postgres"
      | "cloudflare"
      | "graphql"
      | "playwright"
      | "reactnative"
      | "flutter"
      | "swiftkotlin"
      | "sqlite"
      | "supabase"
      | "fastlane"
      | "openai"
      | "langchain"
      | "pinecone"
      | "fastapi"
      | "docker";
  }[];
  projectIds: string[];
}

export interface WorkProject {
  id: string;
  index: string;
  name: string;
  tagline: string;
  category: WorkCategoryId;
  categoryLabel: string;
  industry: string;
  engagementModel: string;
  image: string;
  alt: string;
  layoutVariant: WorkLayoutVariant;
  overview: string;
  businessProblem: string;
  engineeringApproach: string;
  architectureSummary: string;
  architectureLayers: ArchitectureLayerNode[];
  flowStages: string[];
  stackDetails: StackDependency[];
  keyFeatures: ProjectFeatureItem[];
  processHighlights: { stage: string; artifact: string }[];
  engineeringOutcomes: string[];
  serviceRoute: string;
  relatedIds: string[];
}

export const DEVELOPMENT_PROCESS_STAGES: ProcessStageItem[] = [
  {
    code: "01",
    title: "Discovery & Research",
    shortTitle: "Discovery",
    summary:
      "System bottleneck profiling, user journey instrumentation, and technical feasibility scoping before any code is committed.",
    deliverables: [
      "Domain boundary map",
      "Latency & concurrency budget",
      "Technical RFC brief",
    ],
    verificationGate: "Signed scope spec & data flow diagram",
  },
  {
    code: "02",
    title: "Architecture & Planning",
    shortTitle: "Architecture",
    summary:
      "Schema modeling, API contracts, security boundary design, and dual-theme UI token specification.",
    deliverables: [
      "PostgreSQL / vector schema",
      "Typed REST / GraphQL contracts",
      "Component token library",
    ],
    verificationGate: "Architecture sign-off & threat checklist",
  },
  {
    code: "03",
    title: "Engineering & Development",
    shortTitle: "Engineering",
    summary:
      "Iterative full-stack sprints combining clean modular frontend interfaces, resilient backend services, and hardware-native mobile layers.",
    deliverables: [
      "Modular React / Next.js & mobile apps",
      "Backend & AI pipelines",
      "Continuous staging builds",
    ],
    verificationGate: "Strict TypeScript compile & PR review",
  },
  {
    code: "04",
    title: "Quality Assurance",
    shortTitle: "QA & Hardening",
    summary:
      "Automated end-to-end verification, responsive viewport matrix checks, accessibility audits, and concurrency edge testing.",
    deliverables: [
      "Playwright E2E suite",
      "Light & dark visual regression checks",
      "WCAG contrast & keyboard pass",
    ],
    verificationGate: "Zero console errors & zero layout overflow",
  },
  {
    code: "05",
    title: "Deployment & Optimization",
    shortTitle: "Deployment",
    summary:
      "Edge-cached production rollout, bundle budget trimming, structured SEO schema injection, and clean source repository transfer.",
    deliverables: [
      "Edge worker / container deploy",
      "Sitemap & JSON-LD metadata",
      "100% repository ownership",
    ],
    verificationGate: "Verified production build & DNS parity",
  },
  {
    code: "06",
    title: "Continuous Improvement",
    shortTitle: "Evolution",
    summary:
      "Observability feedback loops, telemetry tracing, incremental feature expansion, and architectural evolution as usage scales.",
    deliverables: [
      "Runbook & architecture docs",
      "Telemetry instrumentation hooks",
      "Modular extension seams",
    ],
    verificationGate: "Maintainable handoff & release cadence",
  },
];

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "pulsemesh-neural-ops",
    index: "01",
    name: "PulseMesh Neural Ops",
    tagline: "Autonomous multi-agent dispatch graph and policy solver",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    industry: "Logistics & Fleet Operations",
    engagementModel: "End-to-End AI Platform",
    image: "/assets/projects/work-pulsemesh-ai.webp",
    alt: "PulseMesh Neural Ops autonomous dispatch graph and routing workstation",
    layoutVariant: "editorial-full",
    overview:
      "PulseMesh Neural Ops unites multi-agent spatial routing, vector corridor lookup, and deterministic human-in-the-loop override controls inside a single dispatch workstation.",
    businessProblem:
      "Dispatch coordinators relied on fragmented spreadsheets and static alert feeds to manage concurrent hub exceptions, creating manual bottlenecks whenever weather or capacity disruptions rippled across corridors.",
    engineeringApproach:
      "We separated real-time telemetry ingestion from deterministic LangGraph policy evaluation, pairing Qdrant semantic retrieval with auditable replay logs and strict schema-validated actions before route commits.",
    architectureSummary:
      "Event streams normalize hub telemetry into vector-indexed corridor states, evaluate multi-step routing policies in Python FastAPI agents, and push live topology diffs over WebSockets to the React dispatch UI.",
    architectureLayers: [
      {
        layer: "INGEST",
        title: "Telemetry Stream Mesh",
        detail: "Normalizes vehicle GPS, weather feeds, and hub slot capacity events.",
        protocol: "WebSockets · JSON Schema",
      },
      {
        layer: "MEMORY",
        title: "Vector Corridor Index",
        detail: "Stores historical corridor resolutions and exception playbooks.",
        protocol: "Qdrant Vector Store",
      },
      {
        layer: "REASONING",
        title: "Deterministic Agent Graph",
        detail: "Multi-node LangGraph solver with citation checks and guardrails.",
        protocol: "Python FastAPI · LangGraph",
      },
      {
        layer: "CONTROL",
        title: "Supervisor Dispatch UI",
        detail: "Real-time exception queue with human approval & replay inspection.",
        protocol: "Next.js · TypeScript",
      },
    ],
    flowStages: ["Telemetry Mesh", "Vector Router", "Policy Solver", "Supervisor UI"],
    stackDetails: [
      { name: "LangGraph", role: "AI / ML" },
      { name: "Python FastAPI", role: "Backend" },
      { name: "Qdrant", role: "Database" },
      { name: "Next.js", role: "Frontend" },
      { name: "TypeScript", role: "Frontend" },
      { name: "WebSockets", role: "Systems / QA" },
    ],
    keyFeatures: [
      {
        title: "Citation-Grounded Corridor Policies",
        detail: "Every automated reroute recommendation cites matching corridor constraints and playbook rules.",
      },
      {
        title: "Human-in-the-Loop Override Rails",
        detail: "Operators approve, adjust, or pin exceptions directly inside the live map timeline.",
      },
      {
        title: "Immutable Decision Replay Log",
        detail: "Full state snapshots preserved per routing run for operational post-mortems and auditing.",
      },
      {
        title: "Streaming Exception Prioritization",
        detail: "Groups cascading hub delays by downstream impact rather than raw alert flood order.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Exception taxonomy & dispatch latency audit" },
      { stage: "02 Architecture", artifact: "LangGraph state machine & Qdrant index schema" },
      { stage: "03 Engineering", artifact: "FastAPI agent workers + WebSocket canvas UI" },
      { stage: "04 QA", artifact: "Replay harness validating deterministic policy outputs" },
      { stage: "05 Deployment", artifact: "Isolated worker deployment with typed telemetry" },
      { stage: "06 Evolution", artifact: "Modular node hooks for additional regional rules" },
    ],
    engineeringOutcomes: [
      "Unified fragmented dispatch tools into a single state-synchronized operator console.",
      "Enforced structured schema validation and human sign-off boundaries on every AI action.",
      "Delivered traceable replay snapshots linking every routing proposal to underlying hub signals.",
    ],
    serviceRoute: "/ai-solutions",
    relatedIds: ["kinetix-spatial-twin", "aethercore-treasury-os", "orbit-revenue-pipeline"],
  },
  {
    id: "aethercore-treasury-os",
    index: "02",
    name: "AetherCore Treasury OS",
    tagline: "Double-entry institutional clearing & liquidity workstation",
    category: "web",
    categoryLabel: "WEB PLATFORMS",
    industry: "Institutional Fintech",
    engagementModel: "Core Ledger & Cockpit Architecture",
    image: "/assets/projects/work-aethercore-web.webp",
    alt: "AetherCore Treasury OS multi-currency settlement and liquidity cockpit",
    layoutVariant: "split-left",
    overview:
      "AetherCore Treasury OS is a real-time institutional settlement interface uniting multi-currency liquidity sweeps, ledger inspection, and risk surface visualization.",
    businessProblem:
      "Finance operations teams struggled with delayed batch reconciliation files that obscured intraday FX exposure and forced slow manual cross-checks across regional accounts.",
    engineeringApproach:
      "We engineered an idempotent Go ledger core backed by serializable PostgreSQL accounting invariants, paired with a zero-layout-shift React interface capable of rendering dense tabular ledgers cleanly.",
    architectureSummary:
      "Clearing adapters normalize settlement messages into balanced double-entry postings in Go, cache rolling exposure windows in Redis, and push scoped diffs to browser workspaces.",
    architectureLayers: [
      {
        layer: "ADAPTERS",
        title: "Clearing Rail Ingestion",
        detail: "Normalizes Fedwire, CHIPS, and regional instruction payloads.",
        protocol: "Go Services · Idempotency Keys",
      },
      {
        layer: "LEDGER",
        title: "Double-Entry Accounting Engine",
        detail: "Guarantees balanced debit/credit rows with append-only audit logs.",
        protocol: "PostgreSQL · ACID Transactions",
      },
      {
        layer: "CACHE",
        title: "Intraday Exposure Stream",
        detail: "Aggregates currency positions and sweeps for instant desk reads.",
        protocol: "Redis Pub/Sub",
      },
      {
        layer: "WORKSTATION",
        title: "React Treasury Cockpit",
        detail: "Role-gated approval flows, liquidity curves, and ledger drilldowns.",
        protocol: "React · TypeScript",
      },
    ],
    flowStages: ["Ledger Core", "Risk Mesh", "Liquidity UI", "Audit Trail"],
    stackDetails: [
      { name: "React", role: "Frontend" },
      { name: "TypeScript", role: "Frontend" },
      { name: "Go", role: "Backend" },
      { name: "PostgreSQL", role: "Database" },
      { name: "Redis", role: "Database" },
      { name: "Playwright", role: "Systems / QA" },
    ],
    keyFeatures: [
      {
        title: "Strict Double-Entry Invariants",
        detail: "Database-level constraint validation prevents unbalanced transfers or duplicate posting retries.",
      },
      {
        title: "Multi-Currency Liquidity Sweeps",
        detail: "Visualizes corridor balances alongside staged settlement approval queues.",
      },
      {
        title: "Role-Based Maker / Checker Controls",
        detail: "Separates payment initiation and treasury sign-off with timestamped audit trails.",
      },
      {
        title: "Dense Keyboard-Navigable Ledgers",
        detail: "Zero layout shift sorting, filtering, and transaction inspection views.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Reconciliation gap analysis across clearing lanes" },
      { stage: "02 Architecture", artifact: "Double-entry SQL schema & idempotency contract" },
      { stage: "03 Engineering", artifact: "Go ledger engine + typed React workstation" },
      { stage: "04 QA", artifact: "Concurrency stress tests & visual Playwright matrix" },
      { stage: "05 Deployment", artifact: "Hardened container build & zero-downtime migration" },
      { stage: "06 Evolution", artifact: "Extensible rail adapter interface for new corridors" },
    ],
    engineeringOutcomes: [
      "Replaced fragmented batch spreadsheets with live double-entry settlement visibility.",
      "Eliminated duplicate settlement risk via strict idempotent transaction keys in Go.",
      "Delivered clean role separation and exportable audit history per sweep instruction.",
    ],
    serviceRoute: "/web-development",
    relatedIds: ["orbit-revenue-pipeline", "velocepay-wallet", "lumina-headless-store"],
  },
  {
    id: "velocepay-wallet",
    index: "03",
    name: "VelocePay Instant Wallet",
    tagline: "Biometric mobile wallet & card vault built for offline resilience",
    category: "mobile",
    categoryLabel: "MOBILE APPLICATIONS",
    industry: "Consumer Fintech",
    engagementModel: "iOS & Android Product Suite",
    image: "/assets/projects/work-velocepay-mobile.webp",
    alt: "VelocePay mobile biometric wallet and card vault screens",
    layoutVariant: "split-right",
    overview:
      "VelocePay Instant Wallet delivers hardware-backed biometric signing, instant QR transfers, virtual card controls, and conflict-free local SQLite queuing for mobile users.",
    businessProblem:
      "Existing mobile wallet builds struggled on congested cellular connections, losing queued receipt state or stalling biometric prompts during cold launches.",
    engineeringApproach:
      "We moved cryptographic key attestation into native Secure Enclave / Android Keystore bridges and backed transaction timelines with local SQLite state that reconciles cleanly upon reconnect.",
    architectureSummary:
      "React Native shells communicate with thin Swift/Kotlin biometric modules and flush idempotent signed payloads to Go ledger APIs over TLS.",
    architectureLayers: [
      {
        layer: "HARDWARE",
        title: "Native Biometric Bridge",
        detail: "Hardware enclave key generation & FaceID / fingerprint attestation.",
        protocol: "Swift Enclave · Kotlin Keystore",
      },
      {
        layer: "STORAGE",
        title: "Offline Queue & Cache",
        detail: "Persists balance snapshots and outbox receipts reliably on device.",
        protocol: "SQLite Local Store",
      },
      {
        layer: "APP LAYER",
        title: "60fps Mobile Workspace",
        detail: "Thumb-ergonomic card vault transitions and QR scan scanner.",
        protocol: "React Native · TypeScript",
      },
      {
        layer: "SETTLEMENT",
        title: "Payment Rail Gateway",
        detail: "Idempotent Go & Stripe webhook handlers synchronizing card status.",
        protocol: "Go · Stripe APIs",
      },
    ],
    flowStages: ["Biometric Key", "Card Vault", "Offline Queue", "Rail Sync"],
    stackDetails: [
      { name: "React Native", role: "Mobile" },
      { name: "Swift & Kotlin Bridges", role: "Mobile" },
      { name: "SQLite", role: "Database" },
      { name: "Go", role: "Backend" },
      { name: "Stripe", role: "Cloud / Edge" },
    ],
    keyFeatures: [
      {
        title: "Device-Bound Key Signing",
        detail: "Sensitive transfer approvals remain inside native secure hardware modules.",
      },
      {
        title: "Instant Card Freeze & Controls",
        detail: "Toggle virtual card spend limits and merchant locks with optimistic UI feedback.",
      },
      {
        title: "Resilient Offline Receipt Queue",
        detail: "Preserves pending authorizations safely when mobile signal drops mid-flow.",
      },
      {
        title: "Fluid Card Stack Motion",
        detail: "Hardware-composited spring physics respecting reduced-motion settings.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Thumb-reach audit & flaky-network failure replay" },
      { stage: "02 Architecture", artifact: "Native key attestation & SQLite sync design" },
      { stage: "03 Engineering", artifact: "React Native UI + Swift/Kotlin native modules" },
      { stage: "04 QA", artifact: "Airplane-mode transition tests & physical device QA" },
      { stage: "05 Deployment", artifact: "Automated Fastlane store pipeline configuration" },
      { stage: "06 Evolution", artifact: "OTA bundle hooks for rapid UI iteration" },
    ],
    engineeringOutcomes: [
      "Removed plaintext secret storage from app JS bundles via native bridge signing.",
      "Delivered consistent dark/light contrast across card vault & balance visualizations.",
      "Established repeatable Fastlane release pipelines for dual-store shipping.",
    ],
    serviceRoute: "/app-development",
    relatedIds: ["medisync-ward-companion", "aethercore-treasury-os", "stratum-token-engine"],
  },
  {
    id: "kinetix-spatial-twin",
    index: "04",
    name: "Kinetix Spatial Twin",
    tagline: "Predictive 3D energy substation topology & anomaly console",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    industry: "Clean Energy & Industrial IoT",
    engagementModel: "Spatial UI & Anomaly Engine",
    image: "/assets/projects/work-kinetix-twin.webp",
    alt: "Kinetix Spatial Twin 3D substation telemetry and anomaly diagnostics console",
    layoutVariant: "mosaic-tall",
    overview:
      "Kinetix Spatial Twin transforms noisy inverter and substation sensor tables into an interactive 3D topology map paired with automated thermal and harmonic drift triage.",
    businessProblem:
      "Grid engineers had to inspect dense SCADA spreadsheets row by row, making it easy to miss early phase imbalances until equipment tripped offline.",
    engineeringApproach:
      "We combined high-density time-series ingestion in TimescaleDB and Python FastAPI with an interactive WebGL wireframe node map that pinpoints anomalous buses spatially.",
    architectureSummary:
      "Substation sensors push telemetry batches into FastAPI scorers backed by TimescaleDB & Redis, feeding a live spatial topology inspector.",
    architectureLayers: [
      {
        layer: "TELEMETRY",
        title: "Sensor Packet Ingestion",
        detail: "Collects voltage, harmonic spectrum, and battery cell temperatures.",
        protocol: "TimescaleDB · Python FastAPI",
      },
      {
        layer: "SCORING",
        title: "Anomaly Classification Worker",
        detail: "Scores phase drift against historical baseline envelopes.",
        protocol: "Python Workers · Redis",
      },
      {
        layer: "SPATIAL UI",
        title: "Interactive 3D Node Twin",
        detail: "WebGL canvas rendering substation nodes, lines, and fault highlights.",
        protocol: "WebGL · TypeScript",
      },
      {
        layer: "TRIAGE",
        title: "Crew Escalation Panel",
        detail: "Generated diagnostic snapshots and inspection checklists per node.",
        protocol: "REST · Structured Exports",
      },
    ],
    flowStages: ["Sensor Stream", "Anomaly Model", "3D Node Map", "Crew Triage"],
    stackDetails: [
      { name: "Python FastAPI", role: "Backend" },
      { name: "WebGL", role: "Frontend" },
      { name: "TypeScript", role: "Frontend" },
      { name: "TimescaleDB", role: "Database" },
      { name: "Redis", role: "Database" },
    ],
    keyFeatures: [
      {
        title: "Spatial Node Isolation",
        detail: "Click any substation branch to inspect phase waveform history beside hardware specs.",
      },
      {
        title: "Threshold Drift Alerts",
        detail: "Highlights subtle thermal deviations prior to hard breaker cutoffs.",
      },
      {
        title: "Diagnostic Inspection Snapshots",
        detail: "Exports timestamped node telemetry alongside technician escalation notes.",
      },
      {
        title: "Low-Overhead Canvas Pipeline",
        detail: "Pauses background animation loops cleanly when browser tabs lose visibility.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "SCADA signal review with grid operations engineers" },
      { stage: "02 Architecture", artifact: "TimescaleDB hypertable schema & WebGL scene spec" },
      { stage: "03 Engineering", artifact: "FastAPI ingestion workers + interactive 3D viewer" },
      { stage: "04 QA", artifact: "Synthetic fault injection & canvas frame-budget checks" },
      { stage: "05 Deployment", artifact: "Dockerized service stack with health probes" },
      { stage: "06 Evolution", artifact: "Plug-in model interface for new inverter SKUs" },
    ],
    engineeringOutcomes: [
      "Consolidated dispersed SCADA sensor streams into an intuitive spatial inspection map.",
      "Enabled faster technician root-cause isolation with correlated waveform comparisons.",
      "Protected operator battery & browser performance via visibility-aware rendering.",
    ],
    serviceRoute: "/ai-solutions",
    relatedIds: ["pulsemesh-neural-ops", "foundry-motion-sdk", "orbit-revenue-pipeline"],
  },
  {
    id: "lumina-headless-store",
    index: "05",
    name: "Lumina Headless Store",
    tagline: "Edge-rendered composable storefront & instant checkout architecture",
    category: "web",
    categoryLabel: "WEB PLATFORMS",
    industry: "Direct-to-Consumer Commerce",
    engagementModel: "Headless Edge Storefront",
    image: "/assets/projects/work-lumina-commerce.webp",
    alt: "Lumina Headless Store edge commerce interface with product showcase",
    layoutVariant: "mosaic-wide",
    overview:
      "Lumina Headless Store decouples storefront presentation onto global edge execution using Next.js and Cloudflare Workers, pairing instant SKU filtering with zero-shift checkout drawers.",
    businessProblem:
      "Monolithic storefront templates coupled heavy scripts directly to catalog requests, creating sluggish mobile filtering and visible layout shifts during product drops.",
    engineeringApproach:
      "We moved catalog caching to Cloudflare edge nodes, eliminated render-blocking scripts, pre-sized responsive imagery slots, and routed cart mutations cleanly through typed GraphQL endpoints.",
    architectureSummary:
      "Edge workers serve cached Next.js storefronts, revalidate SKU inventory via GraphQL webhooks, and commit payments through isolated Stripe webhooks.",
    architectureLayers: [
      {
        layer: "EDGE",
        title: "Cloudflare ISR Routing",
        detail: "Serves geo-closest storefront bundles with stale-while-revalidate caching.",
        protocol: "Cloudflare Workers · Next.js",
      },
      {
        layer: "CATALOG",
        title: "Composable Product Graph",
        detail: "Aggregates collections, media aspect ratios, and real-time stock.",
        protocol: "GraphQL · Shopify Storefront API",
      },
      {
        layer: "EXPERIENCE",
        title: "Zero-Shift Storefront UI",
        detail: "Instant facet filtering, variant previews, and slide-over bag state.",
        protocol: "React · TypeScript",
      },
      {
        layer: "CHECKOUT",
        title: "Server-Verified Payment Hooks",
        detail: "Idempotent Stripe order creation and technical SEO schema markup.",
        protocol: "Stripe · JSON-LD Schema",
      },
    ],
    flowStages: ["Edge Cache", "Facet Filter", "Slide Bag", "Stripe Pay"],
    stackDetails: [
      { name: "Next.js", role: "Frontend" },
      { name: "Cloudflare Workers", role: "Cloud / Edge" },
      { name: "GraphQL", role: "Backend" },
      { name: "Shopify", role: "Backend" },
      { name: "Stripe", role: "Cloud / Edge" },
    ],
    keyFeatures: [
      {
        title: "Edge-Cached Product Collections",
        detail: "Keeps repeat collection browsing snappy across mobile and desktop connections.",
      },
      {
        title: "Zero Layout Shift Media Grids",
        detail: "Explicit image aspect slots prevent page jumping while scrolling rich galleries.",
      },
      {
        title: "Structured Product Schema SEO",
        detail: "Automated canonical tags, sitemaps, and Product JSON-LD across every SKU.",
      },
      {
        title: "Unified Slide-Over Bag Flow",
        detail: "Keyboard-accessible drawer updating quantities without full page reloads.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Core Web Vitals & bundle bloat teardown" },
      { stage: "02 Architecture", artifact: "Edge caching keys & GraphQL fragment strategy" },
      { stage: "03 Engineering", artifact: "Next.js storefront + Cloudflare deployment config" },
      { stage: "04 QA", artifact: "Cross-viewport Playwright checkout & responsive tests" },
      { stage: "05 Deployment", artifact: "Sitemap automation & Cloudflare Workers rollout" },
      { stage: "06 Evolution", artifact: "Reusable collection sections for seasonal launches" },
    ],
    engineeringOutcomes: [
      "Decoupled frontend release speed from legacy monolithic theme bottlenecks.",
      "Enforced strict image dimensions and accessible dialog patterns throughout checkout.",
      "Delivered clean technical SEO metadata and edge-cached storefront delivery.",
    ],
    serviceRoute: "/web-development",
    relatedIds: ["aethercore-treasury-os", "orbit-revenue-pipeline", "stratum-token-engine"],
  },
  {
    id: "stratum-token-engine",
    index: "06",
    name: "Stratum Token Engine",
    tagline: "Dual-theme contrast system & accessible UI component architecture",
    category: "design",
    categoryLabel: "DESIGN SYSTEMS",
    industry: "Product Infrastructure & Design Ops",
    engagementModel: "Design System & Token Pipeline",
    image: "/assets/projects/work-stratum-system.webp",
    alt: "Stratum Token Engine multi-theme design tokens and typographic scale showcase",
    layoutVariant: "split-left",
    overview:
      "Stratum Token Engine unifies color ramps, surface elevation tokens, typographic rhythm, and accessible React primitives across dark midnight and light crisp interfaces.",
    businessProblem:
      "Multiple product surfaces diverged visually over time, shipping mismatched buttons, low-contrast text pairings, and jarring flashes on initial theme hydration.",
    engineeringApproach:
      "We structured semantic surface/ink CSS variables paired with inline pre-paint theme resolution and reusable React primitives tested continuously across both themes.",
    architectureSummary:
      "Token definitions drive base CSS variables, typography scales, interactive form controls, and native top-layer overlays with zero runtime style recalculation overhead.",
    architectureLayers: [
      {
        layer: "TOKENS",
        title: "Semantic Light / Dark Surfaces",
        detail: "Maps background, surface, hairline borders, and accent tokens.",
        protocol: "CSS Custom Properties · color-scheme",
      },
      {
        layer: "TYPOGRAPHY",
        title: "Editorial & Monospace Scale",
        detail: "Pairs display headings, readable sans body, and mono technical indices.",
        protocol: "Clamp Fluid Scales",
      },
      {
        layer: "PRIMITIVES",
        title: "Accessible React Building Blocks",
        detail: "Shared dialog, tablist, button, and form controls with ARIA clarity.",
        protocol: "React · TypeScript",
      },
      {
        layer: "VERIFICATION",
        title: "Dual-Theme Playwright Sweeps",
        detail: "Automated screenshots across mobile and wide viewports per build.",
        protocol: "Playwright · CI Gate",
      },
    ],
    flowStages: ["Token Ramp", "Theme Sync", "Primitives", "Visual QA"],
    stackDetails: [
      { name: "TypeScript", role: "Frontend" },
      { name: "React", role: "Frontend" },
      { name: "CSS Systems", role: "Frontend" },
      { name: "Playwright", role: "Systems / QA" },
    ],
    keyFeatures: [
      {
        title: "Zero-Flash Theme Resolution",
        detail: "Resolves persisted and OS color-scheme preferences cleanly prior to first frame.",
      },
      {
        title: "Native Top-Layer Overlay Primitives",
        detail: "Uses browser <dialog> stacking contexts with Escape & focus restoration built in.",
      },
      {
        title: "CSS Anchor Tab Indicators",
        detail: "Fluidly transitions active category underlines where supported with clean fallback.",
      },
      {
        title: "Verified Accessible Contrast",
        detail: "Tuned dark navy and porcelain light palettes preserving readable body text.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Cross-page UI audit identifying visual drift" },
      { stage: "02 Architecture", artifact: "Semantic variable taxonomy across light/dark" },
      { stage: "03 Engineering", artifact: "Component primitives & clean CSS stylesheets" },
      { stage: "04 QA", artifact: "Automated matrix screenshot diffing at 4 viewports" },
      { stage: "05 Deployment", artifact: "Shared stylesheet bundles & documented usage" },
      { stage: "06 Evolution", artifact: "Centralized variables ready for new feature pages" },
    ],
    engineeringOutcomes: [
      "Standardized shared buttons, cards, dialogs, and navigation across all routes.",
      "Eliminated dark/light theme flashes on route navigation and initial page load.",
      "Reduced per-page custom styling duplication through shared token foundations.",
    ],
    serviceRoute: "/services",
    relatedIds: ["foundry-motion-sdk", "lumina-headless-store", "aethercore-treasury-os"],
  },
  {
    id: "medisync-ward-companion",
    index: "07",
    name: "MediSync Ward Companion",
    tagline: "Offline-resilient clinician mobile console & encrypted handoffs",
    category: "mobile",
    categoryLabel: "MOBILE APPLICATIONS",
    industry: "Healthcare Operations",
    engagementModel: "Clinician Mobile Application",
    image: "/assets/projects/work-medisync-mobile.webp",
    alt: "MediSync Ward Companion mobile patient telemetry and shift handoff interface",
    layoutVariant: "split-right",
    overview:
      "MediSync Ward Companion supports clinical nursing rounds with real-time wearable BLE vitals monitoring, structured shift handoffs, and encrypted offline synchronization.",
    businessProblem:
      "Clipboards and disconnected desktop terminals slowed shift changeovers inside hospital wings where Wi-Fi dead zones interrupted tablet charting.",
    engineeringApproach:
      "We built a Flutter mobile client with Bluetooth Low Energy packet parsing and encrypted local shift storage that syncs reliably over row-level security policies.",
    architectureSummary:
      "BLE monitors stream telemetry locally into Flutter storage, sync encrypted handoff notes via Supabase/Go APIs, and isolate ward access cleanly.",
    architectureLayers: [
      {
        layer: "SENSORS",
        title: "BLE Peripheral Collector",
        detail: "Parses continuous peripheral heart & pulse packets reliably.",
        protocol: "Bluetooth LE · Native Stream",
      },
      {
        layer: "MOBILE CLIENT",
        title: "Clinician Round Interface",
        detail: "High-legibility dark mode ward list, waveform cards, and handoff forms.",
        protocol: "Flutter · SQLite Local Cache",
      },
      {
        layer: "SECURITY",
        title: "Encrypted Sync Boundary",
        detail: "Scoped clinician authentication and AES-protected local storage.",
        protocol: "Supabase RLS · AES-256",
      },
      {
        layer: "BACKEND",
        title: "Audit-Ready Shift Ledger",
        detail: "Deterministic timestamp merging for collaborative shift notes.",
        protocol: "Go · PostgreSQL",
      },
    ],
    flowStages: ["BLE Stream", "Shift Notes", "Offline Lock", "Ward Sync"],
    stackDetails: [
      { name: "Flutter", role: "Mobile" },
      { name: "Bluetooth LE", role: "Mobile" },
      { name: "Supabase", role: "Database" },
      { name: "Go", role: "Backend" },
      { name: "SQLite", role: "Database" },
    ],
    keyFeatures: [
      {
        title: "Continuous Peripheral Monitoring",
        detail: "Visualizes streaming vitals clearly in low-glare ward lighting modes.",
      },
      {
        title: "Structured Shift Changeover Cards",
        detail: "Captures concise patient notes that reconcile deterministically when reconnected.",
      },
      {
        title: "Role-Scoped Access Policies",
        detail: "Row-level permission rules keep ward assignments strictly segmented.",
      },
      {
        title: "Offline Dead-Zone Tolerance",
        detail: "Zero lost charting data inside shielded hospital corridors.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Nursing round shadowing & dead-zone mapping" },
      { stage: "02 Architecture", artifact: "BLE buffer recovery & RLS access matrix" },
      { stage: "03 Engineering", artifact: "Flutter UI + encrypted local SQLite queue" },
      { stage: "04 QA", artifact: "Disconnect/reconnect merge conflict tests" },
      { stage: "05 Deployment", artifact: "Signed pilot release package for ward tablets" },
      { stage: "06 Evolution", artifact: "Clean adapter layer for new medical sensors" },
    ],
    engineeringOutcomes: [
      "Enabled reliable round charting across intermittently connected hospital corridors.",
      "Preserved chronological clarity during collaborative multi-nurse shift handoffs.",
      "Isolated sensitive ward records behind strict role-scoped access policies.",
    ],
    serviceRoute: "/app-development",
    relatedIds: ["velocepay-wallet", "pulsemesh-neural-ops", "aethercore-treasury-os"],
  },
  {
    id: "orbit-revenue-pipeline",
    index: "08",
    name: "Orbit Revenue Pipeline",
    tagline: "Multi-tenant enterprise CRM & SLA workflow orchestration portal",
    category: "web",
    categoryLabel: "WEB PLATFORMS",
    industry: "B2B SaaS & Commercial Ops",
    engagementModel: "Multi-Tenant Enterprise SaaS",
    image: "/assets/projects/work-orbit-crm.webp",
    alt: "Orbit Revenue Pipeline CRM workspace and deal routing analytics",
    layoutVariant: "compact",
    overview:
      "Orbit Revenue Pipeline gives distributed commercial teams one multi-tenant workspace for SLA-backed lead routing, deal stage approvals, and territory forecasting.",
    businessProblem:
      "Growing B2B teams juggled mismatched CRM views, manual security questionnaire queues, and spreadsheet forecasts that fell out of sync daily.",
    engineeringApproach:
      "We modeled strict PostgreSQL Row-Level Security multi-tenancy from day one, paired with Redis-backed filter pipelines and a clean Next.js command interface.",
    architectureSummary:
      "Next.js client portals communicate with Node.js domain services enforcing tenant RLS in PostgreSQL alongside Redis event queues.",
    architectureLayers: [
      {
        layer: "PORTAL",
        title: "Commercial Command UI",
        detail: "Pipeline Kanban boards, SLA timers, and account drilldowns.",
        protocol: "Next.js · TypeScript",
      },
      {
        layer: "ROUTING",
        title: "SLA Rule Engine",
        detail: "Deterministic territory assignment and approval escalation triggers.",
        protocol: "Node.js · Redis",
      },
      {
        layer: "ISOLATION",
        title: "Multi-Tenant Data Core",
        detail: "Database-enforced tenant boundaries across accounts and notes.",
        protocol: "PostgreSQL RLS",
      },
      {
        layer: "INTEGRATION",
        title: "Webhook & Audit Sync",
        detail: "Bi-directional sync with billing and legal review queues.",
        protocol: "REST Webhooks",
      },
    ],
    flowStages: ["SLA Router", "Pipeline UI", "RBAC Guard", "Forecasting"],
    stackDetails: [
      { name: "Next.js", role: "Frontend" },
      { name: "Node.js", role: "Backend" },
      { name: "PostgreSQL", role: "Database" },
      { name: "Redis", role: "Database" },
      { name: "TypeScript", role: "Frontend" },
    ],
    keyFeatures: [
      {
        title: "Tenant-Isolated Security Boundaries",
        detail: "PostgreSQL row-level rules isolate every organization at the query layer.",
      },
      {
        title: "SLA Breach Countdown Indicators",
        detail: "Surfaces stalled security/legal approvals visibly inside deal views.",
      },
      {
        title: "Fast Multi-Facet Account Search",
        detail: "Instant filtering by owner, region, stage, and integration health.",
      },
      {
        title: "Unified Audit Timeline",
        detail: "Keeps every routing trigger, comment, and ownership change searchable.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Revenue ops handoff friction mapping" },
      { stage: "02 Architecture", artifact: "Multi-tenant RLS schema & rule engine spec" },
      { stage: "03 Engineering", artifact: "Next.js workspace + Node.js routing workers" },
      { stage: "04 QA", artifact: "Tenant-leak boundary checks & E2E smoke runs" },
      { stage: "05 Deployment", artifact: "Automated migrations and clean CI rollout" },
      { stage: "06 Evolution", artifact: "Composable webhook schema for ERP adapters" },
    ],
    engineeringOutcomes: [
      "Prevented cross-tenant leakage systematically using database RLS enforcement.",
      "Replaced brittle spreadsheet rollups with live stage & ownership visibility.",
      "Standardized deal handoffs between sales, security reviewers, and onboarding teams.",
    ],
    serviceRoute: "/web-development",
    relatedIds: ["aethercore-treasury-os", "lumina-headless-store", "pulsemesh-neural-ops"],
  },
  {
    id: "foundry-motion-sdk",
    index: "09",
    name: "Foundry Motion SDK",
    tagline: "Composited GSAP motion choreography & native layout primitives kit",
    category: "design",
    categoryLabel: "DESIGN SYSTEMS",
    industry: "Frontend Architecture & Motion Systems",
    engagementModel: "Motion & Layout UI Kit",
    image: "/assets/projects/work-foundry-kit.webp",
    alt: "Foundry Motion SDK choreographed layout transitions and GSAP component controls",
    layoutVariant: "compact",
    overview:
      "Foundry Motion SDK is DigentTech's reusable motion & progressive enhancement system pairing GPU-composited GSAP timelines, ScrollTrigger choreography, and prefers-reduced-motion safety.",
    businessProblem:
      "Ad-hoc UI animations across marketing and product views caused frame drops on mobile, broke reduced-motion accessibility, and left scroll elements invisible when observers lagged.",
    engineeringApproach:
      "We standardized transform/opacity composited GSAP contexts (`gsap.context()` cleanup on unmount), immediate fallback safety when reduced motion is active, and native HTML top-layer primitives.",
    architectureSummary:
      "Declarative lifecycle hooks attach ScrollTrigger batches cleanly, configure pointer tilt only on fine-pointer desktops, and guarantee clean state reversion.",
    architectureLayers: [
      {
        layer: "TIMELINE",
        title: "GSAP & ScrollTrigger Contexts",
        detail: "Scoped lifecycle animations with deterministic unmount cleanup.",
        protocol: "GSAP · ScrollTrigger",
      },
      {
        layer: "TRANSITION",
        title: "Route & State Choreography",
        detail: "Progressive View Transitions and filtered grid stagger waves.",
        protocol: "View Transitions API · CSS",
      },
      {
        layer: "SAFETY",
        title: "Reduced-Motion & Touch Guards",
        detail: "Skips expensive pointer tilt on touch devices and honors OS motion prefs.",
        protocol: "MediaQuery · matchMedia",
      },
      {
        layer: "TOP LAYER",
        title: "Native Dialog & Anchor UI",
        detail: "Semantic modal focus trapping without brittle portal z-index hacks.",
        protocol: "HTML <dialog> · @starting-style",
      },
    ],
    flowStages: ["GSAP Core", "ScrollTrigger", "Top Layer", "A11y Guards"],
    stackDetails: [
      { name: "GSAP", role: "Frontend" },
      { name: "TypeScript", role: "Frontend" },
      { name: "React", role: "Frontend" },
      { name: "View Transitions", role: "Frontend" },
      { name: "Playwright", role: "Systems / QA" },
    ],
    keyFeatures: [
      {
        title: "Composited Transform & Opacity Only",
        detail: "Avoids layout-thrashing properties to preserve responsive scrolling performance.",
      },
      {
        title: "Scoped Unmount Reversion",
        detail: "Cleans up ScrollTrigger listeners cleanly during SPA client route changes.",
      },
      {
        title: "Pointer-Fine Guarded Depth",
        detail: "Applies subtle tilt and glow strictly on hover-capable desktop pointers.",
      },
      {
        title: "Full Reduced-Motion Parity",
        detail: "All content remains crisp and immediately accessible when motion is reduced.",
      },
    ],
    processHighlights: [
      { stage: "01 Discovery", artifact: "Frame-timing profiler pass across heavy pages" },
      { stage: "02 Architecture", artifact: "Motion tokens, easing curves & cleanup contracts" },
      { stage: "03 Engineering", artifact: "Typed GSAP context helpers & CSS keyframes" },
      { stage: "04 QA", artifact: "Reduced-motion and rapid-navigation leak checks" },
      { stage: "05 Deployment", artifact: "Adopted directly across studio web experiences" },
      { stage: "06 Evolution", artifact: "Composable staggered presets for new sections" },
    ],
    engineeringOutcomes: [
      "Eliminated dangling scroll listeners across client-side route transitions.",
      "Unified entrance choreography and reduced-motion accessibility under one API.",
      "Enabled rapid authoring of cohesive interactive interfaces with predictable behavior.",
    ],
    serviceRoute: "/services",
    relatedIds: ["stratum-token-engine", "kinetix-spatial-twin", "lumina-headless-store"],
  },
];

export const ENGINEERING_CAPABILITIES: CapabilityArea[] = [
  {
    id: "frontend",
    code: "CAP-01",
    title: "Frontend Engineering",
    summary:
      "Type-safe React and Next.js interfaces, semantic design tokens, interactive canvas visualizations, and hardware-composited GSAP motion.",
    connectedTo: ["api", "security", "backend"],
    technologies: [
      { name: "React & Next.js", logoKey: "nextjs" },
      { name: "TypeScript", logoKey: "typescript" },
      { name: "Tailwind & CSS", logoKey: "tailwind" },
    ],
    projectIds: ["aethercore-treasury-os", "lumina-headless-store", "stratum-token-engine", "foundry-motion-sdk", "orbit-revenue-pipeline"],
  },
  {
    id: "backend",
    code: "CAP-02",
    title: "Backend Architecture",
    summary:
      "Concurrent microservices in Go, Python FastAPI, and Node.js built around idempotency, strict transactional boundaries, and predictable concurrency.",
    connectedTo: ["database", "api", "cloud"],
    technologies: [
      { name: "Node.js & Go", logoKey: "nodego" },
      { name: "Python FastAPI", logoKey: "fastapi" },
    ],
    projectIds: ["aethercore-treasury-os", "pulsemesh-neural-ops", "kinetix-spatial-twin", "orbit-revenue-pipeline", "velocepay-wallet"],
  },
  {
    id: "mobile",
    code: "CAP-03",
    title: "Mobile Engineering",
    summary:
      "Cross-platform React Native and Flutter applications featuring native Swift/Kotlin bridges, Secure Enclave signing, BLE hardware telemetry, and offline SQLite.",
    connectedTo: ["database", "security", "api"],
    technologies: [
      { name: "React Native", logoKey: "reactnative" },
      { name: "Flutter", logoKey: "flutter" },
      { name: "Swift & Kotlin", logoKey: "swiftkotlin" },
      { name: "SQLite Sync", logoKey: "sqlite" },
    ],
    projectIds: ["velocepay-wallet", "medisync-ward-companion"],
  },
  {
    id: "cloud",
    code: "CAP-04",
    title: "Cloud Infrastructure",
    summary:
      "Edge compute routing on Cloudflare Workers alongside AWS workloads, Docker containers, Kubernetes orchestration, and automated deployment pipelines.",
    connectedTo: ["frontend", "backend", "security"],
    technologies: [
      { name: "Cloudflare & AWS", logoKey: "cloudflare" },
      { name: "Docker & K8s", logoKey: "docker" },
      { name: "CI / Fastlane", logoKey: "fastlane" },
    ],
    projectIds: ["lumina-headless-store", "pulsemesh-neural-ops", "aethercore-treasury-os"],
  },
  {
    id: "ai",
    code: "CAP-05",
    title: "AI & Automation",
    summary:
      "Multi-agent orchestration in LangGraph, vector search retrieval in Qdrant/Pinecone, private VPC model hosting, and human-reviewed workflow automation.",
    connectedTo: ["backend", "database", "frontend"],
    technologies: [
      { name: "OpenAI & Anthropic", logoKey: "openai" },
      { name: "LangGraph & Chains", logoKey: "langchain" },
      { name: "Qdrant & Pinecone", logoKey: "pinecone" },
    ],
    projectIds: ["pulsemesh-neural-ops", "kinetix-spatial-twin"],
  },
  {
    id: "database",
    code: "CAP-06",
    title: "Database Engineering",
    summary:
      "Relational ledger integrity in PostgreSQL with Row-Level Security, time-series hypertables, Redis caching/queues, and edge persistence.",
    connectedTo: ["backend", "ai", "security"],
    technologies: [
      { name: "Postgres & Redis", logoKey: "postgres" },
      { name: "Supabase", logoKey: "supabase" },
      { name: "SQLite Offline", logoKey: "sqlite" },
    ],
    projectIds: ["aethercore-treasury-os", "orbit-revenue-pipeline", "kinetix-spatial-twin", "medisync-ward-companion"],
  },
  {
    id: "api",
    code: "CAP-07",
    title: "API Development",
    summary:
      "Strongly typed REST and GraphQL contracts, real-time multiplexed WebSockets, schema-validated payloads, and idempotent third-party webhook pipelines.",
    connectedTo: ["frontend", "backend", "mobile"],
    technologies: [
      { name: "GraphQL & REST", logoKey: "graphql" },
      { name: "FastAPI Schemas", logoKey: "fastapi" },
    ],
    projectIds: ["lumina-headless-store", "pulsemesh-neural-ops", "orbit-revenue-pipeline", "velocepay-wallet"],
  },
  {
    id: "security",
    code: "CAP-08",
    title: "Security & Performance",
    summary:
      "Role-scoped RBAC/RLS isolation, hardware key attestation, Playwright end-to-end verification, accessible contrast tokens, and progressive enhancements.",
    connectedTo: ["frontend", "database", "cloud"],
    technologies: [
      { name: "Playwright & Vitest", logoKey: "playwright" },
      { name: "TypeScript Strictness", logoKey: "typescript" },
    ],
    projectIds: ["aethercore-treasury-os", "stratum-token-engine", "medisync-ward-companion", "foundry-motion-sdk"],
  },
];

export function getWorkOverviewStats(projects: WorkProject[]) {
  const byCategory: Record<WorkCategoryId, number> = {
    web: 0,
    mobile: 0,
    ai: 0,
    design: 0,
  };
  const techSet = new Set<string>();
  const industrySet = new Set<string>();

  for (const p of projects) {
    byCategory[p.category] += 1;
    industrySet.add(p.industry);
    for (const s of p.stackDetails) techSet.add(s.name);
  }

  return {
    totalSystems: projects.length,
    byCategory,
    uniqueTechnologies: techSet.size,
    industriesCount: industrySet.size,
  };
}

