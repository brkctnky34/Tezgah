"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post, formatDate } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseEnter = () => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vpCX = window.innerWidth / 2;
    const vpCY = window.innerHeight / 2;
    const elCX = rect.left + rect.width / 2;
    const elCY = rect.top + rect.height / 2;
    const tx = vpCX - elCX;
    const ty = vpCY - elCY;
    setStyle({
      transform: `translate(${tx}px, ${ty}px) scale(1.35)`,
      zIndex: 50,
      boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
    });
  };

  const handleMouseLeave = () => setStyle({});

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, z-index 0s", ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/metin/${post.slug}`}
        className="post-card-underground group flex flex-col border"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", textDecoration: "none", display: "flex", flexDirection: "column" }}
      >
        {post.image && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="flex flex-col flex-1 p-6">
          <h2
            className="leading-snug mb-3 flex-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "21px",
              fontWeight: 400,
              color: "var(--text)",
            }}
          >
            {post.title}
          </h2>

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

          <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
              {post.author}
            </span>
            <span className="meta-text">{formatDate(post.date)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
