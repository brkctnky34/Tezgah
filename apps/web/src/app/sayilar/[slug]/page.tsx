import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { issues } from "@/data/issues";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = issues.find((i) => i.slug === params.slug);
  if (!issue) return {};
  return {
    title: `Sayı ${issue.number}: ${issue.title}`,
    description: issue.description,
  };
}

const typeLabels: Record<string, string> = {
  deneme: "Deneme",
  siir: "Şiir",
  hikaye: "Hikaye",
  soylesi: "Söyleşi",
  ceviri: "Çeviri",
};

export default function IssuePage({ params }: Props) {
  const issue = issues.find((i) => i.slug === params.slug);
  if (!issue) notFound();

  const issueIndex = issues.findIndex((i) => i.slug === params.slug);
  const prevIssue = issues[issueIndex - 1] ?? null;
  const nextIssue = issues[issueIndex + 1] ?? null;

  return (
    <div>
      {/* Issue Header */}
      <section className="border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <span className="article-type block mb-6">Sayı {issue.number}</span>

          <blockquote
            className="text-5xl md:text-7xl leading-none text-heading mb-8"
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontStyle: "italic",
            }}
          >
            &ldquo;{issue.coverQuote}&rdquo;
          </blockquote>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-10">
            <div>
              <p className="meta-text mb-1">Tarih</p>
              <p
                className="text-heading"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {issue.date}
              </p>
            </div>
            <div>
              <p className="meta-text mb-1">İçerik</p>
              <p
                className="text-heading"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {issue.articles.length} metin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="section-label mb-8">Editörden</p>
          <div className="max-w-2xl">
            <p
              className="text-xl text-[#c0c0c0] leading-relaxed"
              style={{
                fontFamily: "var(--font-eb-garamond)",
                fontStyle: "italic",
              }}
            >
              {issue.editorial}
            </p>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="section-label mb-8">İçindekiler</p>

          <div>
            {issue.articles.map((article, i) => (
              <article
                key={article.slug}
                className="border-t border-[#1e1e1e] py-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start group hover:border-[#c8001e] transition-colors duration-200 cursor-pointer"
              >
                {/* Number */}
                <span
                  className="text-[#222] text-5xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div>
                  <span className="article-type block mb-2">
                    {typeLabels[article.type] ?? article.type}
                  </span>
                  <h2
                    className="text-heading text-2xl mb-3 group-hover:text-[#c8001e] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-eb-garamond)" }}
                  >
                    {article.title}
                  </h2>
                  <p
                    className="text-[#777] leading-relaxed text-base"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                {/* Author */}
                <div className="text-right">
                  <p className="meta-text mb-1">Yazar</p>
                  <p
                    className="text-[#aaa] text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {article.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center">
            {prevIssue ? (
              <Link
                href={`/sayilar/${prevIssue.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="meta-text">← Önceki Sayı</span>
                <span
                  className="text-heading group-hover:text-[#c8001e] transition-colors"
                  style={{ fontFamily: "var(--font-eb-garamond)" }}
                >
                  Sayı {prevIssue.number}: {prevIssue.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextIssue ? (
              <Link
                href={`/sayilar/${nextIssue.slug}`}
                className="group flex flex-col gap-1 text-right"
              >
                <span className="meta-text">Sonraki Sayı →</span>
                <span
                  className="text-heading group-hover:text-[#c8001e] transition-colors"
                  style={{ fontFamily: "var(--font-eb-garamond)" }}
                >
                  Sayı {nextIssue.number}: {nextIssue.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
