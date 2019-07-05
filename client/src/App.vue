<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import FrontPage from './views/FrontPage'

export default {
  name: 'App',
  components: {
    FrontPage
  },
  data () {
    return {
      //
    }
  },
  created() {
    debugger
    this.$store.dispatch('readAllQuestions');
    this.$store.commit('SETCLIENTTOKEN', 
      localStorage.getItem('access_token'))
  }
}
</script>

<style scoped>

</style>

