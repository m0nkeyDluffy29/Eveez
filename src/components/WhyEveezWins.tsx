import {
  CreditCard,
  Activity,
  CircleDollarSign,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const cards = [
  {
    title: "Predictable Operating Costs",
    description:
      "Consistent economics enabled through an integrated ecosystem approach that minimizes variance.",
    icon: CreditCard,
  },
  {
    title: "Higher Vehicle Uptime",
    description:
      "Vehicles remain operational through proactive maintenance and tech-enabled service support.",
    icon: Activity,
  },
  {
    title: "Faster Fleet Expansion",
    description:
      "Scalable infrastructure and operational processes enable rapid deployment across new markets.",
    icon: CircleDollarSign,
  },
  {
    title: "Proven Operating Model",
    description:
      "Validated through real-world operations, fleet management, and deep ecosystem execution.",
    icon: ShieldCheck,
  },
  {
    title: "Growing EV Adoption",
    description:
      "Benefit from increasing demand for electric mobility solutions across India's logistics and transit landscape.",
    icon: TrendingUp,
  },
];

export default function WhyEveezWins() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Why EVEEZ Wins
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Built to deliver sustainable growth, operational efficiency, and
          long-term value creation.
        </p>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-2xl border border-border bg-surface/60 p-6 shadow-2xl shadow-black/10"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.04)] text-[var(--ev-orange)]">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
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
