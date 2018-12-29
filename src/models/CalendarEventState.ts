import { CalendarEvent } from '@/models/CalendarEvent';
import { ICurrentInput } from '@/models/CurrentInput';

export interface CalendarEventState {
  events: CalendarEvent[];
  eventToCreate: CalendarEvent;
  heroes: any[];
  fetchingHeroes: boolean;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  currentInput: ICurrentInput;
}