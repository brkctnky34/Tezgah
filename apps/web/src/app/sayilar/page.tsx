import type { Metadata } from "next";
import IssueCard from "@/components/IssueCard";
import { issues } from "@/data/issues";

export const metadata: Metadata = {
  title: "Sayılar",
  description: "Kaspar Hauser dergisinin tüm sayıları.",
};

export default function SayilarPage() {
  const sorted = [...issues].reverse();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-[#1e1e1e] pb-10 mb-10">
        <h1
          className="text-heading mb-3"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "#f0f0f0" }}>SAY</span>
          <span style={{ color: "#c8001e" }}>ILAR</span>
        </h1>
        <p
          className="text-[#555] mt-4 text-sm tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {issues.length} sayı · 2024 —
        </p>
      </div>

      {/* Issue grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((issue) => (
          <IssueCard key={issue.slug} issue={issue} />
        ))}
      </div>
    </div>
  );
}
