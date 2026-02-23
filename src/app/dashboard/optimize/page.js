"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Chip, Spinner } from "@heroui/react";
import { FileText, Sparkles, AlertTriangle, Info } from "lucide-react";

export default function OptimizePage() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPageScores() {
      try {
        const res = await fetch("/api/dashboard/optimize");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching page scores:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPageScores();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const pages = data?.pages || [];

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
              {pages.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">
                  No pages scanned yet. Connect your site and analyze pages to see scores here.
                </p>
              ) : (
                <div className="space-y-4">
                  {pages.map((page) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <span className="truncate text-sm text-gray-700">{page.path}</span>
                      <span className={`ml-2 text-sm font-bold ${
                        page.overall_score >= 80 ? "text-emerald-600" :
                        page.overall_score >= 60 ? "text-amber-600" :
                        "text-red-500"
                      }`}>
                        {page.overall_score}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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
              {pages.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                  Analyze your pages to get personalized optimization suggestions for improving AI visibility.
                </p>
              ) : (
                <div className="space-y-4">
                  {pages.flatMap((page) =>
                    (page.suggestions || []).map((suggestion, index) => (
                      <div
                        key={`${page.path}-${index}`}
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
                            <p className="mt-1 text-xs text-gray-400">Page: {page.path}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {pages.every((p) => !p.suggestions?.length) && (
                    <p className="py-4 text-center text-gray-500">
                      No suggestions yet. Run a page analysis to get optimization recommendations.
                    </p>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
