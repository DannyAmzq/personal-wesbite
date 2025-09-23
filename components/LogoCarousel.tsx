"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";

export type LogoItem = {
  name: string;
  src?: string; // path under public/
};

type Props = {
  items: LogoItem[];
  height?: number; // px height of logos
  gap?: number; // px gap between items
  speed?: number; // px per second base speed
};

export default function LogoCarousel({ items, height = 48, gap = 28, speed = 40 }: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dupCount = 2; // duplicate tracks for seamless loop
  const x = useMotionValue(0);
  const [trackW, setTrackW] = useState(0);

  const safeItems = useMemo(() => items.filter(Boolean), [items]);

  useEffect(() => {
    setMounted(true);
    const measure = () => {
      if (!trackRef.current) return;
      // Width of a single sequence (not both duplicates)
      const first = trackRef.current.querySelector<HTMLElement>("[data-seq='0']");
      if (first) setTrackW(first.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!mounted || reduce || !trackW) return;
    const pxPerMs = (hovered ? speed * 0.4 : speed) / 1000; // slow to 40% on hover
    let next = x.get() - pxPerMs * delta; // move left
    // Loop when we have moved a full track width
    if (Math.abs(next) >= trackW) {
      next = next + trackW; // keep residual for smoothness
    }
    x.set(next);
  });

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* backdrop blur edges */}
  <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[color-mix(in_oklab,var(--background)_75%,transparent)] to-transparent backdrop-blur-[2px]" />
  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[color-mix(in_oklab,var(--background)_75%,transparent)] to-transparent backdrop-blur-[2px]" />

      <div ref={trackRef} className="overflow-hidden py-1" style={maskStyle}>
        <motion.div className="flex" style={{ x }}>
          {Array.from({ length: dupCount }).map((_, seq) => (
            <div key={seq} data-seq={seq} className="flex" style={{ gap }}>
              {safeItems.map((item, idx) => (
                <Logo key={`${seq}-${idx}-${item.name}`} item={item} height={height} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Logo({ item, height }: { item: LogoItem; height: number }) {
  // Washed color using CSS variables
  const tintAccent = "color-mix(in oklab, var(--accent) 20%, transparent)";
  const tintFg = "color-mix(in oklab, var(--foreground) 20%, transparent)";
  const bg = `radial-gradient(circle at 30% 30%, ${tintAccent}, ${tintFg})`;

  return (
    <div className="group relative inline-flex items-center justify-center select-none">
      {item.src ? (
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.3 }}
          className="grid place-items-center"
          style={{ width: height, height }}
        >
          <div className="relative" style={{ width: height, height }}>
            <Image
              src={item.src}
              alt={item.name}
              fill
              sizes={`${height}px`}
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity p-1"
              draggable={false}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.3 }}
          className="grid place-items-center rounded-md border"
          style={{
            width: height,
            height,
            background: bg,
            borderColor: "color-mix(in oklab, var(--foreground) 14%, transparent)",
          }}
        >
          <span className="text-xs font-medium text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]">
            {item.name}
          </span>
        </motion.div>
      )}
    </div>
  );
}
