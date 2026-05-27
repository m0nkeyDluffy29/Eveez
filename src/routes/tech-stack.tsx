import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Cpu, Activity, Cloud, Code2 } from "lucide-react";

export const Route = createFileRoute("/tech-stack")({
  head: () => ({
    meta: [
      { title: "Tech Stack — EVeez" },
      { name: "description", content: "Cloud, IoT, and edge — the platform orchestrating the EVeez mobility ecosystem." },
    ],
  }),
  component: TechPage,
});

function TechPage() {
  const bars = [42, 68, 55, 80, 47, 73, 61, 88, 52, 70, 64, 92];
  return (
    <SectionShell vertical="tech-stack">
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Fleet Telemetry</div>
              <h3 className="mt-1 text-2xl font-semibold">Live ops dashboard</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ev-green)] animate-pulse" /> streaming
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { l: "Active vehicles", v: "12,480" },
              { l: "Edge nodes",      v: "212" },
              { l: "API calls / s",   v: "4.7k" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-white/5 p-4">
                <div className="text-2xl font-semibold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-44 rounded-xl border border-border bg-black/20 p-4 flex items-end gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t-md"
                style={{
                  background: `linear-gradient(180deg, oklch(0.78 0.18 152), oklch(0.74 0.19 55))`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <Cpu className="h-6 w-6 text-[var(--ev-green)]" />
          <h3 className="mt-3 text-2xl font-semibold">Built on edge.</h3>
          <p className="mt-2 text-sm text-muted-foreground">A cloud-native platform with first-class IoT primitives. Ship features as fast as we ship vehicles.</p>
          <div className="mt-5 space-y-3 text-sm">
            {[
              { I: Cloud,    t: "Multi-region cloud" },
              { I: Activity, t: "Realtime telematics" },
              { I: Code2,    t: "Open APIs & SDKs" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-3 rounded-lg border border-border bg-white/5 px-3 py-2">
                <x.I className="h-4 w-4 text-[var(--ev-green)]" /> {x.t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
