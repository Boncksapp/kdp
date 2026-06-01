import type { Metadata } from "next";
import LandingPageContent from "./landing-content";

export const metadata: Metadata = {
  title: "KDP Studio — AI-Powered Book Publishing for Amazon KDP",
  description:
    "Create professional KDP-ready books in minutes with AI. SDXL illustrations, GPT-4 planning, and one-click PDF/EPUB export. Start publishing today.",
  keywords: [
    "KDP book creator",
    "AI book generator",
    "Amazon KDP publishing",
    "self-publishing tool",
    "AI illustrations",
    "book cover designer",
    "KDP compliant PDF",
    "coloring book generator",
    "AI author tool",
  ],
  openGraph: {
    title: "KDP Studio — AI-Powered Book Publishing",
    description:
      "Create professional KDP-ready books in minutes with AI. SDXL illustrations, GPT-4 planning, and one-click PDF/EPUB export.",
    type: "website",
    locale: "en_US",
    siteName: "KDP Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "KDP Studio — AI-Powered Book Publishing",
    description:
      "Create professional KDP-ready books in minutes with AI. SDXL illustrations, GPT-4 planning, and one-click PDF/EPUB export.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function LandingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "KDP Studio",
            applicationCategory: "Multimedia",
            operatingSystem: "Web",
            description:
              "Create professional KDP-ready books in minutes with AI. SDXL illustrations, GPT-4 planning, and one-click PDF/EPUB export.",
            offers: {
              "@type": "Offer",
              price: "19",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "KDP Studio",
            },
          }),
        }}
      />
      <LandingPageContent />
    </>
  );
}