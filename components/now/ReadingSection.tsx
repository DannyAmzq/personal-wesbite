"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export type Book = {
  title: string;
  author: string;
  cover?: string | null; // resolved URL (local path or Sanity CDN)
  genres: string[];
  note?: string;
  progress?: number;
  status: "reading" | "read" | "tbr";
  finishedYear?: number;
};

function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-3 surface group">
      <div
        className="relative w-full overflow-hidden rounded-lg bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]"
        style={{ aspectRatio: "2/3" }}
      >
        {book.cover ? (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="160px"
          />
        ) : (
          <div className="flex h-full items-end p-2">
            <span className="text-xs font-medium leading-tight text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
              {book.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold leading-snug text-[var(--foreground)] line-clamp-2">
          {book.title}
        </p>
        <p className="text-xs muted">{book.author}</p>
        {book.finishedYear && (
          <p className="text-xs text-[color-mix(in_oklab,var(--foreground)_35%,transparent)]">
            {book.finishedYear}
          </p>
        )}
      </div>
    </div>
  );
}

type Props = {
  currentBook: Book;
  bookLibrary: Book[];
};

export default function ReadingSection({ currentBook, bookLibrary }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col gap-12">
      {/* Current book */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="shrink-0 mx-auto sm:mx-0">
          <div
            className="relative w-36 md:w-40 overflow-hidden rounded-lg shadow-xl ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)]"
            style={{ aspectRatio: "2/3" }}
          >
            {currentBook.cover ? (
              <Image
                src={currentBook.cover}
                alt={currentBook.title}
                fill
                className="object-cover"
                sizes="160px"
              />
            ) : (
              <div className="flex h-full items-end bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] p-3">
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {currentBook.title}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Currently reading
          </span>
          <div>
            <h3 className="text-xl font-semibold text-[var(--foreground)]">{currentBook.title}</h3>
            <p className="text-sm muted">{currentBook.author}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentBook.genres.map((g) => (
              <span key={g} className="text-xs rounded-full px-2.5 py-0.5 surface muted">
                {g}
              </span>
            ))}
          </div>
          {typeof currentBook.progress === "number" && (
            <div ref={barRef} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs muted">
                <span>Progress</span>
                <span className="font-medium text-[var(--foreground)]">{currentBook.progress}%</span>
              </div>
              <div className="h-1.5 w-full max-w-xs rounded-full bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${currentBook.progress}%` } : { width: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
              </div>
            </div>
          )}
          {currentBook.note && (
            <p className="text-sm italic text-[color-mix(in_oklab,var(--foreground)_60%,transparent)] max-w-sm border-l-2 border-[var(--accent)] pl-3">
              "{currentBook.note}"
            </p>
          )}
        </div>
      </div>

      {/* Library */}
      {bookLibrary.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[color-mix(in_oklab,var(--foreground)_50%,transparent)] uppercase tracking-widest">
            Recently read
          </h3>
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {bookLibrary.map((book) => (
              <motion.div key={book.title} variants={fadeInUp(0)}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Back to home */}
      <Link
        href="/#reading"
        className="self-start text-sm font-medium text-[var(--accent)] hover:underline"
      >
        ← Back to homepage
      </Link>
    </div>
  );
}
