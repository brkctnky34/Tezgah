import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "kaspar-hauser-studio",
  title: "Kaspar Hauser — Admin",

  // sanity.io'dan proje oluşturunca bu değerleri doldurun:
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",

  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
