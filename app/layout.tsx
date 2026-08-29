import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
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
      <body>{children}</body>
    </html>
  );
}
