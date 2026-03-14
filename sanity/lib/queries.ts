import { groq } from "next-sanity";

// ── Blog ──────────────────────────────────────────────────────────────────────

export const postsQuery = groq`
  *[_type == "post"] | order(date desc) {
    "slug": slug.current,
    title,
    description,
    date,
    tags,
    readingTime
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    date,
    tags,
    readingTime,
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;

// ── Work ──────────────────────────────────────────────────────────────────────

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    "slug": slug.current,
    title,
    tagline,
    year,
    role,
    tags,
    "cover": cover.asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    tagline,
    year,
    role,
    tags,
    url,
    github,
    problem,
    solution,
    outcome,
    "cover": cover.asset->url
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] { "slug": slug.current }
`;

// ── Now (singleton) ───────────────────────────────────────────────────────────

export const nowQuery = groq`
  *[_type == "siteNow"][0] {
    updatedAt,
    currentBook {
      title,
      author,
      "cover": cover.asset->url,
      genres,
      note,
      progress,
      status,
      finishedYear
    },
    bookLibrary[] {
      title,
      author,
      "cover": cover.asset->url,
      genres,
      note,
      status,
      finishedYear
    },
    artists[] {
      name,
      genres,
      note
    },
    games[] {
      title,
      "cover": cover.asset->url,
      platform,
      genres,
      note,
      status
    }
  }
`;
