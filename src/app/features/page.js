import Link from "next/link";
import { Button } from "@heroui/react";
import { SignUpCTA } from "@/components/AuthButtons";
import {
  Activity,
  BarChart3,
  Database,
  PenTool,
  Trophy,
  Plug,
  ArrowRight,
  Check,
  Bot,
  Shield,
  Zap,
  Globe,
  LineChart,
  FileSearch,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Features",
  description: "Discover how CrawlWatch helps you track AI agent traffic, monitor AI visibility, and optimize your content for the agentic web.",
  path: "/features",
});

const detailedFeatures = [
  {
    title: "Real-Time Agent Dashboard",
    description: "See every AI agent visiting your site as it happens. Our live dashboard shows agent identity, crawl frequency, pages visited, and behavioral patterns. Know exactly which bots from OpenAI, Anthropic, Google, and others are analyzing your content.",
    icon: Activity,
    details: [
      "Live agent traffic feed with sub-second updates",
      "Agent identification and classification (LLM training, search indexing, real-time responses)",
      "Page-level crawl analytics showing which content agents prioritize",
      "Historical trend analysis with 90-day retention",
      "Alert system for unusual crawl patterns or new agent detection",
    ],
  },
  {
    title: "AI Visibility Score",
    description: "Get an instant, comprehensive score showing how visible your brand is across all major AI platforms. Our scoring algorithm analyzes your presence in ChatGPT, Perplexity, Claude, Gemini, and more.",
    icon: BarChart3,
    details: [
      "Aggregate visibility score across all AI platforms (0-100)",
      "Platform-specific breakdown showing strengths and gaps",
      "Prompt-level analysis for your target keywords",
      "Week-over-week and month-over-month trend tracking",
      "Free tier available — no signup required for basic scores",
    ],
  },
  {
    title: "Agent Directory",
    description: "Browse our open, searchable database of 200+ known AI agents and bots. Understand each agent's purpose, crawl behavior, frequency, and how to optimize your site for maximum visibility with each one.",
    icon: Database,
    details: [
      "200+ documented AI agents and bots",
      "Crawl behavior documentation for each agent",
      "Robots.txt recommendations per agent",
      "Classification by type: training, indexing, real-time, research",
      "Community-contributed updates and new agent reports",
    ],
  },
  {
    title: "Content Optimizer",
    description: "Go beyond generic recommendations. Our built-in editor analyzes your content against what AI agents actually prioritize, scoring each page and suggesting specific improvements to boost AI citations.",
    icon: PenTool,
    details: [
      "Page-by-page AI readability score",
      "Specific improvement suggestions with before/after previews",
      "Schema.org and structured data validation",
      "Header hierarchy and content structure analysis",
      "Real-time scoring as you edit",
    ],
  },
  {
    title: "Competitive Benchmarking",
    description: "See exactly how your AI visibility stacks up against competitors. Track rankings, citation share, and visibility trends across every major AI platform to identify opportunities and threats.",
    icon: Trophy,
    details: [
      "Side-by-side competitor visibility comparison",
      "Share of voice tracking across AI platforms",
      "Prompt-level competitive analysis",
      "Automated competitor discovery and tracking",
      "Weekly competitive intelligence reports",
    ],
  },
  {
    title: "One-Click Integrations",
    description: "Set up CrawlWatch in minutes with guided setup wizards for every major platform. Our integrations are asynchronous and never impact your site's performance.",
    icon: Plug,
    details: [
      "Vercel — no-code log drain integration",
      "Cloudflare — edge worker with zero latency",
      "AWS CloudFront — S3 log processor",
      "WordPress — one-click plugin from the WP directory",
      "Next.js — lightweight middleware package",
      "HTTP API — send events from any backend",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-indigo-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bebas text-5xl text-gray-900 sm:text-6xl">
              Built for the Agentic Web
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Every feature is designed to help you understand, track, and optimize for the AI agents that increasingly drive product discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {detailedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isReversed = index % 2 === 1;
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="lg:w-1/2">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                      <Icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h2 className="font-bebas text-3xl text-gray-900 sm:text-4xl">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                      {feature.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                        <span className="ml-2 text-sm text-gray-400">CrawlWatch Dashboard</span>
                      </div>
                      <div className="mt-6 space-y-4">
                        <div className="h-4 w-3/4 rounded bg-gray-200" />
                        <div className="h-4 w-1/2 rounded bg-gray-200" />
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div className="h-20 rounded-lg bg-emerald-100" />
                          <div className="h-20 rounded-lg bg-indigo-100" />
                          <div className="h-20 rounded-lg bg-amber-100" />
                        </div>
                        <div className="h-32 rounded-lg bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
            Ready to See Your AI Traffic?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Start for free. No credit card required. Setup in under 5 minutes.
          </p>
          <div className="mt-8">
            <SignUpCTA>
              <Button
                color="primary"
                size="lg"
                className="px-8 font-semibold"
                endContent={<ArrowRight className="h-5 w-5" />}
              >
                Get Started Free
              </Button>
            </SignUpCTA>
          </div>
        </div>
      </section>
    </div>
  );
}
