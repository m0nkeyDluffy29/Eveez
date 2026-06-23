import puzzleFastCharging from "./puzzles/puzzle-fast-charging";
import puzzleFranchise from "./puzzles/puzzle-franchise";
import puzzleService from "./puzzles/puzzle-service";
import puzzleTechStack from "./puzzles/puzzle-tech-stack";
import puzzleTraining from "./puzzles/puzzle-training";
import puzzleVehicle from "./puzzles/puzzle-vehicle";
import { VerticalKey } from "./SectionShell";

export type Piece = {
  key: VerticalKey;
  Component: any;
  x: number;
  y: number;
  rot: number;
  delay: number;
  col: 0 | 1 | 2;
  row: 0 | 1;
  w: number;
  h: number;
  ox: number;
  oy: number;
};

export const PIECES: Piece[] = [
  {
    key: "franchise",
    Component: puzzleFranchise,
    x: 4,
    y: 18,
    rot: -14,
    delay: 0.0,
    col: 0,
    row: 0,
    w: 333,
    h: 278,
    ox: -49.1,
    oy: -24.6,
  },
  {
    key: "fast-charging",
    Component: puzzleFastCharging,
    x: 62,
    y: 14,
    rot: 11,
    delay: 0.1,
    col: 1,
    row: 0,
    w: 278,
    h: 333,
    ox: -49.1,
    oy: -24.6,
  },
  {
    key: "service",
    Component: puzzleService,
    x: 74,
    y: 58,
    rot: -7,
    delay: 0.2,
    col: 2,
    row: 0,
    w: 333,
    h: 278,
    ox: -103.7,
    oy: -24.6,
  },
  {
    key: "tech-stack",
    Component: puzzleTechStack,
    x: 0,
    y: 62,
    rot: 9,
    delay: 0.15,
    col: 0,
    row: 1,
    w: 278,
    h: 333,
    ox: -49.1,
    oy: -79.2,
  },
  {
    key: "vehicle-rd",
    Component: puzzleVehicle,
    x: 37,
    y: 70,
    rot: -16,
    delay: 0.05,
    col: 1,
    row: 1,
    w: 333,
    h: 278,
    ox: -103.7,
    oy: -24.6,
  },
  {
    key: "training",
    Component: puzzleTraining,
    x: 32,
    y: 10,
    rot: -4,
    delay: 0.25,
    col: 2,
    row: 1,
    w: 334,
    h: 334,
    ox: -103.7,
    oy: -79.2,
  },
];
