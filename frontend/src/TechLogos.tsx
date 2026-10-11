import React from "react";

// Official Tech Brand SVG Logos with vibrant colors and rich details
export function ReactNativeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="10" ry="10" fill="#00d8ff" />
      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00d8ff" strokeWidth="4.5" fill="none" />
      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00d8ff" strokeWidth="4.5" fill="none" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00d8ff" strokeWidth="4.5" fill="none" transform="rotate(120 50 50)" />
    </svg>
  );
}

export function FlutterLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M58 8 L18 48 L32 62 L86 8 Z" fill="#02569B" />
      <path d="M58 54 L36 76 L50 90 L86 54 Z" fill="#0175C2" />
      <path d="M36 76 L50 62 L64 76 L50 90 Z" fill="#29B6F6" />
    </svg>
  );
}

export function SwiftKotlinLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="swiftGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FA7343" />
          <stop offset="100%" stop-color="#F05138" />
        </linearGradient>
        <linearGradient id="kotlinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7F52FF" />
          <stop offset="100%" stop-color="#C711E1" />
        </linearGradient>
      </defs>
      {/* Swift Bird */}
      <path d="M12 20 C24 38 42 42 54 44 C42 46 32 56 28 66 C42 54 58 54 70 58 C62 68 50 78 32 84 C62 82 82 56 86 32 C82 42 74 48 64 48 C72 38 78 26 76 14 C64 26 48 30 36 28 C26 24 18 16 12 20 Z" fill="url(#swiftGrad)" />
      {/* Kotlin Diamond Accent */}
      <polygon points="68,64 92,64 80,88" fill="url(#kotlinGrad)" />
    </svg>
  );
}

export function SqliteWatermelonLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="44" fill="#0f172a" stroke="#22c55e" strokeWidth="4" />
      {/* Watermelon Arc */}
      <path d="M20 50 A 30 30 0 0 0 80 50 Z" fill="#ef4444" stroke="#4ade80" strokeWidth="3" />
      {/* Seeds */}
      <circle cx="40" cy="58" r="2.5" fill="#000" />
      <circle cx="50" cy="64" r="2.5" fill="#000" />
      <circle cx="60" cy="58" r="2.5" fill="#000" />
      {/* SQLite Feather Plume */}
      <path d="M30 38 Q 50 18 70 32 Q 52 42 30 38 Z" fill="#38bdf8" />
    </svg>
  );
}

export function TanstackZustandLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* TanStack Solar Flame & Ring */}
      <circle cx="50" cy="50" r="42" stroke="#f59e0b" strokeWidth="4" strokeDasharray="12 6" fill="none" />
      <circle cx="50" cy="50" r="26" fill="#1e293b" />
      {/* Bear Silhouette Ears (Zustand) */}
      <circle cx="36" cy="36" r="10" fill="#f59e0b" />
      <circle cx="64" cy="36" r="10" fill="#f59e0b" />
      <circle cx="50" cy="52" r="20" fill="#f59e0b" />
      <circle cx="44" cy="48" r="3" fill="#000" />
      <circle cx="56" cy="48" r="3" fill="#000" />
      <ellipse cx="50" cy="56" rx="5" ry="3" fill="#000" />
    </svg>
  );
}

export function SupabaseFirebaseLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Supabase Emerald Lightning */}
      <path d="M28 12 L56 50 L38 52 L58 88 L26 44 L44 42 Z" fill="#22c55e" />
      {/* Firebase Flame */}
      <path d="M54 28 C56 40 68 50 68 64 C68 76 58 86 46 86 C58 84 62 72 58 64 C56 58 50 54 50 44 C50 38 52 32 54 28 Z" fill="#f59e0b" opacity="0.9" />
      <path d="M62 48 C66 54 72 62 72 70 C72 82 62 88 52 88 C64 86 68 76 66 68 C64 62 60 56 62 48 Z" fill="#ef4444" opacity="0.8" />
    </svg>
  );
}

