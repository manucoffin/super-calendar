import { MutationTree } from 'vuex';
import { CalendarEventState } from '@/models/CalendarEventState';
import { CalendarEvent } from '@/models/CalendarEvent';

const mutations: MutationTree<CalendarEventState> = {
  eventsLoaded(state, payload: CalendarEvent[]) {
    state.events = payload;
  },
  eventsError(state) {
    state.events = [];
  },

  heroesLoaded(state, payload: any[]) {
    state.heroes = payload;
  },
  heroesError(state) {
    state.heroes = [];
  },

  setFetchingHeroes(state, payload: boolean) {
    state.fetchingHeroes = payload;
  }
};

export default mutations;
