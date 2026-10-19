"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./ui/icons";
import { Reveal } from "./ui/Reveal";

const types = ["Project management", "QA / testing", "Both", "Just saying hi"];
const priorities = [
  { id: "low", label: "Low", dot: "bg-muted" },
  { id: "normal", label: "Normal", dot: "bg-amber" },
  { id: "urgent", label: "Urgent", dot: "bg-coral" },
];

const inputClass =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-ink placeholder:text-muted/70 transition focus:border-ink focus:outline-none";

export function Contact() {
  const [priority, setPriority] = useState("normal");
  const [ticket, setTicket] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // No backend: the form composes an email in the visitor's mail client.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `[${String(priority).toUpperCase()}] ${data.get("type")} — ${data.get("summary")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTicket(`MSG-${Math.floor(1000 + Math.random() * 9000)}`);
    e.currentTarget.reset();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
            <span className="rounded-full border border-line px-2 py-0.5 text-ink">06</span>
            Contact
          </p>
          <h2 className="font-display text-5xl leading-[0.9] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            File a <span className="font-serif font-normal text-muted italic">ticket.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Got a project that needs steering, or a product that needs breaking? Tell me about it — I triage
            every request within a day.
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="group mt-10 flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4 text-left transition hover:border-ink"
          >
            <span className="min-w-0">
              <span className="block font-mono text-[10px] tracking-wider text-muted uppercase">Email</span>
              <span className="block truncate font-display text-lg font-medium sm:text-xl">{profile.email}</span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-bg">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </span>
          </button>
          <p className="mt-2 h-4 font-mono text-xs text-pass" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              { href: profile.socials.github, label: "GitHub", Icon: GitHubIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition hover:bg-surface"
              >
                <Icon className="size-4" /> {label} <ArrowUpRight className="size-3.5 text-muted" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
              <span className="font-mono text-xs text-muted">New issue</span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <span className="size-1.5 rounded-full bg-pass" /> assignee: {profile.name.toLowerCase()}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {ticket ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid min-h-[480px] place-items-center p-8 text-center"
                >
                  <div>
                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-lime-ink">
                      <Check className="size-7" strokeWidth={3} />
                    </span>
                    <p className="mt-6 font-mono text-sm text-muted">{ticket} · status: open</p>
                    <p className="mt-2 font-display text-3xl font-semibold tracking-tight">Ticket drafted.</p>
                    <p className="mx-auto mt-3 max-w-sm text-muted">
                      Your mail app should have opened with everything filled in — just hit send.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTicket(null)}
                      className="mt-8 rounded-full border border-line px-5 py-2.5 text-sm transition hover:bg-bg"
                    >
                      File another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="space-y-5 p-6 sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">Reporter</span>
                      <input name="name" required autoComplete="name" placeholder="Your name" className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">Email</span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">Summary</span>
                    <input name="summary" required placeholder="One line about what you need" className={inputClass} />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium">Type</span>
                      <select name="type" className={clsx(inputClass, "appearance-none")} defaultValue={types[0]}>
                        {types.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                    <fieldset>
                      <legend className="mb-2 block text-sm font-medium">Priority</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {priorities.map((p) => (
                          <label
                            key={p.id}
                            className={clsx(
                              "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-2 py-3.5 text-sm transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sky",
                              priority === p.id ? "border-ink bg-ink text-bg" : "border-line bg-bg hover:border-ink/40",
                            )}
                          >
                            <input
                              type="radio"
                              name="priority"
                              value={p.id}
                              checked={priority === p.id}
                              onChange={() => setPriority(p.id)}
                              className="sr-only"
                            />
                            <span className={clsx("size-2 rounded-full", p.dot)} />
                            {p.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">Description</span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={"Context, timeline, and what success looks like…"}
                      className={clsx(inputClass, "resize-y")}
                    />
                  </label>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-lime px-6 py-4 font-semibold text-lime-ink transition hover:brightness-95"
                  >
                    Submit ticket
                    <Send className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
