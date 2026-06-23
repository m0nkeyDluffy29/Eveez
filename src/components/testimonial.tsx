import * as React from "react";
import FigmaRajesh from "./avatar/figma-rajesh";
import FigmaAnanya from "./avatar/figma-ananya";
import FigmaVikram from "./avatar/figma-vikram";

type AvatarComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Testimonial = {
  quote: string;
  highlight: string[];
  name: string;
  role: string;
  Avatar: AvatarComponent;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "EVEEZ has completely transformed my delivery business. The predictable costs and reliable vehicles have increased my monthly take-home pay by 40%.",
    highlight: ["predictable costs"],
    name: "Rajesh Kumar",
    role: "Delivery Partner",
    Avatar: FigmaRajesh,
  },
  {
    quote:
      "Managing a fleet was a nightmare before switching to EVEEZ tech stack. The real-time analytics allow us to maximize every single vehicle's uptime.",
    highlight: ["real-time analytics"],
    name: "Ananya Sharma",
    role: "Fleet Manager",
    Avatar: FigmaAnanya,
  },
  {
    quote:
      "Their fast charging network is a game changer. I never have range anxiety anymore, which means more deliveries and more earnings every single day.",
    highlight: ["more deliveries"],
    name: "Vikram Singh",
    role: "Gig Worker",
    Avatar: FigmaVikram,
  },
];

function renderQuoteWithHighlight(quote: string, highlights: string[]) {
  let parts: (string | { bold: true; text: string })[] = [quote];

  highlights.forEach((phrase) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const split = part.split(phrase);
      if (split.length === 1) return [part];
      const result: (string | { bold: true; text: string })[] = [];
      split.forEach((chunk, i) => {
        result.push(chunk);
        if (i < split.length - 1) {
          result.push({ bold: true, text: phrase });
        }
      });
      return result;
    });
  });

  return parts.map((part, i) =>
    typeof part === "string" ? (
      <span key={i}>{part}</span>
    ) : (
      <strong key={i} className="font-semibold text-white">
        {part.text}
      </strong>
    ),
  );
}

export default function PartnerTestimonials() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          What Our <span className="text-[#ff5a2a]">Partners Say</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-neutral-400">
          Stories from the frontlines of the mobility revolution.
        </p>

        {/* Testimonial cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col"
            >
              <div className="text-3xl font-serif text-[#ff5a2a] leading-none mb-3">
                &rdquo;&rdquo;
              </div>

              <p className="text-sm italic text-neutral-300 leading-relaxed flex-1">
                &ldquo;{renderQuoteWithHighlight(t.quote, t.highlight)}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <t.Avatar className="h-13 w-13 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
