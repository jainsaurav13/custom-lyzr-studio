/**
 * Jigsaw geometry for the block field.
 *
 * The fourteen blocks are laid on a five-by-three lattice with one cell left
 * empty, so the assembled platform has an irregular silhouette rather than
 * reading as a table. Every seam carries a semicircular knob: the piece on one
 * side of it bulges out, the piece on the other is cut in by exactly the same
 * arc, so the two only fit each other.
 *
 * Paths are emitted in cell units (0..1 on both axes) and drawn into an SVG
 * whose viewBox is widened by `KNOB` on every side, which is where the knobs
 * live. Nothing here knows a colour or a pixel.
 */

export const COLS = 5;
export const ROWS = 3;

/** Knob radius, as a fraction of a cell. Also the viewBox bleed. */
export const KNOB = 0.13;

/** The lattice cell each block occupies; the sixth of row 0 is left empty. */
export const CELLS: Array<{ row: number; col: number }> = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 0, col: 3 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 2, col: 0 },
  { row: 2, col: 1 },
  { row: 2, col: 2 },
  { row: 2, col: 3 },
  { row: 2, col: 4 },
];

const OCCUPIED = new Set(CELLS.map((cell) => `${cell.row}:${cell.col}`));
const has = (row: number, col: number) => OCCUPIED.has(`${row}:${col}`);

/**
 * Which way each seam bulges. Deterministic so the server and the browser draw
 * the same platform, and mixed enough that the field does not look striped.
 */
function seam(row: number, col: number, axis: 0 | 1): 1 | -1 {
  const n = Math.sin((row + 1) * 12.9898 + (col + 1) * 78.233 + axis * 37.719) * 43758.5453;
  return n - Math.floor(n) > 0.5 ? 1 : -1;
}

/** +1 knob bulges out of the piece, -1 is cut into it, 0 is a straight edge. */
type Edge = 1 | -1 | 0;

function edges(row: number, col: number): { top: Edge; right: Edge; bottom: Edge; left: Edge } {
  return {
    top: has(row - 1, col) ? (-seam(row - 1, col, 1) as Edge) : 0,
    bottom: has(row + 1, col) ? seam(row, col, 1) : 0,
    left: has(row, col - 1) ? (-seam(row, col - 1, 0) as Edge) : 0,
    right: has(row, col + 1) ? seam(row, col, 0) : 0,
  };
}

/**
 * One edge of a piece, walked in the direction the outline travels. `out` is
 * the side the knob bulges towards, expressed as a unit vector, so the same
 * routine serves all four edges.
 */
function edgePath(
  from: [number, number],
  to: [number, number],
  out: [number, number],
  sign: Edge,
): string {
  if (sign === 0) return `L ${to[0]} ${to[1]}`;

  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const mid: [number, number] = [from[0] + dx / 2, from[1] + dy / 2];
  // Along the edge, a chord of exactly one knob diameter: the arc across it is
  // a half circle, which is what makes the knob read as a jigsaw tab.
  const a: [number, number] = [mid[0] - dx * KNOB, mid[1] - dy * KNOB];
  const b: [number, number] = [mid[0] + dx * KNOB, mid[1] + dy * KNOB];
  // Sweep the arc towards `out` for a knob, away from it for a socket.
  const cross = dx * out[1] - dy * out[0];
  const sweep = cross * sign > 0 ? 0 : 1;

  return [
    `L ${a[0]} ${a[1]}`,
    `A ${KNOB} ${KNOB} 0 0 ${sweep} ${b[0]} ${b[1]}`,
    `L ${to[0]} ${to[1]}`,
  ].join(" ");
}

/** The closed outline of the piece at this lattice cell, in cell units. */
export function piecePath(row: number, col: number): string {
  const e = edges(row, col);
  return [
    "M 0 0",
    edgePath([0, 0], [1, 0], [0, -1], e.top),
    edgePath([1, 0], [1, 1], [1, 0], e.right),
    edgePath([1, 1], [0, 1], [0, 1], e.bottom),
    edgePath([0, 1], [0, 0], [-1, 0], e.left),
    "Z",
  ].join(" ");
}

/** Every piece, in the order the blocks are listed. */
export const PIECES = CELLS.map((cell) => ({
  ...cell,
  path: piecePath(cell.row, cell.col),
}));
