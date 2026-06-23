import * as React from "react";
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

export default function ScalingOpportunities() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-[106rem] px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Scaling Opportunities in <span className="text-[#ff5a2a]">India</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-[var(--footer-text)]">
          Powering the next wave of mobility and entrepreneurship.
        </p>

        {/* City grid — flex-wrap centers the partial last row */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {CITIES.map((city) => (
            <div
              key={city.name}
              className="flex w-[104px] sm:w-[110px] md:w-[112px] flex-col items-center justify-center gap-2 rounded-[5px] border border-neutral-800 bg-neutral-900/60 px-5 py-5 transition-colors hover:border-[#ff5a2a]/40 hover:bg-neutral-900"
            >
              <city.Icon className="h-12 w-12" />
              <span className="text-[15px] font-medium text-[#ff5a2a]">
                {city.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
