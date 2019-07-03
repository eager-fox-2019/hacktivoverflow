import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import router from './router'
import { apiUrl } from './config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: []
  },
  getters: {
    questionById: state => id => {
      return state.questions.filter(q => q._id === id)
    }
  },
  mutations: {
    getAllQuestions (state, payload) {
      state.questions = payload
    },
    questionUpVote (state, payload) {
      const index = state.questions.findIndex(i => i._id === payload._id)
      const qIndex = state.questions[index].downvotes.indexOf(payload.userId)

      if (qIndex !== -1) state.questions[index].downvotes.splice(qIndex, 1)
      else state.questions[index].upvotes.push(payload.userId)
    },
    questionDownVote (state, payload) {
      const index = state.questions.findIndex(i => i._id === payload._id)
      const qIndex = state.questions[index].upvotes.indexOf(payload.userId)

      if (qIndex !== -1) state.questions[index].upvotes.splice(qIndex, 1)
      else state.questions[index].downvotes.push(payload.userId)
    },
    answerUpVote (state, payload) {
      const index = state.questions.findIndex(i => i._id === router.currentRoute.params.qid)
      const aindex = state.questions[index].answers.findIndex(i => i._id === payload._id)
      const vindex = state.questions[index].answers[aindex].downvotes.indexOf(payload.userId)

      if (vindex !== -1) state.questions[index].answers[aindex].downvotes.splice(vindex, 1)
      else state.questions[index].answers[aindex].upvotes.push(payload.userId)
    },
    answerDownVote (state, payload) {
      const index = state.questions.findIndex(i => i._id === router.currentRoute.params.qid)
      const aindex = state.questions[index].answers.findIndex(i => i._id === payload._id)
      const vindex = state.questions[index].answers[aindex].upvotes.indexOf(payload.userId)

      if (vindex !== -1) state.questions[index].answers[aindex].upvotes.splice(vindex, 1)
      else state.questions[index].downvotes[aindex].downvotes.push(payload.userId)
    }
  },
  actions: {
    getAllQuestions ({ commit }) {
      axios({
        method: 'GET',
        url: `${apiUrl}/question`
      })
        .then(({ data }) => commit('getAllQuestions', data))
        .catch(err => {
          console.log(err)
          swal.fire('Error Getting All Questions', '', 'error')
        })
    },
    questionUpVote ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `${apiUrl}/question/upvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('questionUpVote', data))
        .catch(err => {
          console.log(err)
          if (err.response.data.message.toLowerCase().includes('token')) router.push({ path: '/login' })
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    },
    questionDownVote ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `${apiUrl}/question/downvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('questionDownVote', data))
        .catch(err => {
          console.log(err)
          if (err.response.data.message.toLowerCase().includes('token')) router.push({ path: '/login' })
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    },
    answerUpVote ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `${apiUrl}/answer/upvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('answerUpVote', data))
        .catch(err => {
          console.log(err)
          if (err.response.data.message.toLowerCase().includes('token')) router.push({ path: '/login' })
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    },
    answerDownVote ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `${apiUrl}/answer/downvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('answerDownVote', data))
        .catch(err => {
          console.log(err)
          if (err.response.data.message.toLowerCase().includes('token')) router.push({ path: '/login' })
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    }
  }
})
