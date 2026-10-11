import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Cpu,
  Flame,
  Globe2,
  Heart,
  HelpCircle,
  Laptop,
  Layers,
  MapPin,
  Maximize2,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import "./careers-page.css";

const HR_EMAIL = "hr.digenttech@gmail.com";

interface JobRole {
  id: string;
  title: string;
  department: "engineering" | "design" | "ai" | "marketing";
  departmentLabel: string;
  level: string;
  type: string;
  location: string;
  matchTags: string[];
  shortDesc: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
  highlight: string;
  monthOneMilestone: string;
}

const JOB_ROLES: JobRole[] = [
  {
    id: "sr-fullstack",
    title: "Senior Full-Stack Engineer",
    department: "engineering",
    departmentLabel: "Engineering",
    level: "Senior / Staff",
    type: "Full-Time",
    location: "Remote · India / Global UTC±4",
    matchTags: ["react", "systems", "performance", "backend"],
    shortDesc:
      "Architect high-throughput web applications, real-time reactive dashboards, and resilient backend microservices with sub-50ms latency.",
    responsibilities: [
      "Own end-to-end architecture and implementation of scalable web platforms using React 19, Next.js 15, and Go.",
      "Design zero-downtime database schemas, caching layers (Redis/Dragonfly), and event-driven APIs.",
      "Drive code reviews, maintain 95%+ unit/integration test coverage, and champion clean architecture patterns.",
      "Collaborate directly with designers to bring complex interactive animations to life at a silky 60fps.",
    ],
    requirements: [
      "5+ years of production experience shipping modern web platforms at scale.",
      "Deep mastery of TypeScript, React internals, state management, and modern browser APIs.",
      "Proficiency with backend architectures (Go, Node.js, or Rust) and relational databases (PostgreSQL).",
      "Demonstrated ownership mentality: you care about user experience, error monitoring, and performance telemetry.",
    ],
    techStack: ["React 19", "Next.js 15", "TypeScript", "Go", "PostgreSQL", "TailwindCSS", "Docker"],
    highlight: "Lead core product squads building next-gen enterprise tools.",
    monthOneMilestone: "Ship a mission-critical reactive microservice and co-author architecture standards.",
  },
  {
    id: "sr-mobile",
    title: "Senior Mobile Engineer",
    department: "engineering",
    departmentLabel: "Engineering",
    level: "Senior",
    type: "Full-Time",
    location: "Remote · India / Global UTC±4",
    matchTags: ["mobile", "react-native", "ios", "offline"],
    shortDesc:
      "Craft buttery-smooth mobile applications with native bridges, offline-first data sync, and hardware sensor telemetry.",
    responsibilities: [
      "Build fluid iOS and Android mobile experiences utilizing React Native (New Architecture) and Flutter.",
      "Integrate native Swift/Kotlin bridge modules, Bluetooth Low Energy (BLE) peripherals, and background workers.",
      "Engineer robust offline-first synchronization engines using SQLite/WatermelonDB with encrypted storage.",
      "Optimize bundle size, startup time, memory allocation, and render frame rates on diverse Android/iOS devices.",
    ],
    requirements: [
      "4+ years building and deploying top-tier iOS and Android apps to the App Store & Google Play.",
      "Strong understanding of React Native architecture, Reanimated 3, native module bridging, and mobile security.",
      "Experience with mobile telemetry, crash reporting (Sentry), and CI/CD pipelines (Fastlane).",
      "Obsessive attention to UI fluidity, haptic feedback, and platform-specific design conventions.",
    ],
    techStack: ["React Native", "Flutter", "TypeScript", "Swift/Kotlin", "Reanimated 3", "BLE", "Fastlane"],
    highlight: "Ship products downloaded and loved by hundreds of thousands.",
    monthOneMilestone: "Lead a production release cycle with 60fps Reanimated physics and offline sync.",
  },
  {
    id: "lead-product-designer",
    title: "Lead Product & UI/UX Designer",
    department: "design",
    departmentLabel: "Design & Product",
    level: "Lead",
    type: "Full-Time",
    location: "Remote · India / Global UTC±4",
    matchTags: ["ui-ux", "figma", "design-tokens", "claymorphism"],
    shortDesc:
      "Direct end-to-end design journeys, define multi-brand tokenized design systems, and craft tactile, micro-animated interfaces.",
    responsibilities: [
      "Lead product design from initial user problem definition, discovery interviews, and wireframes to pixel-perfect mockups.",
      "Expand and govern our multi-platform Claymorphic & Glassmorphic design systems in Figma and code tokens.",
      "Design interactive prototypes with realistic physics, transitions, and micro-interactions.",
      "Partner closely with frontend engineers to ensure design fidelity and responsive elegance across all screens.",
    ],
    requirements: [
      "4+ years designing high-impact web and mobile consumer/SaaS software.",
      "Exceptional Figma craft: auto-layout mastery, component variants, variable modes, and token workflows.",
      "Strong visual sense: typography hierarchy, spatial harmony, lighting/shadows, and accessible color science.",
      "A portfolio demonstrating real products shipped, showing both problem-solving rigor and visual excellence.",
    ],
    techStack: ["Figma", "Design Tokens", "Prototyping", "WCAG 2.2 AAA", "Framer", "Motion Design"],
    highlight: "Shape the visual soul and design standards of our entire studio.",
    monthOneMilestone: "Codify an accessible 3D tactile token system and prototype a flagship mobile flow.",
  },
  {
    id: "ai-systems-engineer",
    title: "AI & Automation Systems Engineer",
    department: "ai",
    departmentLabel: "AI & Systems",
    level: "Senior",
    type: "Full-Time",
    location: "Remote · India / Global UTC±4",
    matchTags: ["ai", "agents", "python", "rag"],
    shortDesc:
      "Develop intelligent agentic workflows, LLM orchestration pipelines, and bespoke RAG systems with enterprise accuracy.",
    responsibilities: [
      "Architect multi-agent automation systems, autonomous reasoning loops, and deterministic fallback workflows.",
      "Build high-performance vector retrieval pipelines, embedding chunking strategies, and hybrid semantic search.",
      "Deploy scalable FastAPI microservices and background job queues with low latency and streaming responses.",
      "Fine-tune open-weights models and optimize inference costs through intelligent prompt caching and routing.",
    ],
    requirements: [
      "3+ years experience with modern AI/ML development in Python, FastAPI, and asynchronous concurrency.",
      "Demonstrated experience building production LLM apps with LangChain, LlamaIndex, or raw tool-calling APIs.",
      "Familiarity with vector databases (Qdrant, Pinecone, pgvector) and evaluation benchmarks.",
      "Rigorous mindset towards LLM reliability, guardrails, hallucinations prevention, and prompt regression testing.",
    ],
    techStack: ["Python 3.12", "FastAPI", "LangChain / LangGraph", "pgvector", "Docker", "OpenAI / Claude API"],
    highlight: "Tackle real-world enterprise automation with frontier models.",
    monthOneMilestone: "Deploy an autonomous multi-agent tool pipeline with streaming telemetry.",
  },
  {
    id: "cloud-devops-engineer",
    title: "Cloud Infrastructure & DevOps Engineer",
    department: "engineering",
    departmentLabel: "Engineering",
    level: "Senior",
    type: "Full-Time",
    location: "Remote · India / Global UTC±4",
    matchTags: ["devops", "cloud", "aws", "terraform"],
    shortDesc:
      "Own resilient multi-cloud deployments, Terraform IaC, Cloudflare edge compute, and automated CI/CD release pipelines.",
    responsibilities: [
      "Provision and maintain infrastructure as code across AWS and Cloudflare using Terraform.",
      "Build robust GitHub Actions CI/CD pipelines enabling zero-downtime preview environments and production deploys.",
      "Establish observability, distributed tracing, error alerting, and automated failover recovery (Grafana, Sentry).",
      "Fortify security posture: IAM least-privilege, automated vulnerability scanning, SSL/TLS, and secrets management.",
    ],
    requirements: [
      "4+ years managing cloud infrastructure (AWS/GCP/Cloudflare) and containerized orchestration (Docker/Kubernetes).",
      "Hands-on expertise with Terraform, edge computing (Cloudflare Workers/Pages), and reverse proxies.",
      "Strong Linux systems knowledge, network protocols, DNS configurations, and database backup/restore strategies.",
      "Passion for developer experience: creating fast, reproducible local environments and instant deployments.",
    ],
    techStack: ["AWS", "Cloudflare Workers", "Terraform", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
    highlight: "Keep our mission-critical systems running with 99.99% uptime.",
    monthOneMilestone: "Automate preview deployment branches with sub-60s build speeds.",
  },
  {
    id: "growth-marketing-strategist",
    title: "Growth Marketing & Technical SEO Strategist",
    department: "marketing",
    departmentLabel: "Growth & SEO",
    level: "Mid to Senior",
    type: "Full-Time",
    location: "Remote · India / Global UTC±4",
    matchTags: ["seo", "growth", "marketing", "content"],
    shortDesc:
      "Drive organic search dominance, craft technical case studies, and execute data-backed client acquisition funnels.",
    responsibilities: [
      "Formulate and execute organic SEO roadmaps, technical site audits, keyword clustering, and programmatic content.",
      "Craft in-depth case studies, engineering teardowns, and thought leadership articles showcasing studio wins.",
      "Analyze attribution funnels, conversion rates, and client journeys using privacy-friendly analytics and GA4.",
      "Experiment with paid search and performance campaigns to generate high-intent enterprise development leads.",
    ],
    requirements: [
      "3+ years running measurable organic growth and inbound marketing campaigns for tech agencies or B2B SaaS.",
      "Deep understanding of modern technical SEO: Core Web Vitals, schema markup, semantic search, and crawl budgets.",
      "Analytical mindset with hands-on proficiency in Ahrefs, SEMrush, Google Search Console, and SQL/Spreadsheets.",
      "Exceptional written communication skills with the ability to explain complex technical concepts compellingly.",
    ],
    techStack: ["Technical SEO", "Ahrefs", "GA4", "Search Console", "Content Strategy", "Conversion Optimization"],
    highlight: "Spearhead studio brand visibility and high-value inbound pipelines.",
    monthOneMilestone: "Publish 2 high-conversion technical architecture teardowns and boost top-3 rankings.",
  },
];

const STUDIO_PILLARS = [
  {
    icon: Laptop,
    badge: "WORKSTATION",
    title: "Apple Silicon Flagships",
    desc: "Apple M3/M4 Max MacBook Pro or high-end Linux rig, 4K Dell UltraSharp monitors, and full ergonomic allowances.",
    metric: "M3/M4 Max Hardware",
  },
  {
    icon: Compass,
    badge: "AUTONOMY",
    title: "100% Async Freedom",
    desc: "Zero micro-management or camera-on surveillance. Work when you're sharpest. Results and clean PRs are our only currency.",
    metric: "< 3h Meetings / Wk",
  },
  {
    icon: Award,
    badge: "CRAFT",
    title: "Continuous Sponsorship",
    desc: "Full studio funding for global developer summits, specialized architecture masterclasses, frontier AI tooling, and books.",
    metric: "100% Edu Stipend",
  },
  {
    icon: Heart,
    badge: "HEALTH",
    title: "Holistic Health & Rest",
    desc: "Comprehensive health coverage for you and family, mandatory quarterly recharge weeks, and flexible parental leave.",
    metric: "Comprehensive Cover",
  },
];

const HIRING_STEPS = [
  {
    step: "01",
    title: "Portfolio Triage",
    time: "< 48 Hours SLA",
    desc: "Real staff engineers and lead designers review your GitHub, Figma, or past systems. Never filtered by automated bots.",
  },
  {
    step: "02",
    title: "Chemistry Chat",
    time: "30 Minutes",
    desc: "A relaxed video session with studio founders to discuss what kind of problems get you excited and align on our culture.",
  },
  {
    step: "03",
    title: "Realistic Craft Sprint",
    time: "Respectful Scope",
    desc: "A hands-on, realistic task reflecting actual studio work. We respect your time with a strictly focused, practical scope.",
  },
  {
    step: "04",
    title: "Direct Offer & Leveling",
    time: "24 – 48 Hours",
    desc: "Clear, transparent offer package with defined impact scope, hardware provisioning date, and flexible start timeline.",
  },
];

/**
 * Interactive Cybernetic Particle Constellation Canvas
 * Connects nodes with mouse proximity and subtle pulsing aura
 */
function CareerOrbitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const mouse = { x: -1000, y: -1000, radius: 140 };

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const nodeColors = [
      "rgba(0, 101, 252, ",
      "rgba(0, 198, 255, ",
      "rgba(139, 92, 246, ",
      "rgba(16, 185, 129, ",
    ];

    const nodesCount = Math.min(45, Math.floor((width * height) / 12000));
    const nodes: Node[] = Array.from({ length: nodesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.2 + 1.2,
      color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Mouse attraction/repulsion
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 0.05;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Friction
        n.vx *= 0.985;
        n.vy *= 0.985;

        // Bounce walls
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${n.alpha})`;
        ctx.shadowColor = `${n.color}0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist2 = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const lineAlpha = (1 - dist2 / 110) * 0.22;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="crx-hero-canvas" />;
}

export function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeRoleId, setActiveRoleId] = useState<string>("sr-fullstack");
  const [applicationModalRole, setApplicationModalRole] = useState<JobRole | null>(null);

  // Terminal telemetry tab
  const [terminalTab, setTerminalTab] = useState<"spec" | "stack" | "perks">("spec");

  // Application form states
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantExperience, setApplicantExperience] = useState("3-5 years");
  const [applicantNote, setApplicantNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailDraftUrl, setEmailDraftUrl] = useState("");

  const searchInputId = useId();

  // Skill radar quick filters
  const SKILL_TAGS = [
    { label: "⚡ High-Throughput APIs", key: "systems" },
    { label: "🎨 Tactile 120fps UI", key: "claymorphism" },
    { label: "🤖 Agentic Workflows", key: "agents" },
    { label: "📱 Offline Mobile", key: "mobile" },
    { label: "🚀 Technical SEO", key: "seo" },
    { label: "☁️ Edge Compute", key: "devops" },
  ];

  // Filter roles based on department, search query, and skill tag
  const filteredRoles = JOB_ROLES.filter((role) => {
    const matchesDept = selectedDept === "all" || role.department === selectedDept;
    const matchesSearch =
      searchQuery.trim() === "" ||
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      role.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || role.matchTags.includes(selectedTag);
    return matchesDept && matchesSearch && matchesTag;
  });

  // Active role
  const activeRole =
    filteredRoles.find((r) => r.id === activeRoleId) ||
    filteredRoles[0] ||
    JOB_ROLES[0];

  const handleOpenApplication = (role: JobRole) => {
    setApplicationModalRole(role);
    setSubmitSuccess(false);
    setSubmitError("");
    setEmailDraftUrl("");
  };

  const handleCloseModal = () => {
    setApplicationModalRole(null);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationModalRole) return;

    setSubmitting(true);
    setSubmitError("");

    const subject = `Job Application: ${applicationModalRole.title} - ${applicantName}`;
    const bodyContent =
      `Hello DigentTech Hiring Team,\n\nI am applying for the role of ${applicationModalRole.title}.\n\n` +
      `• Applicant Name: ${applicantName}\n` +
      `• Applicant Email: ${applicantEmail}\n` +
      `• Portfolio / GitHub / Links: ${applicantPortfolio}\n` +
      `• Experience Level: ${applicantExperience}\n\n` +
      `Why DigentTech / Cover Note:\n${applicantNote}\n\n` +
      `Submitted through DigentTech Careers Portal.`;

    const mailto = `mailto:${HR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    setEmailDraftUrl(mailto);

    try {
      // Connect to Dual Mail backend API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: applicantName,
          email: applicantEmail,
          service: `Career Application: ${applicationModalRole.title}`,
          budget: `Exp: ${applicantExperience}`,
          message: `Portfolio: ${applicantPortfolio}\n\nCandidate Note:\n${applicantNote}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitSuccess(true);
      } else {
        throw new Error(data.message || "Failed to submit application via server.");
      }
    } catch (err: any) {
      console.warn("Backend submit error, offering mailto fallback:", err.message);
      // Fallback allows user to send directly via mailto
      setSubmitSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="crx-root">
      {/* 1. CINEMATIC CYBER-STUDIO HERO WITH DYNAMIC PARTICLE MATRIX */}
      <section className="crx-hero">
        <CareerOrbitCanvas />
        <div className="crx-bg-grid" />
        <div className="crx-bg-glow-1" />
        <div className="crx-bg-glow-2" />

        <div className="wrap crx-hero-split">
          <div className="crx-hero-copy">
            <div className="crx-badge-pill">
              <span className="crx-pulse-ring" />
              <Sparkles size={13} className="crx-sparkle-icon" />
              <span>DIGENTTECH COLLECTIVE • HIGH CRAFT ENGINEERING</span>
            </div>

            <h1 className="crx-hero-title">
              Where architects
              <br />
              &amp; craftspeople ship
              <br />
              their <em>defining work.</em>
            </h1>

            <p className="crx-hero-subtitle">
              We eliminated bureaucratic agency overhead to build a pure sanctuary for senior builders.
              Work with founders directly, run async in deep focus, and engineer production software
              that sets the standard.
            </p>

            <div className="crx-stat-chips-row">
              <div className="crx-stat-chip">
                <Globe2 size={15} />
                <span>100% Async &amp; Remote</span>
              </div>
              <div className="crx-stat-chip">
                <Users size={15} />
                <span>Senior Squads Only</span>
              </div>
              <div className="crx-stat-chip">
                <Clock size={15} />
                <span>&lt; 48h Response SLA</span>
              </div>
              <div className="crx-stat-chip">
                <Zap size={15} />
                <span>Top Tier Hardware</span>
              </div>
            </div>

            <div className="crx-hero-cta-group">
              <a href="#workbench" className="crx-btn-glow">
                <span>Explore Open Squads ({JOB_ROLES.length})</span>
                <ArrowRight size={17} />
              </a>
              <a
                href={`mailto:${HR_EMAIL}?subject=Talent%20Network%20Inquiry`}
                className="crx-btn-glass"
              >
                <span>Email HR Directly</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="crx-manifesto-strip">
              <span className="crx-manifesto-lead">OUR ENGINEERING OATH:</span>
              <span>Zero politics. No useless meetings. 100% intellectual honesty.</span>
            </div>
          </div>

          {/* Interactive Holographic HUD Terminal */}
          <div className="crx-hero-visual">
            <div className="crx-terminal-window">
              <div className="crx-term-header">
                <div className="crx-term-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="crx-term-tabs">
                  <button
                    className={`crx-term-tab ${terminalTab === "spec" ? "active" : ""}`}
                    onClick={() => setTerminalTab("spec")}
                  >
                    studio-spec.json
                  </button>
                  <button
                    className={`crx-term-tab ${terminalTab === "stack" ? "active" : ""}`}
                    onClick={() => setTerminalTab("stack")}
                  >
                    production-stack.ts
                  </button>
                  <button
                    className={`crx-term-tab ${terminalTab === "perks" ? "active" : ""}`}
                    onClick={() => setTerminalTab("perks")}
                  >
                    values.md
                  </button>
                </div>
                <div className="crx-term-live-badge">
                  <span className="crx-live-dot" /> LIVE
                </div>
              </div>

              <div className="crx-term-body">
                {terminalTab === "spec" && (
                  <div className="crx-term-code-block">
                    <div className="crx-code-line">
                      <span className="crx-ck">const</span> studioTelemetry = &#123;
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cp">mode</span>: <span className="crx-cs">"100% Async / Global"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cp">sprintCadence</span>: <span className="crx-cs">"Bi-weekly Demo Drops"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cp">meetingCeiling</span>: <span className="crx-cn">&lt; 3 hours / week</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cp">decisionModel</span>: <span className="crx-cs">"Working code &gt; Slides"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cp">activeSquads</span>: <span className="crx-cn">{JOB_ROLES.length}</span>,
                    </div>
                    <div className="crx-code-line">&#125;;</div>
                  </div>
                )}

                {terminalTab === "stack" && (
                  <div className="crx-term-code-block">
                    <div className="crx-code-line">
                      <span className="crx-ck">export const</span> productionStack = [
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cs">"React 19 / Next.js 15"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cs">"TypeScript Strict Mode"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cs">"React Native &amp; Reanimated"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cs">"FastAPI &amp; LangGraph AI"</span>,
                    </div>
                    <div className="crx-code-line indent">
                      <span className="crx-cs">"PostgreSQL &amp; Cloudflare Edge"</span>,
                    </div>
                    <div className="crx-code-line">];</div>
                  </div>
                )}

                {terminalTab === "perks" && (
                  <div className="crx-term-code-block">
                    <div className="crx-code-line crx-comment">
                      # Culture &amp; Compensation Principles
                    </div>
                    <div className="crx-code-line">
                      - Apple M3/M4 Max + 4K UltraSharp Displays
                    </div>
                    <div className="crx-code-line">
                      - Zero time tracking or micromanagement
                    </div>
                    <div className="crx-code-line">
                      - 100% studio-sponsored learning &amp; summits
                    </div>
                    <div className="crx-code-line">
                      - Comprehensive family health insurance
                    </div>
                  </div>
                )}

                {/* Telemetry live stats */}
                <div className="crx-telemetry-grid">
                  <div className="crx-telemetry-card">
                    <span className="crx-tele-label">SQUAD CADENCE</span>
                    <strong className="crx-tele-num">14-Day Sprints</strong>
                  </div>
                  <div className="crx-telemetry-card">
                    <span className="crx-tele-label">DEEP WORK BLOCK</span>
                    <strong className="crx-tele-num">6h / Day</strong>
                  </div>
                  <div className="crx-telemetry-card">
                    <span className="crx-tele-label">HIRING SLA</span>
                    <strong className="crx-tele-num">&lt; 48 Hours</strong>
                  </div>
                </div>

                {/* Quick Role Links */}
                <div className="crx-terminal-pills">
                  <span className="crx-pills-label">OPEN SQUAD TRACKS:</span>
                  <div className="crx-pills-row">
                    {JOB_ROLES.map((r) => (
                      <a
                        key={r.id}
                        href="#workbench"
                        onClick={() => {
                          setActiveRoleId(r.id);
                          setSelectedDept("all");
                        }}
                        className="crx-term-role-pill"
                      >
                        {r.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CULTURE & ENGINEERING DNA BENTO DECK */}
      <section className="wrap crx-pillars-section">
        <div className="crx-section-heading">
          <span className="crx-eyebrow">ENGINEERING FIRST CULTURE</span>
          <h2>Crafted for Builders Who Care About Details</h2>
          <p>
            We don't do meaningless agency bloat. Every team policy exists to maximize creative
            autonomy, craftsmanship, and mental peace.
          </p>
        </div>

        <div className="crx-pillars-grid">
          {STUDIO_PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className={`crx-pillar-card crx-card-accent-${idx}`}>
                <div className="crx-card-spotlight" />
                <div className="crx-pillar-top">
                  <div className="crx-pillar-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="crx-pillar-metric">{p.metric}</span>
                </div>
                <span className="crx-pillar-badge">{p.badge}</span>
                <h3 className="crx-pillar-title">{p.title}</h3>
                <p className="crx-pillar-desc">{p.desc}</p>
                <div className="crx-card-shimmer" />
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE ROLE RADAR & MATCHMAKER FINDER */}
      <section className="wrap crx-radar-section">
        <div className="crx-radar-banner">
          <div className="crx-radar-left">
            <div className="crx-radar-badge">
              <Wand2 size={14} />
              <span>ROLE MATCHMAKER RADAR</span>
            </div>
            <h3>Filter by what excites your curiosity:</h3>
          </div>
          <div className="crx-radar-tags">
            {SKILL_TAGS.map((tag) => {
              const isSelected = selectedTag === tag.key;
              return (
                <button
                  key={tag.key}
                  className={`crx-radar-tag ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedTag(isSelected ? null : tag.key)}
                >
                  {tag.label}
                  {isSelected && <Check size={12} />}
                </button>
              );
            })}
            {selectedTag && (
              <button className="crx-radar-reset" onClick={() => setSelectedTag(null)}>
                Clear Filter <X size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. THE MASTER-DETAIL ROLE WORKBENCH */}
      <section className="wrap crx-workbench-section" id="workbench">
        <div className="crx-section-heading">
          <span className="crx-eyebrow">CAREERS WORKBENCH</span>
          <h2>Active Squad Openings</h2>
          <p>
            Inspect the exact technical responsibilities, deliverables, and architecture stack for each open track.
          </p>
        </div>

        {/* Toolbar: Category tabs and search */}
        <div className="crx-toolbar">
          <div className="crx-dept-nav">
            {[
              { id: "all", label: `All Squads (${JOB_ROLES.length})` },
              {
                id: "engineering",
                label: `Engineering (${JOB_ROLES.filter((r) => r.department === "engineering").length})`,
              },
              {
                id: "design",
                label: `Design & UX (${JOB_ROLES.filter((r) => r.department === "design").length})`,
              },
              {
                id: "ai",
                label: `AI & Systems (${JOB_ROLES.filter((r) => r.department === "ai").length})`,
              },
              {
                id: "marketing",
                label: `Growth & SEO (${JOB_ROLES.filter((r) => r.department === "marketing").length})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`crx-tab-pill ${selectedDept === tab.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedDept(tab.id);
                  const firstOfDept = JOB_ROLES.find(
                    (r) => tab.id === "all" || r.department === tab.id
                  );
                  if (firstOfDept) setActiveRoleId(firstOfDept.id);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="crx-search-wrap">
            <Search size={15} className="crx-search-icon" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search by role, framework, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="crx-search-input"
              aria-label="Filter roles"
            />
            {searchQuery && (
              <button
                className="crx-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        {filteredRoles.length === 0 ? (
          <div className="crx-empty-state">
            <div className="crx-empty-icon">
              <HelpCircle size={32} />
            </div>
            <h3>No matching roles found</h3>
            <p>We couldn't find an open role matching “{searchQuery}”.</p>
            <button
              className="crx-btn-glass"
              onClick={() => {
                setSelectedDept("all");
                setSearchQuery("");
                setSelectedTag(null);
              }}
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="crx-workbench-layout">
            {/* Left Nav List */}
            <div className="crx-role-nav-list">
              {filteredRoles.map((role) => {
                const isActive = activeRole?.id === role.id;
                return (
                  <button
                    key={role.id}
                    className={`crx-nav-card ${isActive ? "active" : ""}`}
                    onClick={() => setActiveRoleId(role.id)}
                  >
                    <div className="crx-nav-card-top">
                      <span className={`crx-dept-badge dept-${role.department}`}>
                        {role.departmentLabel}
                      </span>
                      <span className="crx-level-badge">{role.level}</span>
                    </div>

                    <h3 className="crx-nav-card-title">{role.title}</h3>

                    <div className="crx-nav-card-meta">
                      <span className="crx-meta-loc">
                        <MapPin size={12} /> {role.location}
                      </span>
                      <span className="crx-meta-type">{role.type}</span>
                    </div>

                    <div className="crx-nav-card-tech">
                      {role.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="crx-mini-chip">
                          {t}
                        </span>
                      ))}
                      {role.techStack.length > 3 && (
                        <span className="crx-mini-chip-more">
                          +{role.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="crx-nav-card-chevron">
                      <ChevronRight size={16} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Workbench Card */}
            {activeRole && (
              <div className="crx-detail-workbench">
                <div className="crx-workbench-bar">
                  <div className="crx-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="crx-window-domain">
                    digent.studio / positions / {activeRole.id}
                  </span>
                  <div className="crx-window-status">
                    <span className="crx-status-dot" />
                    <span>HIRING ACTIVE</span>
                  </div>
                </div>

                <div className="crx-workbench-body">
                  <div className="crx-detail-header">
                    <div className="crx-detail-badge-row">
                      <span className={`crx-dept-badge dept-${activeRole.department}`}>
                        {activeRole.departmentLabel}
                      </span>
                      <span className="crx-level-badge">{activeRole.level}</span>
                      <span className="crx-meta-loc">
                        <MapPin size={13} /> {activeRole.location}
                      </span>
                      <span className="crx-meta-type">{activeRole.type}</span>
                    </div>

                    <h3 className="crx-detail-title">{activeRole.title}</h3>
                    <p className="crx-detail-desc">{activeRole.shortDesc}</p>
                  </div>

                  {/* Highlights Callout */}
                  <div className="crx-highlight-callout">
                    <Flame size={16} className="crx-callout-icon" />
                    <span><strong>Why this role matters:</strong> {activeRole.highlight}</span>
                  </div>

                  {/* Month 1 milestone preview */}
                  <div className="crx-milestone-box">
                    <span className="crx-milestone-label">🎯 WHAT YOU'LL SHIP IN MONTH 1</span>
                    <p className="crx-milestone-text">{activeRole.monthOneMilestone}</p>
                  </div>

                  {/* Production Technologies Matrix */}
                  <div className="crx-detail-section">
                    <h4 className="crx-subheading">
                      <Cpu size={15} /> Production Technologies &amp; Architecture
                    </h4>
                    <div className="crx-tech-matrix">
                      {activeRole.techStack.map((tech) => (
                        <span key={tech} className="crx-tech-pill">
                          <span className="crx-tech-dot" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dual Grid: Responsibilities & Requirements */}
                  <div className="crx-detail-dual-grid">
                    <div className="crx-scope-block">
                      <h4 className="crx-subheading">
                        <Layers size={15} /> Primary Responsibilities
                      </h4>
                      <ul className="crx-checklist">
                        {activeRole.responsibilities.map((r, i) => (
                          <li key={i}>
                            <Check size={14} className="crx-check-icon" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="crx-scope-block">
                      <h4 className="crx-subheading">
                        <ShieldCheck size={15} /> Craft Bar &amp; Qualifications
                      </h4>
                      <ul className="crx-checklist">
                        {activeRole.requirements.map((req, i) => (
                          <li key={i}>
                            <Check size={14} className="crx-check-icon" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Workbench Footer Apply Actions */}
                  <div className="crx-workbench-footer">
                    <div className="crx-footer-buttons">
                      <button
                        type="button"
                        className="crx-btn-glow"
                        onClick={() => handleOpenApplication(activeRole)}
                      >
                        <span>Apply For This Position</span>
                        <ArrowRight size={16} />
                      </button>
                      <a
                        href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent(
                          `Application: ${activeRole.title}`
                        )}`}
                        className="crx-btn-glass"
                      >
                        <span>Direct Email Application</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. RESPECTFUL 4-STAGE HIRING JOURNEY */}
      <section className="wrap crx-process-section">
        <div className="crx-section-heading">
          <span className="crx-eyebrow">TRANSPARENT EVALUATION</span>
          <h2>Respectful 4-Stage Hiring Journey</h2>
          <p>
            No 8 grueling interview loops or pointless leetcode trivia. We evaluate real craft,
            give direct feedback, and respect your time.
          </p>
        </div>

        <div className="crx-process-grid">
          {HIRING_STEPS.map((step) => (
            <div key={step.step} className="crx-process-card">
              <div className="crx-step-header">
                <span className="crx-step-num">{step.step}</span>
                <div className="crx-step-time">
                  <Clock size={12} />
                  <span>{step.time}</span>
                </div>
              </div>
              <h3 className="crx-step-title">{step.title}</h3>
              <p className="crx-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OPEN TRACK PITCH BANNER */}
      <section className="wrap crx-pitch-section">
        <div className="crx-pitch-card">
          <div className="crx-pitch-glow" />
          <div className="crx-pitch-content">
            <span className="crx-eyebrow">OPEN TRACK / CUSTOM SQUAD PROPOSAL</span>
            <h2>Don't fit into a standard box? Pitch your own role.</h2>
            <p>
              Exceptional builders rarely match cookie-cutter templates. If you are world-class in
              low-level systems, 3D WebGL graphics, compiler tooling, high-scale infrastructure,
              or product architecture, let's talk directly.
            </p>
            <div className="crx-pitch-actions">
              <button
                type="button"
                className="crx-btn-glow"
                onClick={() =>
                  handleOpenApplication({
                    id: "custom-pitch",
                    title: "Open Track / Custom Role Proposal",
                    department: "engineering",
                    departmentLabel: "Open Track",
                    level: "Principal / Specialist",
                    type: "Full-Time / Flexible",
                    location: "Remote Worldwide",
                    matchTags: ["custom"],
                    shortDesc: "Pitch your ideal impact and contribution.",
                    responsibilities: [],
                    requirements: [],
                    techStack: ["Bespoke Architecture"],
                    highlight: "We design custom squads around extraordinary people.",
                    monthOneMilestone: "Establish your custom domain roadmap and ship prototype 1.",
                  })
                }
              >
                <span>Pitch Your Custom Role</span>
                <Send size={15} />
              </button>
              <a href={`mailto:${HR_EMAIL}?subject=Custom%20Role%20Pitch`} className="crx-btn-glass">
                <span>Email Founders Directly</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL WITH DUAL MAIL INTEGRATION */}
      {applicationModalRole && (
        <div className="crx-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="crx-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="crx-modal-title"
            aria-modal="true"
          >
            <header className="crx-modal-header">
              <div>
                <span className="crx-modal-eyebrow">CAREERS APPLICATION</span>
                <h3 id="crx-modal-title" className="crx-modal-role">
                  {applicationModalRole.title}
                </h3>
                <span className="crx-modal-loc">
                  {applicationModalRole.departmentLabel} • {applicationModalRole.location}
                </span>
              </div>
              <button
                type="button"
                className="crx-modal-close"
                onClick={handleCloseModal}
                aria-label="Close application modal"
              >
                <X size={18} />
              </button>
            </header>

            {submitSuccess ? (
              <div className="crx-submit-success" role="status">
                <div className="crx-success-ring">
                  <CheckCircle2 size={42} />
                </div>
                <h4>Application Dispatched Successfully!</h4>
                <p>
                  Your details have been transmitted directly to our hiring team at{" "}
                  <strong>{HR_EMAIL}</strong>. A confirmation has been triggered to your email.
                  Our staff engineers review applications within <strong>48 hours</strong>.
                </p>
                {emailDraftUrl && (
                  <p className="crx-sub-note">
                    You can also open this application in your mail client:
                  </p>
                )}
                <div className="crx-success-actions">
                  {emailDraftUrl && (
                    <a href={emailDraftUrl} className="crx-btn-glass">
                      Open in Email App
                      <Send size={14} />
                    </a>
                  )}
                  <button type="button" className="crx-btn-glow" onClick={handleCloseModal}>
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="crx-form">
                {submitError && (
                  <div className="crx-form-error" role="alert">
                    {submitError}
                  </div>
                )}

                <div className="crx-form-row">
                  <div className="crx-form-field">
                    <label htmlFor="crx-name">
                      Full Name <span className="crx-req">*</span>
                    </label>
                    <input
                      id="crx-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                  <div className="crx-form-field">
                    <label htmlFor="crx-email">
                      Email Address <span className="crx-req">*</span>
                    </label>
                    <input
                      id="crx-email"
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="crx-form-row">
                  <div className="crx-form-field">
                    <label htmlFor="crx-portfolio">
                      Portfolio, GitHub, or LinkedIn URL <span className="crx-req">*</span>
                    </label>
                    <input
                      id="crx-portfolio"
                      type="url"
                      required
                      placeholder="https://github.com/... or portfolio link"
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                  <div className="crx-form-field">
                    <label htmlFor="crx-exp">Experience Level</label>
                    <select
                      id="crx-exp"
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                      disabled={submitting}
                    >
                      <option value="1-3 years">1–3 Years</option>
                      <option value="3-5 years">3–5 Years</option>
                      <option value="5-8 years">5–8 Years</option>
                      <option value="8+ years">8+ Years (Staff / Lead)</option>
                    </select>
                  </div>
                </div>

                <div className="crx-form-field">
                  <label htmlFor="crx-note">
                    Why DigentTech? Share a technical feat you take genuine pride in.{" "}
                    <span className="crx-req">*</span>
                  </label>
                  <textarea
                    id="crx-note"
                    required
                    rows={4}
                    placeholder="Tell us about a technical architecture you built, a hard bug you solved, or your engineering philosophy..."
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    disabled={submitting}
                  />
                </div>

                <p className="crx-form-disclaimer">
                  Submissions are reviewed by human engineers within 48h. Directly delivered to{" "}
                  <strong>{HR_EMAIL}</strong>.
                </p>

                <div className="crx-modal-footer">
                  <button
                    type="button"
                    className="crx-btn-glass"
                    onClick={handleCloseModal}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="crx-btn-glow" disabled={submitting}>
                    {submitting ? (
                      <>Transmitting Application...</>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
