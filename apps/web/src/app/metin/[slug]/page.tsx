import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPost, typeLabels, formatDate } from "@/lib/posts";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.image ? { images: [{ url: post.image }] } : undefined,
  };
}

export default function MetinPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === params.slug);
  const prev = all[idx + 1] ?? null;
  const next = all[idx - 1] ?? null;
  const isPoem = post.type === "siir";

  return (
    <div>
      {/* ── COVER IMAGE (if exists) ── */}
      {post.image && (
        <div className="relative w-full" style={{ maxHeight: "420px", overflow: "hidden" }}>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={420}
            className="w-full object-cover"
            style={{ maxHeight: "420px" }}
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.9) 100%)" }} />
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-10 pb-10">
          <Link href="/" className="nav-link mb-8 inline-block">← Ana Sayfa</Link>

          <div className="mt-6 mb-5 flex flex-wrap items-center gap-3">
            <span className="type-label">{typeLabels[post.type]}</span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span className="meta-text">{formatDate(post.date)}</span>
          </div>

          <h1
            className="mb-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--text)",
            }}
          >
            {post.title}
          </h1>

          <p style={{ fontFamily: "var(--font-ui)", fontSize: "13px", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
            {post.author}
          </p>
        </div>
      </header>

      {/* ── BODY ── */}
      <article className="max-w-2xl mx-auto px-5 sm:px-6 py-12">
        {isPoem ? (
          <div
            className="poem-body"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(18px, 2.5vw, 21px)",
              fontStyle: "italic",
              lineHeight: 2,
              color: "var(--text)",
            }}
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        ) : (
          <div
            className="prose-kh"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        )}
      </article>

      {/* ── DIVIDER ── */}
      <div className="flex justify-center py-4">
        <div style={{ width: "32px", height: "2px", backgroundColor: "var(--accent)" }} />
      </div>

      {/* ── PREV / NEXT ── */}
      <nav className="max-w-2xl mx-auto px-5 sm:px-6 py-10 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="grid grid-cols-2 gap-6">
          {prev ? (
            <Link href={`/metin/${prev.slug}`} className="group no-underline">
              <p className="meta-text mb-2">← Önceki</p>
              <p className="leading-snug group-hover:text-[#c8001e] transition-colors"
                style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "var(--text)" }}>
                {prev.title}
              </p>
              <p className="meta-text mt-1">{prev.author}</p>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/metin/${next.slug}`} className="group text-right no-underline">
              <p className="meta-text mb-2">Sonraki →</p>
              <p className="leading-snug group-hover:text-[#c8001e] transition-colors"
                style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "var(--text)" }}>
                {next.title}
              </p>
              <p className="meta-text mt-1">{next.author}</p>
            </Link>
          ) : <div />}
        </div>
      </nav>
    </div>
  );
}
