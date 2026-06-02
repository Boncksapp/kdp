"use client";

import { Separator } from "@/components/ui/separator";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  const lastUpdated = "June 1, 2026";

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Terms of Service</h1>
        <p className="text-zinc-500">Last updated: {lastUpdated}</p>
      </div>
      
      <Separator className="bg-zinc-800" />

      <div className="prose prose-zinc prose-invert max-w-none text-zinc-400 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">1. Acceptance of Terms</h2>
          <p>
            By accessing and using KDP Studio ("the Service"), you agree to be bound by these Terms 
            of Service and all applicable laws and regulations. If you do not agree with any of 
            these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">2. Description of Service</h2>
          <p>
            KDP Studio provides an AI-orchestration platform for book generation and formatting. 
            The Service operates on a Bring-Your-Own-Key (BYOK) model, requiring users to provide 
            their own API keys for OpenAI and Stability AI.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">3. User Responsibilities</h2>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Maintaining the confidentiality of your account and API keys.</li>
            <li>All activities that occur under your account.</li>
            <li>Ensuring that the content generated does not violate any third-party rights or 
                Amazon KDP's content guidelines.</li>
            <li>Paying all costs associated with your AI provider usage.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">4. API Keys and Security</h2>
          <p>
            We encrypt your API keys at rest and only use them to fulfill your requests to the 
            AI providers. We do not store your keys in plain text. You may revoke or change 
            your keys at any time through the dashboard.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">5. Intellectual Property</h2>
          <p>
            KDP Studio does not claim ownership of any content generated through the Service. 
            Ownership of generated content is governed by the terms of service of the 
            respective AI providers (OpenAI and Stability AI).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">6. Subscription and Payments</h2>
          <p>
            Access to the Service is provided on a subscription basis. Fees are non-refundable 
            except as required by law. We reserve the right to change our fees upon 30 days notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">7. Limitation of Liability</h2>
          <p>
            KDP Studio shall not be liable for any damages arising out of the use or inability to 
            use the Service, including but not limited to damages for loss of data or profit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">8. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice, for 
            conduct that we believe violates these Terms or is harmful to other users of the 
            Service, us, or third parties, or for any other reason.
          </p>
        </section>
      </div>

      <div className="pt-8 text-sm text-zinc-500 border-t border-zinc-800">
        <p>If you have any questions about these Terms, please contact us at support@kdpstudio.ai.</p>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
