<template>
  <div id="app">
    <Navbar :islogin="islogin"></Navbar>
    <router-view style="margin:50px" :islogin="islogin" />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    Navbar
  },
  computed: {
    islogin () {
      return this.$store.state.islogin
    }
  },
  watch: {},
  methods: {
    ...mapActions(['FETCHQUESTIONS'])
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('USERLOGIN', localStorage)
      let loc = JSON.parse(localStorage.currentPage)
      if (loc.name === 'questions') {
        this.$router.push({ path: loc.link })
      } else if (loc.name === 'ask') {
        this.$router.push('/ask')
      } else {
        this.$router.push('/questions')
      }
    } else {
      localStorage.clear()
      this.$store.commit('USERLOGOUT', localStorage)
      this.$router.push('/')
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
