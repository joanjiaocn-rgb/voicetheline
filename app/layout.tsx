import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID } from "../lib/analytics";

const siteUrl = "https://voicetheline.live";
const title = "Voice the Line | Free Online Voice Over Game";
const description = "Perform original cinematic scenes, follow timed dialogue cues, record your voice locally, replay every take, and export it free in your browser.";

export const viewport: Viewport = {
  themeColor: "#eeeee9",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Voice the Line",
  creator: "Voice the Line",
  publisher: "Voice the Line",
  category: "entertainment",
  keywords: ["voice over game", "voice acting game", "online dubbing game", "voice over practice", "voice acting practice"],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", type: "image/x-icon", sizes: "32x32" },
      { url: "/favicon.png?v=3", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico?v=3",
  },
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
  return (
    <html lang="en">
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });`}
        </Script>
      </body>
    </html>
  );
}
