import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const asset = (path: string) => new URL(path, import.meta.url).href;

const partners = [
  {
    name: "Business Standard",
    logo: asset("../../assets/icons/eveez-business-standard.png"),
  },
  {
    name: "YourStory",
    logo: asset("../../assets/icons/eveez--youtuber.png"),
  },
  {
    name: "ENTRACKR",
    logo: asset("../../assets/icons/eveez-entracker.png"),
  },
  {
    name: "car&bike",
    logo: asset("../../assets/icons/eveez-car-and-bike.png"),
  },
  {
    name: "BW Disrupt",
    logo: asset("../../assets/icons/eveez-disrupt.png"),
  },
  {
    name: "CNBC TV",
    logo: asset("../../assets/icons/eveez-cnbc-news.png"),
  },
  {
    name: "News Voir",
    logo: asset("../../assets/icons/eveez-news-voir.png"),
  },
  {
    name: "SME street",
    logo: asset("../../assets/icons/eveez-sme-street.png"),
  },
];

const slides = Array.from(
  { length: Math.ceil(partners.length / 4) },
  (_, index) => partners.slice(index * 4, index * 4 + 4),
);

export default function NewsMediaCoverage() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!carouselApi || isPaused) return;

    const interval = window.setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 2000);

    return () => window.clearInterval(interval);
  }, [carouselApi, isPaused]);

  return (
    <div style={{ backgroundColor: "oklch(0.1876 0.004 286.01)" }}>
      <section className="mx-auto max-w-7xl px-6 py-20 text-white ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            News & Media Coverage
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            EVEEZ has been featured across leading business, startup, mobility,
            and industry publications.
          </p>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Carousel
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              loop: false,
            }}
            setApi={setCarouselApi}
          >
            <CarouselContent className="gap-4">
              {slides.map((slide, slideIndex) => (
                <CarouselItem key={slideIndex}>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {slide.map((partner) => (
                      <div
                        key={partner.name}
                        className="flex h-24 items-center justify-center"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-10 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
