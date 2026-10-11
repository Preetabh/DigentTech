import {
    ArrowUpRight,
    BarChart3,
    Check,
    Flame,
    Globe2,
    LayoutGrid,
    LineChart,
    Lock,
    Mail,
    Minus,
    Percent,
    Plus,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    Workflow,
    X,
    Zap
} from "lucide-react";
import React, { useState } from "react";
import { MarketingRadarCanvas } from "./ServiceCanvases";
import {
    GoogleAdsLogo,
    HotjarPosthogLogo,
    HubspotSalesforceLogo,
    KlaviyoLogo,
    MetaAdsLogo,
    SegmentMixpanelLogo,
    SemrushAhrefsLogo,
    ShopifyStripeLogo,
} from "./TechLogos";
import "./service-pages.css";

function Button({
  children,
  href = "/contact?service=Digital%20marketing",
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

export function DigitalMarketing() {
  // Hero simulator tab: 'channels' | 'attribution' | 'economics'
  const [simulatorTab, setSimulatorTab] = useState<"channels" | "attribution" | "economics">("channels");

  // Tech stack filter state
  const [techCategory, setTechCategory] = useState<"all" | "adtech" | "retention" | "analytics" | "commerce">("all");

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

  // Interactive Scope & RoAS Estimator State
  const [growthGoal, setGrowthGoal] = useState<string>("Omnichannel Scale (Meta + Google)");
  const [spendScale, setSpendScale] = useState<string>("$20k - $60k / mo");
  const [trackingDepth, setTrackingDepth] = useState<string>("Server-Side CAPI + GA4");

  const marketingServices = [
    {
      num: "01",
      icon: Target,
      title: "Paid Media & Algorithmic Advertising",
      text: "High-yield campaigns across Meta, Google Search, YouTube, and TikTok. Continuous creative iteration, algorithmic bid tuning, and disciplined CAC containment.",
      tags: ["Meta Ads / CAPI", "Google Search & PMax", "YouTube Pre-Roll", "TikTok Spark Ads"],
    },
    {
      num: "02",
      icon: Search,
      title: "Technical SEO & Search Dominance",
      text: "Architectural crawlability, high-intent topic clustering, programmatic landing pages, and Core Web Vitals optimization built for durable organic pipeline.",
      tags: ["Programmatic SEO", "Semantic Schema", "Topic Authority", "SERP #1 Strategy"],
    },
    {
      num: "03",
      icon: Mail,
      title: "Lifecycle, Email & SMS Retention",
      text: "Behavior-triggered email flows, customer segmentation, VIP win-back automations, and zero-churn SMS sequences that transform first-time buyers into repeat brand champions.",
      tags: ["Klaviyo Flows", "Attentive SMS", "Predictive Churn", "Cohort LTV"],
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Conversion Rate Optimization (CRO)",
      text: "Scientific multi-variant testing, checkout friction audits, heatmapping, and bespoke landing page variants designed to maximize revenue per session.",
      tags: ["A/B Split Testing", "Heatmap Audits", "Frictionless Checkout", "Lift Verification"],
    },
    {
      num: "05",
      icon: BarChart3,
      title: "Server-Side Tracking & Multi-Touch Attribution",
      text: "iOS 14.5+ resilient attribution infrastructure. First-party server GTM containers, Meta Conversions API, Segment CDP, and unified executive RoAS dashboards.",
      tags: ["Server-Side GTM", "Meta CAPI", "Segment CDP", "Blended RoAS Matrix"],
    },
    {
      num: "06",
      icon: Sparkles,
      title: "High-Velocity Creative & Ad Production",
      text: "Performance-engineered ad creatives, UGC storyboarding, dynamic product ads, and modular visual assets designed to stop the scroll and lower blended CPAs.",
      tags: ["Hook Rate Optimization", "Motion Graphics", "UGC Direct Response", "Dynamic Creatives"],
    },
  ];

  const techStack = [
    {
      name: "Google Ads & Performance Max",
      roleTag: "HIGH-INTENT CAPTURE",
      logo: GoogleAdsLogo,
      category: "adtech",
      categoryLabel: "PAID MEDIA",
      desc: "Intent-based search bidding, YouTube display networks, and machine-learning Performance Max campaigns targeting buyers at the bottom of the funnel.",
      bullets: [
        "Offline conversion sync & enhanced conversions",
        "Target ROAS (tROAS) bidding optimization",
        "Search query negative pruning & intent clusters",
      ],
      metricValue: "4.8x",
      metricLabel: "Blended Search ROAS",
      codeSnippet: "gtag('event', 'purchase', { transaction_id: 'tx_99', value: 240 });",
      adoption: "Google · Fortune 500 Brands · Global SaaS",
      advantage: "Highest purchase intent conversion velocity",
      benchmark: { metric: "Impression Share", val: "88.4%", target: "65.0% Industry", pct: 94 },
      specCode: `// google-enhanced-conversion.ts\nwindow.gtag('event', 'conversion', {\n  send_to: 'AW-104928172/purchase',\n  value: order.amount,\n  currency: 'USD',\n  transaction_id: order.id\n});`,
    },
    {
      name: "Meta Ads & Conversions API (CAPI)",
      roleTag: "ALGORITHMIC AUDIENCE SCALE",
      logo: MetaAdsLogo,
      category: "adtech",
      categoryLabel: "PAID SOCIAL",
      desc: "Server-to-server tracking bypassing browser ad-blockers, algorithmic lookalikes, broad targeting, and high-velocity creative testing frameworks.",
      bullets: [
        "Direct Server-to-Server Conversions API (CAPI)",
        "Deduplication rate > 99.2% on purchase events",
        "Dynamic Product Ads (DPA) catalog retargeting",
      ],
      metricValue: "9.2/10",
      metricLabel: "Meta Event Match Quality",
      codeSnippet: "capi.sendEvent({ event_name: 'Purchase', user_data: clientData });",
      adoption: "D2C Unicorns · Global Retailers · Mobile Apps",
      advantage: "Zero-signal loss with server-side CAPI events",
      benchmark: { metric: "Event Match Quality", val: "9.4 / 10", target: "7.0 Standard", pct: 95 },
      specCode: `// meta-capi-pipeline.ts\nimport { EventRequest, UserData, ServerEvent } from 'facebook-nodejs-business-sdk';\nconst event = new ServerEvent().setEventName('Purchase').setEventTime(Math.floor(Date.now() / 1000));`,
    },
    {
      name: "Semrush & Ahrefs Enterprise",
      roleTag: "SEARCH INTELLIGENCE",
      logo: SemrushAhrefsLogo,
      category: "analytics",
      categoryLabel: "SEO & RESEARCH",
      desc: "Deep keyword gap analysis, SERP volatility alerts, competitor backlink profiling, and algorithmic opportunity scoring for programmatic SEO.",
      bullets: [
        "Keyword difficulty vs. conversion intent scoring",
        "Content decay alerts & automatic refresh queues",
        "Competitor backlink velocity & toxic link filtering",
      ],
      metricValue: "+380%",
      metricLabel: "Organic Traffic Growth",
      codeSnippet: "seoAudit.crawl({ depth: 5, renderJs: true, verifySchema: true });",
      adoption: "HubSpot · Shopify · Canva · Booking.com",
      advantage: "Discovers uncompetitive high-intent keywords",
      benchmark: { metric: "Top-3 Ranking Ratio", val: "42.8%", target: "18.0% Benchmark", pct: 96 },
      specCode: `// ahrefs-api-query.ts\nconst response = await fetch('https://api.ahrefs.com/v3/site-explorer/metrics', {\n  headers: { Authorization: \`Bearer \${AHREFS_KEY}\` }\n});`,
    },
    {
      name: "Klaviyo & Automated Retention",
      roleTag: "REVENUE LIFECYCLE ENGINE",
      logo: KlaviyoLogo,
      category: "retention",
      categoryLabel: "LIFECYCLE",
      desc: "High-converting lifecycle marketing flows, RFM segmentation, predictive next-order modeling, and automated SMS & email revenue triggers.",
      bullets: [
        "Welcome series, abandoned checkout & post-purchase",
        "Predictive churn probability alerts",
        "Automated VIP tier segmentation & win-backs",
      ],
      metricValue: "34%",
      metricLabel: "Email % of Total Store Revenue",
      codeSnippet: "klaviyo.identify({ $email: user.email, vip_tier: 'Diamond' });",
      adoption: "Brooklinen · Glossier · Chubbies · Gymshark",
      advantage: "Builds owned revenue immune to ad price inflation",
      benchmark: { metric: "Flow Open Rate", val: "58.6%", target: "32.0% Average", pct: 97 },
      specCode: `// klaviyo-identify.js\nwindow._learnq = window._learnq || [];\nwindow._learnq.push(['identify', {\n  '$email': customer.email,\n  'lifetime_value': customer.ltv\n}]);`,
    },
    {
      name: "HubSpot & Salesforce CRM",
      roleTag: "ENTERPRISE PIPELINE ATTRIBUTION",
      logo: HubspotSalesforceLogo,
      category: "retention",
      categoryLabel: "CRM & SALES",
      desc: "Seamless synchronization between paid clicks, marketing qualified leads (MQLs), and closed-won enterprise revenue deals.",
      bullets: [
        "Automated lead scoring based on content engagement",
        "Multi-touch W-shaped CRM attribution modeling",
        "Sales rep alerts on high-intent account visits",
      ],
      metricValue: "99.8%",
      metricLabel: "Lead Sync Accuracy",
      codeSnippet: "hubspot.contacts.createOrUpdate({ email, lifecycleStage: 'lead' });",
      adoption: "Atlassian · Zoom · DoorDash · Snowflake",
      advantage: "Directly bridges ad spend to closed-won cash",
      benchmark: { metric: "Lead-to-Opp Velocity", val: "4.2 Days", target: "14.0 Days Avg", pct: 93 },
      specCode: `// hubspot-pipeline.ts\nawait hubspotClient.crm.deals.basicApi.create({\n  properties: { dealname: 'Enterprise License', pipeline: 'sales_pipeline' }\n});`,
    },
    {
      name: "Segment CDP & Mixpanel Analytics",
      roleTag: "FIRST-PARTY DATA INFRASTRUCTURE",
      logo: SegmentMixpanelLogo,
      category: "analytics",
      categoryLabel: "DATA PLATFORM",
      desc: "Universal event tracking pipeline dispatching clean telemetry to ad networks, data warehouses, and cohort analysis engines in real time.",
      bullets: [
        "Single API schema dispatched to all downstream tools",
        "Granular user journey funnels and drop-off analysis",
        "GDPR & CCPA compliant privacy consents",
      ],
      metricValue: "< 4ms",
      metricLabel: "CDP Event Pipeline Latency",
      codeSnippet: "analytics.track('Completed Order', { value: 320, plan: 'Annual' });",
      adoption: "Stripe · IBM · DigitalOcean · Intuit",
      advantage: "Single source of truth for full customer journey",
      benchmark: { metric: "Data Consistency", val: "99.98%", target: "98.0% Standard", pct: 98 },
      specCode: `// segment-cdp.ts\nanalytics.track('Plan Subscribed', {\n  planId: 'scale_enterprise',\n  revenue: 1200,\n  billingPeriod: 'annual'\n});`,
    },
    {
      name: "Shopify Plus & Stripe Commerce",
      roleTag: "HIGH-CONVERTING COMMERCE RAILS",
      logo: ShopifyStripeLogo,
      category: "commerce",
      categoryLabel: "STOREFRONT",
      desc: "Sub-second checkout speeds, localized multi-currency payments, 1-click Apple Pay, and frictionless dynamic post-purchase upsells.",
      bullets: [
        "Shop Pay 1-click checkout with +50% lift",
        "Zero-friction address autocomplete & Apple Pay",
        "Custom checkout extensions for dynamic order bumps",
      ],
      metricValue: "4.2%",
      metricLabel: "Average Checkout Conversion Rate",
      codeSnippet: "stripe.checkout.sessions.create({ line_items, mode: 'payment' });",
      adoption: "Allbirds · Gymshark · Heinz · Staples",
      advantage: "Maximizes conversion velocity at the final click",
      benchmark: { metric: "Checkout Completion", val: "68.4%", target: "48.0% Global Avg", pct: 96 },
      specCode: `// shopify-upsell.graphql\nmutation CheckoutUpsell($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {\n  checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) { checkout { id webUrl } }\n}`,
    },
    {
      name: "Hotjar & PostHog Behavioral Suite",
      roleTag: "QUALITATIVE SESSION INTELLIGENCE",
      logo: HotjarPosthogLogo,
      category: "analytics",
      categoryLabel: "CRO TESTING",
      desc: "Session recordings, interactive click heatmaps, rage-click detection, and feature flags that pinpoint exactly where prospects stall.",
      bullets: [
        "Rage-click & dead-click automated warning alerts",
        "Real-user scroll depth & field-by-field form abandonment",
        "Targeted exit-intent micro surveys",
      ],
      metricValue: "100%",
      metricLabel: "Session Behavioral Clarity",
      codeSnippet: "posthog.capture('user_rage_clicked', { element: '#checkout-cta' });",
      adoption: "Y Combinator Startups · Airtable · Decathlon",
      advantage: "Reveals exact usability flaws before users bounce",
      benchmark: { metric: "Friction Discovery", val: "12 Issues/Mo", target: "3 Issues/Mo", pct: 95 },
      specCode: `// posthog-event.ts\nposthog.init('phc_token', { api_host: 'https://app.posthog.com' });\nposthog.onFeatureFlags(() => { /* run variant A/B */ });`,
    },
  ];

  const filteredTech = techCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === techCategory);

  const deliveryRoadmap = [
    {
      step: "01",
      title: "Data Audit & Server Attribution",
      duration: "Weeks 1 - 2",
      badge: "INFRASTRUCTURE",
      desc: "We diagnose your tracking foundation, install Server-Side Google Tag Manager and Meta CAPI, audit analytics discrepancies, and establish a single source of truth.",
      deliverables: [
        "Full tracking audit & pixel cleanup",
        "Server-Side GTM & Meta CAPI deployment",
        "Baseline unit economics (CAC, AOV, LTV) model",
        "Competitor ad creative & search footprint teardown",
      ],
    },
    {
      step: "02",
      title: "Creative Matrix & Messaging Architecture",
      duration: "Weeks 2 - 3",
      badge: "CREATIVE & HOOKS",
      desc: "We build a modular ad creative matrix with high-converting hooks, direct-response copy angles, UGC storyboards, and custom high-intent landing page variants.",
      deliverables: [
        "15+ modular ad creative variations (video + static)",
        "Direct-response headline & hook library",
        "Bespoke landing page wireframes & CRO audit",
        "Klaviyo welcome & abandoned checkout flow refresh",
      ],
    },
    {
      step: "03",
      title: "Precision Launch & Algorithmic Scaling",
      duration: "Weeks 3 - 4",
      badge: "GO-TO-MARKET",
      desc: "We launch structured search, social, and retargeting campaigns with tight negative keyword lists, automated bid caps, and real-time ROAS guardrails.",
      deliverables: [
        "Google Search, PMax & YouTube campaign launch",
        "Meta dynamic creative testing (DCT) sandbox",
        "Bid management & budget allocation pacing",
        "Live 24/7 client performance dashboard access",
      ],
    },
    {
      step: "04",
      title: "Sprint Scaling & Retention Maximization",
      duration: "Ongoing Weekly Sprints",
      badge: "COMPOUNDING LTV",
      desc: "Weekly sprints iterating on winning creatives, scaling budget on top performers, optimizing checkout conversion rate, and expanding customer lifetime value.",
      deliverables: [
        "Weekly creative sprint refresh (new angles & hooks)",
        "Continuous A/B landing page conversion tests",
        "Retention cohort analysis & repeat purchase boosts",
        "Executive weekly performance review & strategy calls",
      ],
    },
  ];

  const showcaseProjects = [
    {
      client: "LuxeVault Apparel",
      headline: "Scaling D2C Fashion from $40k/mo to $380k/mo at 4.2x Blended ROAS",
      sector: "D2C E-Commerce",
      tags: ["Meta CAPI", "Google PMax", "Klaviyo VIP Flows", "Shopify Plus"],
      accent: "#4285F4",
      metricPrimary: "4.2x",
      metricPrimaryLabel: "Blended Store ROAS",
      metricSecondary: "$380K",
      metricSecondaryLabel: "Monthly Revenue",
      metricTertiary: "+310%",
      metricTertiaryLabel: "Repeat Customer Rate",
      challenge: "LuxeVault was suffering from severe post-iOS tracking degradation, skyrocketing Meta CPMs, and single-order churn that was eating into gross profit margins.",
      solution: "DigentTech engineered server-side Meta CAPI tracking to eliminate signal loss, restructured Meta into dynamic creative testing sandboxes, and built automated 7-stage Klaviyo lifecycle flows.",
      outcome: "Scaled monthly revenue from $40k to $380k within 5 months while sustaining a 4.2x blended ROAS and expanding repeat purchase revenue to 34% of total turnover.",
    },
    {
      client: "HealthSync B2B Platform",
      headline: "Lowering Customer Acquisition Cost by 64% with Programmatic SEO & Search",
      sector: "Healthcare SaaS",
      tags: ["Programmatic SEO", "Google Search Ads", "HubSpot CRM", "Segment CDP"],
      accent: "#10b981",
      metricPrimary: "-64%",
      metricPrimaryLabel: "CPA Reduction",
      metricSecondary: "1,420+",
      metricSecondaryLabel: "MQLs Per Quarter",
      metricTertiary: "#1 Rank",
      metricTertiaryLabel: "48 High-Intent Keywords",
      challenge: "HealthSync relied entirely on expensive LinkedIn and broad search ads, leading to unsustainable $480+ customer acquisition costs and slow sales cycles.",
      solution: "We architected 280+ programmatic SEO landing pages targeting high-intent compliance queries, restructured Google Ads around exact-match intent, and synced closed-won CRM data to bid algorithms.",
      outcome: "Generated over 1,420 qualified healthcare enterprise leads per quarter while slashing blended CPA by 64% and claiming #1 SERP positions across 48 core categories.",
    },
    {
      client: "NovaFintech App",
      headline: "Acquiring 180,000 Verified App Users with 38% Day-30 Retention",
      sector: "Fintech Mobile App",
      tags: ["TikTok Spark Ads", "Apple Search Ads", "Attentive SMS", "Mixpanel"],
      accent: "#8b5cf6",
      metricPrimary: "180K",
      metricPrimaryLabel: "Verified App Installs",
      metricSecondary: "$1.85",
      metricSecondaryLabel: "Cost Per Install (CPI)",
      metricTertiary: "38%",
      metricTertiaryLabel: "Day-30 User Retention",
      challenge: "NovaFintech struggled to break through saturated personal finance ad clutter, paying $7+ per install with catastrophic 8% 30-day retention.",
      solution: "We launched hyper-engaging UGC story ads on TikTok and Apple Search Ads with instant deep-linking, coupled with automated behavioral SMS onboarding sequences.",
      outcome: "Delivered 180,000 installs at an ultra-efficient $1.85 CPI, while boosting Day-30 active app retention to a category-leading 38%.",
    },
  ];

  const faqs = [
    {
      q: "How does DigentTech solve post-iOS 14 tracking and attribution challenges?",
      a: "We deploy Server-Side Google Tag Manager (sGTM) on isolated edge cloud infrastructure coupled directly with Meta Conversions API (CAPI), Google Enhanced Conversions, and Segment CDP. This bypasses ad-blockers, eliminates Safari ITP cookie expiration, and feeds 100% accurate first-party purchase data back to ad algorithms for optimal machine learning.",
    },
    {
      q: "What ad spend budget is recommended to get started with DigentTech?",
      a: "For dedicated paid acquisition sprints, we typically work with brands deploying between $5,000 and $250,000+ per month in ad spend. This ensures sufficient statistical significance to run rigorous dynamic creative testing (DCT) and algorithmic bid optimization without running out of data.",
    },
    {
      q: "Do we retain full ownership of our ad accounts, pixels, and creative assets?",
      a: "Yes, 100%. At DigentTech, all campaigns are created and run inside your own company-owned Google Ads, Meta Business Manager, TikTok, and Klaviyo accounts. You own all historical data, audience lists, pixels, and every creative asset we design. We never hold your accounts hostage.",
    },
    {
      q: "How quickly do we see measurable improvements in ROAS and CAC?",
      a: "Tracking fixes and quick-win campaign restructures generally yield immediate efficiency gains within the first 14 days. Substantial scaling with compounding creative wins typically accelerates between weeks 3 and 6 as machine-learning bidding models absorb first-party conversion data.",
    },
    {
      q: "How often will we communicate and receive performance reporting?",
      a: "You receive access to a live 24/7 executive analytics dashboard that updates in real time with blended ROAS, CPA, and spend pacing. In addition, you have a dedicated Slack channel with your growth squad, weekly sprint retrospectives, and monthly executive roadmap strategy calls.",
    },
    {
      q: "Do you produce all the ad creatives, copy, and landing pages in-house?",
      a: "Yes. DigentTech is a full-stack growth studio. Our in-house creative directors, direct-response copywriters, motion designers, and front-end developers produce complete hooks, ad assets, and high-converting landing page variants with zero outsourcing.",
    },
  ];

  // Dynamic calculations for the scope estimator
  const getEstimatorData = () => {
    let projectedRoas = "3.8x - 5.5x";
    let sprintVelocity = "Weekly Creative & Bid Sprints";
    let teamComposition = "Lead Growth Architect + Performance Copywriter + Data Engineer";
    let timeline = "Initial Lift in 14 Days";

    if (spendScale.includes("$20k")) {
      projectedRoas = "4.2x - 6.2x";
      teamComposition = "Growth Lead + Paid Media Specialist + Motion Designer + CRO Engineer";
    } else if (spendScale.includes("$60k") || spendScale.includes("$100k")) {
      projectedRoas = "4.8x - 7.5x";
      teamComposition = "VP of Growth + 2 Paid Specialists + 2 Creative Designers + Full-Stack CRO Dev";
      sprintVelocity = "Bi-Weekly High-Velocity Sprints + 24/7 Telemetry";
    }

    return { projectedRoas, sprintVelocity, teamComposition, timeline };
  };

  const est = getEstimatorData();

  return (
    <div className="service-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="service-hero-stage">
        <MarketingRadarCanvas />
        <div className="service-hero wrap">
          <div className="service-hero-copy">
            <span className="availability">
              <span className="live-indicator">
                <i />
                <span />
              </span>{" "}
              GROWTH &amp; PERFORMANCE MARKETING / DigentTech
            </span>
            <h1>
              Growth engines powered by
              <br />
              data, creative &amp; <em>ROAS.</em>
            </h1>
            <p>
              We engineer high-yield paid acquisition, technical search dominance, high-retention
              lifecycle marketing, and server-side attribution that turn marketing budgets into
              predictable revenue machines.
            </p>
            <div className="service-hero-actions">
              <Button href="/contact?service=Digital%20marketing">
                Scale your acquisition
              </Button>
              <a className="text-link" href="#marketing-services">
                Explore capabilities <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-pill-badge">
              <Check size={14} color="#10b981" />
              <span>100% account ownership · <strong>Zero vanity metrics promise</strong></span>
            </div>
          </div>

          {/* Interactive Marketing Hero Simulator */}
          <div className="inspector-window">
            <div className="inspector-header">
              <div className="inspector-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="inspector-url">
                <Globe2 size={12} />
                <span>dotunicode.studio / growth-telemetry</span>
              </div>
              <span className="inspector-badge">LIVE 4.8X ROAS</span>
            </div>

            <div className="inspector-tabs">
              <button
                className={"inspector-tab-btn " + (simulatorTab === "channels" ? "active" : "")}
                onClick={() => setSimulatorTab("channels")}
              >
                <Target size={13} /> Active Channels
              </button>
              <button
                className={"inspector-tab-btn " + (simulatorTab === "attribution" ? "active" : "")}
                onClick={() => setSimulatorTab("attribution")}
              >
                <Workflow size={13} /> Attribution Flow
              </button>
              <button
                className={"inspector-tab-btn " + (simulatorTab === "economics" ? "active" : "")}
                onClick={() => setSimulatorTab("economics")}
              >
                <Percent size={13} /> Unit Economics
              </button>
            </div>

            <div className="inspector-body">
              {simulatorTab === "channels" && (
                <div className="arch-flow">
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Search size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Google Search &amp; PMax</div>
                        <div className="arch-node-desc">High-Intent Keywords · Enhanced Conversions</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">5.4x ROAS</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Flame size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Meta Ads &amp; Server CAPI</div>
                        <div className="arch-node-desc">Dynamic Creative Testing · Lookalikes</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">4.6x ROAS</span>
                  </div>
                  <div className="arch-node">
                    <div className="arch-node-left">
                      <div className="arch-node-icon">
                        <Mail size={16} />
                      </div>
                      <div>
                        <div className="arch-node-title">Klaviyo Retention Flows</div>
                        <div className="arch-node-desc">VIP Segmentation · Cart Abandonment</div>
                      </div>
                    </div>
                    <span className="arch-node-stat">38% Rev</span>
                  </div>
                </div>
              )}

              {simulatorTab === "attribution" && (
                <div className="vitals-dashboard">
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Server Match Quality</span>
                      <ShieldCheck size={14} color="#10b981" />
                    </div>
                    <div className="metric-big-number">9.4 / 10</div>
                    <span className="metric-status-badge good">CAPI Live</span>
                  </div>
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Signal Loss Prevention</span>
                      <Lock size={14} color="#3b82f6" />
                    </div>
                    <div className="metric-big-number">99.2%</div>
                    <span className="metric-status-badge good">Edge First-Party</span>
                  </div>
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Average CAC Payback</span>
                      <TrendingUp size={14} color="#f59e0b" />
                    </div>
                    <div className="metric-big-number">18 Days</div>
                    <span className="metric-status-badge good">Industry Top 5%</span>
                  </div>
                  <div className="vitals-metric-card">
                    <div className="metric-header">
                      <span>Landing Page Conversion</span>
                      <Zap size={14} color="#8b5cf6" />
                    </div>
                    <div className="metric-big-number">4.8%</div>
                    <span className="metric-status-badge good">High Velocity</span>
                  </div>
                </div>
              )}

              {simulatorTab === "economics" && (
                <div className="code-terminal">
                  <div className="terminal-bar">
                    <span>telemetry_stream.json</span>
                    <span>JSON / LIVE</span>
                  </div>
                  <pre className="terminal-code">
{`{
  "client_account": "dotunicode_scale_portfolio",
  "monthly_ad_spend": "$48,500.00",
  "gross_revenue_attributed": "$232,800.00",
  "blended_roas": 4.80,
  "customer_acquisition_cost": "$28.40",
  "average_order_value": "$136.50",
  "first_order_margin": "+24.2%",
  "day_90_ltv_multiple": "2.4x",
  "attribution_status": "SERVER_VERIFIED_100%"
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (3x2 GRID) */}
      <section className="section wrap" id="marketing-services">
        <SectionHeading
          label="GROWTH ARCHITECTURE"
          title="Engineered for measurable commercial scale."
          text="Every channel, dollar, and creative asset is tracked, tested, and optimized toward compounding enterprise revenue."
        />
        <div className="service-services-grid">
          {marketingServices.map((s) => {
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
      <section className="section wrap" id="marketing-tech">
        <SectionHeading
          label="PERFORMANCE TECHNOLOGY STACK"
          title="World-class adtech, attribution &amp; retention tools."
          text="Explore the industry-standard software and protocols our growth architects deploy for sustained advantage."
        />

        <div className="tech-controls-bar">
          <div className="tech-category-pills">
            {[
              { id: "all", label: "All Technology" },
              { id: "adtech", label: "Paid Media" },
              { id: "retention", label: "Lifecycle & Retention" },
              { id: "analytics", label: "Attribution & Data" },
              { id: "commerce", label: "Commerce Rails" },
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
              <LineChart size={15} /> Tech Specs
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
                      <span>attribution_integration_spec.ts</span>
                      <span>TypeScript</span>
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
      <section className="section wrap" id="marketing-process">
        <SectionHeading
          label="GROWTH ROADMAP"
          title="From tracking audit to profitable sprint scaling."
          text="A disciplined, repeatable scientific process that turns ad spend into predictable revenue growth."
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
                <h4>Core Sprint Deliverables:</h4>
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

      {/* 5. ENTERPRISE SCULPTURE & GROWTH GUARANTEE BANNER */}
      <section className="section wrap">
        <div className="enterprise-banner clay-card">
          <div className="enterprise-copy">
            <span className="eyebrow">THE DigentTech ADVANTAGE</span>
            <h2>Zero vanity metrics. Absolute commercial transparency.</h2>
            <p>
              We don’t report on "impressions" or "brand reach." We report on blended ROAS, cash in
              the bank, and customer lifetime value. Every campaign is executed inside your own
              accounts with 100% full IP and data ownership.
            </p>
            <div className="enterprise-stats-row">
              <div className="enterprise-stat">
                <strong>100%</strong>
                <span>Account &amp; IP Ownership</span>
              </div>
              <div className="enterprise-stat">
                <strong>4.6x</strong>
                <span>Average Client ROAS</span>
              </div>
              <div className="enterprise-stat">
                <strong>$0</strong>
                <span>Hidden Markups</span>
              </div>
              <div className="enterprise-stat">
                <strong>24/7</strong>
                <span>Live Dashboard Access</span>
              </div>
            </div>
          </div>
          <div className="enterprise-visual">
            <div className="enterprise-sculpture clay-card">
              <div className="sculpture-glow" />
              <div className="sculpture-inner">
                <TrendingUp size={44} color="#3b82f6" />
                <h3>Guaranteed Growth Sprint SLA</h3>
                <p>
                  Weekly creative refreshes, rigorous A/B testing protocols, and dedicated Slack
                  communications directly with your lead growth architect.
                </p>
                <div className="sculpture-badge">
                  <Check size={13} color="#10b981" /> Verified Server CAPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECT SHOWCASE (WITH MODAL INSPECTOR) */}
      <section className="section wrap" id="marketing-work">
        <SectionHeading
          label="GROWTH CASE STUDIES"
          title="Proven commercial impact across modern brands."
          text="Click any case study below to inspect the client challenges, strategic architecture, and measured business outcomes."
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
                <span>Inspect Strategy &amp; Architecture</span>
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
                <h4>The Commercial Challenge</h4>
                <p>{showcaseProjects[selectedProject].challenge}</p>
              </div>

              <div className="modal-body-block">
                <h4>The DigentTech Growth Solution</h4>
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
              <Button href={`/contact?service=Digital%20marketing&case=${encodeURIComponent(showcaseProjects[selectedProject].client)}`}>
                Scale like {showcaseProjects[selectedProject].client}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. INTERACTIVE SCOPE & ROAS ESTIMATOR */}
      <section className="section wrap" id="marketing-estimator">
        <SectionHeading
          label="GROWTH SPRINT ESTIMATOR"
          title="Configure your target channels &amp; acquisition scale."
          text="Select your channels and target budget to preview projected sprint velocity, dedicated squad, and blended return targets."
        />
        <div className="scope-estimator-box clay-card">
          <div className="estimator-controls">
            <div className="estimator-group">
              <label>Target Channel Mix:</label>
              <div className="estimator-pills">
                {[
                  "Omnichannel Scale (Meta + Google)",
                  "Paid Search & Performance Max",
                  "Lifecycle & Retention (Klaviyo)",
                ].map((c) => (
                  <button
                    key={c}
                    className={"clay-pill " + (growthGoal === c ? "active" : "")}
                    onClick={() => setGrowthGoal(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="estimator-group">
              <label>Monthly Media Spend Scale:</label>
              <div className="estimator-pills">
                {[
                  "$5k - $20k / mo",
                  "$20k - $60k / mo",
                  "$60k - $150k+ / mo",
                ].map((s) => (
                  <button
                    key={s}
                    className={"clay-pill " + (spendScale === s ? "active" : "")}
                    onClick={() => setSpendScale(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="estimator-group">
              <label>Attribution &amp; Tracking Depth:</label>
              <div className="estimator-pills">
                {[
                  "Server-Side CAPI + GA4",
                  "Segment CDP Data Warehouse",
                  "Full Multi-Touch Attribution",
                ].map((t) => (
                  <button
                    key={t}
                    className={"clay-pill " + (trackingDepth === t ? "active" : "")}
                    onClick={() => setTrackingDepth(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="estimator-results clay-card">
            <span className="results-badge">PROJECTED GROWTH ARCHITECTURE</span>
            <div className="results-headline">
              <div className="results-cost">
                <span>Target Return:</span>
                <strong>{est.projectedRoas}</strong>
              </div>
              <div className="results-timeline">
                <span>First Lift Velocity:</span>
                <strong>{est.timeline}</strong>
              </div>
            </div>

            <div className="results-breakdown">
              <div className="breakdown-row">
                <span>Execution Cadence</span>
                <strong>{est.sprintVelocity
                  }</strong>
              </div>
              <div className="breakdown-row">
                <span>Dedicated Squad</span>
                <strong>{est.teamComposition}</strong>
              </div>
              <div className="breakdown-row">
                <span>Tracking Guarantee</span>
                <strong>First-Party Edge CAPI Sync Included</strong>
              </div>
            </div>

            <Button
              href={`/contact?service=Digital%20marketing&channels=${encodeURIComponent(
                growthGoal,
              )}&spend=${encodeURIComponent(spendScale)}`}
            >
              Book growth strategy consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="section wrap" id="marketing-faq">
        <SectionHeading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Direct answers on pricing, attribution &amp; deliverables."
          text="Everything you need to know about partnering with DigentTech on digital marketing and performance growth."
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
          <span className="eyebrow">READY TO GROW?</span>
          <h2>Make your advertising spend accountable.</h2>
          <p>
            Schedule a confidential 30-minute growth architecture audit with our lead growth
            strategist. We will analyze your tracking setup, creative footprint, and unit economics.
          </p>
          <div className="service-cta-actions">
            <Button href="/contact?service=Digital%20marketing">
              Claim your growth consultation
            </Button>
            <a className="text-link" href="/work">
              Review case studies <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="cta-trust-row">
            <span>✓ 100% account ownership</span>
            <span>✓ Zero agency markups</span>
            <span>✓ Guaranteed first-party attribution</span>
          </div>
        </div>
      </section>
    </div>
  );
}
