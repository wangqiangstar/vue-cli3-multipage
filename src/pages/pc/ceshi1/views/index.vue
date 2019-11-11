<template>
  <div id="app">
    <img alt="Vue logo" src="assets/logo.png">
    <HelloWorld msg="页面1：index（默认显示）"/>
    <p>页面2URL：http://localhost:8080/ceshi2.html</p>
  </div>
</template>

<script>
import HelloWorld from './common/HelloWorld.vue'
import { mapState } from 'vuex';
// import S from 'service'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState({
      name: (state) => state.slide.name
    })
  },
  mounted() {
    console.log(this.name)
    // console.log(S)
    this.$service.cs.getStatusCheck().then((data)=>{
      console.log(data)
    }).catch((err)=>console.log(err))
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
