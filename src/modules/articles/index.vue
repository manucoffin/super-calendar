<template>
    <div>
        <ArticlesList :articles="articles"></ArticlesList>
    </div>
</template>

<script lang="ts">
  import { Vue } from 'vue-property-decorator';
  import store from './store';
  import ArticlesList from '@/modules/articles/components/ArticlesList.vue';
  import { State, Action, Getter, namespace } from 'vuex-class';
  import Component from 'vue-class-component';
  import { ArticleState } from '@/models/ArticleState';
  import { Article } from '@/models/Article';

  const storeModule = namespace('$_articles');

  @Component({
    components: {
      ArticlesList,
    }
  })
  export default class ArticlesContainer extends Vue {
    @storeModule.Getter articles!: Article[];
    @storeModule.Action fetchArticles!: any;

    created() {
      // TODO: Check that module is not already registered
      this.$store.registerModule('$_articles', store);

      this.fetchArticles();
    }
  }
</script>

<style scoped lang="scss">

</style>
