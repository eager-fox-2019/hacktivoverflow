<template>
  <div id="app">
    <Navbar :islogin="islogin"></Navbar>
    <router-view style="margin:50px" :islogin="islogin" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Navbar
  },
  computed: {
    islogin() {
      return this.$store.state.islogin;
    }
  },
  watch: {
    islogin() {
      if (this.islogin == false) {
        this.$router.push("/");
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("USERLOGIN", localStorage);
      this.$router.push("/questions");
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
