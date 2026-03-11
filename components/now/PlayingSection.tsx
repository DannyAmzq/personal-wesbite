"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export type Game = {
  title: string;
  cover?: string | null;
  platform: string[];
  genres: string[];
  note?: string;
  status: "playing" | "wishlist";
};

function GameCard({ game }: { game: Game }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl p-5 surface group">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-[var(--foreground)] leading-snug">{game.title}</p>
        <div className="flex gap-1 shrink-0">
          {game.platform.map((p) => (
            <span
              key={p}
              className="text-xs rounded-md px-2 py-0.5 bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {game.genres.map((g) => (
          <span key={g} className="text-xs rounded-full px-2.5 py-0.5 surface muted">
            {g}
          </span>
        ))}
      </div>
      {game.note && (
        <p className="text-xs italic text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
          "{game.note}"
        </p>
      )}
    </div>
  );
}

export default function PlayingSection({ games }: { games: Game[] }) {
  const current = games.filter((g) => g.status === "playing");
  const wishlist = games.filter((g) => g.status === "wishlist");

  return (
    <div className="flex flex-col gap-10">
      {current.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Currently playing
          </span>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {current.map((game) => (
              <motion.div key={game.title} variants={fadeInUp(0)}>
                <GameCard game={game} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[color-mix(in_oklab,var(--foreground)_50%,transparent)] uppercase tracking-widest">
            Wishlist / Anticipated
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {wishlist.map((game) => (
              <motion.div key={game.title} variants={fadeInUp(0)}>
                <GameCard game={game} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
