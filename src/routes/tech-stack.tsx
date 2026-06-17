import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell, VERTICALS } from "@/components/SectionShell";
import { Cpu, Activity, Cloud, Code2 } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import techImage from "../../assets/images/Fleet-Management-Dashboard.png";

export const Route = createFileRoute("/tech-stack")({
  head: () => ({
    meta: [
      { title: "Tech Stack — EVeez" },
      {
        name: "description",
        content:
          "Cloud, IoT, and edge — the platform orchestrating the EVeez mobility ecosystem.",
      },
    ],
  }),
  component: TechPage,
});

function TechPage() {
  const v = VERTICALS["tech-stack"];

  return (
    <SectionShell vertical="tech-stack" hideHero>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: image + stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-6 flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Fleet Telemetry
              </div>
              <h3 className="mt-1 text-xl font-semibold">Live ops dashboard</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ev-green)] animate-pulse" />
              streaming
            </span>
          </div>

          {/* Dashboard image */}
          <div className="rounded-xl overflow-hidden">
            <img
              src={techImage}
              alt="EVeez Live Ops Dashboard"
              className="w-full object-cover rounded-xl"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { l: "Active Vehicles", v: "12,480" },
              { l: "Edge Nodes", v: "212" },
              { l: "API Calls / S", v: "4.7k" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-semibold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: tag + title + Built on edge card */}
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
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug text-white">
            {v.pageTitle} – <span className="text-white">{v.tagline}</span>
          </h1>

          {/* Built on edge card */}
          <div className="glass rounded-2xl p-6 border border-[var(--ev-blue)]">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[var(--ev-blue)]" />
              <span className="font-semibold text-base">Built on edge.</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              A cloud-native platform with first-class IoT primitives. Ship
              features as fast as we ship vehicles.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              {[
                { I: Cloud, t: "Multi-region cloud" },
                { I: Activity, t: "Realtime telematics" },
                { I: Code2, t: "Open APIs & SDKs" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="flex items-center gap-3 rounded-lg border border-border bg-white/5 px-3 py-2"
                >
                  <x.I className="h-4 w-4 text-[var(--ev-blue)]" /> {x.t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
