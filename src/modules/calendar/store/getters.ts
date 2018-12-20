import { GetterTree } from 'vuex';
import { CalendarEventState } from '@/models/CalendarEventState';
import { RootState } from '@/store/type';
import { CalendarEvent } from '@/models/CalendarEvent';

const getters: GetterTree<CalendarEventState, RootState> = {
  events(state): CalendarEvent[] {
    return state.events;
  },
};

export default getters;
