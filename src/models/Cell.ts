import { CalendarEvent } from '@/models/CalendarEvent';

export interface Cell {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  events: CalendarEvent[];
}
