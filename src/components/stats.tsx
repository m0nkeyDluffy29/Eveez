import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  target: number;
  suffix?: string;
};

const STATS: Stat[] = [
  { label: "Cities", target: 25, suffix: "+" },
  { label: "EVs", target: 15000, suffix: "+" },
  { label: "Gig Workers Livelihoods Enabled", target: 20000, suffix: "+" },
  { label: "Growth Partners", target: 55, suffix: "+" },
];

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatCard({ label, target, suffix = "" }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const value = useCountUp(target, inView);

  return (
    <div
      ref={ref}
      // ↓ tighter padding on mobile, original on md+
      className="rounded-[16px] border border-border bg-neutral-900/70 px-3 py-6 text-center md:px-[24px] md:py-[24px]"
    >
      {/* ↓ smaller number on mobile so long values like 20,000+ don't overflow */}
      <div className="text-2xl font-medium text-white font-display md:text-3xl">
        {value.toLocaleString("en-US")}
        {suffix}
      </div>
      {/* ↓ tighten letter-spacing and allow wrapping on mobile */}
      <div className="mt-2 text-xs md:text-sm uppercase leading-tight tracking-[0.08em] text-[var(--footer-text)] md:tracking-[0.15em]">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-black py-8 md:py-16">
      {/* ↓ less horizontal padding on mobile */}
      <div className="mx-auto max-w-[106rem] px-4 md:px-6">
        {/* grid stays 2-col on mobile, 4-col on md+ — unchanged */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
