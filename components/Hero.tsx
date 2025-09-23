"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-24 sm:py-28 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(120,119,198,0.25)_0%,rgba(120,119,198,0)_50%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeInUp(0.05, 10)}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur hero-badge"
          >
            UI/UX • Frontend • IT Support
          </motion.span>
          <motion.h1
            variants={fadeInUp(0.1, 14)}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white hero-title"
          >
            Crafting clear, modern digital experiences
          </motion.h1>
          <motion.p
            variants={fadeInUp(0.15, 18)}
            className="max-w-2xl text-base sm:text-lg text-zinc-300 muted"
          >
            I design intuitive interfaces, build performant web apps, and support the systems that
            keep them running. Let's bring your product to life.
          </motion.p>
          <motion.div variants={fadeInUp(0.2, 20)} className="flex gap-3">
            <Link
              href="#work"
              className="inline-flex h-11 items-center rounded-md px-5 text-sm font-semibold shadow transition-colors btn-accent"
            >
              View work
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-11 items-center rounded-md border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white/10 hero-secondary hero-secondary-btn"
            >
              Contact me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
