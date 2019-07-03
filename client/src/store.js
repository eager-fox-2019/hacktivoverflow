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
    loggedUser: {}
  },
  mutations: {
    updateLoginStatus (state, payload) {
      state.isLogin = payload
    },
    INPUTLOGGEDUSER (state, payload) {
      state.loggedUser = payload
    },
    STOREQUESTIONS (state, payload) {
      state.questions = payload
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
      console.log('masuk')
      return axios({
        method: 'POST',
        url: `${api}users/register`,
        data: payload
      })
    },
    fetchQuestions ({ state, commit }, payload) {

    },
    fetchAnswer ({ state, commit }, payload) {

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
      
    }
  }
})
