import { GetterTree } from 'vuex';
import { ArticleState } from '@/models/ArticleState';
import { RootState } from '@/store/type';
import { Article } from '@/models/Article';

const getters: GetterTree<ArticleState, RootState> = {
  articles(state): Article[] {
    return state.articles;
  },
};

export default getters;
