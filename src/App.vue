<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Articles</router-link>-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->

    <router-view/>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'AmaticSC';
    src: url('assets/Amatic_SC/AmaticSC-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'AmaticSC';
    src: url('assets/Amatic_SC/AmaticSC-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: 'AmaticSC';
  }
</style>
