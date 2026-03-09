"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// ── Paste your signature SVG path(s) here ────────────────────────────────────
// How to get them:
//   1. Sign on white paper with a black pen, take a clear photo
//   2. Upload to https://vectorizer.ai (free) — auto-traces to SVG
//   3. Open the downloaded SVG in a text editor
//   4. Copy the d="..." value(s) from each <path> element and paste below
//   5. Adjust `viewBox` to match the SVG's viewBox attribute
//
// Until then, the text fallback renders automatically.
const SIGNATURE_PATHS: string[] = [
  // e.g. "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
];
const VIEW_BOX = "0 0 300 80"; // update to match your SVG's viewBox
// ─────────────────────────────────────────────────────────────────────────────

const hasPaths = SIGNATURE_PATHS.length > 0;

export default function SignatureLogo() {
  const reduce = useReducedMotion();

  return (
    <Link href="/" aria-label="Home" className="flex items-center">
      {hasPaths ? (
        <svg
          viewBox={VIEW_BOX}
          className="h-8 w-auto"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {SIGNATURE_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      pathLength: {
                        duration: 1.8,
                        delay: i * 0.2,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      },
                      opacity: { duration: 0.2, delay: i * 0.2 },
                    }
              }
            />
          ))}
        </svg>
      ) : (
        // Text fallback until signature SVG is ready
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold tracking-tight text-[var(--foreground)]"
        >
          Danny Amezquita
        </motion.span>
      )}
    </Link>
  );
}
