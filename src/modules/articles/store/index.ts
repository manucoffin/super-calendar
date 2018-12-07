import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { ArticleState } from '@/models/ArticleState';
import { Module } from 'vuex';
import { RootState } from '@/store/type';

export const state: ArticleState = {
  articles: [],
};

const namespaced: boolean = true;

const articles: Module<ArticleState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default articles;
