import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Kaspar Hauser dergisi ile iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="border-b border-[#1e1e1e] pb-12 mb-12">
        <h1
          className="text-heading mb-4"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "#f0f0f0" }}>İLE</span>
          <span style={{ color: "#c8001e" }}>TİŞİM</span>
        </h1>
        <p
          className="text-[#888] mt-4 max-w-lg leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
        >
          Yazı göndermek, iş birliği teklif etmek ya da sadece merhaba demek
          için bize ulaşın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact info */}
        <div className="space-y-10">
          <div>
            <p className="article-type mb-3">Genel İletişim</p>
            <p
              className="text-heading text-lg"
              style={{ fontFamily: "var(--font-eb-garamond)" }}
            >
              kasparhauser@645yayinlari.com
            </p>
          </div>

          <div>
            <p className="article-type mb-3">Yazı Gönderimi</p>
            <p
              className="text-[#888] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Her sayının temasına uygun özgün metinleri kabul ediyoruz.
              Daha önce başka yerde yayımlanmamış çalışmalar için yazın.
            </p>
            <p
              className="text-heading text-lg mt-3"
              style={{ fontFamily: "var(--font-eb-garamond)" }}
            >
              yazi@645yayinlari.com
            </p>
          </div>

          <div>
            <p className="article-type mb-3">Sosyal Medya</p>
            <div className="space-y-2">
              <p
                className="text-[#888] text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Instagram:{" "}
                <span className="text-heading">@645kasparhauser</span>
              </p>
            </div>
          </div>
        </div>

        {/* Submission guidelines */}
        <div className="border border-[#1e1e1e] p-8">
          <p className="article-type mb-6">Yazı Gönderimi Kuralları</p>

          <ul
            className="space-y-4 text-[#888] text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <li className="flex gap-3">
              <span className="text-[#c8001e] shrink-0">—</span>
              <span>
                Metinler Türkçe olmalıdır. Çeviri teklifleri için ayrıca
                yazabilirsiniz.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8001e] shrink-0">—</span>
              <span>
                Şiir için uzunluk sınırı yoktur. Deneme ve hikaye için
                maksimum 3.000 kelime öneriyoruz.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8001e] shrink-0">—</span>
              <span>
                Başka bir yerde yayımlanmış ya da aynı anda başka bir yere
                gönderilmiş metinleri değerlendirmiyoruz.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8001e] shrink-0">—</span>
              <span>
                Her sayının temasını önceden duyuruyoruz. Temaya uygun metinler
                öncelikli değerlendirmeye alınır.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8001e] shrink-0">—</span>
              <span>
                Yanıt süresi maksimum altı haftadır. Yanıt alamamanız
                durumunda metninizi başka yerlere gönderebilirsiniz.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
