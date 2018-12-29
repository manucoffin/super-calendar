import { CalendarEvent } from '@/models/CalendarEvent';

export interface ICell {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  events: CalendarEvent[];
}

export class Cell implements ICell {
  id: number = 0;
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  events: CalendarEvent[] = [];
}
