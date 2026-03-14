import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Danny Amezquita`,
    description: project.tagline,
  };
}

export default async function WorkSlugPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Back */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm muted hover:text-[var(--foreground)] transition-colors mb-10"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All work
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full px-3 py-1 surface text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-[var(--foreground)] mb-3">
            {project.title}
          </h1>
          <p className="text-lg muted">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-6 text-sm muted">
            <span><span className="font-medium text-[var(--foreground)]">Role</span> — {project.role}</span>
            <span><span className="font-medium text-[var(--foreground)]">Year</span> — {project.year}</span>
          </div>
          {(project.url || project.github) && (
            <div className="mt-5 flex gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm font-semibold shadow transition-colors btn-accent"
                >
                  Live site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-md border px-4 text-sm font-semibold shadow-sm transition-colors surface"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        {/* Cover placeholder */}
        {!project.cover && (
          <div className="w-full h-64 rounded-2xl surface mb-12 grid place-items-center muted text-sm">
            Project cover coming soon
          </div>
        )}

        {/* Case study body */}
        <div className="flex flex-col gap-10">
          {[
            { label: "The Problem", content: project.problem },
            { label: "The Solution", content: project.solution },
            { label: "The Outcome", content: project.outcome },
          ].map(({ label, content }) => (
            <div key={label}>
              <h2 className="text-2xl font-bold font-display text-[var(--foreground)] mb-3">{label}</h2>
              <p className="text-base leading-relaxed muted">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
