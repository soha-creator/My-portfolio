import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line px-4 pt-16 pb-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-display text-[clamp(4rem,19vw,16rem)] leading-[0.8] font-bold tracking-[-0.06em] text-ink/90 select-none"
          aria-hidden="true"
        >
          {profile.name.toLowerCase()}
          <span className="text-lime">.</span>
        </p>
        <div className="mt-10 flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {profile.fullName} · {profile.role}
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-pass" /> All systems operational
          </p>
          <a href="#top" className="flex items-center gap-1.5 transition hover:text-ink">
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
