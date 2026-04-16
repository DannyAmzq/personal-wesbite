"use client";
import { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion, useReducedMotion } from "framer-motion";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Detect coarse/touch pointers after mount to avoid SSR mismatch.
    const isTouch =
      "ontouchstart" in window ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    if (isTouch || reduce) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, reduce]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: "transparent",
      }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 35%, transparent) 0%, color-mix(in oklab, var(--tertiary) 20%, transparent) 45%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
