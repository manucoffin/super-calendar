import axios from 'axios';
import { Article } from '@/models/Article';
import { ActionTree } from 'vuex';
import { ArticleState } from '@/models/ArticleState';
import { RootState } from '@/store/type';

const actions: ActionTree<ArticleState, RootState> = {
  async fetchArticles({ commit }): Promise<any> {
    try {
      const response = await axios.get(process.env.VUE_APP_API_URL +  '/articles');
      const payload: Article[] = response && response.data.articles;
      commit('articlesLoaded', payload);
      console.log(response);
    } catch (error) {
      commit('articlesError');
      console.error(error);
    }
  },
};

export default actions;
