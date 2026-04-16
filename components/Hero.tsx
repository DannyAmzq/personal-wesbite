"use client";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

const HERO_LINE1 = "Interfaces with taste.";
const HERO_LINE2 = "Systems that don't fall over.";

const wordVariants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 20, delay: 0.05 + i * 0.07 },
  }),
};

const reducedWordVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

function AnimatedWords({
  words,
  startIndex = 0,
  reduce,
}: {
  words: string[];
  startIndex?: number;
  reduce: boolean;
}) {
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={reduce ? reducedWordVariants : wordVariants}
          className={`inline${i < words.length - 1 ? " mr-[0.25em]" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion() ?? false;
  const line1Words = HERO_LINE1.split(" ");
  const line2Words = HERO_LINE2.split(" ");

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-24 sm:py-28 overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-x-0 -top-14 bottom-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 75% at 50% 0%, color-mix(in oklab, var(--accent) 24%, transparent) 0%, color-mix(in oklab, var(--tertiary) 15%, transparent) 42%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6 w-full"
        >
          <motion.span
            variants={fadeInUp(0.05, 10)}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur hero-badge"
          >
            UX Engineer & Front End Developer
          </motion.span>
          <h1 className="w-full max-w-full text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display hero-word-gradient">
            {/* On mobile: two explicit lines. On sm+: flows as one line */}
            <span className="block sm:inline">
              <AnimatedWords words={line1Words} startIndex={0} reduce={reduce} />
            </span>
            <span className="block sm:inline">
              <AnimatedWords words={line2Words} startIndex={line1Words.length} reduce={reduce} />
            </span>
          </h1>
          <motion.p
            variants={fadeInUp(0.15, 18)}
            className="w-full max-w-2xl text-base sm:text-lg text-zinc-300 muted"
          >
            I design intuitive interfaces, build performant web apps, and keep the systems behind
            them running smoothly.
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
