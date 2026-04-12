import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `/metin/${params.slug}/`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} — Kaspar Hauser`,
      description: post.excerpt,
      type: "article",
      locale: "tr_TR",
      siteName: "Kaspar Hauser",
      url,
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: `${post.title} — Kaspar Hauser`,
      description: post.excerpt,
      ...(post.image ? { images: [post.image] } : {}),
    },
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

  // Aynı yazardan diğer metinler
  const sameAuthor = all.filter(
    (p) => p.author === post.author && p.slug !== post.slug
  ).slice(0, 3);

  // Rastgele metin (deterministik — slug hash bazlı)
  const otherPosts = all.filter((p) => p.slug !== post.slug);
  const randomPost = otherPosts.length > 0
    ? otherPosts[post.slug.length % otherPosts.length]
    : null;

  return (
    <div>
      {/* ── COVER IMAGE ── */}
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(237,233,223,0.95) 100%)" }} />
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-10 pb-10">
          <Link href="/" className="nav-link mb-8 inline-block">← Ana Sayfa</Link>

          <div className="mt-6 mb-5">
            <div className="article-rule" />
            <span className="meta-text">{formatDate(post.date)} · {post.readingTime} dk okuma</span>
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

      {/* ── AYNI YAZARDAN ── */}
      {sameAuthor.length > 0 && (
        <section className="max-w-2xl mx-auto px-5 sm:px-6 pb-10 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="section-title mt-10 mb-6">{post.author} — diğer metinler</p>
          <div className="space-y-4">
            {sameAuthor.map((p) => (
              <Link key={p.slug} href={`/metin/${p.slug}`} className="group flex items-baseline justify-between gap-4 no-underline">
                <span
                  className="group-hover:text-[#c8001e] transition-colors"
                  style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, color: "var(--text)" }}
                >
                  {p.title}
                </span>
                <span className="meta-text shrink-0">{p.readingTime} dk</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── RASTGELE METİN ── */}
      {randomPost && (
        <section className="border-t" style={{ borderColor: "var(--border)" }}>
          <Link
            href={`/metin/${randomPost.slug}`}
            className="group block max-w-2xl mx-auto px-5 sm:px-6 py-8 no-underline"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="type-label mb-1">Rastgele</p>
                <p
                  className="group-hover:text-[#c8001e] transition-colors"
                  style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "var(--text)" }}
                >
                  {randomPost.title}
                </p>
                <p className="meta-text mt-1">{randomPost.author}</p>
              </div>
              <span
                className="shrink-0 transition-transform group-hover:translate-x-1"
                style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}
              >
                →
              </span>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
