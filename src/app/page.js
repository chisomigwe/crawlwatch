import Link from "next/link";
import { Button } from "@heroui/react";
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
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { WaitlistLanding } from "@/components/WaitlistLanding";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SignUpCTA, ConditionalSignedOut, ConditionalSignedIn } from "@/components/AuthButtons";

const iconMap = {
  Activity,
  BarChart3,
  Database,
  PenTool,
  Trophy,
  Plug,
  Zap: Activity,
  Shield: Database,
  Sparkles: Trophy,
};

export default function HomePage() {
  if (siteConfig.landingMode === "waitlist") {
    return <WaitlistLanding />;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-indigo-50 py-20 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <Bot className="h-4 w-4" />
              30% of your traffic is from AI agents
            </div>
            <h1 className="font-bebas text-5xl tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
              {siteConfig.landing.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 sm:text-xl">
              {siteConfig.landing.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignUpCTA>
                <Button
                  color="primary"
                  size="lg"
                  className="px-8 font-semibold"
                  endContent={<ArrowRight className="h-5 w-5" />}
                >
                  {siteConfig.landing.hero.cta}
                </Button>
              </SignUpCTA>
              <Link href="/features">
                <Button
                  variant="bordered"
                  size="lg"
                  className="px-8 font-semibold"
                >
                  {siteConfig.landing.hero.secondaryCta}
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Check className="h-4 w-4 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Check className="h-4 w-4 text-emerald-500" />
                Setup in under 5 minutes
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Check className="h-4 w-4 text-emerald-500" />
                Zero impact on page speed
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-100 opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-indigo-100 opacity-30 blur-3xl" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">30%</div>
              <div className="mt-1 text-sm text-gray-500">of web traffic is AI agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">200+</div>
              <div className="mt-1 text-sm text-gray-500">AI agents in our directory</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">6</div>
              <div className="mt-1 text-sm text-gray-500">one-click integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">&lt;5min</div>
              <div className="mt-1 text-sm text-gray-500">to start tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* BLUF About Block */}
      {siteConfig.geo?.about?.enabled && (
        <section className="border-b border-gray-100 bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <article>
              <p className="text-center text-lg leading-relaxed text-gray-700">
                {siteConfig.geo.about.blurb}
              </p>
              {siteConfig.geo.contentFreshness?.showLastUpdated &&
                siteConfig.geo.about.lastUpdated && (
                  <p className="mt-4 text-center text-sm text-gray-400">
                    Last updated:{" "}
                    <time dateTime={siteConfig.geo.about.lastUpdated}>
                      {new Date(
                        siteConfig.geo.about.lastUpdated
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                )}
            </article>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="features-heading" className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              Everything You Need to Win the AI Search Game
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              From real-time agent tracking to content optimization, CrawlWatch gives you the complete toolkit for AI-driven growth.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.landing.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Activity;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              How CrawlWatch Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Start seeing AI agent traffic in three simple steps.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Connect Your Site</h3>
              <p className="mt-2 text-gray-600">
                Add CrawlWatch with one of our 6 integrations. Vercel, Cloudflare, WordPress, and more. Takes under 5 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">See Agent Traffic</h3>
              <p className="mt-2 text-gray-600">
                Watch in real-time as AI agents from ChatGPT, Perplexity, Claude, and Gemini visit your site.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Optimize & Grow</h3>
              <p className="mt-2 text-gray-600">
                Follow data-driven recommendations to improve your AI visibility. Track rankings and watch citations increase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-32" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="pricing-heading" className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Every tier is visible. No hidden costs. Start free and scale as you grow.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-4">
            {siteConfig.pricing.plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl bg-white p-8 shadow-sm ${
                  plan.highlighted ? "ring-2 ring-emerald-600" : "border border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
                  <div className="mt-6">
                    {plan.price !== null ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-gray-900">Custom</span>
                    )}
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                      <span className="ml-3 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <SignUpCTA>
                    <Button
                      color={plan.highlighted ? "primary" : "default"}
                      variant={plan.highlighted ? "solid" : "bordered"}
                      size="lg"
                      className="w-full font-semibold"
                    >
                      {plan.cta}
                    </Button>
                  </SignUpCTA>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-indigo-600 px-6 py-16 text-center sm:px-12 sm:py-24">
            <h2 className="font-bebas text-4xl text-white sm:text-5xl">
              Stop Flying Blind on AI Traffic
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
              Join thousands of growth teams who use CrawlWatch to understand and optimize their AI agent traffic.
            </p>
            <div className="mt-10">
              <SignUpCTA>
                <Button
                  size="lg"
                  className="bg-white px-8 font-semibold text-emerald-600 hover:bg-gray-100"
                >
                  Get Started Free
                </Button>
              </SignUpCTA>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-emerald-500 opacity-50 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-indigo-500 opacity-50 blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
