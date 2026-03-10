"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function SignatureLogo() {
  const reduce = useReducedMotion();

  return (
    <Link href="/" aria-label="Home" className="flex items-center text-[var(--foreground)]">
      <motion.span
        initial={reduce ? { opacity: 1 } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        transition={reduce ? { duration: 0 } : { duration: 1.85, ease: [0.16, 1, 0.3, 1] }}
        className="block overflow-hidden"
      >
        <span
          aria-hidden="true"
          className="block h-11 w-[11rem] select-none bg-current"
          style={{
            WebkitMaskImage: "url('/signature.svg')",
            maskImage: "url('/signature.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
      </motion.span>
    </Link>
  );
}
