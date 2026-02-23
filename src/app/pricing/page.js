import Link from "next/link";
import { Button } from "@heroui/react";
import { SignUpCTA } from "@/components/AuthButtons";
import { Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { FAQSection } from "@/components/FAQSection";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Pricing",
  description: "Simple, transparent pricing for CrawlWatch. Start free and scale as you grow. Every tier is visible — no hidden costs.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-indigo-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bebas text-5xl text-gray-900 sm:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Every price is visible. No &quot;contact sales&quot; walls for standard plans. Start free and upgrade when you&apos;re ready.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
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

      {/* Comparison Table */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-bebas text-4xl text-gray-900">
            Compare All Plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 pr-8 font-medium text-gray-500">Feature</th>
                  <th className="pb-4 px-4 text-center font-medium text-gray-500">Free</th>
                  <th className="pb-4 px-4 text-center font-medium text-gray-500">Starter</th>
                  <th className="pb-4 px-4 text-center font-medium text-emerald-600">Growth</th>
                  <th className="pb-4 px-4 text-center font-medium text-gray-500">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Websites", "1", "3", "10", "Unlimited"],
                  ["Monthly Prompt Runs", "50", "500", "2,000", "Unlimited"],
                  ["AI Platforms Tracked", "3", "All", "All", "All"],
                  ["Agent Traffic Dashboard", "Basic", "Real-time", "Real-time", "Real-time"],
                  ["AI Visibility Score", "Yes", "Yes", "Yes", "Yes"],
                  ["Agent Directory Access", "Yes", "Yes", "Yes", "Yes"],
                  ["Content Optimizer", "-", "Suggestions", "Full Editor", "Full Editor"],
                  ["Competitive Benchmarking", "-", "10 competitors", "50 competitors", "Unlimited"],
                  ["Citation Monitoring", "-", "-", "Yes", "Yes"],
                  ["Custom Agent Access Rules", "-", "-", "Yes", "Yes"],
                  ["Data Exports", "-", "CSV, JSON", "CSV, JSON, API", "All + Custom"],
                  ["API Access", "-", "-", "Yes", "Yes"],
                  ["White-label", "-", "-", "-", "Yes"],
                  ["SSO", "-", "-", "-", "Yes"],
                  ["Support", "Community", "Email", "Slack + Email", "Dedicated AM"],
                ].map(([feature, free, starter, growth, enterprise], index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 pr-8 font-medium text-gray-900">{feature}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{free}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{starter}</td>
                    <td className="py-3 px-4 text-center font-medium text-emerald-700">{growth}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />
    </div>
  );
}
