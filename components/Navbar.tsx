"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
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
        </div>
      </nav>
    </header>
  );
}
