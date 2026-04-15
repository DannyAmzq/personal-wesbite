"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Accepts both the Sanity-resolved shape (cover: string | null) and the
// static fallback (cover?: string). Other fields are identical between both.
export type CurrentlyReadingBook = {
  title: string;
  author: string;
  cover?: string | null;
  genres: string[];
  note?: string;
  progress?: number;
  status: "reading" | "read" | "tbr";
  finishedYear?: number;
};

export default function CurrentlyReading({ book }: { book: CurrentlyReadingBook }) {
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start">
      {/* Book cover */}
      <div className="shrink-0 mx-auto sm:mx-0">
        <div
          className="relative w-36 md:w-40 overflow-hidden rounded-lg shadow-xl ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)]"
          style={{ aspectRatio: "2/3" }}
        >
          {book.cover ? (
            <Image
              src={book.cover}
              alt={`${book.title} cover`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 144px, 160px"
            />
          ) : (
            <div className="flex h-full items-end bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] p-3">
              <span className="text-sm font-medium text-[var(--foreground)]">{book.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 min-w-0">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Currently reading
        </span>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl font-semibold leading-snug text-[var(--foreground)]">
            {book.title}
          </h3>
          <p className="text-sm muted">{book.author}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {book.genres.map((g) => (
            <span
              key={g}
              className="text-xs rounded-full px-2.5 py-0.5 surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]"
            >
              {g}
            </span>
          ))}
        </div>
        <div ref={barRef} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs muted">
            <span>Progress</span>
            <span className="font-medium text-[var(--foreground)]">{book.progress}%</span>
          </div>
          <div className="h-1.5 w-full max-w-xs rounded-full bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              initial={{ width: 0 }}
              animate={inView ? { width: `${book.progress}%` } : { width: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        </div>
        {book.note && (
          <p className="text-sm italic text-[color-mix(in_oklab,var(--foreground)_60%,transparent)] max-w-sm border-l-2 border-[var(--accent)] pl-3">
            "{book.note}"
          </p>
        )}
        <Link
          href="/now#reading"
          className="self-start text-sm font-medium text-[var(--accent)] hover:underline"
        >
          See full library →
        </Link>
      </div>
    </div>
  );
}
