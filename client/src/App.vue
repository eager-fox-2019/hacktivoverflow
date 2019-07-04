<template>
  <div id="app">
    <Navbar :islogin="islogin"></Navbar>
    <router-view :islogin="islogin"/>
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
  methods: {
    ...mapActions(['FETCHQUESTIONS'])
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('USERLOGIN', localStorage)
    } else {
      this.$store.commit('USERLOGOUT', localStorage)
      this.$router.push('/')
    }
  }
}
</script>
<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu",
  "Helvetica Neue", "Cantarell", "Fira Sans", "Droid Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 404px;
}
a {
  text-decoration: none;
}
h1 {
  font-size: 2.5rem;
}
.erroralert {
  padding-top: 1rem;
  color: #c21c1c;
}
.ovis {
  font-size: 1.2rem;
  text-align: center;
  vertical-align: middle;
  height:40px;
  width:40px;
  border-radius:20px;
}
.voteholder {
  display: inline-block;
  text-align: center;
  line-height: 2rem;
}
.votecount {
  font-size: 1.1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
}
.upvote, .downvote {
  width: 0;
  height: 0;
  border-style: solid;
  cursor: pointer;
}
.upvote {
  border-width: 0 12px 18px 12px;
  border-color: transparent transparent #efefef transparent;
}
.downvote {
  border-width: 18px 12px 0 12px;
  border-color: #efefef transparent transparent transparent;
}
.upvoted {
  border-color: transparent transparent #fc8217 transparent;
}
.downvoted {
  border-color: #8085eb transparent transparent transparent;
}
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  z-index: 7;
  background-color: #14141488;
}

.modalcontent {
  min-width: 24rem;
  margin: auto;
  padding: 1rem 1.2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.8rem #555;
}
</style>
