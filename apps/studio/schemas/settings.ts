import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Site Ayarları",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Adı",
      type: "string",
      initialValue: "Kaspar Hauser",
    }),
    defineField({
      name: "publisher",
      title: "Yayınevi",
      type: "string",
      initialValue: "6:45 yayınları",
    }),
    defineField({
      name: "description",
      title: "Site Açıklaması (SEO)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactEmail",
      title: "Genel İletişim E-postası",
      type: "string",
    }),
    defineField({
      name: "submissionEmail",
      title: "Yazı Gönderimi E-postası",
      type: "string",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Kullanıcı Adı",
      type: "string",
      initialValue: "645kasparhauser",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
