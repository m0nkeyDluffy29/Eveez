import { createFileRoute } from "@tanstack/react-router";
import PuzzleHero from "@/components/PuzzleHero";
import EnvironmentalImpact from "@/components/EnvironmentalImpact";
import WhyEveezWins from "@/components/WhyEveezWins";
// import EveezEcosystem from "@/components/EveezEcosystem";
import NewsMediaCoverage from "@/components/NewsMediaCoverage";
import FooterSection from "@/components/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVeez — One ecosystem. Six verticals." },
      {
        name: "description",
        content:
          "An interactive puzzle that assembles the future of EV mobility — Franchise, Fast Charging, Service, Tech Stack, Vehicle R&D, and Training.",
      },
      {
        property: "og:title",
        content: "EVeez — One ecosystem. Six verticals.",
      },
      {
        property: "og:description",
        content: "Click any piece. Watch the puzzle assemble.",
      },
    ],
  }),
  component: () => (
    <div className="bg-neutral-950 text-white min-h-screen">
      <PuzzleHero />
      <EnvironmentalImpact />
      <WhyEveezWins />
      {/* <EveezEcosystem /> */}
      <NewsMediaCoverage />
      <FooterSection />
    </div>
  ),
});
