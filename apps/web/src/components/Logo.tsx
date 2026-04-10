import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`block no-underline ${className}`}>
      <span
        className="block tracking-[0.15em] uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "var(--text)",
        }}
      >
        Kaspar Hauser
      </span>
      <span
        className="block"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginTop: "2px",
        }}
      >
        6:45 yayınları
      </span>
    </Link>
  );
}

export function LogoInline({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`no-underline tracking-[0.2em] uppercase ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "15px",
        fontWeight: 600,
        color: "var(--text)",
      }}
    >
      Kaspar Hauser
    </Link>
  );
}
