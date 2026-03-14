import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, posts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Danny Amezquita`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="font-sans">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm muted hover:text-[var(--foreground)] transition-colors mb-10"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-xs muted tabular-nums">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="text-xs muted">·</span>
            <span className="text-xs muted">{post.readingTime} read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-display text-[var(--foreground)] mb-3">
            {post.title}
          </h1>
          <p className="text-base muted leading-relaxed">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full px-2.5 py-1 surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] mb-10" />

        {/* Body */}
        <article className="prose prose-sm max-w-none text-[color-mix(in_oklab,var(--foreground)_80%,transparent)] leading-relaxed space-y-5">
          {post.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </div>
    </main>
  );
}
