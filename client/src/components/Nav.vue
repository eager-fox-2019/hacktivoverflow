<template>
<div>
  <b-nav tabs fill>
    <b-nav-item :active="$route.name=='home'" to="/">Home</b-nav-item>
    <b-nav-item :active="$route.name=='about'" to="/about">About</b-nav-item>
    <b-nav-item :disabled="isLoggedin==false" :active="$route.name=='user'" to="/user">User</b-nav-item>
    <b-nav-item v-if="isLoggedin==false" :active="$route.name=='user/login'" to="/user/login">Login</b-nav-item>
    <b-nav-item v-else>Logout</b-nav-item>
  </b-nav>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Nav',
  computed: mapState(['isLoggedin'])
}
</script>

<style>
</style>