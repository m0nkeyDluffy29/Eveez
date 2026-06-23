import figmaFuel from "./icons/figm-fuel";
import figmaLeaf from "./icons/figma-leaf";
import figmaElectricScooter from "./icons/figma-electric-scooter";
import { useEffect, useRef, useState } from "react";

export default function EnvironmentalImpact() {
  const stats = [
    {
      icon: figmaFuel,
      value: "2,827,335.39+",
      label: "Fuel Saved (in litres)",
    },
    {
      icon: figmaLeaf,
      value: "8,482,006.18+",
      label: "Kgs CO2 saved",
    },
    {
      icon: figmaElectricScooter,
      value: "169,640,123.64+",
      label: "Km Covered",
    },
  ];

  // state holding the current displayed strings for each stat
  const [display, setDisplay] = useState<string[]>(() =>
    stats.map((s) => {
      // start with zeros matching the integer part length
      const base = s.value.split("+")[0];
      const intPart = base.split(".")[0].replace(/,/g, "");
      return intPart.replace(/\d/g, "0") + (base.includes("+") ? "+" : "");
    }),
  );

  const rootRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  // helper: ease out cubic
  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function formatWithCommas(digits: string) {
    // group from right
    const neg = digits.startsWith("-");
    if (neg) digits = digits.slice(1);
    let res = "";
    let i = digits.length;
    while (i > 3) {
      const chunk = digits.slice(i - 3, i);
      res = "," + chunk + res;
      i -= 3;
    }
    res = digits.slice(0, i) + res;
    if (neg) res = "-" + res;
    return res;
  }

  function animateStat(index: number, raw: string) {
    // raw like "2,827,335.39+"
    const plus = raw.endsWith("+");
    const base = plus ? raw.slice(0, -1) : raw;
    const [intPart, fracPart] = base.split(".");
    const targetDigits = intPart.replace(/,/g, "").split("");
    const len = targetDigits.length;
    const duration = 1600 + index * 200; // ms

    let raf = 0;
    const start = performance.now();

    function frame(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const p = easeOutCubic(t);

      // number of locked digits from left
      const locked = Math.floor(p * len);

      const digits: string[] = [];
      for (let i = 0; i < len; i++) {
        if (i < locked) digits.push(targetDigits[i]);
        else digits.push(String(Math.floor(Math.random() * 10)));
      }

      const withCommas = formatWithCommas(digits.join(""));
      const displayStr =
        withCommas + (fracPart ? `.${fracPart}` : "") + (plus ? "+" : "");

      setDisplay((prev) => {
        const copy = [...prev];
        copy[index] = displayStr;
        return copy;
      });

      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        // ensure final exact value
        setDisplay((prev) => {
          const copy = [...prev];
          copy[index] = raw;
          return copy;
        });
      }
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const ent of entries) {
          if (ent.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            // start animations for all stats
            stats.forEach((s, i) => animateStat(i, s.value));
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootRef]);

  return (
    <section
      ref={(el) => (rootRef.current = el)}
      className="mx-auto max-w-7xl px-6 py-20 bg"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="text-[25px] uppercase tracking-[0.3em] text-white"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          ENVIRONMENTAL IMPACT
        </div>
        <p
          className="mt-2 text-sm text-white"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Our Collective Impact
        </p>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col items-center text-center bg-neutral-900/50"
            >
              <div
                className={`mb-4 inline-flex h-[70px] w-[70px] items-center justify-center rounded-lg ${s.color}`}
                style={{ boxShadow: `0 8px 24px -12px rgba(0,0,0,0.6)` }}
              >
                <Icon
                  className="h-[55px] w-[55px] text-white"
                  strokeWidth={1.8}
                />
              </div>

              <div
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {display[i] ?? s.value}
              </div>
              <div className="mt-2 text-sm text-[var(--footer-text)]">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
