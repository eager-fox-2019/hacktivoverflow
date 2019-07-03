<template>
  <div id="app">
    <v-app id="keep">
      <NavBar />
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import NavBar from '@/components/navbar'

import SignIn from '@/components/signin'
// import Home from '@/views/home'

export default {
  data() {
    return {
      
    }
  },

  components: {
    NavBar,
    SignIn,
    // Home
  },

  created() {
    if(localStorage.access_token) {
      this.$store.dispatch('decodeToken')
    }

    this.$store.dispatch('getPublicQuestions')
  }
}
</script>


<style>
#keep
  .v-navigation-drawer__border {
    display: none
  }
</style>
