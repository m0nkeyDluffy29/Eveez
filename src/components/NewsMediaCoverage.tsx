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

export default function NewsMediaCoverage() {
  return (
    <div style={{ backgroundColor: "oklch(0.1876 0.004 286.01)" }}>
      <section className="mx-auto max-w-7xl px-6 py-20 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            News & Media Coverage
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            EVEEZ has been featured across leading business, startup, mobility,
            and industry publications.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-4 md:grid-cols-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center px-3 py-2"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
