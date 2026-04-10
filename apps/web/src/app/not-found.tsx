import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        backgroundColor: "var(--bg)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "1.5rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          fontWeight: 400,
          color: "var(--text)",
          marginBottom: "1rem",
        }}
      >
        Sayfa bulunamadı
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "18px",
          color: "var(--text-secondary)",
          marginBottom: "2.5rem",
        }}
      >
        Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          textDecoration: "none",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "2px",
        }}
      >
        ← Ana Sayfaya Dön
      </Link>
    </div>
  );
}
