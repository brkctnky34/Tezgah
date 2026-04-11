import fs from "fs";
import path from "path";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

interface Settings {
  altyazi: string;
  yayinevi: string;
  instagram: string;
}

function getSettings(): Settings {
  const filePath = path.join(process.cwd(), "content", "settings.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export default function HomePage() {
  const posts = getAllPosts();
  const settings = getSettings();

  return (
    <div>
      {/* ── MASTHEAD ── */}
      <section className="border-b py-12 md:py-20" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="mx-auto mb-6" style={{ width: "32px", height: "2px", backgroundColor: "var(--accent)" }} />
          <h1
            className="glitch-title uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Kaspar Hauser
          </h1>
          <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: "17px", fontStyle: "italic", color: "var(--text-muted)" }}>
            {settings.altyazi}
          </p>
          <p className="mt-2" style={{ fontFamily: "var(--font-ui)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {settings.yayinevi}
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <a
          href={`https://instagram.com/${settings.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block max-w-5xl mx-auto px-6 py-8"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="type-label">Instagram</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "17px",
                  fontStyle: "italic",
                  color: "var(--text-secondary)",
                }}
              >
                @{settings.instagram}
              </span>
            </div>
            <span
              className="shrink-0 transition-transform group-hover:translate-x-1"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              instagram.com →
            </span>
          </div>
        </a>
      </section>

      {/* ── DÜKKAN ── */}
      <section className="border-t border-b" style={{ borderColor: "var(--border)" }}>
        <a
          href="https://645dukkan.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block max-w-5xl mx-auto px-6 py-8"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="type-label">Dükkan</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "17px",
                  fontStyle: "italic",
                  color: "var(--text-secondary)",
                }}
              >
                Kitaplar, baskılar ve kolektif ürünleri
              </span>
            </div>
            <span
              className="shrink-0 transition-transform group-hover:translate-x-1"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              645dukkan.com →
            </span>
          </div>
        </a>
      </section>
    </div>
  );
}
