import Link from "next/link";
import { Post, typeLabels, formatDate } from "@/data/posts";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/metin/${post.slug}`}
      className="group block border transition-all duration-300 hover:shadow-sm"
      style={{
        borderColor: "var(--border)",
        padding: "28px 28px 24px",
        backgroundColor: "var(--surface)",
      }}
    >
      {/* Type label */}
      <p className="type-label mb-5">{typeLabels[post.type]}</p>

      {/* Title */}
      <h2
        className="leading-snug mb-4 transition-colors duration-200 group-hover:text-[#c8001e]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 400,
          color: "var(--text)",
        }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        className="line-clamp-3 mb-6"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--text-secondary)",
        }}
      >
        {post.excerpt}
      </p>

      {/* Author + Date */}
      <div className="flex justify-between items-end">
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "var(--text-secondary)",
          }}
        >
          {post.author}
        </span>
        <span className="meta-text">{formatDate(post.date)}</span>
      </div>
    </Link>
  );
}
