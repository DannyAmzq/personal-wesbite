"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
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
  direction?: "left" | "right"; // scroll direction
};

export default function LogoCarousel({
  items,
  height = 48,
  gap = 28,
  speed = 40,
  direction = "left",
}: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false); // row hovered (slows scroll)
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dupCount = 3; // use 3 duplicates to keep middle in view for seamless loop
  const x = useMotionValue(0);
  const [trackW, setTrackW] = useState(0);

  // Tooltip reactive state (no position here – positions handled by motion values for trailing)
  const [tooltip, setTooltip] = useState<{ show: boolean; name: string }>({
    show: false,
    name: "",
  });

  // Motion values for trailing cursor position
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const trailX = useSpring(targetX, { stiffness: 320, damping: 34, mass: 0.6 });
  const trailY = useSpring(targetY, { stiffness: 320, damping: 34, mass: 0.6 });

  // Optional gentle bob (skipped if reduced motion)
  const bob = useMotionValue(0);
  useAnimationFrame((t) => {
    if (reduce) return;
    // slow sine wave
    bob.set(Math.sin(t / 600) * 2); // +/-2px vertical bob
  });

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

  // Initialize x offset so the middle sequence is visible (prevents seeing edges)
  useEffect(() => {
    if (mounted && trackW) {
      x.set(-trackW);
    }
  }, [mounted, trackW, x]);

  useAnimationFrame((_, delta) => {
    if (!mounted || reduce || !trackW) return;
    const pxPerMs = (hovered ? speed * 0.4 : speed) / 1000; // slow to 40% on hover
    const dir = direction === "right" ? 1 : -1;
    let next = x.get() + dir * pxPerMs * delta; // move left/right
    // Keep x within a stable window depending on direction to avoid seams
    if (dir === -1) {
      // moving left: keep within [-2*trackW, -trackW]
      if (next <= -2 * trackW) {
        next += trackW;
      }
    } else {
      // moving right: keep within [-trackW, 0]
      if (next >= 0) {
        next -= trackW;
      }
    }
    x.set(next);
  });

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  const handleEnter = (name: string) => {
    setTooltip({ show: true, name });
  };
  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    // Update target motion values (centered positioning; offset handled in render transform)
    targetX.set(localX);
    targetY.set(localY);
  };
  const handleLeave = () => {
    setTooltip((t) => ({ ...t, show: false }));
  };

  // Inline labels approach chosen: no overlay measurement logic retained.

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        handleLeave();
      }}
      onMouseMove={handleMove}
    >
      {/* backdrop blur edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[color-mix(in_oklab,var(--background)_75%,transparent)] to-transparent backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[color-mix(in_oklab,var(--background)_75%,transparent)] to-transparent backdrop-blur-[2px]" />

      <div ref={trackRef} className="overflow-hidden py-1" style={maskStyle}>
        <motion.div className="flex" style={{ x }}>
          {Array.from({ length: dupCount }).map((_, seq) => (
            <div key={seq} data-seq={seq} className="flex" style={{ gap, paddingRight: gap }}>
              {safeItems.map((item, idx) => {
                const isLogo = !!item.src;
                // Show labels on middle and trailing sequence to prevent visible reset gap
                const showMobileLabel = isLogo && (seq === 1 || seq === 2);
                const dim = seq === 2; // trailing copy slightly dimmed
                return (
                  <Logo
                    key={`${seq}-${idx}-${item.name}`}
                    item={item}
                    height={height}
                    onEnter={isLogo ? () => handleEnter(item.name) : undefined}
                    onLeave={isLogo ? handleLeave : undefined}
                    showMobileLabel={showMobileLabel}
                    dimLabel={dim}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
      {/* No overlay labels; inline labels handle mobile display */}
      {/* Follow tooltip (desktop only) */}
      <motion.div
        aria-hidden
        className="hidden sm:block pointer-events-none absolute left-0 top-0 z-30 select-none"
        style={{ x: trailX, y: trailY }}
      >
        {tooltip.name && (
          <motion.div
            initial={false}
            animate={tooltip.show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
            style={{
              transform: "translate(-50%, calc(-100% - 10px))",
              y: reduce ? 0 : bob, // gentle bob if not reduced motion
            }}
            className="px-3 py-1 rounded-full text-xs font-medium shadow-md border backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_70%,transparent)] border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] text-[color-mix(in_oklab,var(--foreground)_85%,transparent)] whitespace-nowrap"
          >
            {tooltip.name}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function Logo({
  item,
  height,
  onEnter,
  onLeave,
  showMobileLabel,
  dimLabel,
}: {
  item: LogoItem;
  height: number;
  onEnter?: () => void;
  onLeave?: () => void;
  showMobileLabel?: boolean;
  dimLabel?: boolean;
}) {
  // Washed color using CSS variables
  const tintAccent = "color-mix(in oklab, var(--accent) 20%, transparent)";
  const tintFg = "color-mix(in oklab, var(--foreground) 20%, transparent)";
  const bg = `radial-gradient(circle at 30% 30%, ${tintAccent}, ${tintFg})`;

  return (
    <div
      className="group relative inline-flex flex-col items-center justify-center select-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={-1}
    >
      {item.src ? (
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.3 }}
            className="grid place-items-center"
            style={{ width: height, height }}
            data-logo-name={item.name}
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
          {showMobileLabel && (
            <span
              className={[
                "md:hidden mt-1 px-2.5 py-0.5 rounded-full text-[10.5px] leading-tight font-medium whitespace-nowrap select-none",
                // Glass layering: soft internal gradient & subtle ring instead of harsh border
                "backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_60%,transparent)]",
                "shadow-[0_1px_2px_-1px_rgba(0,0,0,0.5),0_0_0_1px_color-mix(in_oklab,var(--foreground)_12%,transparent)]",
                "text-[color-mix(in_oklab,var(--foreground)_86%,transparent)]",
                dimLabel ? "opacity-55" : "opacity-95",
                "transition-opacity duration-300",
              ].join(" ")}
            >
              {item.name}
            </span>
          )}
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.3 }}
          className="inline-flex items-center justify-center rounded-full border px-3"
          style={{
            height,
            background: bg,
            borderColor: "color-mix(in oklab, var(--foreground) 14%, transparent)",
          }}
        >
          <span className="text-sm font-medium text-[color-mix(in_oklab,var(--foreground)_80%,transparent)] whitespace-nowrap">
            {item.name}
          </span>
        </motion.div>
      )}
    </div>
  );
}