export function FastlaneGithubLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Fastlane Rocket Ship */}
      <path d="M50 12 C60 28 66 44 66 62 L50 56 L34 62 C34 44 40 28 50 12 Z" fill="#ef4444" />
      <circle cx="50" cy="36" r="6" fill="#fff" />
      <path d="M34 62 L22 74 L32 74 L36 68 Z" fill="#dc2626" />
      <path d="M66 62 L78 74 L68 74 L64 68 Z" fill="#dc2626" />
      {/* Jet Flame */}
      <polygon points="46,58 54,58 50,78" fill="#f59e0b" />
      {/* GitHub Octocat Silhouette */}
      <circle cx="50" cy="84" r="8" fill="#38bdf8" />
    </svg>
  );
}

export function SentryCrashlyticsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Sentry Red Target Aperture */}
      <circle cx="50" cy="50" r="40" stroke="#f43f5e" strokeWidth="6" fill="none" />
      <path d="M50 20 L50 40 M50 60 L50 80 M20 50 L40 50 M60 50 L80 50" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="50" r="10" fill="#f43f5e" />
    </svg>
  );
}

// Web Development Tech Logos
export function NextjsReactLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="44" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
      {/* Next.js 'N' */}
      <path d="M36 28 L36 72 M36 34 L66 72 M64 28 L64 54" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      {/* React Cyan Orbital Dot */}
      <circle cx="72" cy="34" r="5" fill="#00d8ff" filter="drop-shadow(0 0 6px #00d8ff)" />
    </svg>
  );
}

export function TypescriptLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="10" y="10" width="80" height="80" rx="18" fill="#3178C6" />
      <path d="M28 38 L54 38 M41 38 L41 74" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
      <path d="M60 66 C64 70 70 72 76 68 C80 64 78 56 68 54 C58 52 56 46 60 40 C64 34 74 34 78 38" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function TailwindLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M25 45 C30 35 40 32 48 38 C56 44 62 48 72 44 C82 40 85 30 85 30 C85 30 80 40 72 44 C64 48 58 44 48 38 C38 32 30 36 25 45 Z" fill="#38bdf8" />
      <path d="M12 65 C17 55 27 52 35 58 C43 64 49 68 59 64 C69 60 72 50 72 50 C72 50 67 60 59 64 C51 68 45 64 35 58 C25 52 17 56 12 65 Z" fill="#0ea5e9" />
    </svg>
  );
}

export function NodeGoLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Node.js Hexagon */}
      <polygon points="50,14 82,32 82,68 50,86 18,68 18,32" fill="#1e293b" stroke="#22c55e" strokeWidth="4" />
      <path d="M34 50 L50 40 L66 50 L50 60 Z" fill="#22c55e" />
      {/* Golang Cyan Wave */}
      <circle cx="50" cy="50" r="14" fill="#00add8" />
    </svg>
  );
}

export function PostgresRedisLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* PostgreSQL Blue Shield */}
      <circle cx="50" cy="50" r="42" fill="#336791" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
      {/* Elephant Trunk curve */}
      <path d="M35 35 Q 65 30 65 55 Q 65 75 48 70 Q 52 50 35 50 Z" fill="#ffffff" opacity="0.9" />
      {/* Redis Ruby Cube */}
      <polygon points="70,65 85,55 85,75 70,85 55,75 55,55" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

export function CloudflareAwsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Cloudflare Cloud Flame */}
      <path d="M28 64 C22 64 16 58 16 52 C16 46 20 40 26 40 C28 32 36 26 46 26 C56 26 64 32 66 40 C74 40 80 46 80 54 C80 62 74 64 68 64 Z" fill="#f97316" />
      {/* AWS Smile Arrow */}
      <path d="M32 74 Q 50 84 68 74" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
      <polygon points="68,74 64,70 70,70" fill="#f59e0b" />
    </svg>
  );
}

