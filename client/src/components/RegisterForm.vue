<template>
  <div id="register">
    <form class="form1" @submit.prevent="sendRegister" style="font-size: 0.9rem;">
      <div class="f1title">Register</div>
      <div class="form-group">
        <label for="registerName">Name:</label>
        <input type="text" class="form-control" name="name" placeholder="Enter New name" required>
      </div>
      <div class="form-group">
        <label for="registerEmail">Email:</label>
        <input type="email" class="form-control" name="email" placeholder="Enter New Email" required>
      </div>
      <div class="form-group">
        <label for="registerPassword">Password:</label>
        <input type="password" class="form-control" name="password" placeholder="Enter New Password" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <div v-show="success" style="padding-top: 1rem;">{{ success }}</div>
      <div v-show="error" class="erroralert">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      success: '',
      error: '',
    }
  },
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    sendRegister(event) {
      let inputs = event.target.elements;

      axios({
        method: 'POST',
        url: `${this.url}/register`,
        data: {
          name: inputs.name.value,
          email: inputs.email.value,
          password: inputs.password.value,
        }
      })
        .then(({ data }) => {
          event.target.reset();
          this.success = 'Register success';
          setTimeout(() => {
            this.success = ''
          }, 1500);
        })
        .catch(error => {
          this.error = error.response.data.message;
          setTimeout(() => {
            this.error = ''
          }, 1500);
          console.log(error);
        })
    },
  }
}
</script>