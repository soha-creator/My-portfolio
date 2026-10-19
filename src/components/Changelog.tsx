"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import clsx from "clsx";
import { releases } from "@/data/profile";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

const typeStyles: Record<string, string> = {
  added: "bg-pass/15 text-pass",
  improved: "bg-sky/15 text-sky",
  fixed: "bg-coral/15 text-coral",
};

export function Changelog() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="border-y border-line bg-surface/60 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          kicker="Experience"
          title="Career"
          accent="changelog."
          description="Every role shipped something. Here are the release notes, newest version first."
        />

        <ol ref={ref} className="relative">
          {/* git-graph rail */}
          <div className="absolute top-2 bottom-2 left-[11px] w-px bg-line md:left-[calc(25%+11px)]" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-ink md:left-[calc(25%+11px)]"
            aria-hidden="true"
          />

          {releases.map((r) => (
            <li key={r.version} className="relative grid gap-4 pb-14 pl-12 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              <Reveal className="md:pr-10 md:text-right">
                <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{r.version}</p>
                <p className="mt-1 font-mono text-xs text-muted">{r.date}</p>
              </Reveal>

              <span
                className={clsx(
                  "absolute top-2 left-0 grid size-[23px] place-items-center rounded-full border-2 bg-bg md:left-[25%]",
                  r.tag === "latest" ? "border-lime" : "border-ink",
                )}
                aria-hidden="true"
              >
                <span className={clsx("size-2 rounded-full", r.tag === "latest" ? "bg-lime" : "bg-ink")} />
              </span>

              <Reveal delay={0.1} className="md:col-span-3 md:pl-14">
                <div className="rounded-3xl border border-line bg-bg p-6 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{r.role}</h3>
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase",
                        r.tag === "latest" ? "bg-lime text-lime-ink" : "border border-line text-muted",
                      )}
                    >
                      {r.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-muted">@ {r.company}</p>
                  <ul className="mt-6 space-y-3">
                    {r.changes.map((c) => (
                      <li key={c.text} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                        <span
                          className={clsx(
                            "w-fit shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase sm:mt-0.5 sm:w-20 sm:text-center",
                            typeStyles[c.type],
                          )}
                        >
                          {c.type}
                        </span>
                        <span className="leading-relaxed">{c.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
