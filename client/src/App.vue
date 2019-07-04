<template>
  <div id="app">
    <div id="nav">
      <div id="first-item">
        <p id="judul">Hacktiv Overflow</p>
        <router-link to="/">Home</router-link>
        <router-link to="/submit">Ask a question</router-link>
        <div id="user-control">
          <b-dropdown aria-role="list">
            <button class="button is-primary" slot="trigger">
                <span>Click me!</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>
        </div>
      </div>
      <div id="nav-login-register" class="second-item" v-if="!isLogin">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
      <div v-else class="second-item">
        <p class="item">{{loggedUser.username}}</p>
        <p class="item" id="logout" @click="logout">Log Out</p>
      </div>
    </div>
    <router-view class="animated fadeIn"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('updateLoginStatus', true)
      this.$store.commit('INPUTLOGGEDUSER', JSON.parse(localStorage.getItem('user')))
      this.$toast.open({ message: 'You logged in !', type: 'is-success'})
    }
  },
  computed: {
    ...mapState(['isLogin', 'loggedUser'])
  },
  methods: {
    logout () {
      this.$store.commit('updateLoginStatus', false)
      localStorage.clear()
      this.$router.push('/')
      this.$toast.open({ message: 'Successfully logged out', type: 'is-success'})
    }
  }
}
</script>

<style lang="scss">
   #app, body, html { margin: 0; width: 100%; height: 100%; padding: 0; overflow-y: hidden; overflow-x: hidden;}
  $primary: #311B92;
  p {
    margin: 0;
  }

  #user-control {
    margin-left: 30px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #nav {
    display: flex;
    border-top: 4px solid #311B92;
    border-bottom: 1px solid rgba(0, 0, 0, 0.404);
    align-items: center;
    justify-items: stretch;
    justify-content: space-between;
    background-color: #FAFAFB;
    padding: 10px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.027), 0 6px 8px 0 rgba(0, 0, 0, 0.103);
    z-index: 99999;
    width: 100%;
  }

  #first-item {
    display: flex;
    align-items: center;
    // width: 20%;
  }

  .second-item {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  #logout:hover{
    cursor: pointer;
    color: rgba(255, 0, 0, 0.473);
  }
  #logout {
    margin-left: 30px;
  }
  .item:hover {
    cursor: pointer;
  }
  .item {
    font-weight: bold;
  }

  #nav a {
    font-weight: bold;
    color: black;
    text-decoration: none;
    margin-left: 20px;

  }

  #nav a.router-link-exact-active {
    color: $primary;
  }
</style>
