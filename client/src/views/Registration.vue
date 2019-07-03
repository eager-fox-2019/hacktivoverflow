<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-tabs
          v-model="active"
          color="cyan" dark slider-color="yellow"
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
export default {
  name: 'register',
  data () {
    return {
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
