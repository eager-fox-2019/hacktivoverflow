import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const api = 'http://localhost:3000/api/'
export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    isLogin: true,
    loggedUser: {}
  },
  mutations: {
    updateLoginStatus (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    login ({ state, commit }, payload) {
      return axios({
        method: 'post',
        url: `${api}login`,
        data: payload
      })
    },
    register ({ state, commit }, payload) {
      return axios({
        method: 'post',
        url: `${api}register`,
        data: payload
      })
    },
    fetchQuestions ({ state, commit }, payload) {

    },
    fetchAnswer ({ state, commit }, payload) {

    },
    createQuestion ({ state, commit }, payload) {

    },
    createAnswer ({ state, commit }, payload) {

    }
  }
})
