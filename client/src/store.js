import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';
Vue.use(Vuex)
Vue.use(axios)
const api = 'http://localhost:3000/api/'
export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    isLogin: '',
    loggedUser: {},
    myQuestions: []
  },
  mutations: {
    updateLoginStatus (state, payload) {
      state.isLogin = payload
    },
    INPUTLOGGEDUSER (state, payload) {
      state.loggedUser = payload
    },
    STOREQUESTIONS (state, payload) {
      payload.forEach(x => {
        x.createdAt = new Date(x.createdAt).toLocaleString()
      });
      state.questions = payload
    },
    STOREMYQUESTIONS (state) {
      let arr = []
      state.questions.forEach(el => {
        if(el.user._id === state.loggedUser._id) {
          arr.push(el)
        }
      })
      state.questions = arr
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
      return axios({
        method: 'GET',
        url: `${api}questions`
      })
    },
    fetchAnswer ({ state, commit }, payload) {
      return axios({
        method: 'GET',
        url: `${api}answers`
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
        url: `${api}questions`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    
  }
})
