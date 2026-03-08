// ── Update this file whenever your "now" changes ─────────────────────────────

export type Book = {
  title: string;
  author: string;
  cover?: string; // path under /public/books/
  genres: string[];
  note?: string;
  progress?: number; // 0–100, only for status: "reading"
  status: "reading" | "read" | "tbr";
  finishedYear?: number;
};

export type Artist = {
  name: string;
  genres: string[];
  note?: string;
};

export type Game = {
  title: string;
  cover?: string; // path under /public/games/
  platform: string[];
  genres: string[];
  note?: string;
  status: "playing" | "wishlist";
};

// ── Reading ───────────────────────────────────────────────────────────────────
export const currentBook: Book = {
  title: "Total Recall",
  author: "Arnold Schwarzenegger",
  cover: "/books/Total_Recall_Cover.jpg",
  progress: 90,
  genres: ["Autobiography", "Fitness", "Motivation"],
  note: "Makes me want to watch every Arnold film and never skip a gym day.",
  status: "reading",
};

export const bookLibrary: Book[] = [
  {
    title: "Kings of the Wyld",
    author: "Nicholas Eames",
    genres: ["Fantasy", "Adventure"],
    status: "read",
    finishedYear: 2025,
  },
  {
    title: "If Cats Disappeared from the World",
    author: "Genki Kawamura",
    genres: ["Fiction", "Philosophy"],
    status: "read",
    finishedYear: 2025,
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genres: ["Fiction", "Philosophy"],
    status: "read",
    finishedYear: 2025,
  },
];

// ── Listening ─────────────────────────────────────────────────────────────────
export const artists: Artist[] = [
  {
    name: "The Midnight",
    genres: ["Synthwave", "Retrowave"],
    note: "Perfect late-night coding soundtrack.",
  },
  {
    name: "bbno$",
    genres: ["Pop", "Hip-Hop"],
  },
  {
    name: "Don Toliver",
    genres: ["Hip-Hop", "R&B"],
  },
];

// ── Playing ───────────────────────────────────────────────────────────────────
export const games: Game[] = [
  {
    title: "Minecraft",
    platform: ["PC"],
    genres: ["Sandbox", "Survival"],
    note: "Timeless. Always coming back.",
    status: "playing",
  },
  {
    title: "Slay the Spire 2",
    platform: ["PC"],
    genres: ["Roguelike", "Card Game"],
    status: "wishlist",
  },
  {
    title: "Hytale",
    platform: ["PC"],
    genres: ["Sandbox", "Adventure"],
    status: "wishlist",
  },
  {
    title: "Hades 2",
    platform: ["PC"],
    genres: ["Roguelike", "Action"],
    status: "wishlist",
  },
];
