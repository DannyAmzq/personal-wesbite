"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignatureLogo() {
  return (
    <Link href="/" aria-label="Home" className="flex items-center">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-semibold tracking-tight text-[var(--foreground)]"
      >
        Danny Amezquita
      </motion.span>
    </Link>
  );
}
