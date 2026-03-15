import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Danny Amezquita",
  description: "Freelance UX design and frontend development services.",
};

const services = [
  {
    title: "UX Design",
    description:
      "From user research and wireframes to polished high-fidelity prototypes. I design interfaces that are intuitive, accessible, and visually sharp.",
    deliverables: ["User flows & wireframes", "High-fidelity Figma mockups", "Interactive prototypes", "Design system setup"],
  },
  {
    title: "Frontend Development",
    description:
      "I build what I design — pixel-perfect, performant web apps using Next.js, React, and Tailwind. No handoff friction.",
    deliverables: ["Next.js / React development", "Responsive, accessible UI", "Animation with Framer Motion", "Vercel deployment"],
  },
];

const faqs = [
  {
    q: "How do you charge?",
    a: "Project-based for most design and development work. Hourly for ongoing retainer work. I'll send a clear estimate before anything starts.",
  },
  {
    q: "What's your availability?",
    a: "I take on a limited number of freelance projects at a time to keep quality high. Reach out and I'll let you know my current capacity.",
  },
  {
    q: "Do you do ongoing work?",
    a: "Yes — monthly retainers are available for clients who need regular design updates or ongoing frontend work.",
  },
  {
    q: "What does the process look like?",
    a: "Discovery call → scope and estimate → contract and deposit → work → revisions → delivery. Simple and no surprises.",
  },
];

export default function ServicesPage() {
  return (
    <main className="font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">Freelance</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] font-display">
            Services
          </h1>
          <p className="mt-4 text-base muted leading-relaxed">
            I work with startups, small businesses, and individuals who need design and engineering done right — without the agency overhead.
          </p>
          <div className="mt-6">
            <Link
              href="#contact"
              className="inline-flex h-11 items-center rounded-md px-5 text-sm font-semibold shadow transition-colors btn-accent"
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {services.map(({ title, description, deliverables }) => (
            <div key={title} className="flex flex-col gap-4 rounded-xl p-6 surface">
              <h2 className="text-lg font-bold text-[var(--foreground)] font-display">{title}</h2>
              <p className="text-sm muted leading-relaxed">{description}</p>
              <ul className="mt-auto flex flex-col gap-1.5 pt-2">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-display text-[var(--foreground)] mb-8">FAQ</h2>
          <div className="flex flex-col divide-y divide-[color-mix(in_oklab,var(--foreground)_10%,transparent)]">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-6 flex flex-col gap-2">
                <p className="font-semibold text-[var(--foreground)]">{q}</p>
                <p className="text-sm muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div id="contact" className="rounded-2xl surface p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-[var(--foreground)]">Ready to start?</h2>
            <p className="text-sm muted mt-1">Tell me what you're working on and I'll get back to you within a day.</p>
          </div>
          <a
            href="mailto:danny.amzq@gmail.com"
            className="shrink-0 inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-semibold shadow transition-colors btn-accent"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
            danny.amzq@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
