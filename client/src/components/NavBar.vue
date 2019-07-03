<template>
    <b-nav>
      <b-nav-item to='/'>Home</b-nav-item>
      <b-nav-item v-if="$store.state.isLogin" to='/add-question'>Add Question</b-nav-item>
      <b-nav-item v-if="$store.state.isLogin" @click="signout()">Sign Out</b-nav-item>
      <b-nav-item v-else to='/logform'>Sign In</b-nav-item>
    </b-nav>
</template>

<script>
export default {
  methods: {
    signout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
    }
  }
}
</script>
