import { LogoInline } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c1c] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <LogoInline className="mb-2" />
            <p className="meta-text mt-1">6:45 yayınları</p>
          </div>

          <div className="flex gap-10 text-right">
            <a href="/hakkinda" className="nav-link">Hakkında</a>
            <a href="/iletisim" className="nav-link">İletişim</a>
          </div>
        </div>

        <hr className="divider my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="meta-text">
            © 2024 Kaspar Hauser · 6:45 yayınları
          </p>
          <p className="meta-text">altıkırkbeş</p>
        </div>
      </div>
    </footer>
  );
}
