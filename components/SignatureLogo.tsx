"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function SignatureLogo() {
  const reduce = useReducedMotion();

  return (
    <Link href="/" aria-label="Home" className="flex items-center text-[var(--foreground)]">
      <motion.span
        initial={reduce ? { opacity: 1 } : { opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
        transition={reduce ? { duration: 0 } : { duration: 2.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="block overflow-hidden whitespace-nowrap select-none"
        style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "1.25rem" }}
      >
        Danny Amezquita
      </motion.span>
    </Link>
  );
}
