import { APERTURES, ROOMS, SUN_ARC, SUNRISE, SUNSET, type Rect, type RoomId } from './building';

export type Point = [number, number];
export interface Beam { aperture: string; room: RoomId; points: Point[] }

/** Sun elevation in degrees, measured from the left horizon. Null when the sun is down. */
export function sunAngle(t: number): number | null {
  if (!(t > SUNRISE && t < SUNSET)) return null;
  return ((t - SUNRISE) / (SUNSET - SUNRISE)) * 180;
}

/** Where the sun is drawn on its arc. */
export function sunPosition(t: number): { x: number; y: number } | null {
  const deg = sunAngle(t);
  if (deg === null) return null;
  const a = (deg * Math.PI) / 180;
  return { x: SUN_ARC.cx - SUN_ARC.rx * Math.cos(a), y: SUN_ARC.cy - SUN_ARC.ry * Math.sin(a) };
}

/** Sutherland-Hodgman clip of a convex polygon against an axis-aligned rectangle. */
function clipToRect(poly: Point[], r: Rect): Point[] {
  type Edge = { inside: (p: Point) => boolean; cut: (p: Point, q: Point) => Point };
  const atX = (x: number) => (p: Point, q: Point): Point => [x, p[1] + ((q[1] - p[1]) * (x - p[0])) / (q[0] - p[0])];
  const atY = (y: number) => (p: Point, q: Point): Point => [p[0] + ((q[0] - p[0]) * (y - p[1])) / (q[1] - p[1]), y];
  const edges: Edge[] = [
    { inside: (p) => p[0] >= r.x0, cut: atX(r.x0) },
    { inside: (p) => p[0] <= r.x1, cut: atX(r.x1) },
    { inside: (p) => p[1] >= r.y0, cut: atY(r.y0) },
    { inside: (p) => p[1] <= r.y1, cut: atY(r.y1) },
  ];
  let out = poly;
  for (const e of edges) {
    const src = out;
    out = [];
    for (let i = 0; i < src.length; i++) {
      const p = src[i]!, q = src[(i + 1) % src.length]!;
      const pin = e.inside(p), qin = e.inside(q);
      if (pin && qin) out.push(q);
      else if (pin && !qin) out.push(e.cut(p, q));
      else if (!pin && qin) out.push(e.cut(p, q), q);
    }
    if (out.length === 0) break;
  }
  return out;
}

function area(poly: Point[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i]!, [x1, y1] = poly[(i + 1) % poly.length]!;
    s += x0 * y1 - x1 * y0;
  }
  return Math.abs(s) / 2;
}

const REACH = 4000;
const MIN_AREA = 250;

/** Shafts of direct light inside the building at time t (hours, 0 to 24). */
export function beams(t: number): Beam[] {
  const deg = sunAngle(t);
  if (deg === null) return [];
  const a = (deg * Math.PI) / 180;
  const dx = Math.cos(a) * REACH, dy = Math.sin(a) * REACH;
  const out: Beam[] = [];
  for (const ap of APERTURES) {
    // Light must travel into the room: rightward through the morning side, leftward through the evening side.
    const vertical = ap.a[0] === ap.b[0];
    if (vertical) {
      const room = ROOMS[ap.room];
      const entersRight = ap.a[0] <= room.x0 + 0.5;
      if (entersRight ? dx <= 0 : dx >= 0) continue;
    }
    const strip: Point[] = [ap.a, ap.b, [ap.b[0] + dx, ap.b[1] + dy], [ap.a[0] + dx, ap.a[1] + dy]];
    const points = clipToRect(strip, ROOMS[ap.room]).map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10] as Point);
    if (points.length >= 3 && area(points) >= MIN_AREA) out.push({ aperture: ap.id, room: ap.room, points });
  }
  return out;
}

/** Rooms the light really enters at time t: a shaft has to come down past the middle of the room, not just graze the top of a wall. */
export function litRooms(t: number): RoomId[] {
  const out = new Set<RoomId>();
  for (const b of beams(t)) {
    const r = ROOMS[b.room];
    const reach = Math.max(...b.points.map((p) => p[1]));
    if (reach >= (r.y0 + r.y1) / 2) out.add(b.room);
  }
  return [...out];
}

/** Where a shaft meets the floor of its room, if it reaches it. */
export function landing(b: Beam): { x0: number; x1: number; y: number } | null {
  const r = ROOMS[b.room];
  const xs = b.points.filter((p) => Math.abs(p[1] - r.y1) < 0.6).map((p) => p[0]);
  if (xs.length < 2) return null;
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  return x1 - x0 < 4 ? null : { x0, x1, y: r.y1 };
}

/** Where a shaft ends on the far wall of its room, when it does not come down to the floor first. */
export function wallLanding(b: Beam): { x: number; y0: number; y1: number } | null {
  const r = ROOMS[b.room];
  const ap = APERTURES.find((a) => a.id === b.aperture)!;
  for (const x of [r.x0, r.x1]) {
    if (ap.a[0] === x && ap.b[0] === x) continue; // the wall the light came in through
    const ys = b.points.filter((p) => Math.abs(p[0] - x) < 0.6).map((p) => p[1]);
    if (ys.length < 2) continue;
    const y0 = Math.min(...ys), y1 = Math.max(...ys);
    if (y1 - y0 >= 6) return { x, y0, y1 };
  }
  return null;
}

export const beamPath = (b: Beam): string => 'M' + b.points.map((p) => p.join(' ')).join('L') + 'Z';
