<template>
  <div id="registerArea" class="d-inline-flex flex-column">
    <b-alert :show="dismissCountDown" dismissible :variant="msgType" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>{{msg}}. Dimissing in {{dismissCountDown}} seconds...</p>
      <b-progress :variant="msgType" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>

    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <b-form v-else @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="group-email" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
        <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group id="group-password" label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>
      <b-button class="m-1" type="submit" variant="primary">Register</b-button>
      <b-button class="m-1" type="reset" variant="danger">Reset</b-button>
      <br />
      <label>Already have an account? <a href="#" @click.prevent="goToLoginPage">Login</a></label>
    </b-form>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'register',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      loading: false,
      msg: '',
      msgType: ''
    }
  },
  computed: mapState(['baseURL']),
  methods: {
    goToLoginPage() {
      this.$router.push('/user/login')
    },
    onSubmit() {
      // register new user and create new cart for the user
      // this.$store.dispatch('addUser', this.form)
      this.loading = true
      let baseURL = this.baseURL
      let email = this.form.email
      let name = email.split('@')[0]

      axios({
          method: "POST",
          url: baseURL + "/user",
          data: {
            "email": email,
            "password": this.form.password
          }
        })
        .then(({ data }) => {
          this.$swal({text:'successfully registered user', type:'success'})
          this.loading = false
          this.onReset()
          this.$router.push('/user/login')
        })
        .catch(({ response }) => {
          console.log("created error:", response)
          let msg = response.data || response
          this.showAlert(msg, 'danger')
          this.loading = false
        })
    },
    onReset() {
      this.form = {
        email: '',
        password: ''
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(message, type) {
      this.dismissCountDown = this.dismissSecs
      this.msg = message
      this.msgType = type
    }
  }
}

</script>
<style scoped>
#registerArea {
  padding: 1em;
  max-width: 30em;
}

</style>
