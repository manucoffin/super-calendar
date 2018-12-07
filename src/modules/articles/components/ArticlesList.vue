<template>
    <div>
        <ul>
            <li v-for="article of articles">
                {{ article.title }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { Article } from '@/models/Article';

  @Component({
    name: 'ArticlesList',
  })
  export default class ArticlesList extends Vue {
    @Prop() articles: Article[];
  }
</script>
