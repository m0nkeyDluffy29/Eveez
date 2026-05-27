import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import {
  Store,
  Zap,
  Wrench,
  Cpu,
  Car,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { VERTICALS, type VerticalKey } from "./SectionShell";

type Piece = {
  key: VerticalKey;
  title: string;
  Icon: LucideIcon;
  accent: string;
  // initial scattered transform
  x: number; // %
  y: number; // %
  rot: number; // deg
  size: number; // px
  delay: number;
  // grid position when assembled (col, row in 3x2)
  col: 0 | 1 | 2;
  row: 0 | 1;
};

const ORANGE = "oklch(0.74 0.19 55)";
const GREEN = "oklch(0.78 0.18 152)";

const PIECES: Piece[] = [
  { key: "franchise",     title: "Franchise",          Icon: Store,         accent: ORANGE, x: 12, y: 18, rot: -14, size: 200, delay: 0.0, col: 0, row: 0 },
  { key: "fast-charging", title: "Fast Charging",      Icon: Zap,           accent: GREEN,  x: 70, y: 14, rot: 11,  size: 220, delay: 0.1, col: 1, row: 0 },
  { key: "service",       title: "Service",            Icon: Wrench,        accent: ORANGE, x: 82, y: 58, rot: -7,  size: 190, delay: 0.2, col: 2, row: 0 },
  { key: "tech-stack",    title: "Tech Stack",         Icon: Cpu,           accent: GREEN,  x: 8,  y: 62, rot: 9,   size: 210, delay: 0.15, col: 0, row: 1 },
  { key: "vehicle-rd",    title: "Vehicle R&D",        Icon: Car,           accent: ORANGE, x: 45, y: 70, rot: -16, size: 230, delay: 0.05, col: 1, row: 1 },
  { key: "training",      title: "Training Programmes",Icon: GraduationCap, accent: GREEN,  x: 50, y: 30, rot: 6,   size: 180, delay: 0.25, col: 2, row: 1 },
];

// Puzzle tile shape via SVG path — square with knobs/holes per side.
// Sides: top, right, bottom, left where 1 = knob (tab out), -1 = hole (in), 0 = flat.
type Sides = [number, number, number, number];
function piecePath(size: number, [t, r, b, l]: Sides) {
  const s = size;
  const k = size * 0.18; // knob radius
  const m = size / 2;
  const knob = (sign: number, axis: "x" | "y") => {
    if (sign === 0) return "";
    const sweep = sign > 0 ? 1 : 0;
    if (axis === "x") return ` a ${k} ${k} 0 1 ${sweep} 0 ${sign * 2 * k * (axis === "x" ? -1 : 1)}`;
    return "";
  };
  // We'll build a clean path manually segment by segment.
  // Top edge: goes from (0,0) to (s,0), with knob at center along y axis (out = -, in = +)
  let d = `M 0 0`;
  // top
  d += ` L ${m - k} 0`;
  if (t !== 0) {
    const dy = t > 0 ? -2 * k : 2 * k;
    const sweep = t > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} ${2 * k} 0`;
    void dy;
  }
  d += ` L ${s} 0`;
  // right
  d += ` L ${s} ${m - k}`;
  if (r !== 0) {
    const sweep = r > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} 0 ${2 * k}`;
  }
  d += ` L ${s} ${s}`;
  // bottom (right -> left)
  d += ` L ${m + k} ${s}`;
  if (b !== 0) {
    const sweep = b > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} ${-2 * k} 0`;
  }
  d += ` L 0 ${s}`;
  // left (bottom -> top)
  d += ` L 0 ${m + k}`;
  if (l !== 0) {
    const sweep = l > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} 0 ${-2 * k}`;
  }
  d += ` Z`;
  return d;
}

// Define sides per (col,row) so adjacent edges complement (knob/hole)
function sidesFor(col: 0 | 1 | 2, row: 0 | 1): Sides {
  // top, right, bottom, left
  const top = row === 0 ? 0 : (col + row) % 2 === 0 ? 1 : -1;
  const bottom = row === 1 ? 0 : (col + row + 1) % 2 === 0 ? -1 : 1;
  const left = col === 0 ? 0 : (col + row) % 2 === 0 ? -1 : 1;
  const right = col === 2 ? 0 : (col + row + 1) % 2 === 0 ? 1 : -1;
  return [top, right, bottom, left];
}

