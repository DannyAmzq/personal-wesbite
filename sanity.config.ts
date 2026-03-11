import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Danny Amezquita",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Now page
            S.listItem()
              .title("Now")
              .id("siteNow")
              .child(S.document().schemaType("siteNow").documentId("siteNow")),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (item) => !["siteNow"].includes(item.getId() ?? "")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
