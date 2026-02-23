import { siteConfig } from "@/config/site.config";

export function generatePageMetadata({ title, description, path = "/" }) {
  const { name, url } = siteConfig;
  const canonical = `${url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: canonical,
      siteName: name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${name}`,
      description,
    },
  };
}
