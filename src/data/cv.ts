import { FACTS, SITE } from './site';

export type CvJob = { name: string; what: string; when: string; href?: string; points: string[] };

/** What a CV variant may change. Facts stay the same; only emphasis and order move. */
export type CvVariant = {
  role?: string;
  profile?: string;
  /** Project names in the order they should appear; names left out keep their default place after these. */
  order?: string[];
  /** Replacement bullet points per project name. */
  points?: Record<string, string[]>;
  /** Project names to leave out. */
  drop?: string[];
  skills?: [string, string][];
};

export const ROLE = SITE.role;

export const PROFILE = `AI product engineer. I design LLM features around real business work and ship them by directing coding agents (Claude Code, Codex), with the evaluation, tests and review that make agent-written code safe to rely on; I own and can defend every architectural decision. I built Kokpit, a platform for car dealerships that runs my family’s dealership and a public demo installation. ${SITE.availability}, with ${SITE.eligibility}.`;

export const WORK: CvJob[] = [
  {
    name: 'Kokpit',
    what: 'Founder and engineer. Platform for car dealerships',
    when: 'Sep 2026 to now',
    href: '/work/kokpit/',
    points: [
      'Designed the architecture: one Next.js core, a separate Postgres project and deployment per dealership; CI builds two tenants and proves no identity leaks between them.',
      `Directed coding agents across 4 apps, 8 packages and a Python service: ${FACTS.commits} commits, ${FACTS.tests} automated tests, ${FACTS.migrations} migrations. Runs one real dealership and a public demo installation.`,
      'Specified a market valuation engine with no language model in the pricing path, and price-history compliance for a new Croatian consumer law.',
    ],
  },
  {
    name: 'Kokpit assistant',
    what: 'Tool-calling agent with human confirmation',
    when: 'Aug 2026 to now',
    href: '/work/assistant/',
    points: [
      'Designed an agent whose write tools only create proposals; the database applies a change after a person confirms. Added a number guard, injection defence and pseudonymisation of personal data.',
      `Built its evaluation: 132 offline cases on every commit and 105 live cases; ${FACTS.evalPass} passed (DeepSeek, November 2026) at about ${FACTS.evalCost} an answer. Found and repaired faults in the evaluation itself before tuning the assistant.`,
    ],
  },
  {
    name: 'Showroom',
    what: 'AI photo studio, in development',
    when: 'Oct 2026 to now',
    href: '/work/showroom/',
    points: [
      'Pipeline that replaces only the background of a car photo: BiRefNet and SAM 2.1 on a GPU through ONNX Runtime (Python), then a deterministic renderer with Blender scenes, golden-image tests and colour-fidelity checks.',
    ],
  },
  {
    name: 'Automobili Galerija',
    what: 'Live dealership site and back office',
    when: 'Nov 2025 to Sep 2026',
    href: '/work/galerija/',
    points: [
      'Turned my family dealership’s daily work into one system: catalogue, inquiries, trade-ins, offers, window stickers and feeds for five ad portals. In daily use.',
      'In-browser background removal with ONNX in WebAssembly; chose the model by measurement (edge agreement 0.874 to 0.974).',
    ],
  },
  {
    name: 'Intake Eval',
    what: 'Public LLM evaluation harness',
    when: 'Sep 2026',
    href: '/work/intake-eval/',
    points: ['TypeScript harness that validates structured model output and evidence quotes, with a browser playground, a failure lab and a human-review workspace. Results reproduce offline with one command.'],
  },
];

export const SKILLS: [string, string][] = [
  ['AI engineering', 'Tool-calling agents, LLM evaluation, prompt-injection defence, structured extraction, vision models, pseudonymisation, cost control'],
  ['Platform', 'TypeScript, Next.js, React, Postgres with row-level security, Supabase, Python, multi-tenant architecture, CI/CD'],
  ['Quality', 'Vitest, Playwright, accessibility to WCAG AA, golden-image tests, security review'],
  ['Method', 'Directing coding agents (Claude Code, Codex), specifications, decision records, second-model review'],
];

/** Applies a variant to the default CV content. Unknown project names throw, so a typo cannot silently drop a section. */
export function applyVariant(v: CvVariant = {}) {
  const known = new Set(WORK.map((w) => w.name));
  for (const n of [...(v.order ?? []), ...Object.keys(v.points ?? {}), ...(v.drop ?? [])]) {
    if (!known.has(n)) throw new Error(`CV variant names an unknown project: ${n}`);
  }
  const drop = new Set(v.drop ?? []);
  const order = v.order ?? [];
  const rank = (n: string) => (order.includes(n) ? order.indexOf(n) : order.length + WORK.findIndex((w) => w.name === n));
  const work = WORK.filter((w) => !drop.has(w.name))
    .map((w) => ({ ...w, points: v.points?.[w.name] ?? w.points }))
    .sort((a, b) => rank(a.name) - rank(b.name));
  return { role: v.role ?? ROLE, profile: v.profile ?? PROFILE, work, skills: v.skills ?? SKILLS };
}
