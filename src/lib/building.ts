// Geometry of the dealership in section. One source for the drawing and for the light.
// Units are SVG user units in a 1000 x 770 drawing; y grows downward.

export type RoomId = 'assistant' | 'arrival' | 'valuation' | 'showroom' | 'street' | 'desk' | 'workshop';

export interface Rect { x0: number; y0: number; x1: number; y1: number }

export const VIEW = { w: 1000, h: 812 } as const;

/** Levels: undersides and tops of the horizontal structure. */
export const LEVEL = {
  roofTop: 156,
  roofUnder: 184,
  slabTop: 396,
  slabUnder: 412,
  ground: 640,
  groundUnder: 660,
  basementFloor: 742,
} as const;

/** Vertical structure, as x extents. */
export const WALL = {
  left: { x0: 66, x1: 94 },
  ab: { x0: 328, x1: 342 },
  bc: { x0: 546, x1: 560 },
  cd: { x0: 710, x1: 724 },
  right: { x0: 906, x1: 934 },
} as const;

/** Clear interior of each room. */
export const ROOMS: Record<RoomId, Rect> = {
  assistant: { x0: WALL.left.x1, y0: LEVEL.roofUnder, x1: WALL.ab.x0, y1: LEVEL.slabTop },
  valuation: { x0: WALL.ab.x1, y0: LEVEL.roofUnder, x1: WALL.bc.x0, y1: LEVEL.slabTop },
  desk: { x0: WALL.cd.x1, y0: LEVEL.roofUnder, x1: WALL.right.x0, y1: LEVEL.slabTop },
  arrival: { x0: WALL.left.x1, y0: LEVEL.slabUnder, x1: WALL.bc.x0, y1: LEVEL.ground },
  showroom: { x0: WALL.bc.x1, y0: LEVEL.roofUnder, x1: WALL.cd.x0, y1: LEVEL.ground },
  street: { x0: WALL.cd.x1, y0: LEVEL.slabUnder, x1: WALL.right.x0, y1: LEVEL.ground },
  workshop: { x0: WALL.left.x1, y0: LEVEL.groundUnder, x1: WALL.right.x0, y1: LEVEL.basementFloor },
};

export interface Aperture {
  id: string;
  room: RoomId;
  /** The opening as a segment on the inner face of the wall or roof. */
  a: [number, number];
  b: [number, number];
}

/** Openings that admit direct sun. In this drawing the sun rises on the left. */
export const APERTURES: Aperture[] = [
  { id: 'clerestory-am', room: 'assistant', a: [WALL.left.x1, 204], b: [WALL.left.x1, 316] },
  { id: 'shopfront-am', room: 'arrival', a: [WALL.left.x1, 440], b: [WALL.left.x1, 626] },
  { id: 'lantern-valuation', room: 'valuation', a: [352, LEVEL.roofUnder], b: [402, LEVEL.roofUnder] },
  { id: 'lantern-atrium', room: 'showroom', a: [600, LEVEL.roofUnder], b: [670, LEVEL.roofUnder] },
  { id: 'shopfront-pm', room: 'street', a: [WALL.right.x0, 440], b: [WALL.right.x0, 626] },
  { id: 'clerestory-pm', room: 'desk', a: [WALL.right.x0, 204], b: [WALL.right.x0, 316] },
];

/** The sun's drawn path above the roof. */
export const SUN_ARC = { cx: 500, cy: 150, rx: 470, ry: 122 } as const;

export const SUNRISE = 6;
export const SUNSET = 19;
