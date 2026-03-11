import { defineArrayMember, defineField, defineType } from "sanity";

const bookFields = [
  defineField({ name: "title", type: "string", validation: (r) => r.required() }),
  defineField({ name: "author", type: "string", validation: (r) => r.required() }),
  defineField({
    name: "cover",
    type: "image",
    title: "Cover image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
  }),
  defineField({ name: "genres", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
  defineField({ name: "note", type: "text", rows: 2 }),
  defineField({ name: "progress", type: "number", title: "Progress (0–100)", validation: (r) => r.min(0).max(100) }),
  defineField({
    name: "status",
    type: "string",
    options: { list: ["reading", "read", "tbr"], layout: "radio" },
    validation: (r) => r.required(),
  }),
  defineField({ name: "finishedYear", type: "number" }),
];

export const nowType = defineType({
  name: "siteNow",
  title: "Now",
  type: "document",
  // Singleton — only one document of this type
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "updatedAt", title: "Last updated", type: "date" }),

    // ── Reading ──────────────────────────────────────────────────────────────
    defineField({
      name: "currentBook",
      title: "Currently reading",
      type: "object",
      fields: bookFields,
    }),
    defineField({
      name: "bookLibrary",
      title: "Book library (read / TBR)",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: bookFields })],
    }),

    // ── Listening ─────────────────────────────────────────────────────────────
    defineField({
      name: "artists",
      title: "Artists I'm listening to",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "genres", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
            defineField({ name: "note", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),

    // ── Playing ───────────────────────────────────────────────────────────────
    defineField({
      name: "games",
      title: "Games",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "cover",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
            }),
            defineField({ name: "platform", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
            defineField({ name: "genres", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
            defineField({ name: "note", type: "text", rows: 2 }),
            defineField({
              name: "status",
              type: "string",
              options: { list: ["playing", "wishlist"], layout: "radio" },
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
