import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell, VERTICALS } from "@/components/SectionShell";
import { Wrench } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import serviceImage from "../../assets/images/Service-Ecosystem.png";
import FigmaSetting from "../../assets/logo/figma-setting";
export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Service — EVeez" },
      {
        name: "description",
        content:
          "An always-on care ecosystem for every EVeez rider — diagnostics, doorstep service, and assurance.",
      },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  const v = VERTICALS["service"];

  const steps = [
    { t: "Detect", d: "On-vehicle telematics flag anomalies in real time." },
    { t: "Dispatch", d: "Nearest service node receives a smart work-order." },
    { t: "Doorstep", d: "Trained technician arrives with the right parts." },
    { t: "Done", d: "Verified fix, OTA validation, rider notified." },
  ];

  const stats = [
    { v: "< 2 hrs", l: "Avg Response", color: "#FFB5A0" }, // orange
    { v: "98.6%", l: "First-Fix rate", color: "#7DFFA2" }, // green
    { v: "24×7", l: "Care Channel", color: "#47D6FF" }, // blue
  ];

  return (
    <SectionShell vertical="service" hideHero>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: tag + title + stats + care loop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          {/* Pill tag */}
          <div
            className="inline-flex items-center gap-2 w-fit px-3 py-1 text-md uppercase tracking-[0.2em]"
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

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.6 }}
                className="rounded-xl p-4 text-center bg-white/5"
                style={{ border: `1px solid ${s.color}` }}
              >
                <div className="text-[20px] font-bold text-white">{s.v}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#E4BEB4] mt-1">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Care Loop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <FigmaSetting className="h-5 w-5 text-[var(--ev-orange)]" />
              <h3 className="text-base font-bold">The EVeez Care Loop</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {steps.map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl border border-border bg-white/5 p-4"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ev-orange)] text-background text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="mt-3 text-sm font-bold">{s.t}</div>
                  <p className="mt-1 text-xs text-[#E4BEB4]">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: service image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl overflow-hidden h-full"
        >
          <img
            src={serviceImage}
            alt="EVeez Service"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>
      </div>

      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
