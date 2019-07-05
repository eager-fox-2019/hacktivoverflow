<template>
  <div id="login">
    <form class="form1" @submit.prevent="sendLogin" style="font-size: 0.9rem;">
      <div class="f1title">Login</div>
      <div class="form-group">
        <label for="loginEmail">Email:</label>
        <input class="form-control" type="email" name="email" placeholder="Enter Email" required>
      </div>
      <div class="form-group">
        <label for="loginPassword">Password:</label>
        <input class="form-control"  type="password" name="password" placeholder="Enter Password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <div v-show="error" class="erroralert">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      error: ''
    }
  },
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    sendLogin(event) {
      let inputs = event.target.elements;

      axios({
        method: 'POST',
        url: `${this.url}/login`,
        data: {
          email: inputs.email.value,
          password: inputs.password.value,
        }
      })
        .then(({ data }) => {
          event.target.reset();
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          this.$store.commit('USERLOGIN', data);
          this.$router.push('/questions');
        })
        .catch(error => {
          console.log(error)
          this.error = error.response.data.message;
          setTimeout(() => {
            this.error = ''
          }, 2000);
        })
    },
  }
}
</script>
