<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style>
    <a v-if="!islogin" class="navbar-brand" style="cursor:pointer;color:white">Hacktiv-Overflow</a>
    <router-link v-if="islogin" to="/questions">
      <a class="navbar-brand" style="cursor:pointer;color:white">Hacktiv-Overflow</a>
    </router-link>
    <button class="navbar-toggler" type="button"></button>

    <div v-if="islogin" class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item active">
          <router-link to="/mystore">
            <a class="nav-link active" style="cursor:pointer">My Question</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sell">
            <a class="nav-link active" style="cursor:pointer">My Answer</a>
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/ask">
            <a class="nav-link active" style="cursor:pointer">Ask</a>
          </router-link>
        </li>
      </ul>
      <router-link to="/">
        <button
          class="btn btn-danger"
          style="border-radius: 20px"
          type="submit"
          v-on:click="logout"
        >Logout</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  props: ["islogin"],
  components: {},
  methods: {
    logout() {
      this.$store.commit("USERLOGOUT");
      localStorage.clear();
    }
  }
};
</script>
