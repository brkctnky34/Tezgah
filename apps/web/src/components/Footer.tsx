export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <p
              className="tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              Kaspar Hauser
            </p>
            <p className="meta-text mt-1">6:45 yayınları</p>
          </div>

          <div className="flex gap-8">
            <a href="/hakkinda" className="nav-link">
              Hakkında
            </a>
            <a href="/iletisim" className="nav-link">
              İletişim
            </a>
          </div>
        </div>

        <hr className="divider my-8" />

        <p className="meta-text text-center">
          © 2024 Kaspar Hauser · 6:45 yayınları
        </p>
      </div>
    </footer>
  );
}
