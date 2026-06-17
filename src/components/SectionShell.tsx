import { Link, useRouter } from "@tanstack/react-router";
import { ReactNode } from "react";

export type VerticalKey =
  | "franchise"
  | "fast-charging"
  | "service"
  | "tech-stack"
  | "vehicle-rd"
  | "training";

type VerticalConfig = {
  navLabel: string;
  pageTitle: string;
  tag: string;
  tagline: string;
  color: "orange" | "green" | "mixed";
  accent: string;
};

export const VERTICALS: Record<VerticalKey, VerticalConfig> = {
  franchise: {
    navLabel: "Franchise",
    pageTitle: "Franchise",
    tag: "Pillar 01",
    tagline: "Start Your EVpreneur Journey Today",
    color: "orange",
    accent: "#ff5a2a",
  },
  "fast-charging": {
    navLabel: "Fast Charging",
    pageTitle: "Fast Charging",
    tag: "Pillar 02",
    tagline: "Coast-to-coast electrons, delivered in minutes.",
    color: "green",
    accent: "#ff5a2a",
  },
  service: {
    navLabel: "Service",
    pageTitle: "Service",
    tag: "Pillar 03",
    tagline: "An always-on care ecosystem for every rider.",
    color: "orange",
    accent: "#ff5a2a",
  },
  "tech-stack": {
    navLabel: "Tech Stack",
    pageTitle: "Tech Stack",
    tag: "Pillar 04",
    tagline: "Cloud, IoT, and edge — orchestrating mobility.",
    color: "mixed",
    accent: "#ff5a2a",
  },
  "vehicle-rd": {
    navLabel: "Vehicle R&D",
    pageTitle: "Vehicle R&D",
    tag: "Pillar 05",
    tagline: "Designing the EVs of the next decade.",
    color: "orange",
    accent: "#ff5a2a",
  },
  training: {
    navLabel: "Training Programmes",
    pageTitle: "Training Programmes",
    tag: "Pillar 06",
    tagline: "Empowering the workforce that powers EVeez.",
    color: "green",
    accent: "#ff5a2a",
  },
};

export function SectionShell({
  vertical,
  children,
  hideHero = false,
}: {
  vertical: VerticalKey;
  children: ReactNode;
  hideHero?: boolean;
}) {
  const v = VERTICALS[vertical];
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* ── Navbar ── */}
      <header className="relative z-30 border-b-2 border-orange bg-black">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="../../assets/icons/eveez-logo.png"
              alt="EVeez"
              className="h-15 w-auto object-contain"
              loading="lazy"
            />
          </Link>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            {(Object.keys(VERTICALS) as VerticalKey[]).map((k) => (
              <Link
                key={k}
                to={`/${k}` as never}
                className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
              >
                {VERTICALS[k].navLabel}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <button
              onClick={() => router.history.back()}
              className="ml-4 inline-flex items-center rounded-full bg-[#FF6A1A] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative mx-auto max-w-7xl px-6">
        {!hideHero && (
          <div className="mb-12 mt-12">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs uppercase tracking-[0.2em]"
              style={{ color: v.accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: v.accent }}
              />
              {v.tag}
            </div>

            <h1
              className="mt-5 text-5xl md:text-7xl font-semibold leading-[1.05]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <span className="text-gradient-ev">{v.pageTitle}</span>
            </h1>

            <p
              className="mt-4 max-w-2xl text-lg text-muted-foreground "
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              {v.tagline}
            </p>
          </div>
        )}

        <div className={hideHero ? "mt-12" : ""}>{children}</div>
      </main>
    </div>
  );
}
