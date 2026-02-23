import { siteConfig } from "@/config/site.config";

export async function GET() {
  const { name, tagline, description, url, geo, landing, pricing } = siteConfig;

  if (!geo?.llmsTxt?.enabled) {
    return new Response("Not Found", { status: 404 });
  }

  const lines = [];

  lines.push(`# ${name}`);
  lines.push("");
  lines.push(`> ${tagline}`);
  lines.push("");
  lines.push(description);
  lines.push("");

  if (geo.llmsTxt.preamble) {
    lines.push(geo.llmsTxt.preamble);
    lines.push("");
  }

  if (geo.about?.enabled && geo.about.blurb) {
    lines.push("## About");
    lines.push("");
    lines.push(geo.about.blurb);
    lines.push("");
  }

  if (landing?.features?.length) {
    lines.push("## Features");
    lines.push("");
    landing.features.forEach((f) => {
      lines.push(`- **${f.title}**: ${f.description}`);
    });
    lines.push("");
  }

  if (pricing?.plans?.length) {
    lines.push("## Pricing");
    lines.push("");
    pricing.plans.forEach((plan) => {
      const featureList = plan.features.join(", ");
      lines.push(
        `- **${plan.name}** ($${plan.price}): ${plan.description}. Includes: ${featureList}.`
      );
    });
    lines.push("");
  }

  if (geo.faq?.enabled && geo.faq.items?.length) {
    lines.push("## FAQ");
    lines.push("");
    geo.faq.items.forEach((item) => {
      lines.push(`### ${item.question}`);
      lines.push("");
      lines.push(item.answer);
      lines.push("");
    });
  }

  lines.push("## Pages");
  lines.push("");
  lines.push(`- [Home](${url}/): Main landing page`);
  lines.push(
    `- [Privacy Policy](${url}/legal/privacy-policy): Privacy policy`
  );
  lines.push(`- [Terms of Service](${url}/legal/terms): Terms of service`);

  if (geo.llmsTxt.extraPages?.length) {
    geo.llmsTxt.extraPages.forEach((page) => {
      lines.push(
        `- [${page.title}](${url}${page.path}): ${page.description}`
      );
    });
  }

  lines.push("");
  lines.push("---");
  lines.push(
    `Last updated: ${geo.about?.lastUpdated || new Date().toISOString().split("T")[0]}`
  );

  const content = lines.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
