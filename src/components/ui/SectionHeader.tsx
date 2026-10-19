import { Reveal } from "./Reveal";

export function SectionHeader({
  index,
  kicker,
  title,
  accent,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="rounded-full border border-line px-2 py-0.5 text-ink">{index}</span>
          {kicker}
        </p>
        <h2 className="font-display text-4xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}{" "}
          {accent && <span className="font-serif font-normal italic text-muted">{accent}</span>}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-base leading-relaxed text-muted md:col-span-4 md:justify-self-end">
          {description}
        </p>
      )}
    </Reveal>
  );
}
