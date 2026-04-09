import { defineField, defineType } from "sanity";

export const issueSchema = defineType({
  name: "issue",
  title: "Sayı",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Sayı Numarası",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Tarih",
      type: "string",
      description: "Örnek: Aralık 2024",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverQuote",
      title: "Kapak Alıntısı",
      type: "string",
      description: "Ana sayfada ve sayı başlığında gösterilecek alıntı",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "editorial",
      title: "Editörden",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "articles",
      title: "Metinler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
    prepare({ title, subtitle }) {
      return { title: `${title}`, subtitle };
    },
  },
  orderings: [{ title: "Sayı No", name: "numberDesc", by: [{ field: "number", direction: "desc" }] }],
});
