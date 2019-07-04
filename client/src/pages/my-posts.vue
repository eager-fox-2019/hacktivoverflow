<template>
  <q-page class="">
    <div class="row q-pt-md">
      <div class="col-6 offset-3">
        <MainCard v-for="post in $store.state.main.myPosts" :key="post._id" :post="post"/>
      </div>


     
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import MainCard from "../components/main-card"
import PotdCard from "../components/potd-card"

export default {
  name: 'home',
  created () {
    this.$store.dispatch("GET_MY_POSTS", this.$store.state.main.userId)
    if(sessionStorage.getItem("jwt")){
    }
  },
  components: {
    MainCard,
    PotdCard
  }
}
</script>