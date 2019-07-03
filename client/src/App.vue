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
  mounted() {
    this.$store.dispatch('readAllQuestions');
  }
}
</script>

<style scoped>

</style>

