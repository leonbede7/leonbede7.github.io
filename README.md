# Leon Bede: portfolio

The source of [leonbede7.github.io](https://leonbede7.github.io/).

The site draws a car dealership in architectural section. Each room is a product I built, and sunlight moves through the building as you scroll through a working day.

## Run it

Requires Node.js 22.23 or newer.

```bash
npm ci
```

```bash
npm run dev
```

```bash
npm test
```

```bash
npm run build
```

```bash
npm run e2e
```

`npm run e2e` needs a build first and a Chromium for Playwright (`npx playwright install chromium`).

## Where things live

| Path | What it holds |
| --- | --- |
| `src/lib/building.ts` | The building's geometry: floors, walls, rooms and the openings that admit light |
| `src/lib/sun.ts` | Sun position for a time of day, and the shafts of light it casts through each opening |
| `src/components/Section.astro` | The drawing, generated from that geometry |
| `src/components/Day.astro` | The first screen and the pinned day sequence |
| `src/data/stops.ts` | The stops of the day: time, room, text, skills, status |
| `src/data/skills.ts`, `src/data/rooms.ts` | Skills and the room schedule |
| `src/content/projects/*.mdx` | One file per project sheet |
| `src/pages/cv.astro` | The CV; `npm run cv:pdf` renders it to `public/leon-bede-cv.pdf` |

## Keeping it current

- **A project's status changed:** edit `status` in its file under `src/content/projects/`, and in `src/data/stops.ts` or `src/data/rooms.ts` if it has a stop or a row there.
- **A new small project:** add an `.mdx` file with `kind: street`. It appears under "The rest of the street" and gets its own sheet.
- **Figures changed:** `src/data/site.ts` holds the measured counts and the date they were measured.
- **After editing the CV:** run `npm run build`, then `npm run cv:pdf`, and commit the PDF.

## How it was made

I directed coding agents to build this site, as I do with the products it shows. The decisions are mine: the concept, the content, what is claimed and what is not.

The light is not an illustration. Beam shapes are computed from the sun's angle and the building's openings, and tested: at each stop's hour the light has to reach that stop's room.

## Credits

- Typefaces: Sofia Sans and Sofia Sans Condensed (SIL Open Font License), self-hosted through Fontsource.
- Showroom examples: source photographs are freely licensed stock photographs; the studio images are unretouched output of the Showroom engine.
- Catapult is being built with the open-source [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) template by Donchitos.
- Every image carries its origin in its metadata.
