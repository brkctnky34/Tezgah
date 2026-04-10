import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";

const BASE_URL = "https://kasparhauser.xyz";

function getDescription(): string {
  try {
    const filePath = path.join(process.cwd(), "content", "settings.json");
    const settings = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return settings.description || "Kaspar Hauser — 6:45 yayınları";
  } catch {
    return "Kaspar Hauser — 6:45 yayınları";
  }
}

const description = getDescription();

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kaspar Hauser — 6:45 yayınları",
    template: "%s — Kaspar Hauser",
  },
  description,
  keywords: [
    "edebiyat",
    "kültür",
    "dergi",
    "6:45 yayınları",
    "kaspar hauser",
    "şiir",
    "deneme",
  ],
  openGraph: {
    title: "Kaspar Hauser — 6:45 yayınları",
    description,
    type: "website",
    locale: "tr_TR",
    siteName: "Kaspar Hauser",
  },
  twitter: {
    card: "summary",
    title: "Kaspar Hauser — 6:45 yayınları",
    description,
  },
  alternates: { canonical: BASE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Periodical",
  name: "Kaspar Hauser",
  publisher: { "@type": "Organization", name: "6:45 yayınları" },
  inLanguage: "tr",
  description:
    "Kaspar Hauser, 6:45 yayınları tarafından çıkarılan bağımsız bir edebiyat ve kültür platformudur.",
  url: BASE_URL,
};

// Netlify Identity redirect — admin davet linklerini /admin'e yönlendirir
const netlifyIdentityRedirect = `
if(window.location.hash&&(window.location.hash.indexOf('invite_token')>-1||window.location.hash.indexOf('access_token')>-1)){window.location.href='/admin'+window.location.hash;}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Font preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts — display=swap ile render blocking engellenir */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Netlify Identity redirect (3 satır, 150KB widget yerine) */}
        <script dangerouslySetInnerHTML={{ __html: netlifyIdentityRedirect }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
