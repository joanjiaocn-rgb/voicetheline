# Voice the Line

Voice the Line is a browser-based voice over game. Players choose an original cinematic scene, follow timed dialogue cues, record a take locally, replay it, and export the audio as WebM.

Production domain: [voicetheline.live](https://voicetheline.live)

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The static site is exported to `out/`. Microphone recordings stay in the browser and are never uploaded.

## Cloudflare Pages

Connect this GitHub repository to a Cloudflare Pages project with these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `20` |

After the first successful deployment, add `voicetheline.live` under **Workers & Pages > Custom domains**. Keep the canonical domain on the apex address and redirect `www.voicetheline.live` to it if the `www` hostname is also connected.
