import type { RoomId } from '../lib/building';

export type Status = 'live' | 'development' | 'research' | 'demo';
export const STATUS_LABEL: Record<Status, string> = {
  live: 'Live',
  development: 'In development',
  research: 'Research',
  demo: 'Public demo',
};

export interface Stop {
  id: string;
  /** Hours, 24h clock. */
  time: number;
  clock: string;
  caption: string;
  room: RoomId | null;
  tag: string;
  title: string;
  happens: string;
  built: string[];
  skills: string[];
  status: Status;
  link: { href: string; label: string };
}

export const STOPS: Stop[] = [
  {
    id: 'brief',
    time: 7,
    clock: '07:00',
    caption: 'The assistant has the morning brief ready',
    room: 'assistant',
    tag: '1',
    title: 'Assistant, morning brief',
    happens:
      'Before anyone unlocks the door, the owner already knows what needs attention: cars without a dated price, yesterday’s inquiries, stock that has stood too long.',
    built: [
      'A daily brief and alerts computed from the dealership’s own data, with no language model in the loop, so a number is never invented.',
      'Delivered in the admin and on Telegram, behind a fail-closed allowlist.',
    ],
    skills: ['Agent design', 'Deterministic signals', 'Postgres', 'Scheduled jobs'],
    status: 'live',
    link: { href: '/work/assistant/', label: 'Open the assistant sheet' },
  },
  {
    id: 'intake',
    time: 8.5,
    clock: '08:30',
    caption: 'A car arrives and enters itself',
    room: 'arrival',
    tag: '2',
    title: 'Intake, nothing retyped',
    happens:
      'A trade-in rolls in. The dealer photographs the registration document or uploads a vehicle history report, and the vehicle record fills itself for review.',
    built: [
      'A vision model reads the registration document after personal fields are masked; the output is checked field by field.',
      'Structured extraction from PDF reports into the car form, validated against a make and model catalogue.',
      'Photos go from a phone straight to the record through a QR code.',
    ],
    skills: ['Vision models', 'Structured extraction', 'Schema validation', 'Privacy by design'],
    status: 'live',
    link: { href: '/work/kokpit/#intake-a-car-enters-itself', label: 'Open the Kokpit sheet' },
  },
  {
    id: 'valuation',
    time: 10.5,
    clock: '10:30',
    caption: 'The price comes from the market, not from a guess',
    room: 'valuation',
    tag: '3',
    title: 'Valuation from market data',
    happens:
      'What is it worth? Comparable listings are gathered every night, weighted by similarity and freshness, and turned into an asking price and a trade-in margin.',
    built: [
      'A valuation engine with no language model in the pricing path: similarity, recency weighting, outlier trimming, asking-to-sold calibration.',
      'Backtested against the dealership’s own sales.',
    ],
    skills: ['Data pipelines', 'Statistics', 'Scraping', 'Backtesting', 'TypeScript'],
    status: 'live',
    link: { href: '/work/kokpit/#valuation-priced-from-the-market', label: 'Open the Kokpit sheet' },
  },
  {
    id: 'showroom',
    time: 12.5,
    clock: '12:30',
    caption: 'Noon light, and it no longer matters',
    room: 'showroom',
    tag: '4',
    title: 'Showroom, the studio is software',
    happens:
      'A phone photo taken on the lot becomes a consistent studio shot. Only the background changes; paint, wheels and scratches stay exactly as they are.',
    built: [
      'Segmentation on a GPU: BiRefNet for the car, SAM 2.1 for glass from one click, plate detection.',
      'A deterministic renderer with Blender studio scenes, contact shadows and floor reflections, held by golden-image tests.',
      'Colour-fidelity checks, so the car in the picture is the car on the lot.',
    ],
    skills: ['Computer vision', 'Python', 'ONNX on GPU', 'Blender', 'Golden-image tests'],
    status: 'development',
    link: { href: '/work/showroom/', label: 'Open the Showroom sheet' },
  },
  {
    id: 'publish',
    time: 14.5,
    clock: '14:30',
    caption: 'One record, the site and five portals',
    room: 'street',
    tag: '5',
    title: 'Street front and ad portals',
    happens:
      'The car goes on sale once. The public site, the window sticker and the feeds for five ad portals all read the same record, with the same price and the same price history.',
    built: [
      'A fast public catalogue with filters, comparison, financing and import calculators.',
      'XML feeds built to each portal’s specification, and price-history compliance for Croatian consumer law.',
    ],
    skills: ['Next.js', 'React', 'SEO', 'Accessibility', 'Feed integrations'],
    status: 'live',
    link: { href: '/work/galerija/', label: 'Open the Galerija sheet' },
  },
  {
    id: 'desk',
    time: 16.5,
    clock: '16:30',
    caption: 'It proposes. A person confirms.',
    room: 'desk',
    tag: '6',
    title: 'Kokpit desk and the assistant',
    happens:
      'An inquiry comes in. The assistant drafts the reply and proposes updating the inquiry’s status. Nothing changes until the owner says yes.',
    built: [
      'A tool-calling agent whose write tools only create proposals; the database applies them after confirmation.',
      'A number guard: every figure in an answer must appear in tool data. Third-party text switches write tools off.',
      'Evaluated before release: 132 offline cases in CI and 104 of 105 on a live run.',
    ],
    skills: ['Tool-calling agents', 'LLM evaluation', 'Injection defence', 'Pseudonymisation', 'Prompt caching'],
    status: 'live',
    link: { href: '/work/assistant/', label: 'Open the assistant sheet' },
  },
  {
    id: 'platform',
    time: 18.5,
    clock: '18:30',
    caption: 'The same building, built again next door',
    room: null,
    tag: 'K',
    title: 'Kokpit, one core for every dealership',
    happens:
      'Step back to the street. The dealership next door runs the same building with its own data, its own brand and its own database.',
    built: [
      'One Next.js core, a separate installation per dealership: its own Postgres project, its own deployment, a manifest compiled in at build time.',
      'Releases roll out in waves; CI builds two tenants and proves no branding leaks from one into the other.',
    ],
    skills: ['System architecture', 'Multi-tenancy', 'Row-level security', 'CI/CD', 'Migrations'],
    status: 'live',
    link: { href: '/work/kokpit/#the-platform-one-core-per-dealership', label: 'Open the Kokpit sheet' },
  },
  {
    id: 'night',
    time: 22,
    clock: '22:00',
    caption: 'The workshop keeps its lights on',
    room: 'workshop',
    tag: 'B',
    title: 'The workshop, where it is checked',
    happens:
      'The rooms upstairs go dark. Below ground the agents and the checks keep working: this is where every change is built and tested before it is allowed upstairs.',
    built: [
      'About 12,000 automated tests, end-to-end and accessibility runs, and a fleet health check every two hours.',
      'I direct the agents; a second model reviews; nothing ships on a single opinion.',
    ],
    skills: ['Agentic engineering', 'Test strategy', 'Code review', 'Observability'],
    status: 'live',
    link: { href: '#method', label: 'Read the method' },
  },
];

export const HERO_TIME = 7;
