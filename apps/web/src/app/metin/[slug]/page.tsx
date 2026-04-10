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
  return { title: post.title, description: post.excerpt };
}

export default function MetinPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedIdx = sorted.findIndex((p) => p.slug === params.slug);
  const prev = sorted[sortedIdx + 1] ?? null;
  const next = sorted[sortedIdx - 1] ?? null;

  const isPoem = post.type === "siir";

  return (
    <div>
      {/* ── HEADER ── */}
      <header
        className="border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-2xl mx-auto px-6 pt-12 pb-10">
          <Link
            href="/"
            className="nav-link mb-8 inline-block hover:text-[var(--accent)]"
          >
            ← Ana Sayfa
          </Link>

          <div className="mt-6 mb-6">
            <span className="type-label">{typeLabels[post.type]}</span>
            <span
              className="mx-3"
              style={{ color: "var(--border)", fontSize: "11px" }}
            >
              ·
            </span>
            <span className="meta-text">{formatDate(post.date)}</span>
          </div>

          <h1
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--text)",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              letterSpacing: "0.06em",
              color: "var(--text-secondary)",
            }}
          >
            {post.author}
          </p>
        </div>
      </header>

      {/* ── BODY ── */}
      <article className="max-w-2xl mx-auto px-6 py-14">
        {isPoem ? (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "20px",
              fontStyle: "italic",
              lineHeight: 2,
              color: "var(--text)",
            }}
          >
            {post.body.map((stanza, i) => (
              <div key={i} className="mb-10 whitespace-pre-line">
                {stanza}
              </div>
            ))}
          </div>
        ) : (
          <div className="prose-kh">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </article>

      {/* ── DIVIDER ── */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center">
          <div
            className="mx-auto"
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "var(--accent)",
            }}
          />
        </div>
      </div>

      {/* ── PREV / NEXT ── */}
      <nav
        className="max-w-2xl mx-auto px-6 py-12 border-t mt-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="grid grid-cols-2 gap-8">
          {prev ? (
            <Link href={`/metin/${prev.slug}`} className="group no-underline">
              <p className="meta-text mb-2">← Önceki</p>
              <p
                className="leading-snug group-hover:text-[var(--accent)] transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "var(--text)",
                }}
              >
                {prev.title}
              </p>
              <p className="meta-text mt-1">{prev.author}</p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/metin/${next.slug}`}
              className="group text-right no-underline"
            >
              <p className="meta-text mb-2">Sonraki →</p>
              <p
                className="leading-snug group-hover:text-[var(--accent)] transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "var(--text)",
                }}
              >
                {next.title}
              </p>
              <p className="meta-text mt-1">{next.author}</p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
