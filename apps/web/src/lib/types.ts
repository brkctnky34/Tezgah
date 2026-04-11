export type PostType = "deneme" | "siir" | "hikaye" | "soylesi" | "ceviri";

export interface Post {
  slug: string;
  title: string;
  author: string;
  type: PostType;
  date: string;
  excerpt: string;
  image?: string;
  bodyHtml: string;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const typeLabels: Record<PostType, string> = {
  deneme: "Deneme",
  siir: "Şiir",
  hikaye: "Hikaye",
  soylesi: "Söyleşi",
  ceviri: "Çeviri",
};
