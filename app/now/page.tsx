import type { Metadata } from "next";
import Section from "@/components/Section";
import ReadingSection from "@/components/now/ReadingSection";
import ListeningSection from "@/components/now/ListeningSection";
import PlayingSection from "@/components/now/PlayingSection";

export const metadata: Metadata = {
  title: "Now | Danny Amezquita",
  description: "What I'm currently reading, listening to, and playing.",
};

export default function NowPage() {
  return (
    <main className="font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-2">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">
            March 2026
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] font-display">
            What I'm up to
          </h1>
          <p className="mt-3 text-base muted leading-relaxed">
            A living snapshot of what I'm reading, listening to, and playing right now. Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              the /now movement
            </a>
            .
          </p>
        </div>
      </div>
      <Section id="reading" title="Reading">
        <ReadingSection />
      </Section>
      <Section id="listening" title="Listening">
        <ListeningSection />
      </Section>
      <Section id="playing" title="Playing">
        <PlayingSection />
      </Section>
    </main>
  );
}
