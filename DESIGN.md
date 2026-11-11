---
name: Section A–A
description: A portfolio drawn as an architectural section; sunlight crosses the building and switches on the room where a product is working.
colors:
  sun: "#f3b62f"
  sun-deep: "#b97f00"
  ground: "#f3f2ed"
  ground-2: "#e9e8e1"
  shade: "#d3d9e0"
  poche: "#24272c"
  ink-2: "#4c5563"
  rule: "rgba(36, 39, 44, 0.22)"
  night: "#17191c"
  night-2: "#2b2f35"
  night-ink: "#ecebe5"
typography:
  display:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.9rem, 1.7rem + 5.4vw, 5.9rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "0.002em"
  headline:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.3rem, 1.6rem + 3.2vw, 4.4rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "0.002em"
  title:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.7rem, 1.4rem + 1.4vw, 2.6rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "0.002em"
  lede:
    fontFamily: "'Sofia Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.6vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "'Sofia Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.02rem, 0.97rem + 0.25vw, 1.2rem)"
    fontWeight: 450
    lineHeight: 1.5
  small:
    fontFamily: "'Sofia Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(0.84rem, 0.8rem + 0.15vw, 0.94rem)"
    fontWeight: 450
    lineHeight: 1.45
  label:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(0.84rem, 0.8rem + 0.15vw, 0.94rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.055em"
  clock:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.9rem, 1.7rem + 5.4vw, 5.9rem)"
    fontWeight: 850
    lineHeight: 0.86
    letterSpacing: "0.01em"
    fontFeature: "'tnum', 'lnum'"
  field-label:
    fontFamily: "'Sofia Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  none: "0"
  full: "50%"
spacing:
  wall: "2px"
  gutter: "clamp(1rem, 0.4rem + 2.6vw, 3rem)"
  header-h: "4.1rem"
  section-y: "clamp(4rem, 9vw, 8rem)"
  figure-y: "clamp(1.8rem, 4vw, 3rem)"
components:
  cell:
    backgroundColor: "transparent"
    textColor: "{colors.poche}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.82em 1.05em 0.74em"
  cell-hover:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.poche}"
  cell-active:
    backgroundColor: "{colors.poche}"
    textColor: "{colors.ground}"
  cell-solid:
    backgroundColor: "{colors.poche}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.82em 1.05em 0.74em"
  cell-solid-hover:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.poche}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.poche}"
    rounded: "{rounded.full}"
    size: "1.75em"
  tag-on:
    backgroundColor: "{colors.poche}"
    textColor: "{colors.ground}"
    rounded: "{rounded.full}"
    size: "1.75em"
  lit:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.poche}"
    padding: "0 0.12em"
  header:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.poche}"
    height: "4.1rem"
  title-block-cell:
    backgroundColor: "transparent"
    textColor: "{colors.poche}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1rem 0.9rem"
  schedule-row-hover:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.poche}"
  note:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.poche}"
    rounded: "{rounded.none}"
    padding: "1rem 1.2rem 1.1rem"
  plate:
    backgroundColor: "#ffffff"
    rounded: "{rounded.none}"
---

# Design System: Section A–A

## Overview

**Creative North Star: "The Daylight Section"**

The site is one sheet from a drawing set. A two-storey building is cut open in section; its cut walls are solid charcoal (poche), its rooms sit in a pale shade until the sun reaches them, and the only colour on the sheet is the gold of direct light. Every page element takes its form from what a drawing set already contains: circled room numbers on leader lines, grid bubbles and dimension strings, level marks, a room schedule, a title block ruled into cells. Nothing is styled as a card, a pill or a floating panel.

Light is the system's single expressive device. Gold marks what is active, pressed, hovered or working, and it gets there by being a computed sunbeam in the drawing or a flat sunlit field behind a word, a row or a cell. Everything else is two-colour linework at a fixed wall weight. The page is dense where a drawing is dense (schedules, ledgers, title blocks) and open where the section itself needs room.

Motion follows the same logic. The drawing arrives as if penned (structure wipes in left to right, then rooms, then light, then annotation); the sun moves with scroll and its shafts are recomputed from its position; each lit room has at most one small working loop. Without JavaScript or with reduced motion the same content is a plain, complete list.

