<template>
  <section>
    <strong style="font-size: 50px">Sign In</strong>
    <div class="column is-8 is-offset-2" style="margin-top: 20px">
      <b-field label="Email">
        <b-input type="email" maxlength="30" rounded v-model="user.email"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" password-reveal rounded v-model="user.password"></b-input>
      </b-field>
    </div>
    <div>
      <b-button rounded type="is-primary" size="is-medium" style="margin-right: 10px" @click="login">Login</b-button>
      <b-button rounded type="is-primary" size="is-medium" @click="$router.push('/all')">Cancel</b-button>
    </div>
    <div>
      <small>
        Or
        <a @click="toRegis">Register Here</a>
      </small>
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    toRegis(){
      this.$store.commit('changePage', 'regis')
    },
    login(){
      this.$store.dispatch('LOGIN', this.user)
      this.$router.push('/all')
    }
  }
};
</script>

<style>
</style>
