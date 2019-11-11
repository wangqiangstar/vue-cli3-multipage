<template>
  <div id="app">
    <h1 style="width: 500px">demo</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'app',
  components: {},
  computed: {
    ...mapState({
      name: (state) => state.slide.name
    })
  },
  mounted() {
    console.log(this.name)
    this.$service.cs.getStatusCheck().then((data)=>{
      console.log(data)
    }).catch((err)=>console.log(err))
  }
}
</script>

<style>
h1{
  width: 500px;
  height: 500px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
