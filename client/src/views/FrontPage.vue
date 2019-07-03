<template>
  <v-content>
    <MainPage v-if="$store.state.isLogin || $store.state.clientToken"></MainPage>
    <LandingPage v-else-if="!$store.state.isLogin"></LandingPage>
  </v-content>
</template>

<script>
  import MainPage from '../components/MainPage'
  import LandingPage from '../components/LandingPage'
  export default {
    components: {
      MainPage,
      LandingPage
    },
    mounted() {
      if (this.$store.state.isLogin) {
        this.$router.push('/home');
      }
    }
  }
</script>

<style>

</style>
