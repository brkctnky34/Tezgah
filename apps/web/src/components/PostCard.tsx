import Link from "next/link";
import Image from "next/image";
import { Post, formatDate } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/metin/${post.slug}`}
      className="post-card-underground group flex flex-col border transition-all duration-300 hover:shadow-md"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      {/* Cover image */}
      {post.image && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h2
          className="leading-snug mb-3 flex-1 transition-colors duration-200 group-hover:text-[#c8001e]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "21px",
            fontWeight: 400,
            color: "var(--text)",
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className="line-clamp-3 mb-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
        >
          {post.excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
            {post.author}
          </span>
          <span className="meta-text">{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  );
}
