"use client";

import { Separator } from "@/components/ui/separator";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  const lastUpdated = "June 1, 2026";

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Privacy Policy</h1>
        <p className="text-zinc-500">Last updated: {lastUpdated}</p>
      </div>
      
      <Separator className="bg-zinc-800" />

      <div className="prose prose-zinc prose-invert max-w-none text-zinc-400 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Name and email address.</li>
            <li>Payment information (processed securely by Stripe).</li>
            <li>API keys for third-party AI services (stored encrypted).</li>
            <li>Project data and generated book content.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, maintain, and improve our Service.</li>
            <li>Process transactions and send related information.</li>
            <li>Authenticate your access and secure your account.</li>
            <li>Communicate with you about updates and support.</li>
          </ul>
        </section>

        <section className="space-y-3" id="gdpr">
          <h2 className="text-xl font-bold text-zinc-100">3. Data Security & Encryption</h2>
          <p>
            Security is our top priority. We use industry-standard encryption to protect your 
            data at rest and in transit. Your API keys are encrypted using Fernet symmetric 
            encryption and are only decrypted in memory during active job execution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">4. Sharing of Information</h2>
          <p>
            We do not share your personal information with third parties except as necessary to 
            provide the Service (e.g., sending prompts to OpenAI or Stability AI via your 
            provided keys) or as required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">5. Your Choices</h2>
          <p>
            You may access, update, or delete your account information at any time through your 
            account settings. You can also revoke our access to your AI API keys by deleting 
            them from the dashboard.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">6. Cookies</h2>
          <p>
            We use cookies to maintain your session and improve your user experience. For more 
            information, please see our <a href="/cookies" className="text-indigo-400 hover:underline">Cookie Policy</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">7. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>
      </div>

      <div className="pt-8 text-sm text-zinc-500 border-t border-zinc-800">
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@kdpstudio.ai.</p>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
