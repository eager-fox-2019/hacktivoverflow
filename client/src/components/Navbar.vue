<template>
  <div id="nav">
      <b-navbar variant="faded" type="light">
        <b-navbar-brand href="#" md="auto" class="col-4 brand">
          Hacktiv Overflow
        </b-navbar-brand>
        <b-nav align="center" class="col" md="auto">
          <b-nav-item :to="{ path: '/'}" :active='$route.name =="home"' ><i class="fas fa-home"></i> Home</b-nav-item>
        </b-nav>
        <b-nav align="end" class="col-4" md="auto">
          <b-nav-item :to="{ path: '/register'}" v-if="$store.state.isLogin == false">Register</b-nav-item>
          <b-nav-item :to="{ path: '/login'}" v-if="$store.state.isLogin == false">Login</b-nav-item>
          <b-nav-item disable v-if="$store.state.isLogin == true">{{$store.state.user.name}}</b-nav-item>
          <b-nav-item v-if="$store.state.isLogin == true"><a href="/login"  @click="logout" class="disableHover">Logout</a></b-nav-item>
        </b-nav>
      </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      setTimeout(() => {
        gapi.load('auth2', function () {
          console.log('ready to use auth2')
          setTimeout(() => {
            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(function () {
              console.log('User signed out.')
            })
          }, 2000)
        })
      }, 500)
      this.$store.commit('LOGOUT')
      this.$swal({
        type: 'success',
        title: 'Logout Success!',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
}
</script>

<style scoped>
  #nav {
    padding: 5px;
    border-bottom: 2px solid #FFA14D;
    background-color: rgba(204, 208, 217, 0.383);
  }
  .brand {
    margin: 0;
    text-align: start;
  }
  .disableHover:hover {
    text-decoration: none;
  }
</style>
