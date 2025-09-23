import Hero from "@/components/Hero";
import Section from "@/components/Section";
import LogoCarousel from "@/components/LogoCarousel";

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
          <div className="mt-2">
            <LogoCarousel
              height={48}
              gap={28}
              speed={40}
              items={[
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
                { name: "Networking", src: "/logos/networking.svg" },
                { name: "IT Support", src: "/logos/it-support.svg" },
              ]}
            />
          </div>
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
