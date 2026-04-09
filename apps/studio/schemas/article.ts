import { defineField, defineType } from "sanity";

const articleTypes = [
  { title: "Deneme", value: "deneme" },
  { title: "Şiir", value: "siir" },
  { title: "Hikaye", value: "hikaye" },
  { title: "Söyleşi", value: "soylesi" },
  { title: "Çeviri", value: "ceviri" },
];

export const articleSchema = defineType({
  name: "article",
  title: "Metin",
  type: "document",
  fields: [
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
      name: "type",
      title: "Tür",
      type: "string",
      options: { list: articleTypes, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Yazar",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Özet",
      type: "text",
      rows: 3,
      description: "İçindekiler listesinde gösterilecek kısa özet",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Metin İçeriği",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Alıntı", value: "blockquote" },
            { title: "Başlık", value: "h2" },
            { title: "Alt Başlık", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author" },
  },
});
