<template>
  <div>
    <Navbar/>
    <div class="d-flex">
      <router-view/>
      <Random/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Random from '@/components/Random.vue';

export default {
  created() {
    if (localStorage.token) {
      this.$store.dispatch('stayLogin');
    }
  },
  components: {
    Navbar,
    Random,
  },
};
</script>
