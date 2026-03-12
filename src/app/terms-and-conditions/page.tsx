import Footer from "@/components/Footer";
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-[#232221] text-[#F7F7F7] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <button className="mt-8 cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[#333130] bg-[#2A2927] px-5 py-2.5 text-sm font-medium text-[#F7F7F7] hover:bg-[#333130] hover:text-[#CFFF5E] transition-colors">
              ← Back to home
            </button>
          </Link>
          <header className="py-12 border-b border-[#333130] mb-12">
            <span className="block text-3xl font-bold text-[#CFFF5E] tracking-tight">
              Contri
            </span>
            <span className="text-sm text-gray-400">
              Group money, handled quietly.
            </span>
          </header>

          <h1 className="text-3xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">
            Last updated: March 2026
          </p>

          <p className="text-[#B0AFA9] mb-4">
            Your privacy matters to us. This Privacy Policy explains how Contri
            collects, uses, and protects your information when you use the
            Contri app.
          </p>

          <Section title="1. Information We Collect">
            <p>
              To provide the service, we collect limited information necessary
              to operate the app effectively.
            </p>

            <ul>
              <li>Name and profile information</li>
              <li>Email or authentication identifier</li>
              <li>Group names, expenses, balances, and notes</li>
              <li>Basic device and usage data for reliability</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your information to:</p>

            <ul>
              <li>Provide group expense tracking</li>
              <li>Display balances between users</li>
              <li>Improve performance and reliability</li>
              <li>Send important service updates</li>
            </ul>
          </Section>

          <Section title="3. Payments">
            <p>
              Contri does not process or store payments. When you select
              <span className="text-[#CFFF5E] font-semibold"> Pay via UPI</span>
              , the app opens your UPI app (GPay, PhonePe, Paytm, etc.) with
              pre-filled payment details.
            </p>

            <p>
              All payments occur inside your UPI app. Contri never holds or
              processes your money.
            </p>
          </Section>

          <Section title="4. Data Sharing">
            <p>
              We do not sell personal data. Information is only shared with
              group members so balances can be calculated.
            </p>

            <p>
              Limited information may be shared with trusted infrastructure
              providers necessary to operate the service.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement reasonable technical safeguards to protect your data
              against unauthorized access or misuse.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              Your information is stored only as long as necessary to provide
              the service. When you delete your account, your personal data is
              removed according to our data retention policies.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <ul>
              <li>Access your data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account from settings</li>
            </ul>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Contri is not intended for children under 13 and we do not
              knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. Significant
              changes will be communicated through the app or via email.
            </p>
          </Section>

          <div className="h-px bg-[#333130] my-10"></div>

          <div className="bg-[#2A2927] border border-[#333130] rounded-xl p-6">
            <p className="font-bold text-lg mb-2">Questions?</p>

            <p className="text-[#B0AFA9] mb-2">
              If you have questions about this Privacy Policy:
            </p>

            <p className="text-[#B0AFA9]">
              Email:{" "}
              <a
                href="mailto:help@contri.money"
                className="text-[#CFFF5E] hover:underline"
              >
                help@contri.money
              </a>
            </p>

            <p className="text-[#B0AFA9]">
              Website:{" "}
              <a
                href="https://contri.money"
                className="text-[#CFFF5E] hover:underline"
              >
                contri.money
              </a>
            </p>
          </div>
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
    <section className="mt-10">
      <h2 className="text-lg font-bold mb-3">{title}</h2>

      <div className="text-[#B0AFA9] space-y-3">{children}</div>

      <ul className="list-disc pl-5 mt-3 space-y-2 text-[#B0AFA9]">
        {Array.isArray(children) ? null : ""}
      </ul>
    </section>
  );
}
