<template>
  <div class="home">
    <ArticlesContainer></ArticlesContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticlesContainer from '@/modules/articles/index.vue';

@Component({
  components: {
    ArticlesContainer,
  },
})
export default class Home extends Vue {}
</script>
