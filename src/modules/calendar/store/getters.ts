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

  fetchingHeroes(state): boolean {
    return state.fetchingHeroes;
  },
};

export default getters;
