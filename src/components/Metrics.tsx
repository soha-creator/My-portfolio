"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotionSafe } from "./ui/useReducedMotionSafe";
import { metrics } from "@/data/profile";

function Counter({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const format = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section aria-label="Key numbers" className="px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="relative border-line p-6 sm:p-8 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 [&:not(:last-child)]:border-r max-lg:[&:nth-child(2)]:border-r-0"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
              metric_{String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <Counter value={m.value} decimals={m.decimals} suffix={m.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
