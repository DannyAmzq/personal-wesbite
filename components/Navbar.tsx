"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import MagneticButton from "@/components/MagneticButton";
import SignatureLogo from "@/components/SignatureLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  // Prefix hash links with "/" when not on the homepage so they navigate back correctly
  const h = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  // rAF-throttled resize — avoids setState on every pixel while dragging
  useEffect(() => {
    let rafId: number;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.innerWidth >= 640) setOpen(false);
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  const links = [
    { href: h("#work"), label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/now", label: "Now" },
    { href: h("#contact"), label: "Contact" },
  ];

  // Tween (not spring) — smoother for opacity/rotate on small elements
  const barTransition = { type: "tween", duration: 0.2, ease: [0.16, 1, 0.3, 1] } as const;
  // Tween for height — springs can overshoot causing layout jank
  const menuTransition = reduce
    ? { duration: 0 }
    : ({ type: "tween", duration: 0.25, ease: [0.16, 1, 0.3, 1] } as const);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[color-mix(in_oklab,var(--background)_80%,transparent)] border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <SignatureLogo />
        <ul className="hidden sm:flex items-center gap-6 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <Link href={link.href} className="hover:text-[var(--foreground)] transition-colors">
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MagneticButton className="hidden sm:block" strength={0.4}>
            <a
              href={h("#contact")}
              className="inline-flex h-8 items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] px-3 text-xs font-medium text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--background)_88%,transparent)] focus-visible:outline-none focus-visible:ring-2 ring-accent"
            >
              Let's talk
            </a>
          </MagneticButton>
          {/* Mobile hamburger — no layout prop (avoids layout recalculation on each toggle) */}
          <button
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="sm:hidden relative h-9 w-9 grid place-items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] focus-visible:outline-none focus-visible:ring-2 ring-accent transition-colors"
          >
            <motion.span
              className="absolute h-[2px] w-5 rounded bg-[var(--foreground)]"
              animate={reduce ? undefined : open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              transition={barTransition}
              style={{ willChange: "transform" }}
            />
            <motion.span
              className="absolute h-[2px] w-5 rounded bg-[var(--foreground)]"
              animate={reduce ? undefined : open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ type: "tween", duration: 0.15 }}
            />
            <motion.span
              className="absolute h-[2px] w-5 rounded bg-[var(--foreground)]"
              animate={reduce ? undefined : open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              transition={barTransition}
              style={{ willChange: "transform" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — initial={false} skips the mount animation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={menuTransition}
            style={{ overflow: "hidden" }}
            className="sm:hidden border-t border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color-mix(in_oklab,var(--background)_94%,transparent)] backdrop-blur px-4 pb-4"
          >
            <ul className="flex flex-col pt-3 gap-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block rounded px-2 py-2 hover:bg-[color-mix(in_oklab,var(--background)_88%,transparent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={close}
                  className="mt-1 inline-flex h-9 items-center justify-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] bg-[color-mix(in_oklab,var(--background)_90%,transparent)] px-4 text-xs font-medium text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--background)_86%,transparent)]"
                >
                  Let's talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
