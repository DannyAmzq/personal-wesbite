import type { Metadata } from "next";
import Link from "next/link";
import { sortedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Danny Amezquita",
  description: "Thoughts on UX, frontend development, and IT.",
};

export default function BlogPage() {
  const posts = sortedPosts();

  return (
    <main className="font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-12">
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">Writing</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] font-display">Blog</h1>
          <p className="mt-3 text-base muted leading-relaxed">
            Thoughts on design, engineering, and the overlap between them.
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-[color-mix(in_oklab,var(--foreground)_10%,transparent)]">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1.5 py-7 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <time className="text-xs muted tabular-nums">
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <span className="text-xs muted">·</span>
                  <span className="text-xs muted">{post.readingTime} read</span>
                </div>
                <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm muted leading-relaxed">{post.description}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs rounded-full px-2.5 py-0.5 surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
