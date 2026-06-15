import { useEffect, useRef, useState } from "react";
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
  fillStart: string;
  fillEnd: string;
  textColor: string;
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

const PIECES: Piece[] = [
  {
    key: "franchise",
    title: "Franchise",
    Icon: Store,
    accent: "oklch(0.683 0.2091 36.11)",
    fillStart: "oklch(0.683 0.2091 36.11)",
    fillEnd: "oklch(0.683 0.2091 36.11)",
    textColor: "#ffffff",
    x: 12,
    y: 18,
    rot: -14,
    size: 200,
    delay: 0.0,
    col: 0,
    row: 0,
  },
  {
    key: "fast-charging",
    title: "Fast Charging",
    Icon: Zap,
    accent: "oklch(0.943 0.0296 38.56)",
    fillStart: "oklch(0.943 0.0296 38.56)",
    fillEnd: "oklch(0.943 0.0296 38.56)",
    textColor: "oklch(0.683 0.2091 36.11)",
    x: 70,
    y: 14,
    rot: 11,
    size: 220,
    delay: 0.1,
    col: 1,
    row: 0,
  },
  {
    key: "service",
    title: "Service",
    Icon: Wrench,
    accent: "oklch(0.683 0.2091 36.11)",
    fillStart: "oklch(0.683 0.2091 36.11)",
    fillEnd: "oklch(0.683 0.2091 36.11)",
    textColor: "#ffffff",
    x: 82,
    y: 58,
    rot: -7,
    size: 190,
    delay: 0.2,
    col: 2,
    row: 0,
  },
  {
    key: "tech-stack",
    title: "Tech Stack",
    Icon: Cpu,
    accent: "oklch(0.943 0.0296 38.56)",
    fillStart: "oklch(0.943 0.0296 38.56)",
    fillEnd: "oklch(0.943 0.0296 38.56)",
    textColor: "oklch(0.683 0.2091 36.11)",
    x: 8,
    y: 62,
    rot: 9,
    size: 210,
    delay: 0.15,
    col: 0,
    row: 1,
  },
  {
    key: "vehicle-rd",
    title: "Vehicle R&D",
    Icon: Car,
    accent: "oklch(0.683 0.2091 36.11)",
    fillStart: "oklch(0.683 0.2091 36.11)",
    fillEnd: "oklch(0.683 0.2091 36.11)",
    textColor: "#ffffff",
    x: 45,
    y: 70,
    rot: -16,
    size: 230,
    delay: 0.05,
    col: 1,
    row: 1,
  },
  {
    key: "training",
    title: "Training Programmes",
    Icon: GraduationCap,
    accent: "oklch(0.943 0.0296 38.56)",
    fillStart: "oklch(0.943 0.0296 38.56)",
    fillEnd: "oklch(0.943 0.0296 38.56)",
    textColor: "oklch(0.683 0.2091 36.11)",
    x: 50,
    y: 30,
    rot: 6,
    size: 180,
    delay: 0.25,
    col: 2,
    row: 1,
  },
];

