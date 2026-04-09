import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BASE_URL = "https://kasparhauser.com"; // kendi domain'inizle değiştirin

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kaspar Hauser — 6:45 yayınları",
    template: "%s — Kaspar Hauser",
  },
  description:
    "Kaspar Hauser, 6:45 yayınları tarafından çıkarılan bağımsız bir edebiyat ve kültür dergisidir.",
  keywords: ["edebiyat", "kültür", "dergi", "6:45 yayınları", "kaspar hauser", "şiir", "deneme"],
  openGraph: {
    title: "Kaspar Hauser — 6:45 yayınları",
    description:
      "Kaspar Hauser, 6:45 yayınları tarafından çıkarılan bağımsız bir edebiyat ve kültür dergisidir.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kaspar Hauser",
  },
  twitter: {
    card: "summary",
    title: "Kaspar Hauser — 6:45 yayınları",
    description:
      "Bağımsız edebiyat ve kültür dergisi.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Periodical",
  name: "Kaspar Hauser",
  publisher: {
    "@type": "Organization",
    name: "6:45 yayınları",
  },
  inLanguage: "tr",
  description:
    "Kaspar Hauser, 6:45 yayınları tarafından çıkarılan bağımsız bir edebiyat ve kültür dergisidir.",
  url: BASE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
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
