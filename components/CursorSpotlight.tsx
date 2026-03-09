"use client";
import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window;
    if (isTouch.current) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

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
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.10) 0%, rgba(167,139,250,0.06) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
