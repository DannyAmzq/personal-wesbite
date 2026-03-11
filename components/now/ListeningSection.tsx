"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export type Artist = {
  name: string;
  genres: string[];
  note?: string;
};

const ARTIST_COLORS: Record<string, string> = {
  "The Midnight": "#6366f1",
  "bbno$": "#f59e0b",
  "Don Toliver": "#ec4899",
};

export default function ListeningSection({ artists }: { artists: Artist[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm muted max-w-lg">
        Using Apple Music — no live API, just honest favorites.
      </p>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {artists.map((artist) => {
          const color = ARTIST_COLORS[artist.name] ?? "var(--accent)";
          return (
            <motion.div
              key={artist.name}
              variants={fadeInUp(0)}
              className="flex flex-col gap-3 rounded-xl p-5 surface group"
            >
              <div
                className="h-10 w-10 rounded-full opacity-80"
                style={{ background: color }}
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[var(--foreground)]">{artist.name}</p>
                {artist.note && (
                  <p className="text-xs muted italic">"{artist.note}"</p>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {artist.genres.map((g) => (
                  <span
                    key={g}
                    className="text-xs rounded-full px-2.5 py-0.5 surface muted"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
