<template>
  <v-app>
    <v-toolbar app fixed>
      <v-toolbar-title>
        <v-layout row>
          <v-flex xs3>
            <v-icon>fas fa-question</v-icon>
          </v-flex>
          <v-flex xs9>
            <span>Takon</span>
          </v-flex>
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-flex>
        <v-text-field
          class="mx-3"
          flat
          label="Search"
          prepend-inner-icon="search"
          solo-inverted
        ></v-text-field>
      </v-flex>
      <v-toolbar-items>
        <v-btn to="/" flat><v-icon>home</v-icon></v-btn>
        <v-btn v-if="!$store.state.isLogin"
          to="/register" flat>Sign In</v-btn>
        <v-btn v-if="$store.state.isLogin"
          :to="'/profile/' + $store.state.loginUser.id" flat>My Profile</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    //
  },
  data () {
    return {
      //
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('getMyProfile')
    }
  }
}
</script>
