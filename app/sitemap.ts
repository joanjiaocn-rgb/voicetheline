import type { MetadataRoute } from "next";
import { scenes } from "../lib/scenes";

const siteUrl = "https://voicetheline.live";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-30");
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/voice-over-game/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...scenes.map((scene) => ({
      url: `${siteUrl}/scenes/${scene.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
