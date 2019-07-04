<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '@/api/myServer'

export default {
  data() {
    return {
      // data_user: ''
    }
  },
  methods: {

  },
  created() {
    // console.log('ada token')
    if (localStorage.getItem("token")) {
      // console.log('token ada')
      this.$store.dispatch('LOGIN_VERIFY')
      .then(() => {
        if (!this.$store.getters.error){
          this.$store.dispatch('FETCH_DATA_QUESTION')
          // this.fetch_user()
          this.$store.dispatch('FETCH_DATA_USERS')
        }
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>
