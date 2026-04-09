import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

export default function HomePage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {/* ── SITE HEADER STRIP ── */}
      <section className="border-b border-[#1c1c1c] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1
                className="kh-logo"
                style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 0.88 }}
              >
                <span className="block white-part">KAS</span>
                <span className="block white-part">PAR</span>
                <span className="block red-part">HAU</span>
                <span className="block red-part">SER</span>
              </h1>
            </div>

            <div className="md:max-w-xs pb-1">
              <p
                className="text-[#444] text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                6:45 yayınları tarafından sürekli yayınlanan bağımsız bir
                edebiyat platformu. Şiir, deneme, hikaye, söyleşi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="section-label">Tüm Metinler</p>
          <p
            className="text-[#2e2e2e] text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {sorted.length} metin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#131313]">
          {sorted.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM STRIP ── */}
      <section className="border-t border-[#1c1c1c] bg-[#c8001e]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
          <p
            className="text-white text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            6:45 yayınları · altıkırkbeş · Kaspar Hauser
          </p>
        </div>
      </section>
    </div>
  );
}
