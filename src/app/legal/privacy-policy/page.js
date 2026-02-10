import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bebas text-6xl mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          Last Updated: {siteConfig.legal.effectiveDate}
        </p>

        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
              We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use our service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> When you create an account, we collect
                your email address and any other information you choose to provide.
              </li>
              <li>
                <strong>Payment Information:</strong> When you make a purchase, payment
                information is processed by our payment processor (Stripe). We do not store
                your full credit card details.
              </li>
              <li>
                <strong>Usage Data:</strong> We automatically collect information about how
                you interact with our service, including pages visited and features used.
              </li>
              <li>
                <strong>Uploaded Content:</strong> Any files or data you upload to our service
                for processing.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Clerk:</strong> For authentication and user management
              </li>
              <li>
                <strong>Stripe:</strong> For payment processing
              </li>
              <li>
                <strong>Supabase:</strong> For data storage
              </li>
              <li>
                <strong>Vercel:</strong> For hosting and analytics
              </li>
            </ul>
            <p className="mt-4">
              Each of these services has their own privacy policy governing how they handle
              your data.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to
              protect your personal information. However, no method of transmission over
              the Internet or electronic storage is 100% secure. We cannot guarantee
              absolute security.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed
              to provide you services. You may request deletion of your account and data at
              any time by contacting us.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request portability of your data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our
              service and hold certain information. You can instruct your browser to
              refuse all cookies or indicate when a cookie is being sent.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for individuals under the age of 18. We do not
              knowingly collect personal information from children. If you become aware
              that a child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new Privacy Policy on this page and updating the
              &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a
                href={`mailto:${siteConfig.emails.privacy}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.emails.privacy}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
