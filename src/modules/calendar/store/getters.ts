import { GetterTree } from 'vuex';
import { CalendarEventState } from '@/models/CalendarEventState';
import { RootState } from '@/store/type';
import { CalendarEvent } from '@/models/CalendarEvent';

const getters: GetterTree<CalendarEventState, RootState> = {
  events(state): CalendarEvent[] {
    return state.events;
  },

  heroes(state): any[] {
    return state.heroes;
  },

  eventToCreate(state): CalendarEvent {
    return state.eventToCreate;
  },

  fetchingHeroes(state): boolean {
    return state.fetchingHeroes;
  },

  currentDay(state): number {
    return state.currentDay;
  },

  currentMonth(state): number {
    return state.currentMonth;
  },

  currentYear(state): number {
    return state.currentYear;
  },
};

export default getters;
