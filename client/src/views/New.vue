<template>
  <div class="container is-fluid">
    <Navbar></Navbar>
    <NewQ></NewQ>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NewQ from '@/components/NewQ.vue'
export default {
  components:{
    NewQ,
    Navbar
  }
};
</script>

<style>
</style>
