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
    clientToken: null,
    questions: [],
    selectedQuestion: [],
    selectedAnswer: []
  },
  mutations: {
    SETSELECTEDQUESTION(state, payload) {
      state.selectedQuestion = payload;
    },
    SETSELECTEDANSWER(state, payload) {
      state.selectedAnswer = payload
    },
    SETCLIENTTOKEN(state, payload) {
      state.clientToken = payload;
    }
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
      context.state.clientToken = null;
      router.push('/');
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
          url: baseUrl + '/questions/votes/' + payload._id,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => { 
          context.dispatch('readAllQuestions');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateQuestionNoVotes(context, payload) {
      axios({
          method: 'PATCH',
          url: baseUrl + '/questions/' + payload._id,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => { 
          Swal.fire(
            'Successful!',
            'Question Updated',
            'success'
          )
          context.dispatch('readAllQuestions');
          router.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteQuestion(context, payload) {
      axios({
          method: 'DELETE',
          url: baseUrl + '/questions/' + payload._id,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => { 
          console.log(response);
          
          context.dispatch('readAllQuestions');
          Swal.fire(
            'Successful!',
            'Question deleted',
            'success'
          )
          router.push('/home')
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
          // console.log(payload[1]);
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
          url: baseUrl + '/answers/votes/' + payload._id,
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
    updateAnswerNoVotes(context, payload) {
      axios({
          method: 'PATCH',
          url: baseUrl + '/answers/' + payload._id,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => { 
          Swal.fire(
            'Successful!',
            'Question Updated',
            'success'
          )
          context.dispatch('readAllQuestions');
          router.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteAnswer(context, payload) {
      axios({
          method: 'DELETE',
          url: baseUrl + '/answers/' + payload._id,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => {
          context.dispatch('readAllQuestions');
          Swal.fire(
            'Successful!',
            'Answer deleted',
            'success'
          )
          router.push('/home')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
})
