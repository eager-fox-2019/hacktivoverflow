<template>
  <v-app>
      <MainPage></MainPage>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import MainPage from './components/MainPage'

export default {
  name: 'App',
  components: {
    MainPage,
    HelloWorld
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

