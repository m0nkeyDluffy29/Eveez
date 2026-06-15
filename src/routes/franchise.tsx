import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Store, MapPin, TrendingUp, Users } from "lucide-react";
import FooterSection from "@/components/FooterSection";

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
  const cities = [
    { name: "Bengaluru", x: 28, y: 70, hot: true },
    { name: "Mumbai", x: 18, y: 52, hot: true },
    { name: "Delhi NCR", x: 35, y: 28, hot: true },
    { name: "Pune", x: 24, y: 58 },
    { name: "Chennai", x: 38, y: 78 },
    { name: "Hyderabad", x: 35, y: 64 },
    { name: "Ahmedabad", x: 22, y: 40 },
    { name: "Kolkata", x: 58, y: 40 },
  ];
  const stats = [
    { label: "Partner Hubs", value: "120+" },
    { label: "Cities Live", value: "32", Icon: MapPin },
    { label: "Avg ROI / yr", value: "38%", Icon: TrendingUp },
    { label: "Riders served", value: "1.2M", Icon: Users },
  ];

  return (
    <SectionShell vertical="franchise">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left side: heading, tagline, stats, button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* <div className="text-xs uppercase tracking-[0.25em] text-orange-500 mb-2">
            Pillar 01
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4">Franchise</h1>
          <p className="text-lg text-neutral-400 mb-8">
            Start Your EVpreneur Journey Today
          </p> */}

          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
              >
                <div className="text-3xl font-semibold text-white">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 mt-3">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black hover:bg-orange-600 transition">
            Apply now →
          </button>
        </motion.div>

        {/* Right side: growth map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-4">
            Growth Map
          </div>
          <h3 className="text-2xl font-semibold mb-6">
            Where EVeez is plugging in
          </h3>
          <div className="relative aspect-[16/10] w-full rounded-xl border border-neutral-700 bg-[radial-gradient(ellipse_at_center,oklch(0.22_0.03_255),oklch(0.14_0.02_250))] overflow-hidden">
            {/* faux contour grid */}
            <div className="absolute inset-0 grid-lines opacity-50" />
            {cities.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  type: "spring",
                  stiffness: 200,
                }}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <span
                    className={`block h-3 w-3 rounded-full ${c.hot ? "bg-orange-500" : "bg-green-500"}`}
                  />
                  {c.hot && (
                    <span className="absolute inset-0 rounded-full bg-orange-500 pulse-ring" />
                  )}
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-neutral-400 whitespace-nowrap">
                    {c.name}
                  </span>
                </div>
              </motion.div>
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
