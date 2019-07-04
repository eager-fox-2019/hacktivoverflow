<template>
  <div class>
    <div>
      <nav class="grey darken-3 black-text">
        <div class="nav-wrapper">
          <img src="../../public/logostackoverflow.png" height="100%" alt />
          <!-- <h6>ASKOVERFLOW</h6> -->
          <a data-target="mobile-demo" class="sidenav-trigger black-text">
            <i class="material-icons">menu</i>
          </a>
          <ul class="right hide-on-med-and-down">
            <li v-if="!isLogin">
              <router-link :to="'/login'" class="grey-text darken-3">
                <i class="material-icons left">account_circle</i>Login
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link :to="'/register'" class="grey-text darken-3">
                <i class="material-icons left">assignment_ind</i>Register
              </router-link>
            </li>
            <li v-if="isLogin">
              <a class="userprofile grey-text">Hi, {{ username }}</a>
            </li>
            <li v-if="isLogin">
              <a @click="user_logout" class="grey-text darken-3">
                <i class="material-icons right">last_page</i>Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
        <li v-if="!isLogin">
          <router-link :to="'/login'" class="grey-text darken-3">
            <i class="material-icons left">account_circle</i>Login
          </router-link>
        </li>
        <li v-if="!isLogin">
          <router-link :to="'/register'" class="grey-text darken-3">
            <i class="material-icons left">assignment_ind</i>Register
          </router-link>
        </li>
        <li v-if="isLogin">
          <a class="userprofile grey-text">Hi, {{ username }}</a>
        </li>
        <li v-if="isLogin">
          <a @click="user_logout" class="grey-text darken-3">
            <i class="material-icons right">last_page</i>Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isLogin", "username"])
  },
  methods: {
    login_link() {},
    register_link() {},
    user_logout() {
      this.$store.commit("USER_LOGOUT_MUTATION");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
}
</style>