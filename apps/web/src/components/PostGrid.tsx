"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "@/lib/types";

export default function PostGrid({ posts }: { posts: Post[] }) {
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null);

  const authors = Array.from(new Set(posts.map((p) => p.author))).sort();
  const filtered = activeAuthor ? posts.filter((p) => p.author === activeAuthor) : posts;

  return (
    <div>
      {/* Yazar filtresi — sadece 2+ yazar varsa göster */}
      {authors.length > 1 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
          <button
            onClick={() => setActiveAuthor(null)}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: activeAuthor === null ? "var(--text)" : "var(--text-muted)",
              borderBottom: activeAuthor === null ? "1px solid var(--accent)" : "1px solid transparent",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
          >
            Tümü
          </button>
          {authors.map((author) => (
            <button
              key={author}
              onClick={() => setActiveAuthor(author === activeAuthor ? null : author)}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: activeAuthor === author ? "var(--text)" : "var(--text-muted)",
                borderBottom: activeAuthor === author ? "1px solid var(--accent)" : "1px solid transparent",
                paddingBottom: "2px",
                transition: "color 0.2s",
              }}
            >
              {author}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
