import { describe, expect, it } from 'vitest';
import { ROOMS, type RoomId } from '../src/lib/building';
import { beams, landing, litRooms, sunAngle, sunPosition, wallLanding } from '../src/lib/sun';
import { STOPS as DAY } from '../src/data/stops';

const STOPS: [number, RoomId][] = [
  [7, 'assistant'],
  [8.5, 'arrival'],
  [10.5, 'valuation'],
  [12.5, 'showroom'],
  [14.5, 'street'],
  [16.5, 'desk'],
];

describe('sunAngle', () => {
  it('is null outside daylight', () => {
    expect(sunAngle(5)).toBeNull();
    expect(sunAngle(6)).toBeNull();
    expect(sunAngle(19)).toBeNull();
    expect(sunAngle(22)).toBeNull();
  });
  it('is 90 degrees at 12:30 and rises from the left', () => {
    expect(sunAngle(12.5)).toBeCloseTo(90, 5);
    expect(sunAngle(7)!).toBeLessThan(sunAngle(10)!);
  });
});

describe('sunPosition', () => {
  it('moves left to right and is highest at 12:30', () => {
    const a = sunPosition(7)!, b = sunPosition(12.5)!, c = sunPosition(17)!;
    expect(a.x).toBeLessThan(b.x);
    expect(b.x).toBeLessThan(c.x);
    expect(b.y).toBeLessThan(a.y);
    expect(b.y).toBeLessThan(c.y);
  });
  it('is null at night', () => expect(sunPosition(22)).toBeNull());
});

describe('beams', () => {
  it('returns nothing outside daylight', () => {
    for (const t of [0, 5, 6, 19, 22, 24]) expect(beams(t)).toEqual([]);
  });

  it.each(STOPS)('at %s the light reaches the %s room', (t, room) => {
    expect(litRooms(t)).toContain(room);
  });

  it('never produces NaN and keeps every beam inside its room', () => {
    for (let t = 6.05; t < 19; t += 0.05) {
      for (const b of beams(t)) {
        const r = ROOMS[b.room];
        expect(b.points.length).toBeGreaterThanOrEqual(3);
        for (const [x, y] of b.points) {
          expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
          expect(x).toBeGreaterThanOrEqual(r.x0 - 0.01);
          expect(x).toBeLessThanOrEqual(r.x1 + 0.01);
          expect(y).toBeGreaterThanOrEqual(r.y0 - 0.01);
          expect(y).toBeLessThanOrEqual(r.y1 + 0.01);
        }
      }
    }
  });

  it('east rooms are lit in the morning, west rooms in the afternoon', () => {
    expect(litRooms(7.5)).not.toContain('desk');
    expect(litRooms(7.5)).not.toContain('street');
    expect(litRooms(17)).not.toContain('assistant');
    expect(litRooms(17)).not.toContain('arrival');
  });

  it('lights exactly the expected rooms at the key hours', () => {
    expect(new Set(litRooms(7))).toEqual(new Set(['assistant', 'arrival']));
    expect(new Set(litRooms(12.5))).toEqual(new Set(['valuation', 'showroom']));
    expect(new Set(litRooms(16.5))).toEqual(new Set(['desk', 'street']));
  });

  it('every daytime stop in the site data has its room in the light', () => {
    for (const s of DAY) if (s.room && s.room !== 'workshop' && s.time > 6 && s.time < 19) expect(litRooms(s.time), s.id).toContain(s.room);
  });

  it('at 12:30 the atrium shaft falls straight down onto the floor under its lantern', () => {
    const b = beams(12.5).find((x) => x.aperture === 'lantern-atrium')!;
    expect(landing(b)).toEqual({ x0: 600, x1: 670, y: ROOMS.showroom.y1 });
  });

  it('a shaft that only grazes a wall does not land', () => {
    const graze = beams(7).find((x) => x.aperture === 'lantern-valuation');
    if (graze) expect(landing(graze)).toBeNull();
  });

  it('at 07:00 the morning shaft crosses the assistant room and ends on its far wall', () => {
    const b = beams(7).find((x) => x.aperture === 'clerestory-am')!;
    expect(landing(b)).toBeNull();
    const w = wallLanding(b)!;
    expect(w.x).toBe(ROOMS.assistant.x1);
    expect(w.y0).toBeGreaterThan(ROOMS.assistant.y0);
    expect(w.y1).toBeLessThan(ROOMS.assistant.y1);
  });

  it('a shaft never ends on the wall it came in through', () => {
    for (let t = 6.2; t < 19; t += 0.2) for (const b of beams(t)) {
      const w = wallLanding(b);
      if (w && (b.aperture === 'clerestory-am' || b.aperture === 'shopfront-am')) expect(w.x).toBe(ROOMS[b.room].x1);
      if (w && (b.aperture === 'clerestory-pm' || b.aperture === 'shopfront-pm')) expect(w.x).toBe(ROOMS[b.room].x0);
    }
  });

  it('the workshop is below ground and never gets sunlight', () => {
    for (let t = 6.5; t < 19; t += 0.5) expect(litRooms(t)).not.toContain('workshop');
  });
});
