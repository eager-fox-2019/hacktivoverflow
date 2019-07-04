<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
    >
      <v-list
        dense
        class="grey lighten-4"
      >
          <v-layout
            row
            align-center
          >
            <v-flex>
              <v-subheader>
                <div class="subheading"> Have something in mind?</div>
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-tile v-on:click="askQuestion">
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="black--text subheading">
                Ask a question
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-alert
            :value="alert"
            type="error"
            transition="scale-transition"
          >
            You must log in to use this feature.
          </v-alert>
          <v-divider
            :key="i"
            dark
            class="my-3"
          ></v-divider>
        <div v-if="$store.state.loggedUser.id === undefined">
          <template v-for="(item, i) in items">
            <v-list-tile
              :key="i"
              :to="item.path"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="black--text subheading">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </div>
          <v-list-tile v-on:click="signout" v-if="$store.state.loggedUser.id">
            <v-list-tile-action>
              <v-icon>keyboard_return</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="black--text subheading">
                Sign out
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app fixed clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <div style="cursor: pointer;" @click="toHome"><span class="title ml-3 mr-5">Hacktiv&nbsp;<span class="font-weight-light">Overflow</span></span></div>
      <v-layout row justify-center>

        <div class="title" v-if="$store.state.loggedUser.id">Welcome <span style="color:#929292;">{{ $store.state.loggedUser.firstName[0].toUpperCase() + $store.state.loggedUser.firstName.slice(1)}} {{ $store.state.loggedUser.lastName[0].toUpperCase() + $store.state.loggedUser.lastName.slice(1)}}</span></div>
      </v-layout>
      <!-- <v-spacer></v-spacer> -->
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      drawer: null,
      items: [
        { icon: 'input', text: 'Sign in', path: '/signin' },
        { icon: 'person_add', text: 'Sign up', path: '/signup' },
      ],
      alert: false
    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    
    signout() {
      this.drawer = null
      localStorage.removeItem('access_token')   
      this.$store.dispatch('getPublicQuestions')
      this.$store.commit('SET_LOGOUT')
    },

    askQuestion() {
      if(localStorage.access_token) {
        this.$router.push('/askquestion')
      } else {
        this.alert = true

        setTimeout(() => {
          this.alert = false
        }, 2000)
      }
    }
  }
}
</script>

<style>

</style>
