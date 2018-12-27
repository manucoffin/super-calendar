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

  addEvent(state, payload: CalendarEvent) {
    state.events.push(payload);
  },

  updateEventToCreate(state, payload: CalendarEvent) {
    state.eventToCreate = payload;
  },

  heroesLoaded(state, payload: any[]) {
    state.heroes = payload;
  },
  heroesError(state) {
    state.heroes = [];
  },

  setFetchingHeroes(state, payload: boolean) {
    state.fetchingHeroes = payload;
  },

  setCurrentDay(state, payload: number) {
    state.currentDay = payload;
  },

  setCurrentMonth(state, payload: number) {
    state.currentMonth = payload;
  },

  setCurrentYear(state, payload: number) {
    state.currentYear = payload;
  },
};

export default mutations;
