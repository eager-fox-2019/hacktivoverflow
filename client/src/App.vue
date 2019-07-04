<template>
  <div id="app">
    <NavBar :isLogin="isLogin" @navlinks="isLogin = $event"></NavBar>
    <router-view @navlinks="isLogin = $event"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      isLogin: false
    }
  }

}
</script>

<style>
</style>
