import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

export default function HomePage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {/* ── MASTHEAD ── */}
      <section
        className="border-b py-16 md:py-20"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Accent line */}
          <div
            className="mx-auto mb-8"
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "var(--accent)",
            }}
          />

          {/* Magazine title */}
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Kaspar Hauser
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              fontStyle: "italic",
              color: "var(--text-muted)",
            }}
          >
            Bağımsız edebiyat ve kültür platformu
          </p>

          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            6:45 yayınları
          </p>
        </div>
      </section>

      {/* ── CONTENT GRID ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
