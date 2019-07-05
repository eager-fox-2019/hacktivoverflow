<template>
  <div id="app">
    <NavBar/>
    <router-view style="height:90vh; overflow-y:scroll"/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    }
  },
  mounted () {
    this.$store.dispatch('GET_QUESTION')
  }
}
</script>
