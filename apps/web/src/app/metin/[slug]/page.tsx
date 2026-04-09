import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost, typeLabels, formatDate } from "@/data/posts";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function MetinPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === params.slug);
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedIdx = sorted.findIndex((p) => p.slug === params.slug);
  const prev = sorted[sortedIdx + 1] ?? null;
  const next = sorted[sortedIdx - 1] ?? null;

  const isPoem = post.type === "siir";

  return (
    <div>
      {/* ── ARTICLE HEADER ── */}
      <header className="border-b border-[#1c1c1c]">
        <div className="max-w-3xl mx-auto px-6 pt-14 pb-10">
          <Link
            href="/"
            className="meta-text hover:text-[#c8001e] transition-colors mb-8 inline-block"
          >
            ← Geri
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="article-type">{typeLabels[post.type]}</span>
            <span className="text-[#222] text-xs">·</span>
            <span
              className="text-[#444] text-xs tracking-wider"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {formatDate(post.date)}
            </span>
          </div>

          <h1
            className="text-heading leading-tight mb-6"
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 500,
            }}
          >
            {post.title}
          </h1>

          <p
            className="text-[#555] text-sm tracking-wider uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {post.author}
          </p>
        </div>
      </header>

      {/* ── BODY ── */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        {isPoem ? (
          // Şiir: satır boşlukları korunur, drop cap yok
          <div
            className="text-[#c0c0c0] text-xl leading-loose"
            style={{ fontFamily: "var(--font-eb-garamond)", fontStyle: "italic" }}
          >
            {post.body.map((stanza, i) => (
              <div key={i} className="mb-8 whitespace-pre-line">
                {stanza}
              </div>
            ))}
          </div>
        ) : (
          // Diğer: prose stili, drop cap
          <div className="prose-kh">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </article>

      {/* ── DIVIDER ── */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-[#1c1c1c]" />
          <span
            className="kh-logo text-lg"
            style={{ color: "#1e1e1e" }}
          >
            <span style={{ color: "#1e1e1e" }}>KAS</span>
            <span style={{ color: "#c8001e", opacity: 0.3 }}>HAU</span>
          </span>
          <span className="flex-1 h-px bg-[#1c1c1c]" />
        </div>
      </div>

      {/* ── PREV / NEXT ── */}
      <nav className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8">
          {prev ? (
            <Link href={`/metin/${prev.slug}`} className="group">
              <p className="meta-text mb-2">← Önceki</p>
              <p
                className="text-[#555] text-base leading-snug group-hover:text-heading transition-colors"
                style={{ fontFamily: "var(--font-eb-garamond)" }}
              >
                {prev.title}
              </p>
              <p
                className="text-[#333] text-xs mt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {prev.author}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link href={`/metin/${next.slug}`} className="group text-right">
              <p className="meta-text mb-2">Sonraki →</p>
              <p
                className="text-[#555] text-base leading-snug group-hover:text-heading transition-colors"
                style={{ fontFamily: "var(--font-eb-garamond)" }}
              >
                {next.title}
              </p>
              <p
                className="text-[#333] text-xs mt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {next.author}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
