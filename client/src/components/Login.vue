<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-4 border p-3">
        <h2 class="text-center">Log in</h2>
        <hr>
        <div id="google-signin-button"></div>
        <h5 class="text-center text-secondary mt-2">OR</h5>
        <form @submit.prevent="login()">
          <div class="form-group">
            <label for="email-login">Email address:</label>
            <input v-model="emailLogin" type="email" class="form-control" id="email-login">
          </div>
          <div class="form-group">
            <label for="password-login">Password:</label>
            <input v-model="pwdLogin" type="password" class="form-control" id="password-login">
          </div>
          <div class="clearfix">
            <button type="submit" class="btn btn-primary float-right">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* global gapi */

import axios from 'axios'
import swal from 'sweetalert2'
import { apiUrl } from '../config/api'

export default {
  data () {
    return {
      emailLogin: '',
      pwdLogin: ''
    }
  },
  mounted () {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn,
      longtitle: true
    })
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: `${apiUrl}/user/login`,
        data: {
          email: this.emailLogin,
          password: this.pwdLogin
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.$emit('navlinks', true)
          this.$router.push({ path: '/' })
        })
        .catch(err => {
        // console.log(err)
          swal.fire(err.response.data.message, '', 'error')
        })
    },
    onSignIn (user) {
      const token = user.getAuthResponse().id_token
      axios({
        method: 'POST',
        url: `${apiUrl}/user/glogin`,
        headers: { token: token }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.$emit('navlinks', true)
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
          swal.fire('google auth error', ' please check your connection', 'error')
        })
    }
  }
}
</script>

<style scoped>

</style>
