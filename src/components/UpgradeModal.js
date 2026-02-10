"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Check, Sparkles } from "lucide-react";
import { siteConfig, formatPrice } from "@/config/site.config";

export function UpgradeModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
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
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>Upgrade to Pro</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-600">
            Unlock all features and get the most out of {siteConfig.name}.
          </p>

          <div className="mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <div className="text-center">
              <span className="text-3xl font-bold">
                {formatPrice(siteConfig.pricing.proPrice)}
              </span>
              <span className="text-blue-100"> one-time</span>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {siteConfig.upgradeFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Maybe Later
          </Button>
          <Button
            color="primary"
            onPress={handleUpgrade}
            isLoading={loading}
            className="font-medium"
          >
            Upgrade Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
