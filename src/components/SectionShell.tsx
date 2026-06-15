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
    tagline: "Start Your EVpreneur Journey Today",
    color: "orange",
    accent: "#ff5a2a",
  },
  "fast-charging": {
    title: "Fast Charging",
    tagline: "Coast-to-coast electrons, delivered in minutes.",
    color: "green",
    accent: "oklch(0.70 0.2368 137.65)",
  },
  service: {
    title: "Service",
    tagline: "An always-on care ecosystem for every rider.",
    color: "orange",
    accent: "#ff5a2a",
  },
  "tech-stack": {
    title: "Tech Stack",
    tagline: "Cloud, IoT, and edge — orchestrating mobility.",
    color: "mixed",
    accent: "oklch(0.72 0.18 205)",
  },
  "vehicle-rd": {
    title: "Vehicle R&D",
    tagline: "Designing the EVs of the next decade.",
    color: "orange",
    accent: "#ff5a2a",
  },
  training: {
    title: "Training Programmes",
    tagline: "Empowering the workforce that powers EVeez.",
    color: "green",
    accent: "oklch(0.70 0.22 345)",
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
    <div className="relative min-h-screen bg-black text-white">
      <header className="relative z-30 border-b-2 border-orange bg-black">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="../../assets/icons/eveez-logo.png"
              alt="EVeez"
              className="h-8 w-auto object-contain"
              loading="lazy"
            />
          </Link>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            {(Object.keys(VERTICALS) as VerticalKey[]).map((k) => (
              <Link
                key={k}
                to={`/${k}` as never}
                className="text-sm text-white/80 hover:text-white transition"
              >
                {VERTICALS[k].title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <button
              onClick={() => router.history.back()}
              className="text-sm text-white/80 hover:text-white transition"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs uppercase tracking-[0.2em]"
            style={{ color: v.accent }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: v.accent }}
            />
            {v.title}
          </div>
          <h1 className="mt-5 text-5xl md:text-7xl font-semibold leading-[1.05]">
            <span className="text-gradient-ev">{v.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {v.tagline}
          </p>
        </div>
        {children}
      </main>
    </div>
  );
}
