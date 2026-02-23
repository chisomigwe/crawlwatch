import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { JsonLd } from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export function Breadcrumbs({ items }) {
  if (!siteConfig.geo?.breadcrumbs?.enabled || !items?.length) return null;

  const schemaItems = items.map((item) => ({
    name: item.name,
    url: item.href,
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <span
                className="font-medium text-gray-900"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-gray-900"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={getBreadcrumbSchema(schemaItems)} />
    </nav>
  );
}
