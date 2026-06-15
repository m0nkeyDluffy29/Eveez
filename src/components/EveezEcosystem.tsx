import { Store, Zap, Wrench, Cpu, Car, GraduationCap } from "lucide-react";

const cards = [
  {
    title: "Franchise",
    description:
      "Scalable business models for local entrepreneurs to lead the EV revolution.",
    icon: Store,
  },
  {
    title: "Fast Charging",
    description:
      "High-speed infrastructure ensuring maximum fleet uptime and productivity.",
    icon: Zap,
  },
  {
    title: "Service",
    description:
      "Nationwide maintenance support keeping vehicles operational 24/7.",
    icon: Wrench,
  },
  {
    title: "Tech Stack",
    description:
      "Proprietary SaaS platform for real-time fleet monitoring and management.",
    icon: Cpu,
  },
  {
    title: "Vehicle R&D",
    description:
      "Rugged, smart electric scooters designed specifically for commercial use.",
    icon: Car,
  },
  {
    title: "Training Programmes",
    description:
      "Comprehensive skill development for riders, technicians, and operators.",
    icon: GraduationCap,
  },
];

export default function EveezEcosystem() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--ev-orange)]">
          THE EVEEZ ECOSYSTEM
        </div>
        <p className="mt-3 text-base text-muted-foreground">
          Six interconnected pillars working in harmony to power the future of
          mobility.
        </p>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-3xl border border-border bg-surface/60 p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.7)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.06)] text-[var(--ev-orange)]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
