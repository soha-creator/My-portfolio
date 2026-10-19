"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "./ui/useReducedMotionSafe";
import { Check, LoaderCircle, RotateCcw } from "lucide-react";
import { profile, testRun } from "@/data/profile";

const STEP_MS = 520;

export function TestRunner() {
  const reduce = useReducedMotionSafe();
  const [run, setRun] = useState(0);
  const [progress, setProgress] = useState(0);
  const done = reduce ? testRun.length : progress;

  useEffect(() => {
    if (reduce) return;
    const timers = testRun.map((_, i) => setTimeout(() => setProgress(i + 1), 700 + (i + 1) * STEP_MS));
    return () => timers.forEach(clearTimeout);
  }, [run, reduce]);

  const finished = done === testRun.length;
  const totalMs = testRun.reduce((s, t) => s + t.ms, 0);
  const slug = profile.name.toLowerCase();

  return (
    <div className="relative">
      <div className="absolute -inset-3 -z-10 rotate-2 rounded-[28px] bg-lime/70 sm:-inset-4" aria-hidden="true" />
      <div className="overflow-hidden rounded-3xl border border-line bg-[#0f110e] text-[#e7e9e1] shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff6a52]" />
            <span className="size-2.5 rounded-full bg-[#f2b33d]" />
            <span className="size-2.5 rounded-full bg-[#8fdc5a]" />
          </div>
          <span className="font-mono text-[11px] text-white/50">~/{slug} — npm test</span>
          <button
            type="button"
            onClick={() => {
              setProgress(0);
              setRun((r) => r + 1);
            }}
            aria-label="Re-run tests"
            className="grid size-6 place-items-center rounded-md text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>

        <div className="space-y-1 p-4 font-mono text-[12px] leading-relaxed sm:p-5 sm:text-[13px]" aria-live="polite">
          <p className="text-white/50">
            <span className="text-[#c9ef3f]">$</span> describe(&quot;{profile.name}&quot;)
          </p>
          <p className="pb-1 text-white/40">  RUNS  candidate.spec.ts</p>
          {testRun.map((t, i) => {
            const state = i < done ? "pass" : i === done ? "running" : "pending";
            return (
              <div key={`${run}-${t.name}`} className="flex items-start gap-2.5">
                <span className="mt-[3px] grid size-4 shrink-0 place-items-center">
                  {state === "pass" && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#8fdc5a]">
                      <Check className="size-3.5" strokeWidth={3} />
                    </motion.span>
                  )}
                  {state === "running" && <LoaderCircle className="size-3.5 animate-spin text-[#f2b33d]" />}
                  {state === "pending" && <span className="size-1.5 rounded-full bg-white/20" />}
                </span>
                <span className={state === "pending" ? "text-white/30" : "text-white/85"}>
                  {t.name}
                  {state === "pass" && <span className="text-white/35"> ({t.ms}ms)</span>}
                </span>
              </div>
            );
          })}

          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[#c9ef3f]"
                animate={{ width: `${(done / testRun.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p>
              <span className="text-white/50">Tests: </span>
              <span className="font-semibold text-[#8fdc5a]">{done} passed</span>
              <span className="text-white/50">, 0 failed, {testRun.length} total</span>
            </p>
            <p className="text-white/50">
              Time: {finished ? `${(totalMs / 100).toFixed(2)}s` : "…"}
              {finished && (
                <span className="ml-2 rounded bg-[#c9ef3f] px-1.5 py-0.5 font-semibold text-[#0d0e0c]">READY TO HIRE</span>
              )}
              {!finished && <span className="caret ml-1">▍</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
