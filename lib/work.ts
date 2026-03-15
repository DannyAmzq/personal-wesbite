// ── Update this file to add / edit case studies ───────────────────────────────

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  tags: string[];
  url?: string;
  github?: string;
  problem: string;
  solution: string;
  outcome: string;
  /** Path under /public/work/ */
  cover?: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    tagline: "Redesigning the onboarding experience for a SaaS platform",
    year: "2025",
    role: "UX Designer & Frontend Developer",
    tags: ["UX Design", "React", "Figma"],
    problem:
      "Users were dropping off during onboarding at a rate of 60%. The existing flow had too many steps, unclear copy, and no progress indicator.",
    solution:
      "Redesigned the flow from 9 steps to 4, rewrote all microcopy, added a persistent progress bar, and built the new UI in React with Framer Motion transitions.",
    outcome:
      "Onboarding drop-off fell to 22% within 30 days of launch. Time-to-first-value dropped by 40%.",
  },
  {
    slug: "project-two",
    title: "Project Two",
    tagline: "Internal ticketing dashboard for a mid-size company",
    year: "2024",
    role: "Frontend Developer",
    tags: ["Next.js", "TypeScript", "Dashboard"],
    problem:
      "The team was managing 200+ weekly tickets via email threads, causing missed SLAs and frustrated staff.",
    solution:
      "Built a lightweight ticketing dashboard with Next.js, role-based views, and Slack notifications for escalations.",
    outcome:
      "SLA compliance improved from 67% to 94%. Average ticket resolution time cut in half.",
  },
  {
    slug: "project-three",
    title: "Project Three",
    tagline: "Component library and design system for a startup",
    year: "2024",
    role: "UX Engineer",
    tags: ["Design Systems", "Tailwind CSS", "Storybook"],
    problem:
      "Engineering and design were working from different sources of truth, causing UI inconsistencies across the product.",
    solution:
      "Built a shared component library in React + Tailwind with a Storybook for documentation, bridging the gap between Figma and code.",
    outcome:
      "Reduced UI bugs by 35% and cut design handoff time from days to hours.",
  },
  {
    slug: "project-four",
    title: "Project Four",
    tagline: "Freelance e-commerce redesign for a local retailer",
    year: "2023",
    role: "UX Designer & Frontend Developer",
    tags: ["E-Commerce", "UX Design", "Performance"],
    problem:
      "The client's online store had a 72% bounce rate and slow page loads, costing them conversions.",
    solution:
      "Redesigned the product pages and checkout flow, optimized images, and improved Core Web Vitals across the board.",
    outcome:
      "Bounce rate dropped to 41%. Conversion rate increased by 28% in the first month.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
