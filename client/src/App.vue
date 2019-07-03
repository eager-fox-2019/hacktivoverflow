<template>
  <div id="app">
    <div id="nav">
      <Nav />
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router'
router.beforeEach((to, from, next) => {
  document.title = `mini-overflow ${to.meta.title}`
  next()
})
import Nav from '@/components/Nav.vue'

export default {
  name: 'app',
  components: {
    Nav
  },
  created(){
    this.$store.dispatch('getQuestions')
    let access_token = localStorage.getItem('access_token')
    console.log({access_token})
    if (access_token){
      let id = localStorage.getItem('id')
      let name = localStorage.getItem('name')
      let email = localStorage.getItem('email')
      this.$store.commit('SAVEUSER', {id, name, email, access_token})
    }
  }
}
</script>

<style>
html, body, #app {
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
