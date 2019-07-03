<template>
  <div>
    <Navbar/>
    <div class="d-flex">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  created() {
    if (localStorage.token) {
      this.$store.dispatch('stayLogin');
    }
  },
  components: {
    Navbar,
  },
};
</script>
