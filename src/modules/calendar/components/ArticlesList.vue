<template>
    <div>
        <ul>
            <!--<li v-for="article of articles"-->
                <!--:key="article.id"-->
                <!--@click="goToDetail(article.id)">-->
                <!--{{ article.title }}-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  // import { Article } from '@/models/Article';

  @Component({
    name: 'ArticlesList',
  })
  export default class ArticlesList extends Vue {
    // @Prop() articles!: Article[];
    //
    // goToDetail(articleId: string): void {
    //   this.$router.push({ name: 'articleDetail', params: { id: articleId } })
    // }
  }
</script>
