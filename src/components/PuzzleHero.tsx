import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "../../assets/icons/eveez-logo-1.png";
import { type VerticalKey } from "./SectionShell";
import { PIECES } from "./PuzzleHeroPieces";

export default function PuzzleHero() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<
    "scatter" | "assemble" | "logo" | "depart"
  >("scatter");
  const [target, setTarget] = useState<VerticalKey | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const containerRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { label: "Franchise", href: "#" },
    { label: "Fast Charging", href: "#" },
    { label: "Service", href: "#" },
    { label: "Tech Stack", href: "#" },
    { label: "Vehicle R&D", href: "#" },
    { label: "Training Programmes", href: "#" },
  ];

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  function onPick(k: VerticalKey) {
    if (phase !== "scatter") return;
    setTarget(k);
    setPhase("assemble");
  }

  // Tile size in assembled state
  const TILE = 180;
  const GAP = 0;
  const isFlat = phase !== "scatter";

  return (
    <div
      ref={containerRef}
      className="relative min-h-[420px] sm:min-h-[560px] md:min-h-[820px] overflow-hidden bg-neutral-950"
    >
      {/* Video background */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover z-0"
        src="/video/0_Abstract_Background_1920x1080.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0"
        style={{
          width: "85vw",
          height: "85vh",
          background:
            "radial-gradient(ellipse at bottom right, oklch(0.55 0.18 36 / 0.55) 0%, oklch(0.4 0.15 36 / 0.25) 40%, transparent 70%)",
        }}
      />
      {/* Top nav (in-hero) */}
      <header className="relative z-30 border-b-2 border-orange bg-neutral-950">
        <div className="mx-auto max-w-[106rem] px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="EVeez"
              className="h-15 w-auto object-contain"
              loading="lazy"
            />
          </a>

          {/* Center nav — visible only above 1150px */}
          <nav className="hidden min-[1150px]:flex flex-1 justify-center items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA: hidden below 450px, shown from 450px up */}
            <a
              href="#"
              className="hidden min-[450px]:inline-flex items-center rounded-md bg-[#FF6A1A] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
            >
              Become A Partner
            </a>

            {/* Hamburger button: visible below 1150px */}
            <button
              className="min-[1150px]:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-white rounded-full" />
              <span className="block w-6 h-0.5 bg-white rounded-full" />
              <span className="block w-6 h-0.5 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet drawer — slides in from right */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/60 min-[1150px]:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 z-50 h-full w-72 bg-neutral-950 border-l border-white/10 flex flex-col px-6 py-8 min-[1150px]:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Close button */}
              <button
                className="self-end mb-8 text-white/60 hover:text-white transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M1 1l20 20M21 1L1 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Nav links */}
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base text-white/80 hover:text-[var(--ev-orange)] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* CTA inside menu — only below 450px */}
              <a
                href="#"
                className="mt-10 min-[450px]:hidden inline-flex justify-center items-center rounded-md bg-[#FF6A1A] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
              >
                Become A Partner
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero copy */}
      <div className="relative z-20 mx-auto max-w-3xl px-6 pt-10 text-center">
        <h1 className="mt-5 text-5xl md:text-6xl font-semibold leading-[1.02]">
          Mobility for <span className="text-gradient-ev">Livelihoods</span>
        </h1>
        {/* <p className="mt-4 text-base md:text-lg text-[var(--footer-text)]">
          Transforming Mobility Into Economic Opportunity
        </p> */}
      </div>

      {/* Puzzle stage */}
      <div className="relative z-10 mx-auto w-full h-[220px] sm:h-[370px] md:h-[600px] flex items-center justify-center overflow-visible pointer-events-none">
        <div className="relative w-[1000px] h-[600px] scale-[0.35] sm:scale-[0.6] md:scale-100 flex-shrink-0 origin-center pointer-events-none [&>*]:pointer-events-auto">
          {PIECES.map((p) => {
            const id = `pp-${p.key}`;

            // assembled position: center the 3x2 grid of base TILE (180px)
            const BASE_TILE = 180;
            const gridW = 3 * BASE_TILE + 2 * GAP;
            const gridH = 2 * BASE_TILE + GAP;
            const targetX = `calc(50% - ${gridW / 2}px + ${p.col * (BASE_TILE + GAP)}px + ${p.ox}px)`;
            const targetY = `calc(50% - ${gridH / 2}px + ${p.row * (BASE_TILE + GAP)}px + ${p.oy}px)`;

            const scattered = phase === "scatter";
            const assembling =
              phase === "assemble" || phase === "logo" || phase === "depart";

            return (
              <motion.button
                key={p.key}
                type="button"
                aria-label={p.key as string}
                onClick={() => onPick(p.key)}
                className="absolute group focus:outline-none cursor-pointer"
                initial={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  rotate: p.rot,
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={
                  scattered
                    ? {
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        rotate: p.rot,
                        scale: 1,
                        opacity: 1,
                        y: reduce ? 0 : [0, -8, 0],
                      }
                    : assembling
                      ? {
                          left: targetX,
                          top: targetY,
                          rotate: 0,
                          scale: phase === "depart" ? 0.2 : 1.012,
                          opacity: phase === "depart" ? 0 : 1,
                          x: 0,
                          y: 0,
                        }
                      : undefined
                }
                transition={
                  scattered
                    ? {
                        left: {
                          duration: 1,
                          delay: p.delay,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        top: {
                          duration: 1,
                          delay: p.delay,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        rotate: {
                          duration: 1,
                          delay: p.delay,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        scale: { duration: 0.8, delay: p.delay },
                        opacity: { duration: 0.6, delay: p.delay },
                        y: {
                          duration: 5 + (p.col + p.row),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: p.delay,
                        },
                      }
                    : {
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: phase === "assemble" ? p.delay * 0.4 : 0,
                      }
                }
                whileHover={
                  scattered
                    ? { scale: 1.06, y: -6, rotate: p.rot * 0.4 }
                    : undefined
                }
                whileTap={scattered ? { scale: 0.96 } : undefined}
                style={{
                  width: p.w,
                  height: p.h,
                  transformOrigin: "center",
                  zIndex: p.row * 3 + p.col + 1,
                  filter: scattered
                    ? "drop-shadow(4px 10px 0px rgba(255, 90, 42, 0.35))"
                    : "none",
                  transition: "filter 0.5s ease",
                }}
              >
                <p.Component
                  className={`w-full h-full${assembling ? " [&_g]:!filter-none" : ""}`}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Center glow removed - now plain black */}
      </div>

      {/* Footer hint */}
      <AnimatePresence>
        {phase === "scatter" && (
          <motion.div
            key="scooter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          >
            {/* <img
              src="/scooter.png"
              alt="EVeez scooter"
              className="w-[420px] md:w-[520px] drop-shadow-2xl"
            /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
