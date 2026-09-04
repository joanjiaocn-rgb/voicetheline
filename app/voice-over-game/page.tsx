import type { Metadata } from "next";
import Image from "next/image";
import { scenes } from "../../lib/scenes";

const siteUrl = "https://voicetheline.live";
const title = "Voice Over Game: Play Free Online | Voice the Line";
const description = "Play a free online voice over game with original cinematic scenes, timed dialogue cues, local recording, replay, and WebM export.";
const author = { "@type": "Person", name: "Joan Jiao", url: "https://github.com/joanjiaocn-rgb" };

const faqItems = [
  {
    question: "What is a voice over game?",
    answer: "A voice over game gives you a scene, timed dialogue cues, and a simple recording loop so you can perform a character and replay your take.",
  },
  {
    question: "How do I play Voice the Line?",
    answer: "Choose an original scene, press play to follow the cues, then allow microphone access and record your performance. You can listen again, start a new take, or export a WebM file.",
  },
  {
    question: "Are voice recordings uploaded?",
    answer: "No. Voice the Line keeps recordings in the browser while you use the site. Recording and WebM export happen locally on your device.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: title,
      url: `${siteUrl}/voice-over-game/`,
      description,
      author,
      datePublished: "2026-08-30",
      dateModified: "2026-09-04",
      isPartOf: { "@type": "WebSite", name: "Voice the Line", url: siteUrl },
    },
    {
      "@type": "WebApplication",
      name: "Voice the Line",
      url: siteUrl,
      applicationCategory: "GameApplication",
      operatingSystem: "Any web browser",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: ["Timed dialogue cues", "Local browser recording", "Take playback", "WebM export"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "ItemList",
      name: "Voice the Line original scenes",
      itemListElement: scenes.map((scene, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: scene.title,
        url: `${siteUrl}/scenes/${scene.slug}/`,
      })),
    },
  ],
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/voice-over-game/" },
  openGraph: {
    type: "article",
    url: "/voice-over-game/",
    title,
    description,
    siteName: "Voice the Line",
    images: [{ url: "/scenes/last-train-home.png", width: 1672, height: 941, alt: "A cinematic voice over scene from Voice the Line" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/scenes/last-train-home.png"] },
};

export default function VoiceOverGameGuide() {
  return (
    <main className="content-page">
      <header className="content-header">
        <a className="wordmark" href="/#studio" title="Voice the Line home" aria-label="Voice the Line home"><span className="wordmark-mark">V</span><span className="wordmark-name">VOICE THE LINE</span><b>CUE STUDIO</b></a>
        <a className="content-header-link" href="/#studio" title="Play the Voice the Line game">Play the game <span aria-hidden="true">-&gt;</span></a>
      </header>

      <section className="content-hero">
        <div className="content-hero-copy">
          <span className="section-kicker">The free browser voice over game</span>
          <h1>Voice over game practice with original scenes</h1>
          <p>Give a cinematic moment your voice. Voice the Line pairs short original scenes with timed cues, local recording, and quick replay so you can practice without an account or a download.</p>
          <p className="content-byline">Created by <a href="https://github.com/joanjiaocn-rgb" title="Joan Jiao on GitHub">Joan Jiao</a> - Updated <time dateTime="2026-09-04">September 4, 2026</time></p>
          <div className="content-actions"><a className="content-button primary" href="/#studio" title="Play Voice the Line online">Play online</a><a className="content-button secondary" href="#scene-library" title="Browse voice over scenes">Browse scenes</a></div>
        </div>
        <div className="content-hero-media"><Image src="/scenes/last-train-home.png" alt="A cinematic train platform scene ready for voice over practice" fill priority sizes="(max-width: 820px) 100vw, 50vw" /></div>
      </section>

      <div className="content-facts" aria-label="Voice the Line highlights"><div><strong>8</strong><span>original scenes</span></div><div><strong>0</strong><span>accounts required</span></div><div><strong>Local</strong><span>recording workflow</span></div><div><strong>WebM</strong><span>take export</span></div></div>

      <section className="guide-section" aria-labelledby="how-to-play-title">
        <div className="guide-section-heading"><span className="section-kicker">How it works</span><h2 id="how-to-play-title">How does this voice over game work?</h2><p>Every scene keeps the useful parts of a recording session in one place: a clear visual, an active cue, and a take you can hear back.</p></div>
        <div className="guide-steps"><article><span>01</span><h3>Choose a scene</h3><p>Start with drama, mystery, comedy, fantasy, or science fiction. Each scene has its own cast, pacing, and visual mood.</p></article><article><span>02</span><h3>Follow the cue</h3><p>Press play and watch the script panel. The current line stays visible while the timeline keeps your entrance on track.</p></article><article><span>03</span><h3>Record your take</h3><p>Allow microphone access, perform the lines, then replay, replace, or export your local WebM recording.</p></article></div>
      </section>

      <section className="guide-section guide-section-alt" id="scene-library" aria-labelledby="scene-library-title">
        <div className="guide-section-heading guide-section-heading-row"><div><span className="section-kicker">Original scene library</span><h2 id="scene-library-title">Find a scene that fits your voice</h2><p>Each scene is short enough for a quick take and specific enough to give you something to play.</p></div><a className="text-link" href="/#studio" title="Open the Voice the Line studio">Open the studio <span aria-hidden="true">-&gt;</span></a></div>
        <div className="guide-scene-grid">{scenes.map((scene) => <a className="guide-scene-card" href={`/scenes/${scene.slug}/`} title={`Open the ${scene.title} voice over scene`} key={scene.slug}><div className="guide-scene-image"><Image src={scene.image} alt={`${scene.title} voice over scene`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div><div className="guide-scene-copy"><span>{scene.genre}</span><strong>{scene.title}</strong><small>{scene.duration} seconds / View scene details -&gt;</small></div></a>)}</div>
      </section>

      <section className="guide-section guide-faq" aria-labelledby="guide-faq-title">
        <div className="guide-section-heading"><span className="section-kicker">Questions before your take</span><h2 id="guide-faq-title">What do players ask about voice over games?</h2></div>
        <div className="faq-list">{faqItems.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>

      <footer className="content-footer"><div><strong>VOICE THE LINE</strong><span>Original scenes for your next take.</span></div><nav aria-label="Footer navigation"><a href="/#studio" title="Play Voice the Line online">Play online</a><a href="/privacy/" title="Read the Voice the Line privacy policy">Privacy</a><a href="/terms/" title="Read the Voice the Line terms">Terms</a></nav></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
    </main>
  );
}
