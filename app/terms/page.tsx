import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms | Voice the Line",
  description: "Terms for using the Voice the Line browser voice over game.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <main className="legal-page"><header className="legal-header"><Link className="wordmark" href="/"><span className="wordmark-mark">V</span><span className="wordmark-name">VOICE THE LINE</span><b>CUE STUDIO</b></Link><Link className="legal-back" href="/">Back to studio</Link></header><article className="legal-content"><span className="section-kicker">Terms</span><h1>Use the studio, make your take.</h1><p className="legal-updated">Last updated: August 30, 2026</p><p>By using Voice the Line, you agree to use the site lawfully and respectfully. These terms apply to the current browser-based version of the service.</p><h3>Use of the site</h3><p>You may use the original scenes and recording tools for personal practice, creative experimentation, and other lawful purposes. Do not attempt to disrupt the site or use it to record people without appropriate permission.</p><h3>Your recordings</h3><p>You control recordings made with your microphone. Voice the Line does not upload or claim ownership of your local takes. You are responsible for the content you record and share.</p><h3>Original scene materials</h3><p>The scripts, interface, and original scene assets are provided for use inside the Voice the Line experience. Do not represent them as your own or redistribute them as a separate stock library without permission.</p><h3>Availability</h3><p>The site is provided as a free tool and may change as the project develops. Browser microphone support, local recording formats, and download behavior can vary by device and browser.</p><h3>Questions</h3><p>For questions about these terms, contact the site owner through the GitHub repository linked from the project deployment.</p></article><footer className="site-footer legal-footer"><div><strong>VOICE THE LINE</strong><span>Original scenes for your next take.</span></div><nav aria-label="Footer navigation"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></footer></main>;
}
