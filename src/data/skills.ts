import type { RoomId } from '../lib/building';

export interface Skill { name: string; rooms: RoomId[]; also?: string; whole?: boolean }
export interface SkillGroup { id: string; title: string; note: string; skills: Skill[] }

/** Skills as a specification: each one lists the rooms where it is in use. No ratings. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI engineering',
    note: 'Making a model useful and keeping it honest.',
    skills: [
      { name: 'Tool-calling agents', rooms: ['assistant', 'desk'] },
      { name: 'LLM evaluation, offline and live', rooms: ['desk'], also: 'Intake Eval' },
      { name: 'Prompt-injection defence', rooms: ['desk'] },
      { name: 'Pseudonymising personal data', rooms: ['desk', 'arrival'] },
      { name: 'Structured extraction', rooms: ['arrival'] },
      { name: 'Vision models on documents', rooms: ['arrival'] },
      { name: 'Deterministic guards around a model', rooms: ['assistant', 'desk', 'valuation'] },
      { name: 'Prompt caching and cost control', rooms: ['desk'] },
    ],
  },
  {
    id: 'product',
    title: 'Product',
    note: 'Starting from the work, not from the technology.',
    skills: [
      { name: 'Requirements and acceptance criteria', rooms: ['workshop'] },
      { name: 'Workflow design from real operations', rooms: ['arrival', 'street', 'desk'] },
      { name: 'Interfaces for one-handed phone use', rooms: ['desk'] },
      { name: 'Architecture decision records', rooms: ['workshop'] },
      { name: 'Explaining technical work plainly', rooms: ['street'], also: 'this site' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    note: 'One codebase, many installations.',
    skills: [
      { name: 'TypeScript', rooms: ['assistant', 'arrival', 'valuation', 'street', 'desk', 'workshop'] },
      { name: 'Next.js and React', rooms: ['street', 'desk'] },
      { name: 'Postgres with row-level security', rooms: ['desk', 'workshop'] },
      { name: 'Multi-tenant architecture', rooms: [], whole: true },
      { name: 'Data pipelines and scheduled jobs', rooms: ['assistant', 'valuation'] },
      { name: 'Feed and API integrations', rooms: ['street'] },
      { name: 'CI/CD with GitHub Actions', rooms: ['workshop'] },
    ],
  },
  {
    id: 'vision',
    title: 'Machine vision',
    note: 'Pictures a buyer can trust.',
    skills: [
      { name: 'Python', rooms: ['showroom'] },
      { name: 'Segmentation with BiRefNet and SAM 2.1', rooms: ['showroom'] },
      { name: 'ONNX Runtime on a GPU', rooms: ['showroom'] },
      { name: 'In-browser inference with WebAssembly', rooms: ['street'] },
      { name: 'Deterministic rendering and Blender scenes', rooms: ['showroom'] },
      { name: 'Colour-fidelity measurement', rooms: ['showroom'] },
    ],
  },
  {
    id: 'quality',
    title: 'Quality',
    note: 'What lets one person stand behind agent-written code.',
    skills: [
      { name: 'Test strategy across about 12,000 cases', rooms: ['workshop'] },
      { name: 'Playwright end-to-end tests', rooms: ['workshop', 'street'] },
      { name: 'Accessibility to WCAG AA', rooms: ['street', 'desk'] },
      { name: 'Golden-image tests', rooms: ['showroom'] },
      { name: 'Security review and access control', rooms: ['desk', 'workshop'] },
      { name: 'Second-model code review', rooms: ['workshop'] },
    ],
  },
];

export const ROOM_NUMBER: Record<RoomId, string> = { assistant: '1', arrival: '2', valuation: '3', showroom: '4', street: '5', desk: '6', workshop: 'B' };
