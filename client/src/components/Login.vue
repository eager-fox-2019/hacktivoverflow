<template>
  <div id="login">
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="loginEmail">Email address</label>
        <input
          v-model="login.email"
          type="email"
          class="form-control"
          id="loginEmail"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <input
          v-model="login.password"
          type="password"
          class="form-control"
          id="loginPassword"
          placeholder="Password"
          required
        />
      </div>
      <button
        style="border-radius: 20px;width: 100px;text-align:center"
        type="submit"
        class="btn btn-primary"
      >Login</button>
      <p v-if="error.length != 0" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  components: {},
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    loginUser () {
      axios({
        method: 'POST',
        url: `${this.url}/login`,
        data: {
          name: this.login.name,
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          this.clearAll()
          console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          this.$store.commit('USERLOGIN', data)
          this.$router.push('/questions')
        })
        .catch(error => {
          this.error = error.response.data.message
          console.log(error)
        })
    },
    clearAll () {
      this.login.name = ''
      this.login.email = ''
      this.login.password = ''
      this.error = ''
    }
  }
}
</script>
