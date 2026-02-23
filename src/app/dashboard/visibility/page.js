"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Progress, Spinner } from "@heroui/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function VisibilityPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVisibility() {
      try {
        const res = await fetch("/api/dashboard/visibility");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching visibility:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVisibility();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const overallScore = data?.score;
  const platformScores = data?.platformScores || {};
  const promptRankings = data?.promptRankings || [];

  const platforms = Object.entries(platformScores).map(([name, score]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    score,
  }));

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
                  <span className="text-5xl font-bold text-emerald-600">
                    {overallScore ?? "—"}
                  </span>
                  {overallScore !== null && (
                    <span className="text-lg text-gray-500">/100</span>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">Overall Visibility Score</p>
            {overallScore === null && (
              <p className="mt-1 text-sm text-gray-500">Add a site to calculate your score</p>
            )}
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
            {platforms.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                No platform scores yet. Connect your site and we&apos;ll calculate your visibility across ChatGPT, Perplexity, Claude, Gemini, and more.
              </p>
            ) : (
              <div className="space-y-6">
                {platforms.map((platform) => (
                  <div key={platform.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-gray-900">{platform.name}</span>
                      <span className="font-bold text-gray-900">{platform.score}/100</span>
                    </div>
                    <Progress
                      value={platform.score}
                      color={platform.score >= 75 ? "success" : platform.score >= 50 ? "warning" : "danger"}
                      size="md"
                    />
                  </div>
                ))}
              </div>
            )}
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
          {promptRankings.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No prompt rankings yet. Once your site is tracked, we&apos;ll show how you rank for relevant queries across AI platforms.
            </p>
          ) : (
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
                  {promptRankings.map((item, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-900">&quot;{item.prompt}&quot;</td>
                      <td className="py-3 text-gray-600">{item.platform}</td>
                      <td className="py-3">
                        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                          item.position <= 3 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {item.position}
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
          )}
        </CardBody>
      </Card>
    </div>
  );
}
