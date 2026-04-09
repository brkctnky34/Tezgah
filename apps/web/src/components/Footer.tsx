import { LogoInline } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <LogoInline className="mb-3" />
            <p className="meta-text mt-1">6:45 yayınları</p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-right">
            <a href="/sayilar" className="nav-link">
              Sayılar
            </a>
            <a href="/hakkinda" className="nav-link">
              Hakkında
            </a>
            <a href="/iletisim" className="nav-link">
              İletişim
            </a>
          </div>
        </div>

        <hr className="divider my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="meta-text">
            © 2024 Kaspar Hauser · 6:45 yayınları · Tüm hakları saklıdır.
          </p>
          <p className="meta-text">altıkırkbeş</p>
        </div>
      </div>
    </footer>
  );
}
