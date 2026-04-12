import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const postsDir = path.join(root, "content", "posts");
const BASE_URL = "https://kasparhauser.xyz";

function normalizeSlug(filename) {
  return filename
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
const posts = files
  .map((f) => {
    const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: normalizeSlug(f.replace(/\.md$/, "")),
      title: data.title ?? "",
      author: data.author ?? "",
      date: data.date ?? new Date().toISOString().split("T")[0],
      excerpt: data.excerpt ?? "",
      content,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kaspar Hauser</title>
    <link>${BASE_URL}</link>
    <description>Bağımsız edebiyat ve kültür platformu — 6:45 yayınları</description>
    <language>tr</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (p) => `<item>
      <title>${escape(p.title)}</title>
      <link>${BASE_URL}/metin/${p.slug}/</link>
      <guid>${BASE_URL}/metin/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>${escape(p.author)}</author>
      <description>${escape(p.excerpt)}</description>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>`;

fs.writeFileSync(path.join(root, "public", "rss.xml"), rss);
console.log(`RSS feed oluşturuldu — ${posts.length} metin`);
