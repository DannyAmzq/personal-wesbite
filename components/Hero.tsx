"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

const HERO_TITLE = "Crafting clear, modern digital experiences";

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 20, delay: 0.05 + i * 0.07 },
  }),
};

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white hero-title font-display">
            {HERO_TITLE.split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            variants={fadeInUp(0.15, 18)}
            className="max-w-2xl text-base sm:text-lg text-zinc-300 muted"
          >
            I design intuitive interfaces, build performant web apps, and support the systems that
            keep them running. Let's bring your product to life.
          </motion.p>
          <motion.div variants={fadeInUp(0.2, 20)} className="flex gap-3">
            <MagneticButton>
              <Link
                href="#work"
                className="inline-flex h-11 items-center rounded-md px-5 text-sm font-semibold shadow transition-colors btn-accent"
              >
                View work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="#contact"
                className="inline-flex h-11 items-center rounded-md border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white/10 hero-secondary hero-secondary-btn"
              >
                Contact me
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
