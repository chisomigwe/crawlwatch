"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { Crown, Zap } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [proStatus, setProStatus] = useState({ isPro: false, loading: true });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Check pro status on load
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
      // Sync user to Supabase
      fetch("/api/user/sync", { method: "POST" }).catch(console.error);
      checkStatus();
    }
  }, [isLoaded, user]);

  // Handle upgrade click
  async function handleUpgrade() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
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
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-gray-900 sm:text-5xl">
          Welcome back, {user?.firstName || "there"}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Status Card */}
        <Card>
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              {proStatus.isPro ? (
                <Crown className="h-5 w-5 text-blue-600" />
              ) : (
                <Zap className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-md font-semibold">Account Status</p>
              <p className="text-small text-default-500">
                {proStatus.loading ? (
                  "Loading..."
                ) : proStatus.isPro ? (
                  <span className="text-green-600">Pro Member</span>
                ) : (
                  <span className="text-gray-600">Free Plan</span>
                )}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            {!proStatus.isPro && !proStatus.loading && (
              <Button
                color="primary"
                className="w-full font-medium"
                onPress={handleUpgrade}
                isLoading={checkoutLoading}
              >
                Upgrade to Pro
              </Button>
            )}
            {proStatus.isPro && (
              <p className="text-sm text-gray-600">
                You have access to all Pro features.
              </p>
            )}
          </CardBody>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <p className="text-md font-semibold">Quick Actions</p>
              <p className="text-small text-default-500">
                Common tasks and actions
              </p>
            </div>
          </CardHeader>
          <CardBody className="gap-2">
            <Button variant="bordered" className="w-full justify-start">
              Create New Item
            </Button>
            <Button variant="bordered" className="w-full justify-start">
              View History
            </Button>
            <Button variant="bordered" className="w-full justify-start">
              Settings
            </Button>
          </CardBody>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <p className="text-md font-semibold">Your Stats</p>
              <p className="text-small text-default-500">
                Usage and activity
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items Created</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Month</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-semibold">0 MB</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <p className="text-md font-semibold">Your Items</p>
              <p className="text-small text-default-500">
                Manage your content here
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Zap className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No items yet
              </h3>
              <p className="mt-1 text-gray-600">
                Get started by creating your first item.
              </p>
              <Button color="primary" className="mt-4">
                Create Your First Item
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
