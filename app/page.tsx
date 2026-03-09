import Image from "next/image";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import StackedLogoMarquee from "@/components/StackedLogoMarquee";
import CurrentlyReading from "@/components/CurrentlyReading";
import MagneticButton from "@/components/MagneticButton";

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
        <Section id="contact" title="Let's build something">
          <div className="flex flex-col gap-8">
            <p className="muted max-w-lg text-base leading-relaxed">
              Open to full-time roles, freelance projects, and interesting collaborations. My inbox
              is always open — I'll get back to you within a day.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Email */}
              <MagneticButton>
                <a
                  href="mailto:danny.amzq@gmail.com"
                  className="inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-semibold shadow transition-colors btn-accent"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                  danny.amzq@gmail.com
                </a>
              </MagneticButton>

              {/* LinkedIn */}
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/danny-amezquita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-semibold shadow-sm transition-colors surface hover:bg-[color-mix(in_oklab,var(--background)_82%,transparent)]"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </MagneticButton>

              {/* GitHub */}
              <MagneticButton>
                <a
                  href="https://github.com/DannyAmzq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-semibold shadow-sm transition-colors surface hover:bg-[color-mix(in_oklab,var(--background)_82%,transparent)]"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </MagneticButton>

              {/* Resume */}
              <MagneticButton>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-semibold shadow-sm transition-colors surface hover:bg-[color-mix(in_oklab,var(--background)_82%,transparent)]"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Resume
                </a>
              </MagneticButton>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
