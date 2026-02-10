"use client";

import { useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { generateCSSVariables, heroUITheme } from "@/config/theme.config";

export function Providers({ children }) {
  const router = useRouter();

  // Inject CSS variables on mount
  useEffect(() => {
    const cssVars = generateCSSVariables();
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return (
    <HeroUIProvider navigate={router.push} theme={heroUITheme}>
      {children}
    </HeroUIProvider>
  );
}
