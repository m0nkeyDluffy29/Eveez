import * as React from "react";
import { useState } from "react";
import FigmaAhmedabad from "./city-logo/figma-ahmedabad";
import FigmaBengaluru from "./city-logo/figma-bengaluru";
import FigmaBhopal from "./city-logo/figma-bhopal";
import FigmaChandigarh from "./city-logo/figma-chandigarh";
import FigmaChennai from "./city-logo/figma-chennai";
import FigmaDelhi from "./city-logo/figma-delhi";
import FigmaGurugram from "./city-logo/figma-gurugram";
import FigmaGuwahati from "./city-logo/figma-guwahati";
import FigmaHyderabad from "./city-logo/figma-hyderabad";
import FigmaIndore from "./city-logo/figma-indore";
import FigmaJaipur from "./city-logo/figma-jaipur";
import FigmaKanpur from "./city-logo/figma-kanpur";
import FigmaKolkata from "./city-logo/figma-kolkata";
import FigmaLucknow from "./city-logo/figma-lucknow";
import FigmaMathura from "./city-logo/figma-mathura";
import FigmaMumbai from "./city-logo/figma-mumbai";
import FigmaMysore from "./city-logo/figma-mysore";
import FigmaNagpur from "./city-logo/figma-nagpur";
import FigmaNoida from "./city-logo/figma-noida";
import FigmaPatna from "./city-logo/figma-patna";
import FigmaPune from "./city-logo/figma-pune";
import FigmaRaipur from "./city-logo/figma-raipur";
import FigmaRanchi from "./city-logo/figma-ranchi";
import FigmaVijayawada from "./city-logo/figma-vijayawada";
import FigmaVisakhapatnam from "./city-logo/figma-visakhapatnam";

type CityIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type City = {
  name: string;
  Icon: CityIconComponent;
};

const CITIES: City[] = [
  { name: "Ahmedabad", Icon: FigmaAhmedabad },
  { name: "Bengaluru", Icon: FigmaBengaluru },
  { name: "Bhopal", Icon: FigmaBhopal },
  { name: "Chandigarh", Icon: FigmaChandigarh },
  { name: "Chennai", Icon: FigmaChennai },
  { name: "Delhi", Icon: FigmaDelhi },
  { name: "Gurugram", Icon: FigmaGurugram },
  { name: "Guwahati", Icon: FigmaGuwahati },
  { name: "Hyderabad", Icon: FigmaHyderabad },
  { name: "Indore", Icon: FigmaIndore },
  { name: "Jaipur", Icon: FigmaJaipur },
  { name: "Kanpur", Icon: FigmaKanpur },
  { name: "Kolkata", Icon: FigmaKolkata },
  { name: "Lucknow", Icon: FigmaLucknow },
  { name: "Mathura", Icon: FigmaMathura },
  { name: "Mumbai", Icon: FigmaMumbai },
  { name: "Mysore", Icon: FigmaMysore },
  { name: "Nagpur", Icon: FigmaNagpur },
  { name: "Noida", Icon: FigmaNoida },
  { name: "Patna", Icon: FigmaPatna },
  { name: "Pune", Icon: FigmaPune },
  { name: "Raipur", Icon: FigmaRaipur },
  { name: "Ranchi", Icon: FigmaRanchi },
  { name: "Vijayawada", Icon: FigmaVijayawada },
  { name: "Visakhapatnam", Icon: FigmaVisakhapatnam },
];

const MOBILE_INITIAL = 4;

export default function ScalingOpportunities() {
  const [showAll, setShowAll] = useState(false);

  // On mobile: show 4 initially, all when expanded. On sm+: always show all.
  const visibleCities = showAll ? CITIES : CITIES.slice(0, MOBILE_INITIAL);

  return (
    <section className="bg-black py-10 md:py-20">
      <div className="mx-auto max-w-[106rem] px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-semibold text-white">
          Scaling Opportunities in <span className="text-[#E8461F]">India</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-[var(--footer-text)]">
          Powering the next wave of mobility and entrepreneurship.
        </p>

        {/* City grid */}
        {/* Mobile: 2-col grid, capped at 4 until expanded */}
        {/* sm+: flex-wrap, all cities always visible */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
          {/* Mobile view — controlled by showAll */}
          {visibleCities.map((city) => (
            <div
              key={city.name}
              className="flex sm:hidden w-full flex-col items-center justify-center gap-2 rounded-[5px] border border-neutral-800 bg-neutral-900/60 px-5 py-5 transition-colors hover:border-[#E8461F]/40 hover:bg-neutral-900"
            >
              <city.Icon className="h-12 w-12" />
              <span className="text-[15px] font-medium text-[#E8461F]">
                {city.name}
              </span>
            </div>
          ))}

          {/* Desktop view — always show all, hidden on mobile */}
          {CITIES.map((city) => (
            <div
              key={`desktop-${city.name}`}
              className="hidden sm:flex w-full sm:w-[110px] md:w-[160px] flex-col items-center justify-center gap-2 rounded-[5px] border border-neutral-800 bg-neutral-900/60 px-5 py-5 transition-colors hover:border-[#E8461F]/40 hover:bg-neutral-900"
            >
              <city.Icon className="h-12 w-12" />
              <span className="text-[15px] font-medium text-[#E8461F]">
                {city.name}
              </span>
            </div>
          ))}
        </div>

        {/* View All / Show Less — mobile only */}
        <div className="mt-6 sm:hidden">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-md border border-[#E8461F]/60 bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-[#E8461F] transition hover:bg-[#E8461F]/10 active:scale-95"
          >
            {showAll ? (
              <>
                Show Less
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            ) : (
              <>
                View All {CITIES.length} Cities
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
