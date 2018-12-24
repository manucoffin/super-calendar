import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { CalendarEventState } from '@/models/CalendarEventState';
import { Module } from 'vuex';
import { RootState } from '@/store/type';

export const state: CalendarEventState = {
  events: [],
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
