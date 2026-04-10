import type { Metadata } from "next";
import { hakkindaMetni as h } from "@/data/hakkinda";

export const metadata: Metadata = {
  title: "Hakkında",
  description:
    "Kaspar Hauser ve 6:45 yayınları hakkında. Bağımsız bir edebiyat ve kültür platformu.",
};

export default function HakkindaPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div
        className="border-b pb-14 mb-14"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mb-8 mx-auto"
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "var(--accent)",
          }}
        />
        <h1
          className="text-center uppercase mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "var(--text)",
          }}
        >
          Hakkında
        </h1>

        <p
          className="text-center max-w-xl mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "20px",
            fontStyle: "italic",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
        >
          {h.acisCumlesi}
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-16 max-w-3xl mx-auto">
        {/* Sidebar */}
        <div className="space-y-6">
          {Object.entries(h.bilgiler).map(([key, val]) => {
            const labels: Record<string, string> = {
              yayinevi: "Yayınevi",
              kurulus: "Kuruluş",
              dil: "Dil",
              format: "Format",
            };
            return (
              <div key={key}>
                <p className="type-label mb-1">{labels[key] ?? key}</p>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "13px",
                    color: "var(--text)",
                  }}
                >
                  {val}
                </p>
              </div>
            );
          })}
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
        <div
          className="mt-20 pt-12 border-t max-w-3xl mx-auto"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="section-title mb-8">Önceki Yayınlar</p>
          {h.oncekiYayinlar.map((yayin) => (
            <div
              key={yayin.isim}
              className="border p-8"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="type-label mb-3">{yayin.yillar}</p>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--text)",
                }}
              >
                {yayin.isim}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                {yayin.aciklama}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
