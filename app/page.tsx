import Image from "next/image";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import StackedLogoMarquee from "@/components/StackedLogoMarquee";
import CurrentlyReading from "@/components/CurrentlyReading";

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
          <div className="mt-3">
            <StackedLogoMarquee
              rowGap={12}
              rows={[
                {
                  // Skills as text pills (no src)
                  items: [
                    { name: "UI/UX Design" },
                    { name: "Wireframing" },
                    { name: "Prototyping" },
                    { name: "Frontend Dev" },
                    { name: "Accessibility" },
                    { name: "Performance" },
                    { name: "IT Support" },
                    { name: "Networking" },
                  ],
                  height: 36,
                  speed: 28,
                  gap: 20,
                  direction: "right",
                },
                {
                  // Tools/logos row 1
                  items: [
                    { name: "Figma", src: "/logos/figma.svg" },
                    { name: "Framer", src: "/logos/framer.svg" },
                    { name: "Framer Motion", src: "/logos/framer-motion.svg" },
                    { name: "Next.js", src: "/logos/nextjs.svg" },
                    { name: "React", src: "/logos/react.svg" },
                    { name: "TypeScript", src: "/logos/typescript.svg" },
                    { name: "Tailwind CSS", src: "/logos/tailwindcss.svg" },
                    { name: "Node.js", src: "/logos/nodejs.svg" },
                    { name: "Windows", src: "/logos/windows.png" },
                    { name: "macOS", src: "/logos/macos.svg" },
                    { name: "Linux", src: "/logos/linux.svg" },
                  ],
                  height: 56, // make logos bigger
                  speed: 44,
                  gap: 32,
                  direction: "left",
                },
                {
                  // Tools/logos row 2
                  items: [],
                  height: 56,
                  speed: 36,
                  gap: 32,
                  direction: "right",
                },
              ]}
            />
          </div>
        </Section>
        <Section id="about" title="About me">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            {/* Photo */}
            <div className="shrink-0 w-full md:w-auto flex justify-center md:justify-start">
              <div className="relative">
                {/* Offset accent frame */}
                <div className="absolute -inset-[3px] rounded-3xl bg-[color-mix(in_oklab,var(--accent)_30%,transparent)]" />
                <div className="relative w-64 md:w-72 overflow-hidden rounded-3xl ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)] shadow-2xl">
                  <Image
                    src="/Headshot.jpg"
                    alt="Danny Amezquita"
                    width={640}
                    height={960}
                    className="w-full object-cover object-top"
                    priority
                  />
                </div>
                {/* Available badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium shadow-lg surface whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for work
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Danny Amezquita</h3>
                <p className="text-sm font-medium text-[var(--accent)]">UX Engineer · Frontend Developer · IT Pro</p>
              </div>
              <p className="text-base leading-relaxed muted">
                I'm a UI/UX designer and frontend developer who enjoys turning complex ideas into
                simple, delightful interfaces. With a background in IT support, I bridge design,
                engineering, and reliability to ship usable products.
              </p>
              <div className="flex flex-wrap gap-2">
                {["UI/UX Design", "Frontend Dev", "IT Support", "Based in Texas"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs rounded-full px-3 py-1 surface text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <Section id="reading" title="Currently reading">
          <CurrentlyReading />
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
