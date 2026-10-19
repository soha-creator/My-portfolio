"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Changelog" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const subscribe = () => () => {};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition hover:bg-surface-2"
    >
      {mounted ? dark ? <Sun className="size-4" /> : <Moon className="size-4" /> : <span className="size-4" />}
    </button>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          className={clsx(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled
              ? "border-line bg-surface/80 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" className="flex items-center gap-2.5 pl-1">
            <span className="grid size-8 place-items-center rounded-full bg-ink font-display text-sm font-bold text-bg">
              {profile.name.charAt(0)}
            </span>
            <span className="hidden font-display text-sm font-semibold sm:block">{profile.name}</span>
            <span className="hidden items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted lg:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-pass opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-pass" />
              </span>
              build passing
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 sm:block"
            >
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface md:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink p-6 text-bg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">menu.json</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-bg/20"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-auto mb-12 space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={`mailto:${profile.email}`} className="font-mono text-sm opacity-70">
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
