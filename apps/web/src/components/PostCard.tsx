import Link from "next/link";
import { Post, typeLabels, formatDate } from "@/data/posts";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <Link
      href={`/metin/${post.slug}`}
      className="group block relative bg-[#0d0d0d] border border-[#1c1c1c] p-7 transition-all duration-300 hover:border-[#2a2a2a] hover:bg-[#111]"
      style={{ minHeight: "260px" }}
    >
      {/* Faint background number */}
      <span
        aria-hidden
        className="absolute bottom-4 right-5 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "6rem",
          lineHeight: 1,
          color: "#161616",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Top red accent line */}
      <span className="absolute top-0 left-0 w-0 h-[2px] bg-[#c8001e] transition-all duration-500 group-hover:w-full" />

      {/* Type label */}
      <p className="article-type mb-5">{typeLabels[post.type]}</p>

      {/* Title */}
      <h2
        className="text-heading text-xl leading-snug mb-4 transition-colors duration-200 group-hover:text-white"
        style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 500 }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        className="text-[#555] text-sm leading-relaxed line-clamp-3 mb-6"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="absolute bottom-6 left-7 right-7 flex justify-between items-end">
        <span
          className="text-[#3a3a3a] text-xs tracking-wider uppercase transition-colors duration-200 group-hover:text-[#555]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {post.author}
        </span>
        <span
          className="text-[#2a2a2a] text-xs tracking-wider transition-colors duration-200 group-hover:text-[#444]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {formatDate(post.date)}
        </span>
      </div>
    </Link>
  );
}
