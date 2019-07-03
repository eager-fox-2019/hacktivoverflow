<template>
  <div>
    <b-navbar variant="info" type="dark">
      <b-navbar-brand to="/">Hacktiv Overflow</b-navbar-brand>

      <!-- <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
      </b-navbar-nav> -->

      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/register" v-if="!isLogin" @nav="isLogin = $event">Register</b-nav-item>
        <b-nav-item to="/login" v-if="!isLogin" @nav="isLogin = $event">Login</b-nav-item>
        <b-nav-item v-else-if="isLogin" href="#" @click="logout" @nav="isLogin = $event">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
/* global gapi */

export default {
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    if (localStorage.getItem('token')) this.isLogin = true

    gapi.load('auth2', () => gapi.auth2.init())
  },
  methods: {
    logout () {
      // gapi.auth2.getAuthInstance().signOut()
      //   .then(() => {
      localStorage.clear()
      this.isLogin = false
      this.$router.push({ path: '/' })
      // })
    }
  }
}
</script>
