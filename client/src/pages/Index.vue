<template>
  <q-page class="">
    <div class="row q-mt-sm q-gutter-md">
      <div class="col-6 offset-2">
        <MainCard v-for="post in $store.state.main.posts" :key="post._id" :post="post"/>
      </div>


      <div class="col-3">
        <q-card style="width: 100%;">
            <q-toolbar class="bg-grey-3">
              <q-toolbar-title>Posts of the day</q-toolbar-title>
            </q-toolbar>
            <q-list>
              <PotdCard v-for="potd in potds" :key="potd._id" :potd="potd"/>  
            </q-list>
        </q-card>
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
    var temp = [...this.$store.state.main.posts]
    var potd = temp.sort(function(a, b) {
      var a2 = a.upvotes.length - a.downvotes.length
      var b2 = b.upvotes.length - b.downvotes.length
      return b2 - a2
    })
    potd.splice(5, potd.length-5)
    this.potds = potd
  },
  data () {
    return {
      potds: ""
    }
  },
  components: {
    MainCard,
    PotdCard
  }
}
</script>
