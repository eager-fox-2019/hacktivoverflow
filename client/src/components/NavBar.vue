<template>
  <div>
    <b-navbar variant="info" type="dark">
      <b-navbar-brand to="/">Hacktiv Overflow</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/register" v-if="!isLogin">Register</b-nav-item>
        <b-nav-item to="/login" v-if="!isLogin">Login</b-nav-item>
        <b-nav-item v-else-if="isLogin" href="#" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
/* global gapi */

export default {
  props: ['isLogin'],
  created () {
    if (localStorage.getItem('token')) this.$emit('navlinks', true)

    gapi.load('auth2', () => gapi.auth2.init())
  },
  methods: {
    logout () {
      // gapi.auth2.getAuthInstance().signOut()
      //   .then(() => {
      localStorage.clear()
      this.$emit('navlinks', false)
      this.$router.push({ path: '/login' })
      // })
    }
  }
}
</script>
