<template>
  <section>
    <strong style="font-size: 45px">Sign Up</strong>
    <div class="column is-8 is-offset-2" style="margin-top: 20px">
      <b-field label="Username">
        <b-input type="text" maxlength="10" rounded v-model="user.userName"></b-input>
      </b-field>
      <b-field label="Email">
        <b-input type="email" maxlength="30" rounded v-model="user.email"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" password-reveal rounded v-model="user.password"></b-input>
      </b-field>
      <b-field label="Enter some tags">
        <b-taginput
          maxtags="5"
          v-model="user.tags"
          :data="filteredTags"
          autocomplete
          :allow-new="false"
          field="name"
          icon="label"
          placeholder="Add a tag"
          @typing="getFilteredTags"
        ></b-taginput>
      </b-field>
    <div>
      <b-button rounded
        type="is-primary"
        size="is-medium"
        style="margin-right: 10px"
        @click="register"
      >Register</b-button>
      <b-button rounded type="is-primary" size="is-medium" @click="$router.push('/all')">Cancel</b-button>
    </div>
    <div>
      <small>
        Or
        <a @click="toLogin">Login Here</a>
      </small>
    </div>
    </div>
  </section>
</template>

<script>
import data from "@/tags.js";
export default {
  name: "regis",
  data() {
    return {
      user: {
        userName: "",
        email: "",
        password: "",
        tags: []
      },
      filteredTags: data,
      isSelectOnly: false
    };
  },
  methods: {
    toLogin() {
      this.$store.commit("changePage", "login");
    },
    register() {
      this.$store.dispatch("REGISTER", this.user);
      this.toLogin();
    },
    getFilteredTags(text) {
      this.filteredTags = data.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  }
};
</script>

<style>
</style>
