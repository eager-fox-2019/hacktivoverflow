<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="margin-left: 10px">
      <a class="navbar-item" @click="toHome">
        <img
          src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/stackoverflow-512.png"
          width="30"
          height="100"
        />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" @click="toHome">Home</a>
        <a class="navbar-item" @click="$router.push('/about')">Help</a>
      </div>
      <b-field style="margin-top:13px">
        <form @submit.prevent="searchh">
          <b-input
            placeholder="Search"
            type="search"
            icon-pack="fas"
            icon="search"
            rounded
            v-model="search"
          ></b-input>
        </form>
      </b-field>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!isLogin">
            <a class="button is-light" @click="login" style="margin-right: 15px">Log in</a>
          </div>
          <div class="buttons" v-if="isLogin">
            <div @click="toNew" class="button">
              <i class="fas fa-question-circle" style="font-size: 25px;"></i>
            </div>
            <div style="margin-right: 20px">
              <b-dropdown aria-role="list" class="button">
                <i
                  class="fas fa-users-cog"
                  slot="trigger"
                  style="font-size:27px; margin-right:15px"
                ></i>
                <div>
                  <b-dropdown-item aria-role="listitem">
                    <i class="fas fa-user-alt"></i>
                    <small>Profile</small>
                  </b-dropdown-item>
                  <b-dropdown-item aria-role="listitem" @click="mypost">
                    <i class="fas fa-clone"></i>
                    <small>My Post</small>
                  </b-dropdown-item>
                  <b-dropdown-item aria-role="listitem" @click="logout">
                    <i class="fas fa-power-off"></i>
                    <small>Logout</small>
                  </b-dropdown-item>
                </div>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    toHome() {
      this.$store.dispatch("ALLQUESTION");
      this.$router.push("/all");
    },
    login() {
      this.$router.push("/");
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/all");
    },
    toNew() {
      this.$router.push("/new");
    },
    mypost() {
      this.$router.push("/mypost");
    },
    searchh() {
      this.$store.dispatch("SEARCHQUESTION", this.search);
      this.$router.push("/all");
      this.search = "";
    }
  }
};
</script>

<style>
</style>
