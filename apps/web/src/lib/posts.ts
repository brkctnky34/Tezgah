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

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => getPost(f.replace(/\.md$/, "")))
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as Post[];
}

export function getPost(slug: string): Post | null {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  marked.use({ breaks: true });
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
