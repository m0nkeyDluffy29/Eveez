import { useEffect, useRef } from "react";
import ebs from "../../assets/icons/eveez-business-standard.png";
import ys from "../../assets/icons/eveez--youtuber.png";
import ent from "../../assets/icons/eveez-entracker.png";
import cab from "../../assets/icons/eveez-car-and-bike.png";
import bwd from "../../assets/icons/eveez-disrupt.png";
import cnbc from "../../assets/icons/eveez-cnbc-news.png";
import ny from "../../assets/icons/eveez-news-voir.png";
import sme from "../../assets/icons/eveez-sme-street.png";

const partners = [
  { name: "Business Standard", logo: ebs },
  { name: "YourStory", logo: ys },
  { name: "ENTRACKR", logo: ent },
  { name: "car&bike", logo: cab },
  { name: "BW Disrupt", logo: bwd },
  { name: "CNBC TV", logo: cnbc },
  { name: "News Voir", logo: ny },
  { name: "SME street", logo: sme },
];

// Duplicate for seamless loop
const doubled = [...partners, ...partners];

export default function NewsMediaCoverage() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let raf: number;

    const tick = () => {
      x -= 0.5;
      // Reset when first half scrolled out
      if (Math.abs(x) >= track.scrollWidth / 2) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ backgroundColor: "oklch(0.1876 0.004 286.01)" }}>
      <section className="mx-auto max-w-7xl px-6 py-16 text-white">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            News & Media Coverage
          </h2>
          <p className="mt-2 text-base text-[var(--footer-text)]">
            EVEEZ has been featured across leading business, startup, mobility,
            and industry publications.
          </p>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-10 w-max">
            {doubled.map((partner, i) => (
              <img
                key={`${partner.name}-${i}`}
                src={partner.logo}
                alt={partner.name}
                className="h-8 w-auto object-contain  hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
