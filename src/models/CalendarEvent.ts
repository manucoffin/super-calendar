import { CalendarEventCategory } from '@/models/CalendarEventCategory';

export interface CalendarEvent {
  id: number;
  date_start: string;
  date_end: string;
  label: string;
  description: string;
  categories: CalendarEventCategory[];
  location: string;
  [key: string]: string|CalendarEventCategory[]|number;
}
