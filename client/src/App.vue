<template>
  <div id="app" class="d-flex flex-column">
    <Navbar/>
    <div class="d-flex flex-row col flex-grow" id="container">
      <SideNavbar class="col-3"/>
      <router-view class="col"/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import SideNavbar from '@/components/SideNavbar.vue'
export default {
  components: {
    Navbar,
    SideNavbar
  },
  mounted () {
    this.checkLogin()
    this.getAllQuestion()
  },
  methods: {
    checkLogin () {
      if (localStorage.getItem('token')) {
        let payload = {
          id: localStorage.getItem('id'),
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
          access_token: localStorage.getItem('token')
        }
        this.$store.commit('LOGIN', payload)
      }
    },
    getAllQuestion () {
      this.$store.dispatch('getAllQuestion')
        .then(({ data }) => {
          this.$store.commit('ALL_QUESTION', data)
          this.$store.commit('FILTER_NONE')
        })
        .catch(err => {
          console.log(err)
          if (!err.response) {
            this.$swal({
              type: 'error',
              title: `Connection to Server Error`,
              showConfirmButton: true
            })
          } else {
            this.$swal({
              type: 'error',
              title: `${err.response.data.message}`,
              showConfirmButton: true
            })
          }
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: #38af79;
}

#container {
  margin: 0;
  padding: 0;
}
</style>
