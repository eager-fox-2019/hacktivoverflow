<template>
  <div class="container is-fluid">
    <Navbar style="margin-top: 20px"></Navbar>
    <div style="margin-top: 20px; margin-bottom: 20px">
      <div v-if="userposts.length == 0" style="margin-top: 150px">
        <strong style="font-size: 30px">You not post any question yet</strong>
      </div>
        <div v-for="(p, index) in userposts" :key="index" style="margin-top: 10px" @click="toQuestion(p._id)">
            <Userpost :p='p'></Userpost>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Userpost from "@/components/Userpost.vue";
export default {
  components: {
    Navbar,
    Userpost
  },
  computed: {
      userposts(){
          return this.$store.state.userposts
      }
  },
  methods: {
    toQuestion(id){
      this.$store.dispatch('ONEQUESTION', id)
    }
  },
};
</script>

<style>
</style>
