<template>
  <div>
      <b-navbar id="nav" class="p-3" sticky >
        <b-col class="d-flex ">
          <div style='color: white'>
            <h3>
              <b><strong>HACKTIV8</strong>, Flow it up!</b>
            </h3>
          </div>
        </b-col>
    
        <b-col class="d-flex flex-row justify-content-end">
          <router-link to="/" class="px-4" style="color: white">Home</router-link>
          <router-link to="/postQuestion" class="px-4" style="color: white" v-if='islogin'>Ask Question!</router-link>
          <a class="px-4" @click="$bvModal.show('login-modal')" href="#" v-if="!islogin">
            <div v-if="!register" style="color: white">Login</div>
            <div v-else style="color: white">Register</div>
          </a>
          <a class="px-4" href="#" v-else @click.prevent="logout" style="color: white">Logout</a>
        </b-col>

      </b-navbar>
    <router-view/>
    <b-modal id="login-modal" hide-footer>
      <template slot="modal-title">Login here</template>
      <div class="d-block">
        <div>
          <b-form @submit.prevent="submit">
            <b-form-group id="name" label="Your Name: " label-for="name" v-if="register">
              <b-form-input id="input-name" v-model="name" required placeholder="Enter your name here"></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Email address: "
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Enter your email here"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="Password: " label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter your password here"
              ></b-form-input>
            </b-form-group>
            
          
          <b-form-group>
            <b-button type="submit" variant="primary" style="background: gainsboro; border-color: white">Submit</b-button>
            <a href="#" v-if="!register" @click.prevent="toRegister(true)" style="position: absolute; right: 21px; bottom: 39px">Haven't register yet?</a>
            <a href="#" v-if="register" @click.prevent="toRegister(false)" style="position: absolute; right: 21px; bottom: 39px">Already have an account?</a>
          </b-form-group>
          </b-form>
          
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "app",
  data() {
    return {
      // islogin: false,
      email: "",
      password: "",
      name: "",
      register: false
    };
  },
  computed: {
    islogin() {
      return this.$store.state.islogin;
    }
  },
  watch:{
    islogin(){
      if(this.islogin === false){
        this.$router.push('/')
      }
    }
  },
  methods: {
    submit() {
      if (this.register) {
        api
          .post("/signup", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(({ data }) => {
            console.log("registered");
            this.register = false
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api
          .post("/signin", { email: this.email, password: this.password })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.data._id)
            this.$bvModal.hide("login-modal");
            this.$store.commit("loggedIn");
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.email = "";
      this.name = "";
      this.password = "";
    },
    toRegister(data) {
      this.register = data;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id")
      this.$store.commit("logout");
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("loggedIn");
    }
  }
};
</script>

