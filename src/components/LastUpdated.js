import { siteConfig } from "@/config/site.config";

export function LastUpdated({ date }) {
  if (!siteConfig.geo?.contentFreshness?.showLastUpdated || !date) return null;

  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className="text-sm text-gray-400">
      Last updated: <time dateTime={date}>{formatted}</time>
    </p>
  );
}