**Key Characteristics:**
- Flat two-colour drawing on limewash white; gold is light, never decoration.
- Square corners everywhere; the only curves are circles (room numbers, grid bubbles, the sun).
- One line weight for structure (2px), hairlines for schedules.
- Inclined condensed capitals for anything a draughtsman would letter; upright grotesque for anything meant to be read as prose.
- Tabular figures for clock times, sheet numbers and measured values.
- A charcoal night passage that inverts ground and ink but keeps the same gold.

## Colors

Three paper tones, one ink and one light: a warm limewash ground, a cool shade for unlit rooms, charcoal for everything cut or lettered, and a single sunbeam gold.

### Primary
- **Sunbeam Gold** (`sun`): direct light. Solid shafts in the active room, the sun disc, the highlighted word in a headline, hover fill on action cells, schedule rows, index links and timeline buttons, the status swatch for "live", the note block, the focus outline, text selection. Always carries charcoal text.
- **Sunbeam Deep** (`sun-deep`): the gold darkened for thin strokes on the light ground. Used only as the underline colour of hovered text links.

### Neutral
- **Limewash White** (`ground`): page ground, sunlit rooms, the paper fill inside drawn objects, text on charcoal.
- **Limewash Shadow** (`ground-2`): scrollbar track only.
- **Room Shade** (`shade`): rooms the light has not reached or has left; the "research" status swatch; the stage behind a before/after pair.
- **Poche Charcoal** (`poche`): cut structure, all linework, all text, all borders, solid action cells.
- **Graphite Note** (`ink-2`): secondary lettering: captions, table headers, title-block field labels, dates.
- **Hairline** (`rule`): row dividers inside schedules and ledgers.
- **Night Ground** (`night`), **Night Room** (`night-2`), **Night Ink** (`night-ink`): the after-dark passage and the method band. Ground and ink swap; gold stays the same and becomes the fill of the one room still working.

Two literals in the build sit outside the token set and should be read as part of the night palette until tokenised: a muted night caption grey (`#a8a9a6`) and a night body grey (`#c9c9c4`). The floor strip where a shaft lands is a pale sun tint (`#fff6d6`), also literal.

### Named Rules
**The Sunlight Rule.** Gold means light is on this thing now: it is active, hovered, pressed, live, or the gate in a flow. It is never a brand tint, a border colour or a text colour on the light ground.

**The Solid-Or-Hatched Rule.** Light in the room being discussed is solid gold; light that merely falls elsewhere is the same gold as a 45° hatch. One room of solid light at a time in the drawing.

**The Charcoal-On-Gold Rule.** Text on gold is always poche charcoal. Light text never sits on gold.

## Typography

**Display / Lettering Font:** Sofia Sans Condensed Variable (with Arial Narrow, sans-serif), set italic
**Body Font:** Sofia Sans Variable (with Helvetica Neue, Arial, sans-serif)

**Character:** The condensed face, inclined and capitalised, stands in for hand lettering on a drawing: heavy for titles, lighter and tracked for notes. Its upright sibling carries the reading text at a slightly heavy regular (450), so prose holds its own next to 2px linework.

### Hierarchy
- **Display** (850 italic caps, `step-4` clamp 2.9–5.9rem, line-height 0.92, balanced wrap): page and section titles. In the first viewport it is additionally capped by viewport height so it never crowds the drawing.
- **Headline** (850 italic caps, `step-3` 2.3–4.4rem, 0.95): headings inside long sheets, secondary section titles, the "next sheet" name.
- **Title** (850 italic caps, `step-2` 1.7–2.6rem): stop titles, schedule room names, group headings, contact values.
- **Lede** (500 upright, `step-1` 1.25–1.6rem, 1.4): the paragraph under a title; max about 24–31em.
- **Body** (450 upright, `step-0` 1.02–1.2rem, 1.5): running text; prose column capped at 66ch / 44rem.
- **Small** (`step--1` 0.84–0.94rem, 1.45): captions, built-lists, ledger keys.
- **Label** (700 italic caps condensed, tracking 0.055em, usually `step--1` or `step-0`): navigation, status, captions on the drawing, skills lines, table headers.
- **Clock** (850 condensed, upright, tabular lining figures, line-height 0.86): the running time of day.
- **Field label** (600 upright grotesque caps, 0.72rem, tracking 0.12em, graphite): the key above a value in a title-block or ledger cell. It exists only as the label half of a labelled cell.

Inside the SVG drawing the same lettering runs at fixed user-unit sizes: room names 21, sub-notes 13, numbers 18, dimensions 12.5–15.

