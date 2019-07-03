import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = `http://localhost:3000`;

export default new Vuex.Store({
  state: {
    isLogin: false,
    clientToken: localStorage.getItem('access_token')
  },
  mutations: {

  },
  actions: {
    register(context, payload) {
      axios({
        method:'POST',
        url: baseUrl + '/users/register',
        data: payload
      })
      .then((response) => {
        console.log(response);
        Swal.fire(
          'Successful!',
          'Register Successful',
          'success'
        )
      })
      .catch((err) => {
        console.log(err);
      });
    },

    login(context, payload) {
      axios({
        method: 'POST',
        url: baseUrl + '/users/login',
        data: payload
      })
      .then((response) => {
        Swal.fire(
          'Successful!',
          'Sign in Successful',
          'success'
        )
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('firstName', response.data.user.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        context.state.isLogin = true;
        console.log(response);
      })
      .catch((err) => {
        Swal.fire(
          'Sign in failed!',
          'Username/password invalid',
          'error'
        )
        console.log(err);
      });
    }
  }
})
