import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Zap, Plug, BatteryCharging } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import chargingImage from "../../assets/images/fast-charging-infrastructure.png";
import { VERTICALS } from "@/components/SectionShell";

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
  const v = VERTICALS["fast-charging"];

  return (
    <SectionShell vertical="fast-charging" hideHero>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
        >
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] uppercase tracking-widest text-white/40">
              Live Network
            </p>
            <p className="text-sm font-medium text-white/80 mt-0.5">
              Charging in motion
            </p>
          </div>
          <img
            src={chargingImage}
            alt="EVeez Fast Charging Station"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: Tag + Title + Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {/* Pill tag */}
          <div
            className="inline-flex items-center gap-2 w-fit rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]"
            style={{ color: v.accent }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: v.accent }}
            />
            {v.tag}
          </div>

          {/* Page title */}
          <h1
            className="text-3xl md:text-4xl font-normal leading-snug text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {v.pageTitle} – <span className="text-white">{v.tagline}</span>
          </h1>

          {/* DC fast card */}
          <div className="rounded-2xl p-6 border ">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--ev-green)]" />
              <span className="font-semibold text-base">
                DC fast. Universal.
              </span>
            </div>
            <p className="mt-3 text-sm text-[var(--footer-text)]">
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
              { l: "Stations Live", v: "480" },
              { l: "kWh Delivered", v: "9.4M" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 p-4">
                <div className="text-xl font-semibold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
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
