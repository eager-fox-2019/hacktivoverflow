<template>
  <div class="home">
    <router-view />
    <NavBar></NavBar>
    <div class="row">
      <div class="col s12 l3 m3">
          <MenuLeftBar></MenuLeftBar>
      </div>
      <div class="col m6 l6 s12">
        <LoginForm></LoginForm>
      </div>
      <!-- MENU RIGHT BAR -->
      <div class="col m3 l3 s12">
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import MenuLeftBar from '@/components/MenuLeftBar'
import LoginForm from '@/components/LoginForm'
import { mapState } from "vuex";

export default {
  name: 'login',
  components: {
    NavBar,
    MenuLeftBar,
    LoginForm
  },
  computed: {
    ...mapState(['isLogin', "myQuestions"])
  },
  created () {
    if (this.isLogin) {
      this.$router.push('/')
    } else
    if (localStorage.getItem("token")) {
      console.log('token ada')
      this.$store.dispatch('LOGIN_VERIFY')
    }else 
    if (!this.isLogin) {
      this.$router.push('/login')
    }    
  }
}
</script>
