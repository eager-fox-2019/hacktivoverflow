<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style>
    <a v-if="!islogin" class="navbar-brand" style="cursor:pointer;color:white">Hacktiv-Overflow</a>
    <router-link v-if="islogin" to="/questions">
      <a
        @click="fetchQuestions"
        class="navbar-brand"
        style="cursor:pointer;color:white"
      >Hacktiv-Overflow</a>
    </router-link>
    <button class="navbar-toggler" type="button"></button>

    <div v-if="islogin" class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
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
    },
    fetchQuestions() {
      this.$store
        .dispatch("FETCHQUESTIONS")
        .then(({ data }) => {
          let arr = [];
          data.forEach(x => {
            if (arr.indexOf(x.category) == -1) {
              arr.push(x.category);
            }
          });
          this.$store.commit("FILTER", arr);
          this.$store.commit("ALLQUESTIONS", data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