export default function PuzzleHero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"scatter" | "assemble" | "logo" | "depart">("scatter");
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
    window.setTimeout(() => setPhase("logo"), 1300);
    window.setTimeout(() => setPhase("depart"), 2300);
    window.setTimeout(() => navigate({ to: `/${k}` as never }), 2700);
  }

  // Tile size in assembled state
  const TILE = 140;
  const GAP = 0;

  const streaks = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        top: 8 + ((i * 13) % 84),
        delay: (i * 1.7) % 9,
        dur: 6 + (i % 4),
        color: i % 2 === 0 ? ORANGE : GREEN,
      })),
    []
  );

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-cinematic">
      {/* grid + glow */}
      <div className="grid-lines absolute inset-0" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, oklch(0.74 0.19 55 / 0.25), transparent)" }} />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[44rem] w-[44rem] rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, oklch(0.78 0.18 152 / 0.22), transparent)" }} />

      {/* light streaks */}
      {streaks.map((s, i) => (
        <span
          key={i}
          className="streak"
          style={{
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
          }}
        />
      ))}

      {/* cursor follower */}
      <div className="cursor-glow hidden md:block" style={{ left: mouse.x, top: mouse.y, opacity: phase === "scatter" ? 1 : 0 }} />

      {/* Top nav */}
      <header className="relative z-30">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <motion.div
            layoutId="eveez-logo"
            className="flex items-center gap-2"
            initial={false}
            animate={{ opacity: phase === "logo" || phase === "depart" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--ev-orange)] to-[var(--ev-green)] text-background font-bold">
              E
            </span>
            <span className="font-display text-lg tracking-tight">EVeez</span>
          </motion.div>

          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground hidden md:block">
            EV Mobility Ecosystem
          </div>
        </div>
      </header>

      {/* Hero copy — fades when assembling */}
      <AnimatePresence>
        {phase === "scatter" && (
          <motion.div
            key="copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 mx-auto max-w-3xl px-6 pt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ev-green)]" />
              Six verticals. One ecosystem.
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl font-semibold leading-[1.02]">
              The pieces of <span className="text-gradient-ev">EVeez</span>.
              <br /> Click any to begin.
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              A puzzle that assembles itself — just like the future of mobility.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Puzzle stage */}
      <div className="relative z-10 mx-auto max-w-7xl h-[78vh] md:h-[72vh]">
        {PIECES.map((p) => {
          const sides = sidesFor(p.col, p.row);
          const path = piecePath(TILE, sides);
          const id = `pp-${p.key}`;

          // assembled position: center the 3x2 grid of TILE
          const gridW = 3 * TILE + 2 * GAP;
          const gridH = 2 * TILE + GAP;
          const targetX = `calc(50% - ${gridW / 2}px + ${p.col * (TILE + GAP)}px)`;
          const targetY = `calc(50% - ${gridH / 2}px + ${p.row * (TILE + GAP)}px)`;

          const scattered = phase === "scatter";
          const assembling = phase === "assemble" || phase === "logo" || phase === "depart";

          return (
            <motion.button
              key={p.key}
              type="button"
              aria-label={p.title}
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
                      scale: phase === "depart" ? 0.2 : 1,
                      opacity: phase === "depart" ? 0 : 1,
                      x: 0,
                      y: 0,
                    }
                  : undefined
              }
              transition={
                scattered
                  ? {
                      left: { duration: 1, delay: p.delay, ease: [0.22, 1, 0.36, 1] },
                      top: { duration: 1, delay: p.delay, ease: [0.22, 1, 0.36, 1] },
                      rotate: { duration: 1, delay: p.delay, ease: [0.22, 1, 0.36, 1] },
                      scale: { duration: 0.8, delay: p.delay },
                      opacity: { duration: 0.6, delay: p.delay },
                      y: { duration: 5 + (p.col + p.row), repeat: Infinity, ease: "easeInOut", delay: p.delay },
                    }
                  : {
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                      delay: phase === "assemble" ? p.delay * 0.4 : 0,
                    }
              }
              whileHover={scattered ? { scale: 1.06, y: -6, rotate: p.rot * 0.4 } : undefined}
              whileTap={scattered ? { scale: 0.96 } : undefined}
              style={{ width: TILE, height: TILE, transformOrigin: "center" }}
            >
              <svg
                width={TILE}
                height={TILE}
                viewBox={`0 0 ${TILE} ${TILE}`}
                className="overflow-visible"
              >
                <defs>
                  <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(1 0 0 / 0.16)" />
                    <stop offset="100%" stopColor="oklch(1 0 0 / 0.04)" />
                  </linearGradient>
                  <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={p.accent} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={p.accent} stopOpacity="0.1" />
                  </linearGradient>
                  <radialGradient id={`${id}-spec`} cx="0.3" cy="0.1" r="0.7">
                    <stop offset="0%" stopColor="oklch(1 0 0 / 0.35)" />
                    <stop offset="100%" stopColor="oklch(1 0 0 / 0)" />
                  </radialGradient>
                  <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor={p.accent} floodOpacity="0.25" />
                  </filter>
                </defs>
                <g filter={`url(#${id}-shadow)`}>
                  <path d={path} fill={`url(#${id}-fill)`} stroke={`url(#${id}-stroke)`} strokeWidth="1.2" />
                  <path d={path} fill={`url(#${id}-spec)`} opacity="0.9" />
                </g>
              </svg>

              {/* content overlay */}
              <div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-4"
                style={{ transform: `rotate(0deg)` }}
              >
                <div
                  className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${p.accent}, transparent)`,
                    boxShadow: `0 8px 24px -8px ${p.accent}`,
                  }}
                >
                  <p.Icon className="h-5 w-5 text-background" strokeWidth={2.2} />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  {p.title}
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Center aurora when assembling */}
        <AnimatePresence>
          {(phase === "assemble" || phase === "logo") && (
            <motion.div
              key="aurora"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.74 0.19 55 / 0.35), oklch(0.78 0.18 152 / 0.22) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Logo reveal */}
        <AnimatePresence>
          {phase === "logo" && (
            <motion.div
              key="logo-pulse"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: [1, 1.08, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center"
            >
              <div className="text-7xl md:text-8xl font-semibold text-gradient-ev font-display">
                EVeez
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Assembling {target ? VERTICALS[target].title : ""}…
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <AnimatePresence>
        {phase === "scatter" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-6 left-0 right-0 z-20 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            ◦ click any piece to assemble ◦
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
