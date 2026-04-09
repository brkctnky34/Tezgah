import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { hakkindaMetni as h } from "@/data/hakkinda";

export const metadata: Metadata = {
  title: "Hakkında",
  description:
    "Kaspar Hauser ve 6:45 yayınları hakkında. Bağımsız bir edebiyat ve kültür dergisi.",
};

export default function HakkindaPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 border-b border-[#1e1e1e] pb-16">
        <div>
          <Logo size="lg" />
        </div>
        <div className="flex flex-col justify-end">
          <p
            className="text-2xl text-heading leading-relaxed"
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontStyle: "italic",
            }}
          >
            {h.acisCumlesi}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
        {/* Sidebar */}
        <div>
          <div className="sticky top-24 space-y-8">
            {Object.entries(h.bilgiler).map(([key, val]) => {
              const labels: Record<string, string> = {
                yayinevi: "Yayınevi",
                kurulus: "Kuruluş",
                dil: "Dil",
                format: "Format",
              };
              return (
                <div key={key}>
                  <p className="article-type mb-2">{labels[key] ?? key}</p>
                  <p
                    className="text-heading"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
                  >
                    {val}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main text */}
        <div className="prose-kh">
          {h.paragraflar.map((paragraf, i) => (
            <p key={i}>{paragraf}</p>
          ))}
        </div>
      </div>

      {/* Previous publications */}
      {h.oncekiYayinlar.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#1e1e1e]">
          <p className="section-label mb-8">Önceki Yayınlar</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {h.oncekiYayinlar.map((yayin) => (
              <div key={yayin.isim} className="border border-[#1e1e1e] p-8">
                <p className="article-type mb-4">{yayin.yillar}</p>
                <h3
                  className="text-heading text-3xl mb-4"
                  style={{
                    fontFamily: "var(--font-eb-garamond)",
                    fontStyle: "italic",
                  }}
                >
                  {yayin.isim}
                </h3>
                <p
                  className="text-[#666] text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {yayin.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
