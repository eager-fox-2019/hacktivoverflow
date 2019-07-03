<template>
  <div class="d-inline-flex flex-column">
    <b-alert :show="dismissCountDown" dismissible :variant="msgType" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>{{msg}}. Dimissing in {{dismissCountDown}} seconds...</p>
      <b-progress :variant="msgType" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>

    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <b-form v-else @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="group-name" label="Name:" label-for="name" description="Let us know what to call you">
        <b-form-input id="name" v-model="form.name" type="text" required placeholder="Enter Name"></b-form-input>
      </b-form-group>
      <b-form-group id="group-email" label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group id="group-password" label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>
      <b-button class="m-1" type="submit" variant="primary">Update</b-button>
      <b-button class="m-1" type="reset" variant="danger">Cancel</b-button>
    </b-form>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'edit profile',
  data() {
    return {
      form: {
        name: '',
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
    onSubmit() {
      this.showAlert('sorry, edit profile not yet implemented', 'info')
    },
    onReset() {
      this.form = {
        name: '',
        email: '',
        password: ''
      }
      this.$router.push('/user')
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
