import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { CalendarEventState } from '@/models/CalendarEventState';
import { Module } from 'vuex';
import { RootState } from '@/store/type';
import { CalendarEventCategory } from '@/models/CalendarEventCategory';

export const state: CalendarEventState = {
  events: [],
  eventToCreate: {
    id: 0,
    date_start: '',
    date_end: '',
    label: '',
    description: '',
    categories: [],
    location: '',
  },
  heroes: [],
  fetchingHeroes: false,
  currentDay: new Date().getDate(),
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getUTCFullYear(),
};

const namespaced: boolean = true;

const articles: Module<CalendarEventState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default articles;
