<template>
    <div>
        <h2>Article {{ $route.params.id }}</h2>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    name: 'ArticleDetail',
  })
  export default class ArticlesList extends Vue {

  }
</script>
