import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const isSanityConfigured = projectId !== "placeholder";

if (!isSanityConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — falling back to static content. " +
      "Set it in .env.local to enable the CMS."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true, // false for draft mode / real-time updates
});
