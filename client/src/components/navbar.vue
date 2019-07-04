<template>
  <div id="nav">
    <div>
      <b-nav tabs justified>
        <b-nav-item active>
          <router-link to="/">HacktivOverflow</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/myquestion" v-if="logintype">my question</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/login" v-if="!logintype">sign in</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/register" v-if="!logintype">sign up</router-link>
        </b-nav-item>
        <b-nav-item @click="logout" v-if="logintype">Logout</b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logintype() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("ISLOGIN", false);
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
