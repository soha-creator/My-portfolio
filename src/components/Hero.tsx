"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "./ui/useReducedMotionSafe";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { TestRunner } from "./TestRunner";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotionSafe();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section id="top" className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40 lg:pb-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="rounded-full bg-ink px-3 py-1 text-bg">{profile.role}</span>
            <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1">
              <MapPin className="size-3" /> {profile.location}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.88] font-semibold tracking-[-0.04em]">
            <Line delay={0.1}>Projects</Line>
            <Line delay={0.2}>
              <span className="font-serif font-normal tracking-[-0.02em] text-muted italic">that</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-1 text-lime-ink">pass</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-[12%] bottom-[4%] -z-0 origin-left -rotate-1 rounded-lg bg-lime"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.9, ease }}
                />
              </span>
            </Line>
            <Line delay={0.3}>
              every check<span className="text-coral">.</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            Hi, I&apos;m <span className="font-semibold text-ink">{profile.name}</span>. {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-3.5 pr-3.5 pl-6 font-medium text-bg transition hover:gap-3"
            >
              See the work
              <span className="grid size-7 place-items-center rounded-full bg-lime text-lime-ink">
                <ArrowDownRight className="size-4 transition group-hover:rotate-[-45deg]" />
              </span>
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium transition hover:bg-surface"
            >
              Résumé <ArrowUpRight className="size-4" />
            </a>
            <span className="ml-1 flex items-center gap-2 text-sm text-muted">
              <span className="size-2 rounded-full bg-pass" /> {profile.availability}
            </span>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
        >
          <TestRunner />
        </motion.div>
      </div>
    </section>
  );
}