### Named Rules
**The Lettering Rule.** If a draughtsman would letter it on the sheet (titles, room names, notes, statuses, actions) it is inclined condensed capitals. If a person would read it as a sentence it is upright Sofia Sans. Never mix the two inside one run except for a lettered figure inside prose.

**The Tabular Figure Rule.** Clock times, sheet numbers, counts and measurements use tabular lining numerals so they do not shift as they change.

## Layout

A sticky header (4.1rem) sits over full-width bands; content is held in a 96rem wrap (104rem for the pinned drawing) with a fluid gutter (1–3rem). Section rhythm is large and fluid (4–8rem vertical), figure rhythm 1.8–3rem.

The recurring section head is a two-column grid: display title left, a short paragraph (max 28rem) bottom-aligned right. Long sheets use a reading column (44rem) with a sticky 19rem rail for a ledger of figures and an index; wide plates, tables and flows break out of the reading column.

The first screen is a 31% / remainder split: text left, the section drawing right, a clock rule at the bottom of the text column. When pinned, the block is `100svh` minus the header and the page gains 72vh of scroll per stop; text panels cross-fade in the left column while the drawing stays put, and a timeline of clock buttons runs under the drawing. Pinning is only used when the tallest panel fits; otherwise, and with reduced motion or no JavaScript, the stops fall into an auto-fit grid of panels (min 21rem) below the drawing.

Breakpoints: 62rem (two-column heads, the schedule table and title block collapse to stacked cells), 56rem (the first screen stacks drawing over text; contact and flow cells stack), 46rem (header navigation hides; drawing annotation reduces to room numbers). Height queries (52rem, 50rem, 44rem) trim panel content so the pinned view never overlaps the clock.

Ruled grids share borders: adjacent cells are separated by a single 2px wall, never by gaps.

## Elevation & Depth

Flat. There are no shadows, blurs or colour-fade gradients anywhere. Depth is drafting depth: what is cut is solid charcoal; what is beyond the cut is thinner (1.1 against 1.9 stroke) and reduced to 62% opacity; earth is a 45° hatch at 55%. Light shafts multiply over the room so linework shows through them.

The single `box-shadow` in the system is the focus ring: a 3px gold outline offset 3px, backed by a 6px charcoal ring so it reads on white, shade, gold and night alike.

### Named Rules
**The Cut-Line Rule.** Hierarchy comes from line weight and fill (poche, 2px wall, 1px hairline), not from lift. Nothing floats above the sheet.

## Shapes

Square. Every box, cell, button, image frame and table has 0 radius and a 2px charcoal wall (`--wall`). Circles are reserved for drawing-set symbols: room-number tags, grid bubbles, numbered list markers, the sun, the before/after handle. List bullets are short 2px dashes, not dots. Row dividers inside a bounded schedule are 1px hairlines; its top and bottom edges are 2px walls.

Linework uses square caps and mitred joins. Hatching is 45°: a 9-unit charcoal hatch for earth and unprocessed surfaces, a 7-unit gold hatch for passive light, and a tight diagonal hatch in the "in development" status swatch.

## Components

### Action cell (button)
A title-block cell that fills when pressed.
- **Shape:** square, 2px charcoal wall, padding 0.82em 1.05em 0.74em, label lettering at weight 800, tracking 0.06em, with a drawn arrow (25×16, 2.4 stroke, square caps) after the text.
- **Default:** transparent with charcoal text. **Solid variant:** charcoal with limewash text; used for the one primary action in a group.
- **Hover:** fills gold with charcoal text over 0.25s; the arrow slides 0.25em. **Active:** charcoal fill, limewash text.
- **Night:** outline and text switch to night ink; the solid header cell becomes gold.

### Room tag
- Circled number, 1.75em, 2px wall, upright condensed 800, tabular. `on` variant is filled charcoal with limewash figure (gold on night). The same symbol appears in the drawing, the schedule, stop titles, flows and skill rows, always keyed to the same room.

### Lit field
- A gold rectangle behind one phrase in a display title (padding 0 0.12em, cloned across line breaks). At most one per title.

### Status
- A 0.72em square swatch with a 2px wall plus a lettered label. Live: gold. In development: diagonal hatch. Research: shade. Demo: limewash. The swatch is a material key from a drawing legend; the word always accompanies it.

