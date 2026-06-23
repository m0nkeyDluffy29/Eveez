import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  Fuel,
  Leaf,
  Route as RouteIcon,
  Zap,
  ArrowRight,
  Menu,
  X,
  Battery,
  TrendingUp,
  Users,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "EVeez — Powering India's Gig Mobility" },
      {
        name: "description",
        content:
          "Affordable EV subscriptions for riders. Scalable fleet opportunities for franchise partners across India.",
      },
      {
        property: "og:title",
        content: "EVeez — Powering India's Gig Mobility",
      },
      {
        property: "og:description",
        content:
          "Subscribe to an EV. Or own a franchise. Built for India's gig economy.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- Animated counter ---------- */
function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

/* ---------- Nav ---------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Franchise", "#franchise"],
    ["Riders", "#riders"],
    ["Impact", "#impact"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6A1A] to-[#16A34A] text-white font-bold shadow-lg shadow-orange-500/20">
            E
          </span>
          <span className="font-display text-lg tracking-tight text-neutral-900">
            EVeez
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="px-3 py-2 text-sm text-neutral-700 hover:text-neutral-900 rounded-md hover:bg-black/5 transition"
            >
              {l}
            </a>
          ))}
          <a
            href="#franchise"
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#FF6A1A] hover:bg-[#ea5b0c] text-white px-4 py-2 text-sm font-medium transition shadow-lg shadow-orange-500/25"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 rounded-md text-neutral-800"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-black/5 px-5 py-3 flex flex-col gap-1">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-md text-neutral-800 hover:bg-black/5"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-emerald-200/40 blur-3xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="black"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-[106rem] px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-neutral-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> India's
            gig-first EV platform
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-neutral-900">
            Powering India's{" "}
            <span className="bg-gradient-to-r from-[#FF6A1A] to-[#16A34A] bg-clip-text text-transparent">
              Gig Mobility
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-neutral-600">
            Affordable EV subscriptions for riders. Scalable fleet opportunities
            for franchise partners.
          </p>
        </motion.div>

        {/* split journey */}
        <div className="mt-12 grid md:grid-cols-2 gap-5 lg:gap-7">
          {[
            {
              tag: "For Entrepreneurs",
              title: "Become a Franchise Partner",
              desc: "Build a recurring-income EV fleet in your city.",
              cta: "Become a Franchise Partner",
              href: "#franchise",
              accent: "from-[#FF6A1A] to-[#FF8A47]",
              border: "border-orange-200",
              icon: <TrendingUp className="h-6 w-6" />,
            },
            {
              tag: "For Riders",
              title: "Subscribe to EVeez",
              desc: "Get a ride-ready EV on a flexible weekly plan.",
              cta: "Subscribe to EVeez",
              href: "#riders",
              accent: "from-[#16A34A] to-[#22C55E]",
              border: "border-emerald-200",
              icon: <Zap className="h-6 w-6" />,
            },
          ].map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-white border ${c.border} p-7 lg:p-9 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-1`}
            >
              <div
                className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${c.accent} opacity-20 blur-2xl group-hover:opacity-40 transition`}
              />
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.accent} text-white shadow-lg`}
              >
                {c.icon}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-neutral-500">
                {c.tag}
              </p>
              <h3 className="mt-1 text-2xl lg:text-3xl font-semibold text-neutral-900">
                {c.title}
              </h3>
              <p className="mt-2 text-neutral-600">{c.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 font-medium text-neutral-900">
                {c.cta}{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Franchise lead form ---------- */
function FranchiseSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="franchise" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" /> Franchise opportunity
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
              Start Your <span className="text-[#FF6A1A]">EVeez Franchise</span>
            </h2>
            <p className="mt-4 text-neutral-600 text-lg">
              Tap into India's exploding EV demand with a turnkey fleet model.
              Recurring rider subscriptions, full operational support, and a
              brand riders trust.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                ["Recurring monthly income", "from rider subscriptions"],
                ["Local entrepreneurship", "build & lead your city's fleet"],
                ["EV demand growth", "ride India's mobility shift"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <p className="text-neutral-700">
                    <span className="font-medium text-neutral-900">{t}</span> —{" "}
                    {d}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-200/50 to-emerald-200/40 blur-2xl -z-10" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-3xl bg-white border border-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] p-7 lg:p-9"
            >
              <h3 className="text-xl font-semibold text-neutral-900">
                Request franchise details
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                Our team reaches out within 24 hours.
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    label: "Full Name",
                    type: "text",
                    placeholder: "Aarav Sharma",
                  },
                  { label: "City", type: "text", placeholder: "Bengaluru" },
                  {
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-neutral-700">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#FF6A1A] focus:ring-2 focus:ring-orange-200 outline-none transition"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Investment Range
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:bg-white focus:border-[#FF6A1A] focus:ring-2 focus:ring-orange-200 outline-none transition"
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option>₹5L – ₹10L</option>
                    <option>₹10L – ₹25L</option>
                    <option>₹25L – ₹50L</option>
                    <option>₹50L+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A1A] hover:bg-[#ea5b0c] text-white font-medium px-5 py-3.5 transition shadow-lg shadow-orange-500/25"
                >
                  Request Franchise Details <ArrowRight className="h-4 w-4" />
                </button>
                {submitted && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                    Thanks! We'll be in touch shortly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Riders ---------- */
function RidersSection() {
  const cards = [
    {
      title: "Existing Rider",
      sub: "Manage your subscription, payments & support",
      cta: "Login",
      accent: "from-[#FF6A1A] to-[#FF8A47]",
      icon: <Users className="h-7 w-7" />,
    },
    {
      title: "Subscribe to EVeez",
      sub: "Get an EV on weekly subscription",
      cta: "Get Started",
      accent: "from-[#16A34A] to-[#22C55E]",
      icon: <Battery className="h-7 w-7" />,
    },
  ];
  return (
    <section id="riders" className="py-20 lg:py-28 bg-neutral-50/60">
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium">
            <Zap className="h-3.5 w-3.5" /> For Riders
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
            Choose your ride journey
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-5 lg:gap-7">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white border border-black/5 p-8 lg:p-10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-1 min-h-[280px] flex flex-col justify-between"
            >
              <div
                className={`absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-gradient-to-br ${c.accent} opacity-15 blur-2xl group-hover:opacity-30 transition`}
              />
              <div>
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.accent} text-white shadow-lg`}
                >
                  {c.icon}
                </div>
                <h3 className="mt-5 text-2xl lg:text-3xl font-semibold text-neutral-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-neutral-600">{c.sub}</p>
              </div>
              <button
                className={`mt-8 self-start inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${c.accent} text-white px-5 py-3 text-sm font-medium shadow-md transition group-hover:gap-3`}
              >
                {c.cta} <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Impact ---------- */
