import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "UX Engineer and Frontend Developer based in Texas.",
};

// Flip to `true` once /public/resume.pdf is added.
const RESUME_PDF_AVAILABLE = false;

const experience = [
  {
    company: "Company Name",
    role: "UX Engineer / Frontend Developer",
    period: "2024 — Present",
    bullets: [
      "Led redesign of core onboarding flow, reducing drop-off by 38%.",
      "Built reusable component library in React + Tailwind used across 3 products.",
      "Collaborated with PMs and engineers to ship bi-weekly design iterations.",
    ],
  },
  {
    company: "Freelance",
    role: "UX Designer & Frontend Developer",
    period: "2021 — Present",
    bullets: [
      "Designed and built websites and web apps for small businesses and startups.",
      "Provided UX audits and redesigns for e-commerce and SaaS clients.",
    ],
  },
];

const education = [
  {
    institution: "Your University",
    degree: "B.S. in Computer Science",
    period: "2018 — 2022",
  },
];

const skills = [
  { category: "Design", items: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Accessibility", "UI/UX Research"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"] },
  { category: "Tools", items: ["Git", "GitHub", "Vercel", "Storybook", "Figma Dev Mode", "Slack", "Notion"] },
];

export default function ResumePage() {
  return (
    <main className="font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">Resume</span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] font-display">
              Danny Amezquita
            </h1>
            <p className="mt-1 muted">UX Engineer · Frontend Developer · Texas</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm muted">
              <a href="mailto:danny.amzq@gmail.com" className="hover:text-[var(--accent)] transition-colors">
                danny.amzq@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/danny-amezquita/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/DannyAmzq" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                GitHub
              </a>
            </div>
          </div>
          {RESUME_PDF_AVAILABLE && (
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex h-9 items-center gap-2 rounded-md border px-4 text-sm font-semibold shadow-sm transition-colors surface hover:bg-[color-mix(in_oklab,var(--background)_82%,transparent)]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          )}
        </div>

        <div className="flex flex-col gap-14">
          {/* Experience */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-6">Experience</h2>
            <div className="flex flex-col gap-8">
              {experience.map((job) => (
                <div key={job.company}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="font-semibold text-[var(--foreground)]">{job.role}</p>
                      <p className="text-sm muted">{job.company}</p>
                    </div>
                    <span className="shrink-0 text-sm muted">{job.period}</span>
                  </div>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="text-sm muted flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-6">Education</h2>
            <div className="flex flex-col gap-4">
              {education.map((ed) => (
                <div key={ed.institution} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{ed.degree}</p>
                    <p className="text-sm muted">{ed.institution}</p>
                  </div>
                  <span className="shrink-0 text-sm muted">{ed.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-6">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map(({ category, items }) => (
                <div key={category}>
                  <p className="text-sm font-semibold text-[var(--foreground)] mb-2">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xs rounded-full px-2.5 py-1 surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