### Header / Navigation
- Sticky bar, limewash, 2px charcoal bottom wall. Lettered name left, lettered links centre, one solid action cell right. Link hover draws a gold marker stroke under the word (0.34em tall, scales in from the left over 0.35s). Under 46rem the links hide and the action cell remains. During the night stop the bar inverts with the page.

### Section drawing (signature)
- An SVG section, 1000×812 user units, drawn in `currentColor` so it inverts for night. Layers, back to front: room grounds (shade, or limewash when lit), fit-out linework, light shafts (multiply), landing strips, poche, site marks (levels, grid bubbles A–E, dimension string), room tags with leaders.
- Shaft geometry is computed from the sun's angle through fixed apertures and clipped to each room; a room counts as lit only when a shaft passes its mid-height.
- A `mini` variant (no sky, marks or beams) is used as a key plan: rooms relevant to the current page are filled gold with a large numeral.
- Entrance: poche wipes in (1.15s), rooms and fit-out fade (0.7s after 0.55s), light drops in (0.9s after 1.05s), annotation fades last. All motion is behind `prefers-reduced-motion: no-preference`.

### Clock and timeline
- A large tabular clock over a 2px rule with a lettered caption; time snaps to 5-minute steps. Under the drawing, a ruled row of clock buttons with tick marks; the current stop is filled charcoal (gold on night), hover is gold.

### Room schedule (table)
- 2px top and bottom walls, lettered graphite header row over a 1px charcoal line, 1px hairline rows. Columns: tag, lettered room name, prose description, lettered product, status, arrow. The whole row is the link: it fills gold on hover or focus-within and the arrow slides. Under 62rem each row becomes a small grid; the header row hides.

### Title block and ruled cells
- A row of bordered cells sharing 2px walls; each cell is a field label over a lettered value. Used as the page footer (drawing, drawn by, sheet, revision, links), the sheet's fact strip, contact methods, flow steps and figure grids. Linked cells fill gold on hover. Cells stack with horizontal walls under 62rem or 56rem.

### Ledger
- Key/value rows under a 2px top wall with hairline dividers; key in small prose, value in heavy tabular lettering.

### Plate (figure)
- An image with a 2px charcoal frame on white (or charcoal for dark captures), caption below in small graphite prose, max 60ch. Videos take the same frame. Before/after pairs share one frame with a 4px gold divider and a circular gold handle; corner labels are charcoal tabs with limewash lettering.

### Elevation
- A small 240×190 line elevation with a heavy ground line, one gold element each, used for items that are separate buildings rather than rooms. Scales 1.04 from its base on hover.

### Note
- A full-gold block with a 2px wall for the one statement on a sheet that must not be missed.

## Do's and Don'ts

### Do:
- **Do** give every new element a drawing-set form first: a ruled cell, a schedule row, a tag on a leader, a legend swatch, a plate.
- **Do** use gold for exactly one state: light is on it (active, hover, pressed, live, gate).
- **Do** keep walls at 2px charcoal and inner dividers at 1px hairline; let adjacent cells share a wall.
- **Do** letter labels, actions and titles in inclined condensed capitals and set sentences in upright Sofia Sans at 450–500.
- **Do** set times, sheet numbers and measured values in tabular lining figures.
- **Do** pair every status swatch with its word, and every tag number with the same room everywhere.
- **Do** draw new diagrams in `currentColor` with paper fills so they survive the night inversion.
- **Do** keep the 3px gold + 6px charcoal focus ring on every interactive element, and keep all content present without JavaScript and with reduced motion.

### Don't:
- **Don't** round corners. Circles are symbols, not softened rectangles.
- **Don't** add shadows, blurs, colour-fade gradients or translucent panels; depth is line weight, poche and hatch (a hard-stop repeating stripe used as hatch is drawing material, not a gradient).
- **Don't** introduce a second accent colour, or use gold as text or as a border on the light ground.
- **Don't** put light text on gold.
- **Don't** show more than one room with solid gold shafts in the section drawing at a time; passive light is hatched. Small gold objects that a stop switches on (a stamp, signs, a marker dot) are separate from this.
- **Don't** separate ruled cells with gaps or wrap content in free-floating cards.
- **Don't** use the field label as a standalone heading above a section; it is only the key of a labelled cell.
- **Don't** animate anything in the drawing that is not a consequence of the time of day or of the active room doing its work.
