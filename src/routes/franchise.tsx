import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Store, MapPin, TrendingUp, Users } from "lucide-react";
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
          className="rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-4">
            Growth Map
          </div>
          <h3 className="text-2xl font-semibold mb-6">
            Where EVeez is plugging in
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={franchiseImage}
              alt="EVeez Franchise"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-20">
        <FooterSection />
      </div>
    </SectionShell>
  );
}
