import type { Metadata } from "next";
import Section from "@/components/Section";
import ReadingSection from "@/components/now/ReadingSection";
import ListeningSection from "@/components/now/ListeningSection";
import PlayingSection from "@/components/now/PlayingSection";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { nowQuery } from "@/sanity/lib/queries";
// Fallback static data while Sanity is being set up
import {
  currentBook as staticCurrentBook,
  bookLibrary as staticBookLibrary,
  artists as staticArtists,
  games as staticGames,
} from "@/lib/now-data";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Now | Danny Amezquita",
  description: "What I'm currently reading, listening to, and playing.",
};

export default async function NowPage() {
  let nowData = null;
  if (isSanityConfigured) {
    try {
      nowData = await client.fetch(nowQuery);
    } catch {
      // Sanity reachable but errored — static fallback used below
    }
  }

  const currentBook = nowData?.currentBook ?? {
    ...staticCurrentBook,
    cover: staticCurrentBook.cover ?? null,
  };
  const bookLibrary = nowData?.bookLibrary ?? staticBookLibrary.map((b) => ({
    ...b,
    cover: b.cover ?? null,
  }));
  const artists = nowData?.artists ?? staticArtists;
  const games = nowData?.games ?? staticGames.map((g) => ({ ...g, cover: null }));
  const updatedAt: string | null = nowData?.updatedAt ?? null;

  return (
    <main className="font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-2">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">
            {updatedAt
              ? new Date(updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
              : "March 2026"}
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
        <ReadingSection currentBook={currentBook} bookLibrary={bookLibrary} />
      </Section>
      <Section id="listening" title="Listening">
        <ListeningSection artists={artists} />
      </Section>
      <Section id="playing" title="Playing">
        <PlayingSection games={games} />
      </Section>
    </main>
  );
}
