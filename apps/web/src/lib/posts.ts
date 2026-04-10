import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostType = "deneme" | "siir" | "hikaye" | "soylesi" | "ceviri";

export interface Post {
  slug: string;
  title: string;
  author: string;
  type: PostType;
  date: string;
  excerpt: string;
  image?: string;
  bodyHtml: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

/** Türkçe ve diğer özel karakterleri ASCII slug'a çevirir */
function normalizeSlug(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const rawSlug = f.replace(/\.md$/, "");
      return getPostByFilename(rawSlug);
    })
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as Post[];
}

function getPostByFilename(rawSlug: string): Post | null {
  const fullPath = path.join(postsDir, `${rawSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  marked.use({ breaks: true });
  const slug = normalizeSlug(rawSlug);
  return {
    slug,
    title: data.title ?? "",
    author: data.author ?? "",
    type: data.type ?? "deneme",
    date: data.date ?? new Date().toISOString().split("T")[0],
    excerpt: data.excerpt ?? "",
    image: data.image ?? undefined,
    bodyHtml: marked(content) as string,
  };
}

export function getPost(slug: string): Post | null {
  if (!fs.existsSync(postsDir)) return null;
  // Normalize edilmiş slug ile eşleşen dosyayı bul
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const match = files.find(
    (f) => normalizeSlug(f.replace(/\.md$/, "")) === slug
  );
  if (!match) return null;
  return getPostByFilename(match.replace(/\.md$/, ""));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const typeLabels: Record<PostType, string> = {
  deneme: "Deneme",
  siir: "Şiir",
  hikaye: "Hikaye",
  soylesi: "Söyleşi",
  ceviri: "Çeviri",
};
