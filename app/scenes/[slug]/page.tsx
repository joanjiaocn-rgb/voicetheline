import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getScene, scenes } from "../../../lib/scenes";
import { assetPath } from "../../../lib/asset-path";

const siteUrl = "https://voicetheline.live";

type ScenePageProps = { params: Promise<{ slug: string }> };

const formatDuration = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return scenes.map((scene) => ({ slug: scene.slug }));
}

export async function generateMetadata({ params }: ScenePageProps): Promise<Metadata> {
  const { slug } = await params;
  const scene = getScene(slug);
  if (!scene) return {};
  const title = `${scene.title} Voice Over Scene | Voice the Line`;
  const description = `Practice voice acting in ${scene.title}, an original ${scene.genre.toLowerCase()} scene from Voice the Line. Follow timed cues and record your take online.`;
  return {
    title,
    description,
    alternates: { canonical: `/scenes/${scene.slug}/` },
    openGraph: {
      type: "article",
      url: `/scenes/${scene.slug}/`,
      title,
      description,
      siteName: "Voice the Line",
      images: [{ url: scene.image, width: 1672, height: 941, alt: `${scene.title} cinematic voice over scene` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [scene.image] },
  };
}

export default async function ScenePage({ params }: ScenePageProps) {
  const { slug } = await params;
  const scene = getScene(slug);
  if (!scene) notFound();
  const sceneIndex = scenes.findIndex((item) => item.slug === scene.slug);
  const relatedScenes = scenes.filter((item) => item.slug !== scene.slug).slice(0, 3);
  const title = `${scene.title} Voice Over Scene | Voice the Line`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: `${siteUrl}/scenes/${scene.slug}/`,
      description: scene.summary,
      primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${siteUrl}${scene.image}` },
      isPartOf: { "@type": "WebSite", name: "Voice the Line", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Voice the Line", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Voice Over Game Guide", item: `${siteUrl}/voice-over-game/` },
        { "@type": "ListItem", position: 3, name: scene.title, item: `${siteUrl}/scenes/${scene.slug}/` },
      ],
    },
  ];

  return (
    <main className="content-page scene-detail-page">
      <header className="content-header"><a className="wordmark" href="/#studio" title="Voice the Line home" aria-label="Voice the Line home"><span className="wordmark-mark">V</span><span className="wordmark-name">VOICE THE LINE</span><b>CUE STUDIO</b></a><a className="content-header-link" href="/voice-over-game/" title="Read the voice over game guide">Voice over game guide <span aria-hidden="true">-&gt;</span></a></header>
      <div className="scene-detail-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/" title="Voice the Line home">Voice the Line</a><span aria-hidden="true">/</span><a href="/voice-over-game/" title="Voice over game guide">Voice over game</a><span aria-hidden="true">/</span><span>{scene.title}</span></nav>
        <section className="scene-detail-hero"><div className="scene-detail-copy"><span className="section-kicker">Original scene {String(sceneIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span><h1>{scene.title}: voice over game scene</h1><p>{scene.summary}</p><div className="scene-facts"><span>{scene.genre}</span><span>{formatDuration(scene.duration)}</span><span>Timed dialogue</span></div><a className="content-button primary" href={`/?scene=${scene.slug}#studio`} title={`Play the ${scene.title} scene`}>Play this scene</a></div><div className="scene-detail-media"><Image src={assetPath(scene.image)} alt={`${scene.title} cinematic voice over scene`} fill priority sizes="(max-width: 820px) 100vw, 58vw" style={{ objectPosition: scene.positioning }} /></div></section>
        <section className="scene-detail-content"><article className="scene-note"><span className="section-kicker">Performance note</span><h2>Find the tone before the line</h2><p>{scene.performanceFocus}</p><a className="text-link" href={`/?scene=${scene.slug}#studio`} title={`Open the ${scene.title} scene in the studio`}>Open this scene in the studio <span aria-hidden="true">-&gt;</span></a></article><div className="scene-script"><span className="section-kicker">Timed script</span><h2>Lines to perform</h2><div className="scene-line-list">{scene.lines.map((line) => <div className="scene-line" key={`${line.speaker}-${line.time}`}><time>{formatDuration(line.time)}</time><div><strong>{line.speaker}</strong><p>{line.text}</p></div></div>)}</div></div></section>
        <section className="related-scenes" aria-labelledby="related-scenes-title"><div className="guide-section-heading guide-section-heading-row"><div><span className="section-kicker">Keep exploring</span><h2 id="related-scenes-title">More voice over scenes</h2></div><a className="text-link" href="/voice-over-game/#scene-library" title="View all Voice the Line scenes">View all 8 scenes <span aria-hidden="true">-&gt;</span></a></div><div className="related-scene-grid">{relatedScenes.map((item) => <a href={`/scenes/${item.slug}/`} title={`Open the ${item.title} voice over scene`} key={item.slug}><Image src={assetPath(item.image)} alt={`${item.title} voice over scene`} width={420} height={236} /><span><strong>{item.title}</strong><small>{item.genre}</small></span></a>)}</div></section>
      </div>
      <footer className="content-footer"><div><strong>VOICE THE LINE</strong><span>Original scenes for your next take.</span></div><nav aria-label="Footer navigation"><a href="/#studio">Play online</a><a href="/voice-over-game/">Guide</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
    </main>
  );
}
