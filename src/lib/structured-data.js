import { siteConfig } from "@/config/site.config";

export function getWebSiteSchema() {
  const { name, url, description } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  };
}

export function getOrganizationSchema() {
  const { geo, name, url, description, logo, social, emails } = siteConfig;
  if (!geo?.enabled) return null;

  const sameAs = [
    social.twitter,
    social.instagram,
    social.linkedin,
    social.youtube,
    social.github,
    ...(geo.organization?.sameAs || []),
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": geo.organization?.type || "Organization",
    name,
    url,
    description,
    logo: logo.path ? `${url}${logo.path}` : undefined,
    foundingDate: geo.organization?.foundingDate,
    founder: geo.organization?.founders
      ?.filter((f) => f.name && f.name !== "Your Name")
      .map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.title,
        ...(f.url && { url: f.url }),
      })),
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      email: emails.support,
      contactType: "customer support",
    },
  };
}

export function getSoftwareApplicationSchema() {
  const { geo, name, url, description } = siteConfig;
  if (!geo?.enabled || !geo.product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": geo.product.type || "SoftwareApplication",
    name,
    url,
    description,
    applicationCategory: geo.product.applicationCategory,
    operatingSystem: geo.product.operatingSystem,
    offers: {
      "@type": "Offer",
      price: geo.product.offers?.price || "0",
      priceCurrency: geo.product.offers?.priceCurrency || "USD",
      ...(geo.product.offers?.priceValidUntil && {
        priceValidUntil: geo.product.offers.priceValidUntil,
      }),
    },
  };

  if (geo.product.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ...geo.product.aggregateRating,
    };
  }
  if (geo.product.downloadUrl) schema.downloadUrl = geo.product.downloadUrl;
  if (geo.product.screenshot) schema.screenshot = geo.product.screenshot;

  return schema;
}

export function getFAQSchema() {
  const { geo } = siteConfig;
  if (!geo?.enabled || !geo.faq?.enabled || !geo.faq.items?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: geo.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(pathSegments) {
  const { url } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pathSegments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: segment.name,
      item: `${url}${segment.url}`,
    })),
  };
}

export function getAllSchemas(extras = []) {
  return [
    getWebSiteSchema(),
    getOrganizationSchema(),
    getSoftwareApplicationSchema(),
    ...extras,
  ].filter(Boolean);
}
