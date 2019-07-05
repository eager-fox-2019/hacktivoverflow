<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group class="w-25 mx-auto"
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" class="w-25 mx-auto" label="Userame:" label-for="input-2" v-if="register">
        <b-form-input
          id="input-2"
          v-model="form.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" class="w-25 mx-auto" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button><br><br>
      <b-link href="#" @click="goRegister" v-show="!register">New user?</b-link>
      <b-link href="#" @click="goLogin" v-show="register">I have an account!</b-link>

    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        username: '',
        password: ''
      },
      register: true
    }
  },
  methods: {
    goRegister () {
      this.register = true
    },
    goLogin () {
      this.register = false
    },
    clearForm () {
      this.form.email = ''
      this.form.username = ' '
      this.form.password = ''
    },
    onSubmit () {
      const { commit, dispatch } = this.$store
      if (this.register) {
        dispatch('REGISTER', this.form)
          .then(() => {
            this.$swal({
              type: 'success',
              title: 'Registration success',
              text: "Let's login!"
            })
            this.register = false // to login form
            this.clearForm()
          })
          .catch(e => {
            console.log(e.response.data.message)
            let arr = e.response.data.message.split(':')
            this.$swal({
              type: 'error',
              title: 'Registration failed',
              text: `${arr[arr.length - 1]}`
            })
            this.clearForm()
          })
      } else {
        dispatch('LOGIN', this.form)
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            this.$swal({
              type: 'success',
              title: 'Login success'
            })
            commit('SET_LOGIN', true)
            this.$router.push('/')
            this.clearForm()
          })
          .catch(e => {
            console.log(e.response.data.message)
            let arr = e.response.data.message.split(':')
            this.$swal({
              type: 'error',
              title: 'Login failed',
              text: `${arr[arr.length - 1]}`
            })
            this.clearForm()
          })
      }
    }
  }
}
</script>
