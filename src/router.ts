import Vue from 'vue';
import Router from 'vue-router';
import ArticlesContainer from '@/modules/articles/index.vue';
import ArticleDetail from '@/modules/articles/components/ArticleDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articles',
      component: ArticlesContainer,
    },
    {
      path: '/articles',
      redirect: { name: 'articles' },
    },
    {
      path: '/articles/:id',
      name: 'articleDetail',
      component: ArticleDetail,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/About.vue'),
    },
  ],
});
