import Link from "next/link";
import Logo from "@/components/Logo";
import IssueCard from "@/components/IssueCard";
import { issues, latestIssue } from "@/data/issues";

export default function HomePage() {
  const previousIssues = [...issues].reverse().slice(1);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Logo stacked */}
            <div>
              <Logo size="xl" className="mb-0" />
              <p className="meta-text mt-4">6:45 yayınları</p>
            </div>

            {/* Latest issue teaser */}
            <div className="md:border-l border-[#1e1e1e] md:pl-12">
              <span className="article-type block mb-6">
                Son Sayı · {latestIssue.date}
              </span>

              <p
                className="text-[#555] text-sm uppercase tracking-[0.2em] mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Sayı {latestIssue.number}
              </p>

              <blockquote
                className="text-4xl md:text-5xl leading-tight text-heading mb-6"
                style={{
                  fontFamily: "var(--font-eb-garamond)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{latestIssue.coverQuote}&rdquo;
              </blockquote>

              <p
                className="text-[#888] leading-relaxed mb-8 text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {latestIssue.description}
              </p>

              <Link
                href={`/sayilar/${latestIssue.slug}`}
                className="inline-flex items-center gap-3 border border-[#c8001e] text-[#c8001e] px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#c8001e] hover:text-white transition-all duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Sayıyı Oku
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES from latest issue ── */}
      <section className="border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <p className="section-label mb-10">Bu Sayıdan</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {latestIssue.articles.map((article, i) => (
              <div
                key={article.slug}
                className={`py-8 ${i !== 0 ? "md:border-l border-[#1e1e1e] md:pl-8" : ""} ${i !== latestIssue.articles.length - 1 ? "border-b md:border-b-0 border-[#1e1e1e]" : ""}`}
              >
                <span className="article-type block mb-3">{article.type}</span>
                <h3
                  className="text-heading text-xl leading-snug mb-3 hover:text-[#c8001e] transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-eb-garamond)" }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-[#666] text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {article.excerpt}
                </p>
                <p className="meta-text">{article.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="max-w-2xl">
            <p className="section-label mb-8">Dergi Hakkında</p>
            <p
              className="text-2xl text-heading leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-eb-garamond)",
                fontStyle: "italic",
              }}
            >
              Kaspar Hauser; kimliğin, belleğin ve izlerin peşinden giden
              bağımsız bir edebiyat ve kültür dergisidir.
            </p>
            <p
              className="text-[#888] leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)", fontSize: "15px" }}
            >
              Her sayıda tek bir sorudan yola çıkıyoruz. O soruyu şiir,
              deneme, hikaye ve söyleşilerle yanıtlamaya çalışıyoruz. Cevap
              bulmak için değil, soruyu daha derine taşımak için.
            </p>
            <Link
              href="/hakkinda"
              className="nav-link hover:text-[#c8001e] transition-colors"
            >
              Daha Fazla →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ARCHIVE ── */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex justify-between items-end mb-4">
            <p className="section-label">Arşiv</p>
            <Link href="/sayilar" className="nav-link hover:text-heading transition-colors">
              Tüm Sayılar →
            </Link>
          </div>

          <div>
            {previousIssues.map((issue) => (
              <IssueCard key={issue.slug} issue={issue} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATEMENT STRIP ── */}
      <section className="border-t border-[#1e1e1e] bg-[#c8001e]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-center">
          <p
            className="text-white text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            6:45 yayınları · ALTIKIRKBEŞ · Kaspar Hauser
          </p>
        </div>
      </section>
    </div>
  );
}
