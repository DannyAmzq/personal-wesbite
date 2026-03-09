"use client";
import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.5 });

  return (
    <motion.div
      style={{ scaleX, background: "linear-gradient(90deg, var(--accent), var(--tertiary))" }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
    />
  );
}
