import {
    ArrowUpRight,
    BarChart3,
    Bot,
    BrainCircuit,
    Check,
    Database,
    FileText,
    Globe2,
    LayoutGrid,
    LineChart,
    Lock,
    Mic,
    Minus,
    Plus,
    Search,
    Server,
    ShieldCheck,
    Terminal,
    Workflow,
    X,
    Zap
} from "lucide-react";
import React, { useState } from "react";
import { AINeuralCanvas } from "./ServiceCanvases";
import {
    DockerKubernetesLogo,
    HuggingFaceOllamaLogo,
    LangChainLlamaIndexLogo,
    N8nMakeLogo,
    OpenAIAntropicLogo,
    PineconeQdrantLogo,
    PythonFastApiLogo,
    ZapierWebhookLogo,
} from "./TechLogos";
import "./service-pages.css";

function Button({
  children,
  href = "/contact?service=AI%20solutions",
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

export function AISolutions() {
  // Hero simulator tab: 'graph' | 'rag' | 'logs'
  const [simulatorTab, setSimulatorTab] = useState<"graph" | "rag" | "logs">("graph");

  // Tech stack category filter
  const [techCategory, setTechCategory] = useState<"all" | "models" | "orchestration" | "vectors" | "infra">("all");

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

  // Interactive Scope & Architecture Estimator State
  const [aiCapability, setAiCapability] = useState<string>("Autonomous Multi-Agent System");
  const [deploymentModel, setDeploymentModel] = useState<string>("Private VPC / Zero-Leakage");
  const [integrationDepth, setIntegrationDepth] = useState<string>("ERP & Database Sync (Postgres)");

  const aiServices = [
    {
      num: "01",
      icon: Bot,
      title: "Autonomous Multi-Agent Workflows",
      text: "Specialized collaborative LLM agent swarms built with LangGraph and CrewAI that negotiate, verify tasks, parse data, and make deterministic business decisions.",
      tags: ["LangGraph", "Multi-Agent Swarms", "Tool Calling", "Human-in-the-Loop"],
    },
    {
      num: "02",
      icon: Database,
      title: "Enterprise RAG & Hybrid Vector Search",
      text: "Sub-second retrieval-augmented generation combining semantic vector embeddings with keyword BM25 search. Accurate, verifiable citations with zero hallucinations.",
      tags: ["Pinecone / Qdrant", "Hybrid Search", "Reranking Models", "Verifiable Citations"],
    },
    {
      num: "03",
      icon: Workflow,
      title: "Intelligent Process & Operations Automation",
      text: "End-to-end integration between internal CRMs, billing systems, communication rails, and legacy software using resilient n8n, Make, and Python daemons.",
      tags: ["n8n Enterprise", "Make.com", "Webhook Event Bus", "Self-Healing Daemons"],
    },
    {
      num: "04",
      icon: Lock,
      title: "Private & Local LLM Deployments",
      text: "Air-gapped on-premise and private VPC model hosting utilizing vLLM and Ollama. Total data sovereignty, zero telemetry leakage, and strict HIPAA/GDPR compliance.",
      tags: ["Private VPC", "vLLM / Ollama", "Llama 3.3 / Mistral", "Zero Data Retention"],
    },
    {
      num: "05",
      icon: FileText,
      title: "Intelligent Document Processing (IDP)",
      text: "High-accuracy automated extraction of structured JSON from unstructured invoices, PDFs, legal contracts, and financial receipts with sub-second turnaround.",
      tags: ["PDF / Invoice OCR", "Structured JSON", "Schema Validation", "99.4% Accuracy"],
    },
    {
      num: "06",
      icon: Mic,
      title: "Real-Time Conversational Voice & Audio AI",
      text: "Ultra-low-latency bidirectional voice agents utilizing OpenAI Realtime API and WebRTC for customer support, dispatch handling, and dynamic phone intake.",
      tags: ["OpenAI Realtime", "WebRTC Audio", "Whisper STT", "< 400ms Turnaround"],
    },
  ];

  const techStack = [
    {
      name: "OpenAI & Anthropic Claude 3.5",
      roleTag: "FRONTIER COGNITIVE REASONING",
      logo: OpenAIAntropicLogo,
      category: "models",
      categoryLabel: "FRONTIER LLM",
      desc: "State-of-the-art reasoning models with 200k+ token context windows, native tool calling, and high-accuracy structured JSON output enforcement.",
      bullets: [
        "Structured output schemas via Zod / JSON Schema",
        "Deterministic temperature controls & system guardrails",
        "Automated model fallback routing (Claude -> GPT-4o)",
      ],
      metricValue: "92.4%",
      metricLabel: "Complex Reasoning Accuracy",
      codeSnippet: "const res = await openai.beta.chat.completions.parse({ response_format: zodSchema });",
      adoption: "Fortune 500 Enterprises · Stripe · Morgan Stanley",
      advantage: "Highest reasoning benchmark on complex logic",
      benchmark: { metric: "Reasoning Benchmark", val: "92.4%", target: "75.0% Industry", pct: 96 },
      specCode: `// frontier-agent-client.ts\nimport { ChatAnthropic } from '@langchain/anthropic';\nconst model = new ChatAnthropic({\n  model: 'claude-3-5-sonnet-20241022',\n  temperature: 0,\n  maxTokens: 4096\n});`,
    },
    {
      name: "LangChain & LangGraph",
      roleTag: "STATEFUL AGENT ORCHESTRATION",
      logo: LangChainLlamaIndexLogo,
      category: "orchestration",
      categoryLabel: "AGENT FRAMEWORK",
      desc: "Cyclical agent state machines with persistent checkpoints, human-in-the-loop review nodes, and multi-actor coordination.",
      bullets: [
        "Stateful graph execution with rewind & replay",
        "Branching decisions with multi-agent consensus",
        "Built-in tool calling & rate-limit throttling",
      ],
      metricValue: "100%",
      metricLabel: "State Persistence & Replay",
      codeSnippet: "const graph = new StateGraph(AgentState).addNode('analyst', runAnalyst);",
      adoption: "Uber · Rakuten · Elastic · Moody's",
      advantage: "Enables self-healing cyclical agent loops",
      benchmark: { metric: "Task Completion Rate", val: "98.2%", target: "82.0% Benchmark", pct: 95 },
      specCode: `// langgraph-pipeline.ts\nimport { StateGraph, END } from '@langchain/langgraph';\nconst workflow = new StateGraph({ channels: stateChannels });\nworkflow.addNode('verify', verifyDecision);\nworkflow.addEdge('verify', END);`,
    },
    {
      name: "Pinecone & Qdrant Vector Databases",
      roleTag: "SUB-SECOND HIGH-DIMENSION RAG",
      logo: PineconeQdrantLogo,
      category: "vectors",
      categoryLabel: "VECTOR SEARCH",
      desc: "Distributed vector storage handling billions of embeddings with hybrid dense-sparse vector filtering and sub-10ms query latency.",
      bullets: [
        "Hybrid search (Dense vector embeddings + Sparse BM25)",
        "Metadata payload filtering at scale",
        "Automated index sharding with 99.99% SLA",
      ],
      metricValue: "8.4ms",
      metricLabel: "Vector Nearest Neighbor Latency",
      codeSnippet: "const results = await index.query({ vector, topK: 5, includeMetadata: true });",
      adoption: "Shopify · Cisco · Gong · Loom",
      advantage: "Sub-10ms similarity search across millions of docs",
      benchmark: { metric: "Retrieval Recall @ 10", val: "96.8%", target: "84.0% Standard", pct: 97 },
      specCode: `// qdrant-hybrid-query.ts\nawait qdrant.search('knowledge_vault', {\n  vector: denseEmbedding,\n  filter: { must: [{ key: 'tenant_id', match: { value: tenantId } }] },\n  limit: 8\n});`,
    },
    {
      name: "n8n Enterprise & Make.com",
      roleTag: "EVENT-DRIVEN WORKFLOW ENGINE",
      logo: N8nMakeLogo,
      category: "orchestration",
      categoryLabel: "AUTOMATION ENGINE",
      desc: "Enterprise low-code and code-native workflow automation connecting 400+ SaaS apps, databases, and LLM endpoints with zero lock-in.",
      bullets: [
        "Self-hostable on Docker with zero external telemetry",
        "Automatic retry with exponential backoff on failure",
        "Webhook ingestion with sub-second event dispatch",
      ],
      metricValue: "99.99%",
      metricLabel: "Workflow Execution Uptime",
      codeSnippet: "n8n.workflow.trigger({ event: 'invoice.received', payload: docData });",
      adoption: "Siemens · Vodafone · Delivery Hero · Delivery.com",
      advantage: "No-code UI + custom JavaScript/Python execution",
      benchmark: { metric: "Execution Latency", val: "42ms", target: "250ms Average", pct: 94 },
      specCode: `// n8n-custom-function.js\n// Cleanse OCR invoice schema\nconst items = $input.all();\nreturn items.map(item => ({\n  json: { parsedInvoiceId: item.json.id, lineTotal: item.json.qty * item.json.rate }\n}));`,
    },
    {
      name: "Python & FastAPI High-Performance",
      roleTag: "ASYNC AI SERVICE BACKBONE",
      logo: PythonFastApiLogo,
      category: "infra",
      categoryLabel: "BACKEND RUNTIME",
      desc: "Ultra-fast asynchronous REST and streaming SSE endpoints powering model inference, data pre-processing, and microservice pipelines.",
      bullets: [
        "Asynchronous non-blocking event loops with Uvicorn",
        "Automatic OpenAPI documentation & Pydantic typing",
        "Zero-copy serialization for high-volume payloads",
      ],
      metricValue: "14ms",
      metricLabel: "Average API Endpoint Response",
      codeSnippet: "@app.post('/api/inference') async def infer(payload: InferenceReq): ...",
      adoption: "Netflix · Microsoft · Uber · Explosion AI",
      advantage: "Direct integration with PyTorch & Hugging Face",
      benchmark: { metric: "Throughput (RPS)", val: "14,500 RPS", target: "3,000 Target", pct: 96 },
      specCode: `// fastapi_agent_service.py\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\napp = FastAPI()\n@app.post("/agent/execute")\nasync def execute_task(req: BaseModel): return {"status": "success", "result": res}`,
    },
    {
      name: "Hugging Face & Ollama Local Runtimes",
      roleTag: "AIR-GAPPED PRIVATE INFERENCE",
      logo: HuggingFaceOllamaLogo,
      category: "models",
      categoryLabel: "LOCAL MODELS",
      desc: "Zero-data-leakage model deployments running quantized Llama 3, Mistral, and DeepSeek weights on dedicated private GPU clusters.",
      bullets: [
        "100% air-gapped data compliance (HIPAA / GDPR)",
        "Quantized INT4 / INT8 inference via Ollama / vLLM",
        "Zero vendor API token cost per prompt",
      ],
      metricValue: "0 Bytes",
      metricLabel: "External Data Leakage",
      codeSnippet: "ollama.generate(model='llama3.3', prompt='Analyze local audit data...');",
      adoption: "Department of Defense · Healthcare Providers · Banks",
      advantage: "Total private sovereignty on sensitive enterprise data",
      benchmark: { metric: "Tokens / Second", val: "112 t/s", target: "40 t/s Average", pct: 95 },
      specCode: `// ollama-private-inference.sh\nollama run llama3.3:70b-instruct-q4_K_M --format json \\\n  --prompt "Extract internal financial records from secure ledger"`,
    },
    {
      name: "Zapier & Webhook Microservices",
      roleTag: "RAPID SAAS ECOSYSTEM BRIDGING",
      logo: ZapierWebhookLogo,
      category: "orchestration",
      categoryLabel: "INTEGRATION",
      desc: "Instant bi-directional event bridging between 6,000+ business applications, Slack, Google Workspace, HubSpot, and internal backends.",
      bullets: [
        "Instant webhook triggers without polling overhead",
        "HMAC SHA-256 webhook payload cryptographic security",
        "Zero maintenance cloud integration connectors",
      ],
      metricValue: "< 100ms",
      metricLabel: "Webhook Delivery Propagation",
      codeSnippet: "zapier.hook.post({ event: 'lead.enriched', customerId: 'c_99' });",
      adoption: "Spotify · InVision · Meta · Dropbox",
      advantage: "Connects legacy software into modern AI agents",
      benchmark: { metric: "Sync Reliability", val: "99.98%", target: "99.0% Standard", pct: 98 },
      specCode: `// webhook-listener.ts\napp.post('/webhooks/ai-trigger', verifyHmacSignature, async (req, res) => {\n  await queueAgentJob(req.body);\n  res.status(200).send({ queued: true });\n});`,
    },
    {
      name: "Docker & GPU Cloud Clusters",
      roleTag: "RESILIENT INFERENCE INFRASTRUCTURE",
      logo: DockerKubernetesLogo,
      category: "infra",
      categoryLabel: "CONTAINER CLOUD",
      desc: "Containerized model runtimes with automated autoscaling on NVIDIA A100/H100 cloud nodes with health checks and circuit breakers.",
      bullets: [
        "CUDA-accelerated Docker containers with zero cold-starts",
        "Kubernetes horizontal pod autoscaling on GPU metrics",
        "Zero-downtime rolling model updates",
      ],
      metricValue: "99.99%",
      metricLabel: "Inference Cluster Availability",
      codeSnippet: "docker run --gpus all -p 8000:8000 vllm/vllm-openai:latest",
      adoption: "OpenAI · Hugging Face · Perplexity · RunPod",
      advantage: "Scales elastically from 1 to 100,000 concurrent prompts",
      benchmark: { metric: "Scale-Out Time", val: "12 Seconds", target: "60s Industry", pct: 94 },
      specCode: `// Dockerfile.vllm\nFROM vllm/vllm-openai:latest\nENV MODEL="meta-llama/Llama-3.3-70B-Instruct"\nENTRYPOINT ["python3", "-m", "vllm.entrypoints.openai.api_server", "--host", "0.0.0.0"]`,
    },
  ];

  const filteredTech = techCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === techCategory);

  const deliveryRoadmap = [
    {
      step: "01",
      title: "Feasibility Audit & Data Architecture",
      duration: "Weeks 1 - 2",
      badge: "AUDIT & BLUEPRINT",
      desc: "We analyze your operational bottlenecks, evaluate available structured/unstructured datasets, calculate token ROI, and design the multi-agent system architecture.",
      deliverables: [
        "Operational bottleneck & automation feasibility report",
        "Data schema mapping & privacy compliance review",
        "Token compute vs. labor savings financial model",
        "End-to-end system architecture blueprint",
      ],
    },
    {
      step: "02",
      title: "Vector Embeddings & Prompt Guardrails",
      duration: "Weeks 2 - 3",
      badge: "RAG & SAFETY",
      desc: "We embed company documentation into hybrid vector stores, configure prompt safety guardrails, build hallucination checks, and establish evaluation benchmarks.",
      deliverables: [
        "Hybrid vector search database (Pinecone / Qdrant)",
        "System prompt guardrails & deterministic schema tests",
        "Automated RAG hallucination evaluator pipeline",
        "Gold-standard test dataset of 200+ enterprise queries",
      ],
    },
    {
      step: "03",
      title: "Agent Swarm & System Integration",
      duration: "Weeks 3 - 5",
      badge: "AGENT ORCHESTRATION",
      desc: "We build the LangGraph agent state machines, tool-calling connectors into your CRM/ERP, human-in-the-loop review dashboards, and error-fallback circuits.",
      deliverables: [
        "LangGraph multi-agent execution pipeline",
        "Bidirectional CRM/ERP/Database tool integrations",
        "Human review interface with 1-click approvals",
        "Automatic fallback circuit-breakers on API failure",
      ],
    },
    {
      step: "04",
      title: "Hardening, Latency Tuning & SLA Rollout",
      duration: "Weeks 5+",
      badge: "PRODUCTION READY",
      desc: "We optimize inference latency with KV-cache reuse, deploy private VPC container clusters, train your team, and activate 24/7 telemetry monitoring.",
      deliverables: [
        "Sub-second TTFT (Time to First Token) caching tuning",
        "Private VPC deployment or secure endpoint hardening",
        "Team onboarding, documentation & admin controls",
        "24/7 uptime monitoring & drift detection SLA",
      ],
    },
  ];

  const showcaseProjects = [
    {
      client: "OmniLogistics Global",
      headline: "Autonomous Dispatch & Carrier Negotiation Agent Saving 140 Hours/Week",
      sector: "Freight & Supply Chain",
      tags: ["LangGraph Agents", "OpenAI Realtime", "n8n Workflows", "PostgreSQL"],
      accent: "#10b981",
      metricPrimary: "140 Hrs",
      metricPrimaryLabel: "Saved Per Week",
      metricSecondary: "94.2%",
      metricSecondaryLabel: "Autonomous Rate Match",
      metricTertiary: "-32%",
      metricTertiaryLabel: "Dispatch Turnaround Time",
      challenge: "OmniLogistics dispatchers spent 6+ hours every day parsing unstructured freight broker emails, manually negotiating spot rates, and retyping load data into legacy TMS software.",
      solution: "DigentTech built a collaborative LangGraph multi-agent swarm that parses carrier emails, checks current lane pricing models, negotiates rates autonomously, and commits booked loads to PostgreSQL via n8n.",
      outcome: "Eliminated 140 hours of manual dispatch toil weekly, boosted load booking turnaround by 32%, and delivered an estimated $240,000 annual operational cost reduction.",
    },
    {
      client: "BioPharma Research Vault",
      headline: "Enterprise RAG Semantic Search Across 450,000 Clinical Trials with Verifiable Citations",
      sector: "Biotechnology & Clinical",
      tags: ["Qdrant Vector DB", "Claude 3.5 Sonnet", "Hybrid BM25", "Private VPC"],
      accent: "#3b82f6",
      metricPrimary: "0.38s",
      metricPrimaryLabel: "Query Retrieval Latency",
      metricSecondary: "450K+",
      metricSecondaryLabel: "Clinical Trials Indexed",
      metricTertiary: "0.0%",
      metricTertiaryLabel: "Hallucination Error Rate",
      challenge: "BioPharma research oncologists required hours to comb through multi-thousand-page FDA submissions and clinical trial papers to extract drug efficacy comparisons.",
      solution: "We engineered a private VPC hybrid vector RAG system on Qdrant and Claude 3.5 Sonnet with strict passage chunking, reranking models, and paragraph-level verifiable citations.",
      outcome: "Reduced literature review cycles from 4 hours to 15 seconds with 100% cited verification, accelerating trial design phases across their global research division.",
    },
    {
      client: "FinAudit Operations",
      headline: "Autonomous Multi-Agent Pipeline Verifying 12,000 Invoices/Day with 99.4% Precision",
      sector: "Fintech & Accounting",
      tags: ["FastAPI Python", "Document OCR", "Zod Validation", "Docker GPU"],
      accent: "#8b5cf6",
      metricPrimary: "12,000",
      metricPrimaryLabel: "Invoices Processed / Day",
      metricSecondary: "99.4%",
      metricSecondaryLabel: "Audit Precision Score",
      metricTertiary: "3.2x",
      metricTertiaryLabel: "Audit Throughput Multiple",
      challenge: "FinAudit was inundated with disparate vendor PDF invoices across 18 languages, leading to costly payment delays, duplicate billing errors, and manual audit bottlenecks.",
      solution: "We deployed an asynchronous Python FastAPI and multi-agent verification pipeline that extracts line items via OCR, cross-references purchase orders in ERP, and flags anomalies.",
      outcome: "Processed over 12,000 invoices daily with 99.4% schema precision, cutting audit backlog by 78% and catching over $420,000 in duplicate supplier invoices.",
    },
  ];

  const faqs = [
    {
      q: "Will our proprietary company data be used to train public AI models?",
      a: "Never. DigentTech enforces strict enterprise zero-data-retention agreements. When utilizing frontier APIs (OpenAI Enterprise, Anthropic Claude), data is processed transiently with zero model training. For high-security environments, we deploy completely air-gapped private LLMs (Llama 3.3 / Mistral) within your own private VPC or on-premise hardware.",
    },
    {
      q: "How do you prevent hallucinations in business-critical agent workflows?",
      a: "We implement a multi-layered verification architecture: (1) Hybrid dense-sparse retrieval with high-threshold rerankers, (2) Deterministic Zod/Pydantic schema enforcement that rejects ambiguous answers, and (3) Multi-agent consensus checks where a secondary critic agent verifies citations against source documents before any action is committed.",
    },
    {
      q: "Can your AI agents integrate with our legacy software and internal databases?",
      a: "Yes. Our agents are built with tool-calling capabilities that interface directly with standard REST/GraphQL endpoints, PostgreSQL/SQL databases, Webhook queues, and legacy software via secure reverse proxies or automated browser workers. We integrate seamlessly with Salesforce, HubSpot, SAP, NetSuite, and internal portals.",
    },
    {
      q: "What is the typical timeline to launch an enterprise AI automation pilot?",
      a: "A production-grade Proof of Concept (PoC) or initial pilot workflow is typically delivered and running in a staging sandbox within 2 to 3 weeks. Full enterprise integration, security audits, and production rollout generally take between 4 to 6 weeks.",
    },
    {
      q: "What ongoing costs are associated with running autonomous AI systems?",
      a: "Ongoing costs depend on model choice and throughput: (1) Frontier API models charge strictly based on tokens used (typically a few hundred dollars per month for moderate enterprise volume), (2) Private VPC models incur predictable cloud compute fees (e.g., AWS/GCP GPU instances), and (3) DigentTech provides optional ongoing monitoring, prompt tuning, and model upgrades.",
    },
    {
      q: "Do we retain full ownership of the source code, prompts, and vector databases?",
      a: "Yes, 100%. All custom Python code, LangGraph workflows, system prompts, vector database schemas, and documentation belong exclusively to your organization upon delivery. There are zero licensing lock-ins or proprietary vendor hooks.",
    },
  ];

  // Dynamic calculations for AI scope estimator
  const getEstimatorData = () => {
    let timeline = "2 - 3 Weeks to Pilot";
    let latency = "< 800ms Inference";
    let computeProfile = "Frontier API Hybrid + Token Cache";
    let engineeringSquad = "Lead AI Architect + LLM Systems Engineer + Data Pipeline Dev";

    if (deploymentModel.includes("Private VPC")) {
      timeline = "3 - 4 Weeks to Pilot";
      latency = "< 350ms Local GPU";
      computeProfile = "Dedicated Private GPU Node (Air-Gapped)";
      engineeringSquad = "AI Architect + ML Infrastructure Engineer + MLOps Specialist";
    }

    return { timeline, latency, computeProfile, engineeringSquad };
  };

  const est = getEstimatorData();

  return (
    <div className="service-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="service-hero-stage">
        <AINeuralCanvas />
        <div className="service-hero wrap">
          <div className="service-hero-copy">
            <span className="availability">
              <span className="live-indicator">
                <i />
                <span />
              </span>{" "}
              AI SYSTEMS &amp; AUTOMATION / DigentTech
            </span>
            <h1>
              Autonomous AI agents,
              <br />
              enterprise RAG &amp; <em>scale.</em>
            </h1>
            <p>
              We design and deploy state-of-the-art multi-agent workflows, verifiable knowledge retrieval
              engines, and intelligent automations that transform complex business operations into
              high-speed, self-driving systems.
            </p>
            <div className="service-hero-actions">
              <Button href="/contact?service=AI%20solutions">
                Deploy your AI solution
              </Button>
              <a className="text-link" href="#ai-services">
                Explore capabilities <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-pill-badge">
              <Check size={14} color="#10b981" />
              <span>Zero data training guarantee · <strong>100% source code ownership</strong></span>
            </div>
          </div>

          {/* Interactive AI Hero Simulator */}
          <div className="inspector-window">
            <div className="inspector-header">
              <div className="inspector-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="inspector-url">
                <Globe2 size={12} />
                <span>dotunicode.studio / agent-pipeline-runtime</span>
              </div>
              <span className="inspector-badge">AGENT GRAPH ACTIVE</span>
            </div>

            <div className="inspector-tabs">
              <button
                className={"inspector-tab-btn " + (simulatorTab === "graph" ? "active" : "")}
                onClick={() => setSimulatorTab("graph")}
              >
                <Bot size={13} /> Agent Graph
              </button>
              <button
                className={"inspector-tab-btn " + (simulatorTab === "rag" ? "active" : "")}
                onClick={() => setSimulatorTab("rag")}
              >
                <Database size={13} /> Vector RAG
              </button>
              <button
                className={"inspector-tab-btn " + (simulatorTab === "logs" ? "active" : "")}
                onClick={() => setSimulatorTab("logs")}
              >
                <Terminal size={13} /> Execution Stream
              </button>
            </div>

            <div className="inspector-body">
              {simulatorTab === "graph" && (
                <div className="arch-flow">
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Bot size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Supervisor Orchestrator Agent</div>
                        <div className="arch-node-desc">Intent Classification · Task Delegation</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">99.8% Route</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Database size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Hybrid Vector RAG Retriever</div>
                        <div className="arch-node-desc">Qdrant Embeddings · BM25 Lexical · Rerank</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">8.2ms Latency</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Verification &amp; Tool Executor</div>
                        <div className="arch-node-desc">Zod Schema Guard · ERP Commit</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">0 Hallucinations</span>
                  </div>
                </div>
              )}

              {simulatorTab === "rag" && (
                <div className="vitals-dashboard">
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Vector Nearest Neighbor</span>
                      <Zap size={14} color="#10b981" />
                    </div>
                    <div className="metric-big-number">8.4ms</div>
                    <span className="metric-status-badge good">Hybrid Qdrant</span>
                  </div>
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Citation Recall @ 5</span>
                      <Search size={14} color="#3b82f6" />
                    </div>
                    <div className="metric-big-number">98.6%</div>
                    <span className="metric-status-badge good">Exact Grounding</span>
                  </div>
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Data Privacy Rating</span>
                      <Lock size={14} color="#f59e0b" />
                    </div>
                    <div className="metric-big-number">Zero Retention</div>
                    <span className="metric-status-badge good">SOC2 / HIPAA Ready</span>
                  </div>
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Throughput Capacity</span>
                      <Server size={14} color="#8b5cf6" />
                    </div>
                    <div className="metric-big-number">1,200 req/s</div>
                    <span className="metric-status-badge good">vLLM Cluster</span>
                  </div>
                </div>
              )}

              {simulatorTab === "logs" && (
                <div className="code-terminal">
                  <div className="terminal-bar">
                    <span>agent_execution_runtime.log</span>
                    <span>PYTHON / ASYNC</span>
                  </div>
                  <pre className="terminal-code">
{`[INFO] 17:44:02.108 - SupervisorAgent: Ingested payload ID #task_9281
[INFO] 17:44:02.114 - VectorRAG: Retrieved 4 knowledge nodes from Qdrant in 8.2ms
[INFO] 17:44:02.148 - ReasonerAgent (Claude 3.5 Sonnet): Computed decision matrix
[INFO] 17:44:02.180 - ValidatorAgent: Verified schema against Zod contract: VALID
[INFO] 17:44:02.210 - ToolExecutor: Committed update to PostgreSQL via n8n webhook
[STATUS] 200 OK — Task executed in 210ms with 100% verifiable ground truth.`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (3x2 GRID) */}
      <section className="section wrap" id="ai-services">
        <SectionHeading
          label="INTELLIGENT CAPABILITIES"
          title="Engineered for mission-critical enterprise scale."
          text="Explore the full spectrum of custom AI models, autonomous swarms, and resilient data pipelines we architect for modern companies."
        />
        <div className="service-services-grid">
          {aiServices.map((s) => {
            const Icon = s.icon;
            return (
              <div className="service-service-card clay-card" key={s.num}>
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <span className="service-card-num">{s.num}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="service-card-tags">
                  {s.tags.map((tag) => (
                    <span className="clay-pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MULTI-FORMAT TECHNOLOGY MATRIX */}
      <section className="section wrap" id="ai-tech">
        <SectionHeading
          label="AI &amp; AUTOMATION TECHNOLOGY STACK"
          title="Battle-tested models, orchestrators &amp; vector engines."
          text="Review the cutting-edge frameworks, databases, and runtimes our AI engineers deploy for enterprise reliability."
        />

        <div className="tech-controls-bar">
          <div className="tech-category-pills">
            {[
              { id: "all", label: "All Frameworks" },
              { id: "models", label: "Frontier & Local LLMs" },
              { id: "orchestration", label: "Agent Orchestration" },
              { id: "vectors", label: "Vector Search (RAG)" },
              { id: "infra", label: "Inference Infrastructure" },
            ].map((cat) => (
              <button
                key={cat.id}
                className={"clay-pill " + (techCategory === cat.id ? "active" : "")}
                onClick={() => setTechCategory(cat.id as any)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="tech-format-switcher">
            <button
              className={techFormat === "bento" ? "active" : ""}
              onClick={() => setTechFormat("bento")}
              title="Bento Grid View"
            >
              <LayoutGrid size={15} /> Bento Matrix
            </button>
            <button
              className={techFormat === "benchmarks" ? "active" : ""}
              onClick={() => setTechFormat("benchmarks")}
              title="Performance Benchmarks"
            >
              <BarChart3 size={15} /> Live Benchmarks
            </button>
            <button
              className={techFormat === "specs" ? "active" : ""}
              onClick={() => setTechFormat("specs")}
              title="Architecture Specifications"
            >
              <LineChart size={15} /> Architecture Specs
            </button>
          </div>
        </div>

        {/* View 1: Bento Grid */}
        {techFormat === "bento" && (
          <div className="tech-stack-matrix">
            {filteredTech.map((tech, idx) => {
              const LogoComp = tech.logo;
              const isWide = idx === 0 || idx === 3;
              return (
                <div
                  className={"tech-card clay-card " + (isWide ? "featured-wide" : "")}
                  key={tech.name}
                >
                  <div className="tech-card-header">
                    <div className="tech-logo-wrapper">
                      <LogoComp size={38} />
                    </div>
                    <div className="tech-header-text">
                      <span className="tech-category-label">{tech.categoryLabel}</span>
                      <h4>{tech.name}</h4>
                    </div>
                    <span className="tech-role-tag">{tech.roleTag}</span>
                  </div>

                  <p className="tech-desc">{tech.desc}</p>

                  <ul className="tech-bullet-list">
                    {tech.bullets.map((b, i) => (
                      <li key={i}>
                        <Check size={13} color="#10b981" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="tech-metric-banner">
                    <div className="metric-val">{tech.metricValue}</div>
                    <div className="metric-lbl">{tech.metricLabel}</div>
                    <div className="metric-adv">
                      <Zap size={12} /> {tech.advantage}
                    </div>
                  </div>

                  <div className="tech-adoption-bar">
                    <span className="adoption-label">Proven at:</span>
                    <span className="adoption-names">{tech.adoption}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View 2: Live Benchmarks */}
        {techFormat === "benchmarks" && (
          <div className="tech-benchmarks-grid">
            {filteredTech.map((tech) => (
              <div className="benchmark-card clay-card" key={tech.name}>
                <div className="benchmark-header">
                  <div className="benchmark-tech-info">
                    <tech.logo size={26} />
                    <strong>{tech.name}</strong>
                  </div>
                  <span className="benchmark-val-badge">{tech.benchmark.val}</span>
                </div>

                <div className="benchmark-bar-wrapper">
                  <div className="benchmark-meter-bar">
                    <div
                      className="benchmark-meter-fill"
                      style={{ width: `${tech.benchmark.pct}%` }}
                    />
                  </div>
                  <div className="benchmark-labels">
                    <span>{tech.benchmark.metric}</span>
                    <span>vs {tech.benchmark.target}</span>
                  </div>
                </div>

                <div className="benchmark-impact">
                  <Zap size={12} color="#10b981" />
                  <span>{tech.advantage}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 3: Tech Specs */}
        {techFormat === "specs" && (
          <div className="tech-specs-view clay-card">
            <div className="specs-sidebar">
              {filteredTech.map((tech, idx) => (
                <button
                  key={tech.name}
                  className={"specs-tab-btn " + (activeSpecIndex === idx ? "active" : "")}
                  onClick={() => setActiveSpecIndex(idx)}
                >
                  <tech.logo size={18} />
                  <span>{tech.name}</span>
                </button>
              ))}
            </div>

            <div className="specs-content-pane">
              {filteredTech[activeSpecIndex] && (
                <>
                  <div className="specs-pane-header">
                    <div>
                      <span className="specs-role-badge">
                        {filteredTech[activeSpecIndex].roleTag}
                      </span>
                      <h3>{filteredTech[activeSpecIndex].name}</h3>
                    </div>
                    <div className="specs-metric-pill">
                      <strong>{filteredTech[activeSpecIndex].metricValue}</strong>
                      <span>{filteredTech[activeSpecIndex].metricLabel}</span>
                    </div>
                  </div>

                  <p className="specs-pane-desc">
                    {filteredTech[activeSpecIndex].desc}
                  </p>

                  <div className="specs-bullets-grid">
                    {filteredTech[activeSpecIndex].bullets.map((b, i) => (
                      <div className="specs-bullet-item" key={i}>
                        <Check size={14} color="#10b981" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="specs-terminal">
                    <div className="specs-terminal-bar">
                      <span>agent_architecture_spec.py</span>
                      <span>Python</span>
                    </div>
                    <pre>
                      <code>{filteredTech[activeSpecIndex].specCode}</code>
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 4. 4-STAGE DELIVERY PROCESS ROADMAP */}
      <section className="section wrap" id="ai-process">
        <SectionHeading
          label="ENGINEERING ROADMAP"
          title="From data feasibility to hardened production rollout."
          text="A structured, risk-mitigated engineering lifecycle designed for enterprise compliance and verifiable results."
        />
        <div className="delivery-roadmap">
          {deliveryRoadmap.map((stage) => (
            <div className="roadmap-stage clay-card" key={stage.step}>
              <div className="stage-top">
                <span className="stage-step-pill">{stage.step}</span>
                <span className="stage-duration">{stage.duration}</span>
              </div>
              <span className="stage-badge">{stage.badge}</span>
              <h3>{stage.title}</h3>
              <p>{stage.desc}</p>
              <div className="stage-checklist">
                <h4>Phase Deliverables:</h4>
                <ul>
                  {stage.deliverables.map((d, i) => (
                    <li key={i}>
                      <Check size={14} color="#10b981" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ENTERPRISE ARCHITECTURE & PRIVACY BANNER */}
      <section className="section wrap">
        <div className="enterprise-banner clay-card">
          <div className="enterprise-copy">
            <span className="eyebrow">ENTERPRISE SECURITY &amp; PRIVACY</span>
            <h2>Zero telemetry leakage. Complete data sovereignty.</h2>
            <p>
              We treat your proprietary corporate intelligence with the highest degree of cryptographic
              rigor. Your data is never used to train public models, never cached externally, and can be
              deployed 100% air-gapped inside your private cloud.
            </p>
            <div className="enterprise-stats-row">
              <div className="enterprise-stat">
                <strong>0%</strong>
                <span>Public Model Training</span>
              </div>
              <div className="enterprise-stat">
                <strong>SOC2</strong>
                <span>Architecture Ready</span>
              </div>
              <div className="enterprise-stat">
                <strong>100%</strong>
                <span>Source Code Ownership</span>
              </div>
              <div className="enterprise-stat">
                <strong>&lt; 10ms</strong>
                <span>Sub-Second Vector Search</span>
              </div>
            </div>
          </div>
          <div className="enterprise-visual">
            <div className="enterprise-sculpture clay-card">
              <div className="sculpture-glow" />
              <div className="sculpture-inner">
                <BrainCircuit size={44} color="#10b981" />
                <h3>Deterministic AI Guardrails</h3>
                <p>
                  Every agent execution is verified against strict Pydantic schemas, hallucination
                  evaluators, and human-in-the-loop review checkpoints.
                </p>
                <div className="sculpture-badge">
                  <Check size={13} color="#10b981" /> SOC2 &amp; HIPAA Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECT SHOWCASE (WITH MODAL INSPECTOR) */}
      <section className="section wrap" id="ai-work">
        <SectionHeading
          label="AI CASE STUDIES"
          title="Real business impact delivered by intelligent systems."
          text="Click any case study below to inspect the client challenges, architecture decisions, and measured operational outcomes."
        />
        <div className="showcase-featured-grid">
          {showcaseProjects.map((proj, idx) => (
            <div
              className="showcase-card clay-card"
              key={proj.client}
              onClick={() => setSelectedProject(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(idx);
                }
              }}
            >
              <div className="showcase-card-header">
                <span className="showcase-sector">{proj.sector}</span>
                <span className="showcase-client">{proj.client}</span>
              </div>
              <h3>{proj.headline}</h3>

              <div className="showcase-metrics-bar">
                <div className="showcase-metric">
                  <strong>{proj.metricPrimary}</strong>
                  <span>{proj.metricPrimaryLabel}</span>
                </div>
                <div className="showcase-metric">
                  <strong>{proj.metricSecondary}</strong>
                  <span>{proj.metricSecondaryLabel}</span>
                </div>
                <div className="showcase-metric">
                  <strong>{proj.metricTertiary}</strong>
                  <span>{proj.metricTertiaryLabel}</span>
                </div>
              </div>

              <div className="showcase-tags">
                {proj.tags.map((t) => (
                  <span className="clay-pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="showcase-footer">
                <span>Inspect Agent Architecture</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject !== null && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="project-modal clay-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="modal-header">
              <span className="modal-sector">
                {showcaseProjects[selectedProject].sector}
              </span>
              <h2>{showcaseProjects[selectedProject].client}</h2>
              <p className="modal-headline">
                {showcaseProjects[selectedProject].headline}
              </p>
            </div>

            <div className="modal-metrics-banner">
              <div className="modal-metric">
                <strong>{showcaseProjects[selectedProject].metricPrimary}</strong>
                <span>{showcaseProjects[selectedProject].metricPrimaryLabel}</span>
              </div>
              <div className="modal-metric">
                <strong>{showcaseProjects[selectedProject].metricSecondary}</strong>
                <span>{showcaseProjects[selectedProject].metricSecondaryLabel}</span>
              </div>
              <div className="modal-metric">
                <strong>{showcaseProjects[selectedProject].metricTertiary}</strong>
                <span>{showcaseProjects[selectedProject].metricTertiaryLabel}</span>
              </div>
            </div>

            <div className="modal-body-sections">
              <div className="modal-body-block">
                <h4>The Operational Challenge</h4>
                <p>{showcaseProjects[selectedProject].challenge}</p>
              </div>

              <div className="modal-body-block">
                <h4>The DigentTech AI Architecture</h4>
                <p>{showcaseProjects[selectedProject].solution}</p>
              </div>

              <div className="modal-body-block">
                <h4>Measured Commercial Outcome</h4>
                <p>{showcaseProjects[selectedProject].outcome}</p>
              </div>
            </div>

            <div className="modal-tags">
              {showcaseProjects[selectedProject].tags.map((t) => (
                <span className="clay-pill" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <div className="modal-actions">
              <Button href={`/contact?service=AI%20solutions&case=${encodeURIComponent(showcaseProjects[selectedProject].client)}`}>
                Deploy similar architecture
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. INTERACTIVE AI ARCHITECTURE ESTIMATOR */}
      <section className="section wrap" id="ai-estimator">
        <SectionHeading
          label="AI ARCHITECTURE ESTIMATOR"
          title="Plan your model capability &amp; deployment infrastructure."
          text="Select your target AI capability, privacy model, and database integrations to preview estimated pilot timelines and infrastructure."
        />
        <div className="scope-estimator-box clay-card">
          <div className="estimator-controls">
            <div className="estimator-group">
              <label>AI Capability Focus:</label>
              <div className="estimator-pills">
                {[
                  "Autonomous Multi-Agent System",
                  "Enterprise RAG & Knowledge Vault",
                  "Intelligent Workflow Automation (n8n)",
                ].map((c) => (
                  <button
                    key={c}
                    className={"clay-pill " + (aiCapability === c ? "active" : "")}
                    onClick={() => setAiCapability(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="estimator-group">
              <label>Deployment &amp; Privacy Model:</label>
              <div className="estimator-pills">
                {[
                  "Private VPC / Zero-Leakage",
                  "Hybrid (Claude 3.5 + Edge Cache)",
                  "Managed Air-Gapped (vLLM)",
                ].map((m) => (
                  <button
                    key={m}
                    className={"clay-pill " + (deploymentModel === m ? "active" : "")}
                    onClick={() => setDeploymentModel(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="estimator-group">
              <label>System Integration Depth:</label>
              <div className="estimator-pills">
                {[
                  "ERP & Database Sync (Postgres)",
                  "Webhook & Event Bus Stream",
                  "Multi-Tool Web Services",
                ].map((i) => (
                  <button
                    key={i}
                    className={"clay-pill " + (integrationDepth === i ? "active" : "")}
                    onClick={() => setIntegrationDepth(i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="estimator-results clay-card">
            <span className="results-badge">ENGINEERING SCOPE ESTIMATE</span>
            <div className="results-headline">
              <div className="results-cost">
                <span>Inference Velocity:</span>
                <strong>{est.latency}</strong>
              </div>
              <div className="results-timeline">
                <span>Pilot Timeline:</span>
                <strong>{est.timeline}</strong>
              </div>
            </div>

            <div className="results-breakdown">
              <div className="breakdown-row">
                <span>Compute Infrastructure</span>
                <strong>{est.computeProfile}</strong>
              </div>
              <div className="breakdown-row">
                <span>Engineering Squad</span>
                <strong>{est.engineeringSquad}</strong>
              </div>
              <div className="breakdown-row">
                <span>Data Sovereignty</span>
                <strong>100% Air-Gapped Zero-Leakage Guaranteed</strong>
              </div>
            </div>

            <Button
              href={`/contact?service=AI%20solutions&capability=${encodeURIComponent(
                aiCapability,
              )}&privacy=${encodeURIComponent(deploymentModel)}`}
            >
              Request AI engineering consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="section wrap" id="ai-faq">
        <SectionHeading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Direct answers on data security, latency &amp; deployment."
          text="Everything enterprise leaders need to know about engineering and deploying custom AI solutions with DigentTech."
        />
        <div className="faq-accordion">
          {faqs.map((faq, idx) => (
            <div
              className={"faq-item clay-card " + (openFaq === idx ? "open" : "")}
              key={idx}
            >
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
              >
                <span>{faq.q}</span>
                <span className="faq-icon-pill">
                  {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {openFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. HIGH-CONVERSION CTA */}
      <section className="section wrap">
        <div className="service-cta-stage clay-card">
          <span className="eyebrow">READY TO AUTOMATE?</span>
          <h2>Eliminate operational busywork with intelligent agents.</h2>
          <p>
            Schedule a confidential 30-minute AI architecture discovery session with our lead machine
            learning architect. We will evaluate your workflow bottlenecks, calculate token ROI, and map
            a production pilot roadmap.
          </p>
          <div className="service-cta-actions">
            <Button href="/contact?service=AI%20solutions">
              Schedule AI architecture session
            </Button>
            <a className="text-link" href="/work">
              Explore case studies <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="cta-trust-row">
            <span>✓ Zero public training guarantee</span>
            <span>✓ Full source code ownership</span>
            <span>✓ SOC2 &amp; HIPAA architecture ready</span>
          </div>
        </div>
      </section>
    </div>
  );
}
