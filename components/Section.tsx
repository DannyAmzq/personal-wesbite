"use client";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/motion";

type SectionProps = PropsWithChildren<{
  id?: string;
  title?: string;
  className?: string;
}>;

export default function Section({ id, title, className, children }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 md:py-24 scroll-mt-20 ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.h2
            variants={fadeInUp(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-8 text-2xl sm:text-3xl font-bold text-[var(--foreground)]"
          >
            {title}
          </motion.h2>
        )}
        <motion.div
          variants={fadeInUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
