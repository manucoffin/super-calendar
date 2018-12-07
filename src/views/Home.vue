<template>
  <div class="home">
    <ArticlesContainer></ArticlesContainer>
    <CommentsContainer></CommentsContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticlesContainer from '@/modules/articles/index.vue';
import CommentsContainer from '@/modules/comments/index.vue';

@Component({
  components: {
    ArticlesContainer,
    CommentsContainer,
  },
})
export default class Home extends Vue {}
</script>
