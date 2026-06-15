import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Zap, BatteryCharging, Gauge, Plug } from "lucide-react";
import FooterSection from "@/components/FooterSection";
export const Route = createFileRoute("/fast-charging")({
  head: () => ({
    meta: [
      { title: "Fast Charging — EVeez" },
      {
        name: "description",
        content:
          "Coast-to-coast electrons. The EVeez fast-charging network engineered for the next million riders.",
      },
    ],
  }),
  component: ChargingPage,
});

function ChargingPage() {
  return (
    <SectionShell vertical="fast-charging">
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 glass rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Live Network
          </div>
          <h3 className="mt-1 text-2xl font-semibold">Charging in motion</h3>

          <div className="mt-6 relative h-72 rounded-xl border border-border bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.04_152_/0.3),oklch(0.14_0.02_250))] overflow-hidden">
            <svg
              viewBox="0 0 800 300"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="line" x1="0" x2="1">
                  <stop
                    offset="0"
                    stopColor="oklch(0.78 0.18 152)"
                    stopOpacity="0"
                  />
                  <stop offset="0.5" stopColor="oklch(0.78 0.18 152)" />
                  <stop
                    offset="1"
                    stopColor="oklch(0.74 0.19 55)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              {[60, 110, 160, 210].map((y, i) => (
                <motion.path
                  key={i}
                  d={`M0 ${y} C 200 ${y - 40}, 400 ${y + 40}, 800 ${y - 20}`}
                  stroke="url(#line)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="oklch(0.95 0.05 90)"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [0, 800],
                    cy: [80 + ((i * 17) % 160), 80 + ((i * 23) % 160) + 10],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4 + (i % 3),
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </svg>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { l: "Avg charge time", v: "18 min", I: Gauge },
              { l: "Stations live", v: "480", I: Plug },
              { l: "kWh delivered", v: "9.4M", I: BatteryCharging },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-border bg-white/5 p-4"
              >
                <s.I className="h-4 w-4 text-[var(--ev-green)]" />
                <div className="mt-2 text-xl font-semibold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <Zap className="h-6 w-6 text-[var(--ev-green)]" />
          <h3 className="mt-3 text-2xl font-semibold">DC fast. Universal.</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            CCS2 + Bharat DC-001, smart load balancing, and dynamic pricing —
            all behind one tap of the EVeez app.
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              "Up to 120kW DC",
              "Smart queue & reserve",
              "Renewable-backed",
              "Pay-per-second billing",
            ].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ev-green)]" />
                {x}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
