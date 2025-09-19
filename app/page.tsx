import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function Home() {
  return (
    <>
      <main className="font-sans">
        <Hero />
        <Section id="work" title="Selected work">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl p-5 surface">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[var(--foreground)] font-semibold">Project {i}</h3>
                    <p className="text-sm muted">
                      Short description of the project focusing on value and role.
                    </p>
                  </div>
                  <span className="text-xs rounded-full px-2 py-1 text-[color-mix(in_oklab,var(--foreground)_78%,transparent)] bg-[color-mix(in_oklab,var(--background)_80%,transparent)] border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
                    Case study
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section id="skills" title="Skills & tools">
          <ul className="flex flex-wrap gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
            {[
              "Figma",
              "Framer",
              "Framer Motion",
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "IT Support",
              "Networking",
              "Windows/MacOS",
            ].map((s) => (
              <li key={s} className="rounded-md px-3 py-1 surface">
                {s}
              </li>
            ))}
          </ul>
        </Section>
        <Section id="about" title="About me">
          <p className="max-w-3xl muted">
            I'm a UI/UX designer and frontend developer who enjoys turning complex ideas into
            simple, delightful interfaces. With a background in IT support, I bridge design,
            engineering, and reliability to ship usable products.
          </p>
        </Section>
        <Section id="contact" title="Contact">
          <p className="muted">Open to entry-level roles and freelance projects. Let's talk.</p>
          <div className="mt-4 flex gap-3">
            <a
              href="mailto:you@example.com"
              className="inline-flex h-11 items-center rounded-md px-5 text-sm font-semibold shadow transition-colors btn-accent"
            >
              Email
            </a>
            <a
              href="#"
              className="inline-flex h-11 items-center rounded-md border px-5 text-sm font-semibold shadow-sm transition-colors surface hover:bg-[color-mix(in_oklab,var(--background)_82%,transparent)]"
            >
              Download CV
            </a>
          </div>
        </Section>
      </main>
    </>
  );
}
