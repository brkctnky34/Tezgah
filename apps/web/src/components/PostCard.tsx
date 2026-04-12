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
        style={{ aspectRatio: "4/5", backgroundColor: "var(--border)" }}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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

      {/* Text — left aligned */}
      <div className="pt-4 pb-2">
        <h2
          className="mb-1 transition-colors duration-200 group-hover:text-[#c8001e]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2vw, 19px)",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "var(--text)",
          }}
        >
          '{post.title}'
        </h2>

        <p className="meta-text">
          {post.author} · {formatDate(post.date)} · {post.readingTime} dk
        </p>
      </div>
    </Link>
  );
}
