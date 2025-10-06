"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

function applyTheme(theme: "dark" | "light") {
  const html = document.documentElement;
  // Maintain Tailwind class-based dark styles
  if (theme === "dark") {
    html.classList.add("dark");
    html.removeAttribute("data-theme");
  } else {
    html.classList.remove("dark");
    html.setAttribute("data-theme", "light");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Initialize from storage or system preference
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    let initial: "dark" | "light" = "dark";
    if (stored) initial = stored;
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
      initial = "light";
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage errors
    }
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return <div className="h-8 w-8 rounded-md border border-white/10 bg-white/5" />;
  }

  const isDark = theme === "dark";

  const transitionQuick: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };
  const transitionSpring: Transition = { type: "spring", stiffness: 400, damping: 30, mass: 0.2 };
  const transitionChoice: Transition = reduce ? transitionQuick : transitionSpring;

  // Dynamic classes for track & knob to reverse color scheme
  const trackClasses = `relative inline-flex h-[28px] w-[52px] items-center rounded-full border focus-visible:outline-none focus-visible:ring-2 ring-accent transition-colors duration-300
    border-[color-mix(in_oklab,var(--foreground)_16%,transparent)]
    ${
      isDark
        ? "bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]"
        : "bg-[color-mix(in_oklab,var(--background)_90%,transparent)]"
    }`;

  const knobClasses = `pointer-events-none absolute left-1 top-1 inline-flex h-[22px] w-[22px] items-center justify-center rounded-full shadow
    ${
      isDark
        ? "bg-[color-mix(in_oklab,var(--background)_85%,#000)] text-[var(--foreground)] border border-[color-mix(in_oklab,var(--foreground)_20%,transparent)]"
        : "bg-[color-mix(in_oklab,#ffffff_94%,transparent)] text-[var(--accent)] border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]"
    }`;

  return (
    <button
      onClick={toggle}
      className={trackClasses}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        layout
        className={knobClasses}
        animate={{ x: isDark ? 0 : 24, rotate: isDark ? 0 : 180 }}
        transition={transitionChoice}
      >
        <motion.svg
          aria-hidden
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={false}
          animate={{ rotate: isDark ? 0 : 180, opacity: 1 }}
          transition={transitionChoice}
        >
          {isDark ? (
            // Dark mode: show sun (invite light mode)
            <g stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4 19 19M5 19l-1.4 1.4M20.4 3.6 19 5" />
            </g>
          ) : (
            // Light mode: show moon (invite dark mode)
            <path
              d="M20 12.5a8 8 0 1 1-8.5-8 6.5 6.5 0 0 0 8.5 8z"
              stroke="var(--accent)"
              strokeWidth="1.6"
              fill="none"
            />
          )}
        </motion.svg>
      </motion.span>
    </button>
  );
}
