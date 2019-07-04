<template>
  <div id="loginArea" class="d-inline-flex flex-column">
    <b-alert :show="dismissCountDown" dismissible :variant="msgType" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>{{msg}}. Dimissing in {{dismissCountDown}} seconds...</p>
      <b-progress :variant="msgType" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group
        id="group-email"
        label="Email address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="group-password"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="m-1" type="submit" variant="primary">Login</b-button>
      <b-button class="m-1" type="reset" variant="danger">Reset</b-button>
      <br/>
      <label>Don't have an account? <a href="#" @click.prevent="register">Register</a></label>
    </b-form>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      msg: '',
      msgType: ''
    }
  },
  created () {
    if (this.$store.state.loggedIn) {
      this.goToHome()
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert (message, type) {
      this.dismissCountDown = this.dismissSecs
      this.msg = message
      this.msgType = type
    },
    onSubmit () {
      let { state, commit, dispatch } = this.$store
      let baseURL = state.baseURL
      // login
      axios.post(baseURL + '/user/login', this.form)
        .then(({ data }) => {
          // console.log('login result:', data)
          this.$swal({ text: 'login success', type: 'success' })
          // save user detail
          this.$store.commit('SAVEUSER',
            { id: data.id,
              name: data.name,
              email: this.form.email,
              access_token: data.access_token
            })
          this.goToHome()
          this.onReset()
        })
        .catch(({ response }) => {
          // console.log('error at user login:', response)
          let msg = response.data || response
          this.showAlert(msg, 'danger')
        })
    },
    goToHome () {
      this.$router.push('/')
    },
    onReset () {
      this.form = {
        email: '',
        password: ''
      }
    },
    register () {
      this.$router.push('/user/register')
    }
  }
}

</script>
<style scoped>
#loginArea {
  padding: 1em;
  max-width: 30em;
}
</style>
