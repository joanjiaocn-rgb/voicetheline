import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | Voice the Line",
  description: "How Voice the Line handles microphone access and browser recordings.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <main className="legal-page"><header className="legal-header"><Link className="wordmark" href="/"><span className="wordmark-mark">V</span><span className="wordmark-name">VOICE THE LINE</span><b>CUE STUDIO</b></Link><Link className="legal-back" href="/">Back to studio</Link></header><article className="legal-content"><span className="section-kicker">Privacy</span><h1>Your voice stays with you.</h1><p className="legal-updated">Last updated: August 30, 2026</p><p>Voice the Line is a browser-based voice over game. This page describes the data handling in the current version of the site.</p><h3>Microphone access</h3><p>Recording is optional. If you choose to record, your browser asks for microphone permission. The site uses that permission only to create your local take.</p><h3>Voice recordings</h3><p>Your recording is kept in the browser during your session and is not uploaded to Voice the Line servers. When you export a take, your browser downloads a WebM file to your device.</p><h3>Accounts and tracking</h3><p>The current version does not require an account and does not include an analytics or advertising tracker. The browser may retain ordinary technical data such as cached site assets.</p><h3>Third-party services</h3><p>The site is delivered through Cloudflare Pages. Your browser may also request fonts from Google Fonts because the interface uses hosted web fonts.</p><h3>Contact</h3><p>For questions about this policy, contact the site owner through the GitHub repository linked from the project deployment.</p></article><footer className="site-footer legal-footer"><div><strong>VOICE THE LINE</strong><span>Original scenes for your next take.</span></div><nav aria-label="Footer navigation"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></footer></main>;
}
