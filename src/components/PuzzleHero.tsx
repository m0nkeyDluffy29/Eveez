import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import logo from "../../assets/icons/eveez-logo.png";
import { type VerticalKey } from "./SectionShell";
import { PIECES } from "./PuzzleHeroPieces";

export default function PuzzleHero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<
    "scatter" | "assemble" | "logo" | "depart"
  >("scatter");
  const [target, setTarget] = useState<VerticalKey | null>(null);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  function onPick(k: VerticalKey) {
    if (phase !== "scatter") return;
    setTarget(k);
    setPhase("assemble");
    // sequence
    window.setTimeout(() => setPhase("logo"), 3300);
    window.setTimeout(() => setPhase("depart"), 3300);
    window.setTimeout(() => navigate({ to: `/${k}` as never }), 3300);
  }

  // Tile size in assembled state
  const TILE = 180;
  const GAP = 0;
  const isFlat = phase !== "scatter";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
      style={{
        backgroundImage: `
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
    `,
        backgroundSize: "40px 40px",
      }}
    >
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
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* left: logo */}
          <a href="/" className="flex items-center gap-2">
            {/* <motion.span
              layoutId="eveez-logo"
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--ev-orange)] to-[var(--ev-green)] text-background font-bold"
              initial={false}
              animate={{
                opacity: phase === "logo" || phase === "depart" ? 1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              E
            </motion.span> */}
            <img
              src={logo}
              alt="EVeez"
              className="h-15 w-auto object-contain"
              loading="lazy"
            />
          </a>

          {/* center: nav links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            <a
              href="/franchise"
              className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
            >
              Franchise
            </a>
            <a
              href="#fast-charging"
              className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
            >
              Fast Charging
            </a>
            <a
              href="/service"
              className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
            >
              Service
            </a>
            <a
              href="/tech-stack"
              className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
            >
              Tech Stack
            </a>
            <a
              href="/vehicle-rd"
              className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
            >
              Vehicle R&D
            </a>
            <a
              href="/training"
              className="text-sm text-white/80 hover:text-[var(--ev-orange)] transition"
            >
              Training Programmes
            </a>
          </nav>

          {/* right: CTA */}
          <div className="flex items-center">
            <a
              href="#franchise"
              className="ml-4 inline-flex items-center rounded-md bg-[#FF6A1A] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
            >
              Become A Partner
            </a>
          </div>
        </div>
      </header>

      {/* Hero copy — fades when assembling */}
      {/* Original hero copy — visible while pieces are scattered */}
      {/* Hero copy container to prevent layout shift during crossfade */}
      <div className="grid">
        <AnimatePresence>
          {phase === "scatter" && (
            <motion.div
              key="copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative z-20 mx-auto max-w-3xl px-6 pt-10 text-center col-start-1 row-start-1"
            >
              <h1 className="mt-5 text-5xl md:text-6xl font-semibold leading-[1.02]">
                Mobility for{" "}
                <span className="text-gradient-ev">Livelihoods</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-[var(--footer-text)]">
                Transforming Mobility Into Economic Opputunity
              </p>
              {/* <div className="mt-4 flex items-center justify-center gap-3"> 
                <a
                  href="#franchise"
                  className="inline-flex items-center rounded-full bg-[#FF6A1A] px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
                >
                  Become A Partner
                </a>
                <a
                  href="#ecosystem"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Explore Ecosystem
                </a>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === "assemble" || phase === "logo" || phase === "depart") && (
            <motion.div
              key="copy-assembled"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: phase === "depart" ? 0 : 1,
                y: phase === "depart" ? -20 : 0,
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative z-20 mx-auto max-w-3xl px-6 pt-10 text-center col-start-1 row-start-1"
            >
              <h1 className="mt-5 text-5xl md:text-6xl font-semibold leading-[1.02]">
                India's EV{" "}
                <span className="text-gradient-ev">Mobility Ecosystem</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Building livelihoods through electric mobility, technology,
                infrastructure, and franchise growth.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a
                  href="#franchise"
                  className="inline-flex items-center rounded-full bg-[#FF6A1A] px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
                >
                  Become A Partner
                </a>
                <a
                  href="#ecosystem"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Explore Ecosystem
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Puzzle stage */}
      <div className="relative z-10 mx-auto max-w-7xl h-[78vh] md:h-[72vh]">
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
              className="absolute group focus:outline-none"
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
