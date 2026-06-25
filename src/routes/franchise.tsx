import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell, VERTICALS } from "@/components/SectionShell";
import { MapPin, TrendingUp, Users } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import franchiseImage from "../../assets/images/Franchise Growth Map.png";

export const Route = createFileRoute("/franchise")({
  head: () => ({
    meta: [
      { title: "Franchise — EVeez" },
      {
        name: "description",
        content:
          "Own a node of EVeez. Growth maps, business metrics, and a partner ecosystem built to scale.",
      },
    ],
  }),
  component: FranchisePage,
});

function FranchisePage() {
  const v = VERTICALS["franchise"];

  const stats = [
    { label: "Partner Hubs", value: "120+", accent: "#ffb5a0" },
    { label: "Cities Live", value: "32", accent: "#7DFFA2" },
    { label: "Avg ROI / yr", value: "38%", accent: "#47D6FF" },
    {
      label: "Riders Served",
      value: "1.2M",
      accent: "rgba(255, 255, 255, 0.2)",
    },
  ];

  return (
    <SectionShell vertical="franchise" hideHero>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left side: tag, title, tagline, stats, button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Pill tag */}
          <div
            className="inline-flex items-center gap-2 w-fit px-3 py-1 text-md uppercase tracking-[0.2em]"
            style={{ color: v.accent }}
          >
            {v.tag}
          </div>

          {/* Page title */}
          <h1 className="text-4xl md:text-5xl font-semibold mt-4 mb-3 text-white">
            {v.pageTitle}
          </h1>

          {/* Tagline */}
          <p className="text-[20px] text-[#E4BEB4] mb-8">{v.tagline}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 border-l-4"
                style={{ borderColor: s.accent }}
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#E4BEB4] mb-2">
                  {s.label}
                </div>
                <div className="text-2xl font-semibold text-white">
                  {s.value}
                </div>
              </motion.div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 rounded-[8px] bg-[#E8461f] px-[32px] py-[12px] text-[16px] font-bold text-black hover:bg-orange-600 transition">
            Apply now →
          </button>
        </motion.div>

        {/* Right side: growth map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl border border-neutral-800 p-6 relative overflow-hidden"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[#E4BEB4] mb-4">
            Growth Map
          </div>
          <h3 className="text-[18px] font-semibold mb-6">
            Where EVeez is plugging in
          </h3>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={franchiseImage}
              alt="EVeez Franchise"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
