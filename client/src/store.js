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
    answer (state, payload) {
      const index = state.questions.findIndex(i => i._id === router.currentRoute.params.qid)

      state.questions[index].answers.push(payload)
    },
    editAnswer (state, payload) {
      const index = state.questions.findIndex(i => i._id === router.currentRoute.params.qid)
      const aindex = state.questions[index].answers.findIndex(i => i._id === payload._id)

      state.questions[index].answers[aindex] = payload
    },
    question (state, payload) {
      state.questions.push(payload)
    },
    editQuestion (state, payload) {
      const index = state.questions.findIndex(i => i._id === payload._id)

      state.questions[index] = payload
    },
    removeQuestion (state, payload) {
      const index = state.questions.findIndex(i => i._id === payload._id)

      state.questions.splice(index, 1)
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
      else state.questions[index].answers[aindex].downvotes.push(payload.userId)
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
    answer ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `${apiUrl}/answer/${router.currentRoute.params.qid}`,
        data: payload,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('answer', data))
        .catch(err => {
          console.log(err)
          if (err.response.data.message.toLowerCase().includes('token')) router.push({ path: '/login' })
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    },
    editAnswer ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `${apiUrl}/answer/${payload._id}`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('editAnswer', data))
        .catch(err => {
          console.log(err)
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    },
    question ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `${apiUrl}/question`,
        data: payload,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('question', data))
        .catch(err => {
          console.log(err)
          if (err.response.data.message.toLowerCase().includes('token')) router.push({ path: '/login' })
          swal.fire(String(err.response.status), err.response.data.message, 'error')
        })
    },
    removeQuestion ({ commit }, payload) {
      axios({
        method: 'DELETE',
        url: `${apiUrl}/question/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(() => commit('removeQuestion', payload))
        .catch(err => {
          console.log(err)
        })
    },
    editQuestion ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `${apiUrl}/question/${payload._id}`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => commit('editQuestion', data))
        .catch(err => {
          console.log(err)
          swal.fire(String(err.response.status), err.response.data.message, 'error')
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
