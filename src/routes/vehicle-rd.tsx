import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Car, Atom, Battery, Wind } from "lucide-react";
import FooterSection from "@/components/FooterSection";

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
      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 glass rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Concept · EV-X1
          </div>
          <h3 className="mt-1 text-2xl font-semibold">
            A new silhouette of motion
          </h3>

          <div className="relative mt-6 aspect-[16/9] rounded-xl border border-border bg-[radial-gradient(ellipse_at_center,oklch(0.26_0.04_55_/_0.4),oklch(0.14_0.02_250))] overflow-hidden">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* stylized scooter wireframe */}
              <svg viewBox="0 0 600 220" className="w-[80%]">
                <defs>
                  <linearGradient id="evx" x1="0" x2="1">
                    <stop offset="0" stopColor="oklch(0.74 0.19 55)" />
                    <stop offset="1" stopColor="oklch(0.78 0.18 152)" />
                  </linearGradient>
                </defs>
                <g
                  fill="none"
                  stroke="url(#evx)"
                  strokeWidth="1.5"
                  opacity="0.95"
                >
                  <circle cx="120" cy="160" r="42" />
                  <circle cx="480" cy="160" r="42" />
                  <path d="M120 160 L 250 90 L 360 90 L 360 60 L 410 60 L 480 160" />
                  <path d="M250 90 L 230 160 L 380 160 L 360 90" />
                  <path d="M210 80 L 270 60" />
                </g>
                <g stroke="oklch(1 0 0 / 0.15)" strokeDasharray="3 4">
                  <circle cx="120" cy="160" r="60" fill="none" />
                  <circle cx="480" cy="160" r="60" fill="none" />
                </g>
              </svg>
            </motion.div>
            <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              ▲ Drag-coefficient: 0.28 · range: 180 km
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid gap-4">
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass rounded-2xl p-5"
            >
              <c.I className="h-5 w-5 text-[var(--ev-orange)]" />
              <div className="mt-2 text-lg font-semibold">{c.t}</div>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
