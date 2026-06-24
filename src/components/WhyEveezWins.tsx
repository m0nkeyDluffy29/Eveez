import figmaCost from "./icons/figma-cost";
import figmaUptime from "./icons/figma-uptime";
import figmaExpansion from "./icons/figma-expansion";

const cards = [
  {
    title: "Predictable Operating Costs",
    description:
      "Consistent economics enabled through an integrated ecosystem approach that minimizes variance.",
    icon: figmaCost,
  },
  {
    title: "Higher Vehicle Uptime",
    description:
      "Vehicles remain operational through proactive maintenance and tech-enabled service support.",
    icon: figmaUptime,
  },
  {
    title: "Faster Fleet Expansion",
    description:
      "Scalable infrastructure and operational processes enable rapid deployment across new markets.",
    icon: figmaExpansion,
  },
];

export default function WhyEveezWins() {
  return (
    <section className="mx-auto max-w-[106rem] px-6 py-10 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white font-display">
          Why <span className="text-[#E8461F]">EVeez</span> Wins
        </h2>
        <p className="mt-3 text-sm md:text-[16px] text-[var(--footer-text)]">
          Built to deliver sustainable growth, operational efficiency, and
          long-term value creation.
        </p>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-3 ">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-[24px] border border-border bg-surface/60 p-6 shadow-2xl shadow-black/10 bg-neutral-900/50"
            >
              <div className="mb-5 inline-flex h-[70px] w-[70px] items-center justify-center rounded-2xl text-[var(--ev-orange)]">
                <Icon className="w-[55px] h-[55px]" strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-xs md:text-sm leading-6 text-[var(--footer-text)]">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
