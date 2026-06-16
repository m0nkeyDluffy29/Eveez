import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Zap, Gauge, Plug, BatteryCharging } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import chargingImage from "../../assets/images/fast-charging-infrastructure.png";

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
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden"
        >
          <img
            src={chargingImage}
            alt="EVeez Fast Charging Station"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {/* DC fast card */}
          <div className="rounded-2xl p-6  border-border">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--ev-green)]" />
              <span className="font-semibold text-base">
                DC fast. Universal.
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
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
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { l: "Avg Charge Time", v: "18 min" },
              { l: "Stations Live", v: "480", I: Plug },
              { l: "kWh Delivered", v: "9.4M", I: BatteryCharging },
            ].map((s) => (
              <div key={s.l} className="rounded-xl  p-4">
                {/* <s.I className="h-4 w-4 text-[var(--ev-green)]" /> */}
                <div className="mt-2 text-xl font-semibold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
