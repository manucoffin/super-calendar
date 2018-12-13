<template>
    <div>
        <ArticlesList :articles="articles"></ArticlesList>
    </div>
</template>

<script lang="ts">
  import store from './store';
  import ArticlesList from '@/modules/articles/components/ArticlesList.vue';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import Component, { mixins } from 'vue-class-component';
  import { Article } from '@/models/Article';
  import ModuleInit from '@/mixins/module-init';

  const moduleNamespace = '$_articles';
  const storeModule = namespace(moduleNamespace);

  @Component({
    components: {
      ArticlesList,
    }
  })
  export default class ArticlesContainer extends mixins(ModuleInit) {
    @storeModule.Getter articles!: Article[];
    @storeModule.Action fetchArticles!: any;

    created() {
      this.moduleNamespace = moduleNamespace;

      if (!this.isModuleRegistered()) {
        this.$store.registerModule('$_articles', store);
      }

      if (this.articles.length === 0) {
        this.fetchArticles();
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
