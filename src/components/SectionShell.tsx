import { Link, useRouter } from "@tanstack/react-router";
import { ReactNode } from "react";

export type VerticalKey =
  | "franchise"
  | "fast-charging"
  | "service"
  | "tech-stack"
  | "vehicle-rd"
  | "training";

export const VERTICALS: Record<
  VerticalKey,
  {
    title: string;
    tagline: string;
    color: "orange" | "green" | "mixed";
    accent: string; // css color
  }
> = {
  franchise: {
    title: "Franchise",
    tagline: "Scale the network. Own a node of the future.",
    color: "orange",
    accent: "oklch(0.74 0.19 55)",
  },
  "fast-charging": {
    title: "Fast Charging",
    tagline: "Coast-to-coast electrons, delivered in minutes.",
    color: "green",
    accent: "oklch(0.78 0.18 152)",
  },
  service: {
    title: "Service",
    tagline: "An always-on care ecosystem for every rider.",
    color: "orange",
    accent: "oklch(0.74 0.19 55)",
  },
  "tech-stack": {
    title: "Tech Stack",
    tagline: "Cloud, IoT, and edge — orchestrating mobility.",
    color: "mixed",
    accent: "oklch(0.78 0.18 152)",
  },
  "vehicle-rd": {
    title: "Vehicle R&D",
    tagline: "Designing the EVs of the next decade.",
    color: "orange",
    accent: "oklch(0.74 0.19 55)",
  },
  training: {
    title: "Training Programmes",
    tagline: "Empowering the workforce that powers EVeez.",
    color: "green",
    accent: "oklch(0.78 0.18 152)",
  },
};

export function SectionShell({
  vertical,
  children,
}: {
  vertical: VerticalKey;
  children: ReactNode;
}) {
  const v = VERTICALS[vertical];
  const router = useRouter();
  return (
    <div className="relative min-h-screen bg-cinematic">
      <div className="grid-lines absolute inset-0 pointer-events-none" />
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--ev-orange)] to-[var(--ev-green)] text-background font-bold">
              E
            </span>
            <span className="font-display text-lg tracking-tight">EVeez</span>
          </Link>
          <nav className="hidden md:flex gap-1 text-sm">
            {(Object.keys(VERTICALS) as VerticalKey[]).map((k) => (
              <Link
                key={k}
                to={`/${k}` as never}
                className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
                activeProps={{ className: "px-3 py-1.5 rounded-md text-foreground bg-white/10" }}
              >
                {VERTICALS[k].title}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => router.history.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs uppercase tracking-[0.2em]"
            style={{ color: v.accent }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.accent }} />
            {v.title}
          </div>
          <h1 className="mt-5 text-5xl md:text-7xl font-semibold leading-[1.05]">
            <span className="text-gradient-ev">{v.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{v.tagline}</p>
        </div>
        {children}
      </main>

      <footer className="relative border-t border-border py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} EVeez — One ecosystem. Many verticals.
      </footer>
    </div>
  );
}
