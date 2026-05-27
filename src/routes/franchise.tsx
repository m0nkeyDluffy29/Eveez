import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Store, MapPin, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/franchise")({
  head: () => ({
    meta: [
      { title: "Franchise — EVeez" },
      { name: "description", content: "Own a node of EVeez. Growth maps, business metrics, and a partner ecosystem built to scale." },
    ],
  }),
  component: FranchisePage,
});

function FranchisePage() {
  const cities = [
    { name: "Bengaluru", x: 28, y: 70, hot: true },
    { name: "Mumbai",    x: 18, y: 52, hot: true },
    { name: "Delhi NCR", x: 35, y: 28, hot: true },
    { name: "Pune",      x: 24, y: 58 },
    { name: "Chennai",   x: 38, y: 78 },
    { name: "Hyderabad", x: 35, y: 64 },
    { name: "Ahmedabad", x: 22, y: 40 },
    { name: "Kolkata",   x: 58, y: 40 },
  ];
  const stats = [
    { label: "Partner Hubs", value: "120+", Icon: Store },
    { label: "Cities Live",  value: "32",   Icon: MapPin },
    { label: "Avg ROI / yr", value: "38%",  Icon: TrendingUp },
    { label: "Riders served",value: "1.2M", Icon: Users },
  ];

  return (
    <SectionShell vertical="franchise">
      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="lg:col-span-3 glass rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Growth Map</div>
          <h3 className="mt-1 text-2xl font-semibold">Where EVeez is plugging in</h3>
          <div className="relative mt-6 aspect-[16/10] w-full rounded-xl border border-border bg-[radial-gradient(ellipse_at_center,oklch(0.22_0.03_255),oklch(0.14_0.02_250))] overflow-hidden">
            {/* faux contour grid */}
            <div className="absolute inset-0 grid-lines opacity-50" />
            {cities.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 200 }}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <span
                    className={`block h-3 w-3 rounded-full ${c.hot ? "bg-[var(--ev-orange)]" : "bg-[var(--ev-green)]"}`}
                  />
                  {c.hot && (
                    <span className="absolute inset-0 rounded-full bg-[var(--ev-orange)] pulse-ring" />
                  )}
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                    {c.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="glass rounded-2xl p-5"
            >
              <s.Icon className="h-5 w-5 text-[var(--ev-orange)]" />
              <div className="mt-3 text-3xl font-semibold">{s.value}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
          <div className="col-span-2 glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Become a Partner</div>
            <p className="mt-2 text-sm text-muted-foreground">Join the EVeez network and operate a hub powered by our tech, training, and supply chain.</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ev-orange)] px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition">
              Apply now →
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
