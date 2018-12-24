import { CalendarEvent } from '@/models/CalendarEvent';

export interface CalendarEventState {
  events: CalendarEvent[];
  heroes: any[];
  fetchingHeroes: boolean;
}