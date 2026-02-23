import { siteConfig } from "@/config/site.config";
import { JsonLd } from "@/components/JsonLd";
import { getFAQSchema } from "@/lib/structured-data";

export function FAQSection() {
  const { geo } = siteConfig;
  if (!geo?.faq?.enabled || !geo.faq.items?.length) return null;

  return (
    <section className="py-20 sm:py-32" id="faq" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="faq-heading"
            className="font-bebas text-4xl text-gray-900 sm:text-5xl"
          >
            {geo.faq.title}
          </h2>
          {geo.faq.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {geo.faq.subtitle}
            </p>
          )}
        </div>

        <div className="mt-12 space-y-4">
          {geo.faq.items.map((item, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-gray-900">
                {item.question}
                <span className="ml-4 text-gray-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-gray-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <JsonLd data={getFAQSchema()} />
    </section>
  );
}
