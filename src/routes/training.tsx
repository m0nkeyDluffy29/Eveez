import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { GraduationCap, BookOpen, Award, Users } from "lucide-react";
import FooterSection from "@/components/FooterSection";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training Programmes — EVeez" },
      {
        name: "description",
        content:
          "Empowering the workforce that powers EVeez. Certified EV technicians, fleet operators, and trainers.",
      },
    ],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  const tracks = [
    {
      I: BookOpen,
      t: "EV Technician",
      w: "12 weeks",
      d: "Battery, motor, controller diagnostics.",
    },
    {
      I: Users,
      t: "Fleet Operator",
      w: "6 weeks",
      d: "Operations, telematics, depot management.",
    },
    {
      I: Award,
      t: "Trainer Certification",
      w: "4 weeks",
      d: "Train the trainers — accredited curriculum.",
    },
  ];
  return (
    <SectionShell vertical="training">
      <div className="grid lg:grid-cols-3 gap-6">
        {tracks.map((t, i) => (
          <motion.div
            key={t.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="glass rounded-2xl p-6 group hover:-translate-y-1 transition"
          >
            <t.I className="h-6 w-6 text-[var(--ev-green)]" />
            <div className="mt-3 text-xl font-semibold">{t.t}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t.w}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t.d}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-[var(--ev-green)]">Enroll →</span>
              <span className="text-muted-foreground">Hybrid</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 glass rounded-2xl p-6 grid md:grid-cols-4 gap-6 items-center"
      >
        <div className="md:col-span-1">
          <GraduationCap className="h-8 w-8 text-[var(--ev-green)]" />
          <div className="mt-3 text-2xl font-semibold">8,400+</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Certified to date
          </div>
        </div>
        <div className="md:col-span-3 grid grid-cols-3 gap-4">
          {[
            { v: "92%", l: "Placement rate" },
            { v: "48", l: "Partner ITIs" },
            { v: "11", l: "Languages" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-xl border border-border bg-white/5 p-4"
            >
              <div className="text-2xl font-semibold">{s.v}</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
