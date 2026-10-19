"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionSafe } from "./ui/useReducedMotionSafe";
import { Check } from "lucide-react";
import { pipeline } from "@/data/profile";
import { Reveal } from "./ui/Reveal";

const STAGGER = 0.35;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotionSafe();
  const active = inView || reduce;

  return (
    <section id="process" className="dark border-y border-line bg-bg px-4 py-24 text-ink sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
              <span className="rounded-full border border-line px-2 py-0.5 text-ink">04</span>
              How I work
            </p>
            <h2 className="font-display text-4xl leading-[0.95] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              The delivery <span className="font-serif font-normal text-lime italic">pipeline.</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-sm text-muted">
            <span className="text-lime">●</span> workflow: ship.yml · trigger: kickoff
          </p>
        </Reveal>

        <div ref={ref}>
          {/* stage rail (desktop) */}
          <div className="relative mb-10 hidden lg:block" aria-hidden="true">
            <div className="absolute top-1/2 right-[8.33%] left-[8.33%] h-px -translate-y-1/2 bg-line" />
            <motion.div
              className="absolute top-1/2 left-[8.33%] h-px w-[83.33%] origin-left -translate-y-1/2 bg-lime"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: active ? 1 : 0 }}
              transition={{ duration: STAGGER * (pipeline.length - 1), ease: "linear", delay: 0.2 }}
            />
            <div className="relative grid grid-cols-6">
              {pipeline.map((s, i) => (
                <div key={s.step} className="flex justify-center">
                  <motion.span
                    className="grid size-9 place-items-center rounded-full border border-line bg-bg"
                    initial={false}
                    animate={
                      active
                        ? { backgroundColor: "#c9ef3f", borderColor: "#c9ef3f", color: "#0d0e0c" }
                        : {}
                    }
                    transition={{ delay: 0.2 + i * STAGGER, duration: 0.3 }}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
            {pipeline.map((s, i) => (
              <motion.li
                key={s.step}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * STAGGER, duration: 0.5 }}
                className="group relative rounded-2xl border border-line bg-surface p-5 transition hover:border-lime/60"
              >
                <div className="mb-8 flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>job_{i + 1}</span>
                  <span className="flex items-center gap-1 text-pass">
                    <Check className="size-3" strokeWidth={3} /> passed
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{s.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
