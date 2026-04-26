"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type Shortcut = { keys: string[]; action: string };

const SHORTCUTS: Shortcut[] = [
  { keys: ["?"], action: "Show this cheatsheet" },
  { keys: ["t"], action: "Toggle theme" },
  { keys: ["g", "h"], action: "Go home" },
  { keys: ["g", "n"], action: "Open /now" },
  { keys: ["g", "w"], action: "Jump to Work" },
  { keys: ["g", "c"], action: "Jump to Contact" },
  { keys: ["Esc"], action: "Close this panel" },
];

function quickToggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  const next: "light" | "dark" = isDark ? "light" : "dark";
  if (next === "dark") {
    html.classList.add("dark");
    html.removeAttribute("data-theme");
  } else {
    html.classList.remove("dark");
    html.setAttribute("data-theme", "light");
  }
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* ignore */
  }
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export default function SiteEnhancements() {
  const [showCheats, setShowCheats] = useState(false);
  const router = useRouter();

  // Console easter egg — fires once per page load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & { __dannyEgg?: boolean };
    if (w.__dannyEgg) return;
    w.__dannyEgg = true;

    console.log(
      "%chey",
      "color:#6aa1ff;font:600 28px ui-sans-serif;padding:6px 0;"
    );
    console.log(
      "%cPoking around? Drop me a line: %cdanny.amzq@gmail.com",
      "color:#c08a5a;font:500 13px ui-sans-serif;",
      "color:#6aa1ff;font:600 13px ui-monospace;"
    );
    console.log(
      "%cTip: press ? for keyboard shortcuts.",
      "color:color-mix(in oklab, currentColor 60%, transparent);font:400 12px ui-sans-serif;"
    );
  }, []);

  // Tab-blur title swap.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.title;
    let timer: number | null = null;

    const onChange = () => {
      if (document.hidden) {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          document.title = "come back!";
        }, 200);
      } else {
        if (timer) window.clearTimeout(timer);
        document.title = original;
      }
    };

    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      if (timer) window.clearTimeout(timer);
      document.title = original;
    };
  }, []);

  // Keyboard shortcuts — single keys + g-prefixed nav chord.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let chord: { key: "g"; at: number } | null = null;

    const navigate = (target: string) => {
      router.push(target);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;

      if (e.key === "?") {
        e.preventDefault();
        setShowCheats((s) => !s);
        return;
      }

      if (e.key === "Escape" && showCheats) {
        e.preventDefault();
        setShowCheats(false);
        return;
      }

      if (chord && Date.now() - chord.at < 1200) {
        if (chord.key === "g") {
          if (e.key === "h") {
            e.preventDefault();
            navigate("/");
            chord = null;
            return;
          }
          if (e.key === "n") {
            e.preventDefault();
            navigate("/now");
            chord = null;
            return;
          }
          if (e.key === "w") {
            e.preventDefault();
            navigate("/#work");
            chord = null;
            return;
          }
          if (e.key === "c") {
            e.preventDefault();
            navigate("/#contact");
            chord = null;
            return;
          }
        }
        chord = null;
      }

      if (e.key === "g") {
        chord = { key: "g", at: Date.now() };
        return;
      }

      if (e.key === "t") {
        e.preventDefault();
        quickToggleTheme();
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, showCheats]);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowCheats(true)}
        aria-label="Show keyboard shortcuts"
        className={`fixed bottom-4 right-4 z-40 hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[var(--background)]/80 px-3 py-1.5 text-xs text-[var(--secondary)] shadow-sm backdrop-blur transition hover:text-[var(--foreground)] hover:border-[color-mix(in_oklab,var(--foreground)_28%,transparent)] ${
          showCheats ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span>Press</span>
        <kbd className="inline-flex min-w-[20px] justify-center rounded border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] px-1.5 font-mono text-[var(--foreground)]">
          ?
        </kbd>
        <span>for shortcuts</span>
      </button>
      <AnimatePresence>
        {showCheats && (
          <motion.div
            key="cheats-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowCheats(false)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/40 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            <motion.div
              key="cheats"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[var(--background)] p-6 shadow-2xl"
            >
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Keyboard shortcuts
              </h2>
              <p className="mt-1 text-sm text-[var(--secondary)]">
                Press a key to navigate. Esc or click outside to close.
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SHORTCUTS.map((s) => (
                  <li
                    key={s.action}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-[var(--foreground)]">{s.action}</span>
                    <span className="flex items-center gap-1.5">
                      {s.keys.map((k, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                          {i > 0 && (
                            <span className="text-[10px] uppercase tracking-widest text-[var(--secondary)]">
                              then
                            </span>
                          )}
                          <kbd className="inline-flex min-w-[24px] justify-center rounded border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] px-2 py-0.5 font-mono text-xs text-[var(--foreground)] shadow-sm">
                            {k}
                          </kbd>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
