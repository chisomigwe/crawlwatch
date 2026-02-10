"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Tag, Rocket, MessageSquare, Sparkles, Check, Users, ArrowRight, Zap, Shield } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const iconMap = {
  Tag: Tag,
  Rocket: Rocket,
  MessageSquare: MessageSquare,
  Sparkles: Sparkles,
  Zap: Zap,
  Shield: Shield,
};

export function WaitlistLanding() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { waitlist } = siteConfig;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual waitlist API endpoint
      // Example: await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            {waitlist.hero.badge && (
              <div className="mb-6 inline-flex items-center rounded-full bg-primary-100 px-4 py-2">
                <span className="text-sm font-medium text-primary-700">
                  {waitlist.hero.badge}
                </span>
              </div>
            )}

            <h1 className="font-bebas text-5xl tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
              {waitlist.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {waitlist.hero.subtitle}
            </p>

            {/* Email Form */}
            <div className="mx-auto mt-10 max-w-md">
              {isSubmitted ? (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-medium text-green-800">
                    {waitlist.form.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder={waitlist.form.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    className="flex-1"
                    isInvalid={!!error}
                    errorMessage={error}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="px-8 font-semibold"
                    isLoading={isSubmitting}
                    endContent={!isSubmitting && <ArrowRight className="h-5 w-5" />}
                  >
                    {waitlist.form.buttonText}
                  </Button>
                </form>
              )}
            </div>

            {/* Social Proof */}
            {waitlist.socialProof.enabled && !isSubmitted && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>
                  <strong className="text-gray-900">
                    {waitlist.socialProof.count.toLocaleString()}+
                  </strong>{" "}
                  {waitlist.socialProof.text}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary-100 opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-secondary-100 opacity-30 blur-3xl" />
        </div>
      </section>

      {/* Early Bird Offer */}
      {waitlist.earlyBird.enabled && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-secondary-600 p-8 text-center sm:p-12">
              {/* Discount Badge */}
              <div className="absolute -right-4 -top-4 rotate-12">
                <div className="rounded-xl bg-yellow-400 px-4 py-2 font-bold text-yellow-900 shadow-lg">
                  {waitlist.earlyBird.discountLabel}
                </div>
              </div>

              <h2 className="font-bebas text-3xl text-white sm:text-5xl">
                {waitlist.earlyBird.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
                {waitlist.earlyBird.description}
              </p>

              {/* Pricing */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="text-2xl text-blue-200 line-through">
                  ${waitlist.earlyBird.originalPrice}
                </span>
                <span className="text-5xl font-bold text-white sm:text-6xl">
                  ${waitlist.earlyBird.discountedPrice}
                </span>
                <span className="text-blue-200">/one-time</span>
              </div>

              <p className="mt-4 text-sm text-blue-200">
                {waitlist.earlyBird.expiresText}
              </p>

              {/* Background decoration */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white opacity-10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-white opacity-10 blur-3xl" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              Why Join Early?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Get exclusive benefits by being one of our first members.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {waitlist.benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || Sparkles;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              What You'll Get
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              A sneak peek at what's coming.
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
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-600" />
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

      {/* Final CTA */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
              Don't Miss Out
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Join the waitlist today and be the first to know when we launch.
            </p>

            {/* Email Form (repeated) */}
            <div className="mx-auto mt-10 max-w-md">
              {isSubmitted ? (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-medium text-green-800">
                    {waitlist.form.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder={waitlist.form.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="px-8 font-semibold"
                    isLoading={isSubmitting}
                    endContent={!isSubmitting && <ArrowRight className="h-5 w-5" />}
                  >
                    {waitlist.form.buttonText}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
