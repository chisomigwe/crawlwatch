"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Textarea, Progress, Chip } from "@heroui/react";
import { PenTool, Check, AlertTriangle, Info, ArrowRight, FileText, Sparkles } from "lucide-react";

const SAMPLE_SUGGESTIONS = [
  {
    type: "critical",
    title: "Add structured data (Schema.org)",
    description: "Your pages lack JSON-LD structured data. AI agents heavily rely on structured data to understand page content and purpose. Add SoftwareApplication, FAQPage, and Organization schemas.",
    impact: "High",
  },
  {
    type: "warning",
    title: "Improve heading hierarchy",
    description: "Several pages skip heading levels (h1 to h3). AI agents use heading structure to understand content organization. Ensure sequential heading levels on all pages.",
    impact: "Medium",
  },
  {
    type: "warning",
    title: "Add meta descriptions to 8 pages",
    description: "8 of your pages are missing meta descriptions. AI agents use these to quickly understand page purpose and determine relevance to user queries.",
    impact: "Medium",
  },
  {
    type: "info",
    title: "Create an llms.txt file",
    description: "Adding an llms.txt file to your root domain helps AI crawlers understand your site structure and content priorities. This is an emerging standard supported by multiple AI platforms.",
    impact: "Low",
  },
  {
    type: "info",
    title: "Optimize image alt text",
    description: "23 images are missing descriptive alt text. While primarily an accessibility concern, AI agents also use alt text to understand visual content on your pages.",
    impact: "Low",
  },
];

const SAMPLE_PAGES = [
  { path: "/", score: 82, status: "good" },
  { path: "/features", score: 74, status: "okay" },
  { path: "/pricing", score: 69, status: "needs-work" },
  { path: "/blog/getting-started", score: 88, status: "good" },
  { path: "/docs/api-reference", score: 45, status: "poor" },
];

export default function OptimizePage() {
  const [url, setUrl] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
          Content Optimizer
        </h1>
        <p className="mt-2 text-gray-600">
          Score your content for AI visibility and get specific improvement suggestions.
        </p>
      </div>

      {/* URL Scanner */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Enter a page URL to analyze..."
              value={url}
              onValueChange={setUrl}
              startContent={<FileText className="h-4 w-4 text-gray-400" />}
              className="flex-1"
              size="lg"
            />
            <Button
              color="primary"
              size="lg"
              className="font-semibold"
              endContent={<Sparkles className="h-4 w-4" />}
            >
              Analyze Page
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Enter any URL on your site to get an AI visibility score and optimization suggestions.
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Page Scores */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div>
                <p className="text-lg font-semibold">Page Scores</p>
                <p className="text-sm text-gray-500">AI readability by page</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {SAMPLE_PAGES.map((page) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <span className="truncate text-sm text-gray-700">{page.path}</span>
                    <span className={`ml-2 text-sm font-bold ${
                      page.score >= 80 ? "text-emerald-600" :
                      page.score >= 60 ? "text-amber-600" :
                      "text-red-500"
                    }`}>
                      {page.score}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-gray-400">
                Connect your site to scan all pages automatically.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Suggestions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <p className="text-lg font-semibold">Optimization Suggestions</p>
                <p className="text-sm text-gray-500">Data-driven recommendations to improve AI visibility</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {SAMPLE_SUGGESTIONS.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${
                      suggestion.type === "critical"
                        ? "border-red-200 bg-red-50"
                        : suggestion.type === "warning"
                        ? "border-amber-200 bg-amber-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {suggestion.type === "critical" ? (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : suggestion.type === "warning" ? (
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        ) : (
                          <Info className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                          <Chip size="sm" variant="flat" color={
                            suggestion.impact === "High" ? "danger" :
                            suggestion.impact === "Medium" ? "warning" : "default"
                          }>
                            {suggestion.impact} Impact
                          </Chip>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
