import { CalendarEventCategory } from '@/models/CalendarEventCategory';

export interface CalendarEvent {
  id: number;
  date_start: string;
  duration: number;
  label: string;
  description: string;
  categories: CalendarEventCategory[];
  place: string;
}