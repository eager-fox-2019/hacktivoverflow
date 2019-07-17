import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: `http://localhost:3000`,
    islogin: false,
    id: '',
    token: '',
    questions: [],
    categories: [],
    answers: [],
    question: {}
  },
  mutations: {
    USERLOGIN (state, payload) {
      state.id = payload.id
      state.token = payload.token
      state.islogin = true
    },
    USERLOGOUT (state, payload) {
      state.id = ''
      state.islogin = false
    },
    ALLQUESTIONS (state, payload) {
      state.questions = payload
    },
    FILTER (state, payload) {
      state.categories = payload
    },
    CATEGORY (state, payload) {
      let arr = []
      state.questions.forEach(x => {
        if (x.category === payload) {
          arr.push(x)
        }
      })
      state.questions = arr
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    SET_ANSWERS (state, payload) {
      state.answers = payload
    }
  },
  actions: {
    FETCHQUESTIONS ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/question`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          let arr = []
          data.forEach(x => {
            if (arr.indexOf(x.category) === -1) {
              arr.push(x.category)
            }
          })
          commit('FILTER', arr)
          commit('ALLQUESTIONS', data)
          if (typeof payload === 'string') {
            commit('CATEGORY', payload)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    FETCHQUESTION ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/question?search=${payload}`,
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data[0])
          return axios({
            method: 'GET',
            url: `${state.url}/answer/${payload}`,
            headers: {
              token: state.token
            }
          })
        })
        .then(({ data }) => {
          commit('SET_ANSWERS', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
