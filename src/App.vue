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
    font-family: 'BarlowCondensed';
    src: url('assets/Barlow_Condensed/BarlowCondensed-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'BarlowCondensed';
    src: url('assets/Barlow_Condensed/BarlowCondensed-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'BarlowCondensed';
    src: url('assets/Barlow_Condensed/BarlowCondensed-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'BarlowCondensed';
    src: url('assets/Barlow_Condensed/BarlowCondensed-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: 'BarlowCondensed';
  }
</style>