export function GraphqlRestLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* GraphQL Hexa-Rhombus */}
      <polygon points="50,14 84,33 84,71 50,90 16,71 16,33" stroke="#e10098" strokeWidth="4" fill="none" />
      <polygon points="50,26 74,40 74,68 50,82 26,68 26,40" stroke="#e10098" strokeWidth="2" fill="none" />
      <circle cx="50" cy="14" r="5" fill="#e10098" />
      <circle cx="84" cy="33" r="5" fill="#e10098" />
      <circle cx="84" cy="71" r="5" fill="#e10098" />
      <circle cx="50" cy="90" r="5" fill="#e10098" />
      <circle cx="16" cy="71" r="5" fill="#e10098" />
      <circle cx="16" cy="33" r="5" fill="#e10098" />
    </svg>
  );
}

export function VitestPlaywrightLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Vitest Lightning */}
      <polygon points="46,14 24,52 46,52 38,86 76,42 54,42" fill="#84cc16" />
      {/* Playwright Mask Outline */}
      <circle cx="70" cy="66" r="16" stroke="#22c55e" strokeWidth="4" fill="#0f172a" />
      <circle cx="65" cy="64" r="3" fill="#22c55e" />
      <circle cx="75" cy="64" r="3" fill="#22c55e" />
    </svg>
  );
}

// ============================================================================
// Digital Marketing Tech Logos
// ============================================================================

export function GoogleAdsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Google Ads geometric pill & diagonal badges */}
      <rect x="22" y="32" width="22" height="48" rx="11" fill="#4285F4" transform="rotate(-36 33 56)" />
      <rect x="42" y="16" width="22" height="66" rx="11" fill="#FBBC04" transform="rotate(36 53 49)" />
      <circle cx="76" cy="68" r="12" fill="#34A853" />
    </svg>
  );
}

export function MetaAdsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="metaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0064e0" />
          <stop offset="50%" stopColor="#0082fb" />
          <stop offset="100%" stopColor="#00c6ff" />
        </linearGradient>
      </defs>
      {/* Meta Infinity Loop */}
      <path
        d="M28 66 C18 66 12 56 12 46 C12 36 20 28 32 28 C42 28 48 38 52 46 C56 38 62 28 72 28 C84 28 92 36 92 46 C92 56 86 66 76 66 C66 66 58 54 52 46 C46 54 38 66 28 66 Z"
        stroke="url(#metaGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SemrushAhrefsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Semrush Orange Fire Ring */}
      <circle cx="42" cy="48" r="32" stroke="#FF642D" strokeWidth="8" strokeDasharray="160 40" fill="none" />
      <circle cx="42" cy="48" r="14" fill="#FF642D" />
      {/* Ahrefs Blue Arrow Accent */}
      <polygon points="68,22 88,38 74,48" fill="#1D63FF" />
      <path d="M54 56 L82 78" stroke="#1D63FF" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function KlaviyoLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="klaviyoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>
      {/* Klaviyo Geometric Flag / Stream */}
      <rect x="14" y="14" width="72" height="72" rx="18" fill="url(#klaviyoGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <polygon points="34,30 34,70 52,58 70,70 70,30" fill="#2CE58A" />
      <circle cx="52" cy="42" r="5" fill="#000" />
    </svg>
  );
}

export function HubspotSalesforceLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* HubSpot Orange Sprocket */}
      <circle cx="58" cy="50" r="18" fill="none" stroke="#FF7A59" strokeWidth="6" />
      <circle cx="58" cy="24" r="7" fill="#FF7A59" />
      <line x1="58" y1="31" x2="58" y2="44" stroke="#FF7A59" strokeWidth="5" />
      <circle cx="78" cy="62" r="7" fill="#FF7A59" />
      <line x1="68" y1="56" x2="78" y2="62" stroke="#FF7A59" strokeWidth="5" />
      {/* Salesforce Cloud Accent */}
      <path d="M18 64 C14 64 12 60 14 56 C16 52 20 50 24 51 C25 45 30 40 37 42 C41 38 48 40 50 44 C53 44 56 47 56 50 C58 50 60 54 58 58 C56 64 48 64 48 64 Z" fill="#00A1E0" opacity="0.85" />
    </svg>
  );
}

