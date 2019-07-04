<template>
  <v-app style="background-color:white;">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href @click.prevent="goBack">HacktivOverflow</a>
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler collapsed"
        style="margin-left:8%;"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <form class="form-inline my-2 my-lg-0" v-if="isLoggedIn && this.$route.path == '/dashboard'" style="text-align:center;">
        <input type="search" placeholder="Search Based On Topic" aria-label="Search" class="form-control mr-sm-2" v-model="search">
        <button type="submit" class="btn btn-outline-primary my-2 my-sm-0">Search</button>
      </form>
      <div class="container">
      <div id="navbarTogglerDemo01" class="navbar-collapse collapse" style="text-align:center;">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <button v-if="isLoggedIn" type="submit" class="btn btn-primary my-2" @click="goDashboard">Home
             <router-link to="/" style="textDecoration: none;color:white;"></router-link>
          </button>
           <button v-if="isLoggedIn" type="submit" class="btn btn-primary my-2 my-sm-0" @click="goQuestion">Add Question
             <router-link to="/" style="textDecoration: none;color:white;"></router-link>
          </button>
           <button v-if="isLoggedIn" type="submit" class="btn btn-primary my-2 my-sm-0" @click="goMyQuestion">My Question
             <router-link to="/" style="textDecoration: none;color:white;"></router-link>
          </button>
           <button v-if="isLoggedIn" type="submit" class="btn btn-primary my-2 my-sm-0" @click="goMyAnswer">My Answer
             <router-link to="/" style="textDecoration: none;color:white;"></router-link>
          </button>
          <button v-if="!isLoggedIn" type="submit" class="btn btn-primary my-2 my-sm-0" @click="goRegister">Register
             <router-link to="/" style="textDecoration: none;color:white;"></router-link>
          </button>
          <button v-if="!isLoggedIn" type="submit" class="btn btn-primary my-2 my-sm-0" @click="goLogin">Login
             <router-link to="/" style="textDecoration: none;color:white;"></router-link>
          </button>
          <button v-if="isLoggedIn" type="submit" class="btn btn-primary my-2 my-sm-0" @click="logout">Logout
          </button>
        </ul>
      </div>
      </div>
    </nav>
    <router-view v-bind:search="search" style="background-color:white;"></router-view>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Dropdown from "./components/Dropdown";
import axios from './api/axios'

export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  computed: mapState(["isLoggedIn"]),
  components: {
    Dropdown
  },
  created() {
    if (localStorage.getItem("token")) this.verify();
  },
  methods: {
    goBack(){
      this.$router.push('/')
      this.$store.dispatch("getQuestions");
    },

     goQuestion(){
          this.$router.push('/createQuestion')
     },
     goDashboard(){
        this.$router.push('/dashboard')
     },
     goMyQuestion(){
       this.$router.push('/myDashboard')
     },
     goMyAnswer(){
       this.$router.push('/myAnswers')
     },
     goRegister(){
       this.$router.push('/register')
     },
     goLogin(){
        this.$router.push('/login')
    },
    verify() {
      let token = localStorage.getItem("token");
      axios
        .post("/users/verify", { token }, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch("verify");
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
          this.$store.dispatch("getUserAnswers");
          this.$router.push("/dashboard");
          console.log(data.message);
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
          this.$router.push("/");
          localStorage.clear();
        });
    },
    logout() {
      this.$store.commit("logout");
      this.$swal("Bye bye!");
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
*{
  font-family: 'Fredoka One', cursive;
}
.ck-editor__editable_inline {
  min-height: 300px !important;
}
</style>
