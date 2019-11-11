<template>
  <div id="app">
    <img alt="Vue logo" src="~assets/logo.png">
    <HelloWorld msg="页面1：index（默认显示）"/>
  </div>
</template>

<script>
import HelloWorld from './common/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
