import Link from "next/link";
import Image from "next/image";
import { Post, formatDate } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/metin/${post.slug}`}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
      className="group"
    >
      {/* Cover image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3/2", backgroundColor: "var(--border)" }}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-103"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-warm)" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "var(--border-hover)", fontStyle: "italic" }}>
              kh
            </span>
          </div>
        )}
      </div>

      {/* Text — centered, below image */}
      <div className="pt-5 pb-2 text-center px-2">
        <h2
          className="mb-2 transition-colors duration-200 group-hover:text-[#c8001e]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 2.2vw, 22px)",
            fontWeight: 400,
            lineHeight: 1.25,
            color: "var(--text)",
          }}
        >
          {post.title}
        </h2>

        <p className="meta-text mb-3">{post.author} · {formatDate(post.date)} · {post.readingTime} dk</p>

        <p
          className="line-clamp-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontStyle: "italic",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
          }}
        >
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
