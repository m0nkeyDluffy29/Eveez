import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell, VERTICALS } from "@/components/SectionShell";
import { GraduationCap, Users, Award } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import FigmaTechnician from "../../assets/logo/figma-technician";
import FigmaOperator from "../../assets/logo/figma-operator";
import FigmaCertificate from "../../assets/logo/figma-certificate";

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
  const v = VERTICALS["training"];

  const tracks = [
    {
      I: FigmaTechnician,
      t: "EV Technician",
      w: "12 Weeks",
      d: "Battery, motor, controller diagnostics.",
      borderColor: "#FFB5A0",
      iconColor: "#FFB5A0",
      enrollColor: "#FFB5A0",
    },
    {
      I: FigmaOperator,
      t: "Fleet Operator",
      w: "6 Weeks",
      d: "Operations, telematics, depot management.",
      borderColor: "#7DFFA2",
      iconColor: "#7DFFA2",
      enrollColor: "#7DFFA2",
    },
    {
      I: FigmaCertificate,
      t: "Trainer Certification",
      w: "4 Weeks",
      d: "Train the trainers — accredited curriculum.",
      borderColor: "#47D6FF",
      iconColor: "#47D6FF",
      enrollColor: "#47D6FF",
    },
  ];

  const stats = [
    { v: "8,400+", l: "Certified to date" },
    { v: "92%", l: "Placement rate" },
    { v: "48", l: "Partner ITIs" },
    { v: "11", l: "Languages" },
  ];

  return (
    <SectionShell vertical="training" hideHero>
      {/* Tag + Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 mb-10"
      >
        {/* Pill tag */}
        <div
          className="inline-flex items-center gap-2 w-fit px-3 py-1 text-[16px] uppercase tracking-[0.2em]"
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
      </motion.div>

      {/* Course cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {tracks.map((t, i) => (
          <motion.div
            key={t.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="glass rounded-2xl p-6 flex flex-col gap-3"
            style={{ border: `1px solid ${t.borderColor}` }}
          >
            <t.I className="h-6 w-6" style={{ color: t.iconColor }} />
            <div>
              <div className="text-[18px] font-bold text-white">{t.t}</div>
              <div className="text-[12px] uppercase tracking-[0.2em] text-[#E4BEB4] mt-2">
                {t.w}
              </div>
            </div>
            <p className="text-sm text-[#E4BEB4]">{t.d}</p>
            <span
              className="text-[12px] mt-auto font-bold"
              style={{ color: t.enrollColor }}
            >
              Enroll →
            </span>
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
            className="py-[20px] px-[20px] bg-neutral-900 rounded-[16px] text-center"
          >
            <div className="text-[30px] font-bold text-white">{s.v}</div>
            <div className="text-[10px] uppercase tracking-widest text-[#E4BEB4] mt-2">
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
