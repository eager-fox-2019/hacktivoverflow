<template>
  <v-app>
    <v-toolbar app fixed dark>
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
      <v-flex>
        <v-text-field
          v-model="$store.state.searchQuestion"
          class="mx-3"
          flat
          label="Search"
          prepend-inner-icon="search"
          solo-inverted
        ></v-text-field>
      </v-flex>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" flat><v-icon>home</v-icon></v-btn>
        <v-btn v-if="!$store.state.isLogin"
          to="/register" flat>Sign In</v-btn>
        <v-btn v-if="$store.state.isLogin"
          @click="logout" flat>
          <GoogleLogin :params="params"
            :logoutButton=true>Sign Out</GoogleLogin>
          </v-btn>
        <v-btn v-if="$store.state.isLogin"
          :to="'/profile/' + $store.state.loginUser.id" flat>My Profile</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content class="grey">
      <router-view></router-view>
      <v-speed-dial
      fab bottom right
      fixed
      transition="slide-y-reverse-transition"
    >
        <template v-slot:activator>
          <v-btn fab color="black" dark>
            <v-icon>fas fa-chevron-up</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-btn to="/register"
          fab dark small color="grey darken-4"
          v-if="!$store.state.isLogin">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">fas fa-sign-in-alt</v-icon>
            </template>
            <span>Sign In</span>
          </v-tooltip>
        </v-btn>
        <v-btn @click="logout"
          fab dark small color="grey darken-3"
          v-if="$store.state.isLogin">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
                <v-icon v-on="on">fas fa-sign-out-alt</v-icon>
            </template>
            <span>Sign Out</span>
          </v-tooltip>
        </v-btn>
        <v-btn to="/" fab dark small color="grey darken-2">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">fas fa-home</v-icon>
            </template>
            <span>Home</span>
          </v-tooltip>
        </v-btn>
        <v-btn @click="showAddEdit"
          fab dark small color="grey darken-1"
          v-if="$store.state.isLogin">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">fas fa-plus</v-icon>
            </template>
            <span>Add Question</span>
          </v-tooltip>
        </v-btn>
        <v-btn :to="'/profile/' + $store.state.loginUser.id"
          fab small color="grey lighten-1"
          v-if="$store.state.isLogin">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">account_circle</v-icon>
            </template>
          </v-tooltip>
          <span>My Profile</span>
        </v-btn>
      </v-speed-dial>
    </v-content>
    <addedit></addedit>
  </v-app>
</template>

<script>
import addedit from '@/components/addEdit.vue'
import Swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login'

export default {
  name: 'App',
  components: {
    addedit,
    GoogleLogin
  },
  data () {
    return {
      params: {
        client_id: '59429130458-3eh3d5ncinlrmj2bp780sumobc7ots6s.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('sendLogout')
    },
    showAddEdit () {
      if (this.$store.state.loginUser.id) {
        this.$store.commit('setAddEditDialog', { show: true, type: 'questions' })
      } else {
        Swal.fire(
          'Login First!',
          'Please login to ask a question',
          'error'
        )
      }
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('getMyProfile')
    }
    this.$store.dispatch('getQuestions')
  }
}
</script>
