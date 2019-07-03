import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = `http://localhost:3000`;

export default new Vuex.Store({
  state: {
    isLogin: false
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
    }
  }
})
