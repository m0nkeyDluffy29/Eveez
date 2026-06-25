import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell, VERTICALS } from "@/components/SectionShell";
import { Car, Atom, Battery, Wind } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import vehicleImage from "../../assets/images/EVeez-Concept.png";
import FigmaModular from "../../assets/logo/figma-modular";
import FigmaCell from "../../assets/logo/figma-cell";
import FigmaAero from "../../assets/logo/figma-aero";
import FigmaTerminal from "../../assets/logo/figma-terminal";
export const Route = createFileRoute("/vehicle-rd")({
  head: () => ({
    meta: [
      { title: "Vehicle R&D — EVeez" },
      {
        name: "description",
        content:
          "Designing the EVs of the next decade. Aerodynamics, batteries, and software co-engineered.",
      },
    ],
  }),
  component: RDPage,
});

function RDPage() {
  const v = VERTICALS["vehicle-rd"];

  return (
    <SectionShell vertical="vehicle-rd" hideHero>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: tag + title + feature list */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {/* Pill tag */}
          <div
            className="inline-flex items-center gap-2 w-fit px-3 py-1 text-[16px] uppercase tracking-[0.2em]"
            style={{ color: v.accent }}
          >
            {v.tag}
          </div>

          {/* Page title */}
          <h1
            className="text-3xl md:text-[40px] font-normal leading-snug text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {v.pageTitle} – <span className="text-white">{v.tagline}</span>
          </h1>

          {/* Feature list */}
          {[
            {
              I: FigmaModular,
              t: "Modular chassis",
              d: "One platform, three form-factors. Shared electronics, swappable shells.",
            },
            {
              I: FigmaCell,
              t: "Cell-to-pack",
              d: "Higher density, lower weight. 2,000 cycles to 80%.",
            },
            {
              I: FigmaAero,
              t: "Aero-first design",
              d: "CFD-tuned bodywork shaving every watt-hour.",
            },
            {
              I: FigmaTerminal,
              t: "Software-defined",
              d: "OTA updates that improve range and ride after delivery.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="flex items-start gap-4 rounded-[16px] border border-border bg-white/5 px-5 py-4"
            >
              <c.I className="h-5 w-5 mt-0.5 shrink-0 text-[var(--ev-orange)]" />
              <div>
                <div className="text-sm font-bold text-white">{c.t}</div>
                <p className="text-xs text-[#E4BEB4] mt-0.5">{c.d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: concept card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-[48px] p-5 flex flex-col gap-4"
        >
          {/* Card header */}
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#E4BEB4] mb-1">
              Concept · EV-X1
            </div>
            <h3 className="text-[24px] font-bold">
              A new silhouette of motion
            </h3>
          </div>

          {/* Vehicle image */}
          <div className="rounded-[20px] overflow-hidden">
            <img
              src={vehicleImage}
              alt="EVeez Concept EV-X1"
              className="w-full object-cover rounded-xl"
            />
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#E4BEB4] px-1">
            <span>▲ Drag Coefficient: 0.28</span>
            <span>Range: 180 km</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
