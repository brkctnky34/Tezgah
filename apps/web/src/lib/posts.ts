import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
export type { PostType, Post } from "./types";
export { formatDate, typeLabels } from "./types";
import type { Post } from "./types";

const postsDir = path.join(process.cwd(), "content", "posts");

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
    .map((f) => getPostByFilename(f.replace(/\.md$/, "")))
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
  return {
    slug: normalizeSlug(rawSlug),
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
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const match = files.find(
    (f) => normalizeSlug(f.replace(/\.md$/, "")) === slug
  );
  if (!match) return null;
  return getPostByFilename(match.replace(/\.md$/, ""));
}
