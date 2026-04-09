import type { Metadata } from "next";
import Logo from "@/components/Logo";

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
            Kaspar Hauser kimdir? Nereden geldiğini bilmiyordu. Adından
            başkasını bilmiyordu. Ve bu belirsizlik onu sonsuz kıldı.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
        {/* Sidebar labels */}
        <div>
          <div className="sticky top-24 space-y-8">
            <div>
              <p className="article-type mb-2">Yayınevi</p>
              <p
                className="text-heading"
                style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
              >
                6:45 yayınları
              </p>
            </div>
            <div>
              <p className="article-type mb-2">Kuruluş</p>
              <p
                className="text-heading"
                style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
              >
                2024
              </p>
            </div>
            <div>
              <p className="article-type mb-2">Dil</p>
              <p
                className="text-heading"
                style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
              >
                Türkçe
              </p>
            </div>
            <div>
              <p className="article-type mb-2">Format</p>
              <p
                className="text-heading"
                style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
              >
                Dijital · Periyodik
              </p>
            </div>
          </div>
        </div>

        {/* Main text */}
        <div className="prose-kh">
          <p>
            Kaspar Hauser, 6:45 yayınları bünyesinde çıkarılan bağımsız bir
            edebiyat ve kültür dergisidir. Her sayı, tek bir sorudan yola çıkar.
            O soru; şiirle, denemeyle, hikayeyle, söyleşiyle derinleştirilir.
            Cevap aramak için değil — soruyu daha uzak bir yere taşımak için.
          </p>

          <p>
            Kaspar Hauser, 19. yüzyılda Almanya'da ortaya çıkan gizemli bir
            çocuktu. Nereden geldiğini bilmiyordu. Kendi adından başka hiçbir
            şeyi yoktu. Bu belirsizlik onu bir sembol hâline getirdi: Kimliğin
            kökenlerini araştıran, hafızanın sınırlarını zorlayan, izlerin
            peşinden giden bir figür.
          </p>

          <p>
            Dergi bu ismi bir çağrışım olarak taşıyor. Kim olduğumuzu, nereden
            geldiğimizi, hangi hikâyelerin bizi var ettiğini sormak için bir
            zemin açıyor. Bu zemin; edebiyat, felsefe, görsel sanat ve müzikle
            örülü.
          </p>

          <p>
            6:45 yayınları, 2024 yılında kurulmuş bağımsız bir yayın
            kolektifidir. Kaspar Hauser onun ilk periyodik yayınıdır.
            Öncesinde, yayınevinin çıkardığı{" "}
            <em>Underground Poetixi</em> dergisiyle edebiyat dünyasına adım
            atıldı.
          </p>

          <p>
            Her sayı sınırlı sayıda çıkar. Her metin yayın kurulunun
            değerlendirmesiyle yayımlanır. Ticari kaygıdan uzak, okuyucu
            odaklı bir yayın anlayışı benimsenir.
          </p>
        </div>
      </div>

      {/* Previous publication */}
      <div className="mt-20 pt-12 border-t border-[#1e1e1e]">
        <p className="section-label mb-8">Önceki Yayınlar</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#1e1e1e] p-8">
            <p className="article-type mb-4">2022 — 2024</p>
            <h3
              className="text-heading text-3xl mb-4"
              style={{
                fontFamily: "var(--font-eb-garamond)",
                fontStyle: "italic",
              }}
            >
              Underground Poetixi
            </h3>
            <p
              className="text-[#666] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              6:45 yayınlarının ilk dergisi. Yeraltı edebiyatının kenarlarında
              gezinen, şiire ve denemelere odaklanan bağımsız bir yayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
