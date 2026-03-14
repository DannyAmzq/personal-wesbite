// ── Update this file to add / edit blog posts ─────────────────────────────────

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string
  tags: string[];
  readingTime: string;
  body: string; // plain text / markdown-ish for now
};

export const posts: Post[] = [
  {
    slug: "ux-and-it-better-together",
    title: "UX and IT: Better Together",
    description:
      "Why having a background in IT support makes me a better UX designer — and vice versa.",
    date: "2025-11-10",
    tags: ["UX", "IT", "Career"],
    readingTime: "4 min",
    body: `Most designers never touch a server. Most IT folks never open Figma. I've done both, and the overlap is where the interesting work happens.

When you understand how systems fail — really fail, at the infrastructure level — you design with a different kind of empathy. You stop assuming the network is always up. You think about offline states, error messages that are actually helpful, and flows that don't lose user data when something goes wrong.

On the flip side, time spent in IT taught me to talk to non-technical stakeholders. That skill translates directly to presenting design rationale to engineers and product managers.

If you're in IT and curious about design, or a designer curious about systems — cross the aisle. The perspective is worth it.`,
  },
  {
    slug: "building-fast-with-nextjs-and-tailwind",
    title: "Building Fast with Next.js and Tailwind",
    description:
      "How I went from wireframe to deployed site in a weekend using the stack I reach for every time.",
    date: "2025-09-03",
    tags: ["Next.js", "Tailwind CSS", "Frontend"],
    readingTime: "6 min",
    body: `I've tried a lot of stacks. Vanilla HTML/CSS, Vue, Svelte, even a brief flirtation with Angular. These days I keep coming back to Next.js and Tailwind — not because they're trendy, but because they get out of my way.

Next.js gives me server components, file-based routing, and image optimization without configuration overhead. Tailwind keeps my CSS co-located with my markup, which means one less file to context-switch into.

The combination lets me go from wireframe to shipped product faster than anything else I've used. This very site was designed in Figma on a Friday and deployed by Sunday.

Here's what the setup looks like for a new project...`,
  },
  {
    slug: "designing-for-accessibility-from-day-one",
    title: "Designing for Accessibility from Day One",
    description:
      "Accessibility isn't a checklist you run at the end — it's a mindset that shapes every decision.",
    date: "2025-07-15",
    tags: ["Accessibility", "UX", "Design"],
    readingTime: "5 min",
    body: `I used to treat accessibility as a final QA step. Run an axe scan, fix the contrast issues, add some aria labels, ship. It took a project with a hard WCAG 2.1 AA requirement to change how I think about it.

The insight: accessibility problems that are expensive to fix at the end are cheap to avoid at the beginning. Color contrast is easier to bake into a design system than to retrofit across 50 components. Focus order makes sense if you designed with keyboard navigation in mind from the start.

The tools I keep open during design: Figma's accessibility annotations kit, the Colour Contrast Analyser, and axe DevTools for browser-level checking. Between those three, you catch most of the big issues before a line of code is written.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
