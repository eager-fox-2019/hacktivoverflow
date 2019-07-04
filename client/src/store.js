import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
Vue.use(axios)
const api = 'http://localhost:3000/api/'
export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    isLogin: '',
    loggedUser: {},
    detailedQuestion: {}
  },
  mutations: {
    STOREDETAIL (state, payload) {
      let questions = state.questions
      for (let i in questions) {
        if (questions[i]._id === payload) {
          state.detailedQuestion = questions[i]
        }
      }
    },
    updateLoginStatus (state, payload) {
      state.isLogin = payload
    },
    INPUTLOGGEDUSER (state, payload) {
      state.loggedUser = payload
    },
    STOREQUESTIONS (state, payload) {
      payload.forEach(x => {
        x.createdAt = new Date(x.createdAt).toLocaleString()
      })
      state.questions = payload
    },
    STOREMYQUESTIONS (state, payload) {
      let arr = []
      if (payload) {
        payload.forEach(el => {
          if (el.user._id === state.loggedUser._id) {
            arr.push(el)
          }
        })
      } else {
        state.questions.forEach(el => {
          if (el.user._id === state.loggedUser._id) {
            arr.push(el)
          }
        })
      }
      state.questions = arr
    },
    STOREANSWERS (state, payload) {
      state.answers = payload
    }
  },
  actions: {
    login ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}users/login`,
        data: payload
      })
    },
    register ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}users/register`,
        data: payload
      })
    },
    fetchQuestions ({ state, commit }, payload) {
      return axios({
        method: 'GET',
        url: `${api}questions`
      })
    },
    fetchAnswers ({ state, commit }, payload) {
      return axios({
        method: 'GET',
        url: `${api}answers/${payload}`
      })
    },
    createQuestion ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}questions`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    createAnswer ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}answers/${payload.id}`,
        data: {
          content: payload.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteQuestion ({ state, commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `${api}questions/${payload}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    voteUpdateQuestion ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}questions/vote/${payload._id}`,
        data: {
          upvote: payload.upvote,
          downvote: payload.downvote
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    insertAnswer ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}questions/answer/${payload._id}`,
        data: {
          answer: payload.answer
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    voteUpdateAnswer ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}answers/vote/${payload._id}`,
        data: {
          upvote: payload.upvote,
          downvote: payload.downvote
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteAnswer ({ state, commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `${api}answers/${payload}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    editQuestion({state, commit}, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}questions/${payload.id}`,
        data: {
          title : payload.titleEdit,
          content: payload.contentEdit
        },
        headers: {
          token: localStorage.token
        }
      })
    }
  }
})
