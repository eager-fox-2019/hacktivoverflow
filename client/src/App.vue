<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["page", "allQ", "currentQ", "user", "isLogin", "userposts"])
  },
  mounted() {
    this.$store.dispatch("ALLQUESTION");
    if (localStorage.token) {
      this.$store.dispatch("USERDATA");
      this.$store.dispatch("USERQUESTION");
      this.$router.push("/all");
    }else{
      this.$router.push("/all");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
