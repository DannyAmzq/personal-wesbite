import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses | Danny Amezquita",
  description: "The tools, gear, and software I use daily for design and development.",
};

const categories = [
  {
    name: "Hardware",
    items: [
      { name: "MacBook Pro", note: "Primary machine for design and development." },
      { name: "External Monitor", note: "Extra screen real estate makes a huge difference." },
      { name: "Mechanical Keyboard", note: "Tactile switches — worth every penny." },
    ],
  },
  {
    name: "Design",
    items: [
      { name: "Figma", note: "Everything from wireframes to high-fidelity prototypes." },
      { name: "Framer", note: "For interactive prototypes that go beyond what Figma can handle." },
      { name: "Colour Contrast Analyser", note: "Always open when working on accessible UI." },
    ],
  },
  {
    name: "Development",
    items: [
      { name: "VS Code", note: "With a minimal theme and a handful of essential extensions." },
      { name: "Next.js + React", note: "My default stack for anything web-based." },
      { name: "Tailwind CSS", note: "Utility-first CSS — co-located styles keep me sane." },
      { name: "Framer Motion", note: "Animations that feel natural without fighting the browser." },
      { name: "Vercel", note: "Deploy in seconds. The DX is unmatched." },
    ],
  },
  {
    name: "Security & Systems",
    items: [
      { name: "Bitwarden", note: "Password manager — open source, cross-platform." },
      { name: "Wireshark", note: "Network troubleshooting and curiosity." },
    ],
  },
  {
    name: "Productivity",
    items: [
      { name: "Notion", note: "Project planning, notes, and client docs." },
      { name: "Raycast", note: "Replaced Spotlight. Launcher, clipboard history, window management." },
      { name: "Arc Browser", note: "Spaces and tabs that actually make sense." },
    ],
  },
];

export default function UsesPage() {
  return (
    <main className="font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-14">
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">Setup</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] font-display">Uses</h1>
          <p className="mt-3 text-base muted leading-relaxed max-w-lg">
            The tools, hardware, and software I reach for every day. Inspired by{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              uses.tech
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {categories.map(({ name, items }) => (
            <section key={name}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-5">{name}</h2>
              <ul className="flex flex-col gap-4">
                {items.map(({ name: item, note }) => (
                  <li key={item} className="flex flex-col gap-0.5">
                    <span className="font-medium text-[var(--foreground)]">{item}</span>
                    <span className="text-sm muted">{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
