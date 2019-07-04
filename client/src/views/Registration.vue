<template>
  <v-container fill-height>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-tabs
          v-model="active"
          dark slider-color="yellow"
          centered
        >
          <v-tab key="login" ripple>
            Login
          </v-tab>
          <v-tab key="register" ripple>
            Register
          </v-tab>
          <v-tab-item key="login">
            <v-container>
              <v-text-field
                v-model="loginUser.username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginUser.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn @click="sendLogin">submit</v-btn>
              <p>Or Login with Google</p>
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </v-container>
          </v-tab-item>
          <v-tab-item key="register">
            <v-container>
              <v-text-field
                v-model="registerUser.full_name"
                label="Full Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerUser.username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerUser.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerUser.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-btn @click="sendRegister">submit</v-btn>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
  name: 'register',
  components: {
    GoogleLogin
  },
  data () {
    return {
      params: {
        client_id: '59429130458-3eh3d5ncinlrmj2bp780sumobc7ots6s.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      active: null,
      loginUser: {
        username: '',
        password: ''
      },
      registerUser: {
        full_name: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    sendLogin () {
      let userLoginData = {
        username: this.loginUser.username,
        password: this.loginUser.password,
        login_type: 'default'
      }
      this.$store.dispatch('sendLogin', userLoginData)
    },
    sendRegister () {
      this.$store.dispatch('sendRegister', this.registerUser)
    },
    onSuccess (googleUser) {
      let userData = googleUser.getBasicProfile()
      let userLoginData = {
        email: userData.U3,
        full_name: userData.ig,
        username: userData.U3.split('@')[0],
        login_type: 'google'
      }
      this.$store.dispatch('sendLogin', userLoginData)
    },
    onFailure (error) {
      console.log(error)
    }
  },
  watch: {
    '$store.state.sendRegisterStatus' (val) {
      if (val) {
        this.registerUser.username = ''
        this.registerUser.password = ''
        this.registerUser.full_name = ''
        this.registerUser.email = ''
        this.$store.commit('setSendRegisterStatus', false)
      }
    },
    '$store.state.sendLoginStatus' (val) {
      if (val) {
        this.registerUser.username = ''
        this.registerUser.password = ''
        this.$store.commit('setSendLoginStatus', false)
      }
    }
  }
}
</script>

<style>

</style>
