<template>
  <div class="container is-fluid">
    <Navbar></Navbar>
    <Edit :q='currentQ'></Edit>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Edit from '@/components/Edit.vue'
export default {
  components:{
    Edit,
    Navbar
  },
  computed: {
    currentQ(){
      return this.$store.state.currentQ
    },
  },
};
</script>

<style>
</style>
