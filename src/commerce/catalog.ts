import { MATERIAL_ORDER, MATERIALS } from '../physics/materials';
import type { CourseLayout } from '../track/track';
import { WOOD_COURSE } from '../courses/wood';
import { WORLD_LAYOUTS } from '../courses/worlds';
import { COMMERCE_CONFIG } from './config';

/**
 * The course catalog. Metadata only — ownership lives in EntitlementService,
 * prices shown to players will come from the store at runtime (localised),
 * falling back to the provisional configured price.
 *
 * Adding a course = adding an entry here (and its layout/material profile).
 */
export interface CourseEntry {
  id: string;
  materialId: string;
  name: string;
  world: string;
  tagline: string;
  previewFocus: string;     // what the preview should show off
  free: boolean;
  productId: string | null; // store product identifier
  displayPriceUsd: number | null;
  status: 'designed' | 'prototype';
  layout: () => CourseLayout;
}

const TAGLINES: Record<string, [string, string]> = {
  wood: ['Natural rolling, warm resonance', 'Steering, wall rides, jumps and the magnet'],
  concrete: ['Rigid, abrasive contact', 'Gritty rumble and precise narrow passages'],
  metal: ['Ringing steel and spectacular loops', 'Magnet traction through inversions'],
  ice: ['Low friction, long drifts', 'Drift control — recovery is hard'],
  water: ['Currents, buoyancy, splashes', 'Ride the flow through aqueducts'],
  glass: ['Transparent heights', 'Bright, sharp, exposed precision'],
  rubber: ['Grip and rebound', 'Traction-heavy cornering and bounces'],
  sand: ['Granular drag', 'Stay on the firm line to keep momentum'],
  mud: ['Sticky, viscous, unpredictable grip', 'Fight resistance and sudden slips'],
  stone: ['Polished, hard, precise', 'Fast technical temple runs'],
  grating: ['Rhythmic chatter and bounce', 'Stay stable over thousands of bars'],
  snow: ['Compression and soft drag', 'Packed lanes are fast, powder slows you'],
};

export const CATALOG: CourseEntry[] = MATERIAL_ORDER.map((id) => {
  const free = id === 'wood';
  const t = TAGLINES[id];
  return {
    id,
    materialId: id,
    world: MATERIALS[id].name,
    name: free ? WOOD_COURSE.name : WORLD_LAYOUTS[id]().name,
    tagline: t[0],
    previewFocus: t[1],
    free,
    productId: free ? null : `com.gutterball.course.${id}`,
    displayPriceUsd: free ? null : COMMERCE_CONFIG.coursePriceUsd,
    status: 'designed',
    layout: free ? () => WOOD_COURSE : WORLD_LAYOUTS[id],
  } as CourseEntry;
});

export function courseById(id: string) { return CATALOG.find((c) => c.id === id)!; }

export function formatPrice(c: CourseEntry) {
  if (c.free) return 'FREE';
  return `$${(c.displayPriceUsd ?? COMMERCE_CONFIG.coursePriceUsd).toFixed(2)}`;
}
