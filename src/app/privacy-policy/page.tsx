import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <main className="bg-[#232221] text-[#F7F7F7] min-h-screen px-5 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <button className="mt-8 cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[#333130] bg-[#2A2927] px-5 py-2.5 text-sm font-medium text-[#F7F7F7] hover:bg-[#333130] hover:text-[#CFFF5E] transition-colors">
              ← Back to home
            </button>
          </Link>
          {/* Header */}
          <header className="py-12 border-b border-[#333130] mb-12">
            <span className="block text-3xl font-bold text-[#CFFF5E] tracking-tight">
              Contri
            </span>
            <span className="text-sm text-gray-400">
              Group money, handled quietly.
            </span>
          </header>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-12">
            Effective date: March 11, 2026 · Last updated: March 11, 2026
          </p>

          {/* Highlight Box */}
          <div className="bg-[#2A2927] border border-[#333130] border-l-[3px] border-l-[#CFFF5E] rounded-xl p-5 mb-12 text-sm">
            <strong>The short version:</strong> Contri never holds, stores, or
            moves your money. Payments happen directly in your UPI app. We
            collect only what we need to make group expenses work, and we never
            sell your data.
          </div>

          {/* Section */}
          <Section title="1. Who We Are">
            <p>
              Contri (we, our, us) is a group expense coordination app built for
              India. Our app is available on Android. Our website is{" "}
              <Link href="/" className="text-[#CFFF5E] hover:underline">
                contri.money
              </Link>
              .
            </p>
            <p>
              For privacy-related questions contact us at{" "}
              <a
                href="mailto:help@contri.money"
                className="text-[#CFFF5E] hover:underline"
              >
                help@contri.money
              </a>
              .
            </p>
          </Section>

          <Divider />

          <Section title="2. Information We Collect">
            <p>We collect information you provide when using Contri:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account information</strong> — name, phone number,
                email, and date of birth
              </li>
              <li>
                <strong>UPI ID</strong> — optionally provided to prefill
                settlement payments
              </li>
              <li>
                <strong>Group and expense data</strong> — group names, expenses,
                descriptions, and split information
              </li>
              <li>
                <strong>Device information</strong> — device type, OS, and FCM
                token
              </li>
              <li>
                <strong>Usage analytics</strong> — anonymised events via
                Firebase Analytics
              </li>
            </ul>

            <p>We never collect bank details, card numbers, or UPI PIN.</p>
          </Section>

          <Divider />

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and manage your account</li>
              <li>To display group balances and expenses</li>
              <li>To suggest settlements between members</li>
              <li>To send group activity notifications</li>
              <li>To verify identity via OTP</li>
              <li>To improve the app using anonymised analytics</li>
            </ul>

            <p>
              We do not use your information for advertising and never sell your
              data.
            </p>
          </Section>

          <Divider />

          <Section title="4. Payments — How They Work">
            <p>Contri is not a payment processor and does not move money.</p>

            <p>
              When you tap <strong>Pay via UPI</strong>, the app opens your UPI
              application (GPay, PhonePe, Paytm) through a deep link.
            </p>

            <p>
              The transaction happens entirely in that UPI app. Contri never
              sees or processes the payment.
            </p>

            <p>
              After completing the transfer you return and manually mark the
              expense as settled.
            </p>
          </Section>

          <Divider />

          <Section title="5. Data Storage and Security">
            <p>
              Your data is stored securely on Supabase (PostgreSQL). We use:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>HTTPS encryption for all data in transit</li>
              <li>Row-Level Security policies</li>
              <li>JWT authentication</li>
              <li>Rate limiting and brute-force protection</li>
              <li>Soft deletion to preserve financial records</li>
            </ul>
          </Section>

          <Divider />

          <Section title="6. Sharing Your Information">
            <p>We only share data in limited cases:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Within groups</strong> — group members see expense
                details and balances
              </li>
              <li>
                <strong>Service providers</strong> — Firebase, Supabase, and
                Resend used to run the service
              </li>
              <li>
                <strong>Legal requirements</strong> — if required by law
              </li>
            </ul>
          </Section>

          <Divider />

          <Section title="7. Your Rights">
            <p>You have the right to:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Access</strong> — request a copy of your data
              </li>
              <li>
                <strong>Correction</strong> — update your information anytime
              </li>
              <li>
                <strong>Deletion</strong> — delete your account from settings
              </li>
              <li>
                <strong>Opt-out</strong> — request analytics tracking removal
              </li>
            </ul>

            <p>
              Contact us at{" "}
              <a
                href="mailto:help@contri.money"
                className="text-[#CFFF5E] hover:underline"
              >
                help@contri.money
              </a>{" "}
              to exercise these rights.
            </p>
          </Section>

          <Divider />

          <Section title="8. Children's Privacy">
            <p>
              Contri is not intended for users under 13. If we discover that a
              child has provided personal data, we will delete it promptly.
            </p>
          </Section>

          <Divider />

          <Section title="9. Third-Party Services">
            <p>Contri uses third-party services:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Firebase</strong> — authentication, notifications,
                analytics
              </li>
              <li>
                <strong>Supabase</strong> — database infrastructure
              </li>
              <li>
                <strong>Resend</strong> — email OTP delivery
              </li>
              <li>
                <strong>Google Cloud Run</strong> — backend hosting
              </li>
            </ul>

            <p>
              UPI payments occur through third-party UPI apps and are governed
              by their privacy policies.
            </p>
          </Section>

          <Divider />

          <Section title="10. Changes to This Policy">
            <p>
              We may update this policy occasionally. When changes occur we
              update the “Last updated” date. Continued use of Contri means you
              accept the updated policy.
            </p>
          </Section>

          {/* Contact */}
          <div className="bg-[#2A2927] border border-[#333130] rounded-2xl p-6 mt-10">
            <h2 className="text-xl font-bold mb-2">Questions?</h2>

            <p className="mb-3">
              If you have any questions about this Privacy Policy:
            </p>

            <p>
              Email:{" "}
              <a
                href="mailto:help@contri.money"
                className="text-[#CFFF5E] hover:underline"
              >
                help@contri.money
              </a>
              <br />
              Website:{" "}
              <a
                href="https://contri.money"
                className="text-[#CFFF5E] hover:underline"
              >
                contri.money
              </a>
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-[#333130] text-sm text-gray-400">
            © 2026 Contri ·{" "}
            <a href="https://contri.money" className="hover:text-[#CFFF5E]">
              contri.money
            </a>{" "}
            · Made in India 🇮🇳
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="text-[#cccccc] space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function Divider() {
  return <hr className="border-t border-[#333130] my-10" />;
}
