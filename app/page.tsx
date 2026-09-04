"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Download, Headphones, Keyboard, Mic, MoreHorizontal, Pause, Play, RotateCcw, SlidersHorizontal, Volume2, X } from "lucide-react";
import { scenes } from "../lib/scenes";
import { trackEvent } from "../lib/analytics";

type FaqItem = { question: string; answer: string };

const faqItems: FaqItem[] = [
  { question: "What is Voice the Line?", answer: "Voice the Line is a free online voice over game where you perform dialogue from original cinematic scenes." },
  { question: "Do I need an account to play?", answer: "No. You can choose a scene, follow the timed cues, and record a take without creating an account." },
  { question: "Where is my voice recording stored?", answer: "Your recording stays in your browser while you use the site. It is not uploaded to a server, and you can export it as a WebM file." },
  { question: "Can I use Voice the Line to practice voice acting?", answer: "Yes. The timed script, character lines, retakes, and local playback make it useful for casual voice acting practice." },
];

const siteOwner = {
  name: "Joan Jiao",
  profileUrl: "https://github.com/joanjiaocn-rgb",
  repositoryUrl: "https://github.com/joanjiaocn-rgb/voicetheline",
  contactUrl: "https://github.com/joanjiaocn-rgb/voicetheline/issues",
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Voice the Line",
    url: "https://voicetheline.live",
    founder: { "@type": "Person", name: siteOwner.name, url: siteOwner.profileUrl },
    sameAs: [siteOwner.repositoryUrl, siteOwner.profileUrl],
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: siteOwner.contactUrl },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Voice the Line | Free Online Voice Over Game",
    url: "https://voicetheline.live",
    author: { "@type": "Person", name: siteOwner.name, url: siteOwner.profileUrl },
    datePublished: "2026-08-27",
    dateModified: "2026-09-04",
    citation: [
      "https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder",
      "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Voice the Line",
    url: "https://voicetheline.live",
    description: "A free online voice over game with original cinematic scenes and local recording.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Voice the Line",
    url: "https://voicetheline.live",
    description: "Perform original cinematic scenes, follow timed dialogue cues, record your voice locally, replay every take, and export it free in your browser.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    browserRequirements: "Requires microphone permission for recording",
    featureList: ["Timed dialogue cues", "Local browser recording", "Take playback", "WebM export"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

const formatTime = (seconds: number) => `00:${Math.max(0, Math.floor(seconds)).toString().padStart(2, "0")}`;

export default function Home() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<"idle" | "recording" | "done" | "error">("idle");
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [take, setTake] = useState(1);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scene = scenes[sceneIndex];

  useEffect(() => {
    const requestedSlug = new URLSearchParams(window.location.search).get("scene");
    const requestedIndex = scenes.findIndex((item) => item.slug === requestedSlug);
    if (requestedIndex >= 0) setSceneIndex(requestedIndex);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const startedAt = Date.now() - playhead * 1000;
    const timer = window.setInterval(() => {
      const next = (Date.now() - startedAt) / 1000;
      if (next >= scene.duration) { setPlayhead(scene.duration); setIsPlaying(false); } else setPlayhead(next);
    }, 60);
    return () => window.clearInterval(timer);
  }, [isPlaying, playhead, scene.duration]);

  useEffect(() => {
    if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsPlaying(false); setPlayhead(0); setRecording(false);
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    setRecordingUrl(null); setRecordingStatus("idle"); setTake(1);
    // Changing scenes starts a fresh local take.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIndex]);

  useEffect(() => () => { streamRef.current?.getTracks().forEach((track) => track.stop()); if (recordingUrl) URL.revokeObjectURL(recordingUrl); }, [recordingUrl]);

  const stopRecording = useCallback(() => { if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop(); setRecording(false); }, []);
  const togglePlayback = () => { if (playhead >= scene.duration) setPlayhead(0); setIsPlaying((value) => { if (!value) trackEvent("play_scene", { scene_name: scene.title }); return !value; }); };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { setRecordingStatus("error"); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; chunksRef.current = [];
      if (recordingUrl) URL.revokeObjectURL(recordingUrl);
      setRecordingUrl(null);
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => event.data.size && chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setRecordingUrl(URL.createObjectURL(blob)); stream.getTracks().forEach((track) => track.stop()); setRecordingStatus("done");
      };
      recorder.start(); trackEvent("start_recording", { scene_name: scene.title }); setRecording(true); setRecordingStatus("recording"); setPlayhead(0); setIsPlaying(true);
    } catch { setRecordingStatus("error"); }
  };

  const resetTake = () => { stopRecording(); setIsPlaying(false); setPlayhead(0); if (recordingUrl) URL.revokeObjectURL(recordingUrl); setRecordingUrl(null); setRecordingStatus("idle"); setTake((value) => value + 1); };
  const downloadTake = () => { if (!recordingUrl) return; trackEvent("export_take", { scene_name: scene.title, take_number: take }); const link = document.createElement("a"); link.href = recordingUrl; link.download = `cue-${scene.title.toLowerCase().replaceAll(" ", "-")}-take-${take}.webm`; link.click(); };
  const activeLine = scene.lines.reduce((current, line, index) => playhead >= line.time ? index : current, -1);
  const upcomingLine = scene.lines[Math.min(activeLine + 1, scene.lines.length - 1)];
  const progress = (playhead / scene.duration) * 100;
  const statusLabel = recordingStatus === "done" ? "Take saved" : recordingStatus === "error" ? "Mic blocked" : recording ? "Live recording" : "Ready to record";

  return <main className="studio-shell">
      <header className="studio-header">
      <h1 className="wordmark"><a href="#studio" title="Voice the Line studio" aria-label="Voice the Line home"><span className="wordmark-mark">V</span><span className="wordmark-name">VOICE THE LINE</span><b>CUE STUDIO</b></a></h1>
      <div className="header-center"><span className="status-light" /> Eight original scenes <span className="header-rule" /> Recorded locally</div>
      <div className="header-actions"><button className="header-icon" onClick={() => setMuted((value) => !value)} title={muted ? "Turn sound on" : "Turn sound off"} aria-label={muted ? "Turn sound on" : "Turn sound off"}>{muted ? <X size={17} /> : <Volume2 size={17} />}</button><button className="header-icon" title="Studio settings" aria-label="Studio settings"><SlidersHorizontal size={17} /></button></div>
    </header>
    <div className="studio-layout" id="studio">
      <aside className="scene-drawer" aria-label="Scene library">
        <div className="drawer-title"><span>Scene library</span><button title="More scene options" aria-label="More scene options"><MoreHorizontal size={18} /></button></div><p className="drawer-subtitle">Original scenes for a clean take.</p>
        <div className="scene-stack">{scenes.map((item, index) => <button key={item.title} className={`scene-card ${index === sceneIndex ? "active" : ""}`} onClick={() => { trackEvent("select_scene", { scene_name: item.title, scene_index: index + 1 }); setSceneIndex(index); }}><Image src={item.image} alt={`${item.title} voice over scene thumbnail`} fill sizes="248px" /><span className="scene-card-shade" /><span className="scene-number">{String(index + 1).padStart(2, "0")}</span><span className="scene-card-copy"><strong>{item.title}</strong><small>{item.genre}</small></span>{index === sceneIndex && <span className="selected-dot" />}</button>)}</div>
        <a className="drawer-guide-link" href="/voice-over-game/" title="Read the voice over game guide">Read the voice over game guide <span aria-hidden="true">-&gt;</span></a>
        <div className="drawer-note"><Headphones size={16} /><span>Headphones recommended</span></div>
      </aside>
      <section className="monitor-area">
        <div className="monitor-meta"><span>Scene {String(sceneIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span><span>{scene.genre}</span></div>
        <div className="cinema-frame">
          <Image key={scene.image} className="scene-image" src={scene.image} alt={`${scene.title} scene`} fill priority={sceneIndex === 0} sizes="(max-width: 820px) 100vw, (max-width: 1140px) 55vw, 65vw" style={{ objectPosition: scene.positioning }} /><div className="cinema-glow" /><div className="safe-frame" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="scene-id"><span>Original short</span><h2>{scene.title}</h2></div><div className="on-air"><span className={recording ? "pulse" : ""} /> {recording ? "REC" : "CUE"}</div>
          <div className="caption-block"><span>{activeLine >= 0 ? scene.lines[activeLine].speaker : "STANDBY"}</span><p>{activeLine >= 0 ? scene.lines[activeLine].text : "Press play, then give the scene your voice."}</p></div>
        </div>
        <div className="transport"><button className="transport-play" onClick={togglePlayback} aria-label={isPlaying ? "Pause scene" : "Play scene"}>{isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button><span className="mono-time">{formatTime(playhead)}</span><div className="time-track"><input aria-label="Scene timeline" type="range" min="0" max={scene.duration} step="0.1" value={playhead} onChange={(event) => setPlayhead(Number(event.target.value))} style={{ "--timeline-progress": `${progress}%` } as React.CSSProperties} /><div className="time-markers"><span>00</span><span>05</span><span>10</span><span>15</span><span>20</span></div></div><span className="mono-time">{formatTime(scene.duration)}</span><button className="transport-reset" onClick={() => { setPlayhead(0); setIsPlaying(false); }} title="Restart scene" aria-label="Restart scene"><RotateCcw size={17} /></button></div>
      </section>
      <aside className="direction-panel">
        <div className="direction-header"><div><span className="panel-kicker">Your direction</span><h2>Find the moment.</h2></div><button className="header-icon" title="Direction notes" aria-label="Direction notes"><Keyboard size={16} /></button></div>
        <div className="cue-now"><div className="cue-label-row"><span>Now cueing</span><time>{activeLine >= 0 ? formatTime(scene.lines[activeLine].time) : "00:00"}</time></div><strong>{activeLine >= 0 ? scene.lines[activeLine].speaker : "Get ready"}</strong><p>{activeLine >= 0 ? scene.lines[activeLine].text : "The first line lands in one second."}</p></div>
        <div className="script-list" aria-label="Script lines">{scene.lines.map((line, index) => <article key={`${line.speaker}-${line.time}`} className={`script-row ${activeLine === index ? "current" : ""} ${activeLine > index ? "complete" : ""}`}><time>{formatTime(line.time)}</time><div><span>{line.speaker}</span><p>{line.text}</p></div>{activeLine > index && <Check size={15} />}</article>)}</div>
        <div className={`take-console ${recordingStatus}`}><div className="take-topline"><span className="take-status"><i /> {statusLabel}</span><span>Take {take}</span></div><div className="take-action-row">{recording ? <button className="record-control stop" onClick={stopRecording} aria-label="Stop recording"><i /></button> : <button className="record-control" onClick={startRecording} aria-label="Start recording"><Mic size={23} /></button>}<div className="take-copy"><strong>{recording ? "Keep your pace." : recordingStatus === "done" ? "That is a wrap." : "Start a clean take."}</strong><span>{recording ? "Recording to this device" : recordingStatus === "done" ? "Listen or export below" : `Next: ${upcomingLine.speaker}`}</span></div></div><div className="audio-strip" aria-hidden="true">{Array.from({ length: 15 }, (_, index) => <i key={index} />)}</div>{recordingUrl && <div className="take-finish"><audio ref={audioRef} src={recordingUrl} /><button onClick={() => audioRef.current?.play()}><Play size={15} fill="currentColor" /> Listen</button><button onClick={downloadTake}><Download size={15} /> Export</button></div>}<button className="new-take" onClick={resetTake}><RotateCcw size={14} /> New take</button></div>
      </aside>
    </div>
    <footer className="mobile-scene-nav"><button onClick={() => setSceneIndex((sceneIndex + scenes.length - 1) % scenes.length)} aria-label="Previous scene"><ChevronLeft size={19} /></button><span>Scene {sceneIndex + 1} of {scenes.length}</span><button onClick={() => setSceneIndex((sceneIndex + 1) % scenes.length)} aria-label="Next scene"><ChevronRight size={19} /></button></footer>
    <section className="seo-content" aria-labelledby="about-title">
      <div className="seo-content-inner">
        <div className="seo-lede">
          <span className="section-kicker">Voice acting practice</span>
          <h2 id="about-title">Voice the Line: a free online voice over game</h2>
          <p>Voice the Line is a free online voice over game built around short, original cinematic scenes. Pick a moment, follow the cue, and give the character a voice that feels like your own.</p>
          <p className="content-byline">Created by <a href={siteOwner.profileUrl} title="Joan Jiao on GitHub">{siteOwner.name}</a> - Updated <time dateTime="2026-09-04">September 4, 2026</time></p>
        </div>
        <div className="seo-points">
          <article><span>01</span><h3>Choose a scene</h3><p>Move between drama, mystery, comedy, fantasy, and science fiction scenes in one focused studio.</p></article>
          <article><span>02</span><h3>Catch the cue</h3><p>Timed dialogue keeps the performance moving while the active line stays visible on the monitor.</p></article>
          <article><span>03</span><h3>Keep the take</h3><p>Record in your browser, listen back, try again, and export your finished take locally.</p></article>
        </div>
        <div className="seo-scene-heading"><div><span className="section-kicker">Original scene library</span><h2>Which voice over scene should you try next?</h2></div><a className="text-link" href="/voice-over-game/" title="Learn how the voice over game works">See how the game works <span aria-hidden="true">-&gt;</span></a></div>
        <div className="seo-scene-grid">{scenes.map((item) => <a className="seo-scene-link" href={`/scenes/${item.slug}/`} title={`Open the ${item.title} voice over scene`} key={item.slug}><Image src={item.image} alt={`${item.title} voice over scene`} width={420} height={236} /><span><strong>{item.title}</strong><small>{item.genre} / {formatTime(item.duration)}</small></span></a>)}</div>
      </div>
    </section>
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-inner">
        <div><span className="section-kicker">Common questions</span><h2 id="faq-title">What do players ask about voice over games?</h2></div>
        <div className="faq-list">{faqItems.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </div>
    </section>
    <section className="sources-section" aria-labelledby="sources-title">
      <div className="sources-inner">
        <div><span className="section-kicker">Sources and ownership</span><h2 id="sources-title">How does browser voice recording work?</h2></div>
        <blockquote cite="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder">The browser MediaRecorder API can record media from a user agent and produce data in a format that can be saved or played back.</blockquote>
        <p className="source-copy">Voice the Line uses browser recording APIs and keeps takes local to the session. Technical references: <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder" title="MDN MediaRecorder API reference">MDN MediaRecorder API</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" title="MDN getUserMedia API reference">MDN getUserMedia API</a>. Questions and feedback can be sent through the <a href={siteOwner.contactUrl} title="Voice the Line GitHub contact and issues">project issue tracker</a>.</p>
      </div>
    </section>
    <footer className="site-footer">
      <div><strong>VOICE THE LINE</strong><span>Original scenes for your next take.</span></div>
      <nav aria-label="Footer navigation"><a href="#about-title" title="About Voice the Line">About</a><a href={siteOwner.contactUrl} title="Contact Voice the Line on GitHub">Contact</a><a href="/privacy" title="Read the Voice the Line privacy policy">Privacy</a><a href="/terms" title="Read the Voice the Line terms">Terms</a></nav>
    </footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
  </main>;
}
