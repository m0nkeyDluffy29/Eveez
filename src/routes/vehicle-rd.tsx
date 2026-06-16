import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Car, Atom, Battery, Wind } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import vehicleImage from "../../assets/images/EVeez-Concept.png";

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
  return (
    <SectionShell vertical="vehicle-rd">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: feature list */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {[
            {
              I: Atom,
              t: "Modular chassis",
              d: "One platform, three form-factors. Shared electronics, swappable shells.",
            },
            {
              I: Battery,
              t: "Cell-to-pack",
              d: "Higher density, lower weight. 2,000 cycles to 80%.",
            },
            {
              I: Wind,
              t: "Aero-first design",
              d: "CFD-tuned bodywork shaving every watt-hour.",
            },
            {
              I: Car,
              t: "Software-defined",
              d: "OTA updates that improve range and ride after delivery.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-white/5 px-5 py-4"
            >
              <c.I className="h-5 w-5 mt-0.5 shrink-0 text-[var(--ev-orange)]" />
              <div>
                <div className="text-sm font-semibold text-white">{c.t}</div>
                <p className="text-xs text-muted-foreground mt-0.5">{c.d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: concept card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-2xl p-5 flex flex-col gap-4"
        >
          {/* Card header */}
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
              Concept · EV-X1
            </div>
            <h3 className="text-lg font-semibold">
              A new silhouette of motion
            </h3>
          </div>

          {/* Vehicle image */}
          <div className="rounded-xl overflow-hidden">
            <img
              src={vehicleImage}
              alt="EVeez Concept EV-X1"
              className="w-full object-cover rounded-xl"
            />
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground px-1">
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
