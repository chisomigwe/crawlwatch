import { siteConfig } from "@/config/site.config";
import { JsonLd } from "@/components/JsonLd";

export function TestimonialsSection() {
  const { geo, name } = siteConfig;
  if (!geo?.testimonials?.enabled || !geo.testimonials.items?.length)
    return null;

  const reviewSchemas = geo.testimonials.items.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
  }));

  return (
    <section
      className="bg-gray-50 py-20 sm:py-32"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="testimonials-heading"
            className="font-bebas text-4xl text-gray-900 sm:text-5xl"
          >
            What People Are Saying
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {geo.testimonials.items.map((testimonial, index) => (
            <blockquote
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <p className="italic text-gray-600">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-gray-900">
                    {testimonial.name}
                  </span>
                  {testimonial.title && (
                    <span className="block text-sm text-gray-500">
                      {testimonial.title}
                    </span>
                  )}
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          review: reviewSchemas,
        }}
      />
    </section>
  );
}
