"use client";

import { useState } from "react";
import { Input, Chip, Card, CardBody } from "@heroui/react";
import { Search, Bot, ExternalLink, Shield, Zap, Database, Eye } from "lucide-react";
import Link from "next/link";

const AGENTS = [
  {
    name: "GPTBot",
    company: "OpenAI",
    type: "LLM Training & Search",
    description: "OpenAI's web crawler used to gather training data and power ChatGPT's real-time browsing and search features.",
    userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0)",
    frequency: "High",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "ChatGPT-User",
    company: "OpenAI",
    type: "Real-time Browse",
    description: "Used when ChatGPT users ask the model to browse the web in real-time to answer questions.",
    userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0)",
    frequency: "Medium",
    respectsRobots: true,
    category: "realtime",
  },
  {
    name: "ClaudeBot",
    company: "Anthropic",
    type: "Training & Research",
    description: "Anthropic's web crawler used to gather data for training and improving Claude models.",
    userAgent: "Mozilla/5.0 (compatible; ClaudeBot/1.0)",
    frequency: "Medium",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "PerplexityBot",
    company: "Perplexity AI",
    type: "Real-time Search",
    description: "Perplexity's crawler that fetches web pages in real-time to provide cited answers to user queries.",
    userAgent: "Mozilla/5.0 (compatible; PerplexityBot/1.0)",
    frequency: "High",
    respectsRobots: true,
    category: "realtime",
  },
  {
    name: "Googlebot-Extended",
    company: "Google",
    type: "AI Training",
    description: "Google's extended crawler used specifically for training Gemini and other Google AI models. Separate from standard Googlebot.",
    userAgent: "Mozilla/5.0 (compatible; Googlebot-Extended)",
    frequency: "High",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "Google-Extended",
    company: "Google",
    type: "Gemini Training",
    description: "Allows site owners to control whether their content is used to train Google's Gemini AI models.",
    userAgent: "Google-Extended",
    frequency: "High",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "Bytespider",
    company: "ByteDance",
    type: "Training & Search",
    description: "ByteDance's web crawler used for training AI models and powering search features across ByteDance products.",
    userAgent: "Mozilla/5.0 (compatible; Bytespider)",
    frequency: "Very High",
    respectsRobots: false,
    category: "training",
  },
  {
    name: "CCBot",
    company: "Common Crawl",
    type: "Open Dataset",
    description: "Common Crawl's bot that builds a free, open repository of web crawl data used by many AI companies for training.",
    userAgent: "CCBot/2.0 (https://commoncrawl.org/faq/)",
    frequency: "Medium",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "Applebot-Extended",
    company: "Apple",
    type: "Apple Intelligence",
    description: "Apple's extended crawler for training Apple Intelligence features and Siri AI capabilities.",
    userAgent: "Mozilla/5.0 (Applebot-Extended)",
    frequency: "Medium",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "cohere-ai",
    company: "Cohere",
    type: "LLM Training",
    description: "Cohere's web crawler for gathering training data for their enterprise AI language models.",
    userAgent: "cohere-ai",
    frequency: "Low",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "Amazonbot",
    company: "Amazon",
    type: "Alexa & AI",
    description: "Amazon's crawler used for training Alexa and other Amazon AI services.",
    userAgent: "Mozilla/5.0 (compatible; Amazonbot/0.1)",
    frequency: "Medium",
    respectsRobots: true,
    category: "training",
  },
  {
    name: "FacebookBot",
    company: "Meta",
    type: "AI Training & Social",
    description: "Meta's web crawler used for AI training data, social previews, and powering Meta AI features.",
    userAgent: "Mozilla/5.0 (compatible; FacebookBot/1.0)",
    frequency: "High",
    respectsRobots: true,
    category: "training",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Agents" },
  { key: "training", label: "LLM Training" },
  { key: "realtime", label: "Real-time Search" },
];

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = AGENTS.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.company.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || agent.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-indigo-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bebas text-5xl text-gray-900 sm:text-6xl">
              AI Agent Directory
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Browse our open database of known AI agents and bots. Understand their behavior and optimize your site for each one.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder="Search agents..."
              value={search}
              onValueChange={setSearch}
              startContent={<Search className="h-4 w-4 text-gray-400" />}
              className="max-w-md"
              size="lg"
            />
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <Chip
                  key={cat.key}
                  variant={category === cat.key ? "solid" : "bordered"}
                  color={category === cat.key ? "primary" : "default"}
                  className="cursor-pointer"
                  onClick={() => setCategory(cat.key)}
                >
                  {cat.label}
                </Chip>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Showing {filtered.length} of {AGENTS.length} agents
          </p>
        </div>
      </section>

      {/* Agent Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((agent) => (
              <Card key={agent.name} className="border border-gray-100">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                        <Bot className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-500">{agent.company}</p>
                      </div>
                    </div>
                    <Chip size="sm" variant="flat" color={agent.category === "realtime" ? "secondary" : "default"}>
                      {agent.type}
                    </Chip>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">{agent.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Crawl Frequency</span>
                      <span className="font-medium text-gray-900">{agent.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Respects robots.txt</span>
                      <span className={`font-medium ${agent.respectsRobots ? "text-emerald-600" : "text-red-500"}`}>
                        {agent.respectsRobots ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500">User Agent</p>
                    <p className="mt-1 break-all font-mono text-xs text-gray-700">{agent.userAgent}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <Bot className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No agents found</h3>
              <p className="mt-1 text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
