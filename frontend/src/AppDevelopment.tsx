import {
    ArrowUpRight,
    BarChart3,
    BatteryCharging,
    Bell,
    Check,
    Code2,
    Cpu,
    Fingerprint,
    LayoutGrid,
    MapPin,
    Minus,
    Navigation,
    Palette,
    Plus,
    Radio,
    RefreshCw,
    Rocket,
    Shield,
    Smartphone,
    Sparkles,
    Wifi,
    WifiOff,
    X,
    Zap
} from "lucide-react";
import React, { useState } from "react";
import { AppMotionCanvas } from "./ServiceCanvases";
import {
    FastlaneGithubLogo,
    FlutterLogo,
    ReactNativeLogo,
    SentryCrashlyticsLogo,
    SqliteWatermelonLogo,
    SupabaseFirebaseLogo,
    SwiftKotlinLogo,
    TanstackZustandLogo,
} from "./TechLogos";
import { ThemeImage } from "./VisualExperience";
import "./service-pages.css";

function Button({
  children,
  href = "/contact?service=App%20development",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a className="button" href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

function SectionHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function AppDevelopment() {
  // Smartphone mockup screen mode: 'pulse' | 'offline' | 'vault'
  const [phoneMode, setPhoneMode] = useState<"pulse" | "offline" | "vault">("pulse");

  // Tech stack category filter
  const [techCategory, setTechCategory] = useState<"all" | "framework" | "storage" | "cloud" | "tooling">("all");

  // Tech stack multi-format view switcher: 'bento' | 'benchmarks' | 'specs'
  const [techFormat, setTechFormat] = useState<"bento" | "benchmarks" | "specs">("bento");
  const [activeSpecIndex, setActiveSpecIndex] = useState<number>(0);

  // Showcase project modal state
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  React.useEffect(() => {
    if (selectedProject === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", key);
    };
  }, [selectedProject]);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Scope Estimator State
  const [platformTarget, setPlatformTarget] = useState<string>("iOS & Android (Unified)");
  const [storageModel, setStorageModel] = useState<string>("Offline-First (SQLite)");
  const [hardwareFeature, setHardwareFeature] = useState<string>("Biometrics & Push");

  const appServices = [
    {
      num: "01",
      icon: Smartphone,
      title: "Cross-Platform Mobile Apps (React Native & Flutter)",
      text: "Unified codebases delivering native 60fps performance on both iOS and Android. Rapid time-to-market with zero compromises on platform conventions.",
      tags: ["React Native", "Expo SDK", "Flutter", "iOS & Android"],
    },
    {
      num: "02",
      icon: Palette,
      title: "Touch-First UI/UX & Mobile Design Systems",
      text: "Ergonomic thumb-reach interfaces, haptic feedback, fluid gesture physics, and system-level dark/light mode switching engineered for touch.",
      tags: ["Gesture Physics", "Haptics", "Figma Mobile Tokens", "One-Handed UX"],
    },
    {
      num: "03",
      icon: WifiOff,
      title: "Offline-First Architecture & Local Sync",
      text: "Robust local databases (SQLite / WatermelonDB) guaranteeing full app functionality on planes or remote sites with automated background sync.",
      tags: ["SQLite", "WatermelonDB", "Background Sync", "Conflict Resolution"],
    },
    {
      num: "04",
      icon: Bell,
      title: "Push Notifications & Real-Time Messaging",
      text: "Targeted push notification campaigns via Apple APNs and Google FCM, deep linking, live updates, and bidirectional WebSocket messaging.",
      tags: ["Apple APNs", "Google FCM", "Deep Links", "Live Chat"],
    },
    {
      num: "05",
      icon: Cpu,
      title: "Hardware, Sensors & Native Device APIs",
      text: "Seamless integration with device hardware: high-res camera scanning, GPS geofencing, Bluetooth Low Energy (BLE), Face ID, and Apple HealthKit.",
      tags: ["Biometric FaceID", "BLE Sensors", "GPS Geofencing", "HealthKit"],
    },
    {
      num: "06",
      icon: Rocket,
      title: "App Store Submission & Lifecycle Care",
      text: "Guiding your app through Apple App Review and Google Play guidelines, automated Fastlane CI/CD releases, crash analytics, and OTA updates.",
      tags: ["Apple App Store", "Google Play", "Fastlane CI/CD", "OTA Updates"],
    },
  ];

  const techStack = [
    {
      name: "React Native & Expo",
      roleTag: "TIER-1 UNIFIED CORE",
      logo: ReactNativeLogo,
      category: "framework",
      categoryLabel: "MOBILE FRAMEWORK",
      desc: "Native UI components rendered directly on iOS and Android with single codebase efficiency and OTA update support.",
      bullets: [
        "120 FPS UI-thread gesture animations",
        "95% shared TypeScript codebase",
        "Over-The-Air canary hotfixes without App Store wait",
      ],
      metricValue: "120 FPS",
      metricLabel: "ProMotion Native Physics",
      codeSnippet: "import { Motion } from 'expo-motion';",
      adoption: "Shopify · Discord · Microsoft · Coinbase",
      advantage: "95% shared code with native speed",
      benchmark: { metric: "Frame Render Time", val: "8.1ms", target: "16.6ms (60 FPS)", pct: 95 },
      specCode: `// expo.config.ts\nexport default {\n  name: "NovaMobile",\n  plugins: ["expo-router", "expo-camera", "expo-haptics"],\n  updates: { url: "https://u.expo.dev/project" },\n  ios: { supportsTablet: true, bundleIdentifier: "studio.dotcode.app" }\n};`,
    },
    {
      name: "Flutter",
      roleTag: "ARM COMPILED UI ENGINE",
      logo: FlutterLogo,
      category: "framework",
      categoryLabel: "CROSS-PLATFORM",
      desc: "Google's UI toolkit compiling directly to native ARM machine code with custom graphics rendering engines.",
      bullets: [
        "Impeller GPU-accelerated graphics pipeline",
        "Sub-pixel smooth canvas rendering",
        "Unified desktop, web & mobile deployment",
      ],
      metricValue: "0ms Jitter",
      metricLabel: "Impeller Metal Backend",
      codeSnippet: "CustomPaint(painter: VectorPainter())",
      adoption: "Google Pay · BMW · Nubank · Alibaba",
      advantage: "Pixel-perfect 120 FPS animations",
      benchmark: { metric: "Impeller Draw Call", val: "1.2ms", target: "4.0ms Target", pct: 92 },
      specCode: `// pubspec.yaml\nname: dotcode_mobile\nenvironment:\n  sdk: '>=3.4.0 <4.0.0'\ndependencies:\n  flutter:\n    sdk: flutter\n  flutter_bloc: ^8.1.5\n  drift: ^2.18.0`,
    },
    {
      name: "Swift & Kotlin Native",
      roleTag: "HARDWARE METAL BRIDGE",
      logo: SwiftKotlinLogo,
      category: "framework",
      categoryLabel: "NATIVE BRIDGING",
      desc: "Platform-specific bridges for advanced iOS and Android hardware APIs, widgets, and watchOS integrations.",
      bullets: [
        "Apple WatchOS & Dynamic Island widgets",
        "Direct Metal & Vulkan GPU compute pipelines",
        "Secure Enclave hardware biometric tokens",
      ],
      metricValue: "Metal/C++",
      metricLabel: "Direct Silicon Execution",
      codeSnippet: "@objc func syncSecureEnclave()",
      adoption: "Apple Health · Airbnb · Uber · Revolut",
      advantage: "Direct metal/hardware execution",
      benchmark: { metric: "Bridge Call Overhead", val: "0.14ms", target: "1.0ms Max", pct: 98 },
      specCode: `// SecureVaultModule.swift\nimport Foundation\nimport LocalAuthentication\n\n@objc(SecureVault)\nclass SecureVault: NSObject {\n  @objc func verifyFaceID(_ resolve: RCTPromiseResolveBlock) {\n    // Hardware Secure Enclave\n  }\n}`,
    },
    {
      name: "WatermelonDB & SQLite",
      roleTag: "OFFLINE-FIRST STORE",
      logo: SqliteWatermelonLogo,
      category: "storage",
      categoryLabel: "LOCAL STORAGE",
      desc: "Lazy-loaded observable databases optimized for mobile devices with thousands of records and instant startup times.",
      bullets: [
        "10,000+ local records rendered in 14ms",
        "Observable Rx queries auto-updating UI",
        "Background conflict resolution delta sync",
      ],
      metricValue: "< 1ms",
      metricLabel: "Cached Query Lookup",
      codeSnippet: "const query = database.get('tasks').query();",
      adoption: "Slack · WhatsApp · Linear · Stripe",
      advantage: "Instant launch with zero network lag",
      benchmark: { metric: "10k Record Query", val: "14ms", target: "50ms Target", pct: 96 },
      specCode: `// schema.ts\nimport { appSchema, tableSchema } from '@nozbe/watermelondb';\nexport default appSchema({\n  version: 2,\n  tables: [\n    tableSchema({ name: 'shifts', columns: [{ name: 'geo_lat', type: 'number' }] })\n  ]\n});`,
    },
    {
      name: "TanStack Query & Zustand",
      roleTag: "OPTIMISTIC DATA STATE",
      logo: TanstackZustandLogo,
      category: "storage",
      categoryLabel: "STATE MANAGEMENT",
      desc: "Lean, predictable mobile state stores with automated request caching, optimistic updates, and background refetching.",
      bullets: [
        "Zero boilerplate immutable state slices",
        "Automated garbage collection & cache revalidation",
        "Instant optimistic offline mutations",
      ],
      metricValue: "0.2ms",
      metricLabel: "State Mutation Latency",
      codeSnippet: "const user = useStore(state => state.activeUser);",
      adoption: "Vercel · Loom · OpenAI · Twitch",
      advantage: "Sub-millisecond state updates",
      benchmark: { metric: "State Dispatch Lag", val: "0.2ms", target: "2.0ms Target", pct: 99 },
      specCode: `// store.ts\nimport { create } from 'zustand';\ninterface AppState {\n  token: string | null;\n  setToken: (t: string) => void;\n}\nexport const useStore = create<AppState>((set) => ({\n  token: null,\n  setToken: (t) => set({ token: t })\n}));`,
    },
    {
      name: "Supabase & Firebase Cloud",
      roleTag: "CLOUD BACKEND & EDGE",
      logo: SupabaseFirebaseLogo,
      category: "cloud",
      categoryLabel: "MOBILE BACKEND",
      desc: "Scalable cloud authentication, real-time database subscriptions, and targeted push notification delivery pipelines.",
      bullets: [
        "Sub-50ms global WebSocket sync",
        "PostgreSQL row-level security (RLS) enforcement",
        "Apple APNs & Google FCM rich push pipelines",
      ],
      metricValue: "99.99%",
      metricLabel: "Edge Uptime Guarantee",
      codeSnippet: "supabase.channel('shifts').on('*', syncHandler);",
      adoption: "GitHub · Vercel · 1Password · DoorDash",
      advantage: "Zero-latency real-time sync",
      benchmark: { metric: "WebSocket Push Latency", val: "28ms", target: "100ms Target", pct: 94 },
      specCode: `// supabaseClient.ts\nimport { createClient } from '@supabase/supabase-js';\nexport const supabase = createClient(\n  process.env.EXPO_PUBLIC_SUPABASE_URL!,\n  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!\n);`,
    },
    {
      name: "Fastlane & GitHub Actions",
      roleTag: "RELEASE AUTOMATION",
      logo: FastlaneGithubLogo,
      category: "tooling",
      categoryLabel: "RELEASE AUTOMATION",
      desc: "Automated provisioning profiles, code signing, screenshot generation, and single-command deployment to TestFlight.",
      bullets: [
        "1-click multi-track TestFlight deployments",
        "Automated Apple certificate match cryptography",
        "PR preview builds on real cloud emulators",
      ],
      metricValue: "8 mins",
      metricLabel: "Full Build & TestFlight Ship",
      codeSnippet: "fastlane beta --env production",
      adoption: "Airbnb · Spotify · Mozilla · Square",
      advantage: "One-click store releases",
      benchmark: { metric: "CI Build & Deploy", val: "8m 12s", target: "20m Standard", pct: 90 },
      specCode: `// Fastfile\ndefault_platform(:ios)\nplatform :ios do\n  lane :beta do\n    match(type: "appstore")\n    build_app(workspace: "App.xcworkspace", scheme: "Production")\n    upload_to_testflight\n  end\nend`,
    },
    {
      name: "Sentry & Crashlytics",
      roleTag: "REAL-TIME TELEMETRY",
      logo: SentryCrashlyticsLogo,
      category: "tooling",
      categoryLabel: "TELEMETRY",
      desc: "Real-time crash reporting with native stack traces, performance breadcrumbs, and user session replay.",
      bullets: [
        "Symbolicated C++ / Swift / JS stack traces",
        "Network slow-call watermarking",
        "99.95% crash-free session monitoring",
      ],
      metricValue: "99.95%",
      metricLabel: "Crash-Free Sessions SLA",
      codeSnippet: "Sentry.captureException(error);",
      adoption: "Dropbox · Disney+ · Cloudflare · Atlassian",
      advantage: "99.9% crash-free guarantee",
      benchmark: { metric: "Crash Triage Time", val: "< 60s", target: "5m Target", pct: 97 },
      specCode: `// sentry.init.ts\nimport * as Sentry from '@sentry/react-native';\nSentry.init({\n  dsn: "https://key@sentry.io/project",\n  tracesSampleRate: 1.0,\n  attachScreenshot: true\n});`,
    },
  ];

  const filteredTech = techCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === techCategory);

  const processSteps = [
    {
      num: "01",
      title: "Mobile Discovery & Ergonomic Flow Mapping",
      desc: "We define thumb reach zones, gestures, navigation architecture, offline fallbacks, and platform-specific OS permissions.",
      deliverables: ["Ergonomic user flow map", "Technical permissions audit", "Sprint breakdown"],
    },
    {
      num: "02",
      title: "Interactive Physical Device Prototyping",
      desc: "We design high-fidelity screens in Figma and test clickable prototypes directly on real iPhones and Android devices to refine tactile feel.",
      deliverables: ["Figma mobile UI kit", "Clickable prototype on phone", "Gesture & animation guidelines"],
    },
    {
      num: "03",
      title: "Sprint-Based Mobile Engineering",
      desc: "We write modular TypeScript code, implement offline storage, wire up native modules, and deliver weekly TestFlight and Google Play internal builds.",
      deliverables: ["Weekly TestFlight builds", "Clean typed repository", "Automated unit & integration tests"],
    },
    {
      num: "04",
      title: "Device Matrix Testing & Network Simulation",
      desc: "We test across 20+ iPhone and Android device form factors, simulating flaky 3G cellular tunnels, airplane mode, and battery drain benchmarks.",
      deliverables: ["Cross-device QA matrix", "Battery & thermal profile", "Security penetration audit"],
    },
    {
      num: "05",
      title: "App Store Launch & Continuous Iteration",
      desc: "We handle Apple App Review and Google Play guidelines, configure screenshots and privacy nutrition labels, and launch with crash monitoring.",
      deliverables: ["100% App Store approval support", "OTA update pipeline", "30-day post-launch warranty"],
    },
  ];

  const appFeatures = [
    {
      num: "01",
      icon: Fingerprint,
      title: "Instant Biometric Authentication",
      text: "Secure Face ID and Touch ID logins taking under 200ms with hardware-backed Secure Enclave key storage.",
      tags: ["Face ID", "Touch ID", "Secure Enclave"],
    },
    {
      num: "02",
      icon: WifiOff,
      title: "Resilient Offline Operation",
      text: "Allow field teams and commuters to complete workflows without cell signal; changes automatically reconcile when back online.",
      tags: ["Local First", "Conflict-Free Sync", "Zero Data Loss"],
    },
    {
      num: "03",
      icon: Bell,
      title: "Smart Push & Deep Linking",
      text: "Contextual, rich notifications that take users directly to specific in-app workflows or order confirmations.",
      tags: ["Rich Media Push", "Universal Links", "Targeted Segments"],
    },
    {
      num: "04",
      icon: Zap,
      title: "Buttery 60/120 FPS Gestures",
      text: "UI-thread gesture animations ensuring swipe-to-dismiss, drawer expands, and pull-to-refresh feel native and lag-free.",
      tags: ["Native Thread", "Haptic Feedback", "Spring Physics"],
    },
    {
      num: "05",
      icon: RefreshCw,
      title: "Over-The-Air (OTA) Hotfixes",
      text: "Ship critical bug fixes and visual refinements directly to active users without waiting 48 hours for App Store review cycles.",
      tags: ["Instant Updates", "Zero App Store Wait", "Canary Rollouts"],
    },
    {
      num: "06",
      icon: BatteryCharging,
      title: "Battery & Memory Optimization",
      text: "Background processing throttles, asset downsampling, and minimal CPU footprint keeping user devices cool and batteries full.",
      tags: ["Low Battery Drain", "Under 35MB App Size", "Thermal Safe"],
    },
  ];

  const showcaseApps = [
    {
      name: "HrMitra Mobile",
      type: "FIELD WORKFORCE COMPANION",
      image: "/assets/projects/hrmitra-mobile-app.png",
      desc: "Cross-platform mobile application for workforce attendance, biometric punch-in, geo-fenced check-ins, and shift swapping.",
      impact: [
        { label: "Daily Active Shifts", value: "12,000+" },
        { label: "Offline Punch Speed", value: "85ms" },
        { label: "Crash-Free Rate", value: "99.94%" },
      ],
      tags: ["React Native", "Expo", "SQLite Offline", "Biometric Auth", "Geofencing"],
      detail:
        "HrMitra Mobile lets employees clock in instantly via geofenced GPS boundaries and facial verification even in remote construction and warehouse facilities without internet connection. Data auto-synchronizes seamlessly once connection is restored.",
    },
    {
      name: "InfraPilot Field Inspector",
      type: "SITE MANAGEMENT & PUNCH LISTS",
      image: "/assets/projects/infrapilot-mobile-app.png",
      desc: "Mobile inspection app for construction site supervisors to document defects, annotate architectural blueprints, and sync field notes.",
      impact: [
        { label: "Inspection Velocity", value: "+210%" },
        { label: "App Store Rating", value: "4.9 ★" },
        { label: "Sync Latency", value: "24ms" },
      ],
      tags: ["React Native", "Camera API", "Canvas Annotation", "Fastlane", "Sentry"],
      detail:
        "Engineered for high-dust, high-movement field environments. Features high-contrast sunlight visibility mode, rapid camera defect snapping, offline blueprint caching, and automated PDF site summary distribution.",
    },
    {
      name: "AuraPay Mobile Vault",
      type: "TACTILE CLAYMORPHIC FINTECH",
      image: "/assets/projects/aurapay-mobile-app.png",
      desc: "Next-gen iOS banking app with tactile 3D clay debit cards, biometric FaceID authorization, and contactless NFC tap transfers.",
      impact: [
        { label: "Payment Latency", value: "140ms" },
        { label: "App Store Rating", value: "4.95 ★" },
        { label: "Fraud Rate", value: "<0.001%" },
      ],
      tags: ["React Native", "Claymorphic UI", "Apple Pay NFC", "Biometric FaceID", "Encrypted Vault"],
      detail:
        "AuraPay reimagines personal finance with soft-extruded clay cards, tactile haptic transfer confirmation, instant biometric FaceID signing, and real-time multi-currency ledger sync.",
    },
    {
      name: "PulseFit Telemetry OS",
      type: "BIOMETRIC RECOVERY & ECG",
      image: "/assets/projects/pulsefit-mobile-app.png",
      desc: "High-precision health intelligence app featuring claymorphic biometric strain rings, continuous ECG telemetry, and Apple Watch sync.",
      impact: [
        { label: "Sensor Telemetry", value: "120Hz" },
        { label: "Battery Drain", value: "<3%/day" },
        { label: "Data Integrity", value: "100%" },
      ],
      tags: ["Swift / Kotlin", "CoreBluetooth", "Claymorphic Rings", "HealthKit Sync", "Offline ML"],
      detail:
        "Engineered for endurance athletes and cardiology patients. Displays live continuous ECG telemetry, VO2 strain curves, resting heart rate circadian analysis, and instant offline ML recovery scoring.",
    },
  ];

  const faqItems = [
    {
      q: "Should we build cross-platform (React Native/Flutter) or fully native (Swift/Kotlin)?",
      a: "For over 90% of business and consumer apps, modern cross-platform frameworks like React Native or Flutter are the optimal choice. They share 95%+ of the codebase between iOS and Android, cut development cost and maintenance in half, and deliver genuine 60fps native performance. We recommend fully native Swift/Kotlin only for games or apps requiring specialized low-level hardware drivers.",
    },
    {
      q: "How do you handle the Apple App Store and Google Play review process?",
      a: "We manage the entire submission lifecycle: setting up developer accounts, configuring certificates and provisioning profiles, capturing localized screenshots, writing compliant privacy policies, and responding directly to Apple/Google review inquiries until the app is fully approved and live.",
    },
    {
      q: "Can the mobile application function completely offline without internet?",
      a: "Yes. We design our mobile apps with an offline-first architecture utilizing local databases (SQLite or WatermelonDB). Users can create records, edit documents, and navigate cached screens without connectivity. When an internet connection is re-established, changes automatically synchronize in the background.",
    },
    {
      q: "How do we test and review the app on our own devices before launch?",
      a: "We distribute private weekly builds directly to your team's iPhones via Apple TestFlight and to Android devices via Google Play Internal Testing. You can install preview versions with a single tap and provide direct feedback throughout each development sprint.",
    },
    {
      q: "Can you connect the mobile app to our existing web platform or database?",
      a: "Yes. We regularly build mobile apps that integrate directly with existing web applications, databases (PostgreSQL, MySQL), ERPs, and cloud APIs. Both your website and mobile app can share real-time synchronization so updates are instantly reflected across all devices.",
    },
    {
      q: "What happens when Apple or Google release major OS updates each year?",
      a: "We build our applications using modern standard SDKs to ensure future compatibility. Our post-launch stewardship packages include annual OS compatibility updates for new iOS and Android releases, ensuring your app continues to perform flawlessly on the latest devices.",
    },
  ];

  const estimatedSprints =
    (platformTarget.includes("Unified") ? 5 : 4) +
    (storageModel.includes("Offline") ? 1 : 0) +
    (hardwareFeature.includes("Biometrics") ? 1 : 0);

  const scopeQuery = encodeURIComponent(
    `Mobile Platform: ${platformTarget} | Storage: ${storageModel} | Hardware/APIs: ${hardwareFeature} | Est. Sprints: ${estimatedSprints}`
  );

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="service-hero-stage">
        <AppMotionCanvas />
        <div className="service-hero wrap">
          <div className="service-hero-copy">
            <span className="availability">
              <span className="live-indicator">
                <i />
                <span />
              </span>{" "}
              MOBILE ENGINEERING / IOS &amp; ANDROID
            </span>
            <h1>
              Native feel. Single codebase.
              <br />
              Apps designed to be <em>kept.</em>
            </h1>
            <p>
              We engineer intuitive, high-performance mobile applications that turn ideas
              into everyday habits. Built for 60fps responsiveness, offline resilience, and
              long-term user retention on iOS and Android.
            </p>
            <div className="service-hero-actions">
              <Button href="/contact?service=App%20development">
                Discuss your mobile app
              </Button>
              <a className="text-link" href="#app-services">
                Explore app capabilities <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-pill-badge">
              <Check size={14} color="#10b981" />
              <span>Apple &amp; Google Store submission guaranteed · <strong>Weekly TestFlight builds</strong></span>
            </div>
          </div>

          {/* Interactive Smartphone Hero Inspector */}
          <div className="phone-mockup-wrapper">
            <div className="phone-mockup">
              <div className="phone-island">
                <span>9:41</span>
                <div className="phone-island-cam" />
                <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                  <Wifi size={10} />
                  <BatteryCharging size={10} />
                </div>
              </div>

              <div className="phone-screen">
                <div className="phone-top-bar">
                  <span style={{ fontSize: "10px", color: "var(--muted)" }}>DigentTech STUDIO</span>
                  <span className="phone-badge">NATIVE 60FPS</span>
                  <Radio size={12} color="var(--accent)" />
                </div>

                <div className="phone-app-header">
                  <div>
                    <span className="eyebrow" style={{ fontSize: "8px" }}>
                      ACTIVE EXPERIENCE
                    </span>
                    <h4>
                      {phoneMode === "pulse" && "Live Operations"}
                      {phoneMode === "offline" && "Offline Sync Engine"}
                      {phoneMode === "vault" && "Biometric Security"}
                    </h4>
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--accent)", fontWeight: "600" }}>
                    {phoneMode === "pulse" ? "SYNCED" : phoneMode === "offline" ? "OFFLINE" : "LOCKED"}
                  </span>
                </div>

                {/* Phone screen content based on mode */}
                {phoneMode === "pulse" && (
                  <div className="phone-content-card">
                    <div className="phone-metric-row">
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>Today's Activity</span>
                      <span style={{ fontSize: "10px", color: "#10b981", fontWeight: "700" }}>+24% vs Last Week</span>
                    </div>
                    <div className="phone-metric-big">4,892 pts</div>
                    <div className="phone-progress-bg">
                      <div className="phone-progress-fill" style={{ width: "82%" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
                      <div className="phone-task-item">
                        <span>Biometric Attendance Punch</span>
                        <Check size={12} color="#10b981" />
                      </div>
                      <div className="phone-task-item">
                        <span>GPS Geofence Verified</span>
                        <MapPin size={12} color="var(--accent)" />
                      </div>
                      <div className="phone-task-item">
                        <span>Offline Queue Reconciled</span>
                        <Sparkles size={12} color="var(--accent)" />
                      </div>
                    </div>
                  </div>
                )}

                {phoneMode === "offline" && (
                  <div className="phone-content-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <WifiOff size={18} color="#f59e0b" />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--ink)" }}>Local SQLite Storage</div>
                        <div style={{ fontSize: "9px", color: "var(--muted)" }}>Full functionality without cell signal</div>
                      </div>
                    </div>

                    <div style={{ padding: "10px", borderRadius: "8px", background: "var(--raised)", border: "1px solid var(--line)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginBottom: "4px" }}>
                        <span>Cached Documents:</span>
                        <strong style={{ color: "var(--ink)" }}>1,240 records</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginBottom: "4px" }}>
                        <span>Pending Outbox:</span>
                        <strong style={{ color: "var(--accent)" }}>0 pending</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                        <span>Sync Latency:</span>
                        <strong style={{ color: "#10b981" }}>14ms</strong>
                      </div>
                    </div>

                    <div className="phone-task-item">
                      <span>Zero-Lag Query Engine</span>
                      <RefreshCw size={12} color="var(--accent)" />
                    </div>
                  </div>
                )}

                {phoneMode === "vault" && (
                  <div className="phone-content-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Fingerprint size={22} color="var(--accent)" />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--ink)" }}>Face ID Authenticated</div>
                        <div style={{ fontSize: "9px", color: "var(--muted)" }}>Secure Enclave 256-bit Token</div>
                      </div>
                    </div>

                    <div style={{ padding: "14px", borderRadius: "8px", background: "var(--raised)", border: "1px solid var(--line)", textAlign: "center" }}>
                      <Shield size={26} color="#10b981" style={{ margin: "0 auto 6px" }} />
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--ink)" }}>Encrypted Session Active</div>
                      <div style={{ fontSize: "9px", color: "var(--muted)" }}>Hardware keystore locked</div>
                    </div>

                    <div className="phone-task-item">
                      <span>Zero Plaintext Stored</span>
                      <Check size={12} color="#10b981" />
                    </div>
                  </div>
                )}

                <div className="phone-bottom-nav">
                  <button
                    className={"phone-nav-icon " + (phoneMode === "pulse" ? "active" : "")}
                    onClick={() => setPhoneMode("pulse")}
                  >
                    <Navigation size={14} />
                    <span>Pulse</span>
                  </button>
                  <button
                    className={"phone-nav-icon " + (phoneMode === "offline" ? "active" : "")}
                    onClick={() => setPhoneMode("offline")}
                  >
                    <WifiOff size={14} />
                    <span>Offline</span>
                  </button>
                  <button
                    className={"phone-nav-icon " + (phoneMode === "vault" ? "active" : "")}
                    onClick={() => setPhoneMode("vault")}
                  >
                    <Fingerprint size={14} />
                    <span>Vault</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Performance Metrics Strip */}
        <div className="metrics-strip">
          <div className="wrap">
            <div className="metric-item">
              <span className="metric-value">60<span> FPS</span></span>
              <span className="metric-label">Fluid Native Animations</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">99.9<span>%</span></span>
              <span className="metric-label">Crash-Free User Sessions</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">iOS &amp; <span>Android</span></span>
              <span className="metric-label">Cross-Platform Codebase</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">4.9<span> ★</span></span>
              <span className="metric-label">App Store User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. APP SERVICES SECTION */}
      <section className="section wrap" id="app-services">
        <div className="section-top">
          <SectionHeading
            label="FULL-CYCLE MOBILE DEVELOPMENT"
            title="From concept to the top of the App Store charts."
            text="Every layer of mobile product engineering, crafted with precision and tested on physical hardware."
          />
          <a className="text-link" href="/contact?service=App%20development">
            Request mobile scope <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="features-grid-3x2">
          {appServices.map((service) => {
            const Icon = service.icon;
            return (
              <article className="feature-box" key={service.title}>
                <div className="feature-box-top">
                  <div className="feature-icon-badge">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="feature-num">{service.num}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="feature-tags">
                  {service.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. TECHNOLOGY STACK SECTION */}
      <section className="section wrap" id="app-stack">
        <div className="section-top">
          <SectionHeading
            label="MOBILE TECH STACK"
            title="Engineered for responsiveness, security, and velocity."
            text="We select platforms that maximize development efficiency without compromising on native frame rates."
          />
        </div>

        {/* Controls Bar: Category Filter + Format Switcher */}
        <div className="tech-controls-bar">
          {/* Tech category filter */}
          <div className="tech-tabs" role="tablist" aria-label="Technology filter">
            {[
              ["all", "All Technologies"],
              ["framework", "Mobile Frameworks"],
              ["storage", "State & Offline Storage"],
              ["cloud", "Cloud & Backend"],
              ["tooling", "Testing & CI/CD"],
            ].map(([cat, label]) => (
              <button
                key={cat}
                className={"tech-tab " + (techCategory === cat ? "active" : "")}
                onClick={() => setTechCategory(cat as any)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Multiple Format Switcher */}
          <div className="tech-format-switcher" role="group" aria-label="View layout format">
            <button
              className={"tech-format-btn " + (techFormat === "bento" ? "active" : "")}
              onClick={() => setTechFormat("bento")}
            >
              <LayoutGrid size={14} />
              <span>Bento &amp; Brand Art</span>
            </button>
            <button
              className={"tech-format-btn " + (techFormat === "benchmarks" ? "active" : "")}
              onClick={() => setTechFormat("benchmarks")}
            >
              <BarChart3 size={14} />
              <span>Live Benchmarks</span>
            </button>
            <button
              className={"tech-format-btn " + (techFormat === "specs" ? "active" : "")}
              onClick={() => setTechFormat("specs")}
            >
              <Code2 size={14} />
              <span>Architecture Specs</span>
            </button>
          </div>
        </div>

        {/* FORMAT 1: VISUAL BENTO & BRAND ART CARDS */}
        {techFormat === "bento" && (
          <div className="tech-grid">
            {filteredTech.map((tech, idx) => {
              const Logo = tech.logo;
              const isFeatured = idx === 0 && techCategory === "all";
              return (
                <div
                  className={"tech-card " + (isFeatured ? "featured-wide" : "")}
                  key={tech.name}
                >
                  <div className="tech-card-brand-row">
                    <div className="tech-brand-left">
                      <div className="tech-logo-badge">
                        <Logo size={32} />
                      </div>
                      <div className="tech-titles">
                        <h3>{tech.name}</h3>
                        <span className="tech-role-tag">{tech.roleTag}</span>
                      </div>
                    </div>
                    <span className="tech-category-pill">{tech.categoryLabel}</span>
                  </div>

                  <p style={{ fontSize: "12.5px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
                    {tech.desc}
                  </p>

                  {/* Formatted Feature Bullets */}
                  <ul className="tech-bullet-list">
                    {tech.bullets.map((b) => (
                      <li className="tech-bullet-item" key={b}>
                        <Check size={14} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Formatted Metric Banner */}
                  <div className="tech-metric-banner">
                    <div>
                      <div className="tech-metric-val">{tech.metricValue}</div>
                      <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Verified Baseline</span>
                    </div>
                    <div className="tech-metric-lbl">{tech.metricLabel}</div>
                  </div>

                  {/* Code Tag Snippet */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <code className="tech-code-pill">{tech.codeSnippet}</code>
                  </div>

                  {/* Adoption Row */}
                  <div className="tech-adoption-row">
                    <span>Adopted by:</span>
                    <strong>{tech.adoption}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FORMAT 2: LIVE PERFORMANCE BENCHMARKS VIEW */}
        {techFormat === "benchmarks" && (
          <div className="tech-benchmarks-grid">
            {filteredTech.map((tech) => {
              const Logo = tech.logo;
              return (
                <div className="benchmark-card" key={tech.name}>
                  <div className="benchmark-card-top">
                    <div className="tech-brand-left">
                      <div className="tech-logo-badge">
                        <Logo size={28} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "17px", fontWeight: 800 }}>{tech.name}</h3>
                        <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>
                          {tech.benchmark.metric}
                        </span>
                      </div>
                    </div>
                    <div className="tech-category-pill">{tech.categoryLabel}</div>
                  </div>

                  <div className="benchmark-meter-bar">
                    <div className="benchmark-meter-labels">
                      <span>Measured Latency / Speed</span>
                      <strong>{tech.benchmark.val}</strong>
                    </div>
                    <div className="benchmark-bar-track">
                      <div
                        className="benchmark-bar-fill"
                        style={{ width: `${tech.benchmark.pct}%` }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--muted)" }}>
                      <span>Efficiency Index: {tech.benchmark.pct}%</span>
                      <span>Target: {tech.benchmark.target}</span>
                    </div>
                  </div>

                  <div className="tech-bullet-list">
                    {tech.bullets.slice(0, 2).map((b) => (
                      <div className="tech-bullet-item" key={b}>
                        <Check size={14} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="tech-adoption-row">
                    <span>Enterprise Fit:</span>
                    <strong>{tech.adoption}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FORMAT 3: ARCHITECTURE CODE SPECS VIEW */}
        {techFormat === "specs" && (
          <div className="tech-specs-view">
            <div className="specs-nav-list">
              <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", paddingLeft: "8px" }}>
                Select Architecture Module
              </span>
              {filteredTech.map((tech, idx) => {
                const Logo = tech.logo;
                return (
                  <button
                    key={tech.name}
                    className={"specs-nav-btn " + (activeSpecIndex === idx ? "active" : "")}
                    onClick={() => setActiveSpecIndex(idx)}
                  >
                    <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center" }}>
                      <Logo size={20} />
                    </div>
                    <span>{tech.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="specs-terminal">
              {filteredTech[activeSpecIndex] && (
                <>
                  <div className="specs-terminal-top">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                      <strong style={{ color: "var(--ink)", fontFamily: "Manrope, sans-serif" }}>
                        {filteredTech[activeSpecIndex].name} Production Config
                      </strong>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>
                      {filteredTech[activeSpecIndex].categoryLabel}
                    </span>
                  </div>

                  <pre style={{ margin: 0, color: "#38bdf8", fontSize: "12px", lineHeight: 1.7, overflowX: "auto" }}>
                    {filteredTech[activeSpecIndex].specCode}
                  </pre>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase" }}>Hardware Metric</span>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--accent)" }}>
                        {filteredTech[activeSpecIndex].metricValue}
                      </div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase" }}>Target Baseline</span>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>
                        {filteredTech[activeSpecIndex].metricLabel}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 4. DEVELOPMENT PROCESS SECTION */}
      <section className="section wrap" id="app-process">
        <div className="section-top">
          <SectionHeading
            label="MOBILE PRODUCT ROADMAP"
            title="A transparent path from idea to the home screen."
            text="Structured in milestones with weekly device builds so you can test on real hardware early and often."
          />
        </div>

        <div className="roadmap-container">
          {processSteps.map((step) => (
            <article className="roadmap-card" key={step.title}>
              <div className="roadmap-num">{step.num}</div>
              <div className="roadmap-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <div className="roadmap-meta">
                {step.deliverables.map((del) => (
                  <div className="roadmap-deliverable" key={del}>
                    <Check size={14} />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. APP FEATURES (KEY CAPABILITIES) SECTION */}
      <section className="section wrap" id="app-features">
        <div className="section-top">
          <SectionHeading
            label="ENTERPRISE-GRADE CAPABILITIES"
            title="Every detail tuned for touch."
            text="High-performance nuances that separate memorable mobile experiences from forgotten downloads."
          />
        </div>

        <div className="features-grid-3x2">
          {appFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div className="feature-box" key={feat.title}>
                <div className="feature-box-top">
                  <div className="feature-icon-badge">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="feature-num">{feat.num}</span>
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.text}</p>
                <div className="feature-tags">
                  {feat.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sculptural Mobile Touch & Ergonomics Visual Banner */}
        <div className="studio-feature-banner">
          <div className="feature-banner-media">
            <ThemeImage
              variant="sculpture"
              alt="DigentTech sculptural mobile interaction design study"
            />
          </div>
          <div className="feature-banner-copy">
            <span className="eyebrow">ERGONOMIC HARDWARE HARMONY</span>
            <h3>Tactile precision sculpted for human touch.</h3>
            <p>
              Every gesture, haptic vibration, and micro-transition is tuned against human biomechanics.
              Our mobile apps don't just display data — they respond to human touch with tactile physical weight
              and native 120Hz responsiveness.
            </p>
            <div className="feature-tags">
              <span>Haptic Feedback</span>
              <span>120Hz ProMotion</span>
              <span>Thumb-Zone Ergonomics</span>
              <span>Full Offline Sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. APP SHOWCASE SECTION */}
      <section className="section wrap" id="app-showcase">
        <div className="section-top">
          <SectionHeading
            label="MOBILE PRODUCTS IN THE WILD"
            title="Touch experiences built for real users."
            text="Mobile applications engineered for high daily engagement, field reliability, and store acclaim."
          />
          <a className="text-link" href="/work">
            View all work <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="showcase-featured-grid">
          {showcaseApps.map((p, i) => (
            <article className="showcase-card" key={p.name}>
              <div className="showcase-media mobile-aspect">
                <span className="showcase-media-tag">{p.type}</span>
                <img src={p.image} alt={p.name + " mobile preview"} loading="lazy" />
              </div>
              <div className="showcase-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>

                <div className="showcase-stats-row">
                  {p.impact.map((stat) => (
                    <div className="showcase-stat-item" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="feature-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <button
                  className="button"
                  style={{ marginTop: "14px", alignSelf: "flex-start" }}
                  onClick={() => setSelectedProject(i)}
                >
                  Inspect App Architecture
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Showcase deep-dive modal */}
        {selectedProject !== null && (
          <div className="modal-shade" onClick={() => setSelectedProject(null)}>
            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-label={showcaseApps[selectedProject].name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="icon-button close-modal"
                aria-label="Close project modal"
                autoFocus
                onClick={() => setSelectedProject(null)}
              >
                <X />
              </button>
              <span className="eyebrow">{showcaseApps[selectedProject].type}</span>
              <h2>{showcaseApps[selectedProject].name}</h2>
              <img
                src={showcaseApps[selectedProject].image}
                alt={showcaseApps[selectedProject].name + " preview"}
              />
              <p>{showcaseApps[selectedProject].detail}</p>
              <div className="tags">
                {showcaseApps[selectedProject].tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Button href={"/contact?service=App%20development&brief=" + encodeURIComponent("I would like to discuss an app similar to " + showcaseApps[selectedProject].name)}>
                Discuss a similar mobile app
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* INTERACTIVE MOBILE SCOPE ESTIMATOR (CONVERSION CATALYST) */}
      <section className="section wrap" id="app-estimator">
        <div className="section-top">
          <SectionHeading
            label="APP ESTIMATOR"
            title="Configure your mobile architecture."
            text="Choose your platform target and features to view an instant sprint estimate and pre-fill your inquiry."
          />
        </div>

        <div className="scope-estimator-box">
          <div className="estimator-grid">
            <div className="estimator-options">
              <div>
                <div className="estimator-group-title">1. TARGET PLATFORM</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {["iOS & Android (Unified)", "iOS Native (Swift)", "Android Native (Kotlin)"].map((t) => (
                    <button
                      key={t}
                      className={"estimator-chip " + (platformTarget === t ? "active" : "")}
                      onClick={() => setPlatformTarget(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="estimator-group-title">2. OFFLINE &amp; DATA ENGINE</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {["Offline-First (SQLite)", "Cloud Sync (Supabase)", "Standard Cloud API"].map((s) => (
                    <button
                      key={s}
                      className={"estimator-chip " + (storageModel === s ? "active" : "")}
                      onClick={() => setStorageModel(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="estimator-group-title">3. HARDWARE &amp; NATIVE APIS</div>
                <div className="estimator-chips" style={{ marginTop: "8px" }}>
                  {["Biometrics & Push", "GPS Geofencing & Camera", "Bluetooth BLE & Sensors", "In-App Purchases (StoreKit)"].map((h) => (
                    <button
                      key={h}
                      className={"estimator-chip " + (hardwareFeature === h ? "active" : "")}
                      onClick={() => setHardwareFeature(h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="estimator-output">
              <span className="eyebrow">ESTIMATED MOBILE ROADMAP</span>
              <div className="estimator-output-stat">
                <span>Estimated Duration:</span>
                <strong>{estimatedSprints} Sprints (~{estimatedSprints * 2} wks)</strong>
              </div>
              <div className="estimator-output-stat">
                <span>Testing Cadence:</span>
                <strong style={{ fontSize: "16px", color: "var(--ink)" }}>Weekly TestFlight</strong>
              </div>
              <div className="estimator-output-stat" style={{ borderBottom: "0", paddingBottom: "0" }}>
                <span>Store Submission:</span>
                <strong style={{ fontSize: "16px", color: "#10b981" }}>Apple &amp; Google Included</strong>
              </div>
              <Button href={"/contact?service=App%20development&brief=" + scopeQuery}>
                Build my mobile brief
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="section wrap faq" id="app-faq">
        <SectionHeading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Common questions about our mobile development process."
          text="Clear answers regarding platforms, App Store approvals, and offline sync."
        />

        <div>
          {faqItems.map((item, i) => (
            <article key={item.q}>
              <button
                aria-expanded={openFaq === i}
                aria-controls={"app-faq-" + i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {openFaq === i && <p id={"app-faq-" + i}>{item.a}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="service-cta-panel">
        <div className="wrap service-cta-inner">
          <span className="eyebrow">PUT YOUR APP IN CUSTOMERS' HANDS</span>
          <h2>
            Ready to turn your idea into an
            <br />
            essential <em>app?</em>
          </h2>
          <p>
            From a napkin concept to a full App Store and Google Play deployment,
            our mobile engineers partner with you every step of the journey.
          </p>
          <div className="service-cta-badges">
            <div className="service-cta-badge-item">
              <Check size={14} />
              <span>Apple &amp; Google Store submission support</span>
            </div>
            <div className="service-cta-badge-item">
              <Check size={14} />
              <span>Full source code &amp; IP ownership</span>
            </div>
            <div className="service-cta-badge-item">
              <Check size={14} />
              <span>30-day post-launch warranty</span>
            </div>
          </div>
          <div className="service-cta-buttons">
            <Button href="/contact?service=App%20development">
              Discuss your mobile app
            </Button>
            <a className="text-link" href="mailto:hr.digenttech@gmail.com?subject=Mobile%20App%20Inquiry">
              Email mobile engineers <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
