"use client";
import LogoCarousel, { type LogoItem } from "./LogoCarousel";

type Row = {
  items: LogoItem[];
  speed?: number; // px/sec
  height?: number; // px
  gap?: number; // px
  direction?: "left" | "right";
};

type Props = {
  rows: Row[];
  rowGap?: number; // vertical gap between rows
};

export default function StackedLogoMarquee({ rows, rowGap = 14 }: Props) {
  return (
    <div className="flex flex-col" style={{ gap: rowGap }}>
      {rows.map((row, i) => (
        <LogoCarousel
          key={i}
          items={row.items}
          speed={row.speed ?? 40}
          height={row.height ?? 56}
          gap={row.gap ?? 28}
          direction={row.direction ?? (i % 2 === 0 ? "left" : "right")}
        />
      ))}
    </div>
  );
}
