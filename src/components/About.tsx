"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, ClipboardCheck, Workflow } from "lucide-react";
import clsx from "clsx";
import { modes, profile, type Mode } from "@/data/profile";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

function Badge() {
  const initials = profile.fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
      {/* lanyard */}
      <div className="mx-auto h-10 w-5 rounded-b-sm bg-coral" aria-hidden="true" />
      <div className="relative -mt-2 rounded-[28px] border border-line bg-surface p-6 shadow-xl shadow-black/5">
        <div className="mx-auto mb-6 h-2 w-14 rounded-full bg-surface-2" aria-hidden="true" />
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Access pass</span>
          <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] font-semibold text-lime-ink uppercase">
            All areas
          </span>
        </div>
        <div className="my-8 grid aspect-square place-items-center overflow-hidden rounded-2xl bg-ink bg-grid">
          {/* Replace with <Image src="/portrait.jpg" .../> when you have a photo */}
          <span className="font-display text-8xl font-bold tracking-tighter text-bg">{initials}</span>
        </div>
        <p className="font-display text-2xl font-semibold tracking-tight">{profile.fullName}</p>
        <p className="text-sm text-muted">{profile.role}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-dashed border-line pt-5 font-mono text-[11px]">
          <div>
            <dt className="text-muted uppercase">Clearance</dt>
            <dd className="mt-0.5">Release approver</dd>
          </div>
          <div>
            <dt className="text-muted uppercase">Based in</dt>
            <dd className="mt-0.5">{profile.location}</dd>
          </div>
        </dl>
        {/* barcode */}
        <div className="mt-5 flex h-8 items-stretch gap-[2px]" aria-hidden="true">
          {Array.from({ length: 42 }, (_, i) => (
            <span key={i} className="bg-ink" style={{ width: [1, 3, 1, 2, 4, 1, 2][i % 7] }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function About() {
  const [mode, setMode] = useState<Mode>("pm");
  const data = modes[mode];

  return (
    <section id="about" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          kicker="About"
          title="One person,"
          accent="two job titles."
          description="Most teams hire a project manager and a QA engineer separately — then spend weeks getting them to talk. I'm both, so the plan already knows how it'll be tested."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Badge />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div
                role="tablist"
                aria-label="Choose a discipline"
                className="relative inline-flex w-full rounded-full border border-line bg-surface p-1.5 sm:w-auto"
              >
                {(Object.keys(modes) as Mode[]).map((m) => (
                  <button
                    key={m}
                    role="tab"
                    type="button"
                    aria-selected={mode === m}
                    onClick={() => setMode(m)}
                    className={clsx(
                      "relative flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors sm:flex-none",
                      mode === m ? "text-bg" : "text-muted hover:text-ink",
                    )}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {m === "pm" ? <Workflow className="size-4" /> : <ClipboardCheck className="size-4" />}
                      {modes[m].label}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="mt-10"
              >
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{data.blurb}</p>

                <ul className="mt-10 space-y-5">
                  {data.skills.map((s, i) => (
                    <li key={s.name}>
                      <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
                        <span className="font-medium">{s.name}</span>
                        <span className="font-mono text-xs text-muted">{s.level}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                        <motion.div
                          className={clsx("h-full rounded-full", mode === "pm" ? "bg-sky" : "bg-pass")}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-8">
                  <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                    Definition of done — {data.label}
                  </p>
                  <ul className="space-y-3">
                    {data.principles.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CircleCheck className="mt-0.5 size-5 shrink-0 text-pass" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
