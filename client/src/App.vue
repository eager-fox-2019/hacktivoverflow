<template>
  <div id="app">
    <Navbar />
    <div class="container my-container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer,
  },
  created() {
      this.$store.dispatch('getQuestion')
      this.$store.dispatch('fetchMyQuestions')

      this.checkLogin()
  },
  methods: {
    checkLogin() {
      if(localStorage.token) {
        this.$store.dispatch('setLoggedInUser')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.my-container {
  max-width: 60em;
  min-height: 100vh;
}
</style>
