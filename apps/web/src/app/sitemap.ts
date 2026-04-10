import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://kasparhauser.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/hakkinda`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/iletisim`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${BASE_URL}/metin/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "never" as const,
      priority: 0.8,
    })),
  ];
}
