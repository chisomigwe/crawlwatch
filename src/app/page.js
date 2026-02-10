import Link from "next/link";
import { Button } from "@heroui/react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Zap, Shield, Sparkles, ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { WaitlistLanding } from "@/components/WaitlistLanding";

// Icon mapping for dynamic features
const iconMap = {
  Zap: Zap,
  Shield: Shield,
  Sparkles: Sparkles,
};

export default function HomePage() {
  // Switch between landing pages based on config
  if (siteConfig.landingMode === "waitlist") {
    return <WaitlistLanding />;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bebas text-5xl tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
              {siteConfig.landing.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {siteConfig.landing.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button
                    color="primary"
                    size="lg"
                    className="px-8 font-semibold"
                    endContent={<ArrowRight className="h-5 w-5" />}
                  >
                    {siteConfig.landing.hero.cta}
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    color="primary"
                    size="lg"
                    className="px-8 font-semibold"
                    endContent={<ArrowRight className="h-5 w-5" />}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
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
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-100 opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-indigo-100 opacity-30 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              Why Choose {siteConfig.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Everything you need to succeed, all in one place.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.landing.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Choose the plan that works best for you.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {siteConfig.pricing.plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl bg-white p-8 shadow-sm ${
                  plan.highlighted
                    ? "ring-2 ring-blue-600"
                    : "border border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600">/one-time</span>
                    )}
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <Button
                        color={plan.highlighted ? "primary" : "default"}
                        variant={plan.highlighted ? "solid" : "bordered"}
                        size="lg"
                        className="w-full font-semibold"
                      >
                        {plan.cta}
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href={plan.highlighted ? "/dashboard" : "/dashboard"}>
                      <Button
                        color={plan.highlighted ? "primary" : "default"}
                        variant={plan.highlighted ? "solid" : "bordered"}
                        size="lg"
                        className="w-full font-semibold"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 text-center sm:px-12 sm:py-24">
            <h2 className="font-bebas text-4xl text-white sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Join thousands of users who are already using {siteConfig.name}.
            </p>
            <div className="mt-10">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="bg-white px-8 font-semibold text-blue-600 hover:bg-gray-100"
                  >
                    Start Free Today
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white px-8 font-semibold text-blue-600 hover:bg-gray-100"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-blue-500 opacity-50 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-indigo-500 opacity-50 blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
