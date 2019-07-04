<template>
  <div id="app">
    <div id="nav">
      <Nav />
    </div>
    <div id="messageArea" v-if="alertMsg != ''">
      <b-alert :show="dismissCountDown" dismissible :variant="alertType" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        <p>{{alertMsg}}</p>
        <p>dismissing in {{ dismissCountDown }} seconds...</p>
        <b-progress :variant="alertType" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
      </b-alert>
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
import router from '@/router'
import Nav from '@/components/Nav.vue'
import { mapState } from 'vuex'
router.beforeEach((to, from, next) => {
  document.title = `mini-overflow ${to.meta.title}`
  next()
})

export default {
  name: 'app',
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  components: {
    Nav
  },
  computed: mapState(['alertMsg', 'alertType']),
  watch: {
    alertMsg (newVal, oldVal) {
      if (this.alertMsg !== '') this.showAlert()
    }
  },
  created () {
    this.$store.dispatch('getQuestions')
    let accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      let id = localStorage.getItem('id')
      let name = localStorage.getItem('name')
      let email = localStorage.getItem('email')
      this.$store.commit('SAVEUSER', { id, name, email, access_token: accessToken })
    } else {
      this.$store.commit('LOGOUT')
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
      if (dismissCountDown === 0) {
        this.$store.commit('CLEARMSG')
      }
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}

</script>
<style>
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: 'Calibri', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #DCC7AA;
}

#nav {
  padding: 1em 1em 0 1em;
  background-color: #FFFFFF;
}

#nav a {
  font-weight: bold;
  color: #6B7A8F;
}

#nav a:hover {
  color: #F7882F;
}

#nav a.router-link-exact-active {
  color: #FFFFFF;
  background-color: #DCC7AA;
  border-color: #DCC7AA;
}

#nav a.disabled {
  color: #DCC7AA;
}

/*Blueberry: #6B7A8F
Apricot: #F7882F
Citrus: #F7C331
Apple Core: #DCC7AA*/

</style>
