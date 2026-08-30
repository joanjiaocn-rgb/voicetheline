# Voice the Line

Voice the Line is a free browser-based voice over game for practicing character performance with short, original cinematic scenes.

[Play online](https://voicetheline.live/#studio) | [Read the voice over game guide](https://voicetheline.live/voice-over-game/) | [View the source on GitHub](https://github.com/joanjiaocn-rgb/voicetheline)

## What it does

Choose a scene, follow timed dialogue cues, perform the lines, and keep the take that feels right. The studio is designed for quick voice acting practice without an account or a download.

- Eight original cinematic scenes across drama, mystery, comedy, fantasy, and science fiction
- Timed dialogue cues with the active speaker and line shown as the scene plays
- Browser microphone recording with start, stop, replay, and new-take controls
- Local WebM export for saving a finished take to your device
- Responsive studio layout for desktop and mobile browsers
- Search-friendly guide and individual scene pages for discovering each scenario
- Privacy and terms pages that explain the current product behavior

## Scene library

| Scene | Genre | Practice focus |
| --- | --- | --- |
| [Last Train Home](https://voicetheline.live/scenes/last-train-home/) | Late-night drama | Restraint, pauses, and urgency |
| [Rainy Confession](https://voicetheline.live/scenes/rainy-confession/) | Romantic drama | Intimacy and subtext |
| [The Big Pitch](https://voicetheline.live/scenes/the-big-pitch/) | Office comedy | Confidence and comic timing |
| [Planet Nine](https://voicetheline.live/scenes/planet-nine/) | Cosmic adventure | Clear commands and wonder |
| [Between Floors](https://voicetheline.live/scenes/between-floors/) | Contained mystery | Tension through careful listening |
| [The Last Signal](https://voicetheline.live/scenes/the-last-signal/) | Coastal mystery | Grounded suspense |
| [Magic Mistake](https://voicetheline.live/scenes/magic-mistake/) | Fantasy comedy | Brisk timing and matter-of-fact delivery |
| [Rooftop After Hours](https://voicetheline.live/scenes/rooftop-after-hours/) | Quiet drama | Natural late-night conversation |

## How to play

1. Open the [Voice the Line studio](https://voicetheline.live/#studio).
2. Select a scene from the library.
3. Press play and use the script panel to follow each timed cue.
4. Allow microphone access, then record your performance.
5. Listen to the take, start a new take, or export the result as a WebM file.

Headphones are recommended for a cleaner recording workflow. Microphone recording depends on browser permissions and MediaRecorder support.

## Privacy by design

Voice recordings are processed locally in the browser during the session. Voice the Line does not upload recorded audio to an application server. When a take is exported, the browser creates and downloads a WebM file on the user's device.

The site currently uses Google Analytics 4 for basic product and page usage measurement, including scene selection, playback, recording starts, and take exports. Analytics does not receive microphone recordings or the contents of a take. See the live [Privacy](https://voicetheline.live/privacy/) and [Terms](https://voicetheline.live/terms/) pages for the current policy text.

## Tech stack

- Next.js 15 with the App Router
- React 19 and TypeScript
- `lucide-react` for interface icons
- `next/image` with local scene assets
- Browser `MediaRecorder` and `getUserMedia` APIs
- Static export deployed through Cloudflare Pages
- GitHub Actions are not required; the connected Cloudflare Pages project builds from `main`

## Project structure

```
app/
  page.tsx                    Main voice over studio
  voice-over-game/page.tsx    Guide and SEO landing page
  scenes/[slug]/page.tsx      Individual scene detail pages
  privacy/page.tsx            Privacy page
  terms/page.tsx              Terms page
  globals.css                 Shared site and studio styles
lib/
  scenes.ts                   Scene data, scripts, timing, and image paths
  analytics.ts                GA4 event helper
public/
  scenes/                     Original 16:9 scene images
  favicon.*                   Site icons
next.config.ts                Static export configuration
wrangler.toml                 Cloudflare Pages project metadata
```

## Local development

Requirements:

- Node.js 20 or newer
- A modern browser with microphone support for recording

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create the production export, run:

```bash
npm run build
```

The generated static site is written to `out/`. Because this project uses `output: "export"`, the result should be served by a static host such as Cloudflare Pages.

## Cloudflare Pages deployment

Connect the GitHub repository to Cloudflare Pages and use the following settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `20` |

After the first successful deployment, add `voicetheline.live` under **Workers & Pages > Custom domains**. The production site uses the apex domain as its canonical URL; `www.voicetheline.live` can redirect to the apex domain.

## Analytics and configuration

GA4 is initialized through the client-side analytics helper in `lib/analytics.ts`. The public measurement identifier is safe to use in browser code; do not add private API keys, service credentials, or tokens to this repository. Keep any future server-side credentials in Cloudflare environment variables or another secret manager.

## Contributing

This is a small focused project. Bug reports, accessibility feedback, browser compatibility notes, and ideas for new original scenes are welcome through [GitHub Issues](https://github.com/joanjiaocn-rgb/voicetheline/issues).

Before opening a pull request, run:

```bash
npm run build
git diff --check
```

Please keep new scene scripts and images original, appropriately licensed, and free of unnecessary personal data.

## License

No open-source license has been declared yet. The source repository is public for project transparency, but the scripts, interface, and original scene assets should not be redistributed as a separate library without permission.
