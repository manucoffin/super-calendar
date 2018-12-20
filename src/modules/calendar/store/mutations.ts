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
};

export default mutations;
