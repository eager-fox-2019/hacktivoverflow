import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

const baseUrl = `http://localhost:3000`;

export default new Vuex.Store({
  state: {
    isLogin: false,
    clientToken: localStorage.getItem('access_token'),
    questions: []
  },
  mutations: {

  },
  actions: {
    register(context, payload) {
      axios({
          method: 'POST',
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
          localStorage.setItem('_id', response.data.user._id);
          localStorage.setItem('firstName', response.data.user.firstName);
          localStorage.setItem('lastName', response.data.user.lastName);
          context.state.isLogin = true;
          router.push('/home');
        })
        .catch((err) => {
          Swal.fire(
            'Sign in failed!',
            'Username/password invalid',
            'error'
          )
          console.log(err);
        });
    },
    logout(context) {
      context.state.isLogin = false;
      localStorage.clear();
      router.push('/landing_page');
    },
    readAllQuestions(context) {
      axios({
          method: 'GET',
          url: baseUrl + '/questions'
        })
        .then(({
          data
        }) => {
          context.state.questions = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createQuestion(context, payload) {
      axios({
          method: 'POST',
          url: baseUrl + '/questions',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => {
          Swal.fire(
            'Successful!',
            'Question Posted',
            'success'
          )
          context.dispatch('readAllQuestions');
          router.push('/home')
        })
        .catch((err) => {
          Swal.fire(
            'Oooops!',
            'Something wrong, we are sorry for the incovenient',
            'error'
          )
          console.log(err);
        });
    },
    updateQuestion(context, payload) {
      axios({
          method: 'PATCH',
          url: baseUrl + '/questions',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => {

          context.dispatch('readAllQuestions');
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createAnswer(context, payload) {
      // console.log(payload[0],payload[1]);

      axios({
          method: 'POST',
          url: baseUrl + '/answers',
          data: payload[0],
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => {
          payload[1].answers.push(response.data._id);
          context.dispatch('updateQuestion', payload[1]);
          Swal.fire(
            'Successful!',
            'Answer Posted',
            'success'
          )
          router.push('/home')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAnswer(context, payload) {
      axios({
          method: 'PATCH',
          url: baseUrl + '/answers',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => {
          context.dispatch('readAllQuestions');
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
})
