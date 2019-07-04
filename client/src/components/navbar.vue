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
                Have something in mind?
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-tile v-on:click="askQuestion">
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
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
                <v-list-tile-title class="grey--text">
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
              <v-list-tile-title class="grey--text">
                Sign out
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app absolute clipped-left flat>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <div style="cursor: pointer;" @click="toHome"><span class="title ml-3 mr-5">Hacktiv&nbsp;<span class="font-weight-light">Overflow</span></span></div>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        style="margin-left: 2%;"
      ></v-text-field>
      <v-spacer></v-spacer>
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
