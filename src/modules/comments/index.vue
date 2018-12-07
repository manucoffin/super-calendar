<template>
    <div>COMMENTS</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import store from './store';

  @Component
  export default class CommentsContainer extends Vue {
    created() {
      const STORE_KEY = '$_comments';
      this.$store.registerModule(STORE_KEY, store);
    }
  }
</script>

<style scoped lang="scss">

</style>
