<template>
  <v-app>
      <MainPage v-if="$store.state.isLogin"></MainPage>
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
  }
}
</script>

<style scoped>

</style>

