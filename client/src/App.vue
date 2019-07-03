<template>
  <div id="app">
    <NavBar />
    <v-app id="keep">
      <v-content>
     
     
      <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import NavBar from '@/components/navbar'

import SignIn from '@/components/signin'


export default {
  data() {
    return {
      
    }
  },

  components: {
    NavBar,
    SignIn
  },

  created() {
    if(localStorage.access_token) {
      this.$store.dispatch('decodeToken')
    }
  }
}
</script>


<style>
#keep
  .v-navigation-drawer__border {
    display: none
  }
</style>
