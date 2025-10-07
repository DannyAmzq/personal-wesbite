"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Close on resize to >= sm breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const links = [
    { href: "#work", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[color-mix(in_oklab,var(--background)_80%,transparent)] border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold tracking-tight text-[var(--foreground)]"
        >
          Danny Amezquita
        </motion.div>
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
          <a
            href="#contact"
            className="hidden sm:inline-flex h-8 items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] px-3 text-xs font-medium text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--background)_88%,transparent)] focus-visible:outline-none focus-visible:ring-2 ring-accent"
          >
            Let’s talk
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="sm:hidden relative h-9 w-9 grid place-items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] focus-visible:outline-none focus-visible:ring-2 ring-accent transition-colors"
          >
            <motion.span
              layout
              className="absolute h-[2px] w-5 rounded bg-[var(--foreground)]"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 600, damping: 40 }}
            />
            <motion.span
              layout
              className="absolute h-[2px] w-5 rounded bg-[var(--foreground)]"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              layout
              className="absolute h-[2px] w-5 rounded bg-[var(--foreground)]"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              transition={{ type: "spring", stiffness: 600, damping: 40 }}
            />
          </button>
        </div>
      </nav>
      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="sm:hidden border-t border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color-mix(in_oklab,var(--background)_94%,transparent)] backdrop-blur px-4 pb-4"
          >
            <ul className="flex flex-col pt-3 gap-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-2 py-2 hover:bg-[color-mix(in_oklab,var(--background)_88%,transparent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex h-9 items-center justify-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] bg-[color-mix(in_oklab,var(--background)_90%,transparent)] px-4 text-xs font-medium text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--background)_86%,transparent)]"
                >
                  Let’s talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
