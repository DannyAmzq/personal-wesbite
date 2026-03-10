"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function SignatureLogo() {
  const reduce = useReducedMotion();

  return (
    <Link href="/" aria-label="Home" className="flex items-center text-[var(--foreground)]">
      <motion.span
        initial={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        transition={reduce ? { duration: 0 } : { duration: 1.85, ease: [0.16, 1, 0.3, 1] }}
        className="block overflow-hidden whitespace-nowrap select-none"
        style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "1.25rem" }}
      >
        Danny Amezquita
      </motion.span>
    </Link>
  );
}
