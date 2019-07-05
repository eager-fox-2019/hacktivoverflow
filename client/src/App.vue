<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$store.state.isLogin)
    if(localStorage.getItem('token')){
      console.log('disini ada token')
      this.$store.commit('appLogin')
    }
    if(this.$store.state.isLogin == false) {
      this.$router.push('/')
    }
    // else {
    //   this.$router.push('/home')
    // }
    this.$store.dispatch('fetchQuestion')
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin:0px;
  padding: 0px;
}

</style>
