<template>
<div>
  <b-nav tabs>
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item to="/about">About</b-nav-item>
      <b-nav-item :disabled="isLoggedin==false" :active="routeName=='user'" to="/user">User</b-nav-item>

      <b-nav-item v-if="isLoggedin==false" to="/user/login">Login</b-nav-item>
      <b-nav-item v-if="isLoggedin==false" to="/user/register">Register</b-nav-item>
      <b-nav-item v-if="isLoggedin" @click="logout" class="text-danger">Logout</b-nav-item>
  </b-nav>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Nav',
  computed: {
  	routeName() {
  		console.log({routename:this.$route.name})
  		return this.$route.name
  	},
  	...mapState(['isLoggedin', 'user'])
  },
  methods: {
  	logout(){
  		this.$store.commit('LOGOUT')
      this.$router.push('/')
  	}
  }
}
</script>

<style>
</style>