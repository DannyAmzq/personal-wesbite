import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palette preview (Phase 2)",
  description: "Internal preview of the proposed blue · brown · gray palette.",
  robots: { index: false, follow: false },
};

// ── Palettes ──────────────────────────────────────────────────────────────

type Palette = {
  label: string;
  mode: "dark" | "light";
  background: string;
  foreground: string;
  accent: string;
  accentForeground: string;
  tertiary: string;
  heroColor?: string; // flat color, for the "current" set
};

const CURRENT_DARK: Palette = {
  label: "Current · Dark",
  mode: "dark",
  background: "#0a0a0a",
  foreground: "#ededed",
  accent: "#60a5fa",
  accentForeground: "#0b1220",
  tertiary: "#a78bfa", // violet
  heroColor: "#c8916a",
};

const CURRENT_LIGHT: Palette = {
  label: "Current · Light",
  mode: "light",
  background: "#ffffff",
  foreground: "#171717",
  accent: "#2563eb",
  accentForeground: "#f8fafc",
  tertiary: "#7c3aed", // violet
  heroColor: "#8b5e38",
};

const PHASE2_DARK: Palette = {
  label: "Phase 2 · Dark",
  mode: "dark",
  background: "#0c0d10", // warm graphite
  foreground: "#e9e6df", // warm off-white
  accent: "#6aa1ff", // desaturated blue
  accentForeground: "#0a1428",
  tertiary: "#c08a5a", // caramel / cognac
};

const PHASE2_LIGHT: Palette = {
  label: "Phase 2 · Light",
  mode: "light",
  background: "#f6f1e8", // paper cream
  foreground: "#1c1a17", // warm near-black
  accent: "#2a5fbf", // denim blue
  accentForeground: "#f8fafc",
  tertiary: "#8b5a2b", // walnut
};

// ── Helpers ───────────────────────────────────────────────────────────────

