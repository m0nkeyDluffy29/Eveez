import { ReactNode } from "react";
import Navbar from "./Navbar";

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
    accent: "#E8461F",
  },
  "fast-charging": {
    navLabel: "Fast Charging",
    pageTitle: "Fast Charging",
    tag: "Pillar 02",
    tagline: "Coast-to-coast electrons, delivered in minutes.",
    color: "green",
    accent: "#E8461F",
  },
  service: {
    navLabel: "Service",
    pageTitle: "Service",
    tag: "Pillar 03",
    tagline: "An always-on care ecosystem for every rider.",
    color: "orange",
    accent: "#E8461F",
  },
  "tech-stack": {
    navLabel: "Tech Stack",
    pageTitle: "Tech Stack",
    tag: "Pillar 04",
    tagline: "Cloud, IoT, and edge — orchestrating mobility.",
    color: "mixed",
    accent: "#E8461F",
  },
  "vehicle-rd": {
    navLabel: "Vehicle R&D",
    pageTitle: "Vehicle R&D",
    tag: "Pillar 05",
    tagline: "Designing the EVs of the next decade.",
    color: "orange",
    accent: "#E8461F",
  },
  training: {
    navLabel: "Training Programmes",
    pageTitle: "Training Programmes",
    tag: "Pillar 06",
    tagline: "Empowering the workforce that powers EVeez.",
    color: "green",
    accent: "#E8461F",
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

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />

      {/* ── Main ── */}
      <main className="relative mx-auto max-w-[106rem] px-6">
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

            <h1 className="mt-5 text-5xl md:text-7xl font-semibold leading-[1.05] font-display">
              <span className="text-gradient-ev">{v.pageTitle}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-muted-foreground font-display">
              {v.tagline}
            </p>
          </div>
        )}

        <div className={hideHero ? "mt-12" : ""}>{children}</div>
      </main>
    </div>
  );
}
