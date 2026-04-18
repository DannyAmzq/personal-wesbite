"use client";
import { useEffect, useState } from "react";

function greetingFor(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Burning the midnight oil";
}

export default function PresenceBadge() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const tz = "America/Chicago";
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: tz,
      });
      const hourStr = now.toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: tz,
      });
      const hour = parseInt(hourStr, 10);
      setLabel(`${greetingFor(hour)} · ${time} in Texas`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!label) {
    return (
      <span
        className="inline-flex h-[26px] items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-3 text-xs"
        aria-hidden
      >
        &nbsp;
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-3 py-1 text-xs font-medium text-[var(--secondary)]"
      title="Local time in Texas"
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
        style={{ boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent)" }}
      />
      {label}
    </span>
  );
}
