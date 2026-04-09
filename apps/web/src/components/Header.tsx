"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoInline } from "./Logo";

const navLinks = [
  { href: "/sayilar", label: "Sayılar" },
  { href: "/hakkinda", label: "Hakkında" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#1e1e1e] sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <LogoInline />

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
