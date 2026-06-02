"use client";

import { Separator } from "@/components/ui/separator";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CookiePolicyPage() {
  const lastUpdated = "June 1, 2026";

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Cookie Policy</h1>
        <p className="text-zinc-500">Last updated: {lastUpdated}</p>
      </div>
      
      <Separator className="bg-zinc-800" />

      <div className="prose prose-zinc prose-invert max-w-none text-zinc-400 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">1. What are cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. 
            They are widely used to make websites work or work more efficiently, as well as to 
            provide information to the owners of the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">2. How we use cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> These are necessary for the website to function 
                properly, such as maintaining your login session and security.</li>
            <li><strong>Performance Cookies:</strong> These help us understand how visitors interact 
                with our site by collecting and reporting information anonymously.</li>
            <li><strong>Functional Cookies:</strong> These allow us to remember choices you make and 
                provide enhanced, more personal features.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">3. Types of cookies we use</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-zinc-800 text-sm">
              <thead>
                <tr className="bg-zinc-900/50">
                  <th className="border border-zinc-800 p-2 text-left text-zinc-100">Cookie Type</th>
                  <th className="border border-zinc-800 p-2 text-left text-zinc-100">Purpose</th>
                  <th className="border border-zinc-800 p-2 text-left text-zinc-100">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-zinc-800 p-2 text-zinc-300">Authentication</td>
                  <td className="border border-zinc-800 p-2 text-zinc-400">Keeps you signed in</td>
                  <td className="border border-zinc-800 p-2 text-zinc-500">Session</td>
                </tr>
                <tr>
                  <td className="border border-zinc-800 p-2 text-zinc-300">Preferences</td>
                  <td className="border border-zinc-800 p-2 text-zinc-400">Remembers your settings</td>
                  <td className="border border-zinc-800 p-2 text-zinc-500">1 year</td>
                </tr>
                <tr>
                  <td className="border border-zinc-800 p-2 text-zinc-300">Analytics</td>
                  <td className="border border-zinc-800 p-2 text-zinc-400">Improves site performance</td>
                  <td className="border border-zinc-800 p-2 text-zinc-500">30 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">4. Managing cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. 
            However, if you limit the ability of websites to set cookies, you may worsen your 
            overall user experience, as it will no longer be personalized to you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-100">5. More information</h2>
          <p>
            For more information about our use of cookies, please contact us at 
            support@kdpstudio.ai.
          </p>
        </section>
      </div>

      <div className="pt-8 text-sm text-zinc-500 border-t border-zinc-800 text-center">
        <p>&copy; {new Date().getFullYear()} KDP Studio. All rights reserved.</p>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
