import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    sheet: z.string(),
    order: z.number(),
    kind: z.enum(['room', 'street']),
    status: z.enum(['live', 'development', 'research', 'demo']),
    summary: z.string(),
    lede: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    figures: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
    rooms: z.array(z.string()).default([]),
    building: z.enum(['dealership', 'lab', 'observatory', 'pavilion', 'site']).default('dealership'),
  }),
});

export const collections = { projects };
