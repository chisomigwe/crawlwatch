import { siteConfig } from "@/config/site.config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}`,
  alternates: {
    canonical: "/legal/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Legal", href: "/legal" },
            { name: "Terms of Service", href: "/legal/terms" },
          ]}
        />
        <h1 className="font-bebas text-6xl mb-4">Terms of Service</h1>
        <LastUpdated date={siteConfig.legal.effectiveDate} />

        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using {siteConfig.name} (&quot;the Service&quot;), you agree
              to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p>
              {siteConfig.name} provides {siteConfig.description}. The Service is provided
              &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className="mb-4">When you create an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Upload malicious code or attempt to hack the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
            <p className="mb-4">For paid features:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments are processed securely through Stripe</li>
              <li>Prices are listed in {siteConfig.pricing.currency} unless otherwise stated</li>
              <li>Payments are non-refundable unless required by law or stated otherwise</li>
              <li>We reserve the right to change pricing with notice</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned
              by {siteConfig.legal.companyName} and are protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. User Content</h2>
            <p>
              You retain ownership of any content you upload to the Service. By uploading
              content, you grant us a limited license to process and store that content
              solely for the purpose of providing the Service to you.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-800">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. WE
                DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT.
              </p>
            </div>
            <p>
              We do not warrant that the Service will be uninterrupted, secure, or
              error-free.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {siteConfig.legal.companyName.toUpperCase()}
              SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES. OUR TOTAL LIABILITY
              SHALL NOT EXCEED {siteConfig.legal.maxLiability}.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {siteConfig.legal.companyName}, its
              officers, directors, employees, and agents from any claims, damages, losses,
              or expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice, for any reason, including breach of these
              Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws
              of {siteConfig.legal.jurisdiction}, without regard to its conflict of law
              provisions.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide
              notice of significant changes. Your continued use of the Service after
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:{" "}
              <a
                href={`mailto:${siteConfig.emails.legal}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.emails.legal}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