export function SegmentMixpanelLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Segment Green Hex-nodes */}
      <circle cx="34" cy="36" r="10" fill="#52BD95" />
      <circle cx="34" cy="66" r="10" fill="#52BD95" />
      <circle cx="60" cy="36" r="10" fill="#52BD95" />
      <line x1="34" y1="36" x2="34" y2="66" stroke="#52BD95" strokeWidth="4" />
      <line x1="34" y1="36" x2="60" y2="36" stroke="#52BD95" strokeWidth="4" />
      {/* Mixpanel Purple 'M' Accent */}
      <path d="M56 68 L64 48 L72 62 L80 48 L88 68" stroke="#7856FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function ShopifyStripeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Shopify Shopping Bag */}
      <path d="M32 30 L40 18 L60 18 L68 30 Z" fill="#95BF47" />
      <path d="M26 32 L36 84 L72 84 L80 32 Z" fill="#7AB55C" />
      <path d="M42 32 C42 24 46 20 52 20 C58 20 62 24 62 32" stroke="#5E8E3E" strokeWidth="4" fill="none" />
      {/* Stripe Purple Gradient Pill */}
      <rect x="52" y="52" width="38" height="36" rx="8" fill="#635BFF" />
      <path d="M68 62 C65 62 63 64 63 66 C63 70 73 69 73 74 C73 77 70 78 67 78 C64 78 62 76 61 75 M67 60 L67 62" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function HotjarPosthogLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Hotjar Flame Red */}
      <path d="M38 22 C42 34 32 40 32 54 C32 66 42 74 54 74 C50 68 50 60 54 54 C58 48 64 44 60 34 C72 44 74 60 68 70 C74 64 76 54 74 46 C74 36 64 26 52 20 C48 24 44 24 38 22 Z" fill="#FD3A5C" />
      {/* PostHog Hedgehog Blue Spike */}
      <circle cx="28" cy="62" r="6" fill="#1D4ED8" />
      <polygon points="20,54 28,50 26,58" fill="#1D4ED8" />
    </svg>
  );
}

// ============================================================================
// AI & Automation Tech Logos
// ============================================================================

export function OpenAIAntropicLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* OpenAI Emerald Spiral Knot */}
      <circle cx="50" cy="50" r="44" fill="#0B132B" stroke="rgba(16,185,129,0.3)" strokeWidth="3" />
      <path
        d="M50 26 C53 26 56 28 57 30 L66 46 C67 48 67 51 66 53 L58 67 C57 69 54 70 51 70 L34 70 C31 70 29 69 28 67 L20 53 C19 51 19 48 20 46 L28 32 C29 30 32 29 35 29 Z"
        stroke="#10b981"
        strokeWidth="4"
        fill="none"
      />
      {/* Anthropic Claude Terracotta Monogram 'A' */}
      <path d="M64 42 L74 66 M74 66 L84 42 M66 58 L82 58" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function LangChainLlamaIndexLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* LangChain Parrot Green Link Rings */}
      <circle cx="38" cy="46" r="20" stroke="#059669" strokeWidth="6" fill="none" />
      <circle cx="58" cy="54" r="20" stroke="#10b981" strokeWidth="6" fill="none" />
      <circle cx="48" cy="50" r="7" fill="#34d399" />
      {/* LlamaIndex Purple Geometry */}
      <polygon points="74,22 88,40 66,40" fill="#8B5CF6" />
      <circle cx="78" cy="30" r="2" fill="#fff" />
    </svg>
  );
}

export function PineconeQdrantLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Pinecone Geometric Cone in Deep Blue */}
      <polygon points="50,14 68,36 32,36" fill="#0284c7" />
      <polygon points="50,28 76,56 24,56" fill="#0369a1" />
      <polygon points="50,46 84,80 16,80" fill="#075985" />
      {/* Qdrant Coral Vector Point */}
      <circle cx="78" cy="68" r="8" fill="#F43F5E" />
      <circle cx="78" cy="68" r="14" stroke="#F43F5E" strokeWidth="2.5" strokeDasharray="4 3" fill="none" />
    </svg>
  );
}

