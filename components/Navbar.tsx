"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import MagneticButton from "@/components/MagneticButton";
import SignatureLogo from "@/components/SignatureLogo";

export default function Navbar() {
  const pathname = usePathname();
  // Prefix hash links with "/" when not on the homepage so they navigate back correctly
  const h = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  const links = [
    { href: h("#work"), label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/now", label: "Now" },
    { href: h("#contact"), label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[color-mix(in_oklab,var(--background)_80%,transparent)] border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center gap-x-6 gap-y-2">
        <SignatureLogo />
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
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
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <MagneticButton strength={0.4}>
            <a
              href={h("#contact")}
              className="inline-flex h-8 items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] px-3 text-xs font-medium text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--background)_88%,transparent)] focus-visible:outline-none focus-visible:ring-2 ring-accent"
            >
              Let's talk
            </a>
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
}
