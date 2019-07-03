<template>
  <div id="app">
    <v-app id="keep">
      <NavBar />
      <v-content>
        <v-layout>
          <Posts /> 
        </v-layout>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Posts from '@/components/posts'
import NavBar from '@/components/navbar'

export default {
  data() {
    return {
      
    }
  },

  components: {
    Posts,
    NavBar
  }
}
</script>


<style>
#keep
  .v-navigation-drawer__border {
    display: none
  }
</style>
