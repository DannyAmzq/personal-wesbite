"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Dot = {
  id: number;
  left: number;
  top: number;
  ampX: number;
  ampY: number;
  durX: number;
  durY: number;
  delay: number;
  accent: boolean;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function BackgroundDots({
  count = 40,
  /**
   * Maximum parallax offset in pixels (higher = more sensitive). Previous hard-coded value was 12.
   * 24 gives a noticeably more reactive feel without being dizzying. Tweak as desired.
   */
  parallaxMax = 24,
  /**
   * Exponent used to amplify subtle movements near the center. < 1 increases small deltas.
   */
  parallaxExponent = 0.85,
}: {
  count?: number;
  parallaxMax?: number;
  parallaxExponent?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();
  const [dots, setDots] = useState<Dot[]>([]);

  // Parallax motion values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 12, mass: 0.4 });
  const py = useSpring(my, { stiffness: 40, damping: 12, mass: 0.4 });

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    setMounted(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const handle = (e: PointerEvent) => {
      const rawX = e.clientX / (viewport.w || 1) - 0.5; // -0.5 .. 0.5
      const rawY = e.clientY / (viewport.h || 1) - 0.5;
      // Non-linear amplification: exponent < 1 => boosts smaller motions so it feels more sensitive.
      const amplify = (v: number) => {
        const mag = Math.abs(v);
        const boosted = Math.pow(mag, parallaxExponent);
        return Math.sign(v) * boosted;
      };
      const x = amplify(rawX) * parallaxMax * 2; // *2 because raw range is 0.5
      const y = amplify(rawY) * parallaxMax * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [mx, my, viewport.w, viewport.h, reduce, parallaxMax, parallaxExponent]);

  useEffect(() => {
    if (!mounted) return;
    const n = clamp(count, 1, 300);
    const arr: Dot[] = [];
    for (let i = 0; i < n; i++) {
      const accent = Math.random() < 0.35; // ~35% accent, rest foreground
      const ampX = 16 + Math.random() * 28; // 16-44px
      const ampY = 16 + Math.random() * 28; // 16-44px
      const durX = 8 + Math.random() * 10; // 8-18s
      const durY = 8 + Math.random() * 10; // 8-18s
      const delay = Math.random() * 4; // start offsets
      arr.push({
        id: i,
        left: Math.random(),
        top: Math.random(),
        ampX,
        ampY,
        durX,
        durY,
        delay,
        accent,
      });
    }
    setDots(arr);
  }, [mounted, count]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ x: reduce ? 0 : px, y: reduce ? 0 : py }}
    >
      {dots.map((d) => {
        const heavy = dots.length > 80;
        const left = Math.round(d.left * viewport.w);
        const top = Math.round(d.top * viewport.h);
        const color = d.accent
          ? "color-mix(in oklab, var(--accent) 28%, transparent)"
          : "color-mix(in oklab, var(--foreground) 16%, transparent)";
        const common = {
          position: "absolute" as const,
          left,
          top,
          width: 3,
          height: 3,
          borderRadius: 9999,
          backgroundColor: color,
          willChange: "transform",
          boxShadow: heavy ? undefined : (`0 0 0 0.5px ${color}` as const),
        };

        if (reduce) {
          return <div key={d.id} style={common} />;
        }

        return (
          <motion.div
            key={d.id}
            style={common}
            animate={{
              x: [0, d.ampX, 0, -d.ampX, 0],
              y: [0, -d.ampY, 0, d.ampY, 0],
            }}
            transition={{
              duration: Math.max(d.durX, d.durY),
              ease: [0.36, 0.66, 0.04, 1],
              repeat: Infinity,
              delay: d.delay,
            }}
          />
        );
      })}
    </motion.div>
  );
}
