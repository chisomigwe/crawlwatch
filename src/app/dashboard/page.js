"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { Button, Card, CardBody, CardHeader, Spinner, Chip } from "@heroui/react";
import {
  Crown,
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
  Plus,
} from "lucide-react";
import Link from "next/link";

// Agent company mapping for display
const AGENT_COMPANIES = {
  GPTBot: "OpenAI",
  "ChatGPT-User": "OpenAI",
  "OAI-SearchBot": "OpenAI",
  ClaudeBot: "Anthropic",
  PerplexityBot: "Perplexity",
  "Google-Extended": "Google",
  Googlebot: "Google",
  Bytespider: "ByteDance",
  CCBot: "Common Crawl",
  "Applebot-Extended": "Apple",
  "cohere-ai": "Cohere",
  "Meta-ExternalAgent": "Meta",
  Amazonbot: "Amazon",
  YouBot: "You.com",
};

function timeAgo(dateString) {
  if (!dateString) return "N/A";
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [proStatus, setProStatus] = useState({ isPro: false, loading: true });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const [proRes, statsRes] = await Promise.all([
        fetch("/api/check-pro-status"),
        fetch("/api/dashboard/stats"),
      ]);

      const proData = await proRes.json();
      setProStatus({ ...proData, loading: false });

      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      setProStatus({ isPro: false, loading: false });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/user/sync", { method: "POST" }).catch(console.error);
      fetchDashboard();
    }
  }, [isLoaded, user, fetchDashboard]);

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

  const hasSites = stats?.sites?.length > 0;
  const agents = stats?.agents || [];
  const topPages = stats?.topPages || [];

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

      {/* No sites setup message */}
      {!statsLoading && !hasSites && (
        <Card className="mb-8">
          <CardBody className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Plus className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Add your first site</h2>
            <p className="max-w-md text-gray-600">
              Connect your website to start tracking AI agent traffic. Once connected, you&apos;ll see real-time data here.
            </p>
            <Link href="/dashboard/sites">
              <Button color="primary" size="lg" className="font-medium">
                Add a Site
              </Button>
            </Link>
          </CardBody>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <Bot className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Agent Visits</p>
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? "..." : (stats?.totalVisits || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">last 24 hours</p>
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
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? "..." : stats?.visibilityScore ? `${stats.visibilityScore}/100` : "—"}
              </p>
              <p className="text-xs text-gray-500">across AI platforms</p>
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
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? "..." : (stats?.citations || 0)}
              </p>
              <p className="text-xs text-gray-500">last 7 days</p>
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
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? "..." : (stats?.uniqueAgents || 0)}
              </p>
              <p className="text-xs text-gray-500">detected on your site</p>
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
                <p className="text-sm text-gray-500">AI agents visiting your site (24h)</p>
              </div>
              <Chip color="success" variant="dot" size="sm">
                Live
              </Chip>
            </CardHeader>
            <CardBody>
              {agents.length === 0 && !statsLoading ? (
                <p className="py-8 text-center text-gray-500">
                  No agent visits recorded yet. Add a site and integrate the tracking snippet to start seeing data.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-3 font-medium text-gray-500">Agent</th>
                        <th className="pb-3 font-medium text-gray-500">Visits (24h)</th>
                        <th className="pb-3 font-medium text-gray-500">Pages</th>
                        <th className="pb-3 font-medium text-gray-500">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent) => (
                        <tr key={agent.name} className="border-b border-gray-50">
                          <td className="py-3">
                            <div>
                              <p className="font-medium text-gray-900">{agent.name}</p>
                              <p className="text-xs text-gray-500">
                                {AGENT_COMPANIES[agent.name] || "Unknown"}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 font-medium text-gray-900">{agent.visits}</td>
                          <td className="py-3 text-gray-600">{agent.pages}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1 text-gray-500">
                              <Clock className="h-3 w-3" />
                              {timeAgo(agent.lastSeen)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
              {topPages.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-500">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {topPages.map((page) => (
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
              )}
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
