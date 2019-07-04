<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.commit("CHECK_LOGIN")
    this.$store.dispatch("GET_POSTS")
  }
}
</script>

<style>
</style>
