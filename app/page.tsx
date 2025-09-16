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
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Project {i}</h3>
                    <p className="text-sm text-zinc-400">
                      Short description of the project focusing on value and role.
                    </p>
                  </div>
                  <span className="text-xs rounded-full bg-white/10 px-2 py-1 text-zinc-300">
                    Case study
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section id="skills" title="Skills & tools">
          <ul className="flex flex-wrap gap-2 text-sm text-zinc-300">
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
              <li key={s} className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                {s}
              </li>
            ))}
          </ul>
        </Section>
        <Section id="about" title="About me">
          <p className="max-w-3xl text-zinc-300">
            I'm a UI/UX designer and frontend developer who enjoys turning complex ideas into
            simple, delightful interfaces. With a background in IT support, I bridge design,
            engineering, and reliability to ship usable products.
          </p>
        </Section>
        <Section id="contact" title="Contact">
          <p className="text-zinc-300">
            Open to entry-level roles and freelance projects. Let's talk.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="mailto:you@example.com"
              className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-semibold text-black shadow transition-colors hover:bg-zinc-200"
            >
              Email
            </a>
            <a
              href="#"
              className="inline-flex h-11 items-center rounded-md border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white/10"
            >
              Download CV
            </a>
          </div>
        </Section>
      </main>
    </>
  );
}
