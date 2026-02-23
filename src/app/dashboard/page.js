"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button, Card, CardBody, CardHeader, Spinner, Chip } from "@heroui/react";
import {
  Crown,
  Activity,
  Bot,
  Eye,
  TrendingUp,
  Globe,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

// Sample data for the dashboard demo
const SAMPLE_AGENTS = [
  { name: "GPTBot", company: "OpenAI", visits: 342, pages: 128, lastSeen: "2 min ago", trend: "up", change: "+12%" },
  { name: "ClaudeBot", company: "Anthropic", visits: 256, pages: 94, lastSeen: "5 min ago", trend: "up", change: "+8%" },
  { name: "PerplexityBot", company: "Perplexity", visits: 189, pages: 67, lastSeen: "1 min ago", trend: "up", change: "+23%" },
  { name: "Googlebot-Extended", company: "Google", visits: 412, pages: 201, lastSeen: "Just now", trend: "down", change: "-3%" },
  { name: "Bytespider", company: "ByteDance", visits: 98, pages: 45, lastSeen: "12 min ago", trend: "up", change: "+5%" },
  { name: "CCBot", company: "Common Crawl", visits: 67, pages: 34, lastSeen: "1 hr ago", trend: "down", change: "-7%" },
];

const SAMPLE_TOP_PAGES = [
  { path: "/docs/getting-started", visits: 89, agents: 4 },
  { path: "/pricing", visits: 67, agents: 3 },
  { path: "/blog/ai-search-guide", visits: 54, agents: 5 },
  { path: "/features", visits: 48, agents: 3 },
  { path: "/api/reference", visits: 41, agents: 2 },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [proStatus, setProStatus] = useState({ isPro: false, loading: true });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/check-pro-status");
        const data = await res.json();
        setProStatus({ ...data, loading: false });
      } catch (error) {
        console.error("Error checking pro status:", error);
        setProStatus({ isPro: false, loading: false });
      }
    }

    if (isLoaded && user) {
      fetch("/api/user/sync", { method: "POST" }).catch(console.error);
      checkStatus();
    }
  }, [isLoaded, user]);

  async function handleUpgrade() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout:", error);
    } finally {
      setCheckoutLoading(false);
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
            Welcome back, {user?.firstName || "there"}
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s your AI agent traffic overview.
          </p>
        </div>
        <div className="flex gap-2">
          {!proStatus.isPro && !proStatus.loading && (
            <Button
              color="primary"
              className="font-medium"
              onPress={handleUpgrade}
              isLoading={checkoutLoading}
              startContent={<Crown className="h-4 w-4" />}
            >
              Upgrade
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <Bot className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Agent Visits</p>
              <p className="text-2xl font-bold text-gray-900">1,364</p>
              <p className="text-xs text-emerald-600">+18% this week</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
              <Eye className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">AI Visibility Score</p>
              <p className="text-2xl font-bold text-gray-900">72/100</p>
              <p className="text-xs text-emerald-600">+5 pts this month</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">AI Citations</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
              <p className="text-xs text-emerald-600">+12 this week</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Unique Agents</p>
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-xs text-gray-500">across 6 platforms</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Real-Time Agent Traffic */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Real-Time Agent Traffic</p>
                <p className="text-sm text-gray-500">AI agents visiting your site right now</p>
              </div>
              <Chip color="success" variant="dot" size="sm">
                Live
              </Chip>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 font-medium text-gray-500">Agent</th>
                      <th className="pb-3 font-medium text-gray-500">Visits (24h)</th>
                      <th className="pb-3 font-medium text-gray-500">Pages</th>
                      <th className="pb-3 font-medium text-gray-500">Trend</th>
                      <th className="pb-3 font-medium text-gray-500">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_AGENTS.map((agent) => (
                      <tr key={agent.name} className="border-b border-gray-50">
                        <td className="py-3">
                          <div>
                            <p className="font-medium text-gray-900">{agent.name}</p>
                            <p className="text-xs text-gray-500">{agent.company}</p>
                          </div>
                        </td>
                        <td className="py-3 font-medium text-gray-900">{agent.visits}</td>
                        <td className="py-3 text-gray-600">{agent.pages}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                            agent.trend === "up" ? "text-emerald-600" : "text-red-500"
                          }`}>
                            {agent.trend === "up" ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {agent.change}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 text-gray-500">
                            <Clock className="h-3 w-3" />
                            {agent.lastSeen}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Account</p>
                <p className="text-sm text-gray-500">
                  {proStatus.loading ? (
                    "Loading..."
                  ) : proStatus.isPro ? (
                    <span className="text-emerald-600">Growth Plan</span>
                  ) : (
                    <span className="text-gray-600">Free Plan</span>
                  )}
                </p>
              </div>
            </CardHeader>
            <CardBody className="gap-2">
              {!proStatus.isPro && !proStatus.loading && (
                <Button
                  color="primary"
                  className="w-full font-medium"
                  onPress={handleUpgrade}
                  isLoading={checkoutLoading}
                >
                  Upgrade to Growth
                </Button>
              )}
              {proStatus.isPro && (
                <p className="text-sm text-gray-600">
                  You have access to all Growth features.
                </p>
              )}
            </CardBody>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Top Pages by Agent Visits</p>
                <p className="text-sm text-gray-500">Most crawled pages (24h)</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {SAMPLE_TOP_PAGES.map((page) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="truncate text-sm text-gray-700">{page.path}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium text-gray-900">{page.visits}</span>
                      <span className="text-gray-400">{page.agents} agents</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Quick Actions</p>
              </div>
            </CardHeader>
            <CardBody className="gap-2">
              <Link href="/dashboard/visibility">
                <Button variant="bordered" className="w-full justify-start" startContent={<BarChart3 className="h-4 w-4" />}>
                  Check Visibility Score
                </Button>
              </Link>
              <Link href="/directory">
                <Button variant="bordered" className="w-full justify-start" startContent={<Bot className="h-4 w-4" />}>
                  Browse Agent Directory
                </Button>
              </Link>
              <Link href="/dashboard/optimize">
                <Button variant="bordered" className="w-full justify-start" startContent={<Settings className="h-4 w-4" />}>
                  Content Optimizer
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
