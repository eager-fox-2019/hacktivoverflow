<template>
  <div class="row">
    <router-view />
    <NavBar></NavBar>
    <div class="col s12 l3 m3">
      <!-- MENU LEFT BAR -->
      <MenuLeftBar></MenuLeftBar>
    </div>
    <div class="col m6 l6 s12">
      <!-- QUESTION FORM -->
      <QuestionForm></QuestionForm>
    </div>
    <!-- MENU RIGHT BAR -->
    <div class="col m3 l3 s12">
      <!-- WATCH TAG -->
      <WatchTagCard></WatchTagCard>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import MenuLeftBar from "@/components/MenuLeftBar";
import QuestionForm from "@/components/QuestionForm";
import WatchTagCard from "@/components/WatchTagCard";
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
    'isLogin'
    ])
  },
  components: {
    NavBar,
    MenuLeftBar,
    QuestionForm,
    WatchTagCard
  },
  created () {
    if (localStorage.getItem("token")) {
      // console.log('token ada')
      this.$store.dispatch('LOGIN_VERIFY')
    }
    if (!this.isLogin) {
      this.$router.push('/login')
    }    
  }
}
</script>

<style>
</style>
