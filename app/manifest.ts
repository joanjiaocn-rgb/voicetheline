import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Voice the Line",
    short_name: "Voice the Line",
    description: "A free online voice over game with original cinematic scenes.",
    start_url: "/",
    display: "standalone",
    background_color: "#eeeee9",
    theme_color: "#ceef52",
    icons: [
      { src: "/favicon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
