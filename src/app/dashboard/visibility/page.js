"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Progress } from "@heroui/react";
import { BarChart3, TrendingUp, Globe, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";

const SAMPLE_PLATFORMS = [
  { name: "ChatGPT", score: 78, change: "+12", trend: "up", citations: 23 },
  { name: "Perplexity", score: 85, change: "+8", trend: "up", citations: 31 },
  { name: "Claude", score: 64, change: "+15", trend: "up", citations: 12 },
  { name: "Gemini", score: 71, change: "-3", trend: "down", citations: 18 },
  { name: "Copilot", score: 55, change: "+5", trend: "up", citations: 8 },
];

const SAMPLE_PROMPTS = [
  { prompt: "best project management tools", rank: 3, platform: "ChatGPT", cited: true },
  { prompt: "top analytics platforms 2026", rank: 7, platform: "Perplexity", cited: true },
  { prompt: "AI agent tracking software", rank: 1, platform: "Perplexity", cited: true },
  { prompt: "website bot traffic analytics", rank: 2, platform: "Claude", cited: true },
  { prompt: "GEO optimization tools", rank: 5, platform: "ChatGPT", cited: false },
];

export default function VisibilityPage() {
  const [domain, setDomain] = useState("yourdomain.com");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
          AI Visibility Score
        </h1>
        <p className="mt-2 text-gray-600">
          See how visible your brand is across all major AI platforms.
        </p>
      </div>

      {/* Overall Score */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardBody className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-emerald-100">
                <div className="text-center">
                  <span className="text-5xl font-bold text-emerald-600">72</span>
                  <span className="text-lg text-gray-500">/100</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">Overall Visibility Score</p>
            <p className="mt-1 text-sm text-emerald-600">+5 points this month</p>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <p className="text-lg font-semibold">Platform Breakdown</p>
              <p className="text-sm text-gray-500">Your visibility score across each AI platform</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {SAMPLE_PLATFORMS.map((platform) => (
                <div key={platform.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{platform.name}</span>
                      <span className={`inline-flex items-center gap-1 text-sm ${
                        platform.trend === "up" ? "text-emerald-600" : "text-red-500"
                      }`}>
                        {platform.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {platform.change}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{platform.citations} citations</span>
                      <span className="font-bold text-gray-900">{platform.score}/100</span>
                    </div>
                  </div>
                  <Progress
                    value={platform.score}
                    color={platform.score >= 75 ? "success" : platform.score >= 50 ? "warning" : "danger"}
                    size="md"
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Prompt Rankings */}
      <Card>
        <CardHeader>
          <div>
            <p className="text-lg font-semibold">Prompt Rankings</p>
            <p className="text-sm text-gray-500">How you rank for key prompts across AI platforms</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 font-medium text-gray-500">Prompt</th>
                  <th className="pb-3 font-medium text-gray-500">Platform</th>
                  <th className="pb-3 font-medium text-gray-500">Rank</th>
                  <th className="pb-3 font-medium text-gray-500">Cited</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_PROMPTS.map((item, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-gray-900">&quot;{item.prompt}&quot;</td>
                    <td className="py-3 text-gray-600">{item.platform}</td>
                    <td className="py-3">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                        item.rank <= 3 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {item.rank}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-sm font-medium ${item.cited ? "text-emerald-600" : "text-gray-400"}`}>
                        {item.cited ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Placeholder for connecting to real data */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Connect your site to track real prompt rankings across all AI platforms.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