export function N8nMakeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* n8n Orange Node Web */}
      <circle cx="28" cy="34" r="12" fill="#EA4B71" />
      <circle cx="28" cy="66" r="12" fill="#EA4B71" />
      <circle cx="54" cy="50" r="14" fill="#FF6D5A" />
      <line x1="28" y1="34" x2="54" y2="50" stroke="#EA4B71" strokeWidth="5" />
      <line x1="28" y1="66" x2="54" y2="50" stroke="#EA4B71" strokeWidth="5" />
      {/* Make Purple Geometric Ring */}
      <circle cx="74" cy="50" r="16" stroke="#6F39FD" strokeWidth="6" fill="none" />
      <polygon points="70,44 80,50 70,56" fill="#6F39FD" />
    </svg>
  );
}

export function PythonFastApiLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Python Twin Snakes in Blue & Yellow */}
      <path d="M48 18 C36 18 30 24 30 32 L30 40 L50 40 L50 44 L24 44 C16 44 12 50 12 58 C12 66 18 70 28 70 L34 70 L34 62 C34 54 40 48 48 48 L60 48 L60 38 C60 26 56 18 48 18 Z" fill="#3776AB" />
      <circle cx="38" cy="28" r="3" fill="#fff" />
      <path d="M52 82 C64 82 70 76 70 68 L70 60 L50 60 L50 56 L76 56 C84 56 88 50 88 42 C88 34 82 30 72 30 L66 30 L66 38 C66 46 60 52 52 52 L40 52 L40 62 C40 74 44 82 52 82 Z" fill="#FFD43B" />
      <circle cx="62" cy="72" r="3" fill="#3776AB" />
      {/* FastAPI Lightning Bolt in Teal */}
      <polygon points="56,36 44,54 52,54 46,70 62,48 54,48" fill="#009688" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}

export function HuggingFaceOllamaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Hugging Face Yellow Smiling Face */}
      <circle cx="46" cy="50" r="32" fill="#FFD21E" />
      {/* Eyes */}
      <ellipse cx="38" cy="44" rx="4" ry="6" fill="#000" />
      <ellipse cx="54" cy="44" rx="4" ry="6" fill="#000" />
      {/* Warm Smile */}
      <path d="M34 54 Q 46 68 58 54" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Hugging hands */}
      <path d="M18 56 Q 24 46 30 52" stroke="#FF9D00" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M74 56 Q 68 46 62 52" stroke="#FF9D00" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Ollama Stylized Outline */}
      <circle cx="76" cy="30" r="8" fill="#111827" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function ZapierWebhookLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Zapier Orange Asterisk Star */}
      <rect x="44" y="16" width="12" height="68" rx="6" fill="#FF4A00" />
      <rect x="16" y="44" width="68" height="12" rx="6" fill="#FF4A00" />
      <rect x="44" y="16" width="12" height="68" rx="6" fill="#FF4A00" transform="rotate(45 50 50)" />
      <rect x="44" y="16" width="12" height="68" rx="6" fill="#FF4A00" transform="rotate(-45 50 50)" />
      {/* Center Webhook Hub */}
      <circle cx="50" cy="50" r="10" fill="#fff" />
      <circle cx="50" cy="50" r="6" fill="#0284c7" />
    </svg>
  );
}

export function DockerKubernetesLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Docker Whale Blue Shape */}
      <path d="M16 60 C16 74 30 84 52 84 C76 84 86 70 86 58 C86 54 80 54 78 54 C74 54 72 48 70 44 C66 44 64 48 64 54 L36 54 C34 50 30 46 24 50 C20 54 16 56 16 60 Z" fill="#2496ED" />
      {/* Docker Containers */}
      <rect x="36" y="44" width="8" height="7" fill="#0db7ed" />
      <rect x="46" y="44" width="8" height="7" fill="#0db7ed" />
      <rect x="56" y="44" width="8" height="7" fill="#0db7ed" />
      <rect x="46" y="34" width="8" height="7" fill="#0db7ed" />
      {/* Kubernetes Helm Wheel in Navy */}
      <circle cx="70" cy="30" r="16" stroke="#326CE5" strokeWidth="4" fill="#0f172a" />
      <polygon points="70,20 73,28 81,30 74,34 75,42 70,36 65,42 66,34 59,30 67,28" fill="#326CE5" />
    </svg>
  );
}

