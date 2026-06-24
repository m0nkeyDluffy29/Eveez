import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "../../assets/icons/eveez-logo-1.png";
import { type VerticalKey } from "./SectionShell";
import { PIECES } from "./PuzzleHeroPieces";

// Mobile scatter: absolute px positions inside a 1000×950 canvas (3 rows × 2 cols).
// Row height ≈ 317px, piece height ≈ 280-334px — each row comfortably fits one piece.
// Col 0 = left half (0-499px), Col 1 = right half (500-999px).
// Natural jitter breaks the grid look while preventing overlap.
const MOBILE_SCATTER_PX: { left: number; top: number; rot: number }[] = [
  { left:  240, top:  10, rot: -13 }, // franchise       L / row0
  { left: 520, top:  18, rot:  11 }, // fast-charging   R / row0
  { left:  460, top: 300, rot:  -8 }, // service         L / row1
  { left: 200, top: 250, rot:   9 }, // tech-stack      R / row1
  { left:  215, top: 550, rot: -16 }, // vehicle-rd      L / row2
  { left: 480, top: 500, rot:   7 }, // training        R / row2
];

// Desktop scatter positions (% of 1000×600 canvas) — original values
const DESKTOP_SCATTER = [
  { x: 4,  y: 20, rot: -14 }, // franchise
  { x: 62, y: 17, rot:  11 }, // fast-charging
  { x: 74, y: 54, rot:  -7 }, // service
  { x: 0,  y: 57, rot:   9 }, // tech-stack
  { x: 37, y: 62, rot: -16 }, // vehicle-rd
  { x: 32, y: 14, rot:  -4 }, // training
];

export default function PuzzleHero() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<
    "scatter" | "assemble" | "logo" | "depart"
  >("scatter");
  const [target, setTarget] = useState<VerticalKey | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [isSm, setIsSm] = useState(() => window.innerWidth >= 640 && window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsSm(w >= 640 && w < 768);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      className="relative min-h-[600px] sm:min-h-[620px] md:min-h-[820px] overflow-hidden bg-neutral-950"
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
        <h1 className="mt-5 text-[28px] md:text-6xl font-semibold leading-[1.02]">
          Mobility for <span className="text-gradient-ev">Livelihoods</span>
        </h1>
        {/* <p className="mt-4 text-base md:text-lg text-[var(--footer-text)]">
          Transforming Mobility Into Economic Opportunity
        </p> */}
      </div>

      {/* Puzzle stage */}
      {/*
        Mobile: virtual canvas 1000×950, scale(0.37) → ~370px visible height
                3 rows × 2 cols with px-based positions, no overlap
        sm (640-767px): same mobile canvas but scale(0.52)
        md+: 1000×600 at scale(1)
      */}
      <div className="relative z-10 mx-auto w-full h-[390px] sm:h-[400px] md:h-[620px] flex items-start justify-center overflow-visible pointer-events-none">
        <div
          className="relative flex-shrink-0 pointer-events-none [&>*]:pointer-events-auto"
          style={{
            width: 1000,
            height: isMobile ? 950 : 600,
            transform: isMobile
              ? 'scale(0.6)'
              : isSm
                ? 'scale(0.58)'
                : 'scale(1)',
            transformOrigin: 'top center',
          }}
        >
          {PIECES.map((p, idx) => {
            // assembled position: center the 3x2 grid of base TILE (180px)
            const BASE_TILE = 180;
            const gridW = 3 * BASE_TILE + 2 * GAP;
            const gridH = 2 * BASE_TILE + GAP;
            // On mobile the canvas is 950px tall; assembled center at 300px keeps grid visible at scale(0.38)
            const centerY = isMobile ? 300 : '50%';
            const targetX = `calc(50% - ${gridW / 2}px + ${p.col * (BASE_TILE + GAP)}px + ${p.ox}px)`;
            const targetY = isMobile
              ? `calc(${centerY}px - ${gridH / 2}px + ${p.row * (BASE_TILE + GAP)}px + ${p.oy}px)`
              : `calc(50% - ${gridH / 2}px + ${p.row * (BASE_TILE + GAP)}px + ${p.oy}px)`;

            const scattered = phase === "scatter";
            const assembling =
              phase === "assemble" || phase === "logo" || phase === "depart";

            // Scatter position: px on mobile, % on desktop
            const mPx = MOBILE_SCATTER_PX[idx];
            const dPct = DESKTOP_SCATTER[idx];
            const scatterLeft = isMobile ? `${mPx.left}px` : `${dPct.x}%`;
            const scatterTop  = isMobile ? `${mPx.top}px`  : `${dPct.y}%`;
            const scatterRot  = isMobile ? mPx.rot : dPct.rot;

            return (
              <motion.button
                key={p.key}
                type="button"
                aria-label={p.key as string}
                onClick={() => onPick(p.key)}
                className="absolute group focus:outline-none cursor-pointer"
                initial={{
                  left: scatterLeft,
                  top: scatterTop,
                  rotate: scatterRot,
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={
                  scattered
                    ? {
                        left: scatterLeft,
                        top: scatterTop,
                        rotate: scatterRot,
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
                    ? { scale: 1.06, y: -6, rotate: scatterRot * 0.4 }
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
