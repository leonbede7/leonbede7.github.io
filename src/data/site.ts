export const SITE = {
  name: 'Leon Bede',
  role: 'AI product engineer',
  origin: 'https://leonbede7.github.io',
  description:
    'Leon Bede is an AI product engineer. He designs AI products around real work and ships them by directing fleets of coding agents: Kokpit, a platform for car dealerships, its evaluated assistant, and Showroom, an AI photo studio.',
  location: 'Osijek area, Croatia',
  eligibility: 'Croatian and EU work eligibility',
  availability: 'Available for full-time remote work',
  email: 'leon.bede@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leon-bede',
  github: 'https://github.com/leonbede7',
  revised: 'November 2026',
} as const;

/** Measured in the Kokpit repository on 11 November 2026. */
export const FACTS = {
  commits: '1,932',
  tests: '11,965',
  testFiles: '1,217',
  migrations: '88',
  installations: '2',
  evalPass: '104 of 105',
  evalCost: '$0.0006',
  measured: '11 November 2026',
} as const;

export const NAV = [
  { href: '/#rooms', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#method', label: 'Method' },
  { href: '/#about', label: 'About' },
] as const;
