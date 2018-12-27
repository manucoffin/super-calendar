import { CalendarEvent } from '@/models/CalendarEvent';

export interface CalendarEventState {
  events: CalendarEvent[];
  eventToCreate: CalendarEvent;
  heroes: any[];
  fetchingHeroes: boolean;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
}