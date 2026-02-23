import { siteConfig } from "@/config/site.config";

export default function robots() {
  const { geo, url } = siteConfig;
  const config = geo?.robots || {};

  const blockedPaths = [
    "/api/",
    "/dashboard/",
    "/sign-in/",
    "/sign-up/",
    ...(config.additionalDisallow || []),
  ];

  const rules = [
    {
      userAgent: "*",
      allow: ["/", ...(config.additionalAllow || [])],
      disallow: blockedPaths,
    },
  ];

  if (config.allowAICrawlers !== false) {
    const aiCrawlers = [
      "GPTBot",
      "ChatGPT-User",
      "ClaudeBot",
      "Google-Extended",
      "PerplexityBot",
      "Amazonbot",
      "Applebot",
    ];
    aiCrawlers.forEach((bot) => {
      rules.push({
        userAgent: bot,
        allow: ["/"],
        disallow: blockedPaths,
      });
    });
  }

  return {
    rules,
    sitemap: `${url}/sitemap.xml`,
  };
}
