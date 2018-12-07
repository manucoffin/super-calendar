import { MutationTree } from 'vuex';
import { ArticleState } from '@/models/ArticleState';
import { Article } from '@/models/Article';

const mutations: MutationTree<ArticleState> = {
  articlesLoaded(state, payload: Article[]) {
    state.articles = payload;
  },
  articlesError(state) {
    state.articles = [];
  },
};

export default mutations;
