import Link from "next/link";
import { Issue } from "@/data/issues";

interface IssueCardProps {
  issue: Issue;
  variant?: "default" | "compact";
}

export default function IssueCard({
  issue,
  variant = "default",
}: IssueCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/sayilar/${issue.slug}`}
        className="block group border-t border-[#1e1e1e] py-5 hover:border-[#c8001e] transition-colors duration-300"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="meta-text block mb-2">Sayı {issue.number}</span>
            <h3
              className="font-display text-2xl text-heading group-hover:text-red-kh transition-colors duration-300"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {issue.title}
            </h3>
          </div>
          <span className="meta-text shrink-0 mt-1">{issue.date}</span>
        </div>
        <p className="text-sm text-[#666] mt-2 font-sans leading-relaxed">
          {issue.articles.length} metin
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/sayilar/${issue.slug}`}
      className="block group bg-[#0d0d0d] border border-[#1e1e1e] p-8 hover:border-[#c8001e]/40 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Issue number + date */}
      <div className="flex justify-between items-start mb-6">
        <span className="article-type">Sayı {issue.number}</span>
        <span className="meta-text">{issue.date}</span>
      </div>

      {/* Cover quote */}
      <blockquote
        className="text-3xl leading-tight mb-6 text-heading"
        style={{ fontFamily: "var(--font-eb-garamond)", fontStyle: "italic" }}
      >
        &ldquo;{issue.coverQuote}&rdquo;
      </blockquote>

      {/* Description */}
      <p
        className="text-sm text-[#888] leading-relaxed mb-8"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {issue.description}
      </p>

      {/* Article count */}
      <div className="flex items-center gap-2">
        <span
          className="text-[#c8001e] group-hover:translate-x-1 transition-transform duration-300 inline-block"
          aria-hidden
        >
          →
        </span>
        <span className="meta-text">
          {issue.articles.length} metin · Oku
        </span>
      </div>
    </Link>
  );
}
