import axios from 'axios';
import { CalendarEvent } from '@/models/CalendarEvent';
import { ActionTree } from 'vuex';
import { CalendarEventState } from '@/models/CalendarEventState';
import { RootState } from '@/store/type';

const actions: ActionTree<CalendarEventState, RootState> = {
  async fetchEvents({ commit }): Promise<any> {
    try {
      const response = await axios.get(process.env.VUE_APP_API_URL +  '/events');
      const payload: CalendarEvent[] = response && response.data.events;
      commit('eventsLoaded', payload);
      console.log(response);
    } catch (error) {
      commit('eventsError');
      console.error(error);
    }
  },
};

export default actions;
