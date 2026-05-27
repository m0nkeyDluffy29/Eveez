import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Wrench, ShieldCheck, Clock, Headphones } from "lucide-react";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Service — EVeez" },
      { name: "description", content: "An always-on care ecosystem for every EVeez rider — diagnostics, doorstep service, and assurance." },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  const steps = [
    { t: "Detect", d: "On-vehicle telematics flag anomalies in real time." },
    { t: "Dispatch", d: "Nearest service node receives a smart work-order." },
    { t: "Doorstep", d: "Trained technician arrives with the right parts." },
    { t: "Done", d: "Verified fix, OTA validation, rider notified." },
  ];

  return (
    <SectionShell vertical="service">
      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { I: Clock, v: "<2 hrs", l: "Avg response" },
          { I: ShieldCheck, v: "98.6%", l: "First-fix rate" },
          { I: Headphones, v: "24×7", l: "Care channel" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <s.I className="h-5 w-5 text-[var(--ev-orange)]" />
            <div className="mt-3 text-3xl font-semibold">{s.v}</div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-3">
          <Wrench className="h-5 w-5 text-[var(--ev-orange)]" />
          <h3 className="text-2xl font-semibold">The EVeez Care Loop</h3>
        </div>

        <div className="mt-8 grid md:grid-cols-4 gap-4 relative">
          <div className="absolute hidden md:block left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-[var(--ev-orange)] to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
              className="relative rounded-xl border border-border bg-white/5 p-5"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ev-orange)] text-background text-xs font-bold">
                {i + 1}
              </span>
              <div className="mt-3 text-lg font-semibold">{s.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
