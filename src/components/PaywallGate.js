"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { Lock, Sparkles } from "lucide-react";
import { UpgradeModal } from "./UpgradeModal";

/**
 * PaywallGate - Wraps content that should only be accessible to Pro users
 *
 * Usage:
 * <PaywallGate>
 *   <YourProOnlyContent />
 * </PaywallGate>
 */
export function PaywallGate({ children, fallback }) {
  const { isSignedIn } = useAuth();
  const [proStatus, setProStatus] = useState({ isPro: false, loading: true });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      if (!isSignedIn) {
        setProStatus({ isPro: false, loading: false });
        return;
      }

      try {
        const res = await fetch("/api/check-pro-status");
        const data = await res.json();
        setProStatus({ ...data, loading: false });
      } catch (error) {
        console.error("Error checking pro status:", error);
        setProStatus({ isPro: false, loading: false });
      }
    }

    checkStatus();
  }, [isSignedIn]);

  // Show loading state
  if (proStatus.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  // Show content if user is Pro
  if (proStatus.isPro) {
    return <>{children}</>;
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default paywall UI
  return (
    <>
      <Card className="mx-auto max-w-md">
        <CardBody className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Pro Feature
          </h3>
          <p className="mt-2 text-gray-600">
            Upgrade to Pro to unlock this feature and many more.
          </p>
          <Button
            color="primary"
            className="mt-6 font-medium"
            onPress={() => setShowModal(true)}
            startContent={<Sparkles className="h-4 w-4" />}
          >
            Upgrade to Pro
          </Button>
        </CardBody>
      </Card>

      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
