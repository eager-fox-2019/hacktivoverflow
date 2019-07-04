<template>
  <div class="formArea d-inline-flex flex-column">
    <b-alert :show="dismissCountDown" dismissible :variant="msgType" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>{{msg}}. Dimissing in {{dismissCountDown}} seconds...</p>
      <b-progress :variant="msgType" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>

    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <b-form v-else @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="group-name" label="New Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" type="text" required placeholder="Enter Name"></b-form-input>
        <small>Let us know what to call you</small>
      </b-form-group>
      <b-form-group id="group-password" label="New Password:" label-for="password">
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
  name: 'editProfile',
  data() {
    return {
      form: {
        name: '',
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
      // this.showAlert('sorry, edit profile not yet implemented', 'info')
      let {state, commit} = this.$store

      axios({
        method: 'patch',
        url: state.baseURL+'/user/',
        headers: {access_token: state.access_token},
        data: this.form
      })
      .then(({data}) => {
        console.log({data})
        commit('SHOWMSG',{
          message: 'updated profile',
          type:'success'
        })
        commit('SAVEUSER',data)
        this.onReset()
      })
      .catch(({response}) => {
        console.log(response.data);
        commit('SHOWMSG',{
          message: response.data,
          type:'warning'
        })
      })
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
.formArea {
  color: #F7C331;
  background-color: #6B7A8F;
  margin: 1em;
  padding: 1em;
  border-radius: 1em;
  font-weight: bold;
  min-width: 15em;
  width: 100%;
  max-width: 30em;
}

small {
  color: black;
}

</style>
