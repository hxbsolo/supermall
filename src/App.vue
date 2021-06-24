<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'app',
  components:{
    MainTabBar
  }
}
</script>

<style>
body{
  height: 2000px;
}
  @import "assets/css/base.css";
</style>
