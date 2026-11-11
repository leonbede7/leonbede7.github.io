import type { RoomId } from '../lib/building';
import type { Status } from './stops';

export interface RoomRow { n: string; room: RoomId | 'building'; name: string; does: string; product: string; status: Status; href: string }

/** The room schedule: every room of the building and the product that lives in it. */
export const ROOM_ROWS: RoomRow[] = [
  { n: '1', room: 'assistant', name: 'Assistant', does: 'Answers questions about stock, inquiries and sales; proposes changes and waits for a yes.', product: 'Kokpit assistant', status: 'live', href: '/work/assistant/' },
  { n: '2', room: 'arrival', name: 'Arrival bay', does: 'Reads the registration document and history report so a car is entered without retyping.', product: 'Kokpit', status: 'live', href: '/work/kokpit/#intake-a-car-enters-itself' },
  { n: '3', room: 'valuation', name: 'Valuation', does: 'Prices a car from comparable market listings and the dealership’s own sales.', product: 'Kokpit', status: 'live', href: '/work/kokpit/#valuation-priced-from-the-market' },
  { n: '4', room: 'showroom', name: 'Showroom', does: 'Turns a phone photo from the lot into a studio shot, changing only the background.', product: 'Showroom', status: 'development', href: '/work/showroom/' },
  { n: '5', room: 'street', name: 'Street front', does: 'The public catalogue, window stickers and feeds for five ad portals, from one record.', product: 'Automobili Galerija', status: 'live', href: '/work/galerija/' },
  { n: '6', room: 'desk', name: 'Kokpit desk', does: 'The admin a dealer runs the day from, often one-handed on a phone.', product: 'Kokpit', status: 'live', href: '/work/kokpit/' },
  { n: 'B', room: 'workshop', name: 'Workshop', does: 'Where agents build and every change is tested before it goes upstairs.', product: 'Method', status: 'live', href: '/#method' },
  { n: 'K', room: 'building', name: 'The building', does: 'One core, a separate installation for each dealership.', product: 'Kokpit platform', status: 'live', href: '/work/kokpit/#the-platform-one-core-per-dealership' },
];
