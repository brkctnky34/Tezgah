import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Kaspar Hauser dergisi ile iletişime geçin.",
};

interface IletisimData {
  acisCumlesi: string;
  iletisimEmail: string;
  yaziEmail: string;
  instagram: string;
  kurallar: string[];
}

function getIletisimData(): IletisimData {
  const filePath = path.join(process.cwd(), "content", "iletisim.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export default function IletisimPage() {
  const d = getIletisimData();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b pb-14 mb-14" style={{ borderColor: "var(--border)" }}>
        <div
          className="mb-8 mx-auto"
          style={{ width: "40px", height: "2px", backgroundColor: "var(--accent)" }}
        />
        <h1
          className="text-center uppercase mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "var(--text)",
          }}
        >
          İletişim
        </h1>
        <p
          className="text-center max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            fontStyle: "italic",
            color: "var(--text-muted)",
          }}
        >
          {d.acisCumlesi}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <p className="type-label mb-2">Genel İletişim</p>
            <a
              href={`mailto:${d.iletisimEmail}`}
              style={{ fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--text)", textDecoration: "none" }}
            >
              {d.iletisimEmail}
            </a>
          </div>

          <div>
            <p className="type-label mb-2">Yazı Gönderimi</p>
            <a
              href={`mailto:${d.yaziEmail}`}
              style={{ fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--text)", textDecoration: "none" }}
            >
              {d.yaziEmail}
            </a>
          </div>

          <div>
            <p className="type-label mb-2">Instagram</p>
            <a
              href={`https://instagram.com/${d.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "var(--text)", textDecoration: "none" }}
            >
              @{d.instagram}
            </a>
          </div>
        </div>

        {/* Submission rules */}
        <div className="border p-8" style={{ borderColor: "var(--border)" }}>
          <p className="type-label mb-6">Yazı Gönderimi Kuralları</p>
          <ul className="space-y-4">
            {d.kurallar.map((kural, i) => (
              <li
                key={i}
                className="flex gap-3"
                style={{ fontFamily: "var(--font-ui)", fontSize: "13px", lineHeight: 1.7, color: "var(--text-secondary)" }}
              >
                <span className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>—</span>
                <span>{kural}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
