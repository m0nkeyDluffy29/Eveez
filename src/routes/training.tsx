import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { GraduationCap, Users, Award } from "lucide-react";
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
      I: GraduationCap,
      t: "EV Technician",
      w: "12 Weeks",
      d: "Battery, motor, controller diagnostics.",
      borderColor: "border-[var(--ev-orange)]",
      iconColor: "text-[var(--ev-orange)]",
      enrollColor: "text-[var(--ev-orange)]",
    },
    {
      I: Users,
      t: "Fleet Operator",
      w: "6 Weeks",
      d: "Operations, telematics, depot management.",
      borderColor: "border-[var(--ev-green)]",
      iconColor: "text-[var(--ev-green)]",
      enrollColor: "text-[var(--ev-green)]",
    },
    {
      I: Award,
      t: "Trainer Certification",
      w: "4 Weeks",
      d: "Train the trainers — accredited curriculum.",
      borderColor: "border-cyan-400",
      iconColor: "text-cyan-400",
      enrollColor: "text-cyan-400",
    },
  ];

  const stats = [
    { v: "8,400+", l: "Certified to date" },
    { v: "92%", l: "Placement rate" },
    { v: "48", l: "Partner ITIs" },
    { v: "11", l: "Languages" },
  ];

  return (
    <SectionShell vertical="training">
      {/* Course cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {tracks.map((t, i) => (
          <motion.div
            key={t.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`glass rounded-2xl p-6 border ${t.borderColor} flex flex-col gap-3`}
          >
            <t.I className={`h-6 w-6 ${t.iconColor}`} />
            <div>
              <div className="text-base font-semibold text-white">{t.t}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                {t.w}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{t.d}</p>
            <span className={`text-sm mt-auto ${t.enrollColor}`}>Enroll →</span>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-3xl font-semibold text-white">{s.v}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
              {s.l}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