function mix(hex: string, alpha: number): string {
  // Render a simple rgba from a hex for "muted" text / surfaces.
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function Swatch({ name, hex, fg }: { name: string; hex: string; fg: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          height: 72,
          borderRadius: 12,
          background: hex,
          border: `1px solid ${mix(fg, 0.12)}`,
          boxShadow: `0 1px 0 ${mix(fg, 0.06)} inset`,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <span style={{ fontWeight: 600, color: fg }}>{name}</span>
        <span style={{ fontFamily: "var(--font-geist-mono), ui-monospace", color: mix(fg, 0.6) }}>
          {hex}
        </span>
      </div>
    </div>
  );
}

function PaletteCard({ palette }: { palette: Palette }) {
  const { label, background, foreground, accent, accentForeground, tertiary, heroColor, mode } =
    palette;

  const surface = mix(foreground, mode === "dark" ? 0.06 : 0.04);
  const surfaceBorder = mix(foreground, 0.14);
  const muted = mix(foreground, 0.7);

  // Hero rendering: either a flat color (current) or a gradient (phase 2)
  const heroStyle: React.CSSProperties = heroColor
    ? { color: heroColor }
    : {
        backgroundImage: `linear-gradient(120deg, ${accent} 0%, ${tertiary} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      };

  return (
    <div
      style={{
        background,
        color: foreground,
        borderRadius: 20,
        padding: 28,
        border: `1px solid ${surfaceBorder}`,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: mix(foreground, 0.55),
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 10,
            padding: "4px 10px",
            borderRadius: 999,
            border: `1px solid ${surfaceBorder}`,
            background: surface,
            color: muted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {mode}
        </span>
      </div>

      {/* Hero sample */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: 999,
            border: `1px solid ${surfaceBorder}`,
            background: surface,
            fontSize: 11,
            fontWeight: 500,
            color: muted,
          }}
        >
          UI/UX • Frontend • Software Engineer
        </span>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 400,
            lineHeight: 1.05,
            margin: 0,
            ...heroStyle,
          }}
        >
          Crafting clear, modern digital experiences
        </h2>
        <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 420 }}>
          I design intuitive interfaces, build performant web apps, and support the systems that
          keep them running.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 36,
              padding: "0 16px",
              borderRadius: 8,
              background: accent,
              color: accentForeground,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            View work
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 36,
              padding: "0 16px",
              borderRadius: 8,
              border: `1px solid ${surfaceBorder}`,
              background: surface,
              color: foreground,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Contact me
          </span>
        </div>
      </div>

      {/* Token swatches */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 12,
        }}
      >
        <Swatch name="background" hex={background} fg={foreground} />
        <Swatch name="foreground" hex={foreground} fg={foreground} />
        <Swatch name="accent" hex={accent} fg={foreground} />
        <Swatch name="tertiary" hex={tertiary} fg={foreground} />
        {heroColor && <Swatch name="hero (flat)" hex={heroColor} fg={foreground} />}
      </div>

      {/* Accent gradient sample */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: mix(foreground, 0.55),
          }}
        >
          Scroll-progress gradient
        </span>
        <div
          style={{
            height: 4,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${accent} 0%, ${tertiary} 100%)`,
          }}
        />
      </div>

      {/* Cursor spotlight radial */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: mix(foreground, 0.55),
          }}
        >
          Cursor spotlight
        </span>
        <div
          style={{
            height: 140,
            borderRadius: 12,
            background: `radial-gradient(circle at 50% 50%, ${mix(accent, 0.35)} 0%, ${mix(
              tertiary,
              0.2
            )} 45%, transparent 70%), ${background}`,
            border: `1px solid ${surfaceBorder}`,
          }}
        />
      </div>

      {/* Sample card UI */}
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          background: surface,
          border: `1px solid ${surfaceBorder}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, fontWeight: 600, color: foreground }}>Project One</p>
            <p style={{ margin: 0, fontSize: 13, color: muted }}>Tagline for the card</p>
          </div>
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 999,
              background: mix(foreground, 0.06),
              color: muted,
              border: `1px solid ${surfaceBorder}`,
            }}
          >
            2025
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["UI/UX", "Frontend", "Next.js"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 999,
                background: surface,
                color: muted,
                border: `1px solid ${surfaceBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Secondary candidates ──────────────────────────────────────────────────

type Secondary = {
  name: string;
  tagline: string;
  dark: string;
  light: string;
  undertone: "neutral" | "cool" | "warm" | "green";
  why: string;
};

const SECONDARIES: Secondary[] = [
  {
    name: "Warm Stone",
    tagline: "The safe pick · pure-but-warm gray",
    dark: "#8a8580",
    light: "#6b6560",
    undertone: "neutral",
    why:
      "Pure neutral with a hint of warmth. Bridges blue and caramel without picking a side — lets both accents breathe.",
  },
  {
    name: "Slate",
    tagline: "The practical pick · slight blue undertone",
    dark: "#7d8a96",
    light: "#5a6775",
    undertone: "cool",
    why:
      "Slight blue undertone makes the accent feel like family. Corporate-modern, calming, trustworthy.",
  },
  {
    name: "Taupe",
    tagline: "The tonal pick · slight brown undertone",
    dark: "#9e8b7a",
    light: "#6b5d50",
    undertone: "warm",
    why:
      "Extends the caramel into a whole warm range. Earthy, cozy, analog — very Kinfolk-magazine.",
  },
  {
    name: "Sage",
    tagline: "The distinctive pick · muted green",
    dark: "#8a9487",
    light: "#5f6a5c",
    undertone: "green",
    why:
      "Green is the classic companion to brown (nature palette) and cool enough to sit next to blue. Memorable and calm.",
  },
];

function SecondaryCard({
  secondary,
  mode,
}: {
  secondary: Secondary;
  mode: "dark" | "light";
}) {
  // Use the Phase 2 base palette as the surrounding context.
  const base = mode === "dark" ? PHASE2_DARK : PHASE2_LIGHT;
  const { background, foreground, accent, tertiary } = base;
  const sec = mode === "dark" ? secondary.dark : secondary.light;

  const surfaceBorder = mix(foreground, 0.14);
  const muted = mix(foreground, 0.65);

  return (
    <div
      style={{
        background,
        color: foreground,
        borderRadius: 16,
        padding: 22,
        border: `1px solid ${surfaceBorder}`,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {/* Name + hex */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: foreground }}>
            {secondary.name}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: muted }}>{secondary.tagline}</p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace",
            fontSize: 11,
            color: muted,
          }}
        >
          {sec}
        </span>
      </div>

      {/* Big swatch with the three accents layered on it */}
      <div
        style={{
          position: "relative",
          height: 88,
          borderRadius: 10,
          background: sec,
          border: `1px solid ${surfaceBorder}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span style={{ width: 28, height: 28, borderRadius: 999, background: accent }} />
          <span style={{ width: 28, height: 28, borderRadius: 999, background: tertiary }} />
          <span style={{ width: 28, height: 28, borderRadius: 999, background: foreground }} />
        </div>
      </div>

      {/* Real-world usage samples */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Muted text + divider */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ margin: 0, fontSize: 13, color: sec }}>
            Muted body text uses the secondary at full opacity for readable low-priority copy.
          </p>
          <div style={{ height: 1, background: sec, opacity: 0.4 }} />
        </div>

        {/* Tag pills using secondary as border + text */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["UI/UX", "Frontend", "2025"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "2px 10px",
                borderRadius: 999,
                border: `1px solid ${sec}`,
                color: sec,
                background: "transparent",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Surface card using secondary as border */}
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            border: `1px solid ${mix(foreground, 0.08)}`,
            borderLeft: `3px solid ${sec}`,
            background: mix(foreground, 0.04),
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: foreground }}>
            Currently reading
          </p>
          <p style={{ margin: 0, fontSize: 11, color: sec }}>Total Recall · Arnold Schwarzenegger</p>
        </div>

        {/* Progress bar with secondary as track */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: sec }}
          >
            <span>Progress</span>
            <span style={{ color: foreground, fontWeight: 600 }}>90%</span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 999,
              background: mix(foreground, 0.08),
              overflow: "hidden",
            }}
          >
            <div style={{ height: "100%", width: "90%", background: sec }} />
          </div>
        </div>
      </div>

      {/* Why */}
      <p
        style={{
          margin: 0,
          fontSize: 11,
          lineHeight: 1.6,
          color: muted,
          paddingTop: 10,
          borderTop: `1px solid ${mix(foreground, 0.08)}`,
        }}
      >
        {secondary.why}
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function PalettePreviewPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px 96px",
        background: "#111214",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6aa1ff",
            }}
          >
            Internal preview · not linked publicly
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-instrument-serif), serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 6vw, 56px)",
              lineHeight: 1.05,
              color: "#e9e6df",
            }}
          >
            Phase 2 palette preview
          </h1>
          <p style={{ margin: 0, color: "rgba(233,230,223,0.7)", maxWidth: 640, lineHeight: 1.6 }}>
            Current palette on the left, proposed blue · brown · gray palette on the right. Each
            card renders at its own background so you're seeing the real contrast, plus a hero
            headline, CTA buttons, scroll-progress gradient, cursor spotlight, and a sample
            project card.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid rgba(233,230,223,0.14)",
                background: "rgba(233,230,223,0.04)",
                color: "#e9e6df",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              ← Back to home
            </Link>
            <a
              href="https://www.realtimecolors.com/?colors=e9e6df-0c0d10-6aa1ff-c08a5a-c08a5a&fonts=Instrument%20Serif-Plus%20Jakarta%20Sans"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid rgba(233,230,223,0.14)",
                background: "rgba(106,161,255,0.12)",
                color: "#6aa1ff",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Open in Realtime Colors ↗
            </a>
          </div>
        </header>

        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(233,230,223,0.55)",
            }}
          >
            Dark mode
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: 20,
            }}
          >
            <PaletteCard palette={CURRENT_DARK} />
            <PaletteCard palette={PHASE2_DARK} />
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(233,230,223,0.55)",
            }}
          >
            Light mode
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: 20,
            }}
          >
            <PaletteCard palette={CURRENT_LIGHT} />
            <PaletteCard palette={PHASE2_LIGHT} />
          </div>
        </section>

        {/* Secondary candidates */}
        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(233,230,223,0.55)",
              }}
            >
              Secondary candidates
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "rgba(233,230,223,0.7)",
                maxWidth: 680,
                lineHeight: 1.6,
              }}
            >
              A secondary is support-role: borders, dividers, muted text, tag pills, progress-bar
              tracks. It shouldn't compete with the blue or caramel — it should make them sing.
              Each card below drops the candidate into the Phase 2 context (blue accent + caramel
              tertiary) so you see how it plays in the full palette.
            </p>
          </div>

          <h3
            style={{
              margin: "12px 0 0",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(233,230,223,0.4)",
            }}
          >
            Dark mode
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {SECONDARIES.map((s) => (
              <SecondaryCard key={`d-${s.name}`} secondary={s} mode="dark" />
            ))}
          </div>

          <h3
            style={{
              margin: "12px 0 0",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(233,230,223,0.4)",
            }}
          >
            Light mode
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {SECONDARIES.map((s) => (
              <SecondaryCard key={`l-${s.name}`} secondary={s} mode="light" />
            ))}
          </div>
        </section>

        <footer
          style={{
            color: "rgba(233,230,223,0.5)",
            fontSize: 12,
            lineHeight: 1.6,
            paddingTop: 24,
            borderTop: "1px solid rgba(233,230,223,0.1)",
          }}
        >
          This route (<code>/preview/palette</code>) is <code>noindex</code> and intentionally
          bypasses the site navbar/background to isolate the palettes. Delete{" "}
          <code>app/preview/palette/page.tsx</code> once Phase 2 lands, or keep it around as a
          living spec.
        </footer>
      </div>
    </main>
  );
}
