<template>
  <v-app>
      <MainPage v-if="$store.state.isLogin || $store.state.clientToken"></MainPage>
      <LandingPage v-else-if="!$store.state.isLogin"></LandingPage>
  </v-app>
</template>

<script>
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'

export default {
  name: 'App',
  components: {
    MainPage,
    LandingPage
  },
  data () {
    return {
      //
    }
  },
  mounted() {
    console.log();
    
  }
}
</script>

<style scoped>

</style>

