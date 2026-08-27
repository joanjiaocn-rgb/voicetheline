import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://voicetheline.live";
const title = "Voice the Line | Free Online Voice Over Game";
const description = "Perform original cinematic scenes, follow timed dialogue cues, record your voice locally, replay every take, and export it free in your browser.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Voice the Line",
  keywords: ["voice over game", "voice acting game", "online dubbing game", "voice over practice", "voice acting practice"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Voice the Line",
    title,
    description,
    locale: "en_US",
    images: [{ url: "/scenes/last-train-home.png", width: 1672, height: 941, alt: "A cinematic train platform scene from Voice the Line" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/scenes/last-train-home.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Voice the Line",
    url: siteUrl,
    description,
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      </body>
    </html>
  );
}
