# Voice the Line v0

- [x] Define local-only browser recording MVP
- [x] Implement scene selector, cue script, microphone recording, replay, download
- [x] Redesign the tool as a focused studio console with cinematic scene previews
- [x] Add eight original local scene images and complete playable scripts
- [x] Make the desktop scene library scrollable and keep mobile scene navigation working
- [x] Adopt voicetheline.live as the canonical brand domain
- [x] Align the visible brand, metadata, Open Graph, schema, robots, and sitemap
- [x] Configure a static export for Cloudflare Pages with production response headers
- [x] Document the GitHub-to-Cloudflare build and custom-domain settings
- [x] Add crawlable product context, FAQ schema, favicon, manifest, privacy, and terms routes
- [x] Initialize the main branch and publish the source to the GitHub repository
- [x] Connect the GitHub repository to Cloudflare Pages and verify the production deployment
- [x] Bind voicetheline.live, validate HTTPS, and redirect www to the canonical apex domain
- [x] Validate application build and local HTTP response
- [ ] Validate desktop and mobile rendering with an available browser session
- [ ] Validate microphone recording in a permitted browser context

## Scope

- Original abstract scenes only. No uploaded media, actor cloning, accounts, or remote storage.
- Browser audio export is WebM, determined by the browser MediaRecorder implementation.
