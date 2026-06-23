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
      className="rounded-2xl border border-neutral-800 bg-neutral-900/50 px-6 py-8 text-center"
    >
      <div className="text-3xl font-semibold text-white">
        {value.toLocaleString("en-US")}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.15em] text-[var(--footer-text)]">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
