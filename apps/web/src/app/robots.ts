import { MetadataRoute } from "next";

const BASE_URL = "https://kasparhauser.com"; // kendi domain'inizle değiştirin

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