function ImpactSection() {
  const stats = [
    {
      icon: <Fuel className="h-6 w-6" />,
      value: 2787631.86,
      decimals: 2,
      label: "Litres of Fuel Saved",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      value: 8362895.59,
      decimals: 2,
      label: "Kgs of CO₂ Saved",
    },
    {
      icon: <RouteIcon className="h-6 w-6" />,
      value: 167257911.72,
      decimals: 2,
      label: "Kilometres Covered",
    },
  ];
  return (
    <section id="impact" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-orange-50" />
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium">
            <Leaf className="h-3.5 w-3.5" /> Real impact
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
            A cleaner India,{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#FF6A1A] bg-clip-text text-transparent">
              one ride at a time
            </span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-7">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-white border border-emerald-100 p-7 lg:p-8 shadow-[0_10px_40px_-20px_rgba(16,185,129,0.3)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                {s.icon}
              </div>
              <div className="mt-5 text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                <Counter to={s.value} decimals={s.decimals} />
                <span className="text-emerald-600">+</span>
              </div>
              <p className="mt-2 text-neutral-600">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function TestimonialsSection() {
  const partners = [
    {
      name: "Rohit Mehta",
      city: "Pune",
      quote:
        "EVeez gave me a real business — recurring income and a fleet I'm proud of. Onboarding was seamless.",
    },
    {
      name: "Priya Nair",
      city: "Kochi",
      quote:
        "From 10 vehicles to 60 in under a year. The brand and operations playbook genuinely work.",
    },
  ];
  const riders = [
    {
      name: "Imran Khan",
      city: "Delhi",
      quote:
        "I save almost ₹6,000 a month on fuel. The weekly plan fits my gig schedule perfectly.",
    },
    {
      name: "Anjali Verma",
      city: "Hyderabad",
      quote:
        "Quiet, smooth, and the support team actually picks up. Riding has never felt this good.",
    },
  ];

  const Card = ({
    name,
    city,
    quote,
    accent,
  }: {
    name: string;
    city: string;
    quote: string;
    accent: "orange" | "green";
  }) => (
    <div className="rounded-3xl bg-white border border-black/5 p-7 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.3)] transition">
      <div className="flex gap-0.5 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-neutral-700 leading-relaxed">"{quote}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div
          className={`h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold ${
            accent === "orange"
              ? "bg-gradient-to-br from-[#FF6A1A] to-[#FF8A47]"
              : "bg-gradient-to-br from-[#16A34A] to-[#22C55E]"
          }`}
        >
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-medium text-neutral-900">{name}</p>
          <p className="text-sm text-neutral-500">{city}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 lg:py-28 bg-neutral-50/60">
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs font-medium">
            Voices of EVeez
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
            Trusted by partners & riders
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF6A1A]">
              Franchise Partners
            </h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-5">
              {partners.map((p) => (
                <Card key={p.name} {...p} accent="orange" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#16A34A]">
              Gig Riders
            </h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-5">
              {riders.map((p) => (
                <Card key={p.name} {...p} accent="green" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 text-neutral-700 px-3 py-1 text-xs font-medium">
            About EVeez
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
            An EV ecosystem built for{" "}
            <span className="bg-gradient-to-r from-[#FF6A1A] to-[#16A34A] bg-clip-text text-transparent">
              India's gig economy
            </span>
          </h2>
          <p className="mt-5 text-neutral-600 text-lg">
            EVeez makes electric mobility effortless. Riders subscribe to a
            ready-to-go EV on simple weekly plans. Entrepreneurs run city fleets
            through our franchise model. Every ride cuts fuel costs and
            emissions.
          </p>
          <div className="mt-7 grid sm:grid-cols-3 gap-4">
            {[
              ["Subscribe", "Weekly EV plans"],
              ["Franchise", "Own a city node"],
              ["Sustain", "Cleaner mobility"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-2xl border border-black/5 bg-white p-4"
              >
                <p className="font-semibold text-neutral-900">{t}</p>
                <p className="text-sm text-neutral-500 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-orange-100 to-emerald-100 rounded-[2.5rem] blur-2xl -z-10" />
          <div className="rounded-[2rem] border border-black/5 bg-white p-8 lg:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF6A1A] to-[#16A34A] flex items-center justify-center text-white">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Our mission</p>
                <p className="text-sm text-neutral-500">
                  Sustainable mobility, empowered work
                </p>
              </div>
            </div>
            <p className="mt-6 text-neutral-700 leading-relaxed">
              We exist so every gig worker in India can earn more, ride cleaner,
              and own their future — and so every entrepreneur has a real path
              into the EV economy.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["50+", "Cities"],
                ["10k+", "Riders"],
                ["100%", "Electric"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-xl font-semibold text-neutral-900">{v}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-neutral-50/60">
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs font-medium">
            Get in touch
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
            We'd love to hear from you
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            Questions about subscriptions, franchise opportunities, or
            partnerships? Reach out.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                i: <Phone className="h-5 w-5" />,
                l: "+91 80 4567 8900",
                s: "Mon–Sat, 9am–7pm",
              },
              {
                i: <Mail className="h-5 w-5" />,
                l: "hello@eveez.in",
                s: "We reply in 24h",
              },
              {
                i: <MapPin className="h-5 w-5" />,
                l: "12, Indiranagar, Bengaluru 560038",
                s: "HQ India",
              },
            ].map((c) => (
              <div
                key={c.l}
                className="flex items-start gap-4 rounded-2xl bg-white border border-black/5 p-4"
              >
                <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-[#FF6A1A] to-[#16A34A] text-white flex items-center justify-center">
                  {c.i}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{c.l}</p>
                  <p className="text-sm text-neutral-500">{c.s}</p>
                </div>
              </div>
            ))}
            <a
              href="https://wa.me/918045678900"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white font-medium px-5 py-3 transition shadow-lg shadow-emerald-500/25"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl bg-white border border-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] p-7 lg:p-9"
        >
          <h3 className="text-xl font-semibold text-neutral-900">
            Send us a message
          </h3>
          <div className="mt-6 grid gap-4">
            {[
              { l: "Name", t: "text", p: "Your name" },
              { l: "Email", t: "email", p: "you@email.com" },
              { l: "Phone", t: "tel", p: "+91 ..." },
            ].map((f) => (
              <div key={f.l}>
                <label className="text-sm font-medium text-neutral-700">
                  {f.l}
                </label>
                <input
                  type={f.t}
                  required
                  placeholder={f.p}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 focus:bg-white focus:border-[#FF6A1A] focus:ring-2 focus:ring-orange-200 outline-none transition"
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-neutral-700">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="How can we help?"
                className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 focus:bg-white focus:border-[#FF6A1A] focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6A1A] to-[#16A34A] text-white font-medium px-5 py-3.5 transition shadow-lg shadow-orange-500/25 hover:opacity-95"
            >
              Send message <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function FooterBlock() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-[106rem] px-5 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6A1A] to-[#16A34A] text-white font-bold">
              E
            </span>
            <span className="font-display text-lg text-white">EVeez</span>
          </div>
          <p className="mt-4 text-sm text-neutral-400">
            Powering India's gig mobility with affordable electric subscriptions
            and a scalable franchise network.
          </p>
        </div>
        {[
          {
            t: "Company",
            l: [
              ["About", "#about"],
              ["Franchise", "#franchise"],
              ["Riders", "#riders"],
              ["Contact", "#contact"],
            ],
          },
          {
            t: "Ecosystem",
            l: [
              ["Fast Charging", "/fast-charging"],
              ["Service", "/service"],
              ["Tech Stack", "/tech-stack"],
              ["Vehicle R&D", "/vehicle-rd"],
            ],
          },
        ].map((g) => (
          <div key={g.t}>
            <p className="font-semibold text-white">{g.t}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {g.l.map(([n, h]) => (
                <li key={n}>
                  <a href={h} className="hover:text-white transition">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-semibold text-white">Follow</p>
          <div className="mt-4 flex gap-2">
            {["IG", "X", "LI", "YT"].map((s) => (
              <a
                key={s}
                href="#"
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-medium transition"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-500">
            © {new Date().getFullYear()} EVeez Mobility Pvt Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */
function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/918045678900"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-105 transition"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
    </a>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="bg-white text-neutral-900 min-h-screen antialiased">
      <Navbar />
      <main>
        <Hero />
        <FranchiseSection />
        <RidersSection />
        <ImpactSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FooterBlock />
      <WhatsAppFab />
    </div>
  );
}
