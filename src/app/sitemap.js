import { siteConfig } from "@/config/site.config";

export default function sitemap() {
  const { url, geo } = siteConfig;
  const config = geo?.sitemap || {};
  const freq = config.changeFrequency || "weekly";
  const priorities = config.priority || {};

  const staticPages = [
    { path: "/", priority: priorities.home ?? 1.0 },
    { path: "/legal/privacy-policy", priority: priorities.legal ?? 0.3 },
    { path: "/legal/terms", priority: priorities.legal ?? 0.3 },
  ];

  const entries = staticPages.map((page) => ({
    url: `${url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority: page.priority,
  }));

  if (config.additionalUrls?.length) {
    config.additionalUrls.forEach((extra) => {
      entries.push({
        url: extra.startsWith("http") ? extra : `${url}${extra}`,
        lastModified: new Date(),
        changeFrequency: freq,
        priority: 0.5,
      });
    });
  }

  return entries;
}