// Puzzle tile shape via SVG path — square with knobs/holes per side.
// Sides: top, right, bottom, left where 1 = knob (tab out), -1 = hole (in), 0 = flat.
type Sides = [number, number, number, number];
function piecePath(size: number, [t, r, b, l]: Sides) {
  const s = size;
  const k = size * 0.18; // knob radius
  const m = size / 2;
  const rc = 12; // corner radius

  // Start at (rc, 0)
  let d = `M ${rc} 0`;

  // top edge
  d += ` L ${m - k} 0`;
  if (t !== 0) {
    const sweep = t > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} ${2 * k} 0`;
  }
  d += ` L ${s - rc} 0`;

  // top-right corner
  d += ` a ${rc} ${rc} 0 0 1 ${rc} ${rc}`;

  // right edge
  d += ` L ${s} ${m - k}`;
  if (r !== 0) {
    const sweep = r > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} 0 ${2 * k}`;
  }
  d += ` L ${s} ${s - rc}`;

  // bottom-right corner
  d += ` a ${rc} ${rc} 0 0 1 ${-rc} ${rc}`;

  // bottom edge (right -> left)
  d += ` L ${m + k} ${s}`;
  if (b !== 0) {
    const sweep = b > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} ${-2 * k} 0`;
  }
  d += ` L ${rc} ${s}`;

  // bottom-left corner
  d += ` a ${rc} ${rc} 0 0 1 ${-rc} ${-rc}`;

  // left edge (bottom -> top)
  d += ` L 0 ${m + k}`;
  if (l !== 0) {
    const sweep = l > 0 ? 1 : 0;
    d += ` a ${k} ${k} 0 1 ${sweep} 0 ${-2 * k}`;
  }
  d += ` L 0 ${rc}`;

  // top-left corner
  d += ` a ${rc} ${rc} 0 0 1 ${rc} ${-rc}`;

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
    window.setTimeout(() => setPhase("logo"), 1300);
    window.setTimeout(() => setPhase("depart"), 2300);
    window.setTimeout(() => navigate({ to: `/${k}` as never }), 2700);
  }

  // Tile size in assembled state
  const TILE = 140;
  const GAP = 0;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      {/* Top nav (in-hero) */}
      <header className="relative z-30 border-b-2 border-orange">
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
              src="../../assets/icons/eveez-logo.png"
              alt="EVeez"
              className="h-8 w-auto object-contain"
              loading="lazy"
            />
          </a>

          {/* center: nav links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            <a
              href="#franchise"
              className="text-sm text-white/80 hover:text-white transition"
            >
              Franchise
            </a>
            <a
              href="#fast-charging"
              className="text-sm text-white/80 hover:text-white transition"
            >
              Fast Charging
            </a>
            <a
              href="#service"
              className="text-sm text-white/80 hover:text-white transition"
            >
              Service
            </a>
            <a
              href="#tech-stack"
              className="text-sm text-white/80 hover:text-white transition"
            >
              Tech Stack
            </a>
            <a
              href="#vehicle-rd"
              className="text-sm text-white/80 hover:text-white transition"
            >
              Vehicle R&D
            </a>
            <a
              href="#training"
              className="text-sm text-white/80 hover:text-white transition"
            >
              Training Programmes
            </a>
          </nav>

          {/* right: CTA */}
          <div className="flex items-center">
            <a
              href="#franchise"
              className="ml-4 inline-flex items-center rounded-full bg-[#FF6A1A] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#ea5b0c] transition"
            >
              Become A Partner
            </a>
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
            <h1 className="mt-5 text-5xl md:text-7xl font-semibold leading-[1.02]">
              Mobility for <span className="text-gradient-ev">Livelihoods</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Building livelihoods through electric mobility, technology,
              infrastructure, and franchise growth.
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
          const assembling =
            phase === "assemble" || phase === "logo" || phase === "depart";

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
              style={{ width: TILE, height: TILE, transformOrigin: "center" }}
            >
              <svg
                width={TILE}
                height={TILE}
                viewBox={`0 0 ${TILE} ${TILE}`}
                className="overflow-visible"
              >
                <g>
                  {/* 3D Depth Shadow */}
                  <path
                    d={path}
                    fill="#7F4535"
                    stroke="none"
                    transform="translate(-6, 8)"
                    opacity="0.9"
                  />
                  {/* Front Face */}
                  <path
                    d={path}
                    fill={p.fillStart}
                    stroke={p.accent}
                    strokeWidth="1"
                  />
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
                  }}
                >
                  <p.Icon
                    className="h-5 w-5"
                    style={{ color: p.textColor }}
                    strokeWidth={2.2}
                  />
                </div>
                <div
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: p.textColor }}
                >
                  {p.title}
                </div>
              </div>
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
