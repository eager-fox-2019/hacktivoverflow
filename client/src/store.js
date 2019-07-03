import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url_server: 'http://localhost:3000',
    isLogin: false,
    loginUser: {},
    questions: [],
    questionDetail: {},
    sendRegisterStatus: false,
    sendLoginStatus: false,
    sendAnswerStatus: false
  },
  mutations: {
    computedVotes (state, payload) {
      return payload.upvotes.length - payload.downvotes.length
    },
    setLoginUser (state, payload) {
      state.loginUser = payload
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setQuestionDetail (state, payload) {
      state.questionDetail = payload
    },
    setSendRegisterStatus (state, payload) {
      state.sendRegisterStatus = payload
    },
    setSendLoginStatus (state, payload) {
      state.sendLoginStatus = payload
    },
    setSendAnswerStatus (state, payload) {
      state.sendAnswerStatus = payload
    }
  },
  actions: {
    sendRegister (context, payload) {
      let sendData = {
        full_name: payload.full_name,
        username: payload.username,
        password: payload.password,
        email: payload.email
      }
      axios({
        method: 'POST',
        data: sendData,
        url: `${context.state.url_server}/users/register`
      })
        .then(({ data }) => {
          context.commit('setSendRegisterStatus', true)
          Swal.fire(
            'Success Register!',
            'Your registration is success. Please login to continue',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire(
            'Error!',
            err.response.data.message,
            'error'
          )
        })
    },
    sendLogin (context, payload) {
      console.log('ini yang diirim', payload)
      axios({
        method: 'POST',
        data: payload,
        url: `${context.state.url_server}/users/login`
      })
        .then(({ data }) => {
          localStorage.setItem('token', JSON.stringify(data))
          context.commit('setIsLogin', true)
          context.commit('setSendLoginStatus', true)
          context.dispatch('getMyProfile')
          router.push('/')
          Swal.fire(
            'Success Login!',
            `Welcome back, ${data.username}!`,
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire(
            'Error!',
            err.response.data.message,
            'error'
          )
        })
    },
    getMyProfile (context) {
      axios({
        method: 'GET',
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        url: `${context.state.url_server}/users/myprofile`
      })
        .then(({ data }) => {
          context.commit('setLoginUser', data)
          context.commit('setIsLogin', true)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestions (context) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/questions`
      })
        .then(({ data }) => {
          context.commit('setQuestions', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestionDetail (context, payload) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/questions/${payload}`
      })
        .then(({ data }) => {
          context.commit('setQuestionDetail', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    sendNewQuestion (context, payload) {
      axios({
        method: 'POST',
        data: payload,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        url: `${context.state.url_server}/questions`
      })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Successfully add new question',
            'success'
          )
          context.dispatch('getQuestions')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          Swal.fire(
            'Error!',
            err.response.data.message,
            'error'
          )
        })
    },
    sendNewAnswer (context, payload) {
      console.log('ini payload di sendNewAnswer', payload)
      axios({
        method: 'POST',
        data: payload,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        url: `${context.state.url_server}/answers`
      })
        .then(() => {
          context.commit('setSendAnswerStatus', true)
          context.dispatch('getQuestionDetail', payload.question_id)
          Swal.fire(
            'Success!',
            'Succesfully add new answer for this question',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire(
            'Error!',
            err.response.data.message,
            'error'
          )
        })
    },
    deleteQuestion (context, payload) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this question?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'DELETE',
            headers: {
              token: JSON.parse(localStorage.token).token
            },
            url: `${context.state.url_server}/questions/${payload}`
          })
            .then(({ data }) => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              context.dispatch('getQuestions')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    sendVote (context, payload) {
      let sendId = (payload.type === 'answers') ? payload.answer_id : payload.question_id
      axios({
        method: 'POST',
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        url: `${context.state.url_server}/${payload.type}/${sendId}/${payload.val}`
      })
        .then(({ data }) => {
          context.dispatch('getQuestionDetail', payload.question_id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
