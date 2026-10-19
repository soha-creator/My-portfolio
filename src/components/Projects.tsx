"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, CircleCheck } from "lucide-react";
import clsx from "clsx";
import { projects, type ProjectKind } from "@/data/profile";
import { SectionHeader } from "./ui/SectionHeader";

const filters: ("All" | ProjectKind)[] = ["All", "PM", "QA", "PM + QA"];

const priorityStyles = {
  P0: "bg-coral text-white",
  P1: "bg-amber text-lime-ink",
  P2: "bg-surface-2 text-ink",
};

function Ticket({ p }: { p: (typeof projects)[number] }) {
  const Wrapper = p.href ? "a" : "div";
  return (
    <Wrapper
      {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
      className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:rotate-[-0.4deg] hover:shadow-2xl hover:shadow-black/10"
    >
      <div className="flex-1 p-6 sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted">{p.id}</span>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">
              {p.kind}
            </span>
            <span className={clsx("rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold", priorityStyles[p.priority])}>
              {p.priority}
            </span>
          </div>
        </div>
        <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* perforated tear line */}
      <div className="relative h-0 border-t border-dashed border-line" aria-hidden="true">
        <span className="absolute -top-3 -left-3 size-6 rounded-full border border-line bg-bg [clip-path:inset(0_0_0_50%)]" />
        <span className="absolute -top-3 -right-3 size-6 rounded-full border border-line bg-bg [clip-path:inset(0_50%_0_0)]" />
      </div>

      <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-4 p-6 sm:p-7">
        {p.outcome.map((o) => (
          <div key={o.label}>
            <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{o.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight">{o.value}</p>
          </div>
        ))}
        <span className="flex items-center gap-1 text-xs font-medium text-pass">
          {p.href ? (
            <ArrowUpRight className="size-5 text-ink transition group-hover:rotate-45" />
          ) : (
            <>
              <CircleCheck className="size-4" /> Done
            </>
          )}
        </span>
      </div>
    </Wrapper>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.kind === filter);

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          kicker="Selected work"
          title="Closed tickets,"
          accent="measurable outcomes."
          description="A few projects I planned, tested, or both. Each one closed with numbers attached."
        />

        <LayoutGroup>
          <div className="mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
            <span className="mr-2 font-mono text-xs text-muted">filter:</span>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors",
                  filter === f ? "border-ink text-bg" : "border-line text-muted hover:text-ink",
                )}
              >
                {filter === f && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" />
                )}
                <span className="relative z-10">
                  {f}
                  <span className="ml-1.5 font-mono text-[10px] opacity-60">
                    {f === "All" ? projects.length : projects.filter((p) => p.kind === f).length}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Ticket p={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
