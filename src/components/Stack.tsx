import { Award, Quote } from "lucide-react";
import { certifications, testimonials, tools } from "@/data/profile";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Four copies so one half always covers wide screens; the track scrolls by -50%.
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee overflow-hidden py-2">
      <ul
        className="marquee-track flex w-max gap-3"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="rounded-full border border-line bg-surface px-5 py-3 font-display text-lg font-medium whitespace-nowrap sm:text-xl"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  const half = Math.ceil(tools.length / 2);
  return (
    <section id="stack" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          index="05"
          kicker="Toolbox & credentials"
          title="Certified,"
          accent="and well-equipped."
          description="The tools I plan, track and test with — and the paperwork that says I know how."
        />
      </div>

      <div className="space-y-1">
        <Marquee items={tools.slice(0, half)} />
        <Marquee items={tools.slice(half)} reverse />
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <ul className="h-full divide-y divide-line rounded-3xl border border-line bg-surface">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-center gap-4 p-5 sm:p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-lime-ink">
                  <Award className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight font-semibold">{c.name}</p>
                  <p className="text-sm text-muted">{c.issuer}</p>
                </div>
                <span className="font-mono text-xs text-muted">{c.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <Quote className="mb-6 size-7 text-coral" />
                <blockquote className="font-serif text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted">{t.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
